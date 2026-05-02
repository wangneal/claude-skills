/**
 * 约束生成器 - 从SDK文档生成约束文件
 *
 * 功能：
 * 1. 解析SDK文档，提取方法签名
 * 2. 生成 Markdown 格式的 Prompt 约束文件
 * 3. 生成 JSON Schema 约束文件（可选）
 * 4. 生成代码模板（可选）
 */

const fs = require('fs-extra');
const path = require('path');
const sdkSearch = require('./sdk-search');

class ConstraintGenerator {
  constructor() {
    this.constraintsDir = path.join(__dirname, '..', 'constraints');
  }

  /**
   * 生成约束文件
   * @param {string} className - 类名
   * @param {Object} options - 选项
   * @returns {Promise<string[]>} 生成的文件路径列表
   */
  async generate(className, options = {}) {
    const outputDir = options.outputDir || this.constraintsDir;

    // 确保输出目录存在
    await fs.ensureDir(outputDir);

    // 1. 加载SDK文档
    const sdkDoc = await this.loadSDKDocument(className);

    if (!sdkDoc) {
      throw new Error(`SDK类 ${className} 未找到`);
    }

    // 2. 解析方法签名
    const methods = await this.parseMethods(sdkDoc.document);

    // 3. 生成约束文件
    const files = [];

    const format = options.format || 'prompt';

    if (format === 'prompt' || format === 'all') {
      const promptFile = await this.generatePrompt(className, methods, sdkDoc, outputDir);
      files.push(promptFile);
    }

    if (format === 'schema' || format === 'all') {
      const schemaFile = await this.generateSchema(className, methods, sdkDoc, outputDir);
      files.push(schemaFile);
    }

    if (options.template) {
      const templateFile = await this.generateTemplate(className, methods, sdkDoc, outputDir);
      files.push(templateFile);
    }

    return files;
  }

  /**
   * 加载SDK文档
   * @param {string} className - 类名
   * @returns {Promise<Object>} SDK文档信息
   */
  async loadSDKDocument(className) {
    const index = await sdkSearch.loadIndex();

    // 搜索类
    const results = await sdkSearch.searchByClass(className, index);
    const classResult = results.find(r => r.name === className);

    if (!classResult) {
      return null;
    }

    // 获取文档内容
    const docContent = await sdkSearch.getDocumentContent(classResult.path);

    return {
      className: classResult.name,
      module: classResult.module,
      path: classResult.path,
      methods: classResult.methods,
      document: docContent
    };
  }

  /**
   * 解析方法签名
   * @param {string} document - SDK文档内容
   * @returns {Array} 方法列表
   */
  async parseMethods(document) {
    const methods = [];

    if (!document) return methods;

    // 提取方法定义
    // 格式：### `methodName`
    //       ```java
    //       signature
    //       ```
    // 注意：Windows文档使用 \r\n 换行符
    const methodPattern = /###\s+`([^`]+)`\s*[\r\n]+\s*```java[\r\n]([\s\S]*?)```/g;

    let match;
    while ((match = methodPattern.exec(document)) !== null) {
      const methodName = match[1];
      const signature = match[2].trim();

      // 解析签名
      const methodInfo = this.parseMethodSignature(methodName, signature);
      methods.push(methodInfo);
    }

    return methods;
  }

  /**
   * 解析方法签名
   * @param {string} methodName - 方法名
   * @param {string} signature - 方法签名
   * @returns {Object} 方法信息
   */
  parseMethodSignature(methodName, signature) {
    // 提取返回类型
    const returnTypeMatch = signature.match(/^(\w+(?:<[^>]+>)?)\s+/);
    const returnType = returnTypeMatch ? returnTypeMatch[1] : 'void';

    // 提取参数
    const paramsMatch = signature.match(/\(([^)]*)\)/);
    const paramsStr = paramsMatch ? paramsMatch[1] : '';

    const parameters = [];
    if (paramsStr.trim()) {
      const params = paramsStr.split(',').map(p => p.trim());
      params.forEach(param => {
        const parts = param.split(/\s+/);
        if (parts.length >= 2) {
          parameters.push({
            type: parts[0],
            name: parts[1]
          });
        }
      });
    }

