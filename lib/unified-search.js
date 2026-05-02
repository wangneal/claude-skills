/**
 * 统一搜索入口
 * 整合SDK文档搜索与社区内容搜索
 */

const fs = require('fs-extra');
const path = require('path');
const Fuse = require('fuse.js');

const SDK_INDEX_FILE = path.join(__dirname, '..', 'sdk', 'modules.json');
const COMMUNITY_CONTENT_FILE = path.join(__dirname, '..', 'community', 'content-filtered.json');

// 搜索权重配置
const DEFAULT_WEIGHT = {
  sdk: 0.6,
  community: 0.4
};

// Fuse.js 配置
const FUSE_OPTIONS = {
  includeScore: true,
  includeMatches: true,
  threshold: 0.4,
  minMatchCharLength: 1
};

/**
 * 统一搜索器类
 */
class UnifiedSearcher {
  constructor(options = {}) {
    this.weight = options.weight || DEFAULT_WEIGHT;
    this.sdkData = null;
    this.communityData = null;
    this.sdkFuse = null;
    this.communityFuse = null;
  }

  /**
   * 初始化搜索器
   */
  async initialize() {
    await Promise.all([
      this.loadSDKData(),
      this.loadCommunityData()
    ]);

    // 构建 Fuse 索引
    this.buildIndexes();

    console.log('[统一搜索] 初始化完成');
    console.log(`  SDK文档: ${this.sdkData?.modules?.length || 0} 模块`);
    console.log(`  社区文章: ${this.communityData?.articles?.length || 0} 篇`);
  }

  /**
   * 加载SDK数据
   */
  async loadSDKData() {
    try {
      if (await fs.pathExists(SDK_INDEX_FILE)) {
        this.sdkData = await fs.readJson(SDK_INDEX_FILE);
      } else {
        this.sdkData = { modules: [] };
      }
    } catch (err) {
      console.warn('[统一搜索] 加载SDK数据失败:', err.message);
      this.sdkData = { modules: [] };
    }
  }

  /**
   * 加载社区数据
   */
  async loadCommunityData() {
    try {
      if (await fs.pathExists(COMMUNITY_CONTENT_FILE)) {
        this.communityData = await fs.readJson(COMMUNITY_CONTENT_FILE);
      } else {
        this.communityData = { articles: [], qa: [], knowledge: [] };
      }
    } catch (err) {
      console.warn('[统一搜索] 加载社区数据失败:', err.message);
      this.communityData = { articles: [], qa: [], knowledge: [] };
    }
  }

  /**
   * 构建搜索索引
   */
  buildIndexes() {
    // SDK类索引
    const sdkClasses = [];
    if (this.sdkData?.modules) {
      for (const module of this.sdkData.modules) {
        for (const cls of module.classes || []) {
          sdkClasses.push({
            id: `sdk:${module.name}:${cls.name}`,
            title: cls.name,
            content: cls.description || '',
            source: 'SDK',
            module: module.name,
            className: cls.name,
            methods: cls.methods || 0
          });
        }
      }
    }

    this.sdkFuse = new Fuse(sdkClasses, {
      ...FUSE_OPTIONS,
      keys: ['title', 'content', 'className']
    });

    // 社区内容索引
    const communityItems = [];

    // 文章
    for (const article of this.communityData?.articles || []) {
      communityItems.push({
        id: `community:article:${article.id}`,
        title: article.title,
        content: article.content,
        source: '社区',
        category: article.category,
        type: 'article',
        views: article.views || 0,
        date: article.publishDate
      });
    }

    // 问答
    for (const qa of this.communityData?.qa || []) {
      communityItems.push({
        id: `community:qa:${qa.id}`,
        title: qa.question,
        content: qa.answer,
        source: '社区',
        category: qa.category,
        type: 'qa',
        votes: qa.votes || 0
      });
    }

    // 知识库
    for (const kb of this.communityData?.knowledge || []) {
      communityItems.push({
        id: `community:kb:${kb.id}`,
        title: kb.title,
        content: kb.content,
        source: '知识库',
        category: '',
        type: 'knowledge',
        kbType: kb.type
      });
    }

    this.communityFuse = new Fuse(communityItems, {
      ...FUSE_OPTIONS,
      keys: ['title', 'content', 'category']
    });
  }

  /**
   * 统一搜索
   */
  async search(query, options = {}) {
    const {
      source = 'all', // all, sdk, community
      limit = 10,
      weight = this.weight
    } = options;

    await this.initialize();

    const results = [];

    // 搜索SDK
    if (source === 'all' || source === 'sdk') {
      const sdkResults = this.searchSDK(query, Math.ceil(limit * weight.sdk));
      results.push(...sdkResults.map(r => ({
        ...r,
        source: '[SDK]'
      })));
    }

    // 搜索社区
    if (source === 'all' || source === 'community') {
      const communityResults = this.searchCommunity(query, Math.ceil(limit * weight.community));
      results.push(...communityResults.map(r => ({
        ...r,
        source: r.source === '知识库' ? '[知识库]' : '[社区]'
      })));
    }

    // 按相关性排序
    results.sort((a, b) => a.score - b.score);

    return results.slice(0, limit);
  }

