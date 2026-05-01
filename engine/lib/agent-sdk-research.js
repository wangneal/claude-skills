const fs = require('fs-extra');
const path = require('path');
const sdkSearch = require('./sdk-search');

/**
 * 为特定阶段研究 SDK
 */
async function researchSDKForPhase(phaseContext) {
  const { phaseName, requirements, keywords } = phaseContext;

  console.log(`Researching SDK for phase: ${phaseName}`);
  console.log(`Keywords: ${keywords.join(', ')}`);

  const report = {
    phase: phaseName,
    keywords: keywords,
    recommendations: [],
    codeExamples: [],
    generated_at: new Date().toISOString()
  };

  // 根据关键词搜索相关类
  for (const keyword of keywords) {
    const results = await sdkSearch.searchSDK(keyword, { limit: 5 });

    for (const result of results) {
      if (result.type === 'class') {
        // 获取文档摘要
        const summary = await sdkSearch.getDocumentSummary(result.path, 30);

        report.recommendations.push({
          className: result.name,
          module: result.module,
          methods: [], // TODO: 从文档提取方法列表
          usage: extractUsage(summary),
          relevance: `匹配关键词: ${keyword} (得分: ${result.score.toFixed(2)})`
        });
      }
    }
  }

  // 去重
  report.recommendations = deduplicateRecommendations(report.recommendations);

  return report;
}

/**
 * 根据功能需求推荐 SDK 类 - 智能迭代版
 */
async function recommendSDKClasses(requirement, options = {}) {
  const maxIterations = 3; // 最大迭代次数
  let iteration = 0;
  let recommendations = [];

  while (iteration < maxIterations) {
    iteration++;
    const keywords = extractKeywords(requirement);

    console.log(`[迭代 ${iteration}] 提取关键词: ${keywords.join(', ')}`);

    // 加载索引
    const index = await sdkSearch.loadIndex();

    for (const keyword of keywords) {
      const results = await sdkSearch.searchByClass(keyword, index);

      results.slice(0, 5).forEach(result => {
        recommendations.push({
          className: result.name,
          module: result.module,
          path: result.path,
          methods: result.methods,
          score: result.score,
          matchedKeyword: keyword
        });
      });
    }

    // 去重
    recommendations = deduplicateRecommendations(recommendations);

    // 如果有结果，停止迭代
    if (recommendations.length > 0) {
      console.log(`[迭代 ${iteration}] 找到 ${recommendations.length} 个推荐类`);
      break;
    }

    // 如果没有结果，进行智能扩展
    console.log(`[迭代 ${iteration}] 未找到结果，进行智能扩展...`);

    // 从需求中提取更多关键词
    const expandedKeywords = expandKeywords(requirement, keywords);

    // 如果扩展了关键词，继续迭代
    if (expandedKeywords.length > keywords.length) {
      console.log(`[迭代 ${iteration}] 扩展关键词: ${expandedKeywords.join(', ')}`);
      // 更新提取的关键词（这里只是临时扩展，下次循环会使用）
      requirement = expandedKeywords.join(' ') + ' ' + requirement;
    } else {
      // 无法扩展，停止迭代
      console.log(`[迭代 ${iteration}] 无法扩展关键词，停止迭代`);
      break;
    }
  }

  // 如果最终还是没有结果，尝试全文搜索
  if (recommendations.length === 0) {
    console.log(`[最终] 执行全文搜索...`);
    const index = await sdkSearch.loadIndex();

    // 全文搜索 SDK 文档
    const fullTextResults = await fullTextSearch(requirement, index);
    recommendations = fullTextResults;
  }

  return recommendations;
}

/**
 * 扩展关键词 - 当原始关键词搜索无结果时使用
 */
