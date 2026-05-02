/**
 * 知识融合引擎
 * 建立SDK文档与社区内容之间的关联关系
 */

const fs = require('fs-extra');
const path = require('path');

const SDK_INDEX_FILE = path.join(__dirname, '..', 'sdk', 'modules.json');
const COMMUNITY_CONTENT_FILE = path.join(__dirname, '..', 'community', 'content.json');
const FUSION_INDEX_FILE = path.join(__dirname, '..', 'community', 'fusion-index.json');

// SDK类关键词映射
const SDK_KEYWORDS = {
  'DynamicObject': ['动态实体', '动态对象', '业务数据', '保存', '提交'],
  'WorkflowServiceHelper': ['工作流', '审批', '流程', '提交审批', '审核'],
  'PermissionServiceHelper': ['权限', '权限校验', '授权', '访问控制'],
  'BusinessDataServiceHelper': ['业务数据', '查询', '获取', '保存'],
  'QueryServiceHelper': ['查询', '过滤', '搜索', '列表'],
  'MetadataServiceHelper': ['元数据', '实体', '字段', '模型'],
  'PrintServiceHelper': ['打印', '报表打印', '输出'],
  'TimeServiceHelper': ['时间', '日期', '时间服务'],
  'UserServiceHelper': ['用户', '组织', '员工', '用户服务']
};

/**
 * 知识融合引擎类
 */
class KnowledgeFusion {
  constructor(options = {}) {
    this.options = options;
    this.sdkData = null;
    this.communityData = null;
    this.fusionIndex = null;
    this.classArticleMap = new Map();
    this.articleClassMap = new Map();
  }

  /**
   * 初始化融合引擎
   */
  async initialize() {
    await this.loadData();
    await this.buildAssociations();
    console.log('[知识融合] 初始化完成');
  }

  /**
   * 加载数据
   */
  async loadData() {
    // 加载SDK数据
    try {
      if (await fs.pathExists(SDK_INDEX_FILE)) {
        this.sdkData = await fs.readJson(SDK_INDEX_FILE);
      }
    } catch (err) {
      console.warn('[知识融合] 加载SDK数据失败:', err.message);
    }

    // 加载社区数据
    try {
      if (await fs.pathExists(COMMUNITY_CONTENT_FILE)) {
        this.communityData = await fs.readJson(COMMUNITY_CONTENT_FILE);
      }
    } catch (err) {
      console.warn('[知识融合] 加载社区数据失败:', err.message);
    }

    // 加载已保存的融合索引
    try {
      if (await fs.pathExists(FUSION_INDEX_FILE)) {
        this.fusionIndex = await fs.readJson(FUSION_INDEX_FILE);
      }
    } catch (err) {
      console.warn('[知识融合] 加载融合索引失败:', err.message);
    }
  }

  /**
   * 建立SDK类和社区文章的关联
   */
  async buildAssociations() {
    console.log('[知识融合] 建立关联...');

    this.classArticleMap.clear();
    this.articleClassMap.clear();

    const articles = this.communityData?.articles || [];

    // 分析每篇文章，建立与SDK类的关联
    for (const article of articles) {
      const matchedClasses = this.findRelatedClasses(article);
      this.articleClassMap.set(article.id, matchedClasses);

      for (const cls of matchedClasses) {
        if (!this.classArticleMap.has(cls)) {
          this.classArticleMap.set(cls, []);
        }
        this.classArticleMap.get(cls).push({
          articleId: article.id,
          title: article.title,
          category: article.category,
          relevance: this.calculateRelevance(article, cls)
        });
      }
    }

    // 构建融合索引
    this.fusionIndex = {
      classArticleMap: Object.fromEntries(this.classArticleMap),
      articleClassMap: Object.fromEntries(this.articleClassMap),
      sdkClasses: this.extractSDKClasses(),
      communityStats: {
        totalArticles: articles.length,
        linkedArticles: this.articleClassMap.size
      },
      builtAt: new Date().toISOString()
    };

    // 保存融合索引
    await fs.writeJson(FUSION_INDEX_FILE, this.fusionIndex, { spaces: 2 });

    console.log(`  已关联 ${this.classArticleMap.size} 个SDK类与 ${this.articleClassMap.size} 篇文章`);
  }

