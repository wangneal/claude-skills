/**
 * 需求分析器 - 语义分析业务需求，提取功能点，推荐 SDK，提供实现思路
 */

const fs = require('fs-extra');
const path = require('path');

// SDK 搜索功能（可选，如果存在 sdk-search 则使用）
let sdkSearch = null;
try {
  sdkSearch = require('./sdk-search');
} catch (e) {
  // sdk-search 不存在，使用本地推荐
}

// ==================== 类型定义 ====================

/**
 * 功能点
 * @typedef {Object} Feature
 * @property {string} name - 功能名称
 * @property {string} description - 功能描述
 * @property {'high'|'medium'|'low'} priority - 优先级
 */

/**
 * SDK 推荐
 * @typedef {Object} SDKRecommendation
 * @property {string} className - 类名
 * @property {string} module - 模块
 * @property {string} usage - 用途说明
 * @property {number} confidence - 置信度 (0-1)
 */

/**
 * 实现步骤
 * @typedef {Object} Step
 * @property {number} order - 步骤序号
 * @property {string} title - 步骤标题
 * @property {string} description - 步骤描述
 * @property {string} code - 代码示例
 */

/**
 * 代码示���
 * @typedef {Object} CodeExample
 * @property {string} language - 语言
 * @property {string} code - 代码内容
 * @property {string} description - 说明
 */

/**
 * 实现指南
 * @typedef {Object} ImplementationGuide
 * @property {Step[]} steps - 实现步骤列表
 * @property {CodeExample[]} codeExamples - 代码示例
 */

/**
 * 分析结果
 * @typedef {Object} AnalysisResult
 * @property {Feature[]} features - 功能点列表
 * @property {number} complexity - 复杂度 (1-10)
 * @property {string[]} keywords - 关键词列表
 * @property {string} summary - 需求摘要
 */

// ==================== 业务动作映射 ====================

const BUSINESS_ACTIONS = {
  // 数据操作
  '创建': 'create',
  '新增': 'create',
  '添加': 'create',
  '录入': 'create',
  '保存': 'create',
  '提交': 'submit',

  // 查询操作
  '查询': 'query',
  '检索': 'query',
  '查找': 'query',
  '获取': 'query',
  '查看': 'query',
  '展示': 'query',
  '显示': 'query',
  '列表': 'query',
  '报表': 'report',
  '统计': 'report',
  '汇总': 'report',

  // 修改操作
  '修改': 'update',
  '更新': 'update',
  '编辑': 'update',
  '变更': 'update',
  '调整': 'update',
  '设置': 'update',

  // 删除操作
  '删除': 'delete',
  '移除': 'delete',
  '清除': 'delete',

  // 审批流程
  '审批': 'approve',
  '审核': 'approve',
  '批准': 'approve',
  '驳回': 'approve',
  '流转': 'approve',

  // 通知
  '通知': 'notify',
  '发送': 'notify',
  '提醒': 'notify',
  '推送': 'notify',

  // 计算
  '计算': 'calculate',
  '求和': 'calculate',
  '平均': 'calculate',

  // 导入导出
  '导入': 'import',
  '导出': 'import',
  '下载': 'import',
  '上传': 'import',
};

// ==================== 业务实体映射 ====================

const BUSINESS_ENTITIES = {
  '订单': ['Order', 'SaleOrder', 'PurchaseOrder'],
  '工单': ['WorkOrder', 'ProductionOrder', 'ProcessOrder'],
  '物料': ['Material', 'Product', 'Item'],
  '客户': ['Customer', 'Client'],
  '供应商': ['Supplier', 'Vendor'],
  '员工': ['Employee', 'Staff'],
  '仓库': ['Warehouse', 'Stock'],
  '库存': ['Inventory', 'Stock'],
  '报表': ['Report', 'Statement'],
  '单据': ['Bill', 'Document'],
  '价格': ['Price', 'Cost'],
  '金额': ['Amount', 'Money'],
};

// ==================== SDK 推荐映射 ====================