    return {
      name: methodName,
      signature: signature,
      returnType: returnType,
      parameters: parameters,
      description: '' // 从文档中提取描述（简化版暂时为空）
    };
  }

  /**
   * 生成 Markdown 格式的 Prompt 约束文件
   * @param {string} className - 类名
   * @param {Array} methods - 方法列表
   * @param {Object} sdkDoc - SDK文档信息
   * @param {string} outputDir - 输出目录
   * @returns {Promise<string>} 文件路径
   */
  async generatePrompt(className, methods, sdkDoc, outputDir) {
    let content = `# SDK 使用约束 - ${className}\n\n`;
    content += `> 此约束文件由 bos-flow 自动生成\n`;
    content += `> 生成时间: ${new Date().toISOString()}\n\n`;

    content += `## 强制约束\n\n`;
    content += `在生成代码时，必须遵守以下约束：\n\n`;

    content += `### 1. 类名约束\n`;
    content += `- **必须使用**: \`${className}\`\n`;
    content += `- **模块**: ${sdkDoc.module}\n`;
    content += `- **方法总数**: ${methods.length} 个\n\n`;

    // 提取包路径（从文档中）
    const packageMatch = sdkDoc.document.match(/\*\*包路径\*\*:\s*(.+)/);
    if (packageMatch) {
      content += `- **完整包路径**: \`${packageMatch[1].trim()}\`\n\n`;
    }

    content += `### 2. 方法约束\n\n`;
    content += `#### 允许使用的方法列表：\n\n`;

    // 只显示前10个方法（避免文件过大）
    const displayMethods = methods.slice(0, 10);

    displayMethods.forEach(method => {
      content += `##### ${method.name}\n`;
      content += `\`\`\`java\n${method.signature}\n\`\`\`\n`;
      content += `- **返回类型**: ${method.returnType}\n`;
      if (method.parameters.length > 0) {
        content += `- **参数**:\n`;
        method.parameters.forEach(param => {
          content += `  - \`${param.name}\` (${param.type})\n`;
        });
      }
      content += `\n`;
    });

    if (methods.length > 10) {
      content += `... 还有 ${methods.length - 10} 个方法未显示\n\n`;
    }

    content += `### 3. 禁止事项\n\n`;
    content += `❌ **禁止**使用以下不存在的方法：\n`;
    content += `- 请参考上述方法列表，不要猜测或臆造方法名\n\n`;

    content += `❌ **禁止**使用错误的参数类型：\n`;
    content += `- 参数类型必须与方法签名完全匹配\n`;
    content += `- 例如：如果签名是 \`Long billId\`，则不能使用 \`String billId\`\n\n`;

    content += `### 4. 最佳实践\n\n`;
    content += `✅ **推荐**在使用前检查条件\n`;
    content += `✅ **推荐**使用 try-catch 处理异常\n`;
    content += `✅ **推荐**参考官方文档和示例代码\n\n`;

    content += `---\n\n`;
    content += `*Generated by bos-flow kd-gen command*\n`;

    const outputPath = path.join(outputDir, `${className}.prompt.md`);
    await fs.writeFile(outputPath, content, 'utf8');

    return outputPath;
  }

  /**
   * 生成 JSON Schema 约束文件
   * @param {string} className - 类名
   * @param {Array} methods - 方法列表
   * @param {Object} sdkDoc - SDK文档信息
   * @param {string} outputDir - 输出目录
   * @returns {Promise<string>} 文件路径
   */
  async generateSchema(className, methods, sdkDoc, outputDir) {
    const schema = {
      "$schema": "http://json-schema.org/draft-07/schema#",
      "title": `${className} Constraint`,
      "type": "object",
      "properties": {
        "className": {
          "const": className
        },
        "module": {
          "const": sdkDoc.module
        },
        "allowedMethods": {
          "type": "array",
          "items": {
            "type": "object",
            "properties": {
              "name": { "type": "string" },
              "signature": { "type": "string" },
              "returnType": { "type": "string" },
              "parameters": {
                "type": "array",
                "items": {
                  "type": "object",
                  "properties": {
                    "name": { "type": "string" },
                    "type": { "type": "string" }
                  }
                }
              }
            }
          }
        }
      }
    };

    const outputPath = path.join(outputDir, `${className}.schema.json`);
    await fs.writeJson(outputPath, schema, { spaces: 2 });

    return outputPath;
  }

  /**
   * 生成代码模板
   * @param {string} className - 类名
   * @param {Array} methods - 方法列表
   * @param {Object} sdkDoc - SDK文档信息
   * @param {string} outputDir - 输出目录
   * @returns {Promise<string>} 文件路径
   */
  async generateTemplate(className, methods, sdkDoc, outputDir) {
    let content = `// ${className} 使用示例\n`;
    content += `// 生成时间: ${new Date().toISOString()}\n\n`;

    content += `import ${className};\n\n`;

    content += `public class ${className}Example {\n`;
    content += `    public void example() {\n`;
    content += `        // TODO: 在此添加示例代码\n`;
    content += `        // 参考约束文件: ${className}.prompt.md\n`;
    content += `    }\n`;
    content += `}\n`;

    const outputPath = path.join(outputDir, `${className}.template.java`);
    await fs.writeFile(outputPath, content, 'utf8');

    return outputPath;
  }
}

module.exports = new ConstraintGenerator();

// 测试
if (require.main === module) {
  const generator = module.exports;

  async function test() {
    console.log('测试约束生成器\n');

    const className = 'DynamicObject';
    console.log(`生成 ${className} 的约束文件...\n`);

    const files = await generator.generate(className, {
      format: 'all',
      template: true
    });

    console.log('生成的文件:');
    files.forEach(file => {
      console.log(`  - ${file}`);
    });

    // 显示第一个文件的内容
    if (files.length > 0) {
      console.log(`\n第一个文件的前50行:\n`);
      const content = await fs.readFile(files[0], 'utf8');
      const lines = content.split('\n').slice(0, 50);
      console.log(lines.join('\n'));
    }
  }

  test().catch(console.error);
}
