/**
 * 代码生成测试套件
 *
 * 测试场景：
 * 1. 表单插件生成（增强版）
 * 2. 工作流插件生成（增强版）
 * 3. 常量引用功能
 * 4. 魔法值检测和替换
 */

const CodeGenerator = require('../lib/code-generator');
const ConstantResolver = require('../lib/constant-resolver');
const fs = require('fs');
const path = require('path');

const testResults = {
  passed: 0,
  failed: 0,
  tests: []
};

/**
 * 测试用例 1: 表单插件生成
 */
function test1_FormPluginGeneration() {
  console.log('\n===== 测试 1: 表单插件生成（增强版）=====\n');

  const generator = new CodeGenerator({ enhanced: true });
  const result = generator.generate('FormPlugin', {
    className: 'TestFormPlugin',
    packageName: 'com.test.plugin',
    description: '测试表单插件',
    author: 'Test',
    date: '2026-04-30'
  });

  // 验证点
  const checks = {
    hasLogger: result.code.includes('private static final Logger logger'),
    hasExceptionHandling: result.code.includes('try {') && result.code.includes('catch (Exception e)'),
    hasJavaDoc: result.code.includes('/**') && result.code.includes('* @param'),
    noMagicValues: !result.code.includes('"id"') && !result.code.includes('"name"'),
    hasConstantReference: result.code.includes('BaseCon.')
  };

  const passed = Object.values(checks).every(v => v);

  testResults.tests.push({
    name: '表单插件生成（增强版）',
    passed,
    checks
  });

  if (passed) {
    testResults.passed++;
    console.log('✓ 测试通过');
  } else {
    testResults.failed++;
    console.log('✗ 测试失败');
    console.log('检查项:', checks);
  }

  return passed;
}

/**
 * 测试用例 2: 工作流插件生成
 */
function test2_WorkflowPluginGeneration() {
  console.log('\n===== 测试 2: 工作流插件生成（增强版）=====\n');

  const generator = new CodeGenerator({ enhanced: true });
  const result = generator.generate('WorkflowPlugin', {
    className: 'TestWorkflowPlugin',
    packageName: 'com.test.plugin',
    description: '测试工作流插件',
    author: 'Test',
    date: '2026-04-30'
  });

  // 验证点
  const checks = {
    hasWorkflowMethods:
      result.code.includes('beforeStartWorkflow') &&
      result.code.includes('afterPassAudit') &&
      result.code.includes('afterEndWorkflow'),
    hasStateCheck: result.code.includes('validateDataIntegrity'),
    hasConstantReference: result.code.includes('BaseCon.'),
    hasExceptionHandling: result.code.includes('try {'),
    hasLogger: result.code.includes('private static final Logger logger')
  };

  const passed = Object.values(checks).every(v => v);

  testResults.tests.push({
    name: '工作流插件生成（增强版）',
    passed,
    checks
  });

  if (passed) {
    testResults.passed++;
    console.log('✓ 测试通过');
  } else {
    testResults.failed++;
    console.log('✗ 测试失败');
    console.log('检查项:', checks);
  }

  return passed;
}

/**
 * 测试用例 3: 常量引用
 */
function test3_ConstantReference() {
  console.log('\n===== 测试 3: 常量引用功能 =====\n');

  const testCode = `
public class Test {
    public void test(DynamicObject obj) {
        obj.set("status", "A");
        obj.set("name", "Test");
        String id = obj.getString("id");
    }
}
`;

  const resolver = new ConstantResolver(
    path.join(__dirname, '../references/constants-index.json')
  );

  const { code, report } = resolver.processCode(testCode);

  // 验证点
  const checks = {
    replaced: code.includes('BaseCon.STATUS') && code.includes('BaseCon.NAME') && code.includes('BaseCon.ID'),
    hasImport: code.includes('import la51.da6l2.base.common.constant.BaseCon'),
    replacedCount: report.replacedCount >= 3
  };

  const passed = Object.values(checks).every(v => v);

  testResults.tests.push({
    name: '常量引用功能',
    passed,
    checks
  });

  if (passed) {
    testResults.passed++;
    console.log('✓ 测试通过');
    console.log(`替换了 ${report.replacedCount} 个魔法值`);
  } else {
    testResults.failed++;
    console.log('✗ 测试失败');
    console.log('检查项:', checks);
  }

  return passed;
}