const SDK_MAPPING = {
  'create': ['BusinessDataServiceHelper', 'DynamicObject'],
  'query': ['QueryServiceHelper', 'BusinessDataServiceHelper', 'DynamicObject'],
  'update': ['BusinessDataServiceHelper', 'DynamicObject'],
  'delete': ['BusinessDataServiceHelper'],
  'approve': ['WorkflowServiceHelper'],
  'notify': ['PrintServiceHelper', 'TimeServiceHelper'],
  'calculate': ['DynamicObject', 'TimeServiceHelper'],
  'import': ['AttachmentServiceHelper'],
  'report': ['BusinessDataServiceHelper', 'PrintServiceHelper'],
};

// ==================== 核心类列表 ====================

const CORE_CLASSES = [
  { className: 'DynamicObject', module: '核心框架', usage: '处理动态业务对象数据' },
  { className: 'BusinessDataServiceHelper', module: '核心框架', usage: '业务数据 CRUD 操作' },
  { className: 'WorkflowServiceHelper', module: '核心框架', usage: '工作流审批相关操作' },
  { className: 'QueryServiceHelper', module: '核心框架', usage: '查询和过滤业务数据' },
  { className: 'MetadataServiceHelper', module: '核心框架', usage: '元数据和结构操作' },
  { className: 'PermissionServiceHelper', module: '核心框架', usage: '权限检查和设置' },
  { className: 'PrintServiceHelper', module: '核心框架', usage: '打印和报表输出' },
  { className: 'TimeServiceHelper', module: '核心框架', usage: '时间相关计算' },
];

/**
 * 需求分析器类
 */
class RequirementAnalyzer {
  constructor(options = {}) {
    this.options = {
      minFeatures: 1,
      maxFeatures: 20,
      ...options
    };
  }

  /**
   * 主分析入口
   * @param {string} requirement - 业务需求文本
   * @returns {AnalysisResult} 分析结果
   */
  analyze(requirement) {
    if (!requirement || requirement.trim().length === 0) {
      throw new Error('需求文本不能为空');
    }

    // 1. 提取功能点
    const features = this.extractFeatures(requirement);

    // 2. 计算复杂度
    const complexity = this.calculateComplexity(requirement, features);

    // 3. 提取关键词
    const keywords = this.extractKeywords(requirement);

    // 4. 生成摘要
    const summary = this.generateSummary(requirement, features);

    return {
      features,
      complexity,
      keywords,
      summary
    };
  }

  /**
   * 提取功能点
   * @param {string} requirement - 业务需求
   * @returns {Feature[]} 功能点列表
   */
  extractFeatures(requirement) {
    const features = [];
    const normalized = requirement.toLowerCase();

    // 检测业务动作
    for (const [action, type] of Object.entries(BUSINESS_ACTIONS)) {
      if (normalized.includes(action)) {
        // 查找相关的业务实体
        let entity = '';
        for (const [ent, keywords] of Object.entries(BUSINESS_ENTITIES)) {
          if (normalized.includes(ent)) {
            entity = ent;
            break;
          }
        }

        features.push({
          name: `${entity ? entity + '的' : ''}${action}`,
          description: this.generateFeatureDescription(type, entity, requirement),
          priority: this.determinePriority(type, entity),
          actionType: type  // 保存动作类型
        });
      }
    }

    // 如果没有检测到动作，尝试智能提取 - 检查业务实体
    if (features.length === 0) {
      for (const [entity, keywords] of Object.entries(BUSINESS_ENTITIES)) {
        if (normalized.includes(entity)) {
          features.push({
            name: `${entity}相关处理`,
            description: `处理${entity}相关的业务逻辑`,
            priority: 'medium',
            actionType: 'query'
          });
          break;
        }
      }
    }

    // 如果还是没有，添加默认功能点
    if (features.length === 0) {
      features.push({
        name: '需求理解',
        description: requirement,
        priority: 'medium',
        actionType: 'query'
      });
    }

    // 去重
    const uniqueFeatures = [];
    const seen = new Set();
    for (const f of features) {
      if (!seen.has(f.name)) {
        seen.add(f.name);
        uniqueFeatures.push(f);
      }
    }

    return uniqueFeatures.slice(0, this.options.maxFeatures);
  }

