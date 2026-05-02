# NPM 发布指南

## 📦 发布 kingdee-bos-flow 到 npm

### 前置准备

1. **注册 npm 账号**
   - 访问 https://www.npmjs.com/signup
   - 创建账号并验证邮箱

2. **检查包名可用性**
   - 访问 https://www.npmjs.com/package/kingdee-bos-flow
   - 确认包名未被占用

---

### 发布步骤

#### 1. 登录 npm

```bash
cd .bos-flow
npm login
```

按提示输入：
- Username: 您的 npm 用户名
- Password: 您的密码
- Email: 您的邮箱
- OTP: 如果启用了两步验证，输入验证码

#### 2. 检查 package.json

确保以下信息正确：

```json
{
  "name": "kingdee-bos-flow",
  "version": "1.0.0",
  "author": "Your Name <your.email@example.com>",
  "repository": {
    "type": "git",
    "url": "https://github.com/your-username/kingdee-bos-flow.git"
  }
}
```

**重要**：请更新 `author` 和 `repository.url` 为您的实际信息。

#### 3. 检查要发布的文件

```bash
# 查看将要发布的文件列表
npm pack --dry-run
```

这会显示所有将被包含在 npm 包中的文件。

#### 4. 发布到 npm

```bash
# 发布最新版本
npm publish

# 或者发布 beta 版本
npm publish --tag beta
```

#### 5. 验证发布

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

### 版本更新

#### 更新版本号

```bash
# 补丁版本 (1.0.0 -> 1.0.1)
npm version patch

# 小版本 (1.0.0 -> 1.1.0)
npm version minor

# 大版本 (1.0.0 -> 2.0.0)
npm version major
```

#### 发布更新

```bash
npm publish
```

---

### 撤销发布（谨慎使用）

```bash
# 撤销特定版本（只能在发布后 24 小时内）
npm unpublish kingdee-bos-flow@1.0.0

# 撤销整个包（需要 24 小时后才能重名）
npm unpublish kingdee-bos-flow --force
```

---

## 🔧 发布前检查清单

- [ ] 已更新 `package.json` 中的 `author` 和 `repository` 信息
- [ ] 已更新 `README.md` 中的仓库链接
- [ ] 已测试所有核心功能
- [ ] 已检查 `.npmignore` 配置
- [ ] 已运行 `npm pack --dry-run` 确认文件列表
- [ ] 已更新 CHANGELOG.md
- [ ] 已登录 npm (`npm whoami`)

---

## 📝 发布后的工作

### 1. 创建 Git Tag

```bash
git tag -a v1.0.0 -m "Release version 1.0.0"
git push origin v1.0.0
```

### 2. 在 GitHub 创建 Release

- 访问 https://github.com/your-username/kingdee-bos-flow/releases/new
- 选择 tag: v1.0.0
- 填写 Release 标题和说明
- 上传 CHANGELOG.md

### 3. 更新文档

- 更新 README.md 中的版本号
- 更新 CHANGELOG.md
- 更新 package.json 中的版本号

---

## 🌐 使用作用域（可选）

如果您想使用 npm 作用域（例如 `@your-username/bos-flow`）：

### 1. 更新 package.json

```json
{
  "name": "@your-username/bos-flow"
}
```

### 2. 发布作用域包

```bash
# 公开作用域包
npm publish --access public

# 私有作用域包（需要付费账号）
npm publish
```

---

## 🔐 安全建议

1. **使用 .npmignore**
   - 排除敏感文件（.env, credentials 等）
   - 排除开发配置文件

2. **检查文件列表**
   - 发布前务必运行 `npm pack --dry-run`
   - 确认没有意外包含敏感信息

3. **使用 npm provenance**（可选）
   ```bash
   npm publish --provenance
   ```

---

## 📚 相关资源

- [npm 官方文档](https://docs.npmjs.com/)
- [npm publish 指南](https://docs.npmjs.com/cli/v10/commands/npm-publish)
- [npm 版本管理](https://docs.npmjs.com/cli/v10/commands/npm-version)
- [npm 作用域](https://docs.npmjs.com/cli/v10/using-npm/scope)

---

## 💡 提示

- 包名一旦发布，即使撤销也无法立即重用
- 版本号遵循 [SemVer](https://semver.org/) 规范
- 每次发布前更新版本号
- 保持 CHANGELOG.md 更新
- 测试发布后的安装和使用流程

---

**发布成功后，全世界都可以使用：**

```bash
npm install -g kingdee-bos-flow
```

🎉 祝发布顺利！
