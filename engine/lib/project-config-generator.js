/**
 * 项目配置生成器
 * 根据扫描和学习结果生成项目配置文件
 */

class ProjectConfigGenerator {
  /**
   * 生成项目配置
   * @param {object} scanResult - 扫描结果
   * @param {object} styleResult - 风格学习结果
   * @returns {object} 配置文件列表
   */
  generateProjectConfig(scanResult, styleResult) {
    console.log('生成项目配置...');

    const configs = {
      'project-context.json': this.generateProjectContext(scanResult),
      'code-style.json': this.generateCodeStyle(styleResult),
      'constants-index.json': this.generateConstantsIndex(scanResult.constants),
      'utils-index.json': this.generateUtilsIndex(scanResult.utils)
    };

    console.log('✓ 项目配置生成完成');
    return configs;
  }

  /**
   * 生成项目上下文配置
   */
  generateProjectContext(scanResult) {
    return {
      projectPath: scanResult.path,
      scanTime: new Date().toISOString(),
      structure: {
        type: scanResult.structure.type,
        sourceDir: scanResult.structure.sourceDir,
        hasGradle: scanResult.structure.hasGradle,
        hasMaven: scanResult.structure.hasMaven
      },
      modules: scanResult.modules.map(module => ({
        name: module.name,
        purpose: module.purpose,
        javaFileCount: module.javaFileCount
      })),
      plugins: scanResult.plugins,
      entities: scanResult.entities,
      domain: this.inferDomain(scanResult.modules),
      statistics: {
        totalModules: scanResult.modules.length,
        totalPlugins: Object.values(scanResult.plugins).reduce((a, b) => a + b, 0),
        totalConstants: scanResult.constants.length,
        totalUtils: scanResult.utils.length,
        totalEntities: scanResult.entities.length
      }
    };
  }

  /**
   * 推断项目领域
   */
  inferDomain(modules) {
    const domainKeywords = {
      '供应链': ['scm', 'scmc', 'supply', 'chain'],
      '财务': ['fin', 'finance', 'accounting'],
      '人力资源': ['hr', 'hrm', 'human', 'resource'],
      '生产制造': ['mfg', 'manufacturing', 'pom', 'production'],
      '销售': ['sales', 'crm', 'customer'],
      '采购': ['procurement', 'purchase'],
      '库存': ['inventory', 'stock', 'warehouse'],
      '项目': ['project', 'pm']
    };

    for (const module of modules) {
      const moduleName = module.name.toLowerCase();

      for (const [domain, keywords] of Object.entries(domainKeywords)) {
        if (keywords.some(keyword => moduleName.includes(keyword))) {
          return domain;
        }
      }
    }

    return '通用业务';
  }

  /**
   * 生成代码风格配置
   */
  generateCodeStyle(styleResult) {
    return {
      naming: {
        classNaming: {
          pattern: styleResult.naming.classNaming.pattern,
          commonPrefixes: Object.entries(styleResult.naming.classNaming.prefixes)
            .filter(([_, count]) => count > 1)
            .map(([prefix, count]) => ({ prefix, count })),
          commonSuffixes: Object.entries(styleResult.naming.classNaming.suffixes)
            .filter(([_, count]) => count > 1)
            .map(([suffix, count]) => ({ suffix, count }))
        },
        methodNaming: {
          pattern: styleResult.naming.methodNaming.pattern,
          examples: styleResult.naming.methodNaming.examples.slice(0, 5)
        },
        constantNaming: {
          pattern: styleResult.naming.constantNaming.pattern,
          examples: styleResult.naming.constantNaming.examples.slice(0, 5)
        }
      },
      comments: {
        useJavaDoc: styleResult.comments.useJavaDoc,
        language: styleResult.comments.language,
        detailLevel: styleResult.comments.detailLevel,
        includeDate: styleResult.comments.includeDate,
        includeAuthor: styleResult.comments.includeAuthor,
        guidelines: this.generateCommentGuidelines(styleResult.comments)
      },
      exceptions: {
        useKDBizException: styleResult.exceptions.useKDBizException,
        logException: styleResult.exceptions.logException,
        rethrowException: styleResult.exceptions.rethrowException,
        guidelines: this.generateExceptionGuidelines(styleResult.exceptions)
      },
      logging: {
        useLogger: styleResult.logging.useLogger,
        levels: Object.entries(styleResult.logging.levels)
          .filter(([_, used]) => used)
          .map(([level]) => level),
        logPerformance: styleResult.logging.logPerformance,
        guidelines: this.generateLoggingGuidelines(styleResult.logging)
      },
      imports: {
        commonImports: styleResult.imports.commonImports.slice(0, 10),
        useWildcard: styleResult.imports.useWildcard,
        guidelines: this.generateImportGuidelines(styleResult.imports)
      }
    };
  }

