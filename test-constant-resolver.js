/**
 * 常量解析器测试
 */

const ConstantResolver = require('./engine/lib/constant-resolver');
const path = require('path');

// 测试用例 1: 基本常量解析
console.log('===== 测试 1: 基本常量解析 =====');
const resolver1 = new ConstantResolver(
  path.join(__dirname, 'engine/references/constants-index.json')
);

// 测试常见字段
const testValues = ['id', 'name', 'status', 'workshop'];
testValues.forEach(value => {
  const result = resolver1.resolveConstant(value);
  if (result) {
    console.log(`✓ "${value}" -> ${result.className}.${result.fieldName}`);
    console.log(`  描述: ${result.description}`);
  } else {
    console.log(`✗ "${value}" 未找到匹配的常量`);
  }
});

// 测试用例 2: 魔法值检测
console.log('\n===== 测试 2: 魔法值检测 =====');
const testCode = `
package com.example;

import kd.bos.dataentity.entity.DynamicObject;

public class TestPlugin {
    public void test(DynamicObject obj) {
        String name = obj.getString("name");
        Long id = obj.getLong("id");
        String status = obj.getString("status");

        if ("A".equals(status)) {
            obj.set("status", "B");
        }

        obj.set("workshop", "WS001");
    }
}
`;

const resolver2 = new ConstantResolver(
  path.join(__dirname, 'engine/references/constants-index.json')
);

const magicValues = resolver2.detectMagicValues(testCode);
console.log(`检测到 ${magicValues.length} 个魔法值:`);
magicValues.forEach((mv, index) => {
  console.log(`  ${index + 1}. 第 ${mv.line} 行: "${mv.value}" (${mv.type})`);
  if (mv.suggestion) {
    console.log(`     建议: ${mv.suggestion.className}.${mv.suggestion.fieldName}`);
  }
});

// 测试用例 3: 自动替换
console.log('\n===== 测试 3: 自动替换 =====');
const { code: processedCode, report } = resolver2.processCode(testCode);

console.log('处理报告:');
console.log(`  总魔法值: ${report.totalMagicValues}`);
console.log(`  已替换: ${report.replacedCount}`);
console.log(`  未替换: ${report.unreplacedCount}`);
console.log(`  添加导入: ${report.importsAdded}`);

console.log('\n处理后的代码:');
console.log(processedCode);

// 测试用例 4: 上下文感知解析
console.log('\n===== 测试 4: 上下文感知解析 =====');
const resolver3 = new ConstantResolver(
  path.join(__dirname, 'engine/references/constants-index.json')
);

const contextTests = [
  { value: 'qty', context: 'productCapacity' },
  { value: 'workshop', context: 'capacityReport' },
  { value: 'process', context: 'plan' }
];

contextTests.forEach(test => {
  const result = resolver3.resolveConstantWithContext(test.value, test.context);
  if (result) {
    console.log(`✓ 上下文 "${test.context}" + "${test.value}" -> ${result.className}.${result.fieldName}`);
  } else {
    console.log(`✗ 上下文 "${test.context}" + "${test.value}" 未找到匹配`);
  }
});

console.log('\n===== 测试完成 =====');
