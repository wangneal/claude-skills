/**
 * JavaDoc 注释生成器
 * 自动生成清晰的 JavaDoc 注释
 */

class JavaDocGenerator {

  /**
   * 生成类注释
   * @param {object} params - 参数
   * @returns {string} JavaDoc 注释
   */
  generateClassDoc(params) {
    const { className, description, author, date, version } = params;

    return `/**
 * ${className} - ${description}
 *
 * <p>创建日期：${date}</p>
 * <p>作者：${author}</p>
 * <p>版本：${version || '1.0'}</p>
 */`;
  }

  /**
   * 生成方法注释
   * @param {object} params - 参数
   * @returns {string} JavaDoc 注释
   */
  generateMethodDoc(params) {
    const { description, purpose, params: methodParams, returnValue, exceptions } = params;

    let doc = `/**
 * ${description}`;

    // 添加用途说明
    if (purpose) {
      doc += `
 * <p>用途：${purpose}</p>`;
    }

    // 添加参数说明
    if (methodParams && methodParams.length > 0) {
      doc += ` *
`;
      methodParams.forEach(param => {
        doc += ` * @param ${param.name} ${param.description}
`;
      });
    }

    // 添加返回值说明
    if (returnValue) {
      doc += ` * @return ${returnValue}
`;
    }

    // 添加异常说明
    if (exceptions && exceptions.length > 0) {
      exceptions.forEach(exception => {
        doc += ` * @throws ${exception.type} ${exception.description}
`;
      });
    }

    doc += ` */`;

    return doc;
  }

  /**
   * 生成字段注释
   * @param {string} description - 字段描述
   * @returns {string} JavaDoc 注释
   */
  generateFieldDoc(description) {
    return `/** ${description} */`;
  }

  /**
   * 生成常量注释
   * @param {string} description - 常量描述
   * @returns {string} JavaDoc 注释
   */
  generateConstantDoc(description) {
    return `/** ${description} */`;
  }

  /**
   * 生成构造方法注释
   * @param {object} params - 参数
   * @returns {string} JavaDoc 注释
   */
  generateConstructorDoc(params) {
    const { className, description, params: constructorParams } = params;

    let doc = `/**
 * 构造方法
 * <p>用途：${description}</p>
`;

    if (constructorParams && constructorParams.length > 0) {
      doc += ` *
`;
      constructorParams.forEach(param => {
        doc += ` * @param ${param.name} ${param.description}
`;
      });
    }

    doc += ` */`;

    return doc;
  }

  /**
   * 生成 Getter 方法注释
   * @param {string} fieldName - 字段名
   * @param {string} description - 字段描述
   * @returns {string} JavaDoc 注释
   */
  generateGetterDoc(fieldName, description) {
    return `/**
 * 获取${description}
 *
 * @return ${fieldName} ${description}
 */`;
  }

  /**
   * 生成 Setter 方法注释
   * @param {string} fieldName - 字段名
   * @param {string} description - 字段描述
   * @returns {string} JavaDoc 注释
   */
  generateSetterDoc(fieldName, description) {
    return `/**
 * 设置${description}
 *
 * @param ${fieldName} ${description}
 */`;
  }

  /**
   * 为代码添加 JavaDoc
   * @param {string} code - Java 代码
   * @param {object} classInfo - 类信息
   * @returns {string} 添加注释后的代码
   */
  addJavaDocToCode(code, classInfo) {
    // 添加类注释
    const classDoc = this.generateClassDoc({
      className: classInfo.name,
      description: classInfo.description,
      author: classInfo.author,
      date: classInfo.date,
      version: classInfo.version
    });

    // 在类定义前插入类注释
    let result = code.replace(
      /public class (\w+)/,
      `${classDoc}\npublic class $1`
    );

    // 为公共方法添加 JavaDoc
    const publicMethods = result.matchAll(/public\s+\w+\s+(\w+)\s*\(([^)]*)\)/g);
    for (const match of publicMethods) {
      const methodName = match[1];
      const params = match[2];

      // 检查是否已有 JavaDoc
      const beforeCode = result.substring(0, match.index);
      const lastNewline = beforeCode.lastIndexOf('\n');
      const potentialJavaDoc = beforeCode.substring(lastNewline - 10, lastNewline);

      if (!potentialJavaDoc.includes('*/')) {
        // 没有JavaDoc，生成一个
        const methodDoc = this.generateMethodDoc({
          description: `${methodName} 方法`,
          purpose: `执行${methodName}操作`,
          params: this.parseParams(params),
          returnValue: methodName.startsWith('get') ? '返回值' : null
        });

        result = result.substring(0, match.index) +
                 methodDoc + '\n' +
                 result.substring(match.index);
      }
    }

    return result;
  }

  /**
   * 解析参数字符串
   * @param {string} paramsStr - 参数字符串
   * @returns {Array} 参数数组
   */
  parseParams(paramsStr) {
    if (!paramsStr || paramsStr.trim() === '') {
      return [];
    }

    const params = [];
    const parts = paramsStr.split(',');

    parts.forEach(part => {
      const trimmed = part.trim();
      const tokens = trimmed.split(/\s+/);
      if (tokens.length >= 2) {
        params.push({
          type: tokens[0],
          name: tokens[1],
          description: `${tokens[1]} 参数`
        });
      }
    });

    return params;
  }

  /**
   * 生成完整的 Java 类模板（带 JavaDoc）
   * @param {object} classInfo - 类信息
   * @returns {string} 完整的 Java 类代码
   */
  generateFullClass(classInfo) {
    const classDoc = this.generateClassDoc(classInfo);

    let code = `${classDoc}
public class ${classInfo.name} {

`;

    // 添加字段
    if (classInfo.fields) {
      classInfo.fields.forEach(field => {
        const fieldDoc = this.generateFieldDoc(field.description);
        code += `    ${fieldDoc}
    private ${field.type} ${field.name};

`;
      });
    }

    // 添加方法
    if (classInfo.methods) {
      classInfo.methods.forEach(method => {
        const methodDoc = this.generateMethodDoc(method);
        code += `    ${methodDoc}
    public ${method.returnType} ${method.name}(${method.params || ''}) {
        // TODO: 实现
    }

`;
      });
    }

    code += `}`;

    return code;
  }
}

module.exports = JavaDocGenerator;
