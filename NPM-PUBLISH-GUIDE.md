# NPM 发布指南

## 📦 发布到 NPM 的步骤

### 前置要求

1. ✅ 有 npm 账号（没有的话需要注册：https://www.npmjs.com/signup）
2. ✅ Node.js >= 14.0.0
3. ✅ 项目已准备好发布

### 步骤 1: 登录 npm

```bash
cd "E:\projects\kingdee-dev-plugin"
npm login
```

系统会提示输入：
- Username
- Password
- Email
- OTP (如果启用了两步验证)

### 步骤 2: 验证项目状态

```bash
# 查看即将发布的文件
npm pack --dry-run

# 或者查看详细的包内容
npm pack
```

这会显示将要发布的文件列表。

### 步骤 3: 测试安装（可选但推荐）

在发布前，先在本地测试：

```bash
# 在项目目录中
npm link

# 在另一个目录中测试
cd /tmp
mkdir test-kd-plugin
cd test-kd-plugin
npm link kingdee-dev-plugin
node -e "require('kingdee-dev-plugin')"
```

### 步骤 4: 发布到 npm

```bash
# 正式发布
npm publish
```

**如果是第一次发布**，包名会被占用，可以：
1. 使用 scoped package：`@your-username/kingdee-dev-plugin`
2. 换一个唯一的包名

### 步骤 5: 验证发布

```bash
# 查看包信息
npm info kingdee-dev-plugin

# 或者访问网页
# https://www.npmjs.com/package/kingdee-dev-plugin
```

---

## 🎯 使用 npx 安装

发布成功后，用户可以这样使用：

### 直接使用 npx（推荐）

```bash
npx kingdee-dev-plugin
```

这会自动下载并运行安装脚本！

### 全局安装

```bash
npm install -g kingdee-dev-plugin
kingdee-dev-plugin
```

### 项目内安装

```bash
npm install kingdee-dev-plugin
npx kingdee-dev-plugin
```

---

## 📋 版本更新

### 更新版本号

```bash
# 补丁版本 (1.0.0 -> 1.0.1)
npm version patch

# 小版本 (1.0.0 -> 1.1.0)
npm version minor

# 大版本 (1.0.0 -> 2.0.0)
npm version major
```

### 发布更新

```bash
npm publish
```

---

## 🔍 包名冲突处理

如果 `kingdee-dev-plugin` 已被占用：

### 方案 1: 使用 Scoped Package

修改 `package.json`:

```json
{
  "name": "@your-username/kingdee-dev-plugin",
  "publishConfig": {
    "access": "public"
  }
}
```

### 方案 2: 更改包名

```json
{
  "name": "kingdee-cosmic-plugin"
}
```

---

## ⚠️ 注意事项

### 发布前检查清单

- [ ] `package.json` 中的 `name` 唯一
- [ ] `version` 版本号正确
- [ ] `description` 描述准确
- [ ] `README.md` 文档完整
- [ ] `LICENSE` 文件存在
- [ ] `.npmignore` 配置正确
- [ ] 测试安装脚本可用
- [ ] repository URL 正确

### 常见问题

**Q: 发布失败 - 包名已存在**

A: 使用 scoped package 或更改包名

**Q: 发布失败 - 没有权限**

A: 检查是否已登录：`npm whoami`

**Q: 发布失败 - 版本号已存在**

A: 更新版本号：`npm version patch`

**Q: 文件没有包含在包中**

A: 检查 `.npmignore` 和 `files` 字段

---

## 🎉 发布后

### 自动化流程

用户可以通过一行命令安装：

```bash
npx kingdee-dev-plugin
```

这会：
1. ✅ 从 npm 下载包
2. ✅ 自动运行 `install.js`
3. ✅ 安装所有 Agents、Skills、Engine
4. ✅ 在 Claude Code 中可用

### 宣传

发布后可以：
1. 在 GitHub 创建仓库
2. 编写博客文章
3. 分享给金蝶开发者社区

---

## 📞 支持

遇到问题？查看：
- npm 文档: https://docs.npmjs.com/
- package.json 规范: https://docs.npmjs.com/cli/configuring-npm/package-json
- 发布指南: https://docs.npmjs.com/cli/commands/npm-publish

---

**准备好发布了吗？按照上述步骤操作即可！** 🚀