function expandKeywords(requirement, existingKeywords) {
  const expanded = [...existingKeywords];
  const requirementLower = requirement.toLowerCase();

  // 提取所有 2-4 个字的中文词
  const chineseWords = requirement.match(/[\u4e00-\u9fa5]{2,4}/g) || [];

  // 添加有意义的中文词作为关键词
  for (const word of chineseWords) {
    // 跳过常见的无意义词
    const stopWords = ['的', '了', '和', '是', '在', '有', '我', '你', '他', '她', '它', '这', '那', '个', '一', '不', '也', '就', '都', '而', '及', '与', '或', '但', '如果', '因为', '所以', '可以', '需要', '进行', '处理', '实现', '调用', '获取', '设置', '方法', '功能', '场景', '混合', '测试', '然后', '之后', '之前', '同时', '另外', '还有', '例如', '比如'];

    if (!stopWords.includes(word) && !expanded.includes(word)) {
      expanded.push(word);
    }
  }

  // 提取英文单词
  const englishWords = requirement.match(/[A-Za-z][a-zA-Z0-9]*/g) || [];
  for (const word of englishWords) {
    if (word.length > 2 && !expanded.includes(word)) {
      expanded.push(word);
    }
  }

  return expanded;
}

/**
 * 全文搜索 - 当关键词搜索无结果时使用
 */
async function fullTextSearch(requirement, index) {
  const results = [];
  const requirementLower = requirement.toLowerCase();

  // 搜索所有模块的文档
  for (const module of index.modules) {
    for (const cls of module.classes || []) {
      // 读取文档内容进行匹配
      try {
        const docPath = path.join(__dirname, '..', 'sdk', module.path, cls.file);
        const content = await fs.readFile(docPath, 'utf8');

        // 计算匹配度
        let matchScore = 0;

        // 检查文件名是否包含关键词
        if (cls.name.toLowerCase().includes(requirementLower) ||
            requirementLower.includes(cls.name.toLowerCase())) {
          matchScore += 10;
        }

        // 检查文档内容
        const contentLower = content.toLowerCase();
        const keywords = extractKeywords(requirement);
        for (const kw of keywords) {
          if (contentLower.includes(kw.toLowerCase())) {
            matchScore += 5;
          }
        }

        if (matchScore > 0) {
          results.push({
            className: cls.name,
            module: module.name,
            path: cls.path,
            methods: cls.methods,
            score: matchScore,
            matchedKeyword: '全文搜索'
          });
        }
      } catch (e) {
        // 忽略读取错误
      }
    }
  }

  // 按分数排序
  results.sort((a, b) => b.score - a.score);

  return results.slice(0, 10);
}

/**
 * 中文到 SDK 类名的映射表 - 扩展版 (覆盖 500+ 场景)
 */
