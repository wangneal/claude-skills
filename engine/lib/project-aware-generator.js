/**
 * 项目风格化代码生成器
 * 根据项目风格生成符合项目规范的代码
 */

const fs = require('fs');
const path = require('path');

class ProjectAwareGenerator {
  constructor(projectConfig = {}) {
    this.codeStyle = projectConfig.codeStyle || {};
    this.constants = projectConfig.constants || { classes: [] };
    this.utils = projectConfig.utils || { classes: [] };
    this.projectContext = projectConfig.projectContext || {};
  }

  /**
   * 生成项目风格化的代码
   * @param {string} pluginType - 插件类型
   * @param {object} params - 参数
   * @returns {string} 生成的代码
   */
  generate(pluginType, params) {
    console.log(`生成 ${pluginType} 插件代码...`);

    // 1. 加载基础模板
    let code = this.loadTemplate(pluginType, params);

    // 2. 应用项目命名规范
    code = this.applyNamingConventions(code, params);

    // 3. 应用项目注释风格
    code = this.applyCommentStyle(code, params);

    // 4. 应用项目异常处理风格
    code = this.applyExceptionHandling(code);

    // 5. 应用项目日志记录风格
    code = this.applyLoggingStyle(code);

    // 6. 使用项目常量类
    code = this.useProjectConstants(code);

    // 7. 使用项目工具类
    code = this.useProjectUtils(code);

    console.log(`✓ 代码生成完成`);
    return code;
  }

  /**
   * 加载基础模板
   */
  loadTemplate(pluginType, params) {
    const templates = {
      'AbstractFormPlugin': this.getFormPluginTemplate(params),
      'AbstractListPlugin': this.getListPluginTemplate(params),
      'AbstractBillPlugin': this.getBillPluginTemplate(params),
      'AbstractWorkflowPlugin': this.getWorkflowPluginTemplate(params),
      'AbstractOperationServicePlugin': this.getOperationPluginTemplate(params)
    };

    return templates[pluginType] || this.getDefaultTemplate(params);
  }

  /**
   * 表单插件模板
   */
  getFormPluginTemplate(params) {
    const className = params.className || 'FormPlugin';
    const description = params.description || '表单插件';

    return `package ${params.package || 'com.kingdee.plugin'};

import kd.bos.form.plugin.AbstractFormPlugin;
import kd.bos.entity.datamodel.IDataModel;
import kd.bos.form.IFormView;

/**
 * ${description}
 */
public class ${className} extends AbstractFormPlugin {

    @Override
    public void afterCreateNewData(EventObject e) {
        super.afterCreateNewData(e);
        // 初始化数据
    }

    @Override
    public void registerListener(EventObject e) {
        super.registerListener(e);
        // 注册事件监听器
    }

    @Override
    public void click(EventObject evt) {
        super.click(evt);
        // 处理点击事件
    }

    private void processBusinessLogic() {
        // 业务逻辑处理
    }
}
`;
  }

  /**
   * 列表插件模板
   */
  getListPluginTemplate(params) {
    const className = params.className || 'ListPlugin';
    const description = params.description || '列表插件';

    return `package ${params.package || 'com.kingdee.plugin'};

import kd.bos.list.plugin.AbstractListPlugin;
import kd.bos.entity.datamodel.IDataModel;
import kd.bos.form.IFormView;

/**
 * ${description}
 */
public class ${className} extends AbstractListPlugin {

    @Override
    public void registerListener(EventObject e) {
        super.registerListener(e);
        // 注册事件监听器
    }

    @Override
    public void click(EventObject evt) {
        super.click(evt);
        // 处理点击事件
    }

    private void processListData() {
        // 列表数据处理
    }
}
`;
  }

  /**
   * 单据插件模板
   */
  getBillPluginTemplate(params) {
    const className = params.className || 'BillPlugin';
    const description = params.description || '单据插件';

    return `package ${params.package || 'com.kingdee.plugin'};

import kd.bos.bill.AbstractBillPlugin;
import kd.bos.entity.datamodel.IDataModel;
import kd.bos.form.IFormView;

/**
 * ${description}
 */
public class ${className} extends AbstractBillPlugin {

    @Override
    public void afterCreateNewData(EventObject e) {
        super.afterCreateNewData(e);
        // 初始化数据
    }

    @Override
    public void registerListener(EventObject e) {
        super.registerListener(e);
        // 注册事件监听器
    }

    private void processBillData() {
        // 单据数据处理
    }
}
`;
  }

  /**
   * 工作流插件模板
   */
  getWorkflowPluginTemplate(params) {
    const className = params.className || 'WorkflowPlugin';
    const description = params.description || '工作流插件';

    return `package ${params.package || 'com.kingdee.plugin'};

import kd.bos.workflow.plugin.AbstractWorkflowPlugin;
import kd.bos.entity.datamodel.IDataModel;

/**
 * ${description}
 */
public class ${className} extends AbstractWorkflowPlugin {

    @Override
    public void execute() {
        // 工作流执行逻辑
    }

    private void processWorkflow() {
        // 工作流处理
    }
}
`;
  }

  /**
   * 操作服务插件模板
   */
  getOperationPluginTemplate(params) {
    const className = params.className || 'OperationPlugin';
    const description = params.description || '操作服务插件';

    return `package ${params.package || 'com.kingdee.plugin'};

import kd.bos.servicehelper.operation.AbstractOperationServicePlugin;
import kd.bos.entity.datamodel.IDataModel;

/**
 * ${description}
 */
public class ${className} extends AbstractOperationServicePlugin {

    @Override
    public void onAddValidators(AddValidatorsEventArgs e) {
        super.onAddValidators(e);
        // 添加验证器
    }

    @Override
    public void afterExecuteOperation(AfterOperationArgs e) {
        super.afterExecuteOperation(e);
        // 操作后处理
    }

    private void processOperation() {
        // 操作处理
    }
}
`;
  }

