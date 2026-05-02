#!/usr/bin/env node

/**
 * bos-flow CLI - 金蝶苍穹开发工作流
 *
 * 使用方式:
 *   bos-flow status              查看状态
 *   bos-flow init <项目名>       创建项目
 *   bos-flow research <需求>     研究 SDK
 *   bos-flow discuss-phase <N>   需求讨论
 *   bos-flow spec-phase <N>      需求规格生成
 *   bos-flow template <模板>     复制模板
 *   bos-flow doc <类型>          生成文档
 *   bos-flow phase <N> <操作>    管理阶段
 *   bos-flow check <文件>        检查规范
 */

const { Command } = require('commander');
const path = require('path');

// 导入模块
let state, agentSdkResearch, init, template, docGenerator;

try {
  state = require('../lib/state');
  agentSdkResearch = require('../lib/agent-sdk-research');
  init = require('../lib/init');
  template = require('../lib/template');
  docGenerator = require('../lib/doc-generator');
} catch (e) {
  // 模块加载失败，延迟加载
}

const program = new Command();

// 主信息
program
  .name('kingdee-dev-plugin')
  .description('金蝶开发工作流 - 八阶段开发流程')
  .version('1.0.4');

// ==================== 状态命令 ====================
program
  .command('status')
  .description('查看项目状态')
  .option('-v, --verbose', '详细输出')
  .action((opts) => {
    const s = require('../lib/state');
    const fullState = s.loadState();

    console.log('\n📊 bos-flow 项目状态\n');
    console.log(`项目: ${fullState.project}`);
    console.log(`当前阶段: ${fullState.current_phase}`);
    console.log(`版本: ${fullState.version}\n`);

    console.log('阶段:');
    fullState.phases.forEach(p => {
      const icon = p.status === 'completed' ? '✅' : p.status === 'in_progress' ? '🔄' : '⏳';
      console.log(`  ${icon} ${p.id}. ${p.name}: ${p.status}`);
    });

    if (opts.verbose) {
      console.log('\n详细信息:');
      console.log(`  SDK 已复制: ${fullState.sdk_copied ? '是' : '否'}`);
      console.log(`  索引已构建: ${fullState.index_built ? '是' : '否'}`);
      console.log(`  模板已创建: ${fullState.templates_created ? '是' : '否'}`);
    }
    console.log('');
  });

// ==================== 新建项目命令 ====================
program
  .command('kd-new-project [name]')
  .description('新建项目：初始化项目+理解项目结构 (Phase 1-2)')
  .option('-d, --description <desc>', '项目描述')
  .option('--skip-scan', '跳过项目扫描')
  .option('-v, --verbose', '详细输出')
  .action(async (name, opts) => {
    const initModule = require('../lib/init');
    console.log('\n📦 初始化项目...\n');
    await initModule.initProject(name || 'current', {
      description: opts.description,
      skipScan: opts.skipScan
    });

    // 自动理解项目
    if (!opts.skipScan) {
      console.log('\n🔍 理解项目结构...\n');
      const domainKnowledgeOrchestrator = require('../lib/domain-knowledge-orchestrator.js');
      const orchestrator = new domainKnowledgeOrchestrator.DomainKnowledgeOrchestrator({ basePath: process.cwd() });
      await orchestrator.initialize();
      await orchestrator.understandProject(process.cwd());
      console.log('\n✅ 项目初始化和理解完成\n');
    }
  });

// ==================== 研究命令 ====================
program
  .command('research <requirement>')
  .description('研究 SDK 相关功能')
  .option('-k, --keywords <words>', '关键词')
  .option('-o, --output <file>', '输出文件')
  .option('--llm', '使用 Claude Code 语义分析（推荐）')
  .option('--local', '仅使用本地搜索')
  .action(async (req, opts) => {
    const isComplex = isComplexRequirement(req);
    const useLLM = opts.llm || isComplex;

    console.log(`\n🔍 分析需求: ${req.substring(0, 50)}${req.length > 50 ? '...' : ''}`);
    console.log(`   复杂度判定: ${isComplex ? '复杂 (建议使用语义分析)' : '简单 (本地搜索)'}`);

    if (useLLM) {
      // 使用 Claude Code 当前上下文进行语义分析（不调用外部 API）
      console.log('   模式: Claude Code 语义分析\n');
      const llmResearch = require('../lib/llm-sdk-research');

      const result = await llmResearch.claudeCodeSemanticAnalysis(req);

      // 显示语义分析提示
      if (result.message) {
        console.log(result.message);
      }

      // 使用本地搜索作为基础
      const research = require('../lib/agent-sdk-research');
      const keywords = research.extractKeywords(req);
      const results = await research.recommendSDKClasses(req);

      const report = {
        phase: 'Research (语义分析)',
        keywords: keywords,
        recommendations: results,
        analysis: '复杂需求已检测，建议使用 Claude Code 语义分析获得更准确的 SDK 推荐',
        generated_at: new Date().toISOString()
      };

      await research.generateResearchReport(report, opts.output || 'SDK-RESEARCH.md');

      console.log(`\n✅ 本地搜索找到 ${results.length} 个推荐类`);
      console.log('   提示: 对于复杂业务需求，建议复制上方的语义分析提示到 Claude Code 对话中获取更精准的推荐\n');
    } else {
      // 使用本地搜索
      console.log('   模式: 本地关键词搜索\n');

      const research = require('../lib/agent-sdk-research');
      const keywords = opts.keywords ? opts.keywords.split(',') : research.extractKeywords(req);
      const results = await research.recommendSDKClasses(req);

      const report = {
        phase: 'Research',
        keywords,
        recommendations: results,
        generated_at: new Date().toISOString()
      };

      await research.generateResearchReport(report, opts.output || 'SDK-RESEARCH.md');
      console.log(`\n✅ 找到 ${results.length} 个推荐类\n`);
    }
  });

