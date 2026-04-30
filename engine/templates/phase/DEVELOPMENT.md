# 开发阶段 (Development Phase)

**项目名称:** [填写项目名称]
**阶段:** 开发阶段
**开始日期:** [YYYY-MM-DD]
**负责人:** [填写负责人]

---

## 1. 代码规范

### 1.1 命名规范

**类命名:**
- 使用 PascalCase
- 类名应清晰表达用途
- 示例: `WorkflowApprovalPlugin`, `DataValidator`

**方法命名:**
- 使用 PascalCase
- 方法名应清晰表达行为
- 示例: `ValidateFormData()`, `SubmitToWorkflow()`

**变量命名:**
- 使用 camelCase
- 变量名应具有描述性
- 示例: `formData`, `workflowInstance`

**常量命名:**
- 使用全大写，下划线分隔
- 示例: `MAX_RETRY_COUNT`, `DEFAULT_TIMEOUT`

### 1.2 注释规范

**类注释:**
```csharp
/// <summary>
/// [类用途说明]
/// </summary>
public class ClassName
{
    // ...
}
```

**方法注释:**
```csharp
/// <summary>
/// [方法功能说明]
/// </summary>
/// <param name="paramName">[参数说明]</param>
/// <returns>[返回值说明]</returns>
public ReturnType MethodName(ParamType paramName)
{
    // ...
}
```

**代码块注释:**
```csharp
// [功能说明]
// [重要逻辑说明]
```

### 1.3 异常处理

**异常捕获:**
```csharp
try
{
    // 业务逻辑
}
catch (KDException ex)
{
    // 记录日志
    Logger.Error(ex, "操作失败: {Message}", ex.Message);
    // 向上抛出或处理
    throw;
}
```

**错误日志:**
- 记录异常类型、消息、堆栈
- 记录关键参数值
- 使用统一的日志格式

---

## 2. SDK 使用规范

### 2.1 DynamicObject 使用

**读取字段值:**
```csharp
DynamicObject obj = (DynamicObject)this.Model.DataObject;
object value = obj["fieldname"];
```

**设置字段值:**
```csharp
DynamicObject obj = (DynamicObject)this.Model.DataObject;
obj["fieldname"] = newValue;
```

**注意事项:**
- 检查字段是否存在
- 验证字段类型
- 处理 null 值

### 2.2 工作流操作

**启动工作流:**
```csharp
WorkflowServiceHelper.StartWorkflow(billNo, billId);
```

**提交审批:**
```csharp
WorkflowServiceHelper.SubmitToWorkflow(billNo, billId);
```

**注意事项:**
- 验证单据状态
- 处理审批异常
- 记录操作日志

---

## 3. 单元测试

### 3.1 测试模板

```csharp
[TestClass]
public class ClassNameTests
{
    [TestMethod]
    public void MethodName_Should_ReturnExpectedValue_When_Condition()
    {
        // Arrange (准备)
        var input = "test";
        var expected = "expected";

        // Act (执行)
        var result = new ClassName().MethodName(input);

        // Assert (断言)
        Assert.AreEqual(expected, result);
    }

    [TestMethod]
    public void MethodName_Should_ThrowException_When_InvalidInput()
    {
        // Arrange
        var invalidInput = "";

        // Act & Assert
        Assert.ThrowsException<ArgumentException>(() =>
        {
            new ClassName().MethodName(invalidInput);
        });
    }
}
```

### 3.2 测试覆盖要求

- [ ] 正常场景测试
- [ ] 边界条件测试
- [ ] 异常场景测试
- [ ] 性能测试 (如需要)

---

## 4. 集成测试

### 4.1 测试清单

| 测试项 | 测试内容 | 预期结果 | 状态 |
|--------|---------|---------|------|
| IT-01 | [测试内容] | [预期结果] | [ ] |
| IT-02 | [测试内容] | [预期结果] | [ ] |

### 4.2 测试环境

**数据库:**
- [测试数据库连接字符串]
- 测试数据准备

**应用服务器:**
- [应用服务器地址]
- 配置检查

---

## 5. 代码审查清单

### 5.1 功能检查

