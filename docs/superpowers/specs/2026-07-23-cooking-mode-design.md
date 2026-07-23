# 做饭大作战模式 — 设计文档

## 概述

在 Bunny ABC 项目中新增"做饭大作战"游戏模式。孩子通过按键盘字母选择食材和动作，完成从原料到成品的完整做菜流程。第一道菜先做**手工面条**，覆盖 6 个步骤。

面向 2-3 岁英语启蒙儿童，延续"无压力、无惩罚、即时反馈"的设计理念。

## 目标

- 学习 6 个基础英语词汇 + 6 个动作词组
- 理解"从原料到食物"的完整过程
- 养成参与感："我自己做了一碗面条！"

## 词汇表

| 步骤 | 字母 | 单词 | 中文 | 词组 |
|------|------|------|------|------|
| 1. 倒面粉 | F | Flour | 面粉 | Add flour |
| 2. 加水 | W | Water | 水 | Add water |
| 3. 搅拌 | M | Mix | 搅拌 | Mix it up |
| 4. 擀面 | R | Roll | 擀面 | Roll it flat |
| 5. 切面 | C | Cut | 切面 | Cut the dough |
| 6. 煮面 | B | Boil | 煮面 | Boil noodles |

庆祝语音：
- "Yummy!"
- "Noodles are ready!"
- "Let's eat!"

## 架构

### 新增文件

```
src/
├── pages/
│   └── CookMode.tsx              # 做饭模式主页面
├── data/
│   └── cookingData.ts            # 面条食谱数据
├── components/
│   ├── CookingBowl.tsx           # 锅/碗视觉组件
│   └── CookingProgress.tsx       # 底部进度条
├── styles/
│   └── cooking.css               # 做饭模式专用样式
```

### 路由

在 `App.tsx` 新增：
```tsx
<Route path="/cook" element={<CookMode />} />
```

从场景选择进入：新增"🍜 小厨房 Kitchen"场景卡片 → 点击后进入 `/scene/kitchen/mode` → 选"Cook" → 进入 `/#/cook`

### 数据模型

```typescript
// cookingData.ts

export interface CookingStep {
  letter: string        // 按键字母
  word: string          // 英文单词
  wordCn: string        // 中文
  emoji: string         // 道具图标
  action: string        // 动作词组（语音播报用）
  image: string         // 步骤图片路径
}

export interface CookingRecipe {
  id: string
  name: string          // 菜品名称
  nameEn: string
  emoji: string
  startImage: string    // 开始画面（空碗+食材）
  finalImage: string    // 最终成品
  bgFrom: string        // 背景渐变色
  bgTo: string
  steps: CookingStep[]
}
```

### 面条食谱数据

```typescript
export const noodleRecipe: CookingRecipe = {
  id: 'noodle',
  name: '手工面条',
  nameEn: 'Handmade Noodles',
  emoji: '🍜',
  startImage: '/cooking/noodle-start.jpg',
  finalImage: '/cooking/noodle-final.jpg',
  bgFrom: '#fff8e7',
  bgTo: '#ffe8d0',
  steps: [
    { letter: 'F', word: 'Flour', wordCn: '面粉', emoji: '🌾', action: 'Add flour', image: '/cooking/noodle-step1.jpg' },
    { letter: 'W', word: 'Water', wordCn: '水', emoji: '💧', action: 'Add water', image: '/cooking/noodle-step2.jpg' },
    { letter: 'M', word: 'Mix', wordCn: '搅拌', emoji: '👐', action: 'Mix it up', image: '/cooking/noodle-step3.jpg' },
    { letter: 'R', word: 'Roll', wordCn: '擀面', emoji: '🍥', action: 'Roll it flat', image: '/cooking/noodle-step4.jpg' },
    { letter: 'C', word: 'Cut', wordCn: '切面', emoji: '🔪', action: 'Cut the dough', image: '/cooking/noodle-step5.jpg' },
    { letter: 'B', word: 'Boil', wordCn: '煮面', emoji: '🔥', action: 'Boil noodles', image: '/cooking/noodle-step6.jpg' },
  ],
}
```

