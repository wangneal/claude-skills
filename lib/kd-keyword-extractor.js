/**
 * 关键词提取器 - 从中文需求描述中提取SDK相关关键词
 *
 * 功能：
 * 1. 提取英文单词
 * 2. 映射中文动词到SDK类
 * 3. 提取领域关键词
 */

class KeywordExtractor {
  constructor() {
    // 中文动词 -> SDK类映射
    this.verbMapping = {
      // 工作流相关
      '启动': 'WorkflowServiceHelper',
      '提交': 'WorkflowServiceHelper',
      '审批': 'WorkflowServiceHelper',
      '工作流': 'WorkflowServiceHelper',

      // 数据操作相关
      '读取': 'DynamicObject',
      '设置': 'DynamicObject',
      '获取': 'DynamicObject',
      '动态对象': 'DynamicObject',
      '实体': 'DynamicObject',

      // 查询相关
      '查询': 'QueryServiceHelper',
      '搜索': 'QueryServiceHelper',
      '过滤': 'QueryServiceHelper',

      // 保存删除相关
      '保存': 'BusinessDataServiceHelper',
      '删除': 'BusinessDataServiceHelper',
      '新增': 'BusinessDataServiceHelper',
      '修改': 'BusinessDataServiceHelper',
      '操作数据': 'BusinessDataServiceHelper',

      // 权限相关
      '检查权限': 'PermissionServiceHelper',
      '权限': 'PermissionServiceHelper',
      '授权': 'PermissionServiceHelper',

      // 用户相关
      '获取用户': 'UserServiceHelper',
      '用户': 'UserServiceHelper',
      '当前用户': 'UserServiceHelper',

      // 附件相关
      '附件': 'AttachmentServiceHelper',
      '上传': 'AttachmentServiceHelper',
      '下载': 'AttachmentServiceHelper',

      // 打印相关
      '打印': 'PrintServiceHelper',

      // 时间相关
      '时间': 'TimeServiceHelper',
      '日期': 'TimeServiceHelper'
    };

    // 领域词典（关键词 -> 相关SDK类）
    this.domainDictionary = {
      workflow: ['WorkflowServiceHelper', 'DynamicObject'],
      data: ['DynamicObject', 'DataEntityCollection', 'BusinessDataServiceHelper'],
      service: ['ServiceHelper', 'BusinessDataServiceHelper'],
      permission: ['PermissionServiceHelper'],
      user: ['UserServiceHelper'],
      query: ['QueryServiceHelper', 'DynamicObject'],
      attachment: ['AttachmentServiceHelper'],
      print: ['PrintServiceHelper']
    };

    // SDK常见关键词模式
    this.sdkPatterns = [
      'DynamicObject', 'Workflow', 'Permission', 'Service', 'Helper',
      'Field', 'Entity', 'Form', 'Bill', 'Query', 'Report', 'Collection',
      'Business', 'Data', 'Validate', 'Save', 'Create', 'Update', 'Delete'
    ];
  }

  /**
   * 从需求描述中提取关键词
   * @param {string} taskDescription - 任务描述
   * @returns {string[]} 关键词列表
   */
  extract(taskDescription) {
    const keywords = [];

    // 1. 提取英文单词
    const englishWords = this.extractEnglishWords(taskDescription);
    keywords.push(...englishWords);

    // 2. 提取中文动词（映射到SDK类）
    const chineseVerbs = this.extractChineseVerbs(taskDescription);
    keywords.push(...chineseVerbs);

    // 3. 提取领域关键词
    const domainKeywords = this.extractDomainKeywords(taskDescription);
    keywords.push(...domainKeywords);

    // 4. 提取SDK常见关键词模式
    const sdkKeywords = this.extractSDKPatterns(taskDescription);
    keywords.push(...sdkKeywords);

    // 去重
    return [...new Set(keywords)];
  }

  /**
   * 提取英文单词
   * @param {string} text - 文本
   * @returns {string[]} 英文单词列表（首字母大写）
   */
  extractEnglishWords(text) {
    const englishWords = text.match(/[A-Za-z][a-zA-Z0-9]*/g) || [];

    const keywords = [];
    englishWords.forEach(word => {
      const capitalized = word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
      if (capitalized.length > 2 && !keywords.includes(capitalized)) {
        keywords.push(capitalized);
      }
    });

    return keywords;
  }

  /**
   * 提取中文动词并映射到SDK类
   * @param {string} text - 文本
   * @returns {string[]} SDK类名列表
   */
  extractChineseVerbs(text) {
    const classes = [];

    for (const [verb, className] of Object.entries(this.verbMapping)) {
      if (text.includes(verb)) {
        if (!classes.includes(className)) {
          classes.push(className);
        }
      }
    }

    return classes;
  }

  /**
   * 提取领域关键词
   * @param {string} text - 文本
   * @returns {string[]} SDK类名列表
   */
  extractDomainKeywords(text) {
    const classes = [];
    const lowerText = text.toLowerCase();

    for (const [domain, classNames] of Object.entries(this.domainDictionary)) {
      if (lowerText.includes(domain)) {
        classNames.forEach(className => {
          if (!classes.includes(className)) {
            classes.push(className);
          }
        });
      }
    }

    return classes;
  }

  /**
   * 提取SDK常见关键词模式
   * @param {string} text - 文本
   * @returns {string[]} SDK关键词列表
   */
  extractSDKPatterns(text) {
    const keywords = [];

    this.sdkPatterns.forEach(pattern => {
      if (text.toLowerCase().includes(pattern.toLowerCase())) {
        if (!keywords.includes(pattern)) {
          keywords.push(pattern);
        }
      }
    });

    return keywords;
  }

  /**
   * 分析任务描述并返回详细的关键词信息
   * @param {string} taskDescription - 任务描述
   * @returns {Object} 关键词分析结果
   */
  analyze(taskDescription) {
    const englishWords = this.extractEnglishWords(taskDescription);
    const chineseVerbs = this.extractChineseVerbs(taskDescription);
    const domainKeywords = this.extractDomainKeywords(taskDescription);
    const sdkKeywords = this.extractSDKPatterns(taskDescription);

    return {
      taskDescription,
      keywords: this.extract(taskDescription),
      details: {
        englishWords,
        chineseVerbs,
        domainKeywords,
        sdkKeywords
      }
    };
  }
}

module.exports = new KeywordExtractor();

// 测试
if (require.main === module) {
  const extractor = module.exports;

  const testCases = [
    '启动工作流并提交审批',
    '读取DynamicObject字段值',
    '查询用户权限信息',
    '保存和删除数据',
    'develop workflow approval feature'
  ];

  testCases.forEach(task => {
    const result = extractor.analyze(task);
    console.log(`\n任务: ${task}`);
    console.log(`关键词: ${result.keywords.join(', ')}`);
    console.log(`详情:`);
    console.log(`  - 英文单词: ${result.details.englishWords.join(', ') || '无'}`);
    console.log(`  - 中文动词: ${result.details.chineseVerbs.join(', ') || '无'}`);
    console.log(`  - 领域关键词: ${result.details.domainKeywords.join(', ') || '无'}`);
    console.log(`  - SDK模式: ${result.details.sdkKeywords.join(', ') || '无'}`);
  });
}