  /**
   * 生成功能描述
   */
  generateFeatureDescription(actionType, entity, requirement) {
    const actionMap = {
      'create': `创建${entity || '数据'}`,
      'query': `查询${entity || '数据'}`,
      'report': `生成${entity || '数据'}报表`,
      'update': `更新${entity || '数据'}`,
      'delete': `删除${entity || '数据'}`,
      'approve': `审批${entity || '单据'}`,
      'notify': `通知相关人员`,
      'calculate': `计算${entity || '数据'}`,
      'import': `导入${entity || '数据'}`,
      'submit': `提交${entity || '数据'}`
    };

    return actionMap[actionType] || `${actionType}${entity || '数据'}`;
  }

  /**
   * 确定优先级
   */
  determinePriority(actionType, entity) {
    // 核心操作优先级高
    if (['approve', 'delete'].includes(actionType)) return 'high';
    if (['create', 'update', 'report'].includes(actionType)) return 'medium';
    return 'low';
  }

  /**
   * 计算复杂度
   */
  calculateComplexity(requirement, features) {
    let score = 1;

    // 基于功能点数量
    score += Math.min(features.length * 0.5, 3);

    // 检测复杂业务关键词
    const complexKeywords = [
      '多选', '批量', '循环', '条件', '分支',
      '报表', '统计', '汇总', '计算',
      '工作流', '审批', '流转',
      '权限', '角色', '组织',
      '导入', '导出', '同步',
      '定时', '触发', '事件',
      '异常', '错误', '回滚'
    ];

    for (const keyword of complexKeywords) {
      if (requirement.toLowerCase().includes(keyword)) {
        score += 0.5;
      }
    }

    // 长度影响
    if (requirement.length > 50) score += 1;
    if (requirement.length > 100) score += 1;

    return Math.min(Math.round(score), 10);
  }

  /**
   * 提取关键词
   */
  extractKeywords(requirement) {
    const keywords = new Set();
    const normalized = requirement.toLowerCase();

    // 从业务实体中提取
    for (const entity of Object.keys(BUSINESS_ENTITIES)) {
      if (normalized.includes(entity)) {
        keywords.add(entity);
      }
    }

    // 从业务动作中提取
    for (const action of Object.keys(BUSINESS_ACTIONS)) {
      if (normalized.includes(action)) {
        keywords.add(action);
      }
    }

    // 提取数字（可能表示数量、金额等）
    const numbers = requirement.match(/\d+/g);
    if (numbers) {
      numbers.forEach(n => keywords.add(n));
    }

    return Array.from(keywords);
  }

  /**
   * 生成需求摘要
   */
  generateSummary(requirement, features) {
    if (features.length === 0) {
      return requirement;
    }

    const actionCount = features.length;
    const priorities = features.map(f => f.priority);
    const highPriority = priorities.filter(p => p === 'high').length;

    return `该需求包含 ${actionCount} 个功能点，其中 ${highPriority} 个高优先级。主要操作：${features.map(f => f.name).join('、')}。`;
  }

  /**
   * 推荐 SDK 类
   * @param {AnalysisResult} analysis - 分析结果
   * @returns {SDKRecommendation[]} SDK 推荐列表
   */
  async recommendSDK(analysis) {
    const recommendations = [];
    const seen = new Set();

    // 基于功能动作推荐
    for (const feature of analysis.features) {
      const actionType = this.getActionType(feature.name);

      if (SDK_MAPPING[actionType]) {
        for (const className of SDK_MAPPING[actionType]) {
          if (!seen.has(className)) {
            seen.add(className);
            recommendations.push({
              className,
              module: this.getModule(className),
              usage: this.getUsage(className),
              confidence: this.calculateConfidence(feature.priority, actionType)
            });
          }
        }
      }
    }

    // 添加核心类作为兜底
    for (const coreClass of CORE_CLASSES) {
      if (!seen.has(coreClass.className)) {
        seen.add(coreClass.className);
        recommendations.push({
          ...coreClass,
          confidence: 0.3 // 兜底推荐置信度较低
        });
      }
    }

    // 按置信度排序
    recommendations.sort((a, b) => b.confidence - a.confidence);

    return recommendations.slice(0, 10);
  }

