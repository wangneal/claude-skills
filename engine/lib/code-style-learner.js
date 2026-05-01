/**
 * 代码风格学习器
 * 学习项目的编码风格和最佳实践
 */

const fs = require('fs');
const path = require('path');

class CodeStyleLearner {
  constructor() {
    this.namingPatterns = {
      classPrefixes: ['Abstract', 'Base', 'I'],
      classSuffixes: ['Impl', 'Helper', 'Utils', 'Service', 'Plugin'],
      constantPatterns: ['UPPER_SNAKE_CASE', 'camelCase'],
      methodPatterns: ['camelCase', 'snake_case']
    };
  }

  /**
   * 学习项目代码风格
   * @param {string} projectPath - 项目路径
   * @returns {object} 代码风格定义
   */
  learnCodeStyle(projectPath) {
    console.log(`学习项目代码风格: ${projectPath}`);

    const javaFiles = this.findJavaFiles(projectPath);
    const sampleFiles = javaFiles.slice(0, 20); // 采样前 20 个文件

    const styleResult = {
      naming: this.learnNamingConventions(sampleFiles),
      comments: this.learnCommentStyle(sampleFiles),
      exceptions: this.learnExceptionHandling(sampleFiles),
      logging: this.learnLoggingStyle(sampleFiles),
      imports: this.learnImportPatterns(sampleFiles)
    };

    console.log(`✓ 代码风格学习完成`);
    return styleResult;
  }

  /**
   * 学习命名规范
   */
  learnNamingConventions(javaFiles) {
    const naming = {
      classNaming: {
        prefixes: {},
        suffixes: {},
        pattern: 'PascalCase'
      },
      methodNaming: {
        pattern: 'camelCase',
        examples: []
      },
      constantNaming: {
        pattern: 'UPPER_SNAKE_CASE',
        examples: []
      },
      variableNaming: {
        pattern: 'camelCase',
        examples: []
      }
    };

    const prefixes = {};
    const suffixes = {};
    const methodNames = [];
    const constantNames = [];

    for (const file of javaFiles) {
      try {
        const content = fs.readFileSync(file, 'utf-8');
        const className = path.basename(file, '.java');

        // 分析类名前缀
        for (const prefix of this.namingPatterns.classPrefixes) {
          if (className.startsWith(prefix)) {
            prefixes[prefix] = (prefixes[prefix] || 0) + 1;
          }
        }

        // 分析类名后缀
        for (const suffix of this.namingPatterns.classSuffixes) {
          if (className.endsWith(suffix)) {
            suffixes[suffix] = (suffixes[suffix] || 0) + 1;
          }
        }

        // 分析方法名
        const methodMatches = content.matchAll(/public\s+(?:static\s+)?\w+\s+(\w+)\s*\(/g);
        for (const match of methodMatches) {
          methodNames.push(match[1]);
        }

        // 分析常量名
        const constantMatches = content.matchAll(/public\s+static\s+final\s+\w+\s+(\w+)/g);
        for (const match of constantMatches) {
          constantNames.push(match[1]);
        }
      } catch (err) {
        // 跳过无法读取的文件
      }
    }

    naming.classNaming.prefixes = prefixes;
    naming.classNaming.suffixes = suffixes;

    // 采样方法名示例
    naming.methodNaming.examples = methodNames.slice(0, 10);

    // 采样常量名示例
    naming.constantNaming.examples = constantNames.slice(0, 10);

    return naming;
  }

  /**
   * 学习注释风格
   */
  learnCommentStyle(javaFiles) {
    const comments = {
      useJavaDoc: false,
      language: 'unknown',
      detailLevel: 'medium',
      includeDate: false,
      includeAuthor: false,
      examples: []
    };

    let javaDocCount = 0;
    let chineseCount = 0;
    let englishCount = 0;
    let dateCount = 0;
    let authorCount = 0;
    let totalCommentLines = 0;

    for (const file of javaFiles) {
      try {
        const content = fs.readFileSync(file, 'utf-8');

        // 检查 JavaDoc 使用
        const javaDocMatches = content.matchAll(/\/\*\*[\s\S]*?\*\//g);
        for (const match of javaDocMatches) {
          javaDocCount++;
          const comment = match[0];

          // 检查语言
          if (/[\u4e00-\u9fa5]/.test(comment)) {
            chineseCount++;
          } else {
            englishCount++;
          }

          // 检查是否包含日期
          if (/\d{4}[-/年]\d{1,2}[-/月]\d{1,2}/.test(comment)) {
            dateCount++;
          }

          // 检查是否包含作者
          if (/@author|作者/.test(comment)) {
            authorCount++;
          }

          // 统计注释行数
          totalCommentLines += comment.split('\n').length;
        }

        // 采集示例注释
        if (comments.examples.length < 5 && javaDocCount > 0) {
          const firstJavaDoc = content.match(/\/\*\*[\s\S]*?\*\//);
          if (firstJavaDoc) {
            comments.examples.push(firstJavaDoc[0].substring(0, 200));
          }
        }
      } catch (err) {
        // 跳过无法读取的文件
      }
    }

    comments.useJavaDoc = javaDocCount > 0;
    comments.language = chineseCount > englishCount ? 'chinese' : 'english';
    comments.includeDate = dateCount > javaDocCount * 0.3;
    comments.includeAuthor = authorCount > javaDocCount * 0.3;

    // 判断详细程度
    const avgLines = javaDocCount > 0 ? totalCommentLines / javaDocCount : 0;
    comments.detailLevel = avgLines > 10 ? 'detailed' : avgLines > 5 ? 'medium' : 'brief';

    return comments;
  }

  /**
   * 学习异常处理风格
   */
  learnExceptionHandling(javaFiles) {
    const exceptions = {
      useKDBizException: false,
      logException: false,
      rethrowException: false,
      messageFormat: 'standard',
      examples: []
    };

    let kdBizExceptionCount = 0;
    let logExceptionCount = 0;
    let rethrowCount = 0;

    for (const file of javaFiles) {
      try {
        const content = fs.readFileSync(file, 'utf-8');

        // 检查 KDBizException 使用
        if (content.includes('KDBizException')) {
          kdBizExceptionCount++;
        }

        // 检查异常日志记录
        const catchMatches = content.matchAll(/catch\s*\([^)]+\)\s*\{([^}]+)\}/g);
        for (const match of catchMatches) {
          const catchBlock = match[1];

          if (catchBlock.includes('logger') || catchBlock.includes('Logger')) {
            logExceptionCount++;
          }

          if (catchBlock.includes('throw')) {
            rethrowCount++;
          }
        }

        // 采集异常处理示例
        const exceptionExample = content.match(/catch\s*\([^)]+\)\s*\{[\s\S]{0,200}\}/);
        if (exceptionExample && exceptions.examples.length < 3) {
          exceptions.examples.push(exceptionExample[0]);
        }
      } catch (err) {
        // 跳过无法读取的文件
      }
    }

    exceptions.useKDBizException = kdBizExceptionCount > javaFiles.length * 0.1;
    exceptions.logException = logExceptionCount > 0;
    exceptions.rethrowException = rethrowCount > 0;

    return exceptions;
  }

