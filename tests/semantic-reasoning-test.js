/**
 * 语义推理引擎测试套件
 */

const assert = require('assert');
const { SemanticReasoningEngine, ChineseTokenizer } = require('../lib/semantic-reasoning-engine.js');

// 测试数据
const terminologyDictionary = require('../lib/terminology-dictionary.json');

console.log('=== 语义推理引擎测试套件 ===\n');

// 测试 1: 向量生成
function testVectorGeneration() {
  console.log('Test 1: 向量生成');
  const engine = new SemanticReasoningEngine(null, terminologyDictionary);
  const vector = engine.generateVector('销售订单审批流程');

  assert(vector.length > 0, '向量长度应大于 0');
  console.log('  ✓ 向量生成成功，长度:', vector.length);
}

// 测试 2: 相似度搜索
function testSimilaritySearch() {
  console.log('\nTest 2: 相似度搜索');
  const engine = new SemanticReasoningEngine(null, terminologyDictionary);

  const documents = [
    '客户订单管理',
    '供应商采购',
    '库存物料查询',
    '财务报表生成',
    '权限审批流程'
  ];

  const results = engine.findSimilar('订单管理', documents, 3);

  assert(results.length > 0, '应返回结果');
  assert(results[0].score >= results[1].score, '结果应按相似度排序');
  console.log('  ✓ 相似度搜索成功');
  console.log('    Top result:', results[0].document, '(score:', results[0].score.toFixed(3), ')');
}

// 测试 3: 隐含需求推断
function testImplicitNeedsInference() {
  console.log('\nTest 3: 隐含需求推断');
  const engine = new SemanticReasoningEngine(null, terminologyDictionary);

  // 测试审批场景
  const approvalResult = engine.inferImplicitNeeds('需要实现销售订单的审批流程');
  assert(approvalResult.length > 0, '应推断出隐含需求');

  const hasPermission = approvalResult.some(n => n.description.includes('权限'));
  const hasWorkflow = approvalResult.some(n => n.description.includes('工作流'));

  assert(hasPermission, '应包含权限检查');
  assert(hasWorkflow, '应包含工作流服务');

  console.log('  ✓ 审批需求推断成功');
  console.log('    推断出', approvalResult.length, '个隐含需求');

  // 测试保存场景
  const saveResult = engine.inferImplicitNeeds('保存客户信息');
  const hasValidation = saveResult.some(n => n.description.includes('验证'));
  assert(hasValidation, '保存应推断出验证需求');
  console.log('  ✓ 保存需求推断成功');
}

// 测试 4: 中文分词
function testChineseTokenization() {
  console.log('\nTest 4: 中文分词');
  const tokenizer = new ChineseTokenizer(terminologyDictionary);

  const tokens = tokenizer.tokenize('销售订单审批流程');
  assert(tokens.length > 0, '分词结果应非空');

  console.log('  ✓ 分词成功');
  console.log('    输入: 销售订单审批流程');
  console.log('    分词:', tokens.join(', '));

  // 测试术语保护
  const tokens2 = tokenizer.tokenize('客户信息和销售订单管理');
  const hasCustomer = tokens2.includes('客户');
  console.log('  ✓ 术语识别完成');
}

// 测试 5: 解释推断结果
function testExplainInference() {
  console.log('\nTest 5: 解释推断结果');
  const engine = new SemanticReasoningEngine(null, terminologyDictionary);

  const need = {
    description: '需要权限检查',
    sdk_services: ['PermissionServiceHelper'],
    confidence: 0.8,
    rule_id: 'test_rule'
  };

  const explanation = engine.explainInference(need);
  assert(explanation.includes('权限检查'), '解释应包含需求描述');
  assert(explanation.includes('PermissionServiceHelper'), '解释应包含 SDK 服务');

  console.log('  ✓ 推断解释生成成功');
  console.log('    ', explanation.split('\n')[0]);
}

// 运行所有测试
try {
  testVectorGeneration();
  testSimilaritySearch();
  testImplicitNeedsInference();
  testChineseTokenization();
  testExplainInference();

  console.log('\n=== 所有测试通过 ===');
} catch (error) {
  console.error('\n❌ 测试失败:', error.message);
  process.exit(1);
}