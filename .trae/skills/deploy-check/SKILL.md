---
name: deploy-check
description: "检查并部署项目到 GitHub Pages，验证 CDN 缓存是否已刷新。当用户要求部署、发布、推送更新到线上时使用。"
allowed-tools: Bash
---

# GitHub Pages 部署检查 Skill

将项目变更部署到 GitHub Pages，并**验证 CDN 是否已刷新**，确保用户看到的确实是最新版本。

## 项目结构

```
/workspace/
├── index.html              # 主页（Vite React 应用）
├── dress-up/
│   ├── index.html          # 穿衣游戏主文件（开发目录）
│   └── assets/             # 游戏图片资源
└── docs/
    ├── index.html          # 穿衣游戏（GitHub Pages 备用入口）
    └── assets/             # 游戏图片资源
```

**关键规则**：GitHub Pages 从仓库根目录提供服务。更新时必须同步 `dress-up/` 目录的内容。如果有 `docs/` 目录，也需要同步。

## 部署流程

### 第一步：同步文件

```bash
cd /workspace

# 同步 HTML
cp dress-up/index.html docs/index.html 2>/dev/null || true

# 同步图片
cp dress-up/assets/*.jpg docs/assets/ 2>/dev/null || true
cp dress-up/assets/*.png docs/assets/ 2>/dev/null || true
cp dress-up/assets/*.svg docs/assets/ 2>/dev/null || true
```

### 第二步：确保缓存破坏

检查所有图片 URL 是否带 `?v=X` 参数。如果没有，需要加上：

```bash
# 检查是否有不带版本号的图片引用
grep -n "assets/.*\.jpg'" dress-up/index.html | grep -v "?v=" | head -10
```

如果有不带版本号的引用，使用 sed 全局添加。同时确认 HTML 有 no-cache meta 标签。

### 第三步：提交并推送

```bash
cd /workspace
git add dress-up/ docs/ .trae/ 2>/dev/null || true
git commit -m "<根据实际变更写commit message>"
git push
```

### 第四步：验证部署（必须执行！）

推送后，**不要立即通知用户**。先执行以下验证：

#### 4.1 确认 GitHub 仓库已更新

```bash
# 检查最新 commit
curl -s "https://api.github.com/repos/kakapon-xu/bunny-abc/commits/main" | grep -o '"sha": "[^"]*"' | head -1
```

#### 4.2 确认 GitHub raw 文件正确

```bash
# 检查 HTML 内容
curl -s "https://raw.githubusercontent.com/kakapon-xu/bunny-abc/main/dress-up/index.html" | grep "<关键词>" | head -3

# 检查图片大小（和本地对比）
LOCAL_SIZE=$(stat -c%s /workspace/dress-up/assets/目标图片.jpg)
REMOTE_SIZE=$(curl -sI "https://raw.githubusercontent.com/kakapon-xu/bunny-abc/main/dress-up/assets/目标图片.jpg" | grep -i content-length | awk '{print $2}' | tr -d '\r')

echo "本地: $LOCAL_SIZE, 远程: $REMOTE_SIZE"
if [ "$LOCAL_SIZE" = "$REMOTE_SIZE" ]; then echo "✅ 一致"; else echo "❌ 不一致"; fi
```

#### 4.3 确认 GitHub Pages CDN 已刷新（最关键！）

```bash
# 检查 CDN 返回的图片大小
CDN_SIZE=$(curl -sI "https://kakapon-xu.github.io/bunny-abc/dress-up/assets/目标图片.jpg" | grep -i content-length | awk '{print $2}' | tr -d '\r')

echo "本地: $LOCAL_SIZE, CDN: $CDN_SIZE"
if [ "$LOCAL_SIZE" = "$CDN_SIZE" ]; then
  echo "✅ CDN 已刷新"
else
  echo "❌ CDN 缓存未刷新，需要等待或改文件名"
fi
```

#### 4.4 处理 CDN 缓存未刷新

如果 CDN 返回的文件大小和本地不一致：

1. **等待 3-5 分钟**后重试步骤 4.3
2. 如果仍不一致，**修改文件名**（如 `xxx.jpg` → `xxx-v2.jpg`），更新代码引用，重新推送
3. CDN 对全新文件名一定会加载最新内容

#### 4.5 全部验证通过后

只有当以下条件**全部满足**时，才能通知用户：

- [ ] GitHub 仓库 commit 是最新的
- [ ] GitHub raw 文件内容和本地一致
- [ ] GitHub Pages CDN 返回的文件大小和本地一致

然后通知用户，附带带版本号的访问链接：

```
https://kakapon-xu.github.io/bunny-abc/dress-up/?v={版本号}
```

## 常见问题

| 问题 | 原因 | 解决 |
|------|------|------|
| 推送了但页面没变 | CDN 缓存 | 改文件名或等 5 分钟 |
| 图片 404 | GitHub Pages 未部署完 | 等 3-5 分钟 |
| HTML 是新的但图片是旧的 | 图片 CDN 缓存比 HTML 慢 | 给图片加 `?v=X` 或改文件名 |