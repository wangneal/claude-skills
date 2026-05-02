const fs = require('fs-extra');
const path = require('path');

const SDK_DIR = path.join(__dirname, '..', 'sdk');
const INDEX_FILE = path.join(SDK_DIR, 'modules.json');

/**
 * 扫描 SDK 目录，提取模块信息
 */
async function scanSDK() {
  const modules = [];
  let totalClasses = 0;
  let totalMethods = 0;

  // 读取 SDK 根目录文件
  const rootFiles = await fs.readdir(SDK_DIR);
  const rootMdFiles = rootFiles.filter(f => f.endsWith('.md'));

  console.log(`Found ${rootMdFiles.length} root documentation files`);

  // 扫描模块目录 (kd_bos, kd_bos_*, etc.)
  const dirs = await fs.readdir(SDK_DIR);
  const moduleDirs = [];
  for (const d of dirs) {
    if (d.startsWith('kd_')) {
      const fullPath = path.join(SDK_DIR, d);
      const stat = await fs.stat(fullPath);
      if (stat.isDirectory()) {
        moduleDirs.push(d);
      }
    }
  }

  console.log(`Found ${moduleDirs.length} module directories`);

  // 扫描每个模块
  for (const dir of moduleDirs) {
    const modulePath = path.join(SDK_DIR, dir);
    const moduleInfo = await scanModule(modulePath, dir);
    modules.push(moduleInfo);
    totalClasses += moduleInfo.classes.length;
    totalMethods += moduleInfo.classes.reduce((sum, c) => sum + c.methods, 0);
  }

  return {
    modules,
    total_modules: modules.length,
    total_classes: totalClasses,
    total_methods: totalMethods,
    generated_at: new Date().toISOString()
  };
}

/**
 * 扫描单个模块
 */
async function scanModule(modulePath, dirName) {
  const files = await fs.readdir(modulePath);
  const mdFiles = files.filter(f => f.endsWith('.md'));

  const classes = [];

  for (const file of mdFiles) {
    const filePath = path.join(modulePath, file);
    const content = await fs.readFile(filePath, 'utf8');

    // 提取类名 (从文件名或标题)
    const className = file.replace('.md', '');

    // 统计方法数 - 查找 "## 方法 (N 个)" 格式
    const methodHeaderMatch = content.match(/##\s+方法\s*\((\d+)\s*个\)/);
    let methodCount = 0;
    if (methodHeaderMatch) {
      methodCount = parseInt(methodHeaderMatch[1]);
    } else {
      // 备选：统计 ### `方法名` 格式
      const methodMatches = content.match(/###\s+`[^`]+`/g);
      methodCount = methodMatches ? methodMatches.length : 0;
    }

    classes.push({
      name: className,
      file: file,
      methods: methodCount,
      path: `${dirName}/${file}`
    });
  }

  return {
    id: dirName.replace(/_/g, '.'),
    name: extractModuleName(dirName),
    path: `${dirName}/`,
    classes
  };
}

/**
 * 提取模块名称
 */
function extractModuleName(dirName) {
  const nameMap = {
    'kd_bos': '核心框架',
    'kd_bos_db': '数据库',
    'kd_bos_workflow': '工作流',
    'kd_bos_permission': '权限服务',
    'kd_bos_algo': '算法',
    'kd_bos_algox': '算法扩展',
    'kd_bos_dlock': '分布式锁',
    'kd_bos_exception': '异常处理',
    'kd_bos_extplugin': '扩展插件',
    'kd_bos_fileservice': '文件服务',
    'kd_bos_formula': '公式',
    'kd_bos_id': 'ID服务',
    'kd_bos_logging': '日志'
  };
  return nameMap[dirName] || dirName;
}

/**
 * 构建索引并保存
 */
async function buildIndex() {
  console.log('Building SDK index...');

  const index = await scanSDK();

  await fs.writeJson(INDEX_FILE, index, { spaces: 2 });

  console.log(`Index built successfully:`);
  console.log(`  Modules: ${index.total_modules}`);
  console.log(`  Classes: ${index.total_classes}`);
  console.log(`  Methods: ${index.total_methods}`);
  console.log(`  Output: ${INDEX_FILE}`);

  return index;
}

module.exports = {
  buildIndex,
  scanSDK
};

// 如果直接运行
if (require.main === module) {
  buildIndex().catch(console.error);
}