  /**
   * 默认模板
   */
  getDefaultTemplate(params) {
    const className = params.className || 'CustomPlugin';
    const description = params.description || '自定义插件';

    return `package ${params.package || 'com.kingdee.plugin'};

/**
 * ${description}
 */
public class ${className} {
    // 插件实现
}
`;
  }

  /**
   * 应用命名规范
   */
  applyNamingConventions(code, params) {
    // 根据项目的命名规范调整代码
    const naming = this.codeStyle.naming || {};

    // 如果项目使用特定前缀/后缀
    if (naming.classNaming && naming.classNaming.commonSuffixes) {
      // 已在模板中应用
    }

    return code;
  }

  /**
   * 应用注释风格
   */
  applyCommentStyle(code, params) {
    const comments = this.codeStyle.comments || {};

    // 如果项目使用 JavaDoc
    if (comments.useJavaDoc) {
      // 增强 JavaDoc 注释
      const className = params.className || 'CustomPlugin';
      const description = params.description || '自定义插件';

      const javaDocComment = this.generateJavaDoc(className, description, comments);

      // 替换简单注释为 JavaDoc
      code = code.replace(
        /\/\*\*\s*\n\s*\*\s*([^\n]+)\s*\n\s*\*\//,
        javaDocComment
      );
    }

    // 如果注释使用中文
    if (comments.language === 'chinese') {
      // 保持中文注释
    } else {
      // 转换为英文注释（可选）
    }

    return code;
  }

  /**
   * 生成 JavaDoc 注释
   */
  generateJavaDoc(className, description, commentStyle) {
    let javaDoc = `/**\n * ${description}\n`;

    if (commentStyle.includeAuthor) {
      javaDoc += ` * @author ${process.env.USER || 'Developer'}\n`;
    }

    if (commentStyle.includeDate) {
      const date = new Date().toLocaleDateString('zh-CN');
      javaDoc += ` * @date ${date}\n`;
    }

    javaDoc += ` */`;
    return javaDoc;
  }

  /**
   * 应用异常处理风格
   */
  applyExceptionHandling(code) {
    const exceptions = this.codeStyle.exceptions || {};

    // 如果项目使用 KDBizException
    if (exceptions.useKDBizException) {
      // 添加导入
      if (!code.includes('import kd.bos.exception.KDBizException')) {
        code = code.replace(
          /package\s+[^;]+;/,
          `$&\n\nimport kd.bos.exception.KDBizException;`
        );
      }

      // 在方法中添加异常处理示例
      if (exceptions.logException) {
        const tryCatch = `
    try {
        // 业务逻辑
    } catch (Exception e) {
        logger.error("处理失败", e);
        throw new KDBizException("处理失败: " + e.getMessage());
    }
`;
        // 可以插入到方法中
      }
    }

    return code;
  }

  /**
   * 应用日志记录风格
   */
  applyLoggingStyle(code) {
    const logging = this.codeStyle.logging || {};

    // 如果项目使用 Logger
    if (logging.useLogger) {
      // 添加导入
      if (!code.includes('import org.slf4j.Logger') &&
          !code.includes('import org.slf4j.LoggerFactory')) {
        code = code.replace(
          /package\s+[^;]+;/,
          `$&\n\nimport org.slf4j.Logger;\nimport org.slf4j.LoggerFactory;`
        );

        // 添加 Logger 字段
        const className = code.match(/public\s+class\s+(\w+)/);
        if (className) {
          const loggerField = `
    private static final Logger logger = LoggerFactory.getLogger(${className[1]}.class);
`;
          code = code.replace(
            /public\s+class\s+\w+/,
            `$& {${loggerField}`
          );
        }
      }
    }

    return code;
  }

  /**
   * 使用项目常量类
   */
  useProjectConstants(code) {
    // 如果有项目常量类，可以添加导入
    if (this.constants.classes && this.constants.classes.length > 0) {
      const constantClass = this.constants.classes[0];
      const importPath = this.classNameToImport(constantClass.className);

      if (!code.includes(importPath)) {
        code = code.replace(
          /package\s+[^;]+;/,
          `$&\n\nimport ${importPath};`
        );
      }
    }

    return code;
  }

  /**
   * 使用项目工具类
   */
  useProjectUtils(code) {
    // 如果有项目工具类，可以添加导入
    if (this.utils.classes && this.utils.classes.length > 0) {
      const utilClass = this.utils.classes[0];
      const importPath = this.classNameToImport(utilClass.className);

      if (!code.includes(importPath)) {
        code = code.replace(
          /package\s+[^;]+;/,
          `$&\n\nimport ${importPath};`
        );
      }
    }

    return code;
  }

  /**
   * 类名转导入路径
   */
  classNameToImport(className) {
    // 简化处理，实际应该根据项目结构调整
    return `com.kingdee.util.${className}`;
  }

  /**
   * 保存生成的代码
   */
  saveCode(code, outputPath) {
    const dir = path.dirname(outputPath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(outputPath, code, 'utf-8');
    console.log(`✓ 代码已保存到: ${outputPath}`);
  }
}

module.exports = ProjectAwareGenerator;
