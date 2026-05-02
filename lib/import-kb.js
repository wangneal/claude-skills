/**
 * 金蝶知识库导入器
 * 从导出的JSONL文件导入到社区内容存储
 */

const fs = require('fs-extra');
const path = require('path');

const COMMUNITY_CONTENT_FILE = path.join(__dirname, '..', 'community', 'content.json');

const SOURCE_DIR = 'C:/Users/Neal/Desktop/test';

// 产品分类映射
const PRODUCT_CATEGORY_MAP = {
  'kb_xinghan': '星瀚',
  'kb_xinghan_vip': '星瀚企业版',
  'kb_aisuite': '星空旗舰版',
  'kb_cloud': '星空企业版',
  'kb_xingchen': '星辰',
  'kb_eas': 'EAS',
  'kb_shr': 'SHR',
  'kb_devcommunity': '开发者社区',
  'kb_local_help': '本地帮助'
};

/**
 * 从JSONL文件读取数据
 */
function readJSONL(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const lines = content.split('\n').filter(line => line.trim());

  return lines.map(line => {
    try {
      return JSON.parse(line);
    } catch (e) {
      return null;
    }
  }).filter(item => item !== null);
}

/**
 * 转换金蝶知识库为社区格式
 */
function transformToCommunityFormat(items, productKey) {
  const category = PRODUCT_CATEGORY_MAP[productKey] || productKey;

  const articles = [];
  const qa = [];
  const knowledge = [];

  for (const item of items) {
    // 标准化字段
    const normalized = {
      id: item.id || `kb_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      title: item.title || '',
      category: item.product || category,
      author: item.author || '金蝶知识库',
      publishDate: item.date || item.crawled_at || new Date().toISOString(),
      content: item.content || '',
      tags: item.tags || [],
      url: item.url || '',
      product: item.product || productKey
    };

    // 根据type分类存储
    if (item.type === 'question' || item.type === 'qa') {
      qa.push({
        id: normalized.id,
        question: normalized.title,
        answer: normalized.content,
        category: normalized.category,
        votes: 0,
        url: normalized.url
      });
    } else if (item.type === 'knowledge' || !item.type) {
      knowledge.push({
        id: normalized.id,
        title: normalized.title,
        type: 'feature',
        content: normalized.content,
        category: normalized.category,
        url: normalized.url
      });
    } else {
      // 其他类型作为文章
      articles.push(normalized);
    }
  }

  return { articles, qa, knowledge };
}

/**
 * 导入主函数
 */
async function importKnowledgeBase(options = {}) {
  const {
    products = null, // 指定产品，null表示全部
    limit = null // 限制每产品数量，null表示全部
  } = options;

  console.log('=== 金蝶知识库导入器 ===\n');

  // 读取manifest
  const manifest = JSON.parse(fs.readFileSync(path.join(SOURCE_DIR, 'kd_kb_manifest.json'), 'utf-8'));

  console.log(`总文章数: ${manifest.total_articles}`);
  console.log(`产品数: ${manifest.products.length}\n`);

  let allArticles = [];
  let allQA = [];
  let allKnowledge = [];

  // 遍历产品
  for (const product of manifest.products) {
    // 过滤指定产品
    if (products && !products.includes(product.key)) {
      continue;
    }

    const filePath = path.join(SOURCE_DIR, product.file);
    if (!fs.existsSync(filePath)) {
      console.warn(`[跳过] 文件不存在: ${product.file}`);
      continue;
    }

    console.log(`[处理] ${product.name} (${product.key})...`);

    // 读取数据
    const items = readJSONL(filePath);

    // 限制数量
    const limitedItems = limit ? items.slice(0, limit) : items;

    // 转换格式
    const transformed = transformToCommunityFormat(limitedItems, product.key);

    allArticles.push(...transformed.articles);
    allQA.push(...transformed.qa);
    allKnowledge.push(...transformed.knowledge);

    console.log(`  - 文章: ${transformed.articles.length}`);
    console.log(`  - 问答: ${transformed.qa.length}`);
    console.log(`  - 知识: ${transformed.knowledge.length}`);
  }

  console.log(`\n=== 汇总 ===`);
  console.log(`总文章: ${allArticles.length}`);
  console.log(`总问答: ${allQA.length}`);
  console.log(`总知识: ${allKnowledge.length}`);

  // 保存到社区存储
  const content = {
    articles: allArticles,
    qa: allQA,
    knowledge: allKnowledge,
    importedAt: new Date().toISOString(),
    source: '金蝶知识库导出',
    total: allArticles.length + allQA.length + allKnowledge.length
  };

  await fs.writeJson(COMMUNITY_CONTENT_FILE, content, { spaces: 2 });

  console.log(`\n✓ 已导入到: ${COMMUNITY_CONTENT_FILE}`);

  return {
    articles: allArticles.length,
    qa: allQA.length,
    knowledge: allKnowledge.length,
    total: content.total
  };
}

// CLI 入口
async function main() {
  const args = process.argv.slice(2);

  let options = {
    products: null,
    limit: null
  };

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];

    if (arg === '--help' || arg === '-h') {
      console.log(`
=== 金蝶知识库导入器 ===

用法: node import-kb.js [选项]

选项:
  --products <key1,key2>  指定产品（逗号分隔），默认全部
  --limit <数量>          每产品限制数量，默认全部
  --list                  列出所有产品
  --help                  显示帮助

示例:
  node import-kb.js                          # 导入全部
  node import-kb.js --products kb_cloud      # 仅导入星空企业版
  node import-kb.js --limit 100              # 每产品仅导入100条
  node import-kb.js --products kb_devcommunity,kb_xinghan --limit 500
`);
      return;
    }

    if (arg === '--list') {
      const manifest = JSON.parse(fs.readFileSync(path.join(SOURCE_DIR, 'kd_kb_manifest.json'), 'utf-8'));
      console.log('可用产品:');
      for (const p of manifest.products) {
        console.log(`  ${p.key} - ${p.name} (${p.articles}篇)`);
      }
      return;
    }

    if (arg === '--products' && args[i + 1]) {
      options.products = args[++i].split(',');
    }

    if (arg === '--limit' && args[i + 1]) {
      options.limit = parseInt(args[++i], 10);
    }
  }

  await importKnowledgeBase(options);
}

module.exports = { importKnowledgeBase };

if (require.main === module) {
  main().catch(err => {
    console.error('错误:', err.message);
    process.exit(1);
  });
}