  /**
   * 获取动作类型
   */
  getActionType(featureName) {
    for (const [action, type] of Object.entries(BUSINESS_ACTIONS)) {
      if (featureName.includes(action)) {
        return type;
      }
    }
    return 'query'; // 默认查询
  }

  /**
   * 获取模块
   */
  getModule(className) {
    const moduleMap = {
      'DynamicObject': '核心框架',
      'BusinessDataServiceHelper': '核心框架',
      'WorkflowServiceHelper': '核心框架',
      'QueryServiceHelper': '核心框架',
      'MetadataServiceHelper': '核心框架',
      'PermissionServiceHelper': '核心框架',
      'PrintServiceHelper': '核心框架',
      'TimeServiceHelper': '核心框架',
    };
    return moduleMap[className] || '核心框架';
  }

  /**
   * 获取用途说明
   */
  getUsage(className) {
    const usageMap = {
      'DynamicObject': '动态业务对象，用于存储和操作业务数据',
      'BusinessDataServiceHelper': '业务数据服务，帮助类，用于 CRUD 操作',
      'WorkflowServiceHelper': '工作流服务，处理审批、流转等流程',
      'QueryServiceHelper': '查询服务，构建查询条件和过滤数据',
      'MetadataServiceHelper': '元数据服务，获取实体结构信息',
      'PermissionServiceHelper': '权限服务，检查和设置数据权限',
      'PrintServiceHelper': '打印服务，生成报表和打印输出',
      'TimeServiceHelper': '时间服务，处理日期和时间计算',
    };
    return usageMap[className] || '业务数据处理';
  }

  /**
   * 计算置信度
   */
  calculateConfidence(priority, actionType) {
    let base = 0.5;
    if (priority === 'high') base += 0.3;
    if (priority === 'medium') base += 0.1;

    // 特定动作的加成
    const actionBonus = {
      'create': 0.1,
      'query': 0.05,
      'update': 0.1,
      'approve': 0.2,
      'calculate': 0.15
    };

    return Math.min(base + (actionBonus[actionType] || 0), 1);
  }

  /**
   * 生成实现思路
   * @param {AnalysisResult} analysis - 分析结果
   * @returns {ImplementationGuide} 实现指南
   */
  generateImplementation(analysis) {
    const steps = [];
    const codeExamples = [];

    // 生成步骤
    let stepOrder = 1;

    // 步骤 1: 环境准备
    steps.push({
      order: stepOrder++,
      title: '环境准备',
      description: '确认开发环境，引入必要的 SDK 包',
      code: this.generateCodeTemplate('setup', analysis)
    });

    // 步骤 2: 数据准备（根据功能）
    if (analysis.features.some(f => f.name.includes('创建') || f.name.includes('新增'))) {
      steps.push({
        order: stepOrder++,
        title: '创建业务数据',
        description: '使用 BusinessDataServiceHelper 创建业务对象',
        code: this.generateCodeTemplate('create', analysis)
      });
    }

    // 步骤 3: 数据查询（根据功能）
    if (analysis.features.some(f => f.name.includes('查询') || f.name.includes('列表'))) {
      steps.push({
        order: stepOrder++,
        title: '查询业务数据',
        description: '使用 QueryServiceHelper 构建查询条件',
        code: this.generateCodeTemplate('query', analysis)
      });
    }

    // 步骤 4: 数据更新（根据功能）
    if (analysis.features.some(f => f.name.includes('修改') || f.name.includes('更新'))) {
      steps.push({
        order: stepOrder++,
        title: '更新业务数据',
        description: '修改 DynamicObject 的属性并保存',
        code: this.generateCodeTemplate('update', analysis)
      });
    }

    // 步骤 5: 工作流（根据功能）
    if (analysis.features.some(f => f.name.includes('审批') || f.name.includes('审核'))) {
      steps.push({
        order: stepOrder++,
        title: '处理工作流',
        description: '使用 WorkflowServiceHelper 处理审批流程',
        code: this.generateCodeTemplate('workflow', analysis)
      });
    }

    // 步骤 6: 权限检查
    if (analysis.complexity > 5) {
      steps.push({
        order: stepOrder++,
        title: '权限检查',
        description: '使用 PermissionServiceHelper 检查操作权限',
        code: this.generateCodeTemplate('permission', analysis)
      });
    }

    // 收集代码示例
    for (const step of steps) {
      if (step.code) {
        codeExamples.push({
          language: 'java',
          code: step.code,
          description: step.title
        });
      }
    }

    return { steps, codeExamples };
  }