// 判断需求是否复杂
function isComplexRequirement(requirement) {
  const complexIndicators = [
    '如果', '则', '并且', '或者', '还是',
    '当', '满足', '条件', '判断',
    '同时', '期间', '持续',
    '状态', '审核', '提交',
    '超期', '逾期', '延迟',
    '消息', '推送', '通知',
    '报表', '统计', '分析',
    '红色', '标识', '显示',
    '事件', '触发', '监听',
    '工单', '入库', '委外', '计划',
    '完工', '交货', '采购', '生产'
  ];

  const lower = requirement.toLowerCase();
  let score = 0;

  for (const indicator of complexIndicators) {
    if (lower.includes(indicator)) {
      score++;
    }
  }

  // 超过 2 个复杂指标，或者需求长度超过 60 字符，认为是复杂需求
  return score >= 2 || requirement.length > 60;
}

// ==================== 需求讨论命令 ====================
program
  .command('kd-discuss <phase>')
  .description('需求讨论：捕获设计决策 (Phase N)')
  .option('--auto', '自动选择推荐答案')
  .option('--text', '使用纯文本模式（适合远程会话）')
  .option('--mode <mode>', '讨论模式：discuss 或 assumptions', 'discuss')
  .action(async (phase, opts) => {
    const discussEngine = require('../lib/discuss-engine');
    const phaseNum = parseInt(phase);

    if (isNaN(phaseNum)) {
      console.error('错误：阶段编号必须是数字');
      process.exit(1);
    }

    console.log(`\n📋 启动 Phase ${phaseNum} 需求讨论...\n`);

    try {
      await discussEngine.startDiscussion(phaseNum, {
        mode: opts.mode,
        auto: opts.auto
      });

      console.log('\n✅ 需求讨论完成\n');
      console.log('输出文件：.planning/phases/{phase}/{phase}-CONTEXT.md\n');
    } catch (error) {
      console.error('错误：', error.message);
      process.exit(1);
    }
  });

// ==================== 需求规格生成命令 ====================
program
  .command('kd-spec <phase>')
  .description('需求规格：生成详细规格 (Phase N)')
  .option('--auto', '自动选择推荐默认值')
  .option('--text', '使用纯文本模式')
  .action(async (phase, opts) => {
    const specGenerator = require('../lib/spec-generator');
    const state = require('../lib/state');
    const phaseNum = parseInt(phase);

    if (isNaN(phaseNum)) {
      console.error('错误：阶段编号必须是数字');
      process.exit(1);
    }

    console.log(`\n📄 生成 Phase ${phaseNum} 需求规格...\n`);

    try {
      // 加载项目状态
      const projectState = state.loadState();

      // 查找阶段目录
      const fs = require('fs');
      const path = require('path');
      const phasesDir = path.join(process.cwd(), '.planning', 'phases');
      const phasePrefix = String(phaseNum).padStart(2, '0') + '-';

      let phaseDir = null;
      const dirs = fs.readdirSync(phasesDir);
      for (const dir of dirs) {
        if (dir.startsWith(phasePrefix)) {
          phaseDir = path.join(phasesDir, dir);
          break;
        }
      }

      if (!phaseDir) {
        throw new Error(`Phase ${phaseNum} 目录不存在`);
      }

      // 模拟需求（实际应从用户交互获取）
      const requirements = [
        {
          label: '需求讨论功能',
          current: '无需求确认流程',
          target: '支持结构化需求讨论',
          acceptance: '用户可以启动讨论流程'
        }
      ];

      const boundaries = {
        inScope: ['需求讨论', '决策捕获', '文档生成'],
        outOfScope: [
          {
            name: '交互式 UI（推迟到 v2）',
            reason: '当前版本聚焦核心功能'
          }
        ]
      };

      const acceptanceCriteria = [
        '需求讨论命令可用',
        'CONTEXT.md 自动生成',
        'SPEC.md 自动生成'
      ];

      const scores = {
        goalClarity: 0.8,
        boundaryClarity: 0.75,
        constraintClarity: 0.7,
        acceptanceCriteria: 0.75
      };

      const result = await specGenerator.generateSpec(
        phaseDir,
        phaseNum,
        '需求确认阶段',
        requirements,
        boundaries,
        acceptanceCriteria,
        scores
      );

      console.log(`\n✅ 需求规格生成完成\n`);
      console.log(`输出文件：${result.filePath}`);
      console.log(`模糊度评分：${result.ambiguity.toFixed(2)} (目标：≤ 0.20)\n`);

      if (result.ambiguity > 0.20) {
        console.log('⚠️  警告：模糊度过高，建议进一步澄清需求\n');
      }
    } catch (error) {
      console.error('错误：', error.message);
      process.exit(1);
    }
  });

// ==================== 模板命令 ====================
program
  .command('template [name]')
  .description('复制阶段模板 (planning/development/testing/uat/all)')
  .option('--list', '列出模板')
  .option('-p, --project-name <name>', '项目名')
  .action(async (name, opts) => {
    const tpl = require('../lib/template');
    if (opts.list || !name) {
      await tpl.listTemplates();
    } else {
      await tpl.copyTemplate(name, { projectName: opts.projectName });
    }
  });

