/**
 * 最佳实践加载器
 * 扫描代码示例和开发规范，构建最佳实践索引
 */

const fs = require('fs');
const path = require('path');

class BestPracticeLoader {
  constructor(basePath = null) {
    this.basePath = basePath || path.join(__dirname, '..');
    this.examplesPath = path.join(this.basePath, 'examples');
    this.standardsPath = path.join(this.basePath, 'standards');
    this.practices = [];
    this.indexLoaded = false;
  }

  /**
   * 加载所有最佳实践
   * @returns {Array} 最佳实践数组
   */
  async loadPractices() {
    // 首先尝试加载现有索引
    const indexPath = path.join(__dirname, 'best-practice-index.json');
    if (fs.existsSync(indexPath)) {
      try {
        const indexData = JSON.parse(fs.readFileSync(indexPath, 'utf-8'));
        if (indexData.practices && indexData.practices.length > 0) {
          this.practices = indexData.practices;
          this.indexLoaded = true;
          console.log(`从索引加载 ${this.practices.length} 条最佳实践`);
          return this.practices;
        }
      } catch (e) {
        console.warn('加载最佳实践索引失败:', e.message);
      }
    }

    // 如果没有索引，则扫描目录构建
    await this.buildIndex();
    return this.practices;
  }

  /**
   * 扫描代码示例目录
   * @returns {Array} 代码示例信息
   */
  scanExamples() {
    const examples = [];

    if (!fs.existsSync(this.examplesPath)) {
      return examples;
    }

    const scanDir = (dir, category) => {
      try {
        const entries = fs.readdirSync(dir, { withFileTypes: true });

        for (const entry of entries) {
          const fullPath = path.join(dir, entry.name);

          if (entry.isDirectory()) {
            scanDir(fullPath, category);
          } else if (entry.name.endsWith('.java') || entry.name.endsWith('.example')) {
            const content = fs.existsSync(fullPath) ? fs.readFileSync(fullPath, 'utf-8') : '';
            examples.push({
              filePath: fullPath,
              fileName: entry.name,
              category: category,
              description: this.extractDescription(content, entry.name),
              keywords: this.extractKeywords(entry.name, content)
            });
          }
        }
      } catch (e) {
        // 跳过无法访问的目录
      }
    };

    scanDir(this.examplesPath, 'plugin-development');
    return examples;
  }

  /**
   * 扫描开发规范目录
   * @returns {Array} 规范信息
   */
  scanStandards() {
    const standards = [];

    if (!fs.existsSync(this.standardsPath)) {
      return standards;
    }

    try {
      const entries = fs.readdirSync(this.standardsPath, { withFileTypes: true });

      for (const entry of entries) {
        if (entry.isFile() && (entry.name.endsWith('.md') || entry.name.endsWith('.json'))) {
          const fullPath = path.join(this.standardsPath, entry.name);
          const content = fs.readFileSync(fullPath, 'utf-8');

          // 根据文件名确定分类
          let category = 'code-standards';
          if (entry.name.includes('performance') || entry.name.includes('optimization')) {
            category = 'performance';
          } else if (entry.name.includes('permission')) {
            category = 'permission';
          } else if (entry.name.includes('exception')) {
            category = 'exception-handling';
          }

          standards.push({
            filePath: fullPath,
            fileName: entry.name,
            category: category,
            description: this.extractDescription(content, entry.name),
            keywords: this.extractKeywords(entry.name, content)
          });
        }
      }
    } catch (e) {
      console.warn('扫描规范目录失败:', e.message);
    }

    return standards;
  }

  /**
   * 从内容中提取描述
   */
  extractDescription(content, fileName) {
    // 尝试从注释中提取描述
    const commentMatch = content.match(/\/\*\*[\s\S]*?\*\s*([^@\*\n]+)/);
    if (commentMatch && commentMatch[1]) {
      return commentMatch[1].trim();
    }

    // 从文件名生成描述
    const nameWithoutExt = fileName.replace(/\.(java|example|md|json)$/, '');
    return nameWithoutExt
      .replace(/([A-Z])/g, ' $1')
      .replace(/[-_]/g, ' ')
      .trim();
  }

  /**
   * 提取关键词
   */
  extractKeywords(fileName, content) {
    const keywords = new Set();

    // 从文件名提取
    const nameWithoutExt = fileName.replace(/\.(java|example|md|json)$/, '');
    const nameParts = nameWithoutExt.split(/[-_]/);
    for (const part of nameParts) {
      if (part.length > 2) {
        keywords.add(part.toLowerCase());
      }
    }

    // 从内容提取常见关键词
    const commonKeywords = [
      'form', 'list', 'workflow', 'report', 'plugin',
      'validation', 'save', 'delete', 'query', 'submit',
      'permission', 'exception', 'error', 'log',
      'customer', 'supplier', 'order', 'invoice'
    ];

    const lowerContent = content.toLowerCase();
    for (const kw of commonKeywords) {
      if (lowerContent.includes(kw)) {
        keywords.add(kw);
      }
    }

    return Array.from(keywords);
  }

  /**
   * 构建实践索引
   * @returns {Array} 索引后的实践数组
   */
  async buildIndex() {
    console.log('构建最佳实践索引...');

    const examples = this.scanExamples();
    const standards = this.scanStandards();

    // 将示例转换为实践
    for (const example of examples) {
      this.practices.push({
        id: this.generateId(example.fileName),
        category: example.category,
        title: example.description,
        keywords: example.keywords,
        description: `代码示例: ${example.fileName}`,
        code_example: path.relative(this.basePath, example.filePath),
        related_standards: []
      });
    }

    // 将规范转换为实践
    for (const standard of standards) {
      this.practices.push({
        id: this.generateId(standard.fileName),
        category: standard.category,
        title: standard.description,
        keywords: standard.keywords,
        description: `开发规范: ${standard.fileName}`,
        code_example: null,
        related_standards: [path.relative(this.basePath, standard.filePath)]
      });
    }

    // 保存索引
    this.saveIndex();

    console.log(`索引构建完成: ${this.practices.length} 条最佳实践`);
    return this.practices;
  }

