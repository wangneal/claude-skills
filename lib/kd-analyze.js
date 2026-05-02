/**
 * kd-analyze - 需求分析核心模块
 * 整合统一搜索、智能推荐、SDK研究和约束生成
 */

const path = require('path');

// 导入各功能模块
const { UnifiedSearcher } = require('./unified-search.js');
const { IntelligentRecommender } = require('./intelligent-recommender.js');
const kdSearchEngine = require('./kd-search-engine.js');
const kdConstraintGenerator = require('./kd-constraint-generator.js');

class KdAnalyze {
  constructor(options = {}) {
    this.options = options;
    this.searcher = null;
    this.recommender = null;
  }

  /**
   * 初始化模块
   */
  async initialize() {
    if (!this.searcher) {
      this.searcher = new UnifiedSearcher();
      await this.searcher.initialize();
    }
    if (!this.recommender) {
      this.recommender = new IntelligentRecommender();
      await this.recommender.initialize();
    }
  }

  /**
   * 执行需求分析（整合搜索+推荐+研究+约束生成）
   */
  async execute(requirement, options = {}) {
    const {
      search = true,           // 启用统一搜索
      recommend = true,        // 启用智能推荐
      generateConstraint = true, // 生成约束文件
      limit = 10               // 结果数量限制
    } = options;

    console.log('\n📊 开始需求分析...\n');
    console.log(`需求: ${requirement}\n`);
    console.log('='.repeat(50));

    // 1. 统一搜索
    let searchResults = [];
    if (search) {
      console.log('\n### 步骤 1/4: 统一搜索\n');
      searchResults = await this.search(requirement, { limit });
    }

    // 2. 智能推荐
    let recommendResults = null;
    if (recommend) {
      console.log('\n### 步骤 2/4: 智能推荐\n');
      recommendResults = await this.recommend(requirement, { limit });
    }

    // 3. SDK研究
    let sdkResults = [];
    console.log('\n### 步骤 3/4: SDK 研究\n');
    sdkResults = await this.researchSDK(requirement, { limit });

    // 4. 约束生成
    let constraintFiles = [];
    if (generateConstraint) {
      console.log('\n### 步骤 4/4: 生成约束文件\n');
      constraintFiles = await this.generateConstraints(sdkResults);
    }

    // 生成分析报告
    const report = this.generateReport({
      requirement,
      searchResults,
      recommendResults,
      sdkResults,
      constraintFiles
    });

    console.log('\n✅ 需求分析完成\n');
    console.log(`找到 ${sdkResults.length} 个推荐 SDK 类`);
    if (recommendResults) {
      console.log(`推荐 ${recommendResults.summary.total} 个解决方案`);
    }
    if (constraintFiles.length > 0) {
      console.log(`生成 ${constraintFiles.length} 个约束文件`);
    }

    return report;
  }

  /**
   * 统一搜索
   */
  async search(query, options = {}) {
    await this.initialize();
    const results = await this.searcher.search(query, options);

    console.log(`搜索 "${query}": ${results.length} 条结果`);
    if (results.length > 0) {
      results.slice(0, 3).forEach((r, i) => {
        console.log(`  ${i + 1}. ${r.source} ${r.title}`);
      });
      if (results.length > 3) {
        console.log(`  ... 还有 ${results.length - 3} 条`);
      }
    }

    return results;
  }

  /**
   * 智能推荐
   */
  async recommend(requirement, options = {}) {
    await this.initialize();
    const report = await this.recommender.recommend(requirement, options);

    console.log(`智能推荐: ${report.summary.total} 个解决方案`);
    if (report.sdk_apis.length > 0) {
      console.log(`  SDK API: ${report.sdk_apis.length}`);
    }
    if (report.community_articles.length > 0) {
      console.log(`  社区文章: ${report.community_articles.length}`);
    }
    console.log(`  置信度: ${(report.summary.confidence * 100).toFixed(1)}%`);

    return report;
  }

  /**
   * SDK研究
   */
  async researchSDK(requirement, options = {}) {
    const keywords = this.extractKeywords(requirement);

    // 初始化搜索引擎
    await kdSearchEngine.init();
    const results = await kdSearchEngine.recommend(keywords, { limit: options.limit || 10 });

    console.log(`SDK 研究: ${results.length} 个推荐类`);
    results.slice(0, 5).forEach((r, i) => {
      console.log(`  ${i + 1}. ${r.className} (${r.module}) - ${(r.score * 100).toFixed(0)}%`);
    });

    return results;
  }

