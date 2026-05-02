/**
 * SDK搜索引擎 - 基于关键词推荐相关SDK类
 *
 * 功能：
 * 1. 根据关键词搜索SDK类
 * 2. 计算相关性得分
 * 3. 去重和排序推荐结果
 */

const sdkSearch = require('./sdk-search');

class KDSearchEngine {
  constructor() {
    this.index = null;
    this.initialized = false;
  }

  /**
   * 初始化搜索引擎（加载索引）
   */
  async init() {
    if (this.initialized) return;

    this.index = await sdkSearch.loadIndex();
    this.initialized = true;
  }

  /**
   * 根据关键词推荐SDK类
   * @param {string[]} keywords - 关键词列表
   * @param {Object} options - 选项
   * @returns {Promise<Array>} 推荐结果列表
   */
  async recommend(keywords, options = {}) {
    await this.init();

    const recommendations = [];
    const limit = options.limit || 5;

    for (const keyword of keywords) {
      const results = await this.search(keyword, { limit });

      for (const result of results.classes) {
        const score = this.calculateRelevanceScore(result, keyword);

        recommendations.push({
          className: result.name,
          module: result.module,
          path: result.path,
          methods: result.methods,
          score: score,
          matchedKeyword: keyword,
          matchType: result.matchType
        });
      }
    }

    return this.deduplicateAndSort(recommendations, limit);
  }

  /**
   * 搜索SDK
   * @param {string} query - 查询字符串
   * @param {Object} options - 选项
   * @returns {Promise<Object>} 搜索结果
   */
  async search(query, options = {}) {
    const results = {
      classes: [],
      modules: [],
      methods: []
    };

    // 搜索类名
    if (options.searchClasses !== false) {
      const classResults = await sdkSearch.searchByClass(query, this.index);
      results.classes = classResults;
    }

    // 搜索模块名
    if (options.searchModules !== false) {
      const moduleResults = await sdkSearch.searchByModule(query, this.index);
      results.modules = moduleResults;
    }

    // 搜索方法名
    if (options.searchMethods === true) {
      const methodResults = await sdkSearch.searchByMethod(query, this.index, options);
      results.methods = methodResults;
    }

    return results;
  }

  /**
   * 计算相关性得分
   * @param {Object} result - 搜索结果
   * @param {string} keyword - 匹配的关键词
   * @returns {number} 相关性得分 (0-1, 越高越相关)
   */
  calculateRelevanceScore(result, keyword) {
    // Fuse.js 得分 (0 = 完美匹配, 1 = 不匹配)
    const fuseScore = result.score || 0;

    // 精确匹配奖励
    const exactMatchBonus = result.name && result.name.toLowerCase() === keyword.toLowerCase()
      ? 0.2
      : 0;

    // 包含匹配奖励
    const containsBonus = result.name && result.name.toLowerCase().includes(keyword.toLowerCase())
      ? 0.1
      : 0;

    // 模块权重（核心模块得分更高）
    const moduleWeight = this.getModuleWeight(result.module);

    // 方法数量权重（方法多的类更可能有用）
    const methodCount = result.methods || 0;
    const methodCountWeight = Math.min(methodCount / 200, 0.1);

    // 综合得分 (转换为 0-1 范围，越高越相关)
    const score = 1 - fuseScore + exactMatchBonus + containsBonus + moduleWeight * 0.1 + methodCountWeight;

    return Math.min(score, 1);
  }

  /**
   * 获取模块权重
   * @param {string} moduleName - 模块名称
   * @returns {number} 权重值
   */
  getModuleWeight(moduleName) {
    const weights = {
      '核心框架': 2.0,
      'kd.bos': 2.0,
      'ORM引擎': 1.8,
      'kd.bos.orm': 1.8,
      '数据操作服务': 1.7,
      'kd.bos.servicehelper': 1.7
    };

    return weights[moduleName] || 1.0;
  }

  /**
   * 去重并排序推荐结果
   * @param {Array} recommendations - 推荐列表
   * @param {number} limit - 限制数量
   * @returns {Array} 去重排序后的推荐列表
   */
  deduplicateAndSort(recommendations, limit = 10) {
    // 去重（保留得分最高的）
    const uniqueMap = new Map();
    recommendations.forEach(rec => {
      const existing = uniqueMap.get(rec.className);
      if (!existing || rec.score > existing.score) {
        uniqueMap.set(rec.className, rec);
      }
    });

    // 转换为数组并按得分降序排序
    const sorted = Array.from(uniqueMap.values())
      .sort((a, b) => b.score - a.score);

    // 限制数量
    return sorted.slice(0, limit);
  }

  /**
   * 获取SDK类的详细信息
   * @param {string} className - 类名
   * @returns {Promise<Object>} 类详细信息
   */
  async getClassDetails(className) {
    await this.init();

    // 搜索类
    const results = await sdkSearch.searchByClass(className, this.index);
    const classResult = results.find(r => r.name === className);

    if (!classResult) {
      return null;
    }

    // 获取文档内容
    const docContent = await sdkSearch.getDocumentContent(classResult.path);

    return {
      className: classResult.name,
      module: classResult.module,
      path: classResult.path,
      methods: classResult.methods,
      document: docContent
    };
  }

  /**
   * 批量获取多个类的详细信息
   * @param {string[]} classNames - 类名列表
   * @returns {Promise<Array>} 类详细信息列表
   */
  async getClassesDetails(classNames) {
    const details = [];
    for (const className of classNames) {
      const detail = await this.getClassDetails(className);
      if (detail) {
        details.push(detail);
      }
    }
    return details;
  }
}

module.exports = new KDSearchEngine();

// 测试
if (require.main === module) {
  const engine = module.exports;

  async function test() {
    console.log('测试SDK搜索引擎\n');

    // 测试关键词推荐
    const keywords = ['Workflow', 'DynamicObject'];
    console.log(`关键词: ${keywords.join(', ')}\n`);

    const recommendations = await engine.recommend(keywords, { limit: 5 });

    console.log(`推荐结果 (${recommendations.length} 个):\n`);
    recommendations.forEach((rec, i) => {
      console.log(`${i + 1}. ${rec.className}`);
      console.log(`   模块: ${rec.module}`);
      console.log(`   得分: ${(rec.score * 100).toFixed(0)}%`);
      console.log(`   方法数: ${rec.methods}`);
      console.log(`   匹配关键词: ${rec.matchedKeyword}`);
      console.log(`   匹配类型: ${rec.matchType}\n`);
    });

    // 测试获取详细信息
    console.log('获取 WorkflowServiceHelper 详细信息...\n');
    const details = await engine.getClassDetails('WorkflowServiceHelper');
    if (details) {
      console.log(`类名: ${details.className}`);
      console.log(`模块: ${details.module}`);
      console.log(`方法数: ${details.methods}`);
      console.log(`文档前100字符: ${details.document.substring(0, 100)}...`);
    }
  }

  test().catch(console.error);
}
