const Fuse = require('fuse.js');
const fs = require('fs-extra');
const path = require('path');

const INDEX_FILE = path.join(__dirname, '..', 'sdk', 'modules.json');
const SDK_DIR = path.join(__dirname, '..', 'sdk');

// Fuse.js 配置
const FUSE_OPTIONS = {
  includeScore: true,
  includeMatches: true,
  threshold: 0.3, // 匹配阈值 (0=精确, 1=宽松)
  maxPatternLength: 32,
  minMatchCharLength: 1
};

/**
 * 加载索引
 */
async function loadIndex() {
  const index = await fs.readJson(INDEX_FILE);
  return index;
}

/**
 * 搜索 SDK (综合搜索)
 */
async function searchSDK(query, options = {}) {
  const index = await loadIndex();
  const results = [];

  // 搜索类名
  if (options.searchClasses !== false) {
    const classResults = await searchByClass(query, index);
    results.push(...classResults);
  }

  // 搜索模块名
  if (options.searchModules !== false) {
    const moduleResults = await searchByModule(query, index);
    results.push(...moduleResults);
  }

  // 按匹配度排序
  results.sort((a, b) => a.score - b.score);

  // 限制结果数
  const limit = options.limit || 10;
  return results.slice(0, limit);
}

/**
 * 按类名搜索
 */
async function searchByClass(query, index) {
  // 构建类列表
  const classes = [];
  index.modules.forEach(module => {
    module.classes.forEach(cls => {
      classes.push({
        type: 'class',
        name: cls.name,
        module: module.name,
        path: cls.path,
        methods: cls.methods,
        summary: cls.summary || ''
      });
    });
  });

  // 使用 Fuse.js 模糊搜索
  const fuse = new Fuse(classes, {
    ...FUSE_OPTIONS,
    keys: ['name']
  });

  const results = fuse.search(query);

  return results.map(result => ({
    type: 'class',
    name: result.item.name,
    module: result.item.module,
    path: result.item.path,
    methods: result.item.methods,
    score: result.score,
    summary: result.item.summary,
    matchType: 'fuzzy'
  }));
}

/**
 * 按方法名搜索 (需要扫描文档内容)
 */
async function searchByMethod(query, index, options = {}) {
  const results = [];
  const limit = options.limit || 10;

  // 遍历所有类文档
  for (const module of index.modules) {
    for (const cls of module.classes) {
      const filePath = path.join(SDK_DIR, cls.path);

      if (!(await fs.pathExists(filePath))) continue;

      const content = await fs.readFile(filePath, 'utf8');

      // 搜索方法定义 (格式: ### methodName( 或 **methodName()
      const methodPattern = new RegExp(`###\\s+(${query}\\w*)\\s*\\(`, 'gi');
      let match;

      while ((match = methodPattern.exec(content)) !== null) {
        results.push({
          type: 'method',
          name: match[1],
          className: cls.name,
          module: module.name,
          path: cls.path,
          score: 0.1, // 精确匹配给高分
          matchType: 'exact'
        });

        if (results.length >= limit) break;
      }

      if (results.length >= limit) break;
    }
    if (results.length >= limit) break;
  }

  return results;
}

/**
 * 按模块名搜索
 */
async function searchByModule(query, index) {
  const fuse = new Fuse(index.modules, {
    ...FUSE_OPTIONS,
    keys: ['name', 'id']
  });

  const results = fuse.search(query);

  return results.map(result => ({
    type: 'module',
    name: result.item.name,
    id: result.item.id,
    path: result.item.path,
    classCount: result.item.classes.length,
    score: result.score,
    matchType: 'fuzzy'
  }));
}

/**
 * 获取文档内容
 */
async function getDocumentContent(docPath) {
  const filePath = path.join(SDK_DIR, docPath);
  if (await fs.pathExists(filePath)) {
    return await fs.readFile(filePath, 'utf8');
  }
  return null;
}

/**
 * 获取文档摘要 (前 N 行)
 */
async function getDocumentSummary(docPath, lineCount = 20) {
  const content = await getDocumentContent(docPath);
  if (!content) return null;

  const lines = content.split('\n').slice(0, lineCount);
  return lines.join('\n');
}

module.exports = {
  searchSDK,
  searchByClass,
  searchByMethod,
  searchByModule,
  getDocumentContent,
  getDocumentSummary,
  loadIndex
};

// 测试
if (require.main === module) {
  loadIndex().then(index => {
    console.log('Index loaded:', index.total_modules, 'modules,', index.total_classes, 'classes');
    return searchByClass('Dynamic', index);
  }).then(results => {
    console.log('\nSearch results for "Dynamic":');
    results.forEach(r => console.log(`  - ${r.name} (${r.module}) [${r.path}]`));
  }).catch(console.error);
}