  /**
   * 生成注释指南
   */
  generateCommentGuidelines(commentStyle) {
    const guidelines = [];

    if (commentStyle.useJavaDoc) {
      guidelines.push('使用 JavaDoc 格式编写注释');
    }

    if (commentStyle.language === 'chinese') {
      guidelines.push('注释使用中文');
    } else {
      guidelines.push('注释使用英文');
    }

    if (commentStyle.detailLevel === 'detailed') {
      guidelines.push('注释应详细说明功能和参数');
    } else if (commentStyle.detailLevel === 'brief') {
      guidelines.push('注释应简洁明了');
    }

    if (commentStyle.includeDate) {
      guidelines.push('注释中包含日期信息');
    }

    if (commentStyle.includeAuthor) {
      guidelines.push('注释中包含作者信息');
    }

    return guidelines;
  }

  /**
   * 生成异常处理指南
   */
  generateExceptionGuidelines(exceptionStyle) {
    const guidelines = [];

    if (exceptionStyle.useKDBizException) {
      guidelines.push('使用 KDBizException 抛出业务异常');
    }

    if (exceptionStyle.logException) {
      guidelines.push('捕获异常时记录日志');
    }

    if (exceptionStyle.rethrowException) {
      guidelines.push('考虑重新抛出异常');
    }

    return guidelines;
  }

  /**
   * 生成日志记录指南
   */
  generateLoggingGuidelines(loggingStyle) {
    const guidelines = [];

    if (loggingStyle.useLogger) {
      guidelines.push('使用 Logger 记录日志');
    }

    const levels = Object.entries(loggingStyle.levels)
      .filter(([_, used]) => used)
      .map(([level]) => level);

    if (levels.length > 0) {
      guidelines.push(`支持的日志级别: ${levels.join(', ')}`);
    }

    if (loggingStyle.logPerformance) {
      guidelines.push('记录性能相关日志');
    }

    return guidelines;
  }

  /**
   * 生成导入指南
   */
  generateImportGuidelines(importStyle) {
    const guidelines = [];

    if (importStyle.useWildcard) {
      guidelines.push('允许使用通配符导入');
    } else {
      guidelines.push('避免使用通配符导入，应明确导入具体类');
    }

    if (importStyle.commonImports.length > 0) {
      guidelines.push(`常用导入包: ${importStyle.commonImports.slice(0, 5).map(i => i.path).join(', ')}`);
    }

    return guidelines;
  }

  /**
   * 生成常量索引
   */
  generateConstantsIndex(constants) {
    const index = {
      total: constants.length,
      classes: constants.map(constant => ({
        className: constant.className,
        filePath: this.normalizePath(constant.filePath),
        fieldCount: constant.fields.length,
        fields: constant.fields.slice(0, 50) // 限制字段数量
      }))
    };

    return index;
  }

  /**
   * 生成工具类索引
   */
  generateUtilsIndex(utils) {
    const index = {
      total: utils.length,
      classes: utils.map(util => ({
        className: util.className,
        filePath: this.normalizePath(util.filePath),
        methodCount: util.methods.length,
        methods: util.methods.slice(0, 20) // 限制方法数量
      }))
    };

    return index;
  }

  /**
   * 规范化路径（转换为相对路径）
   */
  normalizePath(absolutePath) {
    // 提取关键部分
    const parts = absolutePath.split(/[\\/]/);
    const codeIndex = parts.findIndex(p => p === 'code');

    if (codeIndex >= 0 && codeIndex < parts.length - 1) {
      return parts.slice(codeIndex).join('/');
    }

    return parts.slice(-5).join('/');
  }
}

module.exports = ProjectConfigGenerator;
