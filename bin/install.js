#!/usr/bin/env node

/**
 * bos-flow 安装器 - 为 Claude Code、OpenCode、Gemini 等安装金蝶工作流命令
 *
 * 用法:
 *   npx kingdee-bos-flow
 *   npx kingdee-bos-flow --global
 *   npx kingdee-bos-flow --local
 */

const fs = require('fs');
const path = require('path');
const os = require('os');
const readline = require('readline');

// 颜色
const cyan = '\x1b[36m';
const green = '\x1b[32m';
const yellow = '\x1b[33m';
const red = '\x1b[31m';
const bold = '\x1b[1m';
const dim = '\x1b[2m';
const reset = '\x1b[0m';

// 获取版本
const pkg = require('../package.json');

// 解析参数
const args = process.argv.slice(2);
const hasGlobal = args.includes('--global') || args.includes('-g');
const hasLocal = args.includes('--local') || args.includes('-l');
const hasClaude = args.includes('--claude');
const hasAll = args.includes('--all');
const hasUninstall = args.includes('--uninstall') || args.includes('-u');

// 运行时列表
const RUNTIMES = {
  claude: { name: 'Claude Code', configDir: '.claude', commandDir: 'commands' },
  opencode: { name: 'OpenCode', configDir: '.opencode', commandDir: 'commands' },
  gemini: { name: 'Gemini CLI', configDir: '.gemini', commandDir: 'commands' },
  cursor: { name: 'Cursor', configDir: '.cursor', commandDir: 'commands' },
  windsurf: { name: 'Windsurf', configDir: '.windsurf', commandDir: 'commands' },
  copilot: { name: 'GitHub Copilot', configDir: '.github', commandDir: 'commands' },
  cline: { name: 'Cline', configDir: '.cline', commandDir: 'commands' },
  codex: { name: 'Codex', configDir: '.codex', commandDir: 'commands' }
};

// 创建 readline 接口
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// 问题函数
function question(prompt) {
  return new Promise((resolve) => {
    rl.question(prompt, resolve);
  });
}

// 日志函数
function log(message, color = reset) {
  console.log(`${color}${message}${reset}`);
}

// 安装到指定运行时
async function installToRuntime(runtime, targetDir) {
  const runtimeInfo = RUNTIMES[runtime];
  if (!runtimeInfo) {
    log(`⚠️  未知运行时: ${runtime}`, yellow);
    return false;
  }

  const configPath = path.join(targetDir, runtimeInfo.configDir);
  const commandsPath = path.join(configPath, 'bos-flow');

  log(`\n📦 安装到 ${runtimeInfo.name}...`, cyan);

  try {
    // 创建目录
    fs.ensureDirSync(commandsPath);

    // 复制命令文件
    const sourceCommandsDir = path.join(__dirname, '..', 'commands');
    if (fs.existsSync(sourceCommandsDir)) {
      const commandFiles = fs.readdirSync(sourceCommandsDir).filter(f => f.endsWith('.md'));
      commandFiles.forEach(file => {
        const source = path.join(sourceCommandsDir, file);
        const target = path.join(commandsPath, file);
        fs.copySync(source, target);
      });
      log(`  ✓ 复制 ${commandFiles.length} 个命令`, green);
    }

    // 复制技能文件
    const sourceSkillsDir = path.join(__dirname, '..', 'skills');
    if (fs.existsSync(sourceSkillsDir)) {
      const targetSkillsDir = path.join(configPath, 'skills');
      fs.ensureDirSync(targetSkillsDir);
      const skillFiles = fs.readdirSync(sourceSkillsDir).filter(f => f.endsWith('.md'));
      skillFiles.forEach(file => {
        const source = path.join(sourceSkillsDir, file);
        const target = path.join(targetSkillsDir, file);
        fs.copySync(source, target);
      });
      log(`  ✓ 复制 ${skillFiles.length} 个技能`, green);
    }

    log(`  ✅ ${runtimeInfo.name} 安装完成`, green);
    return true;
  } catch (error) {
    log(`  ❌ 安装失败: ${error.message}`, red);
    return false;
  }
}

// 从指定运行时卸载
async function uninstallFromRuntime(runtime, targetDir) {
  const runtimeInfo = RUNTIMES[runtime];
  if (!runtimeInfo) return false;

  const configPath = path.join(targetDir, runtimeInfo.configDir);
  const commandsPath = path.join(configPath, 'bos-flow');
  const skillsPath = path.join(configPath, 'skills');

  log(`\n🗑️  从 ${runtimeInfo.name} 卸载...`, yellow);

  try {
    if (fs.existsSync(commandsPath)) {
      fs.removeSync(commandsPath);
      log(`  ✓ 删除命令目录`, green);
    }

    // 删除 bos-flow 相关技能（保留其他技能）
    if (fs.existsSync(skillsPath)) {
      const skillFiles = fs.readdirSync(skillsPath).filter(f => f.includes('kd'));
      skillFiles.forEach(file => {
        fs.removeSync(path.join(skillsPath, file));
      });
      if (skillFiles.length > 0) {
        log(`  ✓ 删除 ${skillFiles.length} 个技能文件`, green);
      }
    }

    log(`  ✅ ${runtimeInfo.name} 卸载完成`, green);
    return true;
  } catch (error) {
    log(`  ❌ 卸载失败: ${error.message}`, red);
    return false;
  }
}

