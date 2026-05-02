/**
 * 金蝶社区内容采集器
 * 支持抓取文章、问答和知识库内容
 */

const fs = require('fs-extra');
const path = require('path');

const COMMUNITY_DIR = path.join(__dirname, '..', 'community');
const CONTENT_FILE = path.join(COMMUNITY_DIR, 'content.json');
const CRAWL_STATE_FILE = path.join(COMMUNITY_DIR, 'crawl-state.json');

/**
 * 金蝶社区内容采集器类
 */
class CommunityCollector {
  constructor(options = {}) {
    this.baseUrl = 'https://vip.kingdee.com';
    this.categories = options.categories || [
      '安装部署', '性能知识', '部署运维', '财务会计', '成本管理',
      '资产管理', '管理会计', '电商与分销', '零售管理', '供应链',
      'PLM', '生产制造', '质量管理', '项目制造', 'BOS平台', '协同开发'
    ];
    this.contentDir = options.contentDir || COMMUNITY_DIR;
    this.maxPages = options.maxPages || 5;
    this.maxArticles = options.maxArticles || 20;

    // 内容存储
    this.articles = [];
    this.qa = [];
    this.knowledge = [];

    // 爬取状态
    this.crawlState = {
      lastCrawlTime: null,
      articlesCrawled: {},
      qaCrawled: {},
      knowledgeCrawled: {}
    };
  }

  /**
   * 初始化目录和状态
   */
  async initialize() {
    await fs.ensureDir(this.contentDir);

    // 加载已有内容
    if (await fs.pathExists(CONTENT_FILE)) {
      const content = await fs.readJson(CONTENT_FILE);
      this.articles = content.articles || [];
      this.qa = content.qa || [];
      this.knowledge = content.knowledge || [];
    }

    // 加载爬取状态
    if (await fs.pathExists(CRAWL_STATE_FILE)) {
      this.crawlState = await fs.readJson(CRAWL_STATE_FILE);
    }
  }

  /**
   * 模拟获取文章列表（实际需要真实API或爬虫）
   * 由于金蝶社区需要登录，此为演示实现
   * 实际使用时可通过Cookie或API获取真实数据
   */
  async fetchArticleList(category, page = 1) {
    console.log(`[采集器] 获取分类 "${category}" 第 ${page} 页文章列表`);

    // 模拟文章数据 - 真实场景下应替换为实际API调用
    const mockArticles = [
      {
        id: `art_${category}_${page}_1`,
        title: `${category}开发实战 - 案例分享 ${page}`,
        category: category,
        author: 'kd_user_' + Math.floor(Math.random() * 1000),
        publishDate: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
        content: `本文介绍${category}相关的开发实践和最佳实践案例。\n\n金蝶云星空提供了丰富的API接口，开发者可以通过二次开发实现业务需求。\n\n## 主要内容\n\n1. 环境配置\n2. 插件开发流程\n3. 常见问题解决`,
        tag: [category, '开发', '最佳实践'],
        views: Math.floor(Math.random() * 5000),
        likes: Math.floor(Math.random() * 100)
      },
      {
        id: `art_${category}_${page}_2`,
        title: `${category}常见问题解决方案`,
        category: category,
        author: 'kd_expert_' + Math.floor(Math.random() * 500),
        publishDate: new Date(Date.now() - Math.random() * 60 * 24 * 60 * 60 * 1000).toISOString(),
        content: `本文总结${category}开发中的常见问题及解决方案。\n\n1. 问题一：如何实现数据验证？\n2. 问题二：配置方法有哪些？\n3. 问题三：性能优化技巧`,
        tag: [category, 'FAQ', '问题解决'],
        views: Math.floor(Math.random() * 3000),
        likes: Math.floor(Math.random() * 50)
      },
      {
        id: `art_${category}_${page}_3`,
        title: `${category}进阶指南 - 高级特性详解`,
        category: category,
        author: 'kd_developer_' + Math.floor(Math.random() * 300),
        publishDate: new Date(Date.now() - Math.random() * 90 * 24 * 60 * 60 * 1000).toISOString(),
        content: `本文深入讲解${category}的高级特性，适合有经验的开发者阅读。\n\n## 高级主题\n\n- 性能优化\n- 扩展点开发\n- 与其他系统集成`,
        tag: [category, '进阶', '高级'],
        views: Math.floor(Math.random() * 2000),
        likes: Math.floor(Math.random() * 30)
      },
      {
        id: `art_${category}_${page}_4`,
        title: `${category}与工作流集成实战`,
        category: category,
        author: 'kd_architect_' + Math.floor(Math.random() * 200),
        publishDate: new Date(Date.now() - Math.random() * 45 * 24 * 60 * 60 * 1000).toISOString(),
        content: `本文介绍如何在${category}中集成工作流功能，实现业务流程自动化。\n\n## 核心内容\n\n1. 工作流服务介绍\n2. 集成方案设计\n3. 代码实现示例`,
        tag: [category, '工作流', '集成'],
        views: Math.floor(Math.random() * 4000),
        likes: Math.floor(Math.random() * 80)
      },
      {
        id: `art_${category}_${page}_5`,
        title: `${category}性能调优最佳实践`,
        category: category,
        author: 'kd_perf_' + Math.floor(Math.random() * 150),
        publishDate: new Date(Date.now() - Math.random() * 20 * 24 * 60 * 60 * 1000).toISOString(),
        content: `本文分享${category}性能调优的经验和技巧。\n\n## 性能优化要点\n\n- 数据库查询优化\n- 缓存策略\n- 异步处理`,
        tag: [category, '性能', '优化'],
        views: Math.floor(Math.random() * 2500),
        likes: Math.floor(Math.random() * 40)
      }
    ];

    return mockArticles;
  }

