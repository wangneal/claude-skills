const fs = require('fs-extra');
const path = require('path');

/**
 * 初始化新项目
 * @param {string} projectName - 项目名称
 * @param {object} options - 配置选项
 */
async function initProject(projectName, options = {}) {
  // 如果项目名为 'current'，则使用当前目录
  const isCurrentDir = projectName === 'current';
  const projectDir = isCurrentDir ? process.cwd() : path.join(process.cwd(), projectName);

  // 如果不是当前目录，检查目录是否存在
  if (!isCurrentDir && await fs.pathExists(projectDir)) {
    throw new Error(`目录 ${projectName} 已存在`);
  }

  console.log(`正在初始化项目: ${isCurrentDir ? projectDir : projectName}`);

  // 创建项目目录结构
  if (!isCurrentDir) {
    await fs.ensureDir(projectDir);
  }
  await fs.ensureDir(path.join(projectDir, '.bos-flow'));
  await fs.ensureDir(path.join(projectDir, '.bos-flow', 'phases'));
  await fs.ensureDir(path.join(projectDir, '.bos-flow', 'logs'));
  await fs.ensureDir(path.join(projectDir, '.bos-flow', 'sdk'));
  await fs.ensureDir(path.join(projectDir, '.planning'));

  // 创建初始配置文件
  const config = {
    version: '1.0.0',
    name: isCurrentDir ? path.basename(projectDir) : projectName,
    description: options.description || `${projectName} - 金蝶苍穹开发项目`,
    phases: [
      { id: 1, name: '计划阶段', slug: 'planning', status: 'pending' },
      { id: 2, name: '开发阶段', slug: 'development', status: 'pending' },
      { id: 3, name: '测试阶段', slug: 'testing', status: 'pending' },
      { id: 4, name: 'UAT验收', slug: 'uat', status: 'pending' }
    ],
    config: {
      mode: options.mode || 'interactive',
      auto_advance: false,
      sdk_path: options.sdkPath || ''
    }
  };

  await fs.writeJson(path.join(projectDir, '.bos-flow', 'config.json'), config, { spaces: 2 });

  // 创建初始状态文件
  const state = {
    version: '1.0.0',
    project: config.name,
    current_phase: 1,
    phases: config.phases.map(p => ({
      id: p.id,
      name: p.name,
      status: 'pending',
      plans: [],
      started_at: null,
      completed_at: null
    })),
    last_updated: new Date().toISOString()
  };

  await fs.writeJson(path.join(projectDir, '.bos-flow', 'state.json'), state, { spaces: 2 });

  // 创建 README.md
  const readme = `# ${config.name}

${config.description}

## 项目结构

\`\`\`
${config.name}/
├── .bos-flow/          # bos-flow 工作流目录
│   ├── config.json     # 项目配置
│   ├── state.json      # 项目状态
│   ├── phases/         # 阶段文件
│   └── logs/           # 日志文件
└── .planning/          # 规划文档

## 快速开始

\`\`\`bash
# 查看项目状态
node .bos-flow/bin/cli.js status

# 开始第一阶段
node .bos-flow/bin/cli.js phase 1 start
\`\`\`

## 阶段

1. 计划阶段
2. 开发阶段
3. 测试阶段
4. UAT 验收

---

*Created by bos-flow on ${new Date().toLocaleDateString('zh-CN')}*
`;

  await fs.writeFile(path.join(projectDir, 'README.md'), readme, 'utf8');

  // 项目理解功能（如果没有跳过扫描）
  if (!options.skipScan) {
    console.log('\n开始项目理解...');

    try {
      const ProjectScanner = require('../../engine/lib/project-scanner');
      const CodeStyleLearner = require('../../engine/lib/code-style-learner');
      const ProjectConfigGenerator = require('../../engine/lib/project-config-generator');

      // 扫描项目结构
      console.log('\n扫描项目结构...');
      const scanner = new ProjectScanner();
      const scanResult = scanner.scanProject(projectDir);

      // 学习项目风格
      console.log('学习项目风格...');
      const learner = new CodeStyleLearner();
      const styleResult = learner.learnCodeStyle(projectDir);

      // 生成项目配置
      console.log('生成项目配置...');
      const generator = new ProjectConfigGenerator();
      const configs = generator.generateProjectConfig(scanResult, styleResult);

      // 保存配置文件
      for (const [filename, content] of Object.entries(configs)) {
        const filePath = path.join(projectDir, '.bos-flow', filename);
        await fs.writeJson(filePath, content, { spaces: 2 });
      }

      console.log('\n✓ 项目理解完成');
      console.log(`  - 模块数量: ${scanResult.modules.length}`);
      console.log(`  - 插件数量: ${Object.values(scanResult.plugins).reduce((a, b) => a + b, 0)}`);
      console.log(`  - 常量类: ${scanResult.constants.length}`);
      console.log(`  - 工具类: ${scanResult.utils.length}`);
      console.log(`  - 实体数量: ${scanResult.entities.length}`);
    } catch (error) {
      console.error('\n⚠️  项目理解失败:', error.message);
      console.log('项目已初始化，但跳过了项目理解功能');
    }
  } else {
    console.log('\n✓ 已跳过项目扫描');
  }

  console.log(`\n项目初始化完成: ${config.name}`);

  if (!isCurrentDir) {
    console.log(`\n下一步:`);
    console.log(`  cd ${projectName}`);
    console.log(`  node .bos-flow/bin/cli.js status`);
  }

  return projectDir;
}

module.exports = {
  initProject
};