## 页面流程

### 1. 开始画面

- 背景：暖黄渐变 (`#fff8e7` → `#ffe8d0`)
- 中央：一个大锅/碗，里面是 `noodle-start.jpg`（空碗+面粉袋+水壶）
- 顶部："🍜 Let's cook noodles!" 标题
- 底部：兔子 idle 表情 + "Press Enter to start"
- 按 Enter 进入第 1 步

### 2. 答题流程（循环 6 步）

每步统一布局：
```
┌─────────────────────────────────────┐
│  TopBar（返回键 + 标题 + 声音开关）   │
├─────────────────────────────────────┤
│                                     │
│     🐰 兔子（encouraging 表情）      │
│                                     │
│     [步骤图片] — 食材/动作画面        │
│     （当前步骤的 AI 生成图片）         │
│                                     │
│     ┌───────────────────────┐       │
│     │ F for Flour 面粉 🌾   │       │
│     │     Add flour         │       │
│     └───────────────────────┘       │
│                                     │
│     Q W E R T Y U I O P             │
│      A S D F G H J K L              │
│       Z X C V B N M                 │
│     （虚拟键盘，正确答案高亮闪烁）       │
│                                     │
│     ● ○ ○ ○ ○ ○  (底部进度条)       │
└─────────────────────────────────────┘
```

**交互逻辑：**
1. 题目框显示：大字母 + 英文单词 + 中文 + emoji
2. 题目框下方显示动作词组（灰色小字）
3. 孩子按对应字母键
4. 正确：✅ 按键变绿 + 语音播报动作词组（如 "Add flour!"）+ 图片切换到下一步
5. 错误：❌ 按键变红 + 抖动 + 语音播报按下的字母
6. 语音播报完后，自动进入下一步（或等 1 秒）
7. 6 步全部完成后进入庆祝

### 3. 庆祝画面

- 背景：金色渐变（`#fff8a0` → `#ffe880`）
- 中央：`noodle-final.jpg`（一碗热腾腾的面条）
- 满屏 ✨✨✨ 星星从天而降（CSS 动画）
- 兔子：happy 表情，上下跳动
- 语音："Yummy! Noodles are ready! Let's eat!"
- 底部按钮：
  - "再做一碗 🍜"（按 Enter 重新开始）
  - "返回 ←"（返回场景选择）

## 组件设计

### CookMode.tsx

主页面组件，管理游戏状态：
- `gameState`: 'intro' | 'playing' | 'celebration'
- `currentStepIndex`: number (0-5)
- `isAnswering`: boolean（防重复输入）

复用现有组件：
- `TopBar`（返回按钮、标题、声音开关）
- `Keyboard`（虚拟键盘 + 物理键盘监听）
- `Bunny`（兔子表情：intro=idle, playing=encouraging, celebration=happy）

### CookingBowl.tsx

展示当前步骤的图片容器：
- 接收 `imageSrc: string`
- 尺寸：最大宽度 300px，居中
- CSS：`border-radius: var(--radius-xl)` + `box-shadow: var(--shadow-md)`
- 切换图片时加 `animate-fadeIn` 动画

### CookingProgress.tsx

底部进度条：
- 6 个小圆点，代表 6 个步骤
- 已完成：绿色背景 + 白色 ✓
- 当前步：粉色背景 + 脉冲动画
- 未完成：灰色边框

## 图片资产

共 8 张 AI 生成图片，存放在 `public/cooking/` 目录：

