/**
 * 领域知识编排器
 * 统一协调知识图谱、语义推理、最佳实践推荐
 */

const path = require('path');

class DomainKnowledgeOrchestrator {
  constructor(options = {}) {
    this.options = {
      basePath: options.basePath || process.cwd(),
      enableCache: options.enableCache !== false,
      logLevel: options.logLevel || 'info',
      ...options
    };

    // 模块实例
    this.knowledgeGraph = null;
    this.semanticEngine = null;
    this.practiceLoader = null;
    this.practiceRecommender = null;

    // 状态
    this.status = {
      initialized: false,
      modules: {}
    };

    // 知识流转日志
    this.knowledgeFlow = [];
  }

  /**
   * 初始化所有模块
   */
  async initialize() {
    this.log('info', '初始化领域知识编排器...');

    try {
      // 加载知识图谱
      try {
        const kgModule = require('./domain-knowledge-graph.js');
        this.knowledgeGraph = await kgModule.loadDomainKnowledgeGraph(this.options.basePath + '/.bos-flow/sdk');
        this.status.modules.knowledgeGraph = 'loaded';
        this.log('info', '知识图谱模块已加载');
      } catch (e) {
        this.status.modules.knowledgeGraph = 'failed';
        this.log('warn', `知识图谱加载失败: ${e.message}`);
      }

      // 加载语义推理引擎
      try {
        const semanticModule = require('./semantic-reasoning-engine.js');
        const termDict = require('./terminology-dictionary.json');
        this.semanticEngine = new semanticModule.SemanticReasoningEngine(
          this.knowledgeGraph,
          termDict
        );
        this.status.modules.semanticEngine = 'loaded';
        this.log('info', '语义推理引擎已加载');
      } catch (e) {
        this.status.modules.semanticEngine = 'failed';
        this.log('warn', `语义推理引擎加载失败: ${e.message}`);
      }

      // 加载最佳实践推荐器
      try {
        const practiceModule = require('./best-practice-loader.js');
        this.practiceLoader = new practiceModule.BestPracticeLoader(this.options.basePath + '/.bos-flow');
        await this.practiceLoader.loadPractices();
        this.practiceRecommender = new practiceModule.BestPracticeRecommender(this.practiceLoader);
        await this.practiceRecommender.init();
        this.status.modules.practiceRecommender = 'loaded';
        this.log('info', '最佳实践推荐器已加载');
      } catch (e) {
        this.status.modules.practiceRecommender = 'failed';
        this.log('warn', `最佳实践推荐器加载失败: ${e.message}`);
      }

      this.status.initialized = true;
      this.log('info', '领域知识编排器初始化完成');
      return true;
    } catch (error) {
      this.log('error', `初始化失败: ${error.message}`);
      return false;
    }
  }

  /**
   * 理解项目结构
   * @param {string} projectPath - 项目路径
   * @returns {Object} 项目理解结果
   */
  async understandProject(projectPath) {
    this.log('info', `理解项目: ${projectPath}`);
    this.addFlow('understandProject', { projectPath });

    try {
      // 使用现有的项目扫描器
      const ProjectScanner = require('../../engine/lib/project-scanner.js').ProjectScanner;
      const scanner = new ProjectScanner();
      const scanResult = scanner.scanProject(projectPath);

      // 提取领域信息
      const result = {
        projectPath: projectPath,
        structure: scanResult.structure,
        modules: scanResult.modules,
        plugins: scanResult.plugins,
        domainInfo: scanResult.domainInfo || null,
        entities: scanResult.extractedEntities || [],
        relationships: scanResult.relationships || []
      };

      this.addFlow('understandProject.complete', { domain: result.domainInfo?.domain });
      return result;
    } catch (error) {
      this.log('error', `项目理解失败: ${error.message}`);
      throw error;
    }
  }

  /**
   * 分析需求
   * @param {string} requirement - 需求文本
   * @returns {Object} 分析结果
   */
  async analyzeRequirement(requirement) {
    this.log('info', `分析需求: ${requirement.substring(0, 50)}...`);
    this.addFlow('analyzeRequirement', { requirement: requirement.substring(0, 30) });

    try {
      const { RequirementAnalyzer } = require('./requirement-analyzer.js');
      const analyzer = new RequirementAnalyzer();

      const result = await analyzer.analyze(requirement);

      this.addFlow('analyzeRequirement.complete', {
        features: result.features?.length || 0,
        implicitNeeds: result.implicit_needs?.length || 0,
        bestPractices: result.best_practices?.length || 0
      });

      return result;
    } catch (error) {
      this.log('error', `需求分析失败: ${error.message}`);
      throw error;
    }
  }

  /**
   * 推荐最佳实践
   * @param {string} requirement - 需求文本
   * @returns {Array} 推荐结果
   */
  async recommendBestPractice(requirement) {
    this.log('info', `推荐最佳实践: ${requirement.substring(0, 30)}...`);

    if (!this.practiceRecommender) {
      this.log('warn', '最佳实践推荐器未加载');
      return [];
    }

    try {
      const recommendations = await this.practiceRecommender.recommend(requirement);
      return recommendations.map(r => ({
        id: r.practice.id,
        title: r.practice.title,
        description: r.practice.description,
        code_example: r.practice.code_example,
        score: r.score,
        matched_keywords: r.matched_keywords
      }));
    } catch (error) {
      this.log('error', `最佳实践推荐失败: ${error.message}`);
      return [];
    }
  }

  /**
   * 获取编排器状态
   * @returns {Object} 状态信息
   */
  getStatus() {
    return {
      initialized: this.status.initialized,
      modules: this.status.modules,
      knowledgeFlow: this.knowledgeFlow,
      options: {
        basePath: this.options.basePath,
        enableCache: this.options.enableCache
      }
    };
  }

  /**
   * 添加知识流转记录
   */
  addFlow(action, data) {
    this.knowledgeFlow.push({
      timestamp: new Date().toISOString(),
      action,
      data
    });
  }

  /**
   * 获取知识流转历史
   */
  getKnowledgeFlow() {
    return this.knowledgeFlow;
  }

  /**
   * 清空知识流转记录
   */
  clearKnowledgeFlow() {
    this.knowledgeFlow = [];
  }

  /**
   * 日志输出
   */
  log(level, message) {
    const prefix = '[DomainKnowledgeOrchestrator]';
    console[level](`${prefix} ${message}`);
  }
}

// 导出
module.exports = {
  DomainKnowledgeOrchestrator
};