  /**
   * 获取文章详情
   */
  async fetchArticleDetail(articleId) {
    console.log(`[采集器] 获取文章详情: ${articleId}`);

    // 模拟返��已抓取的文章
    return this.articles.find(a => a.id === articleId);
  }

  /**
   * 获取问答列表
   */
  async fetchQA(page = 1) {
    console.log(`[采集器] 获取第 ${page} 页问答`);

    const mockQA = [
      {
        id: `qa_${page}_1`,
        question: `如何在${this.categories[0]}中实现数据验证？`,
        answer: '可以通过重写validate方法实现自定义验证逻辑...',
        category: this.categories[0],
        votes: Math.floor(Math.random() * 50)
      },
      {
        id: `qa_${page}_2`,
        question: `${this.categories[1]}模块如何集成？`,
        answer: '使用插件机制可以轻松实现模块集成...',
        category: this.categories[1],
        votes: Math.floor(Math.random() * 30)
      }
    ];

    return mockQA;
  }

  /**
   * 获取知识中心内容
   */
  async fetchKnowledge() {
    console.log(`[采集器] 获取知识中心内容`);

    const mockKnowledge = [
      {
        id: 'kb_001',
        title: '金蝶云星空常见问题解决方案培训',
        type: 'faq',
        content: '本培训涵盖星空企业版的常见问题及解决方案...'
      },
      {
        id: 'kb_002',
        title: 'WebAPI接口使用指南',
        type: 'guide',
        content: 'WebAPI提供RESTful接口，支持业务数据的增删改查...'
      },
      {
        id: 'kb_003',
        title: 'BOS平台二次开发指南',
        type: 'feature',
        content: 'BOS平台是金蝶云星空的定制开发平台...'
      }
    ];

    return mockKnowledge;
  }

