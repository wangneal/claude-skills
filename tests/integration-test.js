/**
 * 集成测试套件
 * 测试领域知识编排器的完整流程
 */

const assert = require('assert');
const { DomainKnowledgeOrchestrator } = require('../lib/domain-knowledge-orchestrator.js');

console.log('=== 集成测试套件 ===\n');

// 测试 1: 编排器初始化
async function testOrchestratorInit() {
  console.log('Test 1: 编排器初始化');
  const orch = new DomainKnowledgeOrchestrator({ basePath: '.' });
  const result = await orch.initialize();

  assert(result === true, '应成功初始化');
  assert(orch.status.initialized === true, '状态应为已初始化');
  console.log('  ✓ 初始化成功');
  console.log('    模块:', Object.entries(orch.status.modules).map(([k,v]) => `${k}:${v}`).join(', '));
}

// 测试 2: 获取状态
async function testGetStatus() {
  console.log('\nTest 2: 获取编排器状态');
  const orch = new DomainKnowledgeOrchestrator({ basePath: '.' });
  await orch.initialize();

  const status = orch.getStatus();

  assert(status.initialized === true, '应显示已初始化');
  assert(status.modules, '应包含模块状态');
  console.log('  ✓ 状态获取成功');
}

// 测试 3: 需求分析
async function testRequirementAnalysis() {
  console.log('\nTest 3: 需求分析');
  const orch = new DomainKnowledgeOrchestrator({ basePath: '.' });
  await orch.initialize();

  const requirement = '需要实现销售订单的审批流程';
  const result = await orch.analyzeRequirement(requirement);

  assert(result, '应返回分析结果');
  assert(result.keywords, '应包含关键词');
  console.log('  ✓ 需求分析成功');
  console.log('    关键词:', result.keywords.join(', '));
  console.log('    隐含需求:', result.implicit_needs?.length || 0);
  console.log('    最佳实践:', result.best_practices?.length || 0);
}

// 测试 4: 最佳实践推荐
async function testBestPracticeRecommendation() {
  console.log('\nTest 4: 最佳实践推荐');
  const orch = new DomainKnowledgeOrchestrator({ basePath: '.' });
  await orch.initialize();

  const requirement = '需要实现客户数据的验证和保存';
  const result = await orch.recommendBestPractice(requirement);

  assert(Array.isArray(result), '应返回数组');
  console.log('  ✓ 最佳实践推荐成功');
  console.log('    推荐:', result.length, '条');
  if (result.length > 0) {
    console.log('    Top:', result[0].title);
  }
}

// 测试 5: 知识流转
async function testKnowledgeFlow() {
  console.log('\nTest 5: 知识流转');
  const orch = new DomainKnowledgeOrchestrator({ basePath: '.' });
  await orch.initialize();

  // 执行一些操作
  await orch.analyzeRequirement('测试需求');
  await orch.recommendBestPractice('测试需求');

  const flow = orch.getKnowledgeFlow();

  assert(flow.length > 0, '应记录知识流转');
  console.log('  ✓ 知识流转记录成功');
  console.log('    记录数:', flow.length);
}

// 运行所有测试
(async () => {
  try {
    await testOrchestratorInit();
    await testGetStatus();
    await testRequirementAnalysis();
    await testBestPracticeRecommendation();
    await testKnowledgeFlow();

    console.log('\n=== 所有测试通过 ===');
  } catch (error) {
    console.error('\n❌ 测试失败:', error.message);
    process.exit(1);
  }
})();