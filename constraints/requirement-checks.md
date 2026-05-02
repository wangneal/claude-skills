# Requirement Checks: bos-flow 需求质量检查清单

**Purpose:** 验证需求文档质量，确保需求明确、可测试、有边界、无范围蔓延。

**Usage:** 在需求确认阶段（spec-phase、discuss-phase）使用此清单检查需求质量。

---

## 1. 需求清晰度检查 (Clarity Check)

### 1.1 避免抽象词汇

**问题描述:**
需求中出现主观、模糊的词汇，无法客观验证。

**常见抽象词汇:**
- 用户友好、易用、简单、直观
- 高性能、快速、流畅
- 灵活、可扩展、模块化
- 合理、适当、良好

**示例对比:**

✗ **错误示例:**
```
Goal: 实现用户友好的登录界面
```

✓ **正确示例:**
```
Goal: 实现登录功能，用户输入正确的用户名和密码后，在 2 秒内成功登录并跳转到首页

Acceptance Criteria:
- [ ] 登录表单包含用户名、密码输入框和登录按钮
- [ ] 输入框有明确的标签和占位符提示
- [ ] 密码输入框有显示/隐藏切换功能
- [ ] 登录按钮在点击后显示加载状态
- [ ] 错误提示使用红色文字，位于表单上方
```

**验证方法:**
- 问"如何验证这个需求已满足？"
- 如果答案依赖于主观判断，说明需求不够清晰
- 使用量化指标替代抽象词汇

---

### 1.2 使用 SMART 原则

**问题描述:**
需求目标不符合 SMART 原则（Specific、Measurable、Achievable、Relevant、Time-bound）。

**SMART 检查清单:**

| 维度 | 问题 | 示例 |
|------|------|------|
| Specific | 目标是否具体？ | ✗ "提升性能" → ✓ "API 响应时间从 500ms 降低到 200ms" |
| Measurable | 是否可衡量？ | ✗ "改善用户体验" → ✓ "用户满意度评分从 3.5 提升到 4.5" |
| Achievable | 是否可实现？ | ✗ "零 Bug" → ✓ "严重 Bug 数量为 0，普通 Bug < 5" |
| Relevant | 是否相关？ | ✗ "支持 VR 功能"（与核心业务无关） → ✓ "支持手机验证码登录" |
| Time-bound | 是否有时限？ | ✗ "尽快完成" → ✓ "在 2 周内完成" |

**示例对比:**

✗ **错误示例:**
```
Goal: 提升系统性能
```

✓ **正确示例:**
```
Goal: 在 2026-05-15 前，将登录 API 的响应时间从当前的 500ms（P95）降低到 200ms（P95）

Acceptance Criteria:
- [ ] 登录 API 响应时间 < 200ms（P95）
- [ ] 支持 100 并发用户登录（P95 响应时间 < 500ms）
- [ ] 数据库查询时间 < 50ms
```

**验证方法:**
- 检查目标是否符合 SMART 的 5 个维度
- 如果某个维度缺失，补充相应信息

---

### 1.3 需求陈述完整性

**问题描述:**
需求陈述不完整，缺少关键信息。

**完整性检查:**
- [ ] 有明确的目标陈述（Goal）
- [ ] 有背景说明（Background）
- [ ] 有当前状态描述（Current State）
- [ ] 有目标状态描述（Target State）
- [ ] 有验收标准（Acceptance Criteria）

**示例对比:**

✗ **错误示例:**
```
Requirement: 用户登录功能
```

✓ **正确示例:**
```
Requirement 1: 用户名密码登录

Description: 用户可以使用用户名和密码进行登录

Current State:
- 未实现，用户需要联系管理员创建账号
- 无自助登录功能
- 用户痛点：注册流程繁琐，等待时间长

Target State:
- 用户可以通过登录页面自助登录
- 支持记住我功能（7 天免登录）
- 登录响应时间 < 2 秒

Acceptance Criteria:
- [ ] 用户输入正确的用户名和密码后成功登录
- [ ] 用户输入错误的密码时显示明确的错误提示
- [ ] 登录成功后跳转到首页
- [ ] "记住我"功能正常工作
```

