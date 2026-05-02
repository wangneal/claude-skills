/**
 * 智能推荐引擎
 * 整合SDK和社区知识，提供智能推荐
 */

const { KnowledgeFusion } = require('./knowledge-fusion.js');
const { UnifiedSearcher } = require('./unified-search.js');

/**
 * 智能推荐器类
 */
class IntelligentRecommender {
  constructor(options = {}) {
    this.options = options;
    this.fusion = new KnowledgeFusion(options);
    this.searcher = new UnifiedSearcher(options);
    this.initialized = false;
  }

  /**
   * 初始化
   */
  async initialize() {
    if (this.initialized) return;

    await this.fusion.initialize();
    await this.searcher.initialize();
    this.initialized = true;

    console.log('[智能推荐] 初始化完成');
  }

  /**
   * 基于需求推荐
   */
  async recommend(requirement, options = {}) {
    await this.initialize();

    const { limit = 5 } = options;

    // 1. 分析需求提取关键词
    const keywords = this.extractKeywords(requirement);

    // 2. 搜索SDK类
    const sdkResults = await this.searchSDKClasses(keywords, limit);

    // 3. 搜索社区最佳实践
    const communityResults = await this.searchCommunityBestPractices(keywords, limit);

    // 4. 获取关联知识
    const relatedKnowledge = this.getRelatedKnowledgeForKeywords(keywords);

    // 5. 生成融合推荐
    const recommendations = this.generateRecommendations(
      sdkResults,
      communityResults,
      relatedKnowledge,
      keywords
    );

    // 6. 生成报告
    return this.generateReport(recommendations, keywords, relatedKnowledge);
  }

  /**
   * 提取关键词 - 优化版
   */
  extractKeywords(requirement) {
    const text = requirement.toLowerCase();
    const keywords = [];

    // 业务关键词 -> SDK类映射 (仅使用SDK中实际存在的类)
    // SDK类列表：AbstractBillPlugIn, DynamicObject, DynamicObjectCollection,
    // BusinessDataServiceHelper, WorkflowServiceHelper, QueryServiceHelper,
    // PermissionServiceHelper, MetadataServiceHelper, PrintServiceHelper,
    // UserServiceHelper, TimeServiceHelper, AttachmentServiceHelper, etc.
    const businessToSDK = {
      '工作流': 'WorkflowServiceHelper',
      '审批': 'WorkflowServiceHelper',
      '流程': 'WorkflowServiceHelper',
      '订单': 'DynamicObject',
      '客户': 'BusinessDataServiceHelper',
      '供应商': 'BusinessDataServiceHelper',
      '物料': 'BusinessDataServiceHelper',
      '销售': 'DynamicObject',
      '采购': 'DynamicObject',
      '库存': 'QueryServiceHelper',
      '财务': 'BusinessDataServiceHelper',
      '报表': 'PrintServiceHelper',
      '打印': 'PrintServiceHelper',
      '权限': 'PermissionServiceHelper',
      '用户': 'UserServiceHelper',
      '时间': 'TimeServiceHelper',
      '元数据': 'MetadataServiceHelper',
      '查询': 'QueryServiceHelper',
      '附件': 'AttachmentServiceHelper',
      '变更': 'DynamicObject',
      'Workflow': 'WorkflowServiceHelper',
      'Approval': 'WorkflowServiceHelper',
      'Order': 'DynamicObject',
      'Customer': 'BusinessDataServiceHelper',
      'Permission': 'PermissionServiceHelper',
      'Print': 'PrintServiceHelper'
    };

    // 业务关键词
    const businessKeywords = Object.keys(businessToSDK);

    for (const kw of businessKeywords) {
      if (text.includes(kw.toLowerCase())) {
        keywords.push(kw);
        // 同时添加对应的SDK类名
        const sdkClass = businessToSDK[kw];
        if (sdkClass && !keywords.includes(sdkClass)) {
          keywords.push(sdkClass);
        }
      }
    }

    // 如果没有匹配，添加原始需求的词
    if (keywords.length === 0) {
      const words = requirement.split(/[\s,，。、]/).filter(w => w.length > 1);
      keywords.push(...words.slice(0, 3));
    }

    return [...new Set(keywords)];
  }

  /**
   * 搜索SDK类
   */
  async searchSDKClasses(keywords, limit) {
    const results = [];

    for (const keyword of keywords) {
      const searchResults = await this.searcher.searchSDK(keyword, limit);

      for (const r of searchResults) {
        results.push({
          type: 'sdk_api',
          title: r.title,
          category: r.category,
          confidence: r.score,
          description: r.content?.substring(0, 100),
          source: 'SDK'
        });
      }
    }

    // 去重并按置信度排序
    const unique = new Map();
    for (const r of results) {
      const key = r.title;
      if (!unique.has(key) || unique.get(key).confidence < r.confidence) {
        unique.set(key, r);
      }
    }

    return Array.from(unique.values()).slice(0, limit);
  }

  /**
   * 搜索社区最佳实践
   */
  async searchCommunityBestPractices(keywords, limit) {
    const results = [];

    for (const keyword of keywords) {
      const searchResults = await this.searcher.searchCommunity(keyword, limit);

      for (const r of searchResults) {
        results.push({
          type: 'community_article',
          title: r.title,
          category: r.category,
          confidence: r.score,
          description: r.content?.substring(0, 100),
          source: r.source
        });
      }
    }

    // 按置信度排序
    results.sort((a, b) => b.confidence - a.confidence);

    return results.slice(0, limit);
  }

