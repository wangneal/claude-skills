/**
 * 语义推理引擎
 * 基于知识图谱实现业务语义推理和隐含需求推断
 */

const fs = require('fs');
const path = require('path');

class SemanticReasoningEngine {
  /**
   * 构造函数
   * @param {Object} knowledgeGraph - 知识图谱实例
   * @param {Object} terminologyDictionary - 术语词典
   */
  constructor(knowledgeGraph = null, terminologyDictionary = null) {
    this.knowledgeGraph = knowledgeGraph;
    this.terminologyDictionary = terminologyDictionary || { domains: {}, crossDomainTerms: [] };
    this.inferenceRules = [];
    this.tokenizer = new ChineseTokenizer(this.terminologyDictionary);

    // 加载推理规则
    this.loadInferenceRules();
  }

  /**
   * 加载推理规则
   */
  loadInferenceRules() {
    try {
      const rulesPath = path.join(__dirname, 'inference-rules.json');
      if (fs.existsSync(rulesPath)) {
        const rulesData = JSON.parse(fs.readFileSync(rulesPath, 'utf-8'));
        this.inferenceRules = rulesData.rules || [];
      }
    } catch (error) {
      console.warn('加载推理规则失败:', error.message);
      this.inferenceRules = [];
    }
  }

  /**
   * 生成语义向量 (TF-IDF)
   * @param {string} text - 输入文本
   * @returns {Array} 向量
   */
  generateVector(text) {
    if (!text) return [];

    // 分词
    const tokens = this.tokenizer.tokenize(text.toLowerCase());

    // 构建词频向量
    const vector = {};
    for (const token of tokens) {
      vector[token] = (vector[token] || 0) + 1;
    }

    // 转换为数组格式
    const vocabulary = this.getVocabulary();
    const result = new Array(vocabulary.size).fill(0);

    for (const [term, freq] of Object.entries(vector)) {
      const index = vocabulary.get(term);
      if (index !== undefined) {
        // TF-IDF 简化计算
        const tf = freq / tokens.length;
        const idf = this.calculateIDF(term);
        result[index] = tf * idf;
      }
    }

    return result;
  }

  /**
   * 获取词汇表
   */
  getVocabulary() {
    const vocabulary = new Map();
    let index = 0;

    // 添加术语词典中的术语
    for (const [domain, data] of Object.entries(this.terminologyDictionary.domains)) {
      for (const term of data.terms) {
        if (!vocabulary.has(term.term)) {
          vocabulary.set(term.term, index++);
        }
        for (const syn of term.synonyms) {
          if (!vocabulary.has(syn)) {
            vocabulary.set(syn, index++);
          }
        }
      }
    }

    // 添加跨领域术语
    for (const term of this.terminologyDictionary.crossDomainTerms || []) {
      if (!vocabulary.has(term.term)) {
        vocabulary.set(term.term, index++);
      }
      for (const syn of term.synonyms || []) {
        if (!vocabulary.has(syn)) {
          vocabulary.set(syn, index++);
        }
      }
    }

    // 添加常见关键词
    const commonTerms = [
      '审批', 'approve', '审核', 'save', '保存', 'submit', '提交',
      'query', '查询', 'delete', '删除', 'update', '更新',
      'permission', '权限', 'workflow', '工作流', '打印', 'import', 'export'
    ];

    for (const term of commonTerms) {
      if (!vocabulary.has(term)) {
        vocabulary.set(term, index++);
      }
    }

    return vocabulary;
  }

  /**
   * 计算 IDF
   */
  calculateIDF(term) {
    // 简化的 IDF 计算
    return 1.0;
  }

