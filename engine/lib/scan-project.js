/**
 * 扫描项目命令
 * 扫描金蝶项目，学习项目风格，生成配置文件
 */

const fs = require('fs-extra');
const path = require('path');

/**
 * 扫描项目
 * @param {string} projectPath - 项目路径
 * @param {object} options - 配置选项
 */
async function scanProject(projectPath, options = {}) {
  // 确定扫描路径
  const targetPath = projectPath || process.cwd();

  console.log(`\n开始扫描项目: ${targetPath}\n`);

  // 检查路径是否存在
  if (!await fs.pathExists(targetPath)) {
    console.error('错误: 路径不存在');
    return;
  }

  try {
    const ProjectScanner = require('../../engine/lib/project-scanner');
    const CodeStyleLearner = require('../../engine/lib/code-style-learner');
    const ProjectConfigGenerator = require('../../engine/lib/project-config-generator');

    // 扫描项目结构
    console.log('扫描项目结构...');
    const scanner = new ProjectScanner();
    const scanResult = scanner.scanProject(targetPath);

    // 学习项目风格
    console.log('学习项目风格...');
    const learner = new CodeStyleLearner();
    const styleResult = learner.learnCodeStyle(targetPath);

    // 生成项目配置
    console.log('生成项目配置...');
    const generator = new ProjectConfigGenerator();
    const configs = generator.generateProjectConfig(scanResult, styleResult);

    // 保存配置文件
    const bosPath = path.join(targetPath, '.bos-flow');
    await fs.ensureDir(bosPath);

    for (const [filename, content] of Object.entries(configs)) {
      const filePath = path.join(bosPath, filename);
      await fs.writeJson(filePath, content, { spaces: 2 });
    }

    // 显示扫描结果
    console.log('\n✓ 项目扫描完成\n');
    console.log('项目信息:');
    console.log(`  - 项目路径: ${scanResult.path}`);
    console.log(`  - 扫描时间: ${new Date().toLocaleString()}`);
    console.log(`  - 模块数量: ${scanResult.modules.length}`);

    if (Object.keys(scanResult.plugins).length > 0) {
      console.log(`  - 插件分布:`);
      for (const [type, count] of Object.entries(scanResult.plugins)) {
        console.log(`      ${type}: ${count}`);
      }
    }

    console.log(`  - 常量类: ${scanResult.constants.length}`);
    console.log(`  - 工具类: ${scanResult.utils.length}`);
    console.log(`  - 实体数量: ${scanResult.entities.length}`);

    console.log('\n配置文件已保存到 .bos-flow/ 目录');
    console.log('  - project-context.json');
    console.log('  - code-style.json');
    console.log('  - constants-index.json');
    console.log('  - utils-index.json\n');

    // 显示模块信息（如果详细模式）
    if (options.verbose && scanResult.modules.length > 0) {
      console.log('模块详情:');
      scanResult.modules.forEach(module => {
        console.log(`  ${module.name}:`);
        console.log(`    用途: ${module.purpose}`);
        console.log(`    Java文件数: ${module.javaFileCount}`);
      });
      console.log('');
    }

    // 显示代码风格信息（如果详细模式）
    if (options.verbose) {
      console.log('代码风格:');
      console.log(`  注释语言: ${styleResult.comments.language}`);
      console.log(`  使用 JavaDoc: ${styleResult.comments.useJavaDoc ? '是' : '否'}`);
      console.log(`  使用 KDBizException: ${styleResult.exceptions.useKDBizException ? '是' : '否'}`);
      console.log(`  使用 Logger: ${styleResult.logging.useLogger ? '是' : '否'}`);
      console.log('');
    }

    return {
      scanResult,
      styleResult,
      configs
    };
  } catch (error) {
    console.error(`\n❌ 扫描失败: ${error.message}\n`);
    console.error(error.stack);
    throw error;
  }
}

module.exports = {
  scanProject
};