// ==================== 文档命令 ====================
program
  .command('doc <type>')
  .description('生成文档 (readme/changelog/api/all)')
  .action(async (type) => {
    const doc = require('../lib/doc-generator');
    if (type === 'all') {
      await doc.generateReadme();
      await doc.generateChangelog();
      await doc.generateApiDoc();
      console.log('\n✅ 所有文档已生成');
    } else if (type === 'readme') {
      await doc.generateReadme();
    } else if (type === 'changelog') {
      await doc.generateChangelog();
    } else if (type === 'api') {
      await doc.generateApiDoc();
    }
  });

// ==================== 阶段命令 ====================
program
  .command('phase <number> <action>')
  .description('管理阶段 (start/complete/status)')
  .action((num, action) => {
    const s = require('../lib/state');
    const phaseId = parseInt(num);

    if (action === 'start') {
      s.updatePhaseStatus(phaseId, 'in_progress');
      console.log(`\n✅ 阶段 ${phaseId} 已开始`);
    } else if (action === 'complete') {
      s.updatePhaseStatus(phaseId, 'completed');
      console.log(`\n✅ 阶段 ${phaseId} 已完成`);
    } else if (action === 'status') {
      const status = s.getPhaseStatus(phaseId);
      console.log(`\n阶段 ${phaseId} 状态: ${status}`);
    }
  });

// ==================== 检查命令 ====================
program
  .command('check [file]')
  .description('检查代码规范')
  .action(async (file) => {
    if (!file) {
      console.log('\n使用: bos-flow check <文件路径>');
      console.log('示例: bos-flow check src/MyService.cs');
      return;
    }

    const checker = require('../lib/standards-checker');
    const fs = require('fs');

    if (!fs.existsSync(file)) {
      console.log(`\n❌ 文件不存在: ${file}`);
      return;
    }

    const code = fs.readFileSync(file, 'utf8');
    const checkerObj = new checker();
    const results = checkerObj.checkAll(code);

    console.log('\n📋 规范检查结果\n');
    if (results.valid) {
      console.log('✅ 代码符合规范!');
    } else {
      console.log(`❌ 发现 ${results.summary.errors} 个错误, ${results.summary.warnings} 个警告\n`);
      results.violations.forEach((v, i) => {
        console.log(`${i+1}. [${v.severity}] ${v.message}`);
        console.log(`   位���: 第 ${v.line} 行 | 规则: ${v.rule}`);
        console.log('');
      });
    }
  });

// ==================== 常量类扫描命令 ====================
program
  .command('scan-constants [path]')
  .description('扫描项目中的常量类 (以 Cons/Con/Constant 结尾)')
  .option('-o, --output <file>', '输出到文件')
  .option('-v, --verbose', '详细输出')
  .option('-j, --json', 'JSON 格式输出')
  .action(async (path, opts) => {
    const scanner = require('../lib/constant-scanner');
    const projectPath = path || process.cwd();

    console.log(`\n🔍 扫描目录: ${projectPath}\n`);

    try {
      const results = await scanner.scanProject(projectPath);

      if (opts.json) {
        // JSON 格式输出
        console.log(scanner.toJSON(results));
      } else {
        // 格式化输出
        console.log(scanner.formatResults(results, { verbose: opts.verbose }));
      }

      // 输出到文件
      if (opts.output) {
        const fs = require('fs');
        fs.writeFileSync(opts.output, scanner.toJSON(results));
        console.log(`✅ 结果已保存到: ${opts.output}\n`);
      }
    } catch (error) {
      console.error(`\n❌ 扫描失败: ${error.message}\n`);
      process.exit(1);
    }
  });

// ==================== KD 命令系列 ====================

// kd-analyze 命令（需求分析 - 整合搜索+推荐+研究+约束生成）
program
  .command('kd-analyze <requirement>')
  .description('需求分析：统一搜索+智能推荐+SDK研究+约束生成')
  .option('-o, --output <dir>', '约束输出目录')
  .option('-d, --deep', '深度研究（包含方法签名）')
  .option('-i, --interactive', '交互模式')
  .option('-l, --limit <number>', '限制推荐类数量', '5')
  .option('--no-search', '禁用统一搜索')
  .option('--no-recommend', '禁用智能推荐')
  .option('--no-constraint', '禁用约束文件生成')
  .action(async (requirement, opts) => {
    const { KdAnalyze } = require('../lib/kd-analyze');
    const analyzer = new KdAnalyze({ outputDir: opts.output });

    await analyzer.execute(requirement, {
      search: opts.search !== false,
      recommend: opts.recommend !== false,
      generateConstraint: opts.constraint !== false,
      deep: opts.deep,
      interactive: opts.interactive,
      limit: parseInt(opts.limit)
    });
  });

// kd-auto 命令（核心自动化命令 - 保留作为快捷方式）
program
  .command('kd-auto <task>')
  .description('自动化 SDK 研究和约束生成')
  .option('-o, --output <dir>', '约束输出目录')
  .option('-d, --deep', '深度研究（包含方法签名）')
  .option('-i, --interactive', '交互模式')
  .option('-l, --limit <number>', '限制推荐类数量', '5')
  .action(async (task, opts) => {
    const kdAuto = require('../lib/kd-auto');
    await kdAuto.execute(task, {
      outputDir: opts.output,
      deep: opts.deep,
      interactive: opts.interactive,
      limit: parseInt(opts.limit)
    });
  });

