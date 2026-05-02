/**
 * 金蝶社区内容存储结构定义
 */

const CONTENT_SCHEMA = {
  // 文章内容
  articles: {
    id: 'string',
    title: 'string',
    category: 'string',
    author: 'string',
    publishDate: 'date',
    content: 'string',
    tags: ['string'],
    views: 'number',
    likes: 'number'
  },
  // 问答内容
  qa: {
    id: 'string',
    question: 'string',
    answer: 'string',
    category: 'string',
    votes: 'number'
  },
  // 知识库内容
  knowledge: {
    id: 'string',
    title: 'string',
    type: 'faq|feature|guide',
    content: 'string'
  }
};

/**
 * 内容存储管理类
 */
class CommunityContentStore {
  constructor(options = {}) {
    this.basePath = options.basePath || '.bos-flow/community';
    this.indexFile = `${this.basePath}/index.json`;
  }

  /**
   * 获取索引文件路径
   */
  getIndexPath() {
    return this.indexFile;
  }

  /**
   * 初始化索引
   */
  async initializeIndex(articles = [], qa = [], knowledge = []) {
    const index = {
      articles: this.buildArticleIndex(articles),
      qa: this.buildQAIndex(qa),
      knowledge: this.buildKnowledgeIndex(knowledge),
      categories: this.extractCategories(articles),
      tags: this.extractTags(articles),
      updatedAt: new Date().toISOString()
    };

    return index;
  }

  /**
   * 构建文章索引
   */
  buildArticleIndex(articles) {
    const index = {
      byId: {},
      byCategory: {},
      byTag: {},
      byDate: []
    };

    for (const article of articles) {
      // 按ID索引
      index.byId[article.id] = {
        title: article.title,
        category: article.category,
        author: article.author,
        publishDate: article.publishDate
      };

      // 按分类索引
      if (!index.byCategory[article.category]) {
        index.byCategory[article.category] = [];
      }
      index.byCategory[article.category].push(article.id);

      // 按标签索引
      if (article.tag && Array.isArray(article.tag)) {
        for (const tag of article.tag) {
          if (!index.byTag[tag]) {
            index.byTag[tag] = [];
          }
          index.byTag[tag].push(article.id);
        }
      }

      // 按日期索引
      index.byDate.push({
        id: article.id,
        date: article.publishDate
      });
    }

    // 按日期排序
    index.byDate.sort((a, b) => new Date(b.date) - new Date(a.date));

    return index;
  }

  /**
   * 构建问答索引
   */
  buildQAIndex(qa) {
    const index = {
      byId: {},
      byCategory: {}
    };

    for (const q of qa) {
      index.byId[q.id] = {
        question: q.question,
        category: q.category,
        votes: q.votes
      };

      if (!index.byCategory[q.category]) {
        index.byCategory[q.category] = [];
      }
      index.byCategory[q.category].push(q.id);
    }

    return index;
  }

  /**
   * 构建知识索引
   */
  buildKnowledgeIndex(knowledge) {
    const index = {
      byId: {},
      byType: {}
    };

    for (const kb of knowledge) {
      index.byId[kb.id] = {
        title: kb.title,
        type: kb.type
      };

      if (!index.byType[kb.type]) {
        index.byType[kb.type] = [];
      }
      index.byType[kb.type].push(kb.id);
    }

    return index;
  }

  /**
   * 提取所有分类
   */
  extractCategories(articles) {
    const categories = new Set();
    for (const article of articles) {
      if (article.category) {
        categories.add(article.category);
      }
    }
    return Array.from(categories).sort();
  }

  /**
   * 提取所有标签
   */
  extractTags(articles) {
    const tags = new Set();
    for (const article of articles) {
      if (article.tag && Array.isArray(article.tag)) {
        for (const tag of article.tag) {
          tags.add(tag);
        }
      }
    }
    return Array.from(tags).sort();
  }
}

// 导出
module.exports = {
  CONTENT_SCHEMA,
  CommunityContentStore
};