**验证方法:**
- 检查需求是否包含完整的 5 个部分
- 如果缺少某部分，使用模板补充

---

## 2. 可测试性检查 (Testability Check)

### 2.1 验收标准可测试

**问题描述:**
验收标准模糊，验收时无法判断是否通过。

**示例对比:**

✗ **错误示例:**
```
Acceptance Criteria:
- [ ] 界面看起来合理
- [ ] 性能良好
- [ ] 用户体验优秀
```

✓ **正确示例:**
```
Acceptance Criteria:
- [ ] 所有按钮都有明确的 hover 状态（颜色变化或阴影）
- [ ] 登录 API 响应时间 < 2 秒（P95）
- [ ] 支持 100 并发用户登录（无失败）
- [ ] 用户满意度评分 ≥ 4.0（5 分制）
- [ ] 用户可以在 3 次点击内完成登录
```

**验证方法:**
- 问"验收人员如何判断这个 checkbox 是否勾选？"
- 如果答案依赖于主观判断，说明验收标准不够具体
- 使用量化指标或明确的通过条件

---

### 2.2 每个需求都有验收标准

**问题描述:**
部分需求缺少验收标准，无法验证。

**检查清单:**
- [ ] 每个需求都有至少 3 个验收标准
- [ ] 验收标准使用 checkbox 格式
- [ ] 验收标准覆盖功能、性能、安全等维度

**示例对比:**

✗ **错误示例:**
```
Requirement 1: 用户登录功能

Description: 用户可以使用用户名和密码登录

Acceptance Criteria:
(缺失)
```

✓ **正确示例:**
```
Requirement 1: 用户名密码登录

Acceptance Criteria:
- [ ] 用户输入正确凭据后成功登录
- [ ] 用户输入错误密码时显示"用户名或密码错误"
- [ ] 连续 5 次登录失败后锁定账户 30 分钟
- [ ] 登录响应时间 < 2 秒
- [ ] 密码在前端加密后再传输
```

**验证方法:**
- 检查每个需求是否都有验收标准
- 如果缺少，问"如何验证这个需求已满足？"

---

### 2.3 验收标准覆盖关键维度

**问题描述:**
验收标准只覆盖功能，忽略性能、安全、兼容性等维度。

**维度检查清单:**

| 维度 | 检查项 | 示例 |
|------|--------|------|
| 功能 | 核心功能是否正常工作？ | [ ] 用户输入正确凭据后成功登录 |
| 性能 | 响应时间、吞吐量是否达标？ | [ ] 登录 API 响应时间 < 2 秒（P95） |
| 安全 | 是否满足安全要求？ | [ ] 密码使用 bcrypt 加密存储 |
| 兼容性 | 是否支持目标平台？ | [ ] 支持 Chrome, Firefox, Safari, Edge 最新版本 |
| 可用性 | 是否满足可用性要求？ | [ ] 系统可用性 ≥ 99.9% |
| 可访问性 | 是否满足可访问性要求？ | [ ] 所有输入框有明确的 label 标签 |

**验证方法:**
- 检查验收标准是否覆盖关键维度
- 如果缺少某个维度，补充相应的验收标准

---

## 3. 边界定义检查 (Boundary Check)

### 3.1 In Scope 明确列出

**问题描述:**
未明确列出范围内容，容易导致功能遗漏或过度开发。

**示例对比:**

✗ **错误示例:**
```
In Scope:
- 用户登录
```