  /**
   * 提取SDK类列表
   */
  extractSDKClasses() {
    const classes = [];
    if (!this.sdkData?.modules) return classes;

    for (const module of this.sdkData.modules) {
      for (const cls of module.classes || []) {
        classes.push({
          name: cls.name,
          module: module.name,
          methods: cls.methods || 0,
          description: cls.description || ''
        });
      }
    }

    return classes;
  }

  /**
   * 查找文章关联的SDK类
   */
  findRelatedClasses(article) {
    const matched = [];
    const content = (article.title + ' ' + article.content).toLowerCase();

    for (const [className, keywords] of Object.entries(SDK_KEYWORDS)) {
      for (const keyword of keywords) {
        if (content.includes(keyword)) {
          if (!matched.includes(className)) {
            matched.push(className);
          }
          break;
        }
      }
    }

    return matched;
  }

  /**
   * 计算关联度
   */
  calculateRelevance(article, className) {
    const keywords = SDK_KEYWORDS[className] || [];
    const content = (article.title + ' ' + article.content).toLowerCase();

    let matchCount = 0;
    for (const keyword of keywords) {
      if (content.includes(keyword)) {
        matchCount++;
      }
    }

    return Math.min(matchCount / keywords.length + 0.3, 1.0);
  }

  /**
   * 获取相关知识
   */
  getRelatedKnowledge(className) {
    const articles = this.classArticleMap.get(className) || [];

    // 获取SDK类信息
    const sdkClass = this.fusionIndex?.sdkClasses?.find(c => c.name === className);

    return {
      sdk: sdkClass || { name: className, methods: 0 },
      articles: articles.sort((a, b) => b.relevance - a.relevance).slice(0, 5),
      bestPractices: this.findBestPractices(className)
    };
  }

  /**
   * 查找最佳实践
   */
  findBestPractices(className) {
    const practices = [];
    const knowledge = this.communityData?.knowledge || [];

    for (const kb of knowledge) {
      if (kb.title.toLowerCase().includes(className.toLowerCase()) ||
          kb.content.toLowerCase().includes(className.toLowerCase())) {
        practices.push({
          title: kb.title,
          type: kb.type,
          relevance: 0.9
        });
      }
    }

    return practices;
  }

  /**
   * 根据关键词搜索关联知识
   */
  searchRelated(keywords) {
    const results = [];

    for (const keyword of keywords) {
      // 查找匹配的SDK类
      for (const [className, articles] of this.classArticleMap) {
        if (className.toLowerCase().includes(keyword.toLowerCase())) {
          results.push({
            keyword,
            className,
            articles: articles.slice(0, 3),
            matchType: 'sdk_class'
          });
        }
      }

      // 查找匹配的社区文章
      const articleList = this.articleClassMap.entries();
      for (const [articleId, classes] of articleList) {
        const article = this.communityData?.articles?.find(a => a.id === articleId);
        if (article && (article.title.toLowerCase().includes(keyword.toLowerCase()) ||
            article.content.toLowerCase().includes(keyword.toLowerCase()))) {
          results.push({
            keyword,
            article: {
              id: article.id,
              title: article.title,
              category: article.category
            },
            relatedClasses: classes,
            matchType: 'article'
          });
        }
      }
    }

    return results;
  }

  /**
   * 获取融合统计
   */
  getStats() {
    return {
      sdkClasses: this.fusionIndex?.sdkClasses?.length || 0,
      linkedClasses: this.classArticleMap.size,
      linkedArticles: this.articleClassMap.size,
      totalCommunityArticles: this.communityData?.articles?.length || 0,
      lastBuilt: this.fusionIndex?.builtAt
    };
  }
}

module.exports = { KnowledgeFusion };