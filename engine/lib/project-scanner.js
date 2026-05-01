/**
 * 项目结构扫描器
 * 扫描金蝶项目的目录结构、模块划分、插件分布
 */

const fs = require('fs');
const path = require('path');

class ProjectScanner {
  constructor() {
    this.pluginTypes = [
      'AbstractFormPlugin',
      'AbstractListPlugin',
      'AbstractBillPlugin',
      'AbstractWorkflowPlugin',
      'AbstractOperationServicePlugin',
      'AbstractReportPlugin',
      'AbstractDashboardPlugin',
      'AbstractPrintService',
      'AbstractValidator',
      'AbstractAuthorityFacade'
    ];
  }

  /**
   * 扫描项目结构
   * @param {string} projectPath - 项目路径
   * @returns {object} 项目结构信息
   */
  scanProject(projectPath) {
    console.log(`扫描项目: ${projectPath}`);

    const result = {
      path: projectPath,
      structure: this.analyzeDirectoryStructure(projectPath),
      modules: this.identifyModules(projectPath),
      plugins: this.countPlugins(projectPath),
      constants: this.findConstants(projectPath),
      utils: this.findUtils(projectPath),
      entities: this.identifyEntities(projectPath)
    };

    console.log(`✓ 项目扫描完成`);
    return result;
  }

  /**
   * 分析目录结构
   */
  analyzeDirectoryStructure(projectPath) {
    const structure = {
      type: 'unknown',
      sourceDir: null,
      resourceDir: null,
      configDir: null,
      hasGradle: false,
      hasMaven: false
    };

    // 检查项目类型
    if (fs.existsSync(path.join(projectPath, 'build.gradle'))) {
      structure.type = 'gradle';
      structure.hasGradle = true;
    } else if (fs.existsSync(path.join(projectPath, 'pom.xml'))) {
      structure.type = 'maven';
      structure.hasMaven = true;
    }

    // 识别源代码目录
    const possibleSourceDirs = [
      'code',
      'src/main/java',
      'src'
    ];

    for (const dir of possibleSourceDirs) {
      const fullPath = path.join(projectPath, dir);
      if (fs.existsSync(fullPath)) {
        structure.sourceDir = dir;
        break;
      }
    }

    // 识别资源目录
    const possibleResourceDirs = [
      'src/main/resources',
      'resources'
    ];

    for (const dir of possibleResourceDirs) {
      const fullPath = path.join(projectPath, dir);
      if (fs.existsSync(fullPath)) {
        structure.resourceDir = dir;
        break;
      }
    }

    // 识别配置目录
    if (fs.existsSync(path.join(projectPath, 'config'))) {
      structure.configDir = 'config';
    }

    return structure;
  }

  /**
   * 识别模块
   */
  identifyModules(projectPath) {
    const modules = [];
    const codePath = path.join(projectPath, 'code');

    if (!fs.existsSync(codePath)) {
      return modules;
    }

    // 扫描一级目录
    const entries = fs.readdirSync(codePath, { withFileTypes: true });

    for (const entry of entries) {
      if (entry.isDirectory()) {
        const moduleName = entry.name;
        const modulePath = path.join(codePath, moduleName);

        // 分析模块用途
        const purpose = this.inferModulePurpose(moduleName, modulePath);

        modules.push({
          name: moduleName,
          path: modulePath,
          purpose: purpose,
          javaFileCount: this.countJavaFiles(modulePath)
        });
      }
    }

    return modules;
  }

  /**
   * 推断模块用途
   */
  inferModulePurpose(moduleName, modulePath) {
    const purposeMap = {
      'base': '基础模块 - 公共组件、工具类',
      'mmc': '业务模块 - 主要业务功能',
      'qmc': '业务模块 - 查询功能',
      'scmc': '业务模块 - 供应链管理',
      'pom': '业务模块 - 生产管理',
      'rpt': '业务模块 - 报表功能',
      'lib': '库模块 - 第三方依赖'
    };

    // 检查是否有预定义用途
    for (const [key, purpose] of Object.entries(purposeMap)) {
      if (moduleName.toLowerCase().includes(key)) {
        return purpose;
      }
    }

    // 分析模块内容
    const subdirs = fs.readdirSync(modulePath, { withFileTypes: true })
      .filter(d => d.isDirectory())
      .map(d => d.name);

    if (subdirs.some(s => s.includes('plugin'))) {
      return '业务模块 - 插件功能';
    }

    if (subdirs.some(s => s.includes('helper'))) {
      return '辅助模块 - 帮助类';
    }

    return '业务模块';
  }