✓ **正确示例:**
```
In Scope:

核心功能:
- [ ] 用户名密码登录
- [ ] 手机验证码登录
- [ ] 登录状态保持（记住我）
- [ ] 登录失败安全策略

用户界面:
- [ ] 登录页面 UI
- [ ] 登录表单验证
- [ ] 错误提示信息

后端服务:
- [ ] 登录认证 API
- [ ] Token 生成和验证
- [ ] 用户会话管理

数据存储:
- [ ] 用户表结构设计
- [ ] 登录日志记录

安全措施:
- [ ] 密码加密传输（HTTPS）
- [ ] 密码加密存储（bcrypt）
- [ ] SQL 注入防护
- [ ] XSS 攻击防护

测试:
- [ ] 单元测试（覆盖率 ≥ 80%）
- [ ] 集成测试
- [ ] 性能测试（响应时间 < 2s）
```

**验证方法:**
- 检查是否明确列出所有范围内容
- 使用分类方式（功能、界面、后端、数据、安全、测试）组织

---

### 3.2 Out of Scope 明确列出

**问题描述:**
未明确列出范围外内容，容易导致范围蔓延。

**示例对比:**

✗ **错误示例:**
```
Out of Scope:
(缺失)
```

✓ **正确示例:**
```
Out of Scope:

延迟到后续阶段:
- **单点登录 (SSO)** — 原因: 需要评估第三方 SSO 提供商，延迟到 Phase 8
- **多因素认证 (MFA)** — 原因: 属于高级安全功能，v1.0 聚焦基础登录
- **社交账号登录** — 原因: 需要申请各平台开发者账号，延迟到 v2.0

不属于此功能:
- **用户注册功能** — 原因: 属于独立的用户管理模块，在 Phase 5 实现
- **密码找回功能** — 原因: 依赖邮件服务配置，在 Phase 6 实现
- **用户权限管理** — 原因: 属于权限管理模块，在 Phase 7 实现

技术债务（不在此阶段处理）:
- **旧系统用户迁移** — 原因: 需要数据清洗脚本，在 Phase 10 处理
```

**验证方法:**
- 检查是否明确列出所有范围外内容
- 对于每个延迟项目，说明延迟原因和重新考虑的时间

---

### 3.3 延迟项目有原因说明

**问题描述:**
延迟项目未说明原因，后续可能遗忘。

**示例对比:**

✗ **错误示例:**
```
Out of Scope:
- 单点登录
- 多因素认证
```

✓ **正确示例:**
```
Out of Scope:
- **单点登录 (SSO)** — 原因: 需要评估第三方 SSO 提供商，延迟到 Phase 8
- **多因素认证 (MFA)** — 原因: 属于高级安全功能，v1.0 聚焦基础登录
```

**验证方法:**
- 检查每个延迟项目是否有原因说明
- 如果缺少，补充延迟原因

---

## 4. 上下文一致性检查 (Context Consistency Check)

### 4.1 不重复已决策的问题

**问题描述:**
需求讨论重复询问已在先前阶段决策的问题。

**示例对比:**

✗ **错误示例:**
```
Phase 5 需求讨论:
Q: 数据加载使用分页还是无限滚动？
User: 我们之前已经在 Phase 3 讨论过使用无限滚动了，为什么又要问？
```

✓ **正确示例:**
```
Phase 5 需求讨论:
Loading prior context from Phase 3...
Skipping "Data Loading Strategy" — already decided as "Infinite Scroll" (D-05)

Remaining gray areas for Phase 5:
1. UI Layout
2. Caching Strategy
3. Error Handling
```

**验证方法:**
- 在需求讨论前加载先前阶段的 CONTEXT.md
- 在灰区识别时跳过已决策区域
- 如果用户提醒已决策，立即道歉并跳过

---

### 4.2 引用先前决策

**问题描述:**
需求文档未引用先前阶段的相关决策。

**示例对比:**

✗ **错误示例:**
```
Phase 5 SPEC.md:
(未引用 Phase 3 的决策)
```

✓ **正确示例:**
```
Phase 5 SPEC.md:

## Background

### Context from Prior Phases:
- Phase 3: 列表视图 — 已决策使用"无限滚动"（D-05）
- Phase 4: API 规范 — 已决策使用 RESTful API（D-08）

### Constraints from Prior Phases:
- 使用 Phase 3 已建立的无限滚动组件
- 遵循 Phase 4 定义的 API 规范
```