const CHINESE_KEYWORD_MAP = {
  // ===== 1. 插件相关 =====
  '表单插件': ['AbstractBillPlugIn', 'AbstractBasePlugIn'],
  '单据插件': ['AbstractBillPlugIn', 'AbstractBasePlugIn'],
  '列表插件': ['AbstractListPlugin', 'AbstractTreeListPlugin'],
  '树形列表': ['AbstractTreeListPlugin'],
  '打印插件': ['PrintServiceHelper', 'AbstractPrintServicePlugin'],
  '工作流插件': ['WorkflowServiceHelper'],
  '移动端插件': ['AbstractMobBasePlugIn', 'AbstractMobBillPlugIn', 'AbstractMobListPlugin'],
  '插件开发': ['AbstractBasePlugIn', 'AbstractBillPlugIn'],
  '插件事件': ['kd_bos_events'],
  '插件基类': ['AbstractBasePlugIn'],

  // ===== 2. 数据操作 =====
  '查询': ['QueryServiceHelper', 'AbstractQueryBuilder'],
  '查询数据': ['QueryServiceHelper', 'DynamicObject'],
  '数据查询': ['QueryServiceHelper', 'BusinessDataServiceHelper'],
  '保存': ['BusinessDataServiceHelper'],
  '保存数据': ['BusinessDataServiceHelper'],
  '数据保存': ['BusinessDataServiceHelper'],
  '删除': ['BusinessDataServiceHelper'],
  '删除数据': ['BusinessDataServiceHelper'],
  '数据删除': ['BusinessDataServiceHelper'],
  '创建': ['BusinessDataServiceHelper'],
  '更新': ['BusinessDataServiceHelper'],
  '数据操作': ['BusinessDataServiceHelper', 'DynamicObject'],
  '数据验证': ['AbstractValidator'],
  '数据校验': ['AbstractValidator'],
  '数据转换': ['DynamicObject'],
  '数据导入': ['BusinessDataServiceHelper'],
  '数据导出': ['BusinessDataServiceHelper'],
  '数据备份': ['BusinessDataServiceHelper'],
  '数据恢复': ['BusinessDataServiceHelper'],
  '数据同步': ['BusinessDataServiceHelper'],
  '数据迁移': ['BusinessDataServiceHelper'],
  '数据清洗': ['BusinessDataServiceHelper'],
  '数据质量': ['BusinessDataServiceHelper'],
  '数据权限': ['PermissionServiceHelper'],
  '数据加密': ['BusinessDataServiceHelper'],
  '数据缓存': ['DynamicObject'],
  '事务': ['BusinessDataServiceHelper'],
  '批处理': ['BusinessDataServiceHelper'],
  '异步': ['BusinessDataServiceHelper'],
  '队列': ['BusinessDataServiceHelper'],
  '消息': ['BusinessDataServiceHelper'],

  // ===== 3. 实体相关 =====
  '实体': ['DynamicObject', 'DataEntityBase'],
  'DynamicObject': ['DynamicObject'],
  '实体对象': ['DynamicObject'],
  '实体集合': ['DynamicObjectCollection'],
  '实体验证': ['AbstractValidator'],
  '实体序列化': ['DynamicObject'],

  // ===== 4. 权限服务 =====
  '权限': ['PermissionServiceHelper'],
  '权限检查': ['PermissionServiceHelper'],
  '权限校验': ['PermissionServiceHelper'],
  '用户权限': ['PermissionServiceHelper', 'UserServiceHelper'],
  '字段权限': ['PermissionServiceHelper'],
  '行级权限': ['PermissionServiceHelper'],
  '列级权限': ['PermissionServiceHelper'],
  '菜单权限': ['PermissionServiceHelper'],
  '功能权限': ['PermissionServiceHelper'],
  '数据权限': ['PermissionServiceHelper'],
  '角色权限': ['PermissionServiceHelper'],
  '组织权限': ['PermissionServiceHelper'],

  // ===== 5. 工作流服务 =====
  '工作流': ['WorkflowServiceHelper'],
  '审批': ['WorkflowServiceHelper'],
  '审批通过': ['WorkflowServiceHelper'],
  '审批拒绝': ['WorkflowServiceHelper'],
  '流程': ['WorkflowServiceHelper'],
  '流程审批': ['WorkflowServiceHelper'],
  '待办': ['WorkflowServiceHelper'],
  '已办': ['WorkflowServiceHelper'],
  '转交': ['WorkflowServiceHelper'],
  '退回': ['WorkflowServiceHelper'],
  '驳回': ['WorkflowServiceHelper'],
  '撤回': ['WorkflowServiceHelper'],
  '催办': ['WorkflowServiceHelper'],
  '挂起': ['WorkflowServiceHelper'],
  '终止': ['WorkflowServiceHelper'],
  '会签': ['WorkflowServiceHelper'],
  '并行审批': ['WorkflowServiceHelper'],
  '顺序审批': ['WorkflowServiceHelper'],
  '条件分支': ['WorkflowServiceHelper'],
  '自动审批': ['WorkflowServiceHelper'],
  '流程设计': ['WorkflowServiceHelper'],
  '流程配置': ['WorkflowServiceHelper'],
  '流程定义': ['WorkflowServiceHelper'],
  '流程监控': ['WorkflowServiceHelper'],
  '流程通知': ['WorkflowServiceHelper'],

  // ===== 6. 用户服务 =====
  '用户': ['UserServiceHelper'],
  '用户信息': ['UserServiceHelper'],
  '当前用户': ['UserServiceHelper'],
  '登录用户': ['UserServiceHelper'],
  '用户组织': ['UserServiceHelper'],
  '用户角色': ['UserServiceHelper'],
  '用户组': ['UserServiceHelper'],
  '切换组织': ['UserServiceHelper'],
  '登录': ['UserServiceHelper'],
  '登出': ['UserServiceHelper'],
  '认证': ['UserServiceHelper'],
  '授权': ['UserServiceHelper'],
  '密码': ['UserServiceHelper'],
  '会话': ['UserServiceHelper'],

  // ===== 7. 时间服务 =====
  '时间': ['TimeServiceHelper'],
  '日期': ['TimeServiceHelper'],
  '时间戳': ['TimeServiceHelper'],
  '业务日期': ['TimeServiceHelper'],
  '服务器时间': ['TimeServiceHelper'],
  '日期计算': ['TimeServiceHelper'],
  '日期格式化': ['TimeServiceHelper'],
  '时区': ['TimeServiceHelper'],

  // ===== 8. 元数据服务 =====
  '元数据': ['MetadataServiceHelper'],
  '获取元数据': ['MetadataServiceHelper'],
  '实体元数据': ['MetadataServiceHelper'],
  '字段元数据': ['MetadataServiceHelper'],
  '单据类型': ['MetadataServiceHelper'],
  '基础资料': ['MetadataServiceHelper'],
  '动态字段': ['MetadataServiceHelper'],

  // ===== 9. 调度服务 =====
  '调度': ['DispatchServiceHelper'],
  '定时任务': ['DispatchServiceHelper'],
  '任务调度': ['DispatchServiceHelper'],
  '调度任务': ['DispatchServiceHelper'],
  '定时': ['DispatchServiceHelper'],

  // ===== 10. 附件服务 =====
  '附件': ['AttachmentServiceHelper'],
  '文件': ['AttachmentServiceHelper', 'BatchDownloadRequest'],
  '上传附件': ['AttachmentServiceHelper'],
  '下载附件': ['AttachmentServiceHelper'],
  '删除附件': ['AttachmentServiceHelper'],
  '附件预览': ['AttachmentServiceHelper'],
  '文件上传': ['AttachmentServiceHelper'],
  '文件下载': ['AttachmentServiceHelper'],

  // ===== 11. 事件相关 =====
  '事件': ['kd_bos_events'],
  '事件处理': ['kd_bos_events'],
  'Before': ['kd_bos_events'],
  'After': ['kd_bos_events'],
  '保存前': ['BeforeSaveEvent'],
  '保存后': ['AfterSaveEvent'],
  '删除前': ['BeforeDeleteEvent'],
  '删除后': ['AfterDeleteEvent'],
  '加载': ['AfterBindDataEvent', 'BeforeBindDataEvent'],
  '绑定数据': ['AfterBindDataEvent', 'BeforeBindDataEvent'],
  '值变更': ['kd_bos_events'],
  '新增行': ['AfterAddRowEventArgs'],
  '删除行': ['AfterDeleteRowEventArgs'],
  '操作': ['AfterDoOperationEventArgs', 'BeforeDoOperationEventArgs'],
  '执行操作': ['AfterDoOperationEventArgs', 'BeforeDoOperationEventArgs'],
  'F7': ['kd_bos_events'],
  '选择': ['kd_bos_events'],
  '按钮': ['kd_bos_events'],
  '点击': ['kd_bos_events'],
  '界面': ['kd_bos_events'],
  '加载事件': ['AfterBindDataEvent'],
  '初始化': ['kd_bos_events'],
  '校验': ['AbstractValidator'],
  '验证': ['AbstractValidator'],
  '审核': ['kd_bos_events'],
  '提交': ['kd_bos_events'],
  '反审核': ['kd_bos_events'],

  // ===== 12. 通用词汇映射 =====
  '服务': ['BusinessDataServiceHelper', 'WorkflowServiceHelper', 'PermissionServiceHelper'],
  'Helper': ['BusinessDataServiceHelper', 'WorkflowServiceHelper', 'PermissionServiceHelper'],
  'Service': ['BusinessDataServiceHelper', 'WorkflowServiceHelper', 'PermissionServiceHelper'],
  '验证器': ['AbstractValidator'],
  'Validator': ['AbstractValidator'],
  '打印': ['PrintServiceHelper'],
  'Print': ['PrintServiceHelper'],
  '报表': ['kd_bos'],
  'Report': ['kd_bos'],
  'List': ['AbstractListPlugin', 'AbstractTreeListPlugin'],
  'Bill': ['AbstractBillPlugIn'],
  'Form': ['AbstractBillPlugIn'],
  'Collection': ['DynamicObjectCollection'],
  'Entity': ['DynamicObject', 'DataEntityBase'],
  'Field': ['DynamicObject'],
  'Query': ['QueryServiceHelper', 'AbstractQueryBuilder'],
  'Workflow': ['WorkflowServiceHelper'],
  'Permission': ['PermissionServiceHelper'],
  'User': ['UserServiceHelper'],
  'Time': ['TimeServiceHelper'],
  'Metadata': ['MetadataServiceHelper'],
  'Data': ['DynamicObject', 'BusinessDataServiceHelper'],
  'Business': ['BusinessDataServiceHelper'],
  'Create': ['BusinessDataServiceHelper'],
  'Save': ['BusinessDataServiceHelper'],

  // ===== 13. 补充更多场景 =====
  '主键': ['BusinessDataServiceHelper'],
  '编号': ['BusinessDataServiceHelper'],
  '编码': ['BusinessDataServiceHelper'],
  '单据编号': ['BusinessDataServiceHelper'],
  '序号': ['BusinessDataServiceHelper'],
  '多租户': ['BusinessDataServiceHelper'],
  '多组织': ['BusinessDataServiceHelper'],
  '多语言': ['UserServiceHelper'],
  '多币种': ['BusinessDataServiceHelper'],
  '审计': ['BusinessDataServiceHelper'],
  '版本': ['BusinessDataServiceHelper'],
  '锁': ['BusinessDataServiceHelper'],
  '缓存': ['DynamicObject'],
  '并发': ['BusinessDataServiceHelper'],
  '异常': ['ErrorCode'],
  '错误': ['ErrorCode'],
  '日志': ['Log'],
  '线程': ['ThreadPool'],
  '定时器': ['DispatchServiceHelper'],

  // ===== 14. 模糊匹配关键词 =====
  'plugin': ['AbstractBasePlugIn', 'AbstractBillPlugIn', 'AbstractListPlugin'],
  'event': ['kd_bos_events'],
  'data': ['DynamicObject', 'BusinessDataServiceHelper'],
  'helper': ['BusinessDataServiceHelper', 'WorkflowServiceHelper'],
  'service': ['BusinessDataServiceHelper', 'WorkflowServiceHelper'],

  // ===== 15. 补充缺失的插件相关 =====
  '插件注册': ['AbstractBasePlugIn'],
  '插件配置': ['AbstractBasePlugIn'],
  '插件调试': ['AbstractBasePlugIn'],
  '插件部署': ['AbstractBasePlugIn'],
  '插件性能': ['AbstractBasePlugIn'],
  '插件安全': ['AbstractBasePlugIn'],
  '插件日志': ['Log'],
  '插件异常': ['ErrorCode'],
  '插件事务': ['BusinessDataServiceHelper'],
  '插件缓存': ['DynamicObject'],
  '插件并发': ['BusinessDataServiceHelper'],
  '插件测试': ['AbstractBasePlugIn'],
  '插件文档': ['AbstractBasePlugIn'],
  '插件版本': ['AbstractBasePlugIn'],
  '插件升级': ['AbstractBasePlugIn'],
  '插件迁移': ['AbstractBasePlugIn'],
  '插件备份': ['AbstractBasePlugIn'],
  '插件恢复': ['AbstractBasePlugIn'],
  '插件监控': ['AbstractBasePlugIn'],
  '插件统计': ['AbstractBasePlugIn'],
  '插件报表': ['AbstractBasePlugIn'],
  '插件审计': ['AbstractBasePlugIn'],
  '插件集成': ['AbstractBasePlugIn'],
  '插件扩展': ['AbstractBasePlugIn'],
  '插件定制': ['AbstractBasePlugIn'],
  '插件模板': ['AbstractBasePlugIn'],
  '插件示例': ['AbstractBasePlugIn'],
  '插件规范': ['AbstractBasePlugIn'],
  '插件标准': ['AbstractBasePlugIn'],
  '插件架构': ['AbstractBasePlugIn'],
  '插件设计': ['AbstractBasePlugIn'],
  '插件模式': ['AbstractBasePlugIn'],
  '开发插件': ['AbstractBasePlugIn'],
  '插件开发': ['AbstractBasePlugIn', 'AbstractBillPlugIn'],
  '基类': ['AbstractBasePlugIn'],
  'Abstract': ['AbstractBasePlugIn'],
  'PlugIn': ['AbstractBasePlugIn', 'AbstractBillPlugIn'],

  // ===== 16. 补充数据字段相关 =====
  'Blob': ['DynamicObject'],
  'Clob': ['DynamicObject'],
  '文件字段': ['AttachmentServiceHelper'],
  '图片字段': ['AttachmentServiceHelper'],
  '日期字段': ['TimeServiceHelper'],
  '数值字段': ['DynamicObject'],
  '字符字段': ['DynamicObject'],
  '布尔字段': ['DynamicObject'],
  '枚举字段': ['DynamicObject'],
  '关联字段': ['DynamicObject'],

  // ===== 17. 补充权限相关 =====
  '权限继承': ['PermissionServiceHelper'],
  '权限覆盖': ['PermissionServiceHelper'],
  '权限拒绝': ['PermissionServiceHelper'],
  '权限授予': ['PermissionServiceHelper'],
  '权限回收': ['PermissionServiceHelper'],
  '权限验证': ['PermissionServiceHelper'],
  '权限缓存': ['PermissionServiceHelper'],
  '权限审计': ['PermissionServiceHelper'],
  '权限报表': ['PermissionServiceHelper'],
  '权限配置': ['PermissionServiceHelper'],
  '权限模型': ['PermissionServiceHelper'],
  '权限策略': ['PermissionServiceHelper'],
  '权限规则': ['PermissionServiceHelper'],

  // ===== 18. 补充打印相关 =====
  '打印样式': ['PrintServiceHelper'],
  '打印布局': ['PrintServiceHelper'],
  '打印数据': ['PrintServiceHelper'],
  '打印导出': ['PrintServiceHelper'],
  '套打': ['PrintServiceHelper'],

  // ===== 19. 补充工作流相关 =====
  '工作流任务': ['WorkflowServiceHelper'],
  '工作流待办': ['WorkflowServiceHelper'],
  '工作流已办': ['WorkflowServiceHelper'],
  '工作流历史': ['WorkflowServiceHelper'],
  '工作流催办': ['WorkflowServiceHelper'],
  '流程设计': ['WorkflowServiceHelper'],
  '流程配置': ['WorkflowServiceHelper'],
  '流程定义': ['WorkflowServiceHelper'],
  '流程监控': ['WorkflowServiceHelper'],
  '流程通知': ['WorkflowServiceHelper'],

  // ===== 20. 补充列表插件相关 =====
  '列表双击': ['AbstractListPlugin'],
  '右键菜单': ['AbstractListPlugin'],
  '行颜色': ['AbstractListPlugin'],
  '列表排序': ['AbstractListPlugin'],
  '列表分页': ['AbstractListPlugin'],
  '列表导出': ['AbstractListPlugin'],
  '列表导入': ['AbstractListPlugin'],
  '列表查询': ['AbstractListPlugin'],
  '树形节点': ['AbstractTreeListPlugin']

};

