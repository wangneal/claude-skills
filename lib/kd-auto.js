/**
 * 自动化核心模块 - 协调整个自动化流程
 *
 * 流程：
 * 任务描述 → 提取关键词 → 搜索SDK → 生成约束 → 输出文件路径
 */

const fs = require('fs-extra');
const path = require('path');
const keywordExtractor = require('./kd-keyword-extractor');
const searchEngine = require('./kd-search-engine');
const constraintGenerator = require('./kd-constraint-generator');

class KDAuto {
  constructor() {
    this.constraintsDir = path.join(__dirname, '..', 'constraints');
  }

  /**
   * 执行自动化流程
   * @param {string} taskDescription - 任务描述
   * @param {Object} options - 选项
   * @returns {Promise<Object>} 执行结果
   */
  async execute(taskDescription, options = {}) {
    const outputDir = options.outputDir || this.constraintsDir;

    console.log('\n🚀 启动自动化SDK研究与约束生成\n');
    console.log(`任务描述: ${taskDescription}\n`);

    // 1. 提取关键词
    const keywords = keywordExtractor.extract(taskDescription);
    console.log(`关键词提取: ${keywords.join(', ')}\n`);

    if (keywords.length === 0) {
      console.log('⚠️  未提取到关键词，使用默认关键词: DynamicObject\n');
      keywords.push('DynamicObject');
    }

    // 2. 搜索相关SDK
    await searchEngine.init();
    const recommendations = await searchEngine.recommend(keywords, { limit: options.limit || 5 });

    if (recommendations.length === 0) {
      console.log('❌ 未找到相关的SDK类\n');
      return {
        success: false,
        message: '未找到相关的SDK类'
      };
    }

    console.log(`找到 ${recommendations.length} 个推荐类:\n`);
    recommendations.forEach((rec, i) => {
      console.log(`${i + 1}. ${rec.className} - 相关性: ${(rec.score * 100).toFixed(0)}%`);
      console.log(`   模块: ${rec.module}`);
      console.log(`   方法数: ${rec.methods}\n`);
    });

    // 3. 交互确认（可选）
    if (options.interactive) {
      const confirmed = await this.confirmRecommendations(recommendations);
      if (!confirmed) {
        console.log('❌ 用户取消操作\n');
        return {
          success: false,
          message: '用户取消操作'
        };
      }
    }

    // 4. 生成约束文件
    console.log('正在生成约束文件...\n');
    const generatedFiles = [];

    for (const rec of recommendations) {
      try {
        const files = await constraintGenerator.generate(rec.className, {
          outputDir: outputDir,
          format: options.deep ? 'all' : 'prompt'
        });
        generatedFiles.push(...files);
        console.log(`  ✓ ${rec.className} - ${files.length} 个文件`);
      } catch (error) {
        console.error(`  ✗ ${rec.className} - 生成失败: ${error.message}`);
      }
    }

    // 5. 生成综合约束文件
    const comprehensiveFile = await this.generateComprehensive(
      recommendations, taskDescription, outputDir
    );
    generatedFiles.push(comprehensiveFile);

    // 6. 输出结果
    console.log('\n✅ 自动化流程完成\n');
    console.log('📝 约束文件已生成:');
    generatedFiles.forEach(file => {
      console.log(`  - ${file}`);
    });

    console.log(`\n💡 在代码生成时，请使用约束文件:\n  ${comprehensiveFile}\n`);

    return {
      success: true,
      constraints: generatedFiles,
      recommendations,
      comprehensiveFile
    };
  }

  /**
   * 交互确认推荐结果
   * @param {Array} recommendations - 推荐列表
   * @returns {Promise<boolean>} 是否确认
   */
  async confirmRecommendations(recommendations) {
    // 简化版：总是返回 true
    // 在实际应用中，可以使用 readline 或 inquirer 进行交互
    return true;
  }

  /**
   * 生成综合约束文件
   * @param {Array} recommendations - 推荐列表
   * @param {string} taskDescription - 任务描述
   * @param {string} outputDir - 输出目录
   * @returns {Promise<string>} 文件路径
   */
  async generateComprehensive(recommendations, taskDescription, outputDir) {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-').substring(0, 19);
    const fileName = `auto-${timestamp}.prompt.md`;
    const filePath = path.join(outputDir, fileName);

    let content = `# 自动化SDK约束文件\n\n`;
    content += `> 此约束文件由 bos-flow kd-auto 命令自动生成\n`;
    content += `> 生成时间: ${new Date().toISOString()}\n\n`;

    content += `## 任务描述\n\n${taskDescription}\n\n`;

    content += `## 推荐SDK类 (${recommendations.length} 个)\n\n`;

    recommendations.forEach((rec, i) => {
      content += `### ${i + 1}. ${rec.className}\n\n`;
      content += `- **模块**: ${rec.module}\n`;
      content += `- **相关性**: ${(rec.score * 100).toFixed(0)}%\n`;
      content += `- **方法数**: ${rec.methods}\n`;
      content += `- **匹配关键词**: ${rec.matchedKeyword}\n\n`;
    });

    content += `## 使用说明\n\n`;
    content += `在生成代码时，请遵守以下约束：\n\n`;

    content += `### 1. 必须使用推荐的SDK类\n\n`;
    recommendations.forEach(rec => {
      content += `- 使用 \`${rec.className}\` 而不是其他类似的类名\n`;
    });

    content += `\n### 2. 查看详细约束文件\n\n`;
    recommendations.forEach(rec => {
      content += `- \`${rec.className}.prompt.md\` - ${rec.className} 的详细约束\n`;
    });

    content += `\n### 3. 方法使用规范\n\n`;
    content += `- 方法名必须与约束文件中定义的完全一致\n`;
    content += `- 参数类型必须与方法签名匹配\n`;
    content += `- 不要猜测或臆造不存在的方法\n\n`;

    content += `## 禁止事项\n\n`;
    content += `❌ **禁止**使用不在推荐列表中的SDK类\n`;
    content += `❌ **禁止**使用不存在的方法\n`;
    content += `❌ **禁止**使用错误的参数类型\n\n`;

    content += `---\n\n`;
    content += `*Generated by bos-flow kd-auto command*\n`;

    await fs.writeFile(filePath, content, 'utf8');

    return filePath;
  }
}

module.exports = new KDAuto();

// 测试
if (require.main === module) {
  const kdAuto = module.exports;

  const taskDescription = '开发工作流审批功能，需要启动工作流、提交审批、读取单据字段';

  kdAuto.execute(taskDescription, {
    deep: true,
    interactive: false
  }).catch(console.error);
}
