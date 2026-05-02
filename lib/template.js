const fs = require('fs-extra');
const path = require('path');

const TEMPLATES_DIR = path.join(__dirname, '..', 'templates');

/**
 * 复制模板到项目
 * @param {string} templateName - 模板名称 (planning/development/testing/uat/all)
 * @param {object} options - 配置选项
 */
async function copyTemplate(templateName, options = {}) {
  const targetDir = options.targetDir || process.cwd();
  const outputDir = options.outputDir || targetDir;

  console.log(`正在复制模板: ${templateName}`);

  // 验证模板名称
  const validTemplates = ['planning', 'development', 'testing', 'uat', 'all'];
  if (!validTemplates.includes(templateName.toLowerCase())) {
    throw new Error(`无效的模板名称: ${templateName}\n有效选项: ${validTemplates.join(', ')}`);
  }

  const templateNameLower = templateName.toLowerCase();

  if (templateNameLower === 'all') {
    // 复制所有模板
    const templates = ['PLANNING', 'DEVELOPMENT', 'TESTING', 'UAT'];
    for (const tpl of templates) {
      await copySingleTemplate(tpl, outputDir, options);
    }
  } else {
    // 复制单个模板
    const templateFile = templateNameLower.toUpperCase() + '.md';
    await copySingleTemplate(templateFile, outputDir, options);
  }

  console.log(`\n模板复制完成!`);
}

/**
 * 复制单个模板
 */
async function copySingleTemplate(templateFile, outputDir, options) {
  const sourcePath = path.join(TEMPLATES_DIR, templateFile);

  // 检查模板文件是否存在
  if (!(await fs.pathExists(sourcePath))) {
    console.warn(`警告: 模板文件不存在: ${templateFile}`);
    return;
  }

  // 读取模板内容
  let content = await fs.readFile(sourcePath, 'utf8');

  // 应用变量替换
  if (options.projectName) {
    content = content.replace(/\[填写项目名称\]/g, options.projectName);
  }
  if (options.author) {
    content = content.replace(/\[填写负责人\]/g, options.author);
  }
  if (options.date) {
    content = content.replace(/\[YYYY-MM-DD\]/g, options.date);
  }

  // 确定输出文件名
  const outputFileName = options.rename || templateFile;
  const outputPath = path.join(outputDir, outputFileName);

  // 写入文件
  await fs.writeFile(outputPath, content, 'utf8');
  console.log(`  ✓ 已创建: ${outputFileName}`);
}

/**
 * 列出可用模板
 */
async function listTemplates() {
  console.log('\n可用的模板:');
  console.log('  - planning      计划阶段模板');
  console.log('  - development   开发阶段模板');
  console.log('  - testing       测试阶段模板');
  console.log('  - uat           UAT 验收模板');
  console.log('  - all           复制所有模板\n');

  console.log('示例用法:');
  console.log('  bos-flow template planning');
  console.log('  bos-flow template all --project-name "我的项目"\n');
}

module.exports = {
  copyTemplate,
  listTemplates
};
