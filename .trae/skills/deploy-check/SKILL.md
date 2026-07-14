---
name: deploy-check
description: "检查并部署项目到 GitHub Pages，验证 CDN 缓存是否已刷新。当用户要求部署、发布、推送更新到线上时使用。"
allowed-tools: Bash
---

# GitHub Pages 部署检查 Skill

将项目变更部署到 GitHub Pages，并**验证 CDN 是否已刷新**，确保线上访问的确实是最新版本。

## 前置探测

执行任何操作前，先探测项目的实际结构：

```bash
cd /workspace

# 1. 获取 GitHub 仓库信息
REPO_URL=$(git remote get-url origin 2>/dev/null | sed 's|.*github.com[:/]||;s|\.git$||')
echo "仓库: $REPO_URL"

# 2. 获取默认分支
DEFAULT_BRANCH=$(git branch --show-current)
echo "分支: $DEFAULT_BRANCH"

# 3. 检测 GitHub Pages 部署方式（关键！）
# 方式A: GitHub Actions 构建（检查 .github/workflows/）
# 方式B: 直接从仓库目录服务（根目录 or /docs）
if [ -d ".github/workflows" ]; then
  echo "⚠️ 检测到 GitHub Actions 工作流"
  # 检查是否有 Vite/构建步骤
  if grep -rl "vite build\|npm run build\|npx build" .github/workflows/ 2>/dev/null; then
    echo "Pages 来源: 构建产物（npm run build → dist/）"
    echo "重要：静态资源在 public/ 目录中，更新时必须同步到 public/！"
    # 检查 public 目录
    if [ -d "public" ]; then
      echo "public/ 内容："
      ls public/
    fi
    PAGES_SOURCE="build"
  fi
elif [ -f "docs/index.html" ] || [ -d "docs/" ]; then
  echo "Pages 来源: /docs 目录"
  PAGES_SOURCE="docs"
else
  echo "Pages 来源: 仓库根目录"
  PAGES_SOURCE="root"
fi

# 4. 检测变更的文件
CHANGED_FILES=$(git diff --name-only HEAD~1 2>/dev/null || git diff --name-only)
echo "变更文件: $CHANGED_FILES"

# 5. 推导 GitHub Pages URL
REPO_NAME=$(basename "$REPO_URL")
OWNER=$(dirname "$REPO_URL")
PAGES_URL="https://${OWNER}.github.io/${REPO_NAME}"
echo "Pages URL: $PAGES_URL"
```

## 部署流程

### 第一步：同步文件（如需要）

**如果 PAGES_SOURCE="build"**：必须将所有静态资源同步到 `public/` 对应路径！

```bash
cd /workspace

# Vite 项目：public/ 的内容会被原样复制到 dist/
# 所以所有更新必须同步到 public/ 目录
# 示例（根据实际路径调整）：
cp -r dress-up/ public/dress-up/
# 或只同步变更的文件：
cp dress-up/index.html public/dress-up/index.html
cp dress-up/assets/*.jpg public/dress-up/assets/
```

**如果 PAGES_SOURCE="docs"**：同步到 docs/ 目录。

**如果 PAGES_SOURCE="root"**：无需同步。

### 第二步：缓存破坏

对于更新过的静态资源（图片、CSS、JS），确保 URL 带缓存破坏参数：

1. 找出本次变更的静态资源文件
2. 检查 HTML/代码中引用这些资源的地方是否带 `?v=X` 参数
3. 如果没有，全局添加或递增版本号

```bash
# 示例：检查不带版本号的图片引用
git diff --name-only | grep -E '\.(jpg|png|svg|css|js)$' | while read f; do
  basename=$(basename "$f")
  echo "检查引用: $basename"
  grep -rn "$basename" --include="*.html" --include="*.js" --include="*.css" . | grep -v "?v=" | head -3
done
```

同时在 HTML 中确认有 no-cache meta 标签（可选但推荐）。

### 第三步：提交并推送

```bash
cd /workspace
git add -A
git commit -m "<根据实际变更写 commit message>"
git push
```

### 第四步：验证部署（必须执行！）

推送后，**不要立即通知用户**。按顺序执行以下验证：

#### 4.1 确认 GitHub 仓库已更新