// kd-research 命令（SDK研究）
program
  .command('kd-research <requirement>')
  .description('研究 SDK 相关功能')
  .option('-k, --keywords <words>', '关键词')
  .option('-o, --output <file>', '输出文件')
  .option('-f, --format <type>', '输出格式 (markdown/json)', 'markdown')
  .action(async (req, opts) => {
    const agent = require('../lib/agent-sdk-research');
    const results = await agent.recommendSDKClasses(req);

    console.log('\n📊 SDK 研究结果\n');
    console.log(`需求: ${req}\n`);
    console.log(`找到 ${results.length} 个推荐类:\n`);

    results.forEach((rec, i) => {
      console.log(`${i + 1}. ${rec.className} (${rec.module})`);
      console.log(`   路径: ${rec.path}`);
      console.log(`   方法数: ${rec.methods}`);
      console.log(`   得分: ${rec.score}\n`);
    });

    if (opts.output) {
      const report = {
        requirement: req,
        keywords: opts.keywords ? opts.keywords.split(',') : agent.extractKeywords(req),
        recommendations: results,
        generated_at: new Date().toISOString()
      };

      if (opts.format === 'json') {
        const fs = require('fs');
        fs.writeFileSync(opts.output, JSON.stringify(report, null, 2));
      } else {
        await agent.generateResearchReport(report, opts.output);
      }
      console.log(`\n✅ 研究报告已保存: ${opts.output}\n`);
    }
  });

// kd-gen 命令（约束生成）
program
  .command('kd-gen <className>')
  .description('生成 SDK 类约束文件')
  .option('-o, --output <dir>', '输出目录')
  .option('-f, --format <type>', '输出格式 (prompt|schema|all)', 'prompt')
  .option('-t, --template', '生成代码模板')
  .action(async (className, opts) => {
    const generator = require('../lib/kd-constraint-generator');

    console.log(`\n🔧 生成 ${className} 的约束文件...\n`);

    try {
      const files = await generator.generate(className, {
        outputDir: opts.output,
        format: opts.format,
        template: opts.template
      });

      console.log('✅ 约束文件已生成:\n');
      files.forEach(file => {
        console.log(`  - ${file}`);
      });
      console.log('');
    } catch (error) {
      console.error(`\n❌ 生成失败: ${error.message}\n`);
    }
  });

// kd-list 命令（SDK列表）
program
  .command('kd-list [module]')
  .description('列出 SDK 模块、类或方法')
  .option('-m, --methods', '显示方法列表')
  .option('-f, --filter <pattern>', '过滤类名')
  .action(async (module, opts) => {
    const index = require('../sdk/modules.json');

    console.log('\n📚 SDK 知识库列表\n');
    console.log(`模块总数: ${index.total_modules}`);
    console.log(`类总数: ${index.total_classes}`);
    console.log(`方法总数: ${index.total_methods}\n`);

    if (module) {
      // 显示特定模块的类
      const mod = index.modules.find(m => m.id === module || m.name === module);
      if (mod) {
        console.log(`模块: ${mod.name} (${mod.id})\n`);
        console.log('类列表:\n');
        mod.classes.forEach(cls => {
          if (cls.name !== '00_模块索引') {
            console.log(`  - ${cls.name} (${cls.methods} 方法)`);
          }
        });
      } else {
        console.log(`❌ 未找到模块: ${module}`);
      }
    } else if (opts.filter) {
      // 过滤类名
      console.log('过滤结果:\n');
      const pattern = new RegExp(opts.filter, 'i');
      index.modules.forEach(mod => {
        mod.classes.forEach(cls => {
          if (pattern.test(cls.name)) {
            console.log(`  - ${cls.name} (${mod.name}, ${cls.methods} 方法)`);
          }
        });
      });
    } else {
      // 显示所有模块
      console.log('模块列表:\n');
      index.modules.forEach(mod => {
        const classCount = mod.classes.filter(c => c.name !== '00_模块索引').length;
        console.log(`  ${mod.name} (${mod.id})`);
        console.log(`    - ${classCount} 个类\n`);
      });
    }
    console.log('');
  });

// kd-scan-project 命令（项目扫描）
program
  .command('kd-scan-project [path]')
  .description('扫描金蝶项目，学习项目风格，生成配置文件')
  .option('-v, --verbose', '详细输出')
  .action(async (projectPath, opts) => {
    const scanProject = require('../lib/scan-project');
    await scanProject.scanProject(projectPath, { verbose: opts.verbose });
  });

// ==================== 项目理解命令 ====================
program
  .command('understand [path]')
  .description('理解项目结构，识别业务领域和实体')
  .option('-v, --verbose', '详细输出')
  .option('-j, --json', 'JSON 格式输出')
  .action(async (projectPath, opts) => {
    const projectPathArg = projectPath || process.cwd();

    console.log(`\n🔍 理解项目: ${projectPathArg}\n`);
    console.log('='.repeat(50));

    try {
      // 使用编排器
      const { DomainKnowledgeOrchestrator } = require('../lib/domain-knowledge-orchestrator.js');
      const orchestrator = new DomainKnowledgeOrchestrator({ basePath: projectPathArg });
      await orchestrator.initialize();

      const result = await orchestrator.understandProject(projectPathArg);

      if (opts.json) {
        console.log(JSON.stringify(result, null, 2));
      } else {
        console.log('\n### 项目结构\n');
        console.log(`**目录类型:** ${result.structure.type}`);
        console.log(`**源代码目录:** ${result.structure.sourceDir}`);
        console.log(`**模块数量:** ${result.modules?.length || 0}`);

        if (result.domainInfo) {
          console.log('\n### 业务领域\n');
          console.log(`**识别领域:** ${result.domainInfo.domain}`);
          console.log(`**置信度:** ${(result.domainInfo.confidence * 100).toFixed(0)}%`);
        }

        if (result.entities?.length > 0) {
          console.log('\n### 识别实体\n');
          result.entities.slice(0, 10).forEach(e => {
            console.log(`- ${e.name} (${e.type})`);
          });
          if (result.entities.length > 10) {
            console.log(`  ... 还有 ${result.entities.length - 10} 个实体`);
          }
        }
      }

      console.log('\n✓ 项目理解完成\n');
    } catch (error) {
      console.error(`\n❌ 项目理解失败: ${error.message}\n`);
      process.exit(1);
    }
  });