  /**
   * 查找相似文本
   * @param {string} query - 查询文本
   * @param {Array} documents - 文档数组
   * @param {number} topK - 返回前 K 个结果
   * @returns {Array} 相似文档
   */
  findSimilar(query, documents, topK = 5) {
    const queryVector = this.generateVector(query);

    if (queryVector.length === 0 || !documents || documents.length === 0) {
      return [];
    }

    const results = [];

    for (const doc of documents) {
      const docText = typeof doc === 'string' ? doc : (doc.text || doc.content || '');
      const docVector = this.generateVector(docText);

      if (docVector.length > 0) {
        const similarity = this.cosineSimilarity(queryVector, docVector);
        results.push({
          document: doc,
          score: similarity
        });
      }
    }

    // 按相似度排序
    results.sort((a, b) => b.score - a.score);

    return results.slice(0, topK);
  }

  /**
   * 计算余弦相似度
   */
  cosineSimilarity(vec1, vec2) {
    if (vec1.length !== vec2.length || vec1.length === 0) {
      return 0;
    }

    let dotProduct = 0;
    let norm1 = 0;
    let norm2 = 0;

    for (let i = 0; i < vec1.length; i++) {
      dotProduct += vec1[i] * vec2[i];
      norm1 += vec1[i] * vec1[i];
      norm2 += vec2[i] * vec2[i];
    }

    const denominator = Math.sqrt(norm1) * Math.sqrt(norm2);
    return denominator === 0 ? 0 : dotProduct / denominator;
  }

  /**
   * 推断隐含需求
   * @param {string} requirementText - 需求文本
   * @returns {Array} 隐含需求列表
   */
  inferImplicitNeeds(requirementText) {
    const implicitNeeds = [];
    const lowerText = requirementText.toLowerCase();
    const tokens = this.tokenizer.tokenize(lowerText);

    // 遍历规则进行匹配
    for (const rule of this.inferenceRules) {
      const matchCount = rule.trigger_keywords.filter(
        keyword => lowerText.includes(keyword.toLowerCase()) ||
                   tokens.includes(keyword.toLowerCase())
      ).length;

      if (matchCount > 0) {
        for (const need of rule.implicit_needs) {
          implicitNeeds.push({
            description: need.description,
            sdk_services: need.sdk_services || [],
            priority: need.priority || 'medium',
            rule_id: rule.id,
            confidence: matchCount / rule.trigger_keywords.length
          });
        }
      }
    }

    // 如果知识图谱可用，添加基于图谱的推荐
    if (this.knowledgeGraph) {
      const graphRecommendations = this.getGraphRecommendations(requirementText);
      implicitNeeds.push(...graphRecommendations);
    }

    return implicitNeeds;
  }

  /**
   * 基于知识图谱的推荐
   */
  getGraphRecommendations(text) {
    const recommendations = [];
    const lowerText = text.toLowerCase();

    // 查找相关的业务实体
    const entityKeywords = {
      'sale_order': ['销售订单', '销售', 'sale', '订单'],
      'customer': ['客户', 'customer', '客户档案'],
      'purchase_order': ['采购订单', '采购', 'purchase'],
      'supplier': ['供应商', 'supplier', 'vendor'],
      'inventory': ['库存', 'inventory', 'stock'],
      'invoice': ['发票', 'invoice', '税务']
    };

    for (const [entityId, keywords] of Object.entries(entityKeywords)) {
      const matched = keywords.filter(k => lowerText.includes(k));
      if (matched.length > 0) {
        // 查找相关实体
        const related = this.knowledgeGraph.findRelated(entityId, 2);
        const relatedEntities = related.map(r => r.node.id);

        // 添加实体相关服务推荐
        recommendations.push({
          description: `涉及 ${entityId} 相关业务`,
          related_entities: relatedEntities,
          priority: 'medium',
          source: 'knowledge_graph'
        });
      }
    }

    return recommendations;
  }

  /**
   * 解释推断结果
   * @param {Object} need - 隐含需求
   * @returns {string} 解释文本
   */
  explainInference(need) {
    let explanation = `基于需求分析，识别出隐含需求: ${need.description}`;

    if (need.rule_id) {
      explanation += `\n推断依据: 匹配规则 ${need.rule_id}`;
    }

    if (need.confidence) {
      explanation += `\n置信度: ${(need.confidence * 100).toFixed(0)}%`;
    }

    if (need.sdk_services && need.sdk_services.length > 0) {
      explanation += `\n推荐 SDK 服务: ${need.sdk_services.join(', ')}`;
    }

    if (need.related_entities && need.related_entities.length > 0) {
      explanation += `\n相关实体: ${need.related_entities.join(', ')}`;
    }

    return explanation;
  }