**验证方法:**
- 检查是否引用了相关的先前决策
- 如果缺少，补充引用

---

### 4.3 上下文文件加载

**问题描述:**
未加载必要的上下文文件，导致需求讨论缺乏依据。

**必须加载的文件:**

| 文件 | 用途 | 加载时机 |
|------|------|----------|
| `.planning/PROJECT.md` | 项目级上下文 | 每次 spec-phase 或 discuss-phase |
| `.planning/REQUIREMENTS.md` | 需求追踪矩阵 | 每次 spec-phase 或 discuss-phase |
| `.planning/STATE.md` | 项目当前状态 | 每次 spec-phase 或 discuss-phase |
| `.planning/ROADMAP.md` | 阶段定义和依赖关系 | 每次 spec-phase 或 discuss-phase |
| `.planning/phases/{prior}/CONTEXT.md` | 先前阶段的决策 | 每次 discuss-phase（最近 3 个阶段） |

**验证方法:**
- 检查是否加载了所有必要的上下文文件
- 如果缺少，在需求讨论开始前加载

---

## 5. 范围控制检查 (Scope Control Check)

### 5.1 无范围蔓延

**问题描述:**
需求讨论过程中不断增加新功能，超出阶段原始目标。

**示例对比:**

✗ **错误示例:**
```
User: "顺便做一个数据导出功能吧"
Agent: "好的，我们讨论一下导出格式..."
(范围蔓延开始)
```

✓ **正确示例:**
```
User: "顺便做一个数据导出功能吧"
Agent: "Data export is a new capability. I'll add it to deferred ideas.
       Let's focus on the current phase scope: [original goal]."

<deferred>
## Deferred Ideas

- **数据导出功能** — 原因: 属于新功能，超出当前阶段范围
  - **User Expectation:** 导出数据为 Excel 格式
  - **Why Deferred:** 当前阶段聚焦登录功能
  - **When to Revisit:** Phase 6 或单独排期
</deferred>
```

**验证方法:**
- 在需求讨论时明确阶段边界
- 当用户提出新功能时，立即声明"这属于新能力"
- 捕获延迟想法到 CONTEXT.md 的 `<deferred>` 部分

---

### 5.2 延迟想法已记录

**问题描述:**
延迟的想法未记录，后续可能遗忘或重复讨论。

**示例对比:**

✗ **错误示例:**
```
(讨论过程中用户提到了几个想法，但未记录)
```

✓ **正确示例:**
```
<deferred>
## Deferred Ideas

### Deferred to Phase 6
- **数据导出功能** — 原因: 需要先完成基础功能
  - **User Expectation:** 导出数据为 Excel 格式
  - **Why Deferred:** 依赖登录功能完成
  - **When to Revisit:** Phase 6

### Deferred to v2.0
- **高级搜索功能** — 原因: 属于高级功能，v1.0 聚焦核心价值
  - **User Expectation:** 支持多条件组合搜索
  - **Why Deferred:** 需要复杂的索引支持
  - **When to Revisit:** v2.0
</deferred>
```

**验证方法:**
- 检查是否记录了所有延迟想法
- 对于每个延迟想法，说明原因和重新考虑的时间

---

### 5.3 未决定的项目有追踪

**问题描述:**
未决定的项目未追踪，可能导致后续阻塞。

**示例对比:**

✗ **错误示例:**
```
(讨论过程中有些问题未解决，但未记录)
```

✓ **正确示例:**
```
## Open Questions

### Question 1: 是否需要支持离线访问？

**Status:** Open

**Context:**
- 用户希望在没有网络时也能查看已加载的数据
- 技术上可以使用 Service Worker 实现
- 需要评估数据同步策略

**Potential Options:**
1. 完全离线访问（复杂度高）
2. 只读离线访问（中等复杂度）
3. 不支持离线（简单）

**Information Needed:**
- 用户离线使用场景调研
- 数据同步策略设计

**Owner:** Product Owner
**Due Date:** 2026-05-15
```