// ==================== 需求分析-搜索命令 ====================
program
  .command('kd-search <query>')
  .description('统一搜索SDK文档和社区内容')
  .option('-s, --source <source>', '搜索来源: sdk, community, all', 'all')
  .option('-l, --limit <num>', '结果数量限制', '10')
  .action(async (query, opts) => {
    const { UnifiedSearcher } = require('../lib/unified-search.js');
    const searcher = new UnifiedSearcher();

    console.log(`\n🔍 搜索: ${query} (来源: ${opts.source})\n`);
    console.log('='.repeat(50));

    try {
      const results = await searcher.search(query, {
        source: opts.source,
        limit: parseInt(opts.limit, 10)
      });

      if (results.length === 0) {
        console.log('未找到相关结果\n');
        return;
      }

      console.log(`找到 ${results.length} 条结果:\n`);

      results.forEach(r => {
        console.log(`${r.source} ${r.title}`);
        console.log(`   分类: ${r.category || 'N/A'} | 相关度: ${(r.score * 100).toFixed(1)}%`);
        if (r.extra) console.log(`   ${r.extra}`);
        if (r.content) {
          const preview = r.content.substring(0, 60).replace(/\n/g, ' ');
          console.log(`   ${preview}...`);
        }
        console.log('');
      });

      console.log('✓ 搜索完成\n');
    } catch (error) {
      console.error(`\n❌ 搜索失败: ${error.message}\n`);
      process.exit(1);
    }
  });

// ==================== 需求分析-推荐命令 ====================
program
  .command('kd-recommend <requirement>')
  .description('智能推荐SDK API和社区最佳实践')
  .option('-l, --limit <num>', '推荐数量限制', '5')
  .action(async (requirement, opts) => {
    const { IntelligentRecommender } = require('../lib/intelligent-recommender.js');
    const recommender = new IntelligentRecommender();

    console.log(`\n🔍 智能推荐: ${requirement.substring(0, 40)}${requirement.length > 40 ? '...' : ''}\n`);
    console.log('='.repeat(50));

    try {
      const report = await recommender.recommend(requirement, {
        limit: parseInt(opts.limit, 10)
      });

      console.log(`\n### 推荐概要`);
      console.log(`总推荐数: ${report.summary.total}`);
      console.log(`SDK API: ${report.summary.sdk_apis}`);
      console.log(`社区文章: ${report.summary.community_articles}`);
      console.log(`置���度: ${(report.summary.confidence * 100).toFixed(1)}%`);

      if (report.sdk_apis.length > 0) {
        console.log(`\n### SDK API 推荐`);
        report.sdk_apis.slice(0, 3).forEach((r, i) => {
          console.log(`\n${i + 1}. [SDK] ${r.title}`);
          console.log(`   分类: ${r.category}`);
          console.log(`   置信度: ${(r.confidence * 100).toFixed(1)}%`);
        });
      }

      if (report.community_articles.length > 0) {
        console.log(`\n### 社区最佳实践`);
        report.community_articles.slice(0, 3).forEach((r, i) => {
          console.log(`\n${i + 1}. ${r.source} ${r.title}`);
          console.log(`   分类: ${r.category}`);
          console.log(`   置信度: ${(r.confidence * 100).toFixed(1)}%`);
        });
      }

      console.log('\n✓ 推荐完成\n');
    } catch (error) {
      console.error(`\n❌ 推荐失败: ${error.message}\n`);
      process.exit(1);
    }
  });