  /**
   * 增量采集主方法
   */
  async crawl(options = {}) {
    const {
      categories = this.categories.slice(0, 4), // 默认采集4个分类
      maxPages = this.maxPages,
      forceUpdate = false
    } = options;

    console.log('\n=== 金蝶社区内容采集器 ===\n');
    console.log(`目标分类: ${categories.join(', ')}`);
    console.log(`最大页数: ${maxPages}`);

    await this.initialize();

    const startTime = new Date();
    let newArticlesCount = 0;
    let newQACount = 0;
    let newKnowledgeCount = 0;

    // 采集文章
    for (const category of categories) {
      if (!forceUpdate && this.crawlState.articlesCrawled[category]) {
        console.log(`[跳过] ${category} 已采集`);
        continue;
      }

      for (let page = 1; page <= maxPages; page++) {
        const articles = await this.fetchArticleList(category, page);

        for (const article of articles) {
          // 避免重复
          if (!this.articles.find(a => a.id === article.id)) {
            this.articles.push(article);
            newArticlesCount++;
          }
        }

        // 保存进度
        this.crawlState.articlesCrawled[category] = true;
        await this.saveCrawlState();
      }
    }

    // 采集问答
    console.log('\n[采集] 问答内容...');
    for (let page = 1; page <= Math.min(maxPages, 3); page++) {
      const qaList = await this.fetchQA(page);
      for (const qa of qaList) {
        if (!this.qa.find(q => q.id === qa.id)) {
          this.qa.push(qa);
          newQACount++;
        }
      }
    }

    // 采集知识中心
    console.log('[采集] 知识中心...');
    const knowledgeList = await this.fetchKnowledge();
    for (const kb of knowledgeList) {
      if (!this.knowledge.find(k => k.id === kb.id)) {
        this.knowledge.push(kb);
        newKnowledgeCount++;
      }
    }

    // 保存内容
    await this.saveContent();

    this.crawlState.lastCrawlTime = new Date().toISOString();

    const duration = Date.now() - startTime.getTime();

    console.log('\n=== 采集完成 ===');
    console.log(`新增文章: ${newArticlesCount}`);
    console.log(`新增问答: ${newQACount}`);
    console.log(`新增知识: ${newKnowledgeCount}`);
    console.log(`总文章数: ${this.articles.length}`);
    console.log(`总问答数: ${this.qa.length}`);
    console.log(`总知识数: ${this.knowledge.length}`);
    console.log(`耗时: ${duration}ms`);

    return {
      newArticles: newArticlesCount,
      newQA: newQACount,
      newKnowledge: newKnowledgeCount,
      totalArticles: this.articles.length,
      totalQA: this.qa.length,
      totalKnowledge: this.knowledge.length,
      duration
    };
  }

  /**
   * 保存内容到文件
   */
  async saveContent() {
    await fs.writeJson(CONTENT_FILE, {
      articles: this.articles,
      qa: this.qa,
      knowledge: this.knowledge,
      updatedAt: new Date().toISOString()
    }, { spaces: 2 });
  }

  /**
   * 保存爬取状态
   */
  async saveCrawlState() {
    await fs.writeJson(CRAWL_STATE_FILE, this.crawlState, { spaces: 2 });
  }

  /**
   * 获取内容统计
   */
  getStats() {
    return {
      articles: this.articles.length,
      qa: this.qa.length,
      knowledge: this.knowledge.length,
      lastCrawl: this.crawlState.lastCrawlTime,
      categories: Object.keys(this.crawlState.articlesCrawled)
    };
  }

  /**
   * 搜索内容
   */
  search(query, options = {}) {
    const { types = ['articles', 'qa', 'knowledge'], limit = 10 } = options;
    const results = [];
    const lowerQuery = query.toLowerCase();

    if (types.includes('articles')) {
      for (const article of this.articles) {
        if (
          article.title.toLowerCase().includes(lowerQuery) ||
          article.content.toLowerCase().includes(lowerQuery) ||
          article.tag.some(t => t.toLowerCase().includes(lowerQuery))
        ) {
          results.push({ type: 'article', ...article, score: this.calculateScore(article, query) });
        }
      }
    }

    if (types.includes('qa')) {
      for (const q of this.qa) {
        if (
          q.question.toLowerCase().includes(lowerQuery) ||
          q.answer.toLowerCase().includes(lowerQuery)
        ) {
          results.push({ type: 'qa', ...q, score: this.calculateScore(q, query) });
        }
      }
    }

    if (types.includes('knowledge')) {
      for (const kb of this.knowledge) {
        if (
          kb.title.toLowerCase().includes(lowerQuery) ||
          kb.content.toLowerCase().includes(lowerQuery)
        ) {
          results.push({ type: 'knowledge', ...kb, score: this.calculateScore(kb, query) });
        }
      }
    }

    // 按相关度排序
    results.sort((a, b) => b.score - a.score);

    return results.slice(0, limit);
  }

