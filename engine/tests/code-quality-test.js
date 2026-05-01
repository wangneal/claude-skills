/**
 * 代码质量检查测试套件
 */

const CodeQualityChecker = require('../lib/code-quality-checker');
const JavaDocGenerator = require('../lib/javadoc-generator');

console.log('========================================');
console.log('  代码质量检查测试套件');
console.log('========================================\n');

const checker = new CodeQualityChecker();
const testResults = {
  passed: 0,
  failed: 0,
  tests: []
};

// 测试 1: 魔法值检测
function test1_MagicValueDetection() {
  console.log('===== 测试 1: 魔法值检测 =====\n');

  const testCode = `
public class Test {
    public void test() {
        obj.set("status", "A");
        obj.set("name", "Test");
        logger.info("测试消息");  // 应该跳过
    }
}
`;

  const result = checker.checkMagicValues(testCode);

  const passed = result.length >= 2; // 应该检测到 2 个魔法值

  testResults.tests.push({
    name: '魔法值检测',
    passed,
    details: `检测到 ${result.length} 个魔法值`
  });

  if (passed) {
    testResults.passed++;
    console.log('✓ 测试通过');
    console.log(`检测到 ${result.length} 个魔法值:`);
    result.forEach(issue => {
      console.log(`  - ${issue.message}`);
    });
  } else {
    testResults.failed++;
    console.log('✗ 测试失败');
    console.log('结果:', result);
  }

  console.log('');
  return passed;
}

// 测试 2: 异常处理检测
function test2_ExceptionHandlingDetection() {
  console.log('===== 测试 2: 异常处理检测 =====\n');

  const testCode = `
public class Test {
    public void test() {
        // 没有异常处理
    }
}
`;

  const result = checker.checkExceptionHandling(testCode);

  const passed = result.length > 0 && result[0].message.includes('未发现异常处理');

  testResults.tests.push({
    name: '异常处理检测',
    passed,
    details: `检测到 ${result.length} 个问题`
  });

  if (passed) {
    testResults.passed++;
    console.log('✓ 测试通过');
    console.log(`检测到缺少异常处理`);
  } else {
    testResults.failed++;
    console.log('✗ 测试失败');
    console.log('结果:', result);
  }

  console.log('');
  return passed;
}

// 测试 3: 完整检查
function test3_CompleteCheck() {
  console.log('===== 测试 3: 完整检查 =====\n');

  const testCode = `
public class TestPlugin {
    private static final Logger logger = Log.getLogger(TestPlugin.class);

    public void test() {
        try {
            obj.set("status", "A");
            logger.info("处理完成");
        } catch (Exception e) {
            logger.error("处理失败", e);
        }
    }
}
`;

  const result = checker.checkAll(testCode);

  const passed = result.details !== null && result.summary !== null;

  testResults.tests.push({
    name: '完整检查',
    passed,
    details: `总问题数: ${result.summary.total}`
  });

  if (passed) {
    testResults.passed++;
    console.log('✓ 测试通过');
    console.log('检查结果:');
    console.log(`  - 总问题数: ${result.summary.total}`);
    console.log(`  - 错误: ${result.summary.errors}`);
    console.log(`  - 警告: ${result.summary.warnings}`);
    console.log('\n详细报告:');
    console.log(checker.generateReport(result));
  } else {
    testResults.failed++;
    console.log('✗ 测试失败');
  }

  console.log('');
  return passed;
}

// 测试 4: JavaDoc 生成
function test4_JavaDocGeneration() {
  console.log('===== 测试 4: JavaDoc 生成 =====\n');

  const generator = new JavaDocGenerator();

  // 测试类注释生成
  const classDoc = generator.generateClassDoc({
    className: 'TestPlugin',
    description: '测试插件',
    author: 'Test',
    date: '2026-04-30'
  });

  // 测试方法注释生成
  const methodDoc = generator.generateMethodDoc({
    description: '处理数据',
    purpose: '执行数据处理操作',
    params: [
      { name: 'data', description: '数据对象' },
      { name: 'type', description: '处理类型' }
    ],
    returnValue: '处理结果'
  });

  const hasClassDoc = classDoc.includes('TestPlugin') && classDoc.includes('测试插件');
  const hasMethodDoc = methodDoc.includes('处理数据') && methodDoc.includes('@param');

  const passed = hasClassDoc && hasMethodDoc;

  testResults.tests.push({
    name: 'JavaDoc 生成',
    passed,
    details: `类注释: ${hasClassDoc ? '✓' : '✗'}, 方法注释: ${hasMethodDoc ? '✓' : '✗'}`
  });

  if (passed) {
    testResults.passed++;
    console.log('✓ 测试通过');
    console.log('\n生成的类注释:');
    console.log(classDoc);
    console.log('\n生成的方法注释:');
    console.log(methodDoc);
  } else {
    testResults.failed++;
    console.log('✗ 测试失败');
  }

  console.log('');
  return passed;
}

// 测试 5: 命名规范检查
function test5_NamingConventionCheck() {
  console.log('===== 测试 5: 命名规范检查 =====\n');

  const testCode = `
public class testPlugin {  // 应该首字母大写
    public void Method() {  // 应该首字母小写
    }

    private static final String constant = "value";  // 应该全大写
}
`;

  const result = checker.checkNamingConventions(testCode);

  const passed = result.length >= 2; // 应该检测到至少 2 个命名问题

  testResults.tests.push({
    name: '命名规范检查',
    passed,
    details: `检测到 ${result.length} 个命名问题`
  });

  if (passed) {
    testResults.passed++;
    console.log('✓ 测试通过');
    console.log(`检测到 ${result.length} 个命名问题:`);
    result.forEach(issue => {
      console.log(`  - ${issue.message}`);
    });
  } else {
    testResults.failed++;
    console.log('✗ 测试失败');
    console.log('结果:', result);
  }

  console.log('');
  return passed;
}

// 运行所有测试
test1_MagicValueDetection();
test2_ExceptionHandlingDetection();
test3_CompleteCheck();
test4_JavaDocGeneration();
test5_NamingConventionCheck();

// 输出总结
console.log('========================================');
console.log('  测试结果汇总');
console.log('========================================');
console.log(`总计: ${testResults.passed + testResults.failed} 个测试`);
console.log(`✓ 通过: ${testResults.passed}`);
console.log(`✗ 失败: ${testResults.failed}`);
console.log(`通过率: ${((testResults.passed / (testResults.passed + testResults.failed)) * 100).toFixed(1)}%`);
console.log('\n详细结果:');
testResults.tests.forEach((test, index) => {
  console.log(`${index + 1}. ${test.name}: ${test.passed ? '✓ 通过' : '✗ 失败'}`);
  if (test.details) {
    console.log(`   ${test.details}`);
  }
});

const allPassed = testResults.failed === 0;
process.exit(allPassed ? 0 : 1);