- [ ] 功能是否符合需求
- [ ] 边界条件是否处理
- [ ] 异常处理是否完整
- [ ] 日志是否充足

### 5.2 代码质量检查

- [ ] 命名是否清晰
- [ ] 注释是否充分
- [ ] 代码结构是否清晰
- [ ] 是否有重复代码

### 5.3 性能检查

- [ ] 是否有性能瓶颈
- [ ] 数据库查询是否优化
- [ ] 是否有不必要的循环

### 5.4 安全检查

- [ ] 输入验证是否完整
- [ ] 权限检查是否到位
- [ ] 敏感数据是否加密

---

## 6. 进度跟踪

| 任务 | 计划完成日期 | 实际完成日期 | 状态 | 备注 |
|------|------------|------------|------|------|
| [任务名] | [YYYY-MM-DD] | [YYYY-MM-DD] | 进行中/已完成 | [备注] |
| [任务名] | [YYYY-MM-DD] | [YYYY-MM-DD] | 进行中/已完成 | [备注] |

---

## 7. 开发规范检查清单

**使用规范检查器验证代码：**

```bash
# 检查代码规范
node .bos-flow/lib/standards-checker.js <文件路径>
```

### 7.1 命名规范检查

- [ ] 所有类名使用 PascalCase（如 `WorkflowService`, `DataValidator`）
- [ ] 所有方法名使用 PascalCase，以动词开头（如 `GetFormData()`, `SubmitToWorkflow()`）
- [ ] 所有局部变量使用 camelCase（如 `formData`, `billNo`）
- [ ] 所有常量使用全大写+下划线（如 `MAX_COUNT`, `DEFAULT_TIMEOUT`）
- [ ] 避免使用缩写和类型前缀（如 `strBillNo`, `objData`）

### 7.2 代码格式检查

- [ ] 使用 4 空格缩进（不使用 Tab）
- [ ] 大括号独占一行（Allman 风格）
- [ ] 运算符两侧有空格
- [ ] 逗号后有空格
- [ ] 方法间有 1 个空行
- [ ] 行长度不超过 120 字符

### 7.3 注释规范检查

- [ ] 所有公共类有 XML 文档注释（`<summary>`）
- [ ] 所有公共方法有完整的 XML 注释（包括参数和返回值说明）
- [ ] 复杂逻辑有行内注释
- [ ] 注释内容清晰、准确
- [ ] 没有注释掉的代码
- [ ] TODO/FIXME 有明确的描述

### 7.4 异常处理检查

- [ ] 使用具体的异常类型（不使用 `catch (Exception ex)`）
- [ ] 记录异常详细信息
- [ ] 不要吞掉异常
- [ ] 使用 `finally` 或 `using` 释放资源
- [ ] 异常消息对用户友好
- [ ] 保留原始异常堆栈

### 7.5 SDK 使用检查

- [ ] 检查字段存在性再读取
- [ ] 使用参数化查询防止 SQL 注入
- [ ] 使用事务保证数据一致性
- [ ] 检查权限后再执行操作
- [ ] 使用 `using` 释放资源

### 7.6 业务规则检查

- [ ] 单据状态流转符合业务规则
- [ ] 数据验证完整
- [ ] 权限检查到位
- [ ] 使用事务保证一致性
- [ ] 记录审计日志
- [ ] 处理并发冲突

**规范文档位置：** `.bos-flow/standards/`

**详细规范参考：**
- [命名规范](../.bos-flow/standards/naming-conventions.md)
- [代码格式](../.bos-flow/standards/code-format.md)
- [注释规范](../.bos-flow/standards/comments.md)
- [异常处理](../.bos-flow/standards/exception-handling.md)
- [SDK 使用](../.bos-flow/standards/sdk-usage.md)
- [业务规则](../.bos-flow/standards/business-rules.md)

---

## 8. 问题记录

| 问题编号 | 问题描述 | 发现日期 | 解决方案 | 解决日期 | 状态 |
|---------|---------|---------|---------|---------|------|
| P-01 | [问题描述] | [YYYY-MM-DD] | [解决方案] | [YYYY-MM-DD] | 已解决/未解决 |

---

**开发完成签字:**

_________________________
日期: [YYYY-MM-DD]