```bash
# 获取本地最新 commit
LOCAL_SHA=$(git rev-parse HEAD)

# 获取远程最新 commit
REMOTE_SHA=$(curl -s "https://api.github.com/repos/${REPO_URL}/commits/${DEFAULT_BRANCH}" | grep -o '"sha": "[^"]*"' | head -1 | cut -d'"' -f4)

echo "本地: $LOCAL_SHA"
echo "远程: $REMOTE_SHA"

if [ "$LOCAL_SHA" = "$REMOTE_SHA" ]; then
  echo "✅ 仓库已更新"
else
  echo "❌ 仓库未同步，等待重试"
fi
```

#### 4.2 确认 GitHub raw 文件正确

对本次变更的关键文件逐一验证：

```bash
# 验证单个文件
verify_file() {
  local file=$1
  local local_size=$(stat -c%s "$file")
  local raw_url="https://raw.githubusercontent.com/${REPO_URL}/${DEFAULT_BRANCH}/${file}"
  local remote_size=$(curl -sI "$raw_url" | grep -i content-length | awk '{print $2}' | tr -d '\r')

  if [ "$local_size" = "$remote_size" ]; then
    echo "✅ $file ($local_size bytes)"
  else
    echo "❌ $file 本地=$local_size 远程=$remote_size"
  fi
}

# 验证所有变更的静态资源
git diff --name-only HEAD~1 | grep -E '\.(jpg|png|svg|css|js|html)$' | while read f; do
  verify_file "$f"
done
```

#### 4.3 确认 GitHub Pages CDN 已刷新（最关键！）

```bash
verify_cdn() {
  local page_path=$1
  local cdn_url="${PAGES_URL}/${page_path}"

  # 下载 CDN 文件并对比大小
  curl -sL "$cdn_url" -o /tmp/cdn-check
  local cdn_size=$(stat -c%s /tmp/cdn-check)

  # 下载 raw 文件作为基准
  local raw_url="https://raw.githubusercontent.com/${REPO_URL}/${DEFAULT_BRANCH}/${page_path}"
  curl -sL "$raw_url" -o /tmp/raw-check
  local raw_size=$(stat -c%s /tmp/raw-check)

  echo "CDN: $cdn_size bytes, Raw: $raw_size bytes"

  if [ "$cdn_size" = "$raw_size" ]; then
    echo "✅ CDN 已刷新"
    return 0
  else
    echo "❌ CDN 缓存未刷新"
    return 1
  fi
}

# 验证主页面
verify_cdn "index.html"  # 或根据 PAGES_SOURCE 调整路径

# 验证变更的静态资源
git diff --name-only HEAD~1 | grep -E '\.(jpg|png|svg|css|js)$' | while read f; do
  verify_cdn "$f"
done
```

#### 4.4 处理 CDN 缓存未刷新

如果 CDN 返回的内容和仓库不一致：

1. **等待 3-5 分钟**后重试步骤 4.3
2. 如果仍不一致，对缓存未刷新的文件**修改文件名**（如 `xxx.jpg` → `xxx-v2.jpg`）
3. 更新代码中对该文件的所有引用
4. 重新提交推送，再次验证

#### 4.5 全部验证通过后

只有当以下条件**全部满足**时，才能通知用户：

- [ ] GitHub 仓库 commit SHA 一致
- [ ] GitHub raw 文件大小和本地一致
- [ ] GitHub Pages CDN 返回的内容和 raw 一致

通知用户时附带访问链接，带上时间戳参数避免浏览器缓存：

```
{PAGES_URL}/{页面路径}?t=$(date +%s)
```

## 常见问题

| 问题 | 原因 | 解决 |
|------|------|------|
| 推送了但页面没变 | CDN 缓存 | 改文件名或等 5 分钟 |
| 静态资源 404 | Pages 未部署完 | 等 3-5 分钟 |
| HTML 是新的但图片是旧的 | 图片 CDN 缓存更慢 | 给图片加 `?v=X` 或改文件名 |
| 部分文件更新部分没更新 | CDN 分文件缓存 | 对未更新的文件改文件名 |
| no-cache meta 不生效 | CDN 忽略 meta 标签 | 必须用文件名或查询参数破坏缓存 |