  /**
   * 生成代码模板
   */
  generateCodeTemplate(type, analysis) {
    const templates = {
      setup: `// 引入必要的 SDK 类
import kingdee.bos.*;
import kingdee.bos.service.*;`,

      create: `// 创建业务数据
BusinessDataServiceHelper helper = new BusinessDataServiceHelper();
DynamicObject bill = new DynamicObject("YourBillId");
bill.set("FieldName", value);
helper.save(bill);`,

      query: `// 查询业务数据
QueryServiceHelper queryHelper = new QueryServiceHelper();
StringBuilder sql = new StringBuilder();
sql.append("select * from T_YourTable where FDocumentStatus = 'A'");
DynamicObjectCollection result = queryHelper.query(sql.toString());`,

      update: `// 更新业务数据
DynamicObject bill = helper.getObjectById("YourBillId", id);
bill.set("FieldName", newValue);
helper.update(bill);`,

      workflow: `// 触发工作流
WorkflowServiceHelper workflowHelper = new WorkflowServiceHelper();
String workflowId = "YourWorkflowId";
workflowHelper.startProcess(bill, workflowId);`,

      permission: `// 权限检查
PermissionServiceHelper permHelper = new PermissionServiceHelper();
boolean hasPermission = permHelper.checkPermission(
    currentUser,
    "YourObjectId",
    "ActionName"
);`
    };

    return templates[type] || '// 实现代码';
  }
}

// ==================== 导出 ====================

module.exports = {
  RequirementAnalyzer,
  /**
   * 桥接函数：将分析结果转换为 SDK 研究格式
   * 使 analyze 命令的输出与 research 命令格式兼容
   * @param {AnalysisResult} analysis - 分析结果
   * @param {SDKRecommendation[]} sdkRecommendations - SDK 推荐
   * @returns {Object} SDK 研究兼容格式
   */
  bridgeToSdkResearch(analysis, sdkRecommendations) {
    return {
      phase: 'Requirement Analysis',
      keywords: analysis.keywords,
      recommendations: sdkRecommendations.map(r => ({
        className: r.className,
        module: r.module,
        methods: [],
        usage: r.usage,
        relevance: `置信度: ${(r.confidence * 100).toFixed(0)}%`
      })),
      features: analysis.features,
      complexity: analysis.complexity,
      generated_at: new Date().toISOString()
    };
  }
};

// 如果直接运行，进行测试
if (require.main === module) {
  const analyzer = new RequirementAnalyzer();

  // 测试用例
  const testCases = [
    '创建销售订单并提交审批',
    '查询客户列表并显示',
    '生产工单计划变更需求',
    '订单交货及时率报表',
    '修改员工信息并保存',
  ];

  console.log('=== 需求分析器测试 ===\n');

  for (const req of testCases) {
    console.log(`需求: ${req}`);
    console.log('-'.repeat(40));

    const result = analyzer.analyze(req);
    console.log(`复杂度: ${result.complexity}/10`);
    console.log(`功能点: ${result.features.map(f => f.name).join(', ')}`);
    console.log(`关键词: ${result.keywords.join(', ')}`);
    console.log('');
  }
}