**验证方法:**
- 检查是否记录了所有未决定的项目
- 对于每个未决定项目，指定负责人和截止日期

---

## 6. 模糊度评分检查 (Ambiguity Scoring Check)

### 6.1 模糊度 ≤ 0.20

**问题描述:**
模糊度评分超过门控阈值（0.20），需求不够明确。

**计算公式:**

```
Clarity = 0.35 × Goal + 0.25 × Boundary + 0.20 × Constraint + 0.20 × Acceptance
Ambiguity = 1.0 - Clarity

Gate: Ambiguity ≤ 0.20 AND all dimensions ≥ minimums
```

**维度最低分:**
- Goal Clarity: ≥ 0.75
- Boundary Clarity: ≥ 0.70
- Constraint Clarity: ≥ 0.65
- Acceptance Criteria: ≥ 0.70

**示例对比:**

✗ **错误示例:**
```
| Dimension          | Score | Min  | Status |
|--------------------|-------|------|--------|
| Goal Clarity       | 0.65  | 0.75 | ✗ FAIL |
| Boundary Clarity   | 0.62  | 0.70 | ✗ FAIL |
| Constraint Clarity | 0.60  | 0.65 | ✗ FAIL |
| Acceptance Criteria| 0.68  | 0.70 | ✗ FAIL |
| **Ambiguity**      | 0.36  | ≤0.20| ✗ FAIL |
```

✓ **正确示例:**
```
| Dimension          | Score | Min  | Status | Notes                              |
|--------------------|-------|------|--------|------------------------------------|
| Goal Clarity       | 0.85  | 0.75 | ✓ PASS | 目标清晰明确，可衡量              |
| Boundary Clarity   | 0.80  | 0.70 | ✓ PASS | 范围边界明确，已列出 out of scope |
| Constraint Clarity | 0.75  | 0.65 | ✓ PASS | 技术约束和安全约束已明确          |
| Acceptance Criteria| 0.78  | 0.70 | ✓ PASS | 验收标准可测试，包含 checkbox     |
| **Ambiguity**      | 0.18  | ≤0.20| ✓ PASS | 模糊度低于门控阈值                |
```

**验证方法:**
- 计算模糊度评分
- 如果 Ambiguity > 0.20，继续澄清需求
- 如果某个维度低于最低分，针对性改进

---

### 6.2 所有维度满足最低分

**问题描述:**
整体模糊度达标，但某个维度过低，可能导致问题。

**示例对比:**

✗ **错误示例:**
```
| Dimension          | Score | Min  | Status |
|--------------------|-------|------|--------|
| Goal Clarity       | 0.90  | 0.75 | ✓ PASS |
| Boundary Clarity   | 0.85  | 0.70 | ✓ PASS |
| Constraint Clarity | 0.60  | 0.65 | ✗ FAIL |
| Acceptance Criteria| 0.85  | 0.70 | ✓ PASS |
| **Ambiguity**      | 0.19  | ≤0.20| ✓ PASS |

问题: Constraint Clarity 过低，可能导致实施困难
```

✓ **正确示例:**
```
| Dimension          | Score | Min  | Status | Notes                              |
|--------------------|-------|------|--------|------------------------------------|
| Goal Clarity       | 0.85  | 0.75 | ✓ PASS | 目标清晰明确                      |
| Boundary Clarity   | 0.80  | 0.70 | ✓ PASS | 边界明确                          |
| Constraint Clarity | 0.75  | 0.65 | ✓ PASS | 约束已明确                        |
| Acceptance Criteria| 0.78  | 0.70 | ✓ PASS | 验收标准可测试                    |
| **Ambiguity**      | 0.18  | ≤0.20| ✓ PASS | 所有维度满足最低分                |
```

**验证方法:**
- 检查所有维度是否都满足最低分
- 如果某个维度低于最低分，针对性改进

---

## 7. 文档格式检查 (Document Format Check)

### 7.1 使用标准模板