/**
 * 测试用例 4: 魔法值检测
 */
function test4_MagicValueDetection() {
  console.log('\n===== 测试 4: 魔法值检测 =====\n');

  const testCode = `
public class Test {
    public void test(DynamicObject obj) {
        String name = obj.getString("name");
        Long id = obj.getLong("id");
        Integer status = obj.getInt("status");
        logger.info("测试消息");  // 应该跳过
        throw new KDBizException("异常消息");  // 应该跳过
    }
}
`;

  const resolver = new ConstantResolver(
    path.join(__dirname, '../references/constants-index.json')
  );

  const magicValues = resolver.detectMagicValues(testCode);

  // 验证点
  const checks = {
    detectedCorrectCount: magicValues.length === 3, // name, id, status
    notLoggingMessages: !magicValues.some(mv => mv.value === '测试消息'),
    notExceptionMessages: !magicValues.some(mv => mv.value === '异常消息'),
    hasSuggestions: magicValues.every(mv => mv.suggestion !== null)
  };

  const passed = Object.values(checks).every(v => v);

  testResults.tests.push({
    name: '魔法值检测',
    passed,
    checks
  });

  if (passed) {
    testResults.passed++;
    console.log('✓ 测试通过');
    console.log(`正确检测到 ${magicValues.length} 个魔法值`);
  } else {
    testResults.failed++;
    console.log('✗ 测试失败');
    console.log('检测到的魔法值:', magicValues);
    console.log('检查项:', checks);
  }

  return passed;
}

/**
 * 测试用例 5: 生成并保存文件
 */
function test5_GenerateAndSave() {
  console.log('\n===== 测试 5: 生成并保存文件 =====\n');

  const generator = new CodeGenerator({ enhanced: true });
  const outputPath = path.join(__dirname, 'output', 'TestPlugin.java');

  try {
    const { filePath, report } = generator.generateAndSave('FormPlugin', {
      className: 'GeneratedTestPlugin',
      packageName: 'com.test.generated',
      description: '自动生成的测试插件',
      author: 'Test Runner',
      date: '2026-04-30'
    }, outputPath);

    // 验证文件存在
    const fileExists = fs.existsSync(filePath);
    const fileContent = fileExists ? fs.readFileSync(filePath, 'utf-8') : '';

    // 验证点
    const checks = {
      fileCreated: fileExists,
      hasCorrectClassName: fileContent.includes('class GeneratedTestPlugin'),
      hasPackage: fileContent.includes('package com.test.generated'),
      hasImports: fileContent.includes('import kd.bos'),
      reportGenerated: report !== null
    };

    const passed = Object.values(checks).every(v => v);

    testResults.tests.push({
      name: '生成并保存文件',
      passed,
      checks
    });

    if (passed) {
      testResults.passed++;
      console.log('✓ 测试通过');
      console.log(`文件已生成: ${filePath}`);
    } else {
      testResults.failed++;
      console.log('✗ 测试失败');
      console.log('检查项:', checks);
    }

    // 清理测试文件
    if (fileExists) {
      fs.unlinkSync(filePath);
    }

    return passed;
  } catch (error) {
    testResults.failed++;
    console.log('✗ 测试失败（异常）');
    console.log('错误:', error.message);

    testResults.tests.push({
      name: '生成并保存文件',
      passed: false,
      error: error.message
    });

    return false;
  }
}

/**
 * 测试用例 6: 报表插件生成
 */
