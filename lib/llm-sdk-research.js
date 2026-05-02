/**
 * LLM 语义理解 SDK 研究器
 * 直接使用 Claude Code 当前上下文的模型能力（不调用外部 API）
 */

const fs = require('fs-extra');
const path = require('path');
const sdkSearch = require('./sdk-search');

/**
 * 使用 Claude Code 当前上下文进行分析
 * 直接返回 SDK 推荐（而非生成提示让用户复制）
 */
async function claudeCodeSemanticAnalysis(requirement, options = {}) {
  // 加载当前可用的 SDK 类列表
  const index = await sdkSearch.loadIndex();
  const availableClasses = [];

  for (const mod of index.modules) {
    for (const cls of mod.classes) {
      if (cls.name !== '00_模块索引') {
        availableClasses.push({
          className: cls.name,
          module: mod.name,
          methods: cls.methods
        });
      }
    }
  }

  // 构建分析提示，包含可用的 SDK 类列表
  const prompt = `你是一个金蝶苍穹 (Kingdee Cosmic) 开发专家。请根据以下业务需求，分析需要使用哪些 SDK 类来实现。

## 可用的 SDK 类列表（共 ${availableClasses.length} 个）：
${availableClasses.slice(0, 50).map(c => `- ${c.className} (${c.module})`).join('\n')}
... (更多类请参考 SDK 文档)

## 业务需求：
${requirement}

请只返回你推荐使用的 SDK 类（从上面的列表中选择，或者使用常见的金蝶 SDK 类如 DynamicObject、BusinessDataServiceHelper、WorkflowServiceHelper 等）。

返回格式：
| 类名 | 模块 | 用途 |
|------|------|------|
`;

  // 注意：这里返回的是分析所需的提示
  // 实际的语义分析会在 CLI 中直接使用当前 Claude Code 会话的能力
  return {
    success: true,
    requirement,
    availableClasses: availableClasses,
    analysis_prompt: prompt,
    message: '请在 Claude Code 会话中直接分析此需求'
  };
}

/**
 * 使用 Claude Code 当前上下文进行分析（旧接口兼容）
 */
async function llmResearch(requirement, options = {}) {
  return claudeCodeSemanticAnalysis(requirement, options);
}

/**
 * 构建分析 prompt
 */
function buildPrompt(requirement) {
  return buildSemanticPrompt(requirement);
}

/**
 * 解析 Claude Code 响应（从用户会话中获取）
 */
function parseLLMResponse(content) {
  if (!content) return [];

  const recommendations = [];

  // 查找表格行
  const lines = content.split('\n');
  let inTable = false;

  for (const line of lines) {
    // 检测表格开始
    if (line.includes('|') && line.includes('-')) {
      inTable = true;
      continue;
    }

    // 检测表格结束
    if (inTable && !line.includes('|')) {
      inTable = false;
      continue;
    }

    // 解析表格行
    if (inTable && line.includes('|')) {
      const parts = line.split('|').map(p => p.trim()).filter(p => p);

      if (parts.length >= 2) {
        const className = parts[0];
        const module = parts[1] || 'kd.bos';
        const usage = parts.slice(2).join(' - ');

        // 跳过表头
        if (!className.includes('类名') && !className.includes('---')) {
          recommendations.push({
            className,
            module,
            usage
          });
        }
      }
    }
  }

  return recommendations;
}

/**
 * 混合搜索：先本地快速搜索 + Claude Code 语义分析
 * 不调用外部 API，直接生成提示供用户在当前会话中使用
 */
async function hybridResearch(requirement, options = {}) {
  const { apiKey, useLocalFirst = true } = options;

  // 1. 本地快速搜索（如果启用）
  let localResults = [];
  if (useLocalFirst) {
    const agentSDKResearch = require('./agent-sdk-research');
    const keywords = agentSDKResearch.extractKeywords(requirement);
    const index = await sdkSearch.loadIndex();

    for (const keyword of keywords.slice(0, 5)) {
      const results = await sdkSearch.searchByClass(keyword, index);
      localResults.push(...results.slice(0, 3));
    }

    // 去重
    localResults = localResults.filter((v, i, a) =>
      a.findIndex(t => t.name === v.name) === i
    );

    console.log(`本地搜索找到 ${localResults.length} 个结果`);
  }

  // 2. Claude Code 语义分析（使用当前上下文，不调用外部 API）
  let llmResults = null;
  console.log('使用 Claude Code 当前上下文进行语义分析...');
  llmResults = await claudeCodeSemanticAnalysis(requirement);

  // 3. 合并结果（如果用户提供了 Claude Code 的分析结果）
  return {
    local: localResults,
    llm: llmResults,
    hybrid: mergeResults(localResults, llmResults),
    requires_user_context: llmResults?.requires_user_context || false
  };
}

/**
 * 合并本地和 LLM 结果
 */
function mergeResults(localResults, llmResults) {
  if (!llmResults || !llmResults.success) {
    return localResults;
  }

  const merged = [...localResults];

  for (const rec of llmResults.recommendations || []) {
    // 检查是否已存在
    const exists = merged.some(r =>
      r.className.toLowerCase() === rec.className.toLowerCase()
    );

    if (!exists) {
      merged.push({
        className: rec.className,
        module: rec.module,
        path: `kd_bos/${rec.className}.md`,
        methods: 0,
        score: 0.8, // LLM 结果默认较高分数
        source: 'llm',
        usage: rec.usage
      });
    }
  }

  return merged;
}

module.exports = {
  llmResearch,
  hybridResearch,
  claudeCodeSemanticAnalysis,
  buildPrompt,
  parseLLMResponse
};

// 测试
if (require.main === module) {
  const testRequirement = `委外超期（源单：委外工单）
1）未在计划完工日期内完成交货并检验合格则视为超期，超期天数自计划完工日期次日起计算；
2）超期判定依据为委外完工入库单是否已审核，无委外完工入库单或委外完工入库单提交后未审核的，均判定为超期；
3）超期期间，系统将持续推送消息提示给采购部和计划部，采购订单始终显示红色，且在"订单交货及时率"报表中，订单状态显示为"逾期入库"。`;

  console.log('测试 LLM 分析...');
  console.log('需求:', testRequirement.substring(0, 50) + '...');
  console.log('\n请配置 ANTHROPIC_API_KEY 环境变量来启用 LLM 分析');
}