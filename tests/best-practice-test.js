/**
 * 最佳实践测试套件
 */

const assert = require('assert');
const { BestPracticeLoader, BestPracticeRecommender } = require('../lib/best-practice-loader.js');

console.log('=== 最佳实践测试套件 ===\n');

// 测试 1: 加载最佳实践
async function testLoadPractices() {
  console.log('Test 1: 加载最佳实践');
  const loader = new BestPracticeLoader();
  const practices = await loader.loadPractices();

  assert(practices.length > 0, '应加载到最佳实践');
  console.log('  ✓ 加载成功, 共', practices.length, '条最佳实践');
}

// 测试 2: 关键词提取
async function testKeywordExtraction() {
  console.log('\nTest 2: 关键词提取');
  const loader = new BestPracticeLoader();
  await loader.loadPractices();
  const recommender = new BestPracticeRecommender(loader);

  const keywords = recommender.extractKeywords('需要实现销售订单的审批流程');
  assert(keywords.length > 0, '应提取到关键词');

  console.log('  ✓ 关键词提取成功');
  console.log('    关键词:', keywords.join(', '));
}

// 测试 3: 关键词匹配
async function testKeywordMatching() {
  console.log('\nTest 3: 关键词匹配');
  const loader = new BestPracticeLoader();
  await loader.loadPractices();
  const recommender = new BestPracticeRecommender(loader);
  await recommender.init();

  const result = await recommender.recommend('需要实现销售订单的审批流程');
  assert(result.length > 0, '应返回推荐结果');

  console.log('  ✓ 关键词匹配成功');
  console.log('    推荐:', result.length, '条');
  console.log('    Top:', result[0].practice.title);
}

// 测试 4: 代码示例获取
async function testCodeExampleRetrieval() {
  console.log('\nTest 4: 代码示例获取');
  const loader = new BestPracticeLoader();
  await loader.loadPractices();
  const recommender = new BestPracticeRecommender(loader);
  await recommender.init();

  const example = await recommender.getCodeExample('form-plugin-validation');
  // 示例文件可能不存在，返回 null 是正常的

  console.log('  ✓ 代码示例查询完成');
}

// 测试 5: 实践分类
async function testPracticeCategories() {
  console.log('\nTest 5: 实践分类');
  const loader = new BestPracticeLoader();
  await loader.loadPractices();

  const categories = {};
  for (const practice of loader.practices) {
    categories[practice.category] = (categories[practice.category] || 0) + 1;
  }

  console.log('  ✓ 分类统计:');
  for (const [cat, count] of Object.entries(categories)) {
    console.log(`    ${cat}: ${count}`);
  }
}

// 运行所有测试
(async () => {
  try {
    await testLoadPractices();
    await testKeywordExtraction();
    await testKeywordMatching();
    await testCodeExampleRetrieval();
    await testPracticeCategories();

    console.log('\n=== 所有测试通过 ===');
  } catch (error) {
    console.error('\n❌ 测试失败:', error.message);
    process.exit(1);
  }
})();