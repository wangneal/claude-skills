/**
 * 向量语义搜索模块
 * 使用 TF-IDF + 余弦相似度实现本地向量搜索
 * 无需外部 API，可离线使用
 */

const fs = require('fs-extra');
const path = require('path');
const glob = require('glob');

// 中文分词简单实现
function chineseSegment(text) {
  // 简单的中文字符分词
  const chineseChars = text.match(/[\u4e00-\u9fa5]+/g) || [];
  const words = [];

  // 2-4 字符滑动窗口
  for (const chars of chineseChars) {
    for (let i = 0; i < chars.length - 1; i++) {
      words.push(chars.substring(i, i + 2));
      if (i + 2 < chars.length) {
        words.push(chars.substring(i, i + 3));
      }
    }
    if (chars.length >= 2) {
      words.push(chars);
    }
  }

  // 添加英文单词
  const englishWords = text.match(/[a-zA-Z][a-zA-Z0-9]*/g) || [];
  words.push(...englishWords.map(w => w.toLowerCase()));

  return words;
}

// TF-IDF 向量化
class TFIDFVectorizer {
  constructor() {
    this.vocabulary = new Map();
    this.idf = new Map();
    this.documents = [];
  }

  // 从文本列表构建词汇表
  fit(documents) {
    const docCount = documents.length;
    const df = new Map(); // 文档频率

    // 统计每个词出现在多少个文档中
    for (const doc of documents) {
      const words = this.tokenize(doc.text);
      const uniqueWords = [...new Set(words)];

      for (const word of uniqueWords) {
        df.set(word, (df.get(word) || 0) + 1);
      }
    }

    // 计算 IDF
    for (const [word, count] of df) {
      this.idf.set(word, Math.log(docCount / count) + 1);
    }

    // 构建词汇表 (取 IDF 最高的词)
    const sortedWords = [...this.idf.entries()]
      .sort((a, b) => b[1] - a[1])
      .slice(0, 2000)  // 保留前 2000 个词
      .map(([word]) => word);

    sortedWords.forEach((word, index) => {
      this.vocabulary.set(word, index);
    });

    return this;
  }

  // 分词
  tokenize(text) {
    return chineseSegment(text);
  }

  // 转换为向量
  transform(text) {
    const vector = new Array(this.vocabulary.size).fill(0);
    const words = this.tokenize(text);
    const wordCount = new Map();

    // 统计词频
    for (const word of words) {
      if (this.vocabulary.has(word)) {
        wordCount.set(word, (wordCount.get(word) || 0) + 1);
      }
    }

    // 计算 TF-IDF
    for (const [word, count] of wordCount) {
      const idx = this.vocabulary.get(word);
      const tf = count / words.length;
      const idf = this.idf.get(word) || 1;
      vector[idx] = tf * idf;
    }

    return vector;
  }

  // 批量转换
  transformBatch(texts) {
    return texts.map(text => this.transform(text));
  }
}

// 余弦相似度
function cosineSimilarity(vecA, vecB) {
  let dotProduct = 0;
  let normA = 0;
  let normB = 0;

  for (let i = 0; i < vecA.length; i++) {
    dotProduct += vecA[i] * vecB[i];
    normA += vecA[i] * vecA[i];
    normB += vecB[i] * vecB[i];
  }

  if (normA === 0 || normB === 0) return 0;
  return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
}

// 语义搜索器
class SemanticSearcher {
  constructor(sdkDir) {
    this.sdkDir = sdkDir;
    this.vectorizer = new TFIDFVectorizer();
    this.documents = [];
    this.vectors = [];
    this.indexed = false;
  }

  // 加载 SDK 文档
  async loadDocuments() {
    const mdFiles = glob.sync(`${this.sdkDir}/**/*.md`, {
      ignore: [`${this.sdkDir}/**/00_模块索引.md`]
    });

    this.documents = [];

    for (const file of mdFiles) {
      try {
        const content = await fs.readFile(file, 'utf8');
        const relativePath = path.relative(this.sdkDir, file);
        const className = path.basename(file, '.md');

        // 提取摘要 (前 500 字符)
        const summary = content.substring(0, 500).replace(/[#*`\n]/g, ' ').trim();

        this.documents.push({
          className,
          path: relativePath,
          content: content.substring(0, 2000),  // 使用前 2000 字符
          summary,
          module: relativePath.split(path.sep)[0]
        });
      } catch (e) {
        // 忽略读取错误
      }
    }

    console.log(`加载了 ${this.documents.length} 个 SDK 文档`);
    return this.documents;
  }

  // 构建索引
  async buildIndex() {
    if (this.documents.length === 0) {
      await this.loadDocuments();
    }

    // 构建 TF-IDF 向量
    const texts = this.documents.map(doc => doc.content);
    this.vectorizer.fit(texts.map((_, i) => ({ text })));
    this.vectors = this.vectorizer.transformBatch(texts);

    this.indexed = true;
    console.log(`向量化索引构建完成: ${this.vectors.length} 个文档`);
    return this;
  }

  // 搜索
  async search(query, options = {}) {
    const { topK = 10, minScore = 0.01 } = options;

    if (!this.indexed) {
      await this.buildIndex();
    }

    // 查询向量化
    const queryVector = this.vectorizer.transform(query);

    // 计算相似度
    const results = [];

    for (let i = 0; i < this.documents.length; i++) {
      const score = cosineSimilarity(queryVector, this.vectors[i]);

      if (score >= minScore) {
        results.push({
          className: this.documents[i].className,
          module: this.documents[i].module,
          path: this.documents[i].path,
          summary: this.documents[i].summary,
          score
        });
      }
    }

    // 排序并返回 Top K
    results.sort((a, b) => b.score - a.score);
    return results.slice(0, topK);
  }

  // 保存索引到文件
  async saveIndex(indexPath) {
    const data = {
      documents: this.documents,
      vocabulary: [...this.vectorizer.vocabulary.entries()],
      idf: [...this.vectorizer.idf.entries()],
      vectors: this.vectors
    };

    await fs.writeJSON(indexPath, data);
    console.log(`索引已保存到: ${indexPath}`);
  }

  // 从文件加载索引
  async loadIndex(indexPath) {
    const data = await fs.readJSON(indexPath);

    this.documents = data.documents;
    this.vectorizer.vocabulary = new Map(data.vocabulary);
    this.vectorizer.idf = new Map(data.idf);
    this.vectors = data.vectors;
    this.indexed = true;

    console.log(`索引已加载: ${this.documents.length} 个文档`);
    return this;
  }
}

module.exports = {
  SemanticSearcher,
  TFIDFVectorizer,
  chineseSegment,
  cosineSimilarity
};

// 测试
if (require.main === module) {
  const sdkDir = path.join(__dirname, 'sdk');

  async function test() {
    const searcher = new SemanticSearcher(sdkDir);

    console.log('构建索引...');
    await searcher.buildIndex();

    const query = '开发一张报表，订单交货及时率：按时交付的订单量 / 需要交付的订单量 × 100%，逾期天数=入库日期-交货日期';

    console.log(`\n搜索: ${query}\n`);

    const results = await searcher.search(query, { topK: 10 });

    console.log('=== 搜索结果 ===');
    results.forEach((r, i) => {
      console.log(`${i + 1}. ${r.className} (${r.module}) [得分: ${r.score.toFixed(3)}]`);
      console.log(`   摘要: ${r.summary.substring(0, 80)}...`);
      console.log('');
    });
  }

  test().catch(console.error);
}