  /**
   * 分析需求（增强版）
   * @param {string} requirementText - 需求文本
   * @returns {Object} 分析结果
   */
  analyzeRequirement(requirementText) {
    // 推断隐含需求
    const implicitNeeds = this.inferImplicitNeeds(requirementText);

    // 生成语义向量
    const vector = this.generateVector(requirementText);

    // 查找相似历史���求
    const similarNeeds = this.findSimilar(requirementText, implicitNeeds, 3);

    return {
      original_requirement: requirementText,
      implicit_needs: implicitNeeds,
      semantic_vector: vector,
      analysis_explanation: implicitNeeds.map(need => this.explainInference(need)).join('\n\n')
    };
  }
}

/**
 * 中文分词器
 */
class ChineseTokenizer {
  constructor(terminologyDictionary = null) {
    this.terminologyDictionary = terminologyDictionary || { domains: {}, crossDomainTerms: [] };
    this.customTerms = new Set();
    this.buildTermIndex();
  }

  /**
   * 构建术语索引
   */
  buildTermIndex() {
    this.termIndex = new Map();

    // 添加所有术语到索引
    for (const [domain, data] of Object.entries(this.terminologyDictionary.domains)) {
      for (const term of data.terms) {
        this.addTermToIndex(term.term, domain);
        for (const syn of term.synonyms || []) {
          this.addTermToIndex(syn, domain);
        }
      }
    }

    for (const term of this.terminologyDictionary.crossDomainTerms || []) {
      this.addTermToIndex(term.term, 'cross-domain');
      for (const syn of term.synonyms || []) {
        this.addTermToIndex(syn, 'cross-domain');
      }
    }
  }

  /**
   * 添加术语到索引
   */
  addTermToIndex(term, domain) {
    if (!this.termIndex.has(term)) {
      this.termIndex.set(term, new Set());
    }
    this.termIndex.get(term).add(domain);
  }

  /**
   * 分词处理
   * @param {string} text - 输入文本
   * @returns {Array} 词汇数组
   */
  tokenize(text) {
    if (!text) return [];

    const tokens = [];

    // 保护术语词典中的术语
    const protectedTerms = new Set(this.termIndex.keys());

    // 简单的基于词典的正向最大匹配
    let remaining = text;
    while (remaining.length > 0) {
      let matched = false;

      // 尝试匹配最长术语
      for (const term of protectedTerms) {
        if (remaining.startsWith(term) || remaining.includes(term)) {
          tokens.push(term);
          remaining = remaining.slice(term.length);
          matched = true;
          break;
        }
      }

      if (!matched) {
        // 处理单个字符或英文/数字
        const char = remaining[0];
        if (/[\u4e00-\u9fa5]/.test(char)) {
          // 中文字符
          tokens.push(char);
        } else if (/[a-zA-Z0-9]/.test(char)) {
          // 收集连续的英文/数字
          let word = '';
          while (remaining.length > 0 && /[a-zA-Z0-9]/.test(remaining[0])) {
            word += remaining[0];
            remaining = remaining.slice(1);
          }
          if (word) tokens.push(word.toLowerCase());
          continue;
        }
        // 跳过其他字符
        remaining = remaining.slice(1);
      }
    }

    // 添加自定义术语
    for (const term of this.customTerms) {
      if (text.includes(term) && !tokens.includes(term)) {
        tokens.push(term);
      }
    }

    return tokens;
  }

  /**
   * 添加自定义术语
   * @param {Array} terms - 术语数组
   */
  addCustomTerms(terms) {
    for (const term of terms) {
      this.customTerms.add(term);
    }
  }
}

// 导出
module.exports = {
  SemanticReasoningEngine,
  ChineseTokenizer
};