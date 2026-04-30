#!/usr/bin/env node

const fs = require('fs-extra');
const path = require('path');
const os = require('os');

const CLAUDE_DIR = path.join(os.homedir(), '.claude');
const AGENTS_DIR = path.join(CLAUDE_DIR, 'agents');
const SKILLS_DIR = path.join(CLAUDE_DIR, 'skills');
const ENGINE_DIR = path.join(CLAUDE_DIR, 'kingdee-dev');

const PLUGIN_DIR = __dirname;

console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log(' Kingdee Dev Plugin - 安装脚本');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log('');

// 检查 Claude Code 目录是否存在
async function checkClaudeDir() {
  console.log('📋 步骤 1/6: 检查 Claude Code 环境');

  if (!await fs.pathExists(CLAUDE_DIR)) {
    console.log('⚠️  Claude Code 配置目录不存在');
    console.log(`   创建: ${CLAUDE_DIR}`);
    await fs.ensureDir(CLAUDE_DIR);
  }

  console.log('✅ Claude Code 环境正常');
  console.log('');
}

// 安装 Agents
async function installAgents() {
  console.log('📋 步骤 2/6: 安装 Agents (AI 代理)');

  await fs.ensureDir(AGENTS_DIR);

  const agents = [
    'kd-sdk-researcher.md',
    'kd-code-generator.md',
    'kd-standards-checker.md',
    'kd-doc-writer.md'
  ];

  for (const agent of agents) {
    const src = path.join(PLUGIN_DIR, 'agents', agent);
    const dest = path.join(AGENTS_DIR, agent);

    if (await fs.pathExists(dest)) {
      console.log(`   ⚠️  已存在，跳过: ${agent}`);
    } else {
      await fs.copy(src, dest);
      console.log(`   ✅ 安装: ${agent}`);
    }
  }

  console.log('');
}

// 安装 Skills
async function installSkills() {
  console.log('📋 步骤 3/6: 安装 Skills (用户命令)');

  const skills = [
    'kd-init',
    'kd-research',
    'kd-gen',
    'kd-check',
    'kd-template',
    'kd-list',
    'kd-doc'
  ];

  for (const skill of skills) {
    const src = path.join(PLUGIN_DIR, 'skills', skill);
    const dest = path.join(SKILLS_DIR, skill);

    if (await fs.pathExists(dest)) {
      console.log(`   ⚠️  已存在，跳过: ${skill}`);
    } else {
      await fs.ensureDir(dest);
      await fs.copy(path.join(src, 'SKILL.md'), path.join(dest, 'SKILL.md'));
      console.log(`   ✅ 安装: /${skill.replace('kd-', 'kd:')}`);
    }
  }

  console.log('');
}

// 安装核心引擎
async function installEngine() {
  console.log('📋 步骤 4/6: 安装核心引擎');

  if (await fs.pathExists(ENGINE_DIR)) {
    console.log('   ⚠️  引擎目录已存在');
    console.log('   如需重新安装，请先删除: ' + ENGINE_DIR);
    console.log('');
    return;
  }

  const engineSrc = path.join(PLUGIN_DIR, 'engine');
  await fs.copy(engineSrc, ENGINE_DIR);

  console.log('   ✅ 工作流: ' + path.join(ENGINE_DIR, 'workflows'));
  console.log('   ✅ 参考文档: ' + path.join(ENGINE_DIR, 'references'));
  console.log('   ✅ 模板: ' + path.join(ENGINE_DIR, 'templates'));
  console.log('   ✅ SDK 知识库: ' + path.join(ENGINE_DIR, 'sdk'));
  console.log('');
}

// 验证安装
async function verifyInstallation() {
  console.log('📋 步骤 5/6: 验证安装');

  let allGood = true;

  // 检查 Agents
  const agents = ['kd-sdk-researcher.md', 'kd-code-generator.md'];
  for (const agent of agents) {
    if (!await fs.pathExists(path.join(AGENTS_DIR, agent))) {
      console.log(`   ❌ Agent 缺失: ${agent}`);
      allGood = false;
    }
  }

  // 检查 Skills
  const skills = ['kd-init', 'kd-research', 'kd-gen'];
  for (const skill of skills) {
    if (!await fs.pathExists(path.join(SKILLS_DIR, skill, 'SKILL.md'))) {
      console.log(`   ❌ Skill 缺失: ${skill}`);
      allGood = false;
    }
  }

  // 检查 SDK
  if (!await fs.pathExists(path.join(ENGINE_DIR, 'sdk', 'modules.json'))) {
    console.log('   ❌ SDK 知识库缺失');
    allGood = false;
  }

  if (allGood) {
    console.log('   ✅ 所有组件安装正确');
  }

  console.log('');
  return allGood;
}

// 显示完成信息
function showCompletion() {
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log(' ✅ 安装完成！');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('');
  console.log('已安装的命令:');
  console.log('');
  console.log('  项目管理:');
  console.log('    /kd:init <项目名>         - 初始化金蝶项目');
  console.log('');
  console.log('  SDK 研究:');
  console.log('    /kd:research "<需求>"     - 研究 SDK API');
  console.log('    /kd:list [模块|类]        - 列出 SDK 内容');
  console.log('');
  console.log('  代码生成:');
  console.log('    /kd:gen FormPlugin        - 生成表单插件');
  console.log('    /kd:template <类型>       - 复制模板');
  console.log('');
  console.log('  质量保证:');
  console.log('    /kd:check <文件>          - 检查代码规范');
  console.log('');
  console.log('  文档生成:');
  console.log('    /kd:doc readme            - 生成 README');
  console.log('');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('');
  console.log('快速开始:');
  console.log('');
  console.log('  1. 创建新项目:');
  console.log('     /kd:init 销售订单管理系统');
  console.log('');
  console.log('  2. 研究 SDK:');
  console.log('     /kd:research "需要操作工作流"');
  console.log('');
  console.log('  3. 生成代码:');
  console.log('     /kd:gen FormPlugin --class SalesOrderPlugin');
  console.log('');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('');
  console.log('详细文档:');
  console.log('  - ' + path.join(ENGINE_DIR, 'references', 'coding-standards.md'));
  console.log('  - ' + path.join(PLUGIN_DIR, 'README.md'));
  console.log('');
  console.log('遇到问题？查看: ' + path.join(PLUGIN_DIR, 'INSTALL.md'));
  console.log('');
}

// 主函数
async function main() {
  try {
    await checkClaudeDir();
    await installAgents();
    await installSkills();
    await installEngine();
    await verifyInstallation();
    showCompletion();
  } catch (error) {
    console.error('');
    console.error('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.error(' ❌ 安装失败');
    console.error('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.error('');
    console.error('错误信息:', error.message);
    console.error('');
    console.error('请尝试手动安装:');
    console.error('  1. 复制 agents/* 到 ~/.claude/agents/');
    console.error('  2. 复制 skills/* 到 ~/.claude/skills/');
    console.error('  3. 复制 engine 到 ~/.claude/kingdee-dev/');
    console.error('');
    process.exit(1);
  }
}

main();
