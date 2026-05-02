const fs = require('fs-extra');
const path = require('path');
const docTemplates = require('./doc-templates');
const state = require('./state');

/**
 * 生成增强版 README
 * @param {object} options - 配置选项
 */
async function generateEnhancedReadme(options = {}) {
  const projectDir = options.projectDir || process.cwd();
  const configPath = path.join(projectDir, '.bos-flow', 'config.json');
  const statePath = path.join(projectDir, '.bos-flow', 'state.json');

  // 读取项目配置和状态
  let config = {};
  let projectState = {};

  if (await fs.pathExists(configPath)) {
    config = await fs.readJson(configPath);
  }
  if (await fs.pathExists(statePath)) {
    projectState = await fs.readJson(statePath);
  }

  // 加载模板
  let template = await docTemplates.loadTemplate('README');

  // 准备变量
  const variables = {
    project_name: config.name || '项目名称',
    description: config.description || '项目描述',
    created_date: config.created_at || new Date().toLocaleDateString('zh-CN'),
    version: config.version || '1.0.0',
    directory_structure: getDirectoryStructure(),
    usage: getUsageGuide(config),
    generated_date: new Date().toLocaleDateString('zh-CN')
  };

  // 渲染模板
  const content = docTemplates.renderTemplate(template, variables);

  const outputPath = path.join(projectDir, 'README.md');
  await fs.writeFile(outputPath, content, 'utf8');

  console.log(`✓ README.md 已生成 (增强版): ${outputPath}`);
  return outputPath;
}

/**
 * 生成增强版 CHANGELOG
 */
async function generateEnhancedChangelog(options = {}) {
  const projectDir = options.projectDir || process.cwd();
  const configPath = path.join(projectDir, '.bos-flow', 'config.json');

  let config = {};
  if (await fs.pathExists(configPath)) {
    config = await fs.readJson(configPath);
  }

  let template = await docTemplates.loadTemplate('CHANGELOG');

  const variables = {
    version: config.version || '1.0.0',
    release_date: new Date().toLocaleDateString('zh-CN'),
    generated_date: new Date().toLocaleDateString('zh-CN')
  };

  const content = docTemplates.renderTemplate(template, variables);
  const outputPath = path.join(projectDir, 'CHANGELOG.md');
  await fs.writeFile(outputPath, content, 'utf8');

  console.log(`✓ CHANGELOG.md 已生成 (增强版): ${outputPath}`);
  return outputPath;
}

/**
 * 生成增强版 API 文档
 */
async function generateEnhancedApiDoc(options = {}) {
  const projectDir = options.projectDir || process.cwd();

  let template = await docTemplates.loadTemplate('API');

  const commands = `
### status
查看项目状态
\`\`\`bash
node .bos-flow/bin/cli.js status
\`\`\`

### phase
管理阶段状态
\`\`\`bash
node .bos-flow/bin/cli.js phase <number> <action>
\`\`\`

### research
研究 SDK
\`\`\`bash
node .bos-flow/bin/cli.js research "<需求描述>"
\`\`\`

### template
复制模板
\`\`\`bash
node .bos-flow/bin/cli.js template <模板名>
\`\`\`

### init
初始化新项目
\`\`\`bash
node .bos-flow/bin/cli.js init <项目名>
\`\`\`

### doc
生成文档
\`\`\`bash
node .bos-flow/bin/cli.js doc <类型>
\`\`\`
`;

  const variables = {
    commands: commands,
    generated_date: new Date().toLocaleDateString('zh-CN')
  };

  const content = docTemplates.renderTemplate(template, variables);
  const outputPath = path.join(projectDir, 'docs', 'API.md');
  await fs.ensureDir(path.dirname(outputPath));
  await fs.writeFile(outputPath, content, 'utf8');

  console.log(`✓ API.md 已生成 (增强版): ${outputPath}`);
  return outputPath;
}

/**
 * 获取目录结构
 */
function getDirectoryStructure() {
  return `.
├── .bos-flow/          # bos-flow 工作流目录
│   ├── bin/           # CLI 工具
│   ├── lib/           # 核心库
│   ├── sdk/           # SDK 知识库
│   └── templates/     # 阶段模板
├── .planning/          # 规划文档
├── .vscode/           # VS Code 配置
└── docs/              # 项目文档`;
}

/**
 * 获取使用指南
 */
function getUsageGuide(config) {
  return `## 快速开始

### 1. 查看项目状态
\`\`\`bash
node .bos-flow/bin/cli.js status
\`\`\`

### 2. 研究 SDK
\`\`\`bash
node .bos-flow/bin/cli.js research "需要操作工作流数据"
\`\`\`

### 3. 复制模板
\`\`\`bash
node .bos-flow/bin/cli.js template planning
\`\`\`

### 4. 生成文档
\`\`\`bash
node .bos-flow/bin/cli.js doc readme
\`\`\``;
}

module.exports = {
  generateEnhancedReadme,
  generateEnhancedChangelog,
  generateEnhancedApiDoc
};