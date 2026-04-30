/**
 * 常量类扫描器 - 扫描项目中的 Java 常量类
 *
 * 功能：
 * 1. 递归扫描项目目录中的所有 .java 文件
 * 2. 识别以 Cons/Con/Constant 结尾的常量类
 * 3. 优先排序 common 包中的常量类
 * 4. 输出常量类路径列表
 */

const fs = require('fs');
const path = require('path');

class ConstantScanner {
  constructor() {
    // 排除的目录
    this.excludeDirs = [
      'node_modules',
      'target',
      'build',
      'dist',
      '.git',
      '.svn',
      '.idea',
      '.vscode',
      'out',
      'bin',
      'obj',
      'packages'
    ];

    // 常量类命名模式
    this.constantPatterns = [
      /^(.*Cons[a-zA-Z]*)\.java$/,      // xxxCons, xxxConsABC
      /^(.*Con[a-zA-Z]*)\.java$/,       // xxxCon, xxxConABC
      /^(.*Constant[a-zA-Z]*)\.java$/   // xxxConstant, xxxConstantABC
    ];

    // 常量类内容特征（备选识别方式）
    this.constantContentPatterns = [
      /public\s+static\s+final\s+/,     // 静态常量
      /public\s+static\s+final\s+String\s+/,
      /public\s+static\s+final\s+int\s+/,
      /private\s+static\s+final\s+/
    ];
  }

  /**
   * 扫描项目目录，查找所有 Java 文件
   * @param {string} projectPath - 项目根目录
   * @returns {Promise<Array>} Java 文件路径列表
   */
  async scanProject(projectPath) {
    const javaFiles = await this.findJavaFiles(projectPath);
    const constantClasses = await this.findConstantClasses(javaFiles);
    const sortedResults = this.prioritizeCommonPackage(constantClasses);

    return sortedResults;
  }

  /**
   * 递归查找所有 Java 文件
   * @param {string} dirPath - 目录路径
   * @returns {Promise<Array>} Java 文件路径列表
   */
  async findJavaFiles(dirPath) {
    const javaFiles = [];

    const scan = async (currentPath) => {
      try {
        const entries = await fs.promises.readdir(currentPath, { withFileTypes: true });

        for (const entry of entries) {
          const fullPath = path.join(currentPath, entry.name);

          if (entry.isDirectory()) {
            // 跳过排除的目录
            if (!this.excludeDirs.includes(entry.name) && !entry.name.startsWith('.')) {
              await scan(fullPath);
            }
          } else if (entry.isFile() && entry.name.endsWith('.java')) {
            javaFiles.push(fullPath);
          }
        }
      } catch (err) {
        // 忽略权限错误
        if (err.code !== 'EACCES' && err.code !== 'EPERM') {
          console.error(`扫描目录失败: ${currentPath}`, err.message);
        }
      }
    };

    await scan(dirPath);
    return javaFiles;
  }

  /**
   * 从 Java 文件列表中识别常量类
   * @param {Array} javaFiles - Java 文件路径列表
   * @returns {Promise<Array>} 常量类信息列表
   */
  async findConstantClasses(javaFiles) {
    const results = [];

    for (const filePath of javaFiles) {
      const fileName = path.basename(filePath);
      const relativePath = filePath;
      const packagePath = this.extractPackage(filePath);

      // 检查文件名是否匹配常量类模式
      let isMatch = false;
      for (const pattern of this.constantPatterns) {
        if (pattern.test(fileName)) {
          isMatch = true;
          break;
        }
      }

      // 如果文件名不匹配，检查文件内容
      if (!isMatch) {
        try {
          const content = await fs.promises.readFile(filePath, 'utf-8');
          for (const pattern of this.constantContentPatterns) {
            if (pattern.test(content)) {
              // 检查是否包含多个常量定义（避免误判）
              const matches = content.match(/public\s+static\s+final\s+/g);
              if (matches && matches.length >= 3) {
                isMatch = true;
                break;
              }
            }
          }
        } catch (err) {
          // 忽略读取错误
        }
      }

      if (isMatch) {
        const className = fileName.replace('.java', '');
        const isInCommon = this.isInCommonPackage(filePath);

        results.push({
          filePath: relativePath,
          className: className,
          packageName: packagePath,
          isInCommon: isInCommon
        });
      }
    }

    return results;
  }

  /**
   * 提取 Java 文件的包名
   * @param {string} filePath - Java 文件路径
   * @returns {string} 包名
   */
  extractPackage(filePath) {
    try {
      const content = fs.readFileSync(filePath, 'utf-8');
      const match = content.match(/^package\s+([\w.]+)/m);
      return match ? match[1] : '';
    } catch (err) {
      return '';
    }
  }

  /**
   * 检查是否在 common 包中
   * @param {string} filePath - 文件路径
   * @returns {boolean} 是否在 common 包中
   */
  isInCommonPackage(filePath) {
    const normalizedPath = filePath.replace(/\\/g, '/');
    return /\/common\//.test(normalizedPath) || /\.common\./.test(normalizedPath);
  }

  /**
   * 优先排序 common 包中的常量类
   * @param {Array} results - 常量类列表
   * @returns {Array} 排序后的结果
   */
  prioritizeCommonPackage(results) {
    // common 包中的放在前面
    const common = results.filter(r => r.isInCommon);
    const others = results.filter(r => !r.isInCommon);

    return [...common, ...others];
  }

  /**
   * 格式化输出结果（Markdown 表格格式）
   * @param {Array} results - 常量类列表
   * @returns {string} 格式化后的字符串
   */
  formatAsMarkdown(results) {
    if (!results || results.length === 0) {
      return '**未找到常量类**';
    }

    let output = `找到 **${results.length}** 个常量类：\n\n`;
    output += '| 类名 | 包名 | 路径 |\n';
    output += '|------|------|------|\n';

    results.forEach(item => {
      const prefix = item.isInCommon ? '📁 ' : '📄 ';
      const packageName = item.packageName || '-';
      output += `| ${prefix}${item.className} | ${packageName} | ${item.filePath} |\n`;
    });

    return output;
  }

  /**
   * 输出为 JSON 格式
   * @param {Array} results - 常量类列表
   * @returns {string} JSON 字符串
   */
  toJSON(results) {
    return JSON.stringify({
      total: results.length,
      commonCount: results.filter(r => r.isInCommon).length,
      results: results
    }, null, 2);
  }
}

// 导出
module.exports = ConstantScanner;
module.exports.default = ConstantScanner;
module.exports.scanner = new ConstantScanner();

// 独立运行
if (require.main === module) {
  const scanner = new ConstantScanner();
  const testDir = process.argv[2] || process.cwd();

  console.log(`🔍 扫描目录: ${testDir}\n`);

  scanner.scanProject(testDir).then(results => {
    console.log(scanner.formatAsMarkdown(results));
    console.log('\n--- JSON ---');
    console.log(scanner.toJSON(results));
  }).catch(err => {
    console.error('❌ 扫描失败:', err.message);
    process.exit(1);
  });
}