  /**
   * 生成唯一 ID
   */
  generateId(fileName) {
    return fileName
      .replace(/\.(java|example|md|json)$/, '')
      .replace(/[-_\s]+/g, '-')
      .toLowerCase();
  }

  /**
   * 保存索引到文件
   */
  saveIndex() {
    const indexPath = path.join(__dirname, 'best-practice-index.json');
    const indexData = {
      version: '1.0.0',
      lastUpdated: new Date().toISOString().split('T')[0],
      practices: this.practices
    };

    try {
      fs.writeFileSync(indexPath, JSON.stringify(indexData, null, 2), 'utf-8');
      console.log(`索引已保存到: ${indexPath}`);
    } catch (e) {
      console.warn('保存索引失败:', e.message);
    }
  }

  /**
   * 根据 ID 获取实践
   * @param {string} id - 实践 ID
   * @returns {Object|null} 实践对象
   */
  getPracticeById(id) {
    return this.practices.find(p => p.id === id) || null;
  }

  /**
   * 根据分类获取实践
   * @param {string} category - 分类
   * @returns {Array} 实践数组
   */
  getPracticesByCategory(category) {
    return this.practices.filter(p => p.category === category);
  }
}

/**
 * 最佳实践推荐器
 */
class BestPracticeRecommender {
  constructor(loader) {
    this.loader = loader;
    this.practices = [];
  }

  /**
   * 初始化
   */
  async init() {
    this.practices = await this.loader.loadPractices();
  }

  /**
   * 推荐最佳实践
   * @param {string} requirementText - 需求文本
   * @param {Object} options - 选项
   * @returns {Array} 推荐结果
   */
  async recommend(requirementText, options = {}) {
    const topK = options.topK || 5;

    if (this.practices.length === 0) {
      await this.init();
    }

    // 关键词匹配
    const matches = this.matchByKeywords(requirementText, this.practices);

    // 排序
    const ranked = this.rankByRelevance(matches);

    // 返回 topK
    return ranked.slice(0, topK);
  }

  /**
   * 关键词匹配
   * @param {string} text - 文本
   * @param {Array} practices - 实践数组
   * @returns {Array} 匹配结果
   */
  matchByKeywords(text, practices) {
    const textLower = text.toLowerCase();
    const textKeywords = this.extractKeywords(textLower);

    const matches = [];

    for (const practice of practices) {
      let matchCount = 0;
      const matchedKeywords = [];

      for (const kw of textKeywords) {
        // 同时检查原文和中文拼音形式
        if (practice.keywords.includes(kw) ||
            practice.keywords.some(pk => pk.includes(kw) || kw.includes(pk))) {
          matchCount++;
          matchedKeywords.push(kw);
        }
      }

      if (matchCount > 0) {
        // 分数 = 匹配数 / (文本关键词数 * 0.5 + 1)
        // 这样匹配数越多分数越高
        const score = matchCount / (textKeywords.length * 0.5 + 1);
        matches.push({
          practice: practice,
          match_count: matchCount,
          matched_keywords: matchedKeywords,
          score: Math.min(score, 1.0)
        });
      }
    }

    return matches;
  }

  /**
   * 按相关度排序
   * @param {Array} matches - 匹配结果
   * @returns {Array} 排序后的结果
   */
  rankByRelevance(matches) {
    return matches.sort((a, b) => b.score - a.score);
  }

  /**
   * 提取关键词
   * @param {string} text - 文本
   * @returns {Array} 关键词数组
   */
  extractKeywords(text) {
    const keywords = new Set();

    // 简单中文分词：按单字符分割，然后组合常见词
    // 先提取所有中文字符
    const chineseChars = text.match(/[\u4e00-\u9fa5]/g) || [];

    // 常见的2-4字词组
    const commonWords = [
      '销售', '订单', '客户', '采购', '供应商', '库存', '仓库',
      '审批', '审核', '流程', '工作流', '保存', '提交', '查询',
      '数据', '验证', '权限', '报表', '打印', '导入', '导出',
      '表单', '列表', '插件', '服务', '方法', '字段'
    ];

    for (const word of commonWords) {
      if (text.includes(word)) {
        keywords.add(word);
      }
    }

    // 英文关键词提取
    const englishPattern = /[a-zA-Z]{3,}/g;
    let match;
    while ((match = englishPattern.exec(text)) !== null) {
      keywords.add(match[0].toLowerCase());
    }

    return Array.from(keywords);
  }

  /**
   * 获取代码示例
   * @param {string} practiceId - 实践 ID
   * @returns {Object|null} 代码示例信息
   */
  async getCodeExample(practiceId) {
    if (this.practices.length === 0) {
      await this.init();
    }

    const practice = this.practices.find(p => p.id === practiceId);
    if (!practice || !practice.code_example) {
      return null;
    }

    const fullPath = path.join(this.loader.basePath, practice.code_example);

    if (!fs.existsSync(fullPath)) {
      return null;
    }

    return {
      path: practice.code_example,
      content: fs.readFileSync(fullPath, 'utf-8'),
      language: path.extname(fullPath).slice(1) || 'java'
    };
  }
}

// 导出
module.exports = {
  BestPracticeLoader,
  BestPracticeRecommender
};