  /**
   * 获取关键词关联的知识
   */
  getRelatedKnowledgeForKeywords(keywords) {
    const related = this.fusion.searchRelated(keywords);
    return related;
  }

  /**
   * 生成融合推荐
   */
  generateRecommendations(sdkResults, communityResults, relatedKnowledge, keywords) {
    const recommendations = [];

    // 添加SDK推荐
    for (const r of sdkResults) {
      recommendations.push({
        ...r,
        reason: `匹配关键词: ${keywords.join(', ')}`
      });
    }

    // 添加社区推荐
    for (const r of communityResults) {
      recommendations.push({
        ...r,
        reason: `相关最佳实践: ${keywords.join(', ')}`
      });
    }

    // 按置信度排序
    recommendations.sort((a, b) => b.confidence - a.confidence);

    return recommendations;
  }

  /**
   * 生成推荐报告
   */
  generateReport(recommendations, keywords, relatedKnowledge = []) {
    const sdkRecommendations = recommendations.filter(r => r.type === 'sdk_api');
    const communityRecommendations = recommendations.filter(r => r.type === 'community_article');

    // 计算总体置信度
    const avgConfidence = recommendations.length > 0
      ? recommendations.reduce((sum, r) => sum + r.confidence, 0) / recommendations.length
      : 0;

    return {
      requirement: keywords.join(', '),
      summary: {
        total: recommendations.length,
        sdk_apis: sdkRecommendations.length,
        community_articles: communityRecommendations.length,
        confidence: avgConfidence
      },
      sdk_apis: sdkRecommendations,
      community_articles: communityRecommendations,
      related_knowledge: relatedKnowledge,
      generated_at: new Date().toISOString()
    };
  }

  /**
   * 获取推荐统计
   */
  async getStats() {
    await this.initialize();

    return {
      fusion: this.fusion.getStats(),
      searcher: this.searcher.getStats()
    };
  }
}

// CLI 入口
async function main() {
  const args = process.argv.slice(2);
  const recommender = new IntelligentRecommender();

  let command = 'help';
  let requirement = '';
  let options = { limit: 5 };

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];

    if (arg === '--help' || arg === '-h') {
      command = 'help';
    } else if (arg === '--recommend' || arg === '-r') {
      command = 'recommend';
      if (args[i + 1] && !args[i + 1].startsWith('--')) {
        requirement = args[++i];
      }
    } else if (arg === '--limit' && args[i + 1]) {
      options.limit = parseInt(args[++i], 10);
    } else if (arg === '--stats') {
      command = 'stats';
    } else if (!arg.startsWith('--')) {
      requirement = arg;
      command = 'recommend';
    }
  }

  switch (command) {
    case 'help':
      console.log(`
=== 智能推荐引擎 ===

用法: node intelligent-recommender.js [需求描述] [选项]
       node intelligent-recommender.js --recommend <需求> [选项]

选项:
  --limit <数量>    推荐结果数量 (默认: 5)
  --stats           显示推荐统计
  --help            显示帮助

示例:
  node intelligent-recommender.js "需要实现销售订单审批"
  node intelligent-recommender.js --recommend "工作流权限校验" --limit 10
  node intelligent-recommender.js --stats
`);
      break;

    case 'recommend':
      if (!requirement) {
        console.error('错误: 请输入需求描述');
        console.log('用法: node intelligent-recommender.js <需求描述>');
        process.exit(1);
      }

      console.log(`\n🔍 分析需求: ${requirement}\n`);
      console.log('='.repeat(50));

      const report = await recommender.recommend(requirement, options);

      console.log(`\n### 推荐概要`);
      console.log(`总推荐数: ${report.summary.total}`);
      console.log(`SDK API: ${report.summary.sdk_apis}`);
      console.log(`社区文章: ${report.summary.community_articles}`);
      console.log(`置信度: ${(report.summary.confidence * 100).toFixed(1)}%`);

      if (report.sdk_apis.length > 0) {
        console.log(`\n### SDK API 推荐`);
        report.sdk_apis.forEach((r, i) => {
          console.log(`\n${i + 1}. [SDK] ${r.title}`);
          console.log(`   分类: ${r.category}`);
          console.log(`   置信度: ${(r.confidence * 100).toFixed(1)}%`);
        });
      }

      if (report.community_articles.length > 0) {
        console.log(`\n### 社区最佳实践`);
        report.community_articles.forEach((r, i) => {
          console.log(`\n${i + 1}. ${r.source} ${r.title}`);
          console.log(`   分类: ${r.category}`);
          console.log(`   置信度: ${(r.confidence * 100).toFixed(1)}%`);
        });
      }

      console.log('\n✓ 推荐完成\n');
      break;

    case 'stats':
      const stats = await recommender.getStats();
      console.log(`
=== 智能推荐统计 ===

融合索引:
  SDK类: ${stats.fusion.sdkClasses}
  已关联类: ${stats.fusion.linkedClasses}
  已关联文章: ${stats.fusion.linkedArticles}

搜索索引:
  SDK模块: ${stats.searcher.sdkModules}
  社区文章: ${stats.searcher.communityArticles}
`);
      break;

    default:
      if (args[0]) {
        const report = await recommender.recommend(args[0], options);
        console.log(`推荐数: ${report.summary.total}, 置信度: ${(report.summary.confidence * 100).toFixed(1)}%`);
      } else {
        console.log('未知命令，使用 --help 查看帮助');
      }
  }
}

// 导出模块
module.exports = { IntelligentRecommender };

// CLI 入口
if (require.main === module) {
  main().catch(err => {
    console.error('错误:', err.message);
    process.exit(1);
  });
}