function test6_ReportPluginGeneration() {
  console.log('\n===== 测试 6: 报表插件生成（增强版）=====\n');

  const generator = new CodeGenerator({ enhanced: true });
  const result = generator.generate('ReportPlugin', {
    className: 'TestReportPlugin',
    packageName: 'com.test.report',
    description: '测试报表插件',
    author: 'Test',
    date: '2026-04-30'
  });

  // 验证点
  const checks = {
    hasAlgoAPI: result.code.includes('Algo.create') &&
                 result.code.includes('DataSetBuilder'),
    hasRowMeta: result.code.includes('RowMeta') &&
                 result.code.includes('Field'),
    hasQFilter: result.code.includes('QFilter') &&
                 result.code.includes('QCP'),
    hasQueryMethod: result.code.includes('public DataSet query'),
    hasExceptionHandling: result.code.includes('try {') &&
                          result.code.includes('catch (Exception e)'),
    hasLogger: result.code.includes('private static final Logger logger'),
    hasJavaDoc: result.code.includes('/**') && result.code.includes('* @param'),
    hasFieldList: result.code.includes('private List<Field> fields'),
    hasConstantReference: result.code.includes('ReportCons.')
  };

  const passed = Object.values(checks).every(v => v);

  testResults.tests.push({
    name: '报表插件生成（增强版）',
    passed,
    checks
  });

  if (passed) {
    testResults.passed++;
    console.log('✓ 测试通过');
    console.log('包含 Algo API: ' + checks.hasAlgoAPI);
    console.log('包含 RowMeta: ' + checks.hasRowMeta);
    console.log('包含 QFilter: ' + checks.hasQFilter);
  } else {
    testResults.failed++;
    console.log('✗ 测试失败');
    console.log('检查项:', checks);
  }

  return passed;
}

/**
 * 测试用例 7: 列表插件生成
 */
function test7_ListPluginGeneration() {
  console.log('\n===== 测试 7: 列表插件生成（增强版）=====\n');

  const generator = new CodeGenerator({ enhanced: true });
  const result = generator.generate('ListPlugin', {
    className: 'TestListPlugin',
    packageName: 'com.test.list',
    description: '测试列表插件',
    author: 'Test',
    date: '2026-04-30'
  });

  // 验证点
  const checks = {
    hasQueryMethod: result.code.includes('queryListData'),
    hasTotalCount: result.code.includes('getTotalCount'),
    hasFilterBuilder: result.code.includes('buildQueryFilter'),
    hasSortBuilder: result.code.includes('buildSortCondition'),
    hasBeforeLoadData: result.code.includes('beforeLoadData'),
    hasAfterLoadData: result.code.includes('afterLoadData'),
    hasPagingSupport: result.code.includes('startRow') &&
                       result.code.includes('pageSize') &&
                       result.code.includes('validatePageSize'),
    hasExceptionHandling: result.code.includes('try {') &&
                          result.code.includes('catch (Exception e)'),
    hasLogger: result.code.includes('private static final Logger logger'),
    hasJavaDoc: result.code.includes('/**') && result.code.includes('* @param'),
    hasConstantReference: result.code.includes('ListCons.') &&
                          result.code.includes('BaseCon.')
  };

  const passed = Object.values(checks).every(v => v);

  testResults.tests.push({
    name: '列表插件生成（增强版）',
    passed,
    checks
  });

  if (passed) {
    testResults.passed++;
    console.log('✓ 测试通过');
    console.log('包含查询方法: ' + checks.hasQueryMethod);
    console.log('包含总记录数: ' + checks.hasTotalCount);
    console.log('包含分页支持: ' + checks.hasPagingSupport);
    console.log('包含常量引用: ' + checks.hasConstantReference);
  } else {
    testResults.failed++;
    console.log('✗ 测试失败');
    console.log('检查项:', checks);
  }

  return passed;
}

/**
 * 运行所有测试
 */
function runAllTests() {
  console.log('========================================');
  console.log('  代码生成测试套件');
  console.log('========================================');

  test1_FormPluginGeneration();
  test2_WorkflowPluginGeneration();
  test3_ConstantReference();
  test4_MagicValueDetection();
  test5_GenerateAndSave();
  test6_ReportPluginGeneration();
  test7_ListPluginGeneration();

  console.log('\n========================================');
  console.log('  测试结果汇总');
  console.log('========================================');
  console.log(`总计: ${testResults.passed + testResults.failed} 个测试`);
  console.log(`✓ 通过: ${testResults.passed}`);
  console.log(`✗ 失败: ${testResults.failed}`);
  console.log(`通过率: ${((testResults.passed / (testResults.passed + testResults.failed)) * 100).toFixed(1)}%`);
  console.log('\n详细结果:');
  testResults.tests.forEach((test, index) => {
    console.log(`${index + 1}. ${test.name}: ${test.passed ? '✓ 通过' : '✗ 失败'}`);
  });

  return testResults.failed === 0;
}

// 执行测试
const allPassed = runAllTests();
process.exit(allPassed ? 0 : 1);
