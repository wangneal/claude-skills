const fs = require('fs-extra');
const path = require('path');

const STANDARDS_DIR = path.join(__dirname, '..', 'standards');
const INDEX_FILE = path.join(STANDARDS_DIR, 'index.json');

/**
 * 开发规范检查器
 */
class StandardsChecker {
  constructor(options = {}) {
    this.standardsIndex = null;
    this.options = {
      strict: options.strict || false,
      excludeRules: options.excludeRules || []
    };

    this.loadStandardsIndex();
  }

  /**
   * 加载规范索引
   */
  loadStandardsIndex() {
    try {
      if (fs.existsSync(INDEX_FILE)) {
        this.standardsIndex = fs.readJsonSync(INDEX_FILE);
      }
    } catch (error) {
      console.warn('无法加载规范索引:', error.message);
    }
  }

  /**
   * 执行所有检查
   */
  checkAll(code, language = 'csharp') {
    const results = {
      valid: true,
      violations: [],
      summary: {
        errors: 0,
        warnings: 0,
        total: 0
      }
    };

    // 执行各项检查
    const namingResults = this.checkNamingConvention(code, language);
    const formatResults = this.checkCodeFormat(code, language);
    const commentResults = this.checkComments(code, language);

    // 合并结果
    results.violations = [
      ...namingResults.violations,
      ...formatResults.violations,
      ...commentResults.violations
    ];

    // 统计
    results.summary.errors = results.violations.filter(v => v.severity === 'error').length;
    results.summary.warnings = results.violations.filter(v => v.severity === 'warning').length;
    results.summary.total = results.violations.length;

    // 判断是否通过
    results.valid = results.summary.errors === 0;

    return results;
  }