// 主函数
async function main() {
  log('\n' + '='.repeat(60), cyan);
  log('  bos-flow - 金蝶苍穹开发工作流', bold + cyan);
  log(`  版本 ${pkg.version}`, dim);
  log('='.repeat(60) + '\n', cyan);

  // 确定目标目录
  let targetDir;
  if (hasGlobal) {
    targetDir = os.homedir();
  } else if (hasLocal) {
    targetDir = process.cwd();
  } else {
    // 询问用户
    log('选择安装位置:', bold);
    log('  1) 全局安装 (所有项目可用)');
    log('  2) 本地安装 (仅当前项目)');
    log('  3) 两者都安装');

    const choice = await question('\n请选择 [1/2/3]: ');

    if (choice === '1') {
      targetDir = os.homedir();
    } else if (choice === '2') {
      targetDir = process.cwd();
    } else if (choice === '3') {
      // 安装到两个位置
      await installToAllLocations();
      rl.close();
      return;
    } else {
      log('\n无效选择，默认全局安装', yellow);
      targetDir = os.homedir();
    }
  }

  // 确定运行时
  let runtimes = [];
  if (hasClaude) {
    runtimes = ['claude'];
  } else if (hasAll) {
    runtimes = Object.keys(RUNTIMES);
  } else {
    // 询问用户
    log('\n选择目标运行时:', bold);
    Object.entries(RUNTIMES).forEach(([key, info], index) => {
      log(`  ${index + 1}) ${info.name}`);
    });
    log(`  ${Object.keys(RUNTIMES).length + 1}) 全部`);

    const choice = await question('\n请选择运行时 [1-9]: ');
    const choiceNum = parseInt(choice);

    if (choiceNum === Object.keys(RUNTIMES).length + 1) {
      runtimes = Object.keys(RUNTIMES);
    } else if (choiceNum >= 1 && choiceNum <= Object.keys(RUNTIMES).length) {
      runtimes = [Object.keys(RUNTIMES)[choiceNum - 1]];
    } else {
      log('\n无效选择，默认安装到 Claude Code', yellow);
      runtimes = ['claude'];
    }
  }

  // 执行安装或卸载
  if (hasUninstall) {
    log('\n🗑️  卸载 bos-flow...', yellow);
    for (const runtime of runtimes) {
      await uninstallFromRuntime(runtime, targetDir);
    }
  } else {
    log('\n📦 安装 bos-flow...', cyan);
    for (const runtime of runtimes) {
      await installToRuntime(runtime, targetDir);
    }
  }

  log('\n' + '='.repeat(60), cyan);
  log('  ✅ 完成！', green);
  log('='.repeat(60) + '\n', cyan);

  // 显示使用说明
  if (!hasUninstall) {
    log('📖 使用说明:\n', bold);
    log('  在 Claude Code 中使用:');
    log('    /bos-flow-help          查看帮助\n');
    log('    /kd-auto "任务描述"     自动研究SDK\n');
    log('    /kd-list                列出SDK模块\n');
    log('  或使用 CLI:');
    log('    bos-flow help');
    log('    bos-flow kd-auto "开发工作流功能" -d\n');
  }

  rl.close();
}

// 安装到全局和本地
async function installToAllLocations() {
  log('\n📦 安装到全局和本地...', cyan);

  const globalDir = os.homedir();
  const localDir = process.cwd();

  // 安装到全局
  log('\n--- 全局安装 ---', bold);
  for (const runtime of ['claude', 'opencode', 'gemini']) {
    await installToRuntime(runtime, globalDir);
  }

  // 安装到本地
  log('\n--- 本地安装 ---', bold);
  for (const runtime of ['claude']) {
    await installToRuntime(runtime, localDir);
  }

  log('\n✅ 所有安装完成', green);
}

// 错误处理
process.on('uncaughtException', (error) => {
  log(`\n❌ 错误: ${error.message}`, red);
  process.exit(1);
});

process.on('unhandledRejection', (error) => {
  log(`\n❌ 错误: ${error.message}`, red);
  process.exit(1);
});

// 运行主函数
main().catch((error) => {
  log(`\n❌ 安装失败: ${error.message}`, red);
  process.exit(1);
});