// ==================== 需求分析命令 ====================
program
  .command('analyze <requirement>')
  .description('语义分析业务需求，提取功能点，推荐 SDK，提供实现思路')
  .option('-o, --output <file>', '输出到文件')
  .option('-j, --json', 'JSON 格式输出')
  .action(async (req, opts) => {
    const ra = require('../lib/requirement-analyzer');
    const RequirementAnalyzer = ra.RequirementAnalyzer;
    const analyzer = new RequirementAnalyzer();

    console.log(`\n📊 需求分析: ${req.substring(0, 50)}${req.length > 50 ? '...' : ''}\n`);
    console.log('='.repeat(50));

    // 1. 分析需求
    const analysis = await analyzer.analyze(req);

    // 2. 获取 SDK 推荐
    const sdkRecommendations = await analyzer.recommendSDK(analysis);

    // 3. 生成实现思路
    const implementationGuide = analyzer.generateImplementation(analysis);

    // 输出结果
    if (opts.json) {
      // JSON 格式输出
      const result = {
        requirement: req,
        analysis: analysis,
        sdkRecommendations: sdkRecommendations,
        implementationGuide: implementationGuide
      };
      console.log(JSON.stringify(result, null, 2));
    } else {
      // Markdown 格式输出
      console.log('\n### 1. 需求分析结果\n');
      console.log(`**复杂度:** ${analysis.complexity}/10`);
      console.log(`**摘要:** ${analysis.summary}\n`);
      console.log('**功能点:**\n');
      analysis.features.forEach(f => {
        const priorityIcon = f.priority === 'high' ? '🔴' : f.priority === 'medium' ? '🟡' : '🟢';
        console.log(`- ${priorityIcon} ${f.name}: ${f.description}`);
      });
      console.log(`\n**关键词:** ${analysis.keywords.join(', ')}\n`);

      console.log('### 2. SDK 推荐\n');
      sdkRecommendations.slice(0, 5).forEach(r => {
        console.log(`**${r.className}** (${r.module})`);
        console.log(`  - 置信度: ${(r.confidence * 100).toFixed(0)}%`);
        console.log(`  - 用途: ${r.usage}\n`);
      });

      // 最佳实践推荐（如果可用）
      if (analysis.best_practices && analysis.best_practices.length > 0) {
        console.log('### 3. 最佳实践推荐\n');
        analysis.best_practices.slice(0, 5).forEach(bp => {
          console.log(`**${bp.title}**`);
          console.log(`  - 相关度: ${((bp.score || 0) * 100).toFixed(0)}%`);
          if (bp.code_example) {
            console.log(`  - 代码示例: ${bp.code_example}`);
          }
          console.log(`  - ${bp.description ? bp.description.substring(0, 50) + '...' : ''}\n`);
        });
        console.log('### 4. 实现思路\n');
      } else {
        console.log('### 3. 实现思路\n');
      }
      implementationGuide.steps.forEach(s => {
        console.log(`**${s.order}. ${s.title}**`);
        console.log(`   ${s.description}\n`);
      });
    }

    // 输出到文件
    if (opts.output) {
      const fs = require('fs');
      let content;

      if (opts.output.endsWith('.json')) {
        content = JSON.stringify({
          requirement: req,
          analysis,
          sdkRecommendations,
          implementationGuide
        }, null, 2);
      } else {
        // Markdown 格式
        content = `# 需求分析报告

## 需求
${req}

## 分析结果

### 功能点
${analysis.features.map(f => `- ${f.name}: ${f.description} (${f.priority})`).join('\n')}

### 复杂度
${analysis.complexity}/10

### 关键词
${analysis.keywords.join(', ')}

## SDK 推荐

${sdkRecommendations.slice(0, 5).map(r => `### ${r.className} (${r.module})

- 置信度: ${(r.confidence * 100).toFixed(0)}%
- 用途: ${r.usage}

`).join('\n')}

## 实现步骤

${implementationGuide.steps.map(s => `### ${s.order}. ${s.title}

${s.description}

\`\`\`java
${s.code}
\`\`\`

`).join('\n')}

---
*Generated by bos-flow at ${new Date().toISOString()}*
`;
      }

      fs.writeFileSync(opts.output, content);
      console.log(`\n✅ 结果已保存到: ${opts.output}\n`);
    }
  });

// ==================== kd-add-phase 命令 ====================
program
  .command('kd-add-phase <description>')
  .description('添加新阶段到当前里程碑')
  .action(async (description) => {
    const state = require('../lib/state');
    const fullState = state.loadState();

    const newPhaseId = fullState.phases.length + 1;
    const slug = description.toLowerCase().replace(/\s+/g, '-').substring(0, 20);

    fullState.phases.push({
      id: newPhaseId,
      name: description,
      slug: slug,
      status: 'pending'
    });

    state.saveState(fullState);
    console.log(`\n✅ 已添加 Phase ${newPhaseId}: ${description}\n`);
  });

// ==================== kd-insert-phase 命令 ====================
program
  .command('kd-insert-phase <after> <description>')
  .description('在指定阶段后插入新阶段')
  .action(async (after, description) => {
    const state = require('../lib/state');
    const fullState = state.loadState();

    const afterNum = parseInt(after);
    const newPhaseId = afterNum + 0.1;
    const slug = description.toLowerCase().replace(/\s+/g, '-').substring(0, 20);

    // 插入新阶段
    const newPhase = {
      id: newPhaseId,
      name: description,
      slug: slug,
      status: 'pending'
    };

    const insertIndex = fullState.phases.findIndex(p => p.id === afterNum) + 1;
    fullState.phases.splice(insertIndex, 0, newPhase);

    state.saveState(fullState);
    console.log(`\n✅ 已插入 Phase ${newPhaseId}: ${description}\n`);
  });

// ==================== kd-remove-phase 命令 ====================
program
  .command('kd-remove-phase <number>')
  .description('删除指定阶段并重新编号')
  .action(async (number) => {
    const state = require('../lib/state');
    const fullState = state.loadState();

    const phaseNum = parseFloat(number);
    const index = fullState.phases.findIndex(p => p.id === phaseNum);

    if (index === -1) {
      console.log(`\n❌ 未找到 Phase ${phaseNum}\n`);
      return;
    }

    const removed = fullState.phases.splice(index, 1)[0];
    state.saveState(fullState);

    console.log(`\n✅ 已删除 Phase ${phaseNum}: ${removed.name}\n`);
  });

// ==================== kd-new-milestone 命令 ====================
program
  .command('kd-new-milestone <name>')
  .description('创建新里程碑')
  .option('--reset', '重置阶段编号')
  .action(async (name, opts) => {
    const state = require('../lib/state');
    const fullState = state.loadState();

    console.log(`\n📦 创建新里程碑: ${name}\n`);

    if (opts.reset) {
      fullState.phases = fullState.phases.map(p => ({ ...p, status: 'pending' }));
      console.log('✅ 阶段状态已重置\n');
    }

    fullState.milestone = name;
    fullState.current_phase = 1;
    state.saveState(fullState);

    console.log(`里程碑: ${name}`);
    console.log(`阶段数: ${fullState.phases.length}\n`);
  });

// ==================== kd-complete-milestone 命令 ====================
program
  .command('kd-complete-milestone <version>')
  .description('完成里程碑并归档')
  .action(async (version) => {
    const state = require('../lib/state');
    const fullState = state.loadState();

    console.log(`\n📦 完成里程碑: ${fullState.milestone || '未命名'}\n`);
    console.log(`版本: ${version}`);
    console.log(`阶段数: ${fullState.phases.length}\n`);

    // 统计完成情况
    const completed = fullState.phases.filter(p => p.status === 'completed').length;
    console.log(`完成进度: ${completed}/${fullState.phases.length}\n`);

    console.log('✅ 里程碑已完成\n');
  });

// ==================== kd-progress 命令 ====================
program
  .command('kd-progress')
  .description('查看项目进度')
  .action(async () => {
    const state = require('../lib/state');
    const fullState = state.loadState();

    console.log('\n📊 项目进度\n');
    console.log(`里程碑: ${fullState.milestone || '未设置'}`);
    console.log(`当前阶段: ${fullState.current_phase}\n`);

    const total = fullState.phases.length;
    const completed = fullState.phases.filter(p => p.status === 'completed').length;
    const inProgress = fullState.phases.filter(p => p.status === 'in_progress').length;

    console.log(`进度: ${completed}/${total} (${((completed/total)*100).toFixed(0)}%)\n`);

    fullState.phases.forEach(p => {
      const icon = p.status === 'completed' ? '✅' : p.status === 'in_progress' ? '🔄' : '⏳';
      console.log(`${icon} Phase ${p.id}: ${p.name}`);
    });
    console.log('');
  });

// ==================== kd-resume 命令 ====================
program
  .command('kd-resume')
  .description('恢复工作：显示当前状态和下一步')
  .action(async () => {
    const state = require('../lib/state');
    const fullState = state.loadState();

    console.log('\n🔄 恢复工作\n');
    console.log(`项目: ${fullState.project || '未设置'}`);
    console.log(`里程碑: ${fullState.milestone || '未设置'}`);
    console.log(`当前阶段: ${fullState.current_phase}\n`);

    // 找到下一个待处理的阶段
    const nextPhase = fullState.phases.find(p => p.status === 'pending' || p.status === 'in_progress');
    if (nextPhase) {
      console.log(`下一步: kd-discuss ${nextPhase.id}\n`);
    } else {
      console.log('所有阶段已完成！\n');
    }
  });

// ==================== kd-debug 命令 ====================
program
  .command('kd-debug [issue]')
  .description('调试：系统性追踪问题')
  .option('-v, --verbose', '详细输出')
  .action(async (issue, opts) => {
    const fs = require('fs');
    const path = require('path');
    const debugDir = path.join(process.cwd(), '.planning', 'debug');

    if (!issue) {
      // 恢复调试会话
      console.log('\n🔍 恢复调试会话\n');
      if (fs.existsSync(debugDir)) {
        const files = fs.readdirSync(debugDir).filter(f => f.endsWith('.md'));
        if (files.length > 0) {
          console.log('调试记录:');
          files.forEach(f => console.log(`  - ${f}`));
        } else {
          console.log('无调试记录');
        }
      } else {
        console.log('无调试记录');
      }
      console.log('');
      return;
    }

    // 创建新调试记录
    await fs.promises.mkdir(debugDir, { recursive: true });
    const slug = issue.toLowerCase().replace(/\s+/g, '-').substring(0, 30);
    const debugFile = path.join(debugDir, `${slug}.md`);

    const content = `# 调试记录: ${issue}

## 问题描述
${issue}

## 调查步骤
1. [ ] 收集症状
2. [ ] 分析原因
3. [ ] 验证假设
4. [ ] 实施修复
5. [ ] 验证修复

## 状态
进行中

---
创建时间: ${new Date().toISOString()}
`;

    await fs.promises.writeFile(debugFile, content, 'utf8');
    console.log(`\n🔍 创建调试记录\n`);
    console.log(`问题: ${issue}`);
    console.log(`文件: ${debugFile}\n`);
  });

// ==================== kd-quick 命令 ====================
program
  .command('kd-quick [task]')
  .description('快速任务：跳过规划直接执行')
  .option('-f, --full', '完整流程')
  .option('-v, --validate', '验证模式')
  .action(async (task, opts) => {
    if (!task) {
      console.log('\n用法: kd-quick <任务描述>\n');
      console.log('选项:');
      console.log('  -f, --full      完整流程（讨论+研究+验证）');
      console.log('  -v, --validate  验证模式\n');
      return;
    }

    console.log('\n⚡ 快速任务\n');
    console.log(`任务: ${task}\n`);

    // 直接执行需求分析
    const { KdAnalyze } = require('../lib/kd-analyze');
    const analyzer = new KdAnalyze();
    await analyzer.execute(task, {
      search: true,
      recommend: true,
      generateConstraint: !opts.validate,
      limit: 5
    });

    console.log('\n✅ 快速任务完成\n');
  });

// ==================== kd-fast 命令 ====================
program
  .command('kd-fast [description]')
  .description('极速任务：内联执行，无规划文件')
  .action(async (description) => {
    if (!description) {
      console.log('\n用法: kd-fast <任务描述>\n');
      console.log('适用于: 修改错别字、配置更改、简单添加\n');
      return;
    }

    console.log('\n🚀 极速任务\n');
    console.log(`任务: ${description}\n`);
    console.log('提示: 这是一个内联执行任务，不会创建规划文件\n');
    console.log('✅ 任务已记录\n');
  });

// ==================== kd-do 命令 ====================
program
  .command('kd-do <description>')
  .description('智能路由：自动匹配命令')
  .action(async (description) => {
    const text = description.toLowerCase();

    console.log('\n🎯 智能路由\n');
    console.log(`输入: ${description}\n`);

    // 简单关键词匹配
    let matched = null;

    if (text.includes('新建') || text.includes('创建项目') || text.includes('初始化')) {
      matched = 'kd-new-project';
    } else if (text.includes('讨论') || text.includes('需求')) {
      matched = 'kd-discuss';
    } else if (text.includes('计划') || text.includes('规划')) {
      matched = 'kd-plan';
    } else if (text.includes('执行') || text.includes('开发')) {
      matched = 'kd-execute';
    } else if (text.includes('验证') || text.includes('测试')) {
      matched = 'kd-verify';
    } else if (text.includes('进度') || text.includes('状态')) {
      matched = 'kd-progress';
    } else if (text.includes('调试') || text.includes('修复') || text.includes('bug')) {
      matched = 'kd-debug';
    } else if (text.includes('搜索') || text.includes('查找')) {
      matched = 'kd-search';
    } else if (text.includes('推荐')) {
      matched = 'kd-recommend';
    } else if (text.includes('分析')) {
      matched = 'kd-analyze';
    } else {
      matched = 'kd-quick';
    }

    console.log(`匹配命令: ${matched}\n`);
    console.log(`执行: kingdee-dev-plugin ${matched}\n`);
  });

// ==================== kd-next 命令 ====================
program
  .command('kd-next')
  .description('自动推进到下一阶段')
  .action(async () => {
    const state = require('../lib/state');
    const fullState = state.loadState();

    console.log('\n📊 当前项目状态\n');
    console.log(`当前阶段: ${fullState.current_phase}\n`);

    // 检查各阶段状态并推荐下一步
    const phases = fullState.phases;
    let nextAction = '';

    for (const p of phases) {
      if (p.status === 'pending') {
        nextAction = `建议执行: kd-discuss ${p.id}`;
        break;
      } else if (p.status === 'in_progress') {
        // 检查是否有 PLAN.md
        const fs = require('fs');
        const phaseDir = `.planning/phases/${String(p.id).padStart(2, '0')}-${p.slug}`;
        const planFile = `${phaseDir}/${String(p.id).padStart(2, '0')}-PLAN.md`;

        if (fs.existsSync(planFile)) {
          nextAction = `建议执行: kd-execute ${p.id}`;
        } else {
          nextAction = `建议执行: kd-plan ${p.id}`;
        }
        break;
      }
    }

    if (nextAction) {
      console.log(`下一步: ${nextAction}\n`);
    } else {
      console.log('所有阶段已完成！\n');
    }
  });

// ==================== 帮助 ====================
program
  .command('help')
  .description('显示帮助')
  .action(() => {
    console.log(`
📖 kingdee-dev-plugin 命令帮助

【工作流阶段 - 5阶段】

  kd-new-project         新建项目+理解项目 (Phase 1-2)
  kd-discuss <N>         需求讨论：分析+讨论需求 → CONTEXT (Phase 3)
  kd-plan <N>            生成计划：规格+计划 → PLAN.md (Phase 4)
  kd-execute <N>         执行开发：执行计划任务 (Phase 5)
  kd-verify <N>          验证UAT：需求校验+验收测试 (Phase 6)
  kd-next                自动推进到下一阶段

【里程碑管理】

  kd-add-phase <描述>    添加新阶段
  kd-insert-phase <N> <描述> 插入阶段
  kd-remove-phase <N>    删除阶段
  kd-new-milestone <名称> 创建新里程碑
  kd-complete-milestone <版本> 完成里程碑
  kd-progress            查看项目进度
  kd-resume              恢复工作

【快速任务】

  kd-debug [问题]       调试：系统性追踪问题
  kd-quick [任务]       快速任务：跳过规划直接执行
  kd-fast [任务]        极速任务：内联执行
  kd-do <描述>          智能路由：自动匹配命令

【其他命令】

  status                 查看项目状态
  template <模板>        复制模板
  check <文件>           检查规范

【辅助命令】

  kd-analyze <需求>      需求分析：搜索+推荐+SDK+约束
  kd-search <关键词>     统一搜索
  kd-recommend <需求>   智能推荐
  kd-gen <类名>          生成SDK约束文件
  kd-list [模块]         列出SDK模块和类

示例:
  kingdee-dev-plugin kd-new-project
  kingdee-dev-plugin kd-discuss 1
  kingdee-dev-plugin kd-plan 1
  kingdee-dev-plugin kd-execute 1
  kingdee-dev-plugin kd-verify 1
  kingdee-dev-plugin kd-next
`);
  });

// 解析参数
program.parse(process.argv);