  /**
   * 学习日志记录风格
   */
  learnLoggingStyle(javaFiles) {
    const logging = {
      useLogger: false,
      levels: {
        INFO: false,
        DEBUG: false,
        WARN: false,
        ERROR: false
      },
      logPerformance: false,
      messageFormat: 'standard',
      examples: []
    };

    let loggerCount = 0;
    let performanceLogCount = 0;

    for (const file of javaFiles) {
      try {
        const content = fs.readFileSync(file, 'utf-8');

        // 检查 Logger 使用
        if (content.includes('Logger') || content.includes('logger')) {
          loggerCount++;
        }

        // 检查日志级别
        if (content.includes('logger.info') || content.includes('log.info')) {
          logging.levels.INFO = true;
        }
        if (content.includes('logger.debug') || content.includes('log.debug')) {
          logging.levels.DEBUG = true;
        }
        if (content.includes('logger.warn') || content.includes('log.warn')) {
          logging.levels.WARN = true;
        }
        if (content.includes('logger.error') || content.includes('log.error')) {
          logging.levels.ERROR = true;
        }

        // 检查性能日志
        if (content.includes('性能') || content.includes('performance') ||
            content.includes('耗时') || content.includes('elapsed')) {
          performanceLogCount++;
        }

        // 采集日志示例
        const logExample = content.match(/logger\.\w+\([^)]+\)/);
        if (logExample && logging.examples.length < 5) {
          logging.examples.push(logExample[0]);
        }
      } catch (err) {
        // 跳过无法读取的文件
      }
    }

    logging.useLogger = loggerCount > javaFiles.length * 0.1;
    logging.logPerformance = performanceLogCount > 0;

    return logging;
  }

  /**
   * 学习导入模式
   */
  learnImportPatterns(javaFiles) {
    const imports = {
      commonImports: [],
      importOrder: [],
      useWildcard: false,
      examples: []
    };

    const importCounts = {};
    let wildcardCount = 0;

    for (const file of javaFiles) {
      try {
        const content = fs.readFileSync(file, 'utf-8');

        // 提取导入语句
        const importMatches = content.matchAll(/import\s+([^;]+);/g);
        const fileImports = [];

        for (const match of importMatches) {
          const importPath = match[1];
          fileImports.push(importPath);

          // 统计常用导入
          importCounts[importPath] = (importCounts[importPath] || 0) + 1;

          // 检查通配符导入
          if (importPath.endsWith('.*')) {
            wildcardCount++;
          }
        }

        // 采集导入示例
        if (imports.examples.length < 3 && fileImports.length > 0) {
          imports.examples.push(fileImports.slice(0, 10));
        }
      } catch (err) {
        // 跳过无法读取的文件
      }
    }

    // 提取最常用的导入
    const sortedImports = Object.entries(importCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 20);

    imports.commonImports = sortedImports.map(([importPath, count]) => ({
      path: importPath,
      count: count
    }));

    imports.useWildcard = wildcardCount > javaFiles.length * 0.1;

    return imports;
  }

  /**
   * 查找 Java 文件
   */
  findJavaFiles(projectPath) {
    const javaFiles = [];

    if (!fs.existsSync(projectPath)) {
      return javaFiles;
    }

    const scan = (currentPath) => {
      try {
        const entries = fs.readdirSync(currentPath, { withFileTypes: true });

        for (const entry of entries) {
          const fullPath = path.join(currentPath, entry.name);

          if (entry.isDirectory()) {
            // 跳过构建目录和隐藏目录
            if (!entry.name.startsWith('.') &&
                entry.name !== 'build' &&
                entry.name !== 'target') {
              scan(fullPath);
            }
          } else if (entry.name.endsWith('.java')) {
            javaFiles.push(fullPath);
          }
        }
      } catch (err) {
        // 跳过无法访问的目录
      }
    };

    scan(projectPath);
    return javaFiles;
  }
}

module.exports = CodeStyleLearner;