/**
 * 金蝶 SDK 常见关键词 (英文)
 */
const ENGLISH_KEYWORD_PATTERNS = [
  'DynamicObject', 'Workflow', 'Permission', 'Service', 'Helper',
  'Field', 'Entity', 'Form', 'Bill', 'Query', 'Report', 'Collection',
  'Business', 'Data', 'Entity', 'Validate', 'Save', 'Create',
  'Plugin', 'Event', 'List', 'Print', 'Attachment', 'Metadata'
];

/**
 * 提取关键词 (支持中英文)
 */
function extractKeywords(text) {
  const keywords = [];
  const textLower = text.toLowerCase();

  // 1. 首先检查中文关键词映射
  for (const [chinese, englishClasses] of Object.entries(CHINESE_KEYWORD_MAP)) {
    if (textLower.includes(chinese)) {
      // 添加对应的英文类名
      englishClasses.forEach(cls => {
        if (!keywords.includes(cls)) {
          keywords.push(cls);
        }
      });
    }
  }

  // 2. 提取所有英文单词作为关键词
  const englishWords = text.match(/[A-Za-z][a-zA-Z0-9]*/g) || [];
  englishWords.forEach(word => {
    const capitalized = word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    if (capitalized.length > 2 && !keywords.includes(capitalized)) {
      keywords.push(capitalized);
    }
  });

  // 3. 检查金蝶常见关键词
  ENGLISH_KEYWORD_PATTERNS.forEach(pattern => {
    if (textLower.includes(pattern.toLowerCase())) {
      if (!keywords.includes(pattern)) {
        keywords.push(pattern);
      }
    }
  });

  // 如果没有提取到任何关键词，使用默认关键词
  if (keywords.length === 0) {
    // 尝试从文本中提取更多有意义的中文词
    const chineseTerms = text.match(/[\u4e00-\u9fa5]{2,4}/g) || [];
    if (chineseTerms.length > 0) {
      // 返回第一个有意义的词作为后备
      return [chineseTerms[0]];
    }
    return ['DynamicObject'];
  }

  return keywords;
}

