/**
 * 代码质量检查器
 * 检查生成的代码是否符合规范
 */

class CodeQualityChecker {

  constructor() {
    this.rules = {
      magicValues: true,
      database: true,
      naming: true,
      exceptions: true,
      logging: true,
      javaDoc: true,
      sdk: true
    };
  }

  /**
   * 执行完整检查
   * @param {string} code - Java 代码
   * @returns {object} 检查结果
   */
  checkAll(code) {
    const results = {
      passed: true,
      summary: {
        total: 0,
        passed: 0,
        warnings: 0,
        errors: 0
      },
      details: {}
    };

    // 执行各项检查
    results.details.magicValues = this.checkMagicValues(code);
    results.details.database = this.checkDatabasePatterns(code);
    results.details.naming = this.checkNamingConventions(code);
    results.details.exceptions = this.checkExceptionHandling(code);
    results.details.logging = this.checkLoggingPatterns(code);
    results.details.javaDoc = this.checkJavaDoc(code);
    results.details.sdk = this.checkSDKUsage(code);

    // 统计结果
    for (const [category, issues] of Object.entries(results.details)) {
      results.summary.total += issues.length;
      issues.forEach(issue => {
        if (issue.severity === 'error') {
          results.summary.errors++;
          results.passed = false;
        } else if (issue.severity === 'warning') {
          results.summary.warnings++;
        } else {
          results.summary.passed++;
        }
      });
    }

    return results;
  }

  /**
   * 检查魔法值
   * @param {string} code - Java 代码
   * @returns {Array} 问题列表
   */
  checkMagicValues(code) {
    const issues = [];

    // 检查字符串魔法值
    const lines = code.split('\n');
    lines.forEach((line, lineIndex) => {
      const stringMatches = line.matchAll(/"([^"]+)"/g);
      for (const match of stringMatches) {
        const value = match[1];

        // 跳过不需要检查的场景
        if (this.shouldSkipStringValue(line, value)) {
          continue;
        }

        issues.push({
          type: 'magic_value',
          severity: 'warning',
          message: `发现字符串魔法值: "${value}"`,
          line: lineIndex + 1,
          suggestion: '建议使用常量类引用'
        });
      }
    });

