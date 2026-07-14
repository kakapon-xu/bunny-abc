# GitHub Pages 部署检查清单

> 本项目使用 GitHub Pages 托管，每次更新后请按此清单执行，避免"推送了但页面没更新"的问题。

---

## 1. 项目结构

```
/workspace/
├── index.html              # 主页（Vite React 应用）
├── dress-up/
│   ├── index.html          # 穿衣游戏主文件（开发目录）
│   └── assets/             # 游戏图片资源
└── docs/
    ├── index.html          # 穿衣游戏（GitHub Pages /bunny-abc/ 入口）
    └── assets/             # 游戏图片资源（GitHub Pages 实际服务）
```

**关键点**：
- 用户访问 `/bunny-abc/` → 根目录 `index.html`（主页）
- 用户访问 `/bunny-abc/dress-up/` → 根目录 `dress-up/index.html`
- **必须同时更新 `dress-up/` 和 `docs/` 两个目录**

---

## 2. 部署前检查

### 2.1 文件是否已同步到 docs/

```bash
cd /workspace

# 检查 index.html 是否一致
diff dress-up/index.html docs/index.html && echo "✅ 一致" || echo "❌ 不一致，需要 cp"

# 检查图片资源是否一致
ls dress-up/assets/*.jpg | wc -l
ls docs/assets/*.jpg | wc -l

# 如有新图片，手动复制
cp dress-up/assets/xxx.jpg docs/assets/xxx.jpg
```

### 2.2 图片路径是否带缓存破坏参数

所有图片 URL 应带 `?v=X` 参数，每次更新时递增 X：

```javascript
// 正确
stepImg: 'assets/chef-step1.jpg?v=3'

// 错误（浏览器可能缓存旧图）
stepImg: 'assets/chef-step1.jpg'
```

**更新时**：全局替换 `?v=旧版本` → `?v=新版本`

### 2.3 HTML 是否带 no-cache meta

```html
<meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate">
<meta http-equiv="Pragma" content="no-cache">
<meta http-equiv="Expires" content="0">
```

---

## 3. 部署命令

```bash
cd /workspace

# 1. 确保 dress-up/ 和 docs/ 同步
cp dress-up/index.html docs/index.html
cp dress-up/assets/*.jpg docs/assets/ 2>/dev/null || true

# 2. 添加所有变更
git add dress-up/ docs/

# 3. 提交（写清楚变更内容）
git commit -m "feat: xxx更新说明"

# 4. 推送
git push
```

---

## 4. 部署后验证（关键！）

推送后 **必须** 执行以下检查，确认无误再通知用户：

### 4.1 检查 GitHub 仓库最新 commit

```bash
# 确认推送成功
curl -s "https://api.github.com/repos/kakapon-xu/bunny-abc/commits/main" | grep '"sha"' | head -1
```

### 4.2 检查 GitHub 仓库中的文件

```bash
# 检查 HTML 是否包含新代码
curl -s "https://raw.githubusercontent.com/kakapon-xu/bunny-abc/main/dress-up/index.html" | grep -E "新道具名|新功能"

# 检查图片文件大小
curl -sI "https://raw.githubusercontent.com/kakapon-xu/bunny-abc/main/dress-up/assets/xxx.jpg" | grep content-length
```

### 4.3 检查 GitHub Pages CDN（最重要！）

```bash
# 检查 HTML 内容大小
curl -sI "https://kakapon-xu.github.io/bunny-abc/dress-up/" | grep content-length

# 检查图片是否返回正确大小
curl -sI "https://kakapon-xu.github.io/bunny-abc/dress-up/assets/xxx.jpg" | grep content-length

# 下载对比
curl -sL "https://kakapon-xu.github.io/bunny-abc/dress-up/assets/xxx.jpg" -o /tmp/gh-pages.jpg
ls -l /tmp/gh-pages.jpg
```

**如果 CDN 返回旧版本**：
- 等待 3-5 分钟再试
- 如果仍不行，**修改文件名**（如 `xxx.jpg` → `xxx-v2.jpg`）并更新代码引用
- CDN 对全新文件名一定会加载最新内容

### 4.4 用浏览器完整测试

打开链接，逐一验证：

```
https://kakapon-xu.github.io/bunny-abc/dress-up/?v={新版本号}
```

测试项：
- [ ] 场景列表显示正确
- [ ] 进入游戏后道具列表正确
- [ ] 每一步图片显示对应道具
- [ ] 最终图显示所有道具
- [ ] 语音播放正常
- [ ] 键盘响应正常

---

## 5. 常见问题

### Q1: 推送到 GitHub 了，但页面还是旧版

**原因**：GitHub Pages CDN 缓存了旧文件。

**解决**：
1. 确认已等 3-5 分钟
2. 检查 CDN 实际返回的文件大小（步骤 4.3）
3. 如仍不对，**修改文件名**并更新引用

### Q2: 图片更新了但显示旧的

**原因**：浏览器缓存或 CDN 缓存。

**解决**：
1. URL 加版本参数 `?v=X`，每次更新递增
2. 如仍不行，修改图片文件名

### Q3: 新图片 404

**原因**：GitHub Pages 还没部署完，或文件未推送到正确目录。

**解决**：
1. 检查 GitHub 仓库 raw 文件是否能访问
2. 等 5 分钟再试
3. 确认文件在两个目录（dress-up/ 和 docs/）都存在

---

## 6. 快速诊断脚本

保存为 `deploy-check.sh`：

```bash
#!/bin/bash
set -e

echo "=== GitHub Pages 部署检查 ==="

# 检查仓库最新 commit
echo "1. 检查仓库 commit..."
curl -s "https://api.github.com/repos/kakapon-xu/bunny-abc/commits/main" | grep -o '"date": "[^"]*"' | head -1

# 检查 CDN HTML
echo "2. 检查 CDN HTML..."
curl -sI "https://kakapon-xu.github.io/bunny-abc/dress-up/" | grep "content-length"

# 检查 CDN 图片（传入图片路径参数）
if [ -n "$1" ]; then
  echo "3. 检查 CDN 图片 $1 ..."
  curl -sI "https://kakapon-xu.github.io/bunny-abc/dress-up/assets/$1" | grep "content-length"
fi

echo "=== 检查完成 ==="
```

使用：
```bash
./deploy-check.sh chef-final.jpg
```