| 文件名 | 内容描述 | 尺寸 |
|--------|----------|------|
| noodle-start.jpg | 空碗 + 面粉袋 + 水壶 | 1024×1024 |
| noodle-step1.jpg | 面粉倒入碗中 | 1024×1024 |
| noodle-step2.jpg | 水倒入面粉中 | 1024×1024 |
| noodle-step3.jpg | 小手搅拌面糊 | 1024×1024 |
| noodle-step4.jpg | 擀面杖擀面皮 | 1024×1024 |
| noodle-step5.jpg | 刀切成面条 | 1024×1024 |
| noodle-step6.jpg | 面条在锅里煮，冒热气 | 1024×1024 |
| noodle-final.jpg | 一碗热腾腾的手工面条 | 1024×1024 |

风格：可爱卡通，和穿衣模式一致，色彩鲜艳，无文字，适合 2-3 岁。

## 语音流程

| 时机 | 语音内容 |
|------|----------|
| 每步出题 | "F for Flour"（字母 + 单词） |
| 答对 | 动作词组，如 "Add flour!" |
| 答错 | 按下的字母音，如 "X" |
| 庆祝 | "Yummy! Noodles are ready! Let's eat!" |

复用现有的 `speech.ts` Web Speech API 封装。

## 样式规范

### 颜色
- 背景：`#fff8e7` → `#ffe8d0`（暖黄厨房）
- 庆祝背景：`#fff8a0` → `#ffe880`（金色）
- 进度条已完成：`var(--color-green)`
- 进度条当前：`var(--color-primary)`

### 字体
- 题目字母：`var(--font-3xl)`，粗体
- 单词：`var(--font-xl)`
- 中文：`var(--font-md)`
- 动作词组：`var(--font-sm)`，灰色

### 动画
- 图片切换：`animate-fadeIn`（0.4s）
- 正确反馈：`animate-pulse`（按键绿色）
- 错误反馈：`animate-wiggle`（按键红色）
- 星星特效：`animate-sparkle`（从天而降）

## 与现有系统的集成

### 场景选择
在 `scenes.ts` 中新增一个普通场景（非特殊场景）：
```typescript
{
  id: 'kitchen',
  name: '小厨房',
  nameEn: 'Kitchen',
  emoji: '🍽️',
  bgFrom: '#f0d8ff',
  bgTo: '#ffe4f0',
  wordIds: ['bread', 'egg', 'icecream', 'lemon', 'milk', 'noodle'],
}
```

这个场景在场景选择页面显示为普通场景。点击进入模式选择后，模式选择页面新增一个"Cook"按钮，点击后路由到 `/#/cook`。

### 声音系统
复用 `SoundContext`，全局声音开关控制所有语音和音效。

### 键盘组件
复用 `Keyboard.tsx`，传入当前正确答案字母，高亮闪烁提示。

## 错误处理

- 快速连续按键：用 `isAnswering` 状态锁防止重复输入
- 图片加载失败：显示占位图（🍜 emoji）+ 重试按钮
- 语音不可用：静默继续，不影响游戏流程

## 性能考虑

- 图片预加载：首屏只预加载 `noodle-start.jpg`，进入游戏后按顺序预加载下一步图片
- 总图片数：8 张，远少于穿衣模式的 53 张，手机无压力

## 扩展计划（未来）

| 菜品 | 步骤数 | 难度 |
|------|--------|------|
| 煎蛋 Fried Egg | 4 步 | 简单 |
| 沙拉 Salad | 3 步 | 简单 |
| 汤 Soup | 5 步 | 中等 |
| 面包 Bread | 5 步 | 中等 |

每新增一个菜品只需：
1. 在 `cookingData.ts` 新增 `Recipe` 数据
2. 生成对应的 AI 图片
3. 在场景选择中新增卡片

## 回退方案

如果 AI 图片生成延迟，可先使用 emoji 占位 + CSS 动画版本上线，后续替换为 AI 图片。占位方案：
- 碗：🥣
- 面粉：🌾
- 水：💧
- 搅拌：👐
- 擀面：🍥
- 切面：🔪
- 煮面：🔥
- 成品：🍜
