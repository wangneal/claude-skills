/**
 * 代码模式扫描器 - 从金蝶项目中提取代码模式和最佳实践
 *
 * 功能：
 * 1. 扫描 Java 项目结构
 * 2. 提取代码模式（SDK 使用、异常处理、日志）
 * 3. 识别常量类使用规范
 * 4. 提取 SDK 调用模式
 */

const fs = require('fs');
const path = require('path');

class CodePatternScanner {
  constructor() {
    this.patterns = {
      plugins: {},
      sdk: {},
      constants: {},
      exceptions: [],
      logging: []
    };

    // 插件类型识别
    this.pluginPatterns = {
      'FormPlugin': /extends\s+\w*FormPlugin/,
      'WorkflowPlugin': /extends\s+\w*WorkflowPlugin/,
      'ReportPlugin': /extends\s+AbstractReportListDataPlugin|extends\s+AbstractReportFormPlugin/,
      'OperationPlugin': /extends\s+\w*OperationPlugin/,
      'BillPlugin': /extends\s+\w*BillPlugin/
    };

    // SDK 类识别
    this.sdkClasses = [
      'DynamicObject',
      'DynamicObjectCollection',
      'QueryServiceHelper',
      'BusinessDataServiceHelper',
      'WorkflowServiceHelper',
      'PermissionServiceHelper',
      'UserServiceHelper',
      'QFilter',
      'QCP',
      'Algo',
      'DataSetBuilder',
      'RowMeta',
      'Field',
      'DataType'
    ];
  }

  /**
   * 扫描项目结构
   */
  scanProjectStructure(projectPath) {
    const result = {
      totalFiles: 0,
      pluginTypes: {},
      directory: projectPath
    };

    // 支持 src/main/java 或 code/ 目录
    let srcPath = path.join(projectPath, 'src/main/java');

    if (!fs.existsSync(srcPath)) {
      srcPath = path.join(projectPath, 'code');
    }

    if (!fs.existsSync(srcPath)) {
      console.log(`警告: 找不到源代码目录 (${projectPath})`);
      return result;
    }

    const javaFiles = this.findJavaFiles(srcPath);
    result.totalFiles = javaFiles.length;

    // 统计插件类型
    javaFiles.forEach(file => {
      const content = fs.readFileSync(file, 'utf-8');

      for (const [type, pattern] of Object.entries(this.pluginPatterns)) {
        if (pattern.test(content)) {
          result.pluginTypes[type] = (result.pluginTypes[type] || 0) + 1;
        }
      }
    });

    return result;
  }