  /**
   * 搜索SDK
   */
  searchSDK(query, limit = 10) {
    if (!this.sdkFuse) return [];

    const results = this.sdkFuse.search(query, { limit });

    return results.map(r => ({
      id: r.item.id,
      title: r.item.title,
      content: r.item.content?.substring(0, 200) || '',
      source: 'SDK',
      category: r.item.module,
      score: 1 - r.score, // 转换分数为相关度
      extra: `${r.item.methods} 个方法`
    }));
  }

  /**
   * 搜索社区内容
   */
  searchCommunity(query, limit = 10) {
    if (!this.communityFuse) return [];

    const results = this.communityFuse.search(query, { limit });

    return results.map(r => ({
      id: r.item.id,
      title: r.item.title,
      content: r.item.content?.substring(0, 200) || '',
      source: r.item.source,
      category: r.item.category || r.item.type,
      score: 1 - r.score, // 转换分数为相关度
      extra: r.item.views ? `${r.item.views} 次浏览` : ''
    }));
  }

  /**
   * 获取搜索统计
   */
  getStats() {
    return {
      sdkModules: this.sdkData?.modules?.length || 0,
      sdkClasses: this.sdkData?.modules?.reduce((sum, m) => sum + (m.classes?.length || 0), 0) || 0,
      communityArticles: this.communityData?.articles?.length || 0,
      communityQA: this.communityData?.qa?.length || 0,
      communityKnowledge: this.communityData?.knowledge?.length || 0
    };
  }
}

// CLI 入口
async function main() {
  const args = process.argv.slice(2);
  const searcher = new UnifiedSearcher();

  // 解析命令行参数
  let command = 'help';
  let query = '';
  let options = { source: 'all', limit: 10 };

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];

    if (arg === '--help' || arg === '-h') {
      command = 'help';
    } else if (arg === '--search' || arg === '-s') {
      command = 'search';
      if (args[i + 1] && !args[i + 1].startsWith('--')) {
        query = args[++i];
      }
    } else if (arg === '--source' && args[i + 1]) {
      options.source = args[++i];
    } else if (arg === '--limit' && args[i + 1]) {
      options.limit = parseInt(args[++i], 10);
    } else if (arg === '--stats') {
      command = 'stats';
    } else if (!arg.startsWith('--')) {
      query = arg;
      command = 'search';
    }
  }

  switch (command) {
    case 'help':
      console.log(`
=== 统一搜索入口 ===

用法: node unified-search.js [关键词] [选项]
       node unified-search.js --search <关键词> [选项]

选项:
  --source sdk|community|all  搜索来源 (默认: all)
  --limit <数量>             结果数量限制 (默认: 10)
  --stats                    显示搜索统计
  --help                     显示帮助

示例:
  node unified-search.js "工作流"
  node unified-search.js --search "审批" --source community
  node unified-search.js --stats
`);
      break;

    case 'search':
      if (!query) {
        console.error('错误: 请指定搜索关键词');
        console.log('用法: node unified-search.js <关键词> [--source sdk|community|all]');
        process.exit(1);
      }

      const results = await searcher.search(query, options);

      console.log(`\n搜索 "${query}" (来源: ${options.source})`);
      console.log(`找到 ${results.length} 条结果:\n`);

      for (const r of results) {
        console.log(`${r.source} ${r.title}`);
        console.log(`   分类: ${r.category || 'N/A'} | 相关度: ${(r.score * 100).toFixed(1)}%`);
        if (r.extra) console.log(`   ${r.extra}`);
        if (r.content) console.log(`   ${r.content.substring(0, 80)}...`);
        console.log('');
      }
      break;

    case 'stats':
      await searcher.initialize();
      const stats = searcher.getStats();
      console.log(`
=== 搜索统计 ===

SDK文档:
  模块数: ${stats.sdkModules}
  类数量: ${stats.sdkClasses}

社区内容:
  文章数: ${stats.communityArticles}
  ���答数: ${stats.communityQA}
  知识库: ${stats.communityKnowledge}

总计可用文档: ${stats.sdkClasses + stats.communityArticles + stats.communityQA + stats.communityKnowledge}
`);
      break;

    default:
      if (args[0]) {
        // 将第一个参数作为搜索词
        const results = await searcher.search(args[0], options);
        console.log(`\n搜索 "${args[0]}" - ${results.length} 条结果:\n`);
        for (const r of results) {
          console.log(`${r.source} ${r.title}`);
        }
      } else {
        console.log('未知命令，使用 --help 查看帮助');
      }
  }
}

// 导出模块
module.exports = { UnifiedSearcher };

// CLI 入口
if (require.main === module) {
  main().catch(err => {
    console.error('错误:', err.message);
    process.exit(1);
  });
}