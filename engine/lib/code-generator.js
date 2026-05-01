/**
 * 代码生成器模块
 *
 * 功能：
 * 1. 加载代码模板
 * 2. 替换模板变量
 * 3. 集成常量解析功能
 * 4. 支持 --enhanced 参数选择增强版模板
 */

const fs = require('fs');
const path = require('path');
const ConstantResolver = require('./constant-resolver');

class CodeGenerator {
  constructor(options = {}) {
    this.templateDir = options.templateDir || path.join(__dirname, '../templates/plugin');
    this.constantsIndexPath = options.constantsIndexPath ||
      path.join(__dirname, '../references/constants-index.json');
    this.constantResolver = new ConstantResolver(this.constantsIndexPath);
    this.options = {
      enhanced: options.enhanced !== false, // 默认使用增强版
      autoConstant: options.autoConstant !== false, // 默认自动常量引用
      addLogger: options.addLogger !== false, // 默认添加日志
      addExceptionHandling: options.addExceptionHandling !== false, // 默认添加异常处理
      addJavaDoc: options.addJavaDoc !== false // 默认添加 JavaDoc
    };
  }

  /**
   * 生成代码
   * @param {string} pluginType - 插件类型 (FormPlugin, WorkflowPlugin, ReportPlugin 等)
   * @param {object} params - 参数 { className, packageName, description, author, date }
   * @returns {object} { code, report }
   */
  generate(pluginType, params) {
    // 加载模板
    const template = this.loadTemplate(pluginType);

    // 替换模板变量
    let code = this.replaceVariables(template, {
      CLASS_NAME: params.className || 'MyPlugin',
      PACKAGE_NAME: params.packageName || 'com.example.plugin',
      DESCRIPTION: params.description || '插件功能说明',
      AUTHOR: params.author || 'Developer',
      DATE: params.date || new Date().toISOString().split('T')[0],
      CONSTANT_IMPORT: params.constantImport || 'la51.da6l2.base.common.constant.BaseCon',
      CONSTANT_CLASS: params.constantClass || 'BaseCon'
    });

    // 自动常量引用
    if (this.options.autoConstant) {
      const result = this.constantResolver.processCode(code);
      code = result.code;

      return {
        code,
        report: {
          templateType: pluginType,
          enhanced: this.options.enhanced,
          constantResolution: result.report
        }
      };
    }

    return {
      code,
      report: {
        templateType: pluginType,
        enhanced: this.options.enhanced,
        constantResolution: null
      }
    };
  }

  /**
   * 加载模板文件
   * @param {string} pluginType - 插件类型
   * @returns {string} 模板内容
   */
  loadTemplate(pluginType) {
    const templateName = this.options.enhanced ? `${pluginType}-Enhanced` : pluginType;
    const templatePath = path.join(this.templateDir, `${templateName}.java`);

    if (!fs.existsSync(templatePath)) {
      throw new Error(`模板文件不存在: ${templatePath}`);
    }

    return fs.readFileSync(templatePath, 'utf-8');
  }

  /**
   * 替换模板变量
   * @param {string} template - 模板内容
   * @param {object} variables - 变量映射
   * @returns {string} 替换后的代码
   */
  replaceVariables(template, variables) {
    let result = template;

    for (const [key, value] of Object.entries(variables)) {
      const placeholder = `\\$\\{${key}\\}`;
      result = result.replace(new RegExp(placeholder, 'g'), value);
    }

    return result;
  }

  /**
   * 列出可用的模板类型
   * @returns {Array} 模板类型列表
   */
  listAvailableTemplates() {
    const templates = [];
    const files = fs.readdirSync(this.templateDir);

    files.forEach(file => {
      if (file.endsWith('.java')) {
        const baseName = file.replace('.java', '');
        const isEnhanced = baseName.includes('-Enhanced');
        const type = baseName.replace('-Enhanced', '');

        templates.push({
          type,
          file,
          enhanced: isEnhanced,
          path: path.join(this.templateDir, file)
        });
      }
    });

    return templates;
  }

  /**
   * 生成并保存到文件
   * @param {string} pluginType - 插件类型
   * @param {object} params - 参数
   * @param {string} outputPath - 输出路径
   * @returns {object} { filePath, report }
   */
  generateAndSave(pluginType, params, outputPath) {
    const { code, report } = this.generate(pluginType, params);

    // 确保输出目录存在
    const dir = path.dirname(outputPath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    // 写入文件
    fs.writeFileSync(outputPath, code, 'utf-8');

    return {
      filePath: outputPath,
      report
    };
  }
}

module.exports = CodeGenerator;