  /**
   * 计算相关度得分
   */
  calculateScore(item, query) {
    const lowerQuery = query.toLowerCase();
    let score = 0;

    // 标题匹配
    if (item.title && item.title.toLowerCase().includes(lowerQuery)) {
      score += 10;
    }

    // 内容匹配
    if (item.content && item.content.toLowerCase().includes(lowerQuery)) {
      score += 5;
    }

    // 标签匹配
    if (item.tag && Array.isArray(item.tag)) {
      for (const t of item.tag) {
        if (t.toLowerCase().includes(lowerQuery)) score += 3;
      }
    }

    // 浏览量加权
    if (item.views) {
      score += Math.min(Math.log10(item.views), 5);
    }

    return score;
  }
}

// CLI 入口
async function main() {
  const args = process.argv.slice(2);
  const collector = new CommunityCollector();

  // 解析命令行参数
  let command = 'help';
  let options = {};

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];

    if (arg === '--help' || arg === '-h') {
      command = 'help';
      break;
    } else if (arg === '--crawl' || arg === '-c') {
      command = 'crawl';
    } else if (arg === '--category' && args[i + 1]) {
      options.categories = [args[++i]];
    } else if (arg === '--search' && args[i + 1]) {
      command = 'search';
      options.query = args[++i];
    } else if (arg === '--stats') {
      command = 'stats';
    } else if (arg === '--limit' && args[i + 1]) {
      options.limit = parseInt(args[++i], 10);
    }
  }

  switch (command) {
    case 'help':
      console.log(`
=== 金蝶社区内容采集器 ===

用法: node community-collector.js [命令] [选项]

命令:
  --crawl, -c          执行内容采集
  --search <关键词>  搜索内容
  --stats              显示内容统计
  --help, -h          显示帮助

选项:
  --category <分类>  指定采集分类（可多次指定）
  --limit <数量>    搜索结果数量限制

示例:
  node community-collector.js --crawl
  node community-collector.js --category "BOS平台"
  node community-collector.js --search "工作流"
  node community-collector.js --stats
`);
      break;

    case 'crawl':
      await collector.crawl(options);
      break;

    case 'search':
      if (!options.query) {
        console.error('错误: 请指定搜索关键词');
        process.exit(1);
      }
      await collector.initialize();
      const results = collector.search(options.query, { limit: options.limit || 10 });
      console.log(`\n找到 ${results.length} 条结果:\n`);
      for (const r of results) {
        console.log(`[${r.type}] ${r.title}`);
        console.log(`  分类: ${r.category || 'N/A'}`);
        console.log(`  相关度: ${r.score.toFixed(1)}`);
        console.log('');
      }
      break;

    case 'stats':
      await collector.initialize();
      const stats = collector.getStats();
      console.log(`
=== 社区内容统计 ===

文章数: ${stats.articles}
问答数: ${stats.qa}
知识数: ${stats.knowledge}
最后采集: ${stats.lastCrawl || '从未'}
已采集分类: ${stats.categories.join(', ') || '无'}
`);
      break;

    default:
      console.log('未知命令，使用 --help 查看帮助');
  }
}

// 导出模块
module.exports = { CommunityCollector };

// CLI 入口
if (require.main === module) {
  main().catch(err => {
    console.error('错误:', err.message);
    process.exit(1);
  });
}