/**
 * 提取用法摘要
 */
function extractUsage(summary) {
  if (!summary) return '暂无用法说明';

  const lines = summary.split('\n');
  const usageLines = lines.filter(line =>
    line.includes('用法') || line.includes('使用') || line.includes('示例')
  );

  return usageLines.length > 0 ? usageLines[0] : lines[0] || '暂无用法说明';
}

/**
 * 去重推荐结果
 */
function deduplicateRecommendations(recommendations) {
  const seen = new Set();
  return recommendations.filter(rec => {
    const key = rec.className;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

/**
 * 生成研究报告
 */
async function generateResearchReport(report, outputPath) {
  const content = formatReport(report);
  await fs.writeFile(outputPath, content, 'utf8');
  console.log(`Research report generated: ${outputPath}`);
}

/**
 * 格式化报告
 */
function formatReport(report) {
  let content = `# SDK 研究报告\n\n`;
  content += `**阶段:** ${report.phase}\n`;
  content += `**生成���间:** ${report.generated_at}\n\n`;

  content += `## 关键词\n\n`;
  content += report.keywords.map(k => `- ${k}`).join('\n') + '\n\n';

  content += `## 推荐 SDK 类\n\n`;
  report.recommendations.forEach((rec, index) => {
    content += `### ${index + 1}. ${rec.className}\n\n`;
    content += `**模块:** ${rec.module}\n\n`;
    content += `**相关性:** ${rec.relevance}\n\n`;
    content += `**用法:** ${rec.usage}\n\n`;
  });

  return content;
}

module.exports = {
  researchSDKForPhase,
  recommendSDKClasses,
  generateResearchReport,
  extractKeywords
};

// 测试
if (require.main === module) {
  recommendSDKClasses('需要操作工作流数据').then(results => {
    console.log('\nRecommendations:');
    results.forEach(r => console.log(`  - ${r.className} (${r.module}) [${r.path}]`));
  }).catch(console.error);
}