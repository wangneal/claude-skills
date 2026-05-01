/**
 * 常量引用助手模块
 *
 * 功能：
 * 1. 检测 Java 代码中的魔法值（字符串和数字）
 * 2. 从常量索引中查找匹配的常量
 * 3. 生成常量引用代码
 * 4. 自动替换魔法值为常量引用
 */

const fs = require('fs');
const path = require('path');

class ConstantResolver {
  constructor(constantsIndexPath) {
    this.constantsIndex = this.loadConstantsIndex(constantsIndexPath);
    this.imports = new Set();
  }

  /**
   * 加载常量索引
   * @param {string} indexPath - 常量索引文件路径
   * @returns {object} 常量索引对象
   */
  loadConstantsIndex(indexPath) {
    if (!indexPath || !fs.existsSync(indexPath)) {
      console.warn('常量索引文件不存在，将使用空索引');
      return {};
    }

    try {
      const content = fs.readFileSync(indexPath, 'utf-8');
      return JSON.parse(content);
    } catch (error) {
      console.error('加载常量索引失败:', error.message);
      return {};
    }
  }

  /**
   * 根据字段值查找对应的常量
   * @param {string} value - 字段值（如 "status", "id"）
   * @returns {object|null} 常量信息 { className, fieldName, import }
   */
  resolveConstant(value) {
    if (!value || typeof value !== 'string') {
      return null;
    }

    // 标准化值（去除引号，转小写）
    const normalizedValue = value.replace(/['"]/g, '').toLowerCase();

    // 遍历所有常量类查找匹配
    for (const [className, classInfo] of Object.entries(this.constantsIndex)) {
      const fields = classInfo.fields || {};

      // 查找字段名匹配
      for (const [fieldName, description] of Object.entries(fields)) {
        // 匹配策略 1: 字段名完全匹配（忽略大小写）
        if (fieldName.toLowerCase() === normalizedValue) {
          return {
            className,
            fieldName,
            import: classInfo.location,
            description
          };
        }

        // 匹配策略 2: 字段值匹配（常量的实际值）
        // 例如：BaseCon.BILL_STATUS_DRAFT = "A"，如果代码中有 "A" 则匹配
        // 这里需要知道常量的实际值，但索引中没有存储
        // 所以我们主要依赖字段名匹配
      }
    }

    return null;
  }

  /**
   * 根据上下文智能查找常量
   * @param {string} value - 字段值
   * @param {string} context - 上下文（如方法名、类名）
   * @returns {object|null} 常量信息
   */
  resolveConstantWithContext(value, context) {
    // 基础匹配
    const basicMatch = this.resolveConstant(value);
    if (basicMatch) {
      return basicMatch;
    }

    // 根据上下文推断可能的常量类
    const contextHints = {
      'workshop': 'ProductCapacityCons',
      'equipment': 'ProductCapacityCons',
      'process': 'ProcessPlanCons',
      'workcenter': 'WorkCenterCons',
      'status': 'BaseCon',
      'bill': 'BaseCon'
    };

    const normalizedContext = (context || '').toLowerCase();
    for (const [hint, suggestedClass] of Object.entries(contextHints)) {
      if (normalizedContext.includes(hint)) {
        const classInfo = this.constantsIndex[suggestedClass];
        if (classInfo) {
          // 在建议的类中查找字段
          for (const [fieldName, description] of Object.entries(classInfo.fields || {})) {
            if (fieldName.toLowerCase().includes(value.toLowerCase())) {
              return {
                className: suggestedClass,
                fieldName,
                import: classInfo.location,
                description
              };
            }
          }
        }
      }
    }

    return null;
  }

  /**
   * 生成常量引用代码
   * @param {string} className - 常量类名
   * @param {string} fieldName - 字段名
   * @returns {string} 引用代码
   */
  generateReference(className, fieldName) {
    if (!className || !fieldName) {
      return null;
    }
    return `${className}.${fieldName}`;
  }

  /**
   * 扫描代码中的魔法值
   * @param {string} code - Java 代码
   * @returns {Array} 魔法值列表 [{ type, value, line, context, suggestion }]
   */
  detectMagicValues(code) {
    const magicValues = [];
    const lines = code.split('\n');

    lines.forEach((line, lineIndex) => {
      // 检测字符串魔法值
      const stringMatches = line.matchAll(/"([^"]+)"/g);
      for (const match of stringMatches) {
        const value = match[1];

        // 跳过日志消息、异常消息等
        if (this.shouldSkipStringValue(line, value)) {
          continue;
        }

        const suggestion = this.resolveConstant(value);
        if (suggestion) {
          magicValues.push({
            type: 'string',
            value,
            line: lineIndex + 1,
            context: line.trim(),
            suggestion
          });
        }
      }

      // 检测数字魔法值（简化版，仅检测明显的状态码等）
      const numberMatches = line.matchAll(/\b(\d+)\b/g);
      for (const match of numberMatches) {
        const value = match[1];

        // 跳过年份、常见数值
        if (this.shouldSkipNumberValue(value)) {
          continue;
        }

        magicValues.push({
          type: 'number',
          value,
          line: lineIndex + 1,
          context: line.trim(),
          suggestion: null // 数字常量需要手动处理
        });
      }
    });

    return magicValues;
  }

  /**
   * 判断是否跳过字符串值
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
   * 判断是否跳过数字值
   * @param {string} value - 数字值
   * @returns {boolean} 是否跳过
   */
  shouldSkipNumberValue(value) {
    // 跳过年份
    const num = parseInt(value);
    if (num >= 2000 && num <= 2100) {
      return true;
    }

    // 跳过常见小数值
    if (num <= 10) {
      return true;
    }

    return false;
  }

  /**
   * 自动替换魔法值为常量引用
   * @param {string} code - Java 代码
   * @returns {object} { code: 替换后的代码, imports: 需要的导入语句 }
   */
  replaceMagicValues(code) {
    const magicValues = this.detectMagicValues(code);
    let result = code;

    // 按行号倒序排列，从后往前替换（避免位置偏移）
    const sortedValues = magicValues
      .filter(mv => mv.suggestion) // 只处理有建议的
      .sort((a, b) => b.line - a.line);

    const lines = result.split('\n');

    sortedValues.forEach(mv => {
      const lineIndex = mv.line - 1;
      const line = lines[lineIndex];

      // 生成常量引用
      const constantRef = this.generateReference(
        mv.suggestion.className,
        mv.suggestion.fieldName
      );

      if (constantRef) {
        // 替换字符串值
        if (mv.type === 'string') {
          const escaped = mv.value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
          const regex = new RegExp(`"${escaped}"`, 'g');
          lines[lineIndex] = line.replace(regex, constantRef);
        }

        // 记录需要的 import
        this.imports.add(mv.suggestion.import);
      }
    });

    result = lines.join('\n');

    return {
      code: result,
      imports: Array.from(this.imports)
    };
  }

  /**
   * 为代码添加 import 语句
   * @param {string} code - Java 代码
   * @param {Array} imports - 导入语句数组
   * @returns {string} 添加导入后的代码
   */
  addImports(code, imports) {
    if (!imports || imports.length === 0) {
      return code;
    }

    const lines = code.split('\n');
    const importLines = imports.map(imp => `import ${imp};`);

    // 查找 package 语句后的位置
    let insertIndex = 0;
    for (let i = 0; i < lines.length; i++) {
      if (lines[i].trim().startsWith('package ')) {
        insertIndex = i + 1;
        break;
      }
    }

    // 在 package 后插入空行和 imports
    if (insertIndex > 0) {
      lines.splice(insertIndex, 0, '', ...importLines);
    } else {
      // 没有 package 语句，直接在文件开头插入
      lines.unshift(...importLines, '');
    }

    return lines.join('\n');
  }

  /**
   * 完整处理：检测、替换、添加导入
   * @param {string} code - Java 代码
   * @returns {object} { code: 处理后的代码, report: 处理报告 }
   */
  processCode(code) {
    // 重置 imports
    this.imports = new Set();

    // 检测魔法值
    const magicValues = this.detectMagicValues(code);

    // 替换魔法值
    const { code: replacedCode, imports } = this.replaceMagicValues(code);

    // 添加导入语句
    const finalCode = this.addImports(replacedCode, imports);

    // 生成报告
    const report = {
      totalMagicValues: magicValues.length,
      replacedCount: magicValues.filter(mv => mv.suggestion).length,
      unreplacedCount: magicValues.filter(mv => !mv.suggestion).length,
      importsAdded: imports.length,
      details: magicValues
    };

    return {
      code: finalCode,
      report
    };
  }
}

module.exports = ConstantResolver;