  /**
   * 统计插件
   */
  countPlugins(projectPath) {
    const pluginCount = {};

    // 初始化计数器
    for (const type of this.pluginTypes) {
      pluginCount[type] = 0;
    }

    // 扫描所有 Java 文件
    const javaFiles = this.findAllJavaFiles(projectPath);

    for (const file of javaFiles) {
      try {
        const content = fs.readFileSync(file, 'utf-8');

        // 检查插件类型
        for (const pluginType of this.pluginTypes) {
          if (content.includes(`extends ${pluginType}`) ||
              content.includes(`implements ${pluginType}`)) {
            pluginCount[pluginType]++;
          }
        }
      } catch (err) {
        // 跳过无法读取的文件
      }
    }

    // 过滤掉计数为 0 的插件
    const result = {};
    for (const [type, count] of Object.entries(pluginCount)) {
      if (count > 0) {
        result[type] = count;
      }
    }

    return result;
  }

  /**
   * 查找常量类
   */
  findConstants(projectPath) {
    const constants = [];
    const javaFiles = this.findAllJavaFiles(projectPath);

    for (const file of javaFiles) {
      const fileName = path.basename(file, '.java');

      // 检查是否为常量类
      if (fileName.endsWith('Cons') ||
          fileName.endsWith('Con') ||
          fileName.endsWith('Constant') ||
          fileName.endsWith('Constants')) {
        try {
          const content = fs.readFileSync(file, 'utf-8');
          const fields = this.extractConstantFields(content);

          constants.push({
            className: fileName,
            filePath: file,
            fields: fields
          });
        } catch (err) {
          // 跳过无法读取的文件
        }
      }
    }

    return constants;
  }

  /**
   * 提取常量字段
   */
  extractConstantFields(content) {
    const fields = [];
    const lines = content.split('\n');

    for (const line of lines) {
      // 匹配常量定义
      const match = line.match(/public\s+static\s+final\s+\w+\s+(\w+)\s*=\s*(.+?);/);
      if (match) {
        fields.push({
          name: match[1],
          value: match[2].trim()
        });
      }
    }

    return fields;
  }

  /**
   * 查找工具类
   */
  findUtils(projectPath) {
    const utils = [];
    const javaFiles = this.findAllJavaFiles(projectPath);

    for (const file of javaFiles) {
      const fileName = path.basename(file, '.java');

      // 检查是否为工具类
      if (fileName.endsWith('Utils') ||
          fileName.endsWith('Util') ||
          fileName.endsWith('Helper') ||
          fileName.endsWith('ServiceHelper')) {
        try {
          const content = fs.readFileSync(file, 'utf-8');
          const methods = this.extractPublicMethods(content);

          utils.push({
            className: fileName,
            filePath: file,
            methods: methods
          });
        } catch (err) {
          // 跳过无法读取的文件
        }
      }
    }

    return utils;
  }

  /**
   * 提取公共方法
   */
  extractPublicMethods(content) {
    const methods = [];
    const lines = content.split('\n');

    for (const line of lines) {
      // 匹配公共方法定义
      const match = line.match(/public\s+(?:static\s+)?(\w+(?:<[^>]+>)?)\s+(\w+)\s*\(([^)]*)\)/);
      if (match) {
        methods.push({
          returnType: match[1],
          name: match[2],
          parameters: match[3]
        });
      }
    }

    return methods;
  }

  /**
   * 识别实体
   */
  identifyEntities(projectPath) {
    const entities = [];
    const javaFiles = this.findAllJavaFiles(projectPath);

    for (const file of javaFiles) {
      try {
        const content = fs.readFileSync(file, 'utf-8');

        // 查找 DynamicObject 的使用
        const entityMatches = content.matchAll(/DynamicObject\s+(\w+)\s*=\s*\w+\.loadSingle\(["']([^"']+)["']/g);

        for (const match of entityMatches) {
          const entityName = match[2];
          if (!entities.includes(entityName)) {
            entities.push(entityName);
          }
        }

        // 查找其他实体引用
        const otherMatches = content.matchAll(/["']([a-z_]+)["']\)/g);
        for (const match of otherMatches) {
          const entityName = match[1];
          // 简单判断是否为实体名称（包含下划线）
          if (entityName.includes('_') && !entities.includes(entityName)) {
            entities.push(entityName);
          }
        }
      } catch (err) {
        // 跳过无法读取的文件
      }
    }

    return entities;
  }

  /**
   * 查找所有 Java 文件
   */
  findAllJavaFiles(dir) {
    const javaFiles = [];

    if (!fs.existsSync(dir)) {
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

    scan(dir);
    return javaFiles;
  }

  /**
   * 统计 Java 文件数量
   */
  countJavaFiles(dir) {
    return this.findAllJavaFiles(dir).length;
  }
}

module.exports = ProjectScanner;