  /**
   * 检查命名规范
   */
  checkNamingConvention(code, language = 'csharp') {
    const results = {
      violations: [],
      valid: true
    };

    if (language !== 'csharp') {
      return results;
    }

    const lines = code.split('\n');

    lines.forEach((line, lineIndex) => {
      // 检查类名 (应为 PascalCase)
      const classMatch = line.match(/class\s+(\w+)/);
      if (classMatch) {
        const className = classMatch[1];
        if (!this.isPascalCase(className)) {
          results.violations.push({
            rule: 'R-NAMING-001',
            category: 'naming',
            severity: 'error',
            message: `类名应使用 PascalCase: ${className}`,
            line: lineIndex + 1,
            column: line.indexOf(className) + 1,
            snippet: line.trim()
          });
        }
      }

      // 检查方法名 (应为 PascalCase)
      const methodMatch = line.match(/public\s+\w+\s+(\w+)\s*\(/);
      if (methodMatch) {
        const methodName = methodMatch[1];
        if (!this.isPascalCase(methodName)) {
          results.violations.push({
            rule: 'R-NAMING-002',
            category: 'naming',
            severity: 'error',
            message: `方法名应使用 PascalCase: ${methodName}`,
            line: lineIndex + 1,
            column: line.indexOf(methodName) + 1,
            snippet: line.trim()
          });
        }
      }

      // 检查常量 (应为全大写)
      const constMatch = line.match(/const\s+\w+\s+(\w+)\s*=/);
      if (constMatch) {
        const constName = constMatch[1];
        if (!this.isUpperCase(constName)) {
          results.violations.push({
            rule: 'R-NAMING-003',
            category: 'naming',
            severity: 'error',
            message: `常量应使用全大写: ${constName}`,
            line: lineIndex + 1,
            column: line.indexOf(constName) + 1,
            snippet: line.trim()
          });
        }
      }
    });

    results.valid = results.violations.length === 0;
    return results;
  }

  /**
   * 检查代码格式
   */
  checkCodeFormat(code, language = 'csharp') {
    const results = {
      violations: [],
      valid: true
    };

    const lines = code.split('\n');

    lines.forEach((line, lineIndex) => {
      // 检查行长度
      if (line.length > 120) {
        results.violations.push({
          rule: 'R-FORMAT-001',
          category: 'format',
          severity: 'warning',
          message: `行长度超过 120 字符 (${line.length} 字符)`,
          line: lineIndex + 1,
          column: 121,
          snippet: line.substring(0, 50) + '...'
        });
      }

      // 检查 Tab 缩进
      if (line.startsWith('\t')) {
        results.violations.push({
          rule: 'R-FORMAT-002',
          category: 'format',
          severity: 'warning',
          message: '应使用空格缩进而非 Tab',
          line: lineIndex + 1,
          column: 1,
          snippet: line.trim()
        });
      }
    });

    results.valid = results.violations.length === 0;
    return results;
  }

  /**
   * 检查注释完整性
   */
  checkComments(code, language = 'csharp') {
    const results = {
      violations: [],
      valid: true
    };

    if (language !== 'csharp') {
      return results;
    }

    const lines = code.split('\n');

    lines.forEach((line, lineIndex) => {
      // 检查公共类是否有注释
      const classMatch = line.match(/public\s+class\s+(\w+)/);
      if (classMatch) {
        // 检查上一行是否有 XML 注释
        const prevLine = lineIndex > 0 ? lines[lineIndex - 1] : '';
        if (!prevLine.includes('/// <summary>')) {
          results.violations.push({
            rule: 'R-COMMENT-001',
            category: 'comments',
            severity: 'warning',
            message: `公共类 ${classMatch[1]} 缺少 XML 文档注释`,
            line: lineIndex + 1,
            column: 1,
            snippet: line.trim()
          });
        }
      }

      // 检查公共方法是否有注释
      const methodMatch = line.match(/public\s+\w+\s+(\w+)\s*\(/);
      if (methodMatch && !line.includes('class')) {
        // 检查上一行是否有 XML 注释
        const prevLine = lineIndex > 0 ? lines[lineIndex - 1] : '';
        if (!prevLine.includes('/// <summary>')) {
          results.violations.push({
            rule: 'R-COMMENT-002',
            category: 'comments',
            severity: 'warning',
            message: `公共方法 ${methodMatch[1]} 缺少 XML 文档注释`,
            line: lineIndex + 1,
            column: 1,
            snippet: line.trim()
          });
        }
      }
    });

    results.valid = results.violations.length === 0;
    return results;
  }

  /**
   * 检查是否为 PascalCase
   */
  isPascalCase(name) {
    return /^[A-Z][a-zA-Z0-9]*$/.test(name);
  }

  /**
   * 检查是否为 camelCase
   */
  isCamelCase(name) {
    return /^[a-z][a-zA-Z0-9]*$/.test(name);
  }

  /**
   * 检查是否为全大写
   */
  isUpperCase(name) {
    return /^[A-Z][A-Z0-9_]*$/.test(name);
  }

  /**
   * 生成检查报告
   */
  generateReport(results) {
    let report = '# 代码规范检查报告\n\n';
    report += `**检查时间:** ${new Date().toLocaleString('zh-CN')}\n\n`;

    if (results.valid) {
      report += '✅ **代码符合规范**\n';
    } else {
      report += '❌ **代码存在规范问题**\n';
    }

    report += `\n## 统计\n\n`;
    report += `- 错误: ${results.summary.errors}\n`;
    report += `- 警告: ${results.summary.warnings}\n`;
    report += `- 总计: ${results.summary.total}\n`;

    if (results.violations.length > 0) {
      report += '\n## 详细问题\n\n';

      results.violations.forEach((v, index) => {
        report += `### ${index + 1}. ${v.message}\n\n`;
        report += `- **规则:** ${v.rule}\n`;
        report += `- **类别:** ${v.category}\n`;
        report += `- **严重程度:** ${v.severity}\n`;
        report += `- **位置:** 第 ${v.line} 行, 第 ${v.column} 列\n`;
        report += `- **代码:** \`${v.snippet}\`\n\n`;
      });
    }

    return report;
  }
}

module.exports = StandardsChecker;

// CLI 测试
if (require.main === module) {
  const checker = new StandardsChecker();

  // 测试代码
  const testCode = `
/// <summary>
/// 工作流服务
/// </summary>
public class WorkflowService
{
    public void processBill()
    {
        const string billType = "Invoice";
    }
}
`;

  const results = checker.checkAll(testCode);
  console.log(checker.generateReport(results));
}