  /**
   * 提取代码模式
   */
  extractPatterns(javaFile) {
    const content = fs.readFileSync(javaFile, 'utf-8');
    const patterns = {
      imports: [],
      classHierarchy: null,
      methods: [],
      exceptions: [],
      logging: []
    };

    // 提取 import 语句
    const importRegex = /^import\s+([\w.]+);/gm;
    let match;
    while ((match = importRegex.exec(content)) !== null) {
      patterns.imports.push(match[1]);
    }

    // 提取类继承
    const classRegex = /class\s+(\w+)\s+extends\s+(\w+)/;
    const classMatch = content.match(classRegex);
    if (classMatch) {
      patterns.classHierarchy = {
        className: classMatch[1],
        parentClass: classMatch[2]
      };
    }

    // 提取异常处理
    const tryCatchRegex = /try\s*\{[\s\S]*?\}\s*catch\s*\(([^)]+)\)\s*\{([^}]*)\}/g;
    while ((match = tryCatchRegex.exec(content)) !== null) {
      patterns.exceptions.push({
        exceptionType: match[1],
        handler: match[2].trim()
      });
    }

    // 提取日志记录
    const logRegex = /(Logger|Log)\.(\w+)\s*\(([^)]*)\)/g;
    while ((match = logRegex.exec(content)) !== null) {
      patterns.logging.push({
        logger: match[1],
        level: match[2],
        message: match[3]
      });
    }

    return patterns;
  }

  /**
   * 识别常量类使用
   */
  analyzeConstantUsage(javaFile) {
    const content = fs.readFileSync(javaFile, 'utf-8');
    const constants = {};

    // 识别常量引用（如 BaseCon.BILL_STATUS）
    const constantRegex = /(\w+Con(?:s|stant)?)\.(\w+)/g;
    let match;

    while ((match = constantRegex.exec(content)) !== null) {
      const className = match[1];
      const fieldName = match[2];

      if (!constants[className]) {
        constants[className] = {
          usage: 0,
          fields: new Set()
        };
      }

      constants[className].usage++;
      constants[className].fields.add(fieldName);
    }

    // 转换 Set 为数组
    for (const className in constants) {
      constants[className].fields = Array.from(constants[className].fields);
    }

    return constants;
  }

  /**
   * 提取 SDK 调用模式
   */
  extractSDKPatterns(javaFile) {
    const content = fs.readFileSync(javaFile, 'utf-8');
    const sdkPatterns = {};

    // DynamicObject 使用方式
    if (content.includes('DynamicObject')) {
      const getMethods = content.match(/\.get(?:Long|String|Int|BigDecimal|Date)\s*\(/g) || [];
      const setMethods = content.match(/\.set\s*\(/g) || [];

      sdkPatterns['DynamicObject'] = {
        frequency: (content.match(/DynamicObject/g) || []).length,
        commonMethods: {
          get: getMethods.map(m => m.trim()),
          set: setMethods.length
        }
      };
    }

    // QFilter 构建方式
    if (content.includes('QFilter')) {
      const filterPatterns = content.match(/new\s+QFilter\s*\([^)]+\)/g) || [];
      sdkPatterns['QFilter'] = {
        frequency: filterPatterns.length,
        patterns: filterPatterns.slice(0, 5) // 只取前5个示例
      };
    }

    // Algo API 使用（报表插件）
    if (content.includes('Algo.create')) {
      const algoPatterns = content.match(/Algo\.create\s*\([^)]+\)/g) || [];
      sdkPatterns['Algo'] = {
        frequency: algoPatterns.length,
        patterns: algoPatterns
      };
    }

    return sdkPatterns;
  }

  /**
   * 递归查找所有 Java 文件
   */
  findJavaFiles(dirPath) {
    const javaFiles = [];

    if (!fs.existsSync(dirPath)) {
      return javaFiles;
    }

    const entries = fs.readdirSync(dirPath, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(dirPath, entry.name);

      if (entry.isDirectory()) {
        javaFiles.push(...this.findJavaFiles(fullPath));
      } else if (entry.isFile() && entry.name.endsWith('.java')) {
        javaFiles.push(fullPath);
      }
    }

    return javaFiles;
  }

  /**
   * 扫描整个项目
   */
  async scanProject(projectPath, projectName) {
    console.log(`\n🔍 扫描项目: ${projectName || projectPath}\n`);

    // 支持 src/main/java 或 code/ 目录
    let srcPath = path.join(projectPath, 'src/main/java');

    if (!fs.existsSync(srcPath)) {
      srcPath = path.join(projectPath, 'code');
    }

    if (!fs.existsSync(srcPath)) {
      console.log(`⚠️  找不到源代码目录: ${projectPath}`);
      return null;
    }

    const javaFiles = this.findJavaFiles(srcPath);
    console.log(`📁 找到 ${javaFiles.length} 个 Java 文件\n`);

    const overview = {
      totalFiles: javaFiles.length,
      pluginTypes: {}
    };

    const allSDKPatterns = {};
    const allConstants = {};

    // 扫描每个文件
    javaFiles.forEach((file, index) => {
      if ((index + 1) % 50 === 0) {
        console.log(`  进度: ${index + 1}/${javaFiles.length}`);
      }

      const content = fs.readFileSync(file, 'utf-8');

      // 统计插件类型
      for (const [type, pattern] of Object.entries(this.pluginPatterns)) {
        if (pattern.test(content)) {
          overview.pluginTypes[type] = (overview.pluginTypes[type] || 0) + 1;
        }
      }

      // 提取 SDK 模式
      const sdkPatterns = this.extractSDKPatterns(file);
      for (const [sdk, data] of Object.entries(sdkPatterns)) {
        if (!allSDKPatterns[sdk]) {
          allSDKPatterns[sdk] = {
            frequency: 0,
            commonMethods: [],
            patterns: []
          };
        }
        allSDKPatterns[sdk].frequency += data.frequency;

        if (data.commonMethods) {
          allSDKPatterns[sdk].commonMethods.push(...(data.commonMethods.get || []));
        }

        if (data.patterns) {
          allSDKPatterns[sdk].patterns.push(...data.patterns);
        }
      }

      // 提取常量使用
      const constants = this.analyzeConstantUsage(file);
      for (const [className, data] of Object.entries(constants)) {
        if (!allConstants[className]) {
          allConstants[className] = {
            usage: 0,
            fields: new Set()
          };
        }
        allConstants[className].usage += data.usage;
        data.fields.forEach(f => allConstants[className].fields.add(f));
      }
    });

    // 转换 Set 为数组
    for (const className in allConstants) {
      allConstants[className].fields = Array.from(allConstants[className].fields);
    }

    console.log(`\n✅ 扫描完成\n`);

    return {
      overview,
      sdkPatterns: allSDKPatterns,
      constants: allConstants
    };
  }
}

module.exports = CodePatternScanner;
module.exports.default = CodePatternScanner;

// 命令行运行
if (require.main === module) {
  const scanner = new CodePatternScanner();
  const projectPath = process.argv[2];

  if (!projectPath) {
    console.log('用法: node code-pattern-scanner.js <项目路径>');
    console.log('示例: node code-pattern-scanner.js E:/projects/kingdee/da6l2');
    process.exit(1);
  }

  scanner.scanProject(projectPath, path.basename(projectPath)).then(result => {
    if (result) {
      console.log('\n📊 扫描结果:\n');
      console.log(JSON.stringify(result, null, 2));
    }
  }).catch(err => {
    console.error('❌ 错误:', err.message);
    process.exit(1);
  });
}