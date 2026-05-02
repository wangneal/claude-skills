# 🚀 发布前检查清单

## kingdee-bos-flow v1.0.0 发布检查

---

## ✅ 已完成的准备工作

- [x] 更新 package.json（包名: kingdee-bos-flow）
- [x] 创建 README.md（npm 包展示页面）
- [x] 创建 .npmignore（排除不需要的文件）
- [x] 创建 LICENSE（MIT 许可证）
- [x] 创建 PUBLISH-GUIDE.md（发布指南）
- [x] 测试 CLI 功能（所有命令正常工作）
- [x] 测试 npm pack（文件列表正确）

---

## ⚠️ 需要您手动完成的步骤

### 1. 更新 package.json 中的个人信息

**文件**: `.bos-flow/package.json`

请更新以下字段为您的实际信息：

```json
{
  "author": "Your Name <your.email@example.com>",  // ← 更新您的名字和邮箱
  "repository": {
    "type": "git",
    "url": "https://github.com/your-username/kingdee-bos-flow.git"  // ← 更新仓库地址
  },
  "bugs": {
    "url": "https://github.com/your-username/kingdee-bos-flow/issues"  // ← 更新 issues 地址
  },
  "homepage": "https://github.com/your-username/kingdee-bos-flow#readme"  // ← 更新主页地址
}
```

### 2. 更新 README.md 中的链接

**文件**: `.bos-flow/README.md`

请更新以下链接：

- GitHub 仓库链接（搜索 `your-username` 并替换为您的 GitHub 用户名）
- 作者信息
- 联系方式

### 3. 注册 npm 账号（如果还没有）

访问: https://www.npmjs.com/signup

### 4. 检查包名可用性

访问: https://www.npmjs.com/package/kingdee-bos-flow

确认包名未被占用。

如果包名已被占用，您可以：
- 使用其他名称（如 `kingdee-cosmic-flow`）
- 使用作用域（如 `@your-username/bos-flow`）

---

## 📝 发布命令（按顺序执行）

### 步骤 1: 进入 .bos-flow 目录

```bash
cd "E:/projects/claude skills/.bos-flow"
```

### 步骤 2: 登录 npm

```bash
npm login
```

按提示输入：
- Username
- Password
- Email
- OTP (如果启用了两步验证)

### 步骤 3: 验证登录

```bash
npm whoami
```

应该显示您的 npm 用户名。

### 步骤 4: 最后检查

```bash
# 查看将要发布的文件
npm pack --dry-run

# 查看包大小
npm pack --dry-run | grep "package size"
```

### 步骤 5: 发布

```bash
npm publish
```

### 步骤 6: 验证发布成功

```bash
# 查看包信息
npm view kingdee-bos-flow

# 全局安装测试
npm install -g kingdee-bos-flow

# 测试命令
bos-flow help
bos-flow kd-auto "测试功能"
```

---

## 📦 包信息摘要

**包名**: kingdee-bos-flow
**版本**: 1.0.0
**许可证**: MIT
**Node.js 要求**: >= 16.0.0

**包含的主要文件**:
- bin/cli.js - CLI 入口
- lib/*.js - 核心模块（KD 自动化、SDK 研究、约束生成等）
- sdk/ - SDK 知识库（17 个模块，48 个类，783 个方法）
- templates/ - 阶段模板
- standards/ - 开发规范
- skills/ - GSD 技能

**依赖**:
- chalk ^4.1.0
- commander ^11.0.0
- fuse.js ^7.3.0
- fs-extra ^11.3.4

---

## 🎉 发布后

### 创建 Git Tag

```bash
cd "E:/projects/claude skills"
git tag -a v1.0.0 -m "Release version 1.0.0"
git push origin v1.0.0
```

### 在 GitHub 创建 Release

访问您的仓库 → Releases → Draft a new release

---

## 💡 安装和使用（发布成功后）

```bash
# 安装
npm install -g kingdee-bos-flow

# 使用
bos-flow help
bos-flow kd-auto "开发工作流审批功能" -d

# 在项目中使用
npm install --save-dev kingdee-bos-flow
npx bos-flow init my-project
```

---

## 🔗 快速链接

- npm 发布指南: `.bos-flow/PUBLISH-GUIDE.md`
- 使用文档: `.bos-flow/README.md`
- KD 命令指南: `KD-COMMANDS-GUIDE.md`

---

## ❓ 常见问题

### Q1: 包名已被占用怎么办？

**A**: 您可以：
1. 使用其他名称（如 `kingdee-cosmic-flow`, `kd-bos-workflow`）
2. 使用 npm 作用域（如 `@your-username/bos-flow`）
3. 联系包所有者请求转让

### Q2: 发布失败提示权限错误？

**A**: 确保您已登录 npm 并且有权限发布：
```bash
npm whoami
npm access list
```

### Q3: 如何更新已发布的包？

**A**: 更新版本号后重新发布：
```bash
npm version patch  # 或 minor, major
npm publish
```

### Q4: 如何撤销发布？

**A**: 在发布后 24 小时内可以撤销：
```bash
npm unpublish kingdee-bos-flow@1.0.0
```

---

**准备好了吗？按照上述步骤开始发布吧！** 🚀

如有任何问题，请参考 `.bos-flow/PUBLISH-GUIDE.md` 或查阅 [npm 官方文档](https://docs.npmjs.com/)。