  /**
   * 生成约束文件
   */
  async generateConstraints(sdkResults) {
    const files = [];

    for (const result of sdkResults.slice(0, 5)) {
      try {
        const generated = await kdConstraintGenerator.generate(result.className, {
          outputDir: this.options.outputDir || '.bos-flow/constraints',
          format: 'all'
        });
        files.push(...generated);
        console.log(`  ✓ ${result.className} 约束文件已生成`);
      } catch (error) {
        console.log(`  ✗ ${result.className} 生成失败: ${error.message}`);
      }
    }

    return files;
  }

  /**
   * 提取关键词
   */
  extractKeywords(requirement) {
    const text = requirement.toLowerCase();
    const keywords = [];

    // 业务关键词
    const businessKeywords = [
      '工作流', '审批', '流程', '订单', '客户', '供应商', '物料',
      '销售', '采购', '库存', '财务', '报表', '打印', '权限',
      '用户', '时间', '元数据', '查询', '附件', '变更',
      'Workflow', 'Approval', 'Order', 'Customer', 'Permission'
    ];

    for (const kw of businessKeywords) {
      if (text.includes(kw.toLowerCase())) {
        keywords.push(kw);
      }
    }

    // 如果没有匹配，提取原始需求词
    if (keywords.length === 0) {
      const words = requirement.split(/[\s,，。、]/).filter(w => w.length > 1);
      keywords.push(...words.slice(0, 3));
    }

    return [...new Set(keywords)];
  }

  /**
   * 生成分析报告
   */
  generateReport(data) {
    const {
      requirement,
      searchResults,
      recommendResults,
      sdkResults,
      constraintFiles
    } = data;

    return {
      requirement,
      summary: {
        searchResultsCount: searchResults.length,
        recommendCount: recommendResults?.summary.total || 0,
        sdkClassesCount: sdkResults.length,
        constraintFilesCount: constraintFiles.length
      },
      searchResults: searchResults.slice(0, 5),
      recommendations: recommendResults,
      sdkRecommendations: sdkResults,
      constraintFiles,
      generatedAt: new Date().toISOString()
    };
  }
}

/**
 * CLI 入口
 */
async function main() {
  const args = process.argv.slice(2);
  const analyzer = new KdAnalyze();

  let requirement = '';
  let options = {
    search: true,
    recommend: true,
    generateConstraint: true,
    limit: 10
  };

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];

    if (arg === '--help' || arg === '-h') {
      console.log(`
=== kd-analyze 需求分析 ===

用法: node kd-analyze.js <需求描述> [选项]

选项:
  --no-search              禁用统一搜索
  --no-recommend           禁用智能推荐
  --no-constraint          禁用约束文件生成
  --limit <数量>           结果数量限制 (默认: 10)
  --output-dir <目录>      约束文件输出目录
  --help                   显示帮助

示例:
  node kd-analyze.js "开发工作流审批功能"
  node kd-analyze.js "订单管理" --limit 5
  node kd-analyze.js "客户管理" --no-constraint
`);
      return;
    }

    if (arg === '--no-search') {
      options.search = false;
    } else if (arg === '--no-recommend') {
      options.recommend = false;
    } else if (arg === '--no-constraint') {
      options.generateConstraint = false;
    } else if (arg === '--limit' && args[i + 1]) {
      options.limit = parseInt(args[++i], 10);
    } else if (arg === '--output-dir' && args[i + 1]) {
      options.outputDir = args[++i];
    } else if (!arg.startsWith('--')) {
      requirement = arg;
    }
  }

  if (!requirement) {
    console.error('错误: 请输入需求描述');
    console.log('用法: node kd-analyze.js <需求描述>');
    process.exit(1);
  }

  await analyzer.execute(requirement, options);
}

// 导出
module.exports = { KdAnalyze };

// CLI 入口
if (require.main === module) {
  main().catch(err => {
    console.error('错误:', err.message);
    process.exit(1);
  });
}