**问题描述:**
未使用标准模板，文档格式不一致。

**必须使用的模板:**

| 文档类型 | 模板路径 | 用途 |
|----------|----------|------|
| CONTEXT.md | `.bos-flow/templates/CONTEXT.md` | 捕获实施决策 |
| SPEC.md | `.bos-flow/templates/SPEC.md` | 定义需求规格 |
| DISCUSSION-LOG.md | `.bos-flow/templates/DISCUSSION-LOG.md` | 记录讨论过程 |

**验证方法:**
- 检查是否使用了标准模板
- 如果缺少模板，从 `.bos-flow/templates/` 复制

---

### 7.2 必需部分完整

**问题描述:**
文档缺少必需部分。

**CONTEXT.md 必需部分:**
- [ ] `<domain>` — 阶段边界描述
- [ ] `<decisions>` — 实施决策（D-XX 格式）
- [ ] `<canonical_refs>` — 规范文档引用列表
- [ ] `<code_context>` — 可复用资产和已建立模式
- [ ] `<specifics>` — 用户特定需求和偏好
- [ ] `<deferred>` — 延迟到后续阶段的想法

**SPEC.md 必需部分:**
- [ ] **Goal** — 一个精确的句子
- [ ] **Background** — 当前状态
- [ ] **Requirements** — Current/Target/Acceptance 结构
- [ ] **Boundaries** — In scope 和 Out of scope
- [ ] **Acceptance Criteria** — checkbox 形式
- [ ] **Ambiguity Report** — 模糊度评分表

**验证方法:**
- 检查文档是否包含所有必需部分
- 如果缺少，使用模板补充

---

### 7.3 提交到版本控制

**问题描述:**
需求文档未提交到 git，无法追踪变更历史。

**验证方法:**
- 检查文档是否已提交到 git
- 使用原子提交，每个文档单独提交

```bash
git add .planning/phases/${PHASE_NUM}/CONTEXT.md
git commit -m "docs(phase-${PHASE_NUM}): add context with implementation decisions"

git add .planning/phases/${PHASE_NUM}/SPEC.md
git commit -m "docs(phase-${PHASE_NUM}): add specification with ambiguity ${ambiguity}"
```

---

## Usage Guide

### 如何使用此检查清单

**在 spec-phase 阶段:**
1. 使用第 1、2、6 部分检查需求清晰度、可测试性和模糊度评分
2. 在每次访谈轮次后更新模糊度评分
3. 确保通过门控（Ambiguity ≤ 0.20）后才写 SPEC.md

**在 discuss-phase 阶段:**
1. 使用第 3、4、5 部分检查边界定义、上下文一致性和范围控制
2. 在讨论前加载先前上下文，避免重复询问
3. 在讨论后检查延迟想法是否已记录

**在 verify 阶段:**
1. 使用第 7 部分检查文档格式
2. 验证所有必需部分完整
3. 确认文档已提交到版本控制

---

## Quick Reference

### 检查清单快速索引

| # | 检查类别 | 关键检查项 | 失败后果 |
|---|----------|------------|----------|
| 1 | 需求清晰度 | 避免抽象词汇、SMART 原则、完整性 | 需求无法验证 |
| 2 | 可测试性 | 验收标准可测试、覆盖关键维度 | 验收争议 |
| 3 | 边界定义 | In/Out of Scope 明确、延迟原因说明 | 范围蔓延 |
| 4 | 上下文一致性 | 不重复已决策问题、引用先前决策 | 用户不满、浪费时间 |
| 5 | 范围控制 | 无范围蔓延、延迟想法已记录 | 阶段失控 |
| 6 | 模糊度评分 | Ambiguity ≤ 0.20、所有维度达标 | 需求不明确 |
| 7 | 文档格式 | 使用标准模板、必需部分完整、提交 git | 文档不一致、无法追踪 |

---

*Document version: 1.0*
*Last updated: 2026-04-30*
*Source: Phase 7 Research - 5 Common Pitfalls*
