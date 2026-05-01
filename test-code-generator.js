/**
 * 代码生成器测试
 */

const CodeGenerator = require('./engine/lib/code-generator');
const path = require('path');
const fs = require('fs');

console.log('===== 测试 1: 表单插件生成（增强版）=====\n');

const generator1 = new CodeGenerator({
  enhanced: true,
  autoConstant: true
});

const result1 = generator1.generate('FormPlugin', {
  className: 'SalesOrderFormPlugin',
  packageName: 'com.example.sales.plugin',
  description: '销售订单表单插件',
  author: 'Test Developer',
  date: '2026-04-30'
});

console.log('生成报告:');
console.log(JSON.stringify(result1.report, null, 2));
console.log('\n生成的代码预览（前 100 行）:');
const lines1 = result1.code.split('\n').slice(0, 100);
console.log(lines1.join('\n'));

console.log('\n\n===== 测试 2: 工作流插件生成（增强版）=====\n');

const generator2 = new CodeGenerator({
  enhanced: true,
  autoConstant: true
});

const result2 = generator2.generate('WorkflowPlugin', {
  className: 'ApprovalWorkflowPlugin',
  packageName: 'com.example.approval.plugin',
  description: '审批工作流插件',
  author: 'Test Developer',
  date: '2026-04-30'
});

console.log('生成报告:');
console.log(JSON.stringify(result2.report, null, 2));
console.log('\n生成的代码预览（前 100 行）:');
const lines2 = result2.code.split('\n').slice(0, 100);
console.log(lines2.join('\n'));

console.log('\n\n===== 测试 3: 列出可用模板 =====\n');

const generator3 = new CodeGenerator();
const templates = generator3.listAvailableTemplates();

console.log('可用模板:');
templates.forEach(t => {
  console.log(`  - ${t.type}${t.enhanced ? ' (Enhanced)' : ''}: ${t.file}`);
});

console.log('\n\n===== 测试完成 =====');
