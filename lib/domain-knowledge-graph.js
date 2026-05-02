/**
 * 金蝶领域知识图谱模块
 * 提供知识图谱数据结构和管理功能
 */

class KnowledgeGraph {
  constructor(data = null) {
    this.data = data || {
      nodes: [],
      edges: []
    };
  }

  /**
   * 添加节点
   * @param {string} id - 节点ID
   * @param {string} label - 节点标签
   * @param {string} type - 节点类型
   * @param {Object} properties - 节点属性
   */
  addNode(id, label, type, properties = {}) {
    // 检查节点是否已存在
    const existingNode = this.data.nodes.find(n => n.id === id);
    if (existingNode) {
      return existingNode;
    }

    const node = {
      id,
      label,
      type,
      properties
    };
    this.data.nodes.push(node);
    return node;
  }

  /**
   * 添加边（关系）
   * @param {string} source - 源节点ID
   * @param {string} target - 目标节点ID
   * @param {string} type - 关系类型
   * @param {string} label - 关系标签
   */
  addEdge(source, target, type, label) {
    const edge = {
      source,
      target,
      type,
      label
    };
    this.data.edges.push(edge);
    return edge;
  }

  /**
   * 查找节点
   * @param {string} id - 节点ID
   * @returns {Object|null}
   */
  findNode(id) {
    return this.data.nodes.find(n => n.id === id) || null;
  }

  /**
   * 按类型查找节点
   * @param {string} type - 节点类型
   * @returns {Array}
   */
  findNodesByType(type) {
    return this.data.nodes.filter(n => n.type === type);
  }

  /**
   * 查找相关节点
   * @param {string} nodeId - 起始节点ID
   * @param {number} depth - 查找深度
   * @returns {Array}
   */
  findRelated(nodeId, depth = 1) {
    const related = [];
    const visited = new Set();
    const queue = [{ id: nodeId, currentDepth: 0 }];

    while (queue.length > 0) {
      const { id, currentDepth } = queue.shift();

      if (visited.has(id) || currentDepth > depth) {
        continue;
      }
      visited.add(id);

      // 查找以当前节点为源的所有边
      const outgoingEdges = this.data.edges.filter(e => e.source === id);
      for (const edge of outgoingEdges) {
        const targetNode = this.findNode(edge.target);
        if (targetNode && !visited.has(edge.target)) {
          related.push({
            node: targetNode,
            relation: edge,
            depth: currentDepth + 1
          });
          queue.push({ id: edge.target, currentDepth: currentDepth + 1 });
        }
      }

      // 查找以当前节点为目标的所有边（反向关系）
      const incomingEdges = this.data.edges.filter(e => e.target === id);
      for (const edge of incomingEdges) {
        const sourceNode = this.findNode(edge.source);
        if (sourceNode && !visited.has(edge.source)) {
          related.push({
            node: sourceNode,
            relation: edge,
            depth: currentDepth + 1,
            reverse: true
          });
          queue.push({ id: edge.source, currentDepth: currentDepth + 1 });
        }
      }
    }

    return related;
  }

  /**
   * 序列化图数据为 JSON 字符串
   * @returns {string}
   */
  toJSON() {
    return JSON.stringify(this.data, null, 2);
  }

  /**
   * 从 JSON 字符串加载图数据
   * @param {string} jsonString - JSON 字符串
   * @returns {KnowledgeGraph}
   */
  static fromJSON(jsonString) {
    const data = JSON.parse(jsonString);
    return new KnowledgeGraph(data);
  }

  /**
   * 从 JSON 文件加载图数据
   * @param {string} filePath - 文件路径
   * @returns {Promise<KnowledgeGraph>}
   */
  static async fromFile(filePath) {
    const fs = await import('fs/promises');
    const content = await fs.readFile(filePath, 'utf-8');
    return KnowledgeGraph.fromJSON(content);
  }

  /**
   * 保存图数据到 JSON 文件
   * @param {string} filePath - 文件路径
   * @returns {Promise<void>}
   */
  async saveToFile(filePath) {
    const fs = await import('fs/promises');
    await fs.writeFile(filePath, this.toJSON(), 'utf-8');
  }

  /**
   * 获取图统计数据
   * @returns {Object}
   */
  getStats() {
    const nodeTypes = {};
    const edgeTypes = {};

    for (const node of this.data.nodes) {
      nodeTypes[node.type] = (nodeTypes[node.type] || 0) + 1;
    }

    for (const edge of this.data.edges) {
      edgeTypes[edge.type] = (edgeTypes[edge.type] || 0) + 1;
    }

    return {
      nodeCount: this.data.nodes.length,
      edgeCount: this.data.edges.length,
      nodeTypes,
      edgeTypes
    };
  }

  /**
   * 清空图数据
   */
  clear() {
    this.data.nodes = [];
    this.data.edges = [];
  }
}

/**
 * 创建知识图谱实例的工厂函数
 * @param {Object} data - 初始数据（可选）
 * @returns {KnowledgeGraph}
 */
function createKnowledgeGraph(data = null) {
  return new KnowledgeGraph(data);
}

/**
 * 加载预设的金蝶领域知识图谱
 * @param {string} basePath - 基础路径
 * @returns {Promise<KnowledgeGraph>}
 */
async function loadDomainKnowledgeGraph(basePath = '.bos-flow/sdk') {
  const filePath = `${basePath}/domain-knowledge-graph.json`;
  try {
    return await KnowledgeGraph.fromFile(filePath);
  } catch (error) {
    // 如果文件不存在，返回空图谱
    console.warn(`知识图谱文件不存在: ${filePath}，创建新的空图谱`);
    return new KnowledgeGraph();
  }
}

module.exports = {
  KnowledgeGraph,
  createKnowledgeGraph,
  loadDomainKnowledgeGraph
};