    return issues;
  }

  /**
   * 检查数据库操作模式
   * @param {string} code - Java 代码
   * @returns {Array} 问题列表
   */
  checkDatabasePatterns(code) {
    const issues = [];

    // 检查循环查询
    if (this.hasLoopQueryPattern(code)) {
      issues.push({
        type: 'performance',
        severity: 'error',
        message: '检测到循环中数据库查询，可能导致性能问题',
        suggestion: '建议使用批量查询或缓存'
      });
    }

    // 检查是否有 N+1 查询问题
    if (this.hasNPlusOnePattern(code)) {
      issues.push({
        type: 'performance',
        severity: 'warning',
        message: '可能存在 N+1 查询问题',
        suggestion: '建议使用关联查询或批量加载'
      });
    }

    return issues;
  }

  /**
   * 检查命名规范
   * @param {string} code - Java 代码
   * @returns {Array} 问题列表
   */
  checkNamingConventions(code) {
    const issues = [];

    // 检查类名（应该首字母大写）
    const classMatches = code.matchAll(/class\s+(\w+)/g);
    for (const match of classMatches) {
      const className = match[1];
      if (className[0] !== className[0].toUpperCase()) {
        issues.push({
          type: 'naming',
          severity: 'warning',
          message: `类名不符合规范: ${className}`,
          suggestion: '类名应首字母大写'
        });
      }
    }

    // 检查方法名（应该首字母小写）
    const methodMatches = code.matchAll(/public\s+\w+\s+(\w+)\s*\(/g);
    for (const match of methodMatches) {
      const methodName = match[1];
      if (methodName[0] !== methodName[0].toLowerCase()) {
        issues.push({
          type: 'naming',
          severity: 'warning',
          message: `方法名不符合规范: ${methodName}`,
          suggestion: '方法名应首字母小写'
        });
      }
    }

    // 检查常量名（应该全大写）
    const constantMatches = code.matchAll(/private\s+static\s+final\s+\w+\s+(\w+)\s*=/g);
    for (const match of constantMatches) {
      const constantName = match[1];
      if (constantName !== constantName.toUpperCase()) {
        issues.push({
          type: 'naming',
          severity: 'info',
          message: `常量名不符合规范: ${constantName}`,
          suggestion: '常量名应全大写，使用下划线分隔'
        });
      }
    }

    return issues;
  }

  /**
   * 检查异常处理
   * @param {string} code - Java 代码
   * @returns {Array} 问题列表
   */
  checkExceptionHandling(code) {
    const issues = [];

    // 检查是否有 try-catch
    if (!code.includes('try {')) {
      issues.push({
        type: 'exception',
        severity: 'warning',
        message: '未发现异常处理代码',
        suggestion: '建议添加 try-catch 异常处理'
      });
    }

    // 检查是否记录异常
    if (code.includes('catch') && !code.includes('logger.error')) {
      issues.push({
        type: 'logging',
        severity: 'warning',
        message: '异常处理未记录日志',
        suggestion: '建议使用 logger.error 记录异常信息'
      });
    }

    // 检查是否抛出异常
    if (code.includes('catch') && !code.includes('throw')) {
      issues.push({
        type: 'exception',
        severity: 'info',
        message: '异常处理后未重新抛出',
        suggestion: '考虑是否需要重新抛出异常'
      });
    }

    return issues;
  }

  /**
   * 检查日志模式
   * @param {string} code - Java 代码
   * @returns {Array} 问题列表
   */
  checkLoggingPatterns(code) {
    const issues = [];

    // 检查是否有 Logger
    if (!code.includes('Logger logger') && !code.includes('Logger logger')) {
      issues.push({
        type: 'logging',
        severity: 'info',
        message: '未发现日志记录器',
        suggestion: '建议添加日志记录'
      });
    }

    // 检查日志级别使用
    if (code.includes('logger.error') && !code.includes('catch')) {
      issues.push({
        type: 'logging',
        severity: 'info',
        message: 'ERROR 日志应在异常处理中使用',
        suggestion: '建议在 catch 块中使用 logger.error'
      });
    }

    return issues;
  }

  /**
   * 检查 JavaDoc
   * @param {string} code - Java 代码
   * @returns {Array} 问题列表
   */
  checkJavaDoc(code) {
    const issues = [];

    // 检查类是否有 JavaDoc
    const classMatch = code.match(/public class (\w+)/);
    if (classMatch) {
      const beforeClass = code.substring(0, classMatch.index);
      if (!beforeClass.includes('*/')) {
        issues.push({
          type: 'javadoc',
          severity: 'info',
          message: `类 ${classMatch[1]} 缺少 JavaDoc 注释`,
          suggestion: '建议添加类级别的 JavaDoc 注释'
        });
      }
    }

    // 检查公共方法是否有 JavaDoc
    const publicMethods = code.matchAll(/public\s+\w+\s+(\w+)\s*\(/g);
    for (const match of publicMethods) {
      const beforeCode = code.substring(0, match.index);
      const lastNewline = beforeCode.lastIndexOf('\n');
      const beforeMethod = beforeCode.substring(lastNewline - 10, lastNewline);

      if (!beforeMethod.includes('*/')) {
        issues.push({
          type: 'javadoc',
          severity: 'info',
          message: `公共方法 ${match[1]} 缺少 JavaDoc 注释`,
          suggestion: '建议添加方法级别的 JavaDoc 注释'
        });
      }
    }

    return issues;
  }

  /**
   * 检查 SDK 使用正确性
   * @param {string} code - Java 代码
   * @returns {Array} 问题列表
   */
  checkSDKUsage(code) {
    const issues = [];

    // 检查 DynamicObject 字段访问
    if (code.includes('DynamicObject')) {
      // 检查是否有使用 get 方法
      if (!code.includes('.getString') && !code.includes('.getLong') && !code.includes('.getBigDecimal')) {
        issues.push({
          type: 'sdk',
          severity: 'info',
          message: 'DynamicObject 未使用正确的字段访问方法',
          suggestion: '建议使用 getString/getLong/getBigDecimal 等方法'
        });
      }
    }

    // 检查 QFilter 使用
    if (code.includes('QFilter')) {
      // 检查是否有使用 QCP
      if (!code.includes('QCP.')) {
        issues.push({
          type: 'sdk',
          severity: 'info',
          message: 'QFilter 未使用 QCP 比较符',
          suggestion: '建议使用 QCP.equals/QCP.in 等比较符'
        });
      }
    }

    return issues;
  }

  /**
   * 是否跳过字符串值检查
   * @param {string} line - 代码行
   * @param {string} value - 字符串值
   * @returns {boolean} 是否跳过
   */
  shouldSkipStringValue(line, value) {
    // 跳过日志消息
    if (line.includes('logger.') || line.includes('Logger.')) {
      return true;
    }

    // 跳过异常消息
    if (line.includes('throw new') || line.includes('KDBizException')) {
      return true;
    }

    // 跳过提示消息
    if (line.includes('showTip') || line.includes('showMessage')) {
      return true;
    }

    // 跳过 import 语句
    if (line.trim().startsWith('import ')) {
      return true;
    }

    // 跳过包声明
    if (line.trim().startsWith('package ')) {
      return true;
    }

    // 跳过 JavaDoc
    if (line.trim().startsWith('*') || line.trim().startsWith('/**') || line.trim().startsWith('//')) {
      return true;
    }

    // 跳过太长的字符串（通常是消息）
    if (value.length > 30) {
      return true;
    }

    return false;
  }

  /**
   * 检测循环查询模式
   * @param {string} code - Java 代码
   * @returns {boolean} 是否存在循环查询
   */
  hasLoopQueryPattern(code) {
    // 简化检测：for/while 循环内有 QueryServiceHelper
    const hasLoop = code.includes('for (') || code.includes('while (');
    const hasQuery = code.includes('QueryServiceHelper');

    return hasLoop && hasQuery;
  }

  /**
   * 检测 N+1 查询模式
   * @param {string} code - Java 代码
   * @returns {boolean} 是否存在 N+1 问题
   */
  hasNPlusOnePattern(code) {
    // 简化检测：遍历数据时单个查询关联数据
    if (code.includes('for (DynamicObject') && code.includes('loadSingle')) {
      return true;
    }

    return false;
  }

  /**
   * 生成检查报告
   * @param {object} results - 检查结果
   * @returns {string} 格式化的报告
   */
  generateReport(results) {
    let report = `# 代码质量检查报告\n\n`;

    report += `## 总体结果: ${results.passed ? '✅ 通过' : '❌ 未通过'}\n\n`;

    report += `### 统计\n`;
    report += `- 总问题数: ${results.summary.total}\n`;
    report += `- 错误: ${results.summary.errors}\n`;
    report += `- 警告: ${results.summary.warnings}\n\n`;

    for (const [category, issues] of Object.entries(results.details)) {
      if (issues.length > 0) {
        report += `### ${this.getCategoryName(category)}\n\n`;
        issues.forEach((issue, index) => {
          report += `${index + 1}. **${issue.severity.toUpperCase()}**: ${issue.message}\n`;
          if (issue.line) {
            report += `   - 行号: ${issue.line}\n`;
          }
          if (issue.suggestion) {
            report += `   - 建议: ${issue.suggestion}\n`;
          }
          report += `\n`;
        });
      }
    }

    return report;
  }

  /**
   * 获取分类名称
   * @param {string} key - 分类键
   * @returns {string} 分类名称
   */
  getCategoryName(key) {
    const names = {
      magicValues: '魔法值检查',
      database: '数据库操作检查',
      naming: '命名规范检查',
      exceptions: '异常处理检查',
      logging: '日志记录检查',
      javaDoc: 'JavaDoc 检查',
      sdk: 'SDK 使用检查'
    };

    return names[key] || key;
  }
}

module.exports = CodeQualityChecker;
