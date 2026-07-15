# React 主产品上线实施计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 将穿衣游戏从静态 HTML 页面迁移到 React SPA 中，让主产品（Home → SceneSelect → ModeSelect → Game）完整可用并部署上线。

**Architecture:** 保留现有 React 路由结构，将 `DressMode.tsx` 从跳板改为真正的 React 穿衣游戏页面。使用已有的 JPG 图片序列方案（和 `public/dress-up/` 相同的图片资源），复用 `speech.ts`、`Keyboard.tsx`、`TopBar.tsx` 等成熟组件。穿衣模式增加主题选择子页面。探索/聆听模式保持不变。

**Tech Stack:** React 18 + TypeScript + Vite + Web Speech API

**关键决策：** 穿衣模式使用 JPG 图片序列（非 SVG 衣物组件），因为：
1. JPG 图片已打磨好（6个主题，54张图），用户已验证满意
2. SVG 衣物组件只有4个主题，缺少医生和厨师
3. JPG 方案支持更丰富的场景（烤箱、小熊病人等），SVG 难以实现

---

## 现有代码状态

### 可直接复用的组件（已完整实现，无需修改）

| 组件 | 文件 | 说明 |
|------|------|------|
| 主页 | `src/pages/Home.tsx` | Play 按钮 → /scenes |
| 场景选择 | `src/pages/SceneSelect.tsx` | 6个场景卡片 + 穿衣入口 |
| 模式选择 | `src/pages/ModeSelect.tsx` | Explore / Find it |
| 探索模式 | `src/pages/ExploreMode.tsx` | 完整可用 |
| 聆听模式 | `src/pages/ListenMode.tsx` | 完整可用 |
| 键盘 | `src/components/Keyboard.tsx` | QWERTY 虚拟+物理键盘 |
| 顶部栏 | `src/components/TopBar.tsx` | 返回+标题+声音开关 |
| 语音工具 | `src/utils/speech.ts` | Web Speech API 封装 |
| 声音上下文 | `src/utils/SoundContext.tsx` | 全局声音开关 |
| 台词数据 | `src/data/bunnyLines.ts` | 6类鼓励台词 |
| 计时器 | `src/utils/useTimer.ts` | 暂停/恢复/重置 |
| 全局样式 | `src/styles/global.css` | CSS变量+动画+响应式 |
| 路由 | `src/App.tsx` | 6条路由 + SoundProvider |

### 需要新建/重写的组件

| 组件 | 说明 |
|------|------|
| `DressMode.tsx` | **重写**：从跳板改为真正的 React 穿衣游戏页面 |
| `DressThemeSelect.tsx` | **新建**：穿衣主题选择页面（6个主题卡片） |
| `dressThemes.ts` | **重写**：从SVG衣物数据改为JPG图片序列数据（匹配 public/dress-up/） |

### 沉睡代码（暂不删除，留作未来 SVG 方案备用）

- `src/components/DressBunny.tsx`
- `src/components/DressCharacter.tsx`
- `src/components/DressCelebration.tsx`
- `src/components/BunnyClothing.tsx`（912行）

---

## Task 1: 重写穿衣主题数据

**Files:**
- Modify: `src/data/dressThemes.ts`

- [ ] **Step 1: 重写 dressThemes.ts**

将现有 SVG 衣物数据替换为 JPG 图片序列数据，匹配 `public/dress-up/assets/` 中已有的6个主题。数据结构对齐静态 HTML 中的 `themes` 对象。

```typescript
// src/data/dressThemes.ts

export interface DressItem {
  letter: string;
  word: string;
  wordCn: string;
  emoji: string;
  stepImg: string;  // 图片路径，相对于 public/
}

export interface DressTheme {
  id: string;
  name: string;
  nameEn: string;
  emoji: string;
  startImg: string;   // 初始图
  finalImg: string;   // 最终图
  celebrationEmoji: string;
  celebrationText: string;
  items: DressItem[];
  weatherEffect?: 'clouds' | 'rain' | 'snow' | 'bubbles' | 'hearts' | 'steam';
  bgGradient?: string;  // 背景渐变
}

export const dressThemes: Record<string, DressTheme> = {
  sunny: {
    id: 'sunny',
    name: '阳光海滩',
    nameEn: 'Sunny Beach',
    emoji: '☀️',
    startImg: 'dress-up/assets/sunny-start.jpg',
    finalImg: 'dress-up/assets/sunny-final.jpg',
    celebrationEmoji: '🏖️',
    celebrationText: 'Beach time!',
    weatherEffect: 'clouds',
    bgGradient: 'linear-gradient(180deg, #87CEEB 0%, #FFF8DC 50%, #F4E3C1 100%)',
    items: [
      { letter: 'H', word: 'Hat', wordCn: '草帽', emoji: '👒', stepImg: 'dress-up/assets/sunny-step1.jpg' },
      { letter: 'T', word: 'T-shirt', wordCn: 'T恤', emoji: '👕', stepImg: 'dress-up/assets/sunny-step2.jpg' },
      { letter: 'S', word: 'Shorts', wordCn: '短裤', emoji: '🩳', stepImg: 'dress-up/assets/sunny-step3.jpg' },
      { letter: 'S', word: 'Shoes', wordCn: '鞋子', emoji: '👟', stepImg: 'dress-up/assets/sunny-step4.jpg' },
      { letter: 'S', word: 'Sunglasses', wordCn: '太阳镜', emoji: '🕶️', stepImg: 'dress-up/assets/sunny-step5.jpg' },
      { letter: 'B', word: 'Bucket', wordCn: '沙桶', emoji: '🪣', stepImg: 'dress-up/assets/sunny-step6.jpg' },
    ]
  },
  pool: {
    id: 'pool',
    name: '泳池派对',
    nameEn: 'Pool Day',
    emoji: '🏊',
    startImg: 'dress-up/assets/pool-start.jpg',
    finalImg: 'dress-up/assets/pool-final.jpg',
    celebrationEmoji: '💦',
    celebrationText: 'Splash!',
    weatherEffect: 'bubbles',
    bgGradient: 'linear-gradient(180deg, #87CEEB 0%, #98FB98 100%)',
    items: [
      { letter: 'S', word: 'Swimsuit', wordCn: '泳衣', emoji: '👙', stepImg: 'dress-up/assets/pool-step1.jpg' },
      { letter: 'C', word: 'Swim Cap', wordCn: '泳帽', emoji: '🧢', stepImg: 'dress-up/assets/pool-step2.jpg' },
      { letter: 'G', word: 'Goggles', wordCn: '泳镜', emoji: '🥽', stepImg: 'dress-up/assets/pool-step3.jpg' },
      { letter: 'A', word: 'Armbands', wordCn: '手臂圈', emoji: '💪', stepImg: 'dress-up/assets/pool-step4.jpg' },
      { letter: 'F', word: 'Float', wordCn: '游泳圈', emoji: '⭕', stepImg: 'dress-up/assets/pool-step5.jpg' },
      { letter: 'S', word: 'Slippers', wordCn: '拖鞋', emoji: '🩴', stepImg: 'dress-up/assets/pool-step6.jpg' },
    ]
  },
  rainy: {
    id: 'rainy',
    name: '雨天踩水',
    nameEn: 'Rainy Day',
    emoji: '☔',
    startImg: 'dress-up/assets/rainy-start.jpg',
    finalImg: 'dress-up/assets/rainy-final.jpg',
    celebrationEmoji: '🌧️',
    celebrationText: 'Rain rain go away!',
    weatherEffect: 'rain',
    bgGradient: 'linear-gradient(180deg, #778899 0%, #B0C4DE 100%)',
    items: [
      { letter: 'R', word: 'Raincoat', wordCn: '雨衣', emoji: '🧥', stepImg: 'dress-up/assets/rainy-step1.jpg' },
      { letter: 'B', word: 'Rain Boots', wordCn: '雨靴', emoji: '🥾', stepImg: 'dress-up/assets/rainy-step2.jpg' },
      { letter: 'U', word: 'Umbrella', wordCn: '雨伞', emoji: '☂️', stepImg: 'dress-up/assets/rainy-step3.jpg' },
      { letter: 'F', word: 'Frog', wordCn: '小青蛙', emoji: '🐸', stepImg: 'dress-up/assets/rainy-step4.jpg' },
      { letter: 'S', word: 'Snail', wordCn: '小蜗牛', emoji: '🐌', stepImg: 'dress-up/assets/rainy-step5.jpg' },
    ]
  },
  snowy: {
    id: 'snowy',
    name: '雪天滑雪',
    nameEn: 'Snowy Day',
    emoji: '❄️',
    startImg: 'dress-up/assets/snowy-start.jpg',
    finalImg: 'dress-up/assets/snowy-final.jpg',
    celebrationEmoji: '⛄',
    celebrationText: 'Snow much fun!',
    weatherEffect: 'snow',
    bgGradient: 'linear-gradient(180deg, #B0E0E6 0%, #F0F8FF 100%)',
    items: [
      { letter: 'C', word: 'Coat', wordCn: '外套', emoji: '🧥', stepImg: 'dress-up/assets/snowy-step1.jpg' },
      { letter: 'S', word: 'Scarf', wordCn: '围巾', emoji: '🧣', stepImg: 'dress-up/assets/snowy-step2.jpg' },
      { letter: 'H', word: 'Hat', wordCn: '帽子', emoji: '🧢', stepImg: 'dress-up/assets/snowy-step3.jpg' },
      { letter: 'G', word: 'Gloves', wordCn: '手套', emoji: '🧤', stepImg: 'dress-up/assets/snowy-step4.jpg' },
      { letter: 'B', word: 'Snow Boots', wordCn: '雪地靴', emoji: '🥾', stepImg: 'dress-up/assets/snowy-step5.jpg' },
      { letter: 'S', word: 'Snowboard', wordCn: '滑雪板', emoji: '🏂', stepImg: 'dress-up/assets/snowy-step6.jpg' },
    ]
  },
  doctor: {
    id: 'doctor',
    name: '小医生',
    nameEn: 'Little Doctor',
    emoji: '🩺',
    startImg: 'dress-up/assets/doctor-start.jpg',
    finalImg: 'dress-up/assets/doctor-final-v3.jpg',
    celebrationEmoji: '❤️',
    celebrationText: 'All better!',
    weatherEffect: 'hearts',
    bgGradient: 'linear-gradient(180deg, #E8F5E9 0%, #FFF9C4 100%)',
    items: [
      { letter: 'W', word: 'White Coat', wordCn: '白大褂', emoji: '🥼', stepImg: 'dress-up/assets/doctor-step1.jpg' },
      { letter: 'M', word: 'Mask', wordCn: '口罩', emoji: '😷', stepImg: 'dress-up/assets/doctor-step2.jpg' },
      { letter: 'H', word: 'Doctor Hat', wordCn: '医生帽', emoji: '⛑️', stepImg: 'dress-up/assets/doctor-step3.jpg' },
      { letter: 'S', word: 'Stethoscope', wordCn: '听诊器', emoji: '🩺', stepImg: 'dress-up/assets/doctor-step4.jpg' },
      { letter: 'T', word: 'Thermometer', wordCn: '体温计', emoji: '🌡️', stepImg: 'dress-up/assets/doctor-step5.jpg' },
      { letter: 'M', word: 'Medicine', wordCn: '药', emoji: '💊', stepImg: 'dress-up/assets/doctor-step6.jpg' },
      { letter: 'B', word: 'Band-aid', wordCn: '创可贴', emoji: '🩹', stepImg: 'dress-up/assets/doctor-step7.jpg' },
    ]
  },
  chef: {
    id: 'chef',
    name: '小厨师',
    nameEn: 'Little Chef',
    emoji: '👨‍🍳',
    startImg: 'dress-up/assets/chef-start.jpg',
    finalImg: 'dress-up/assets/chef-final.jpg',
    celebrationEmoji: '🎂',
    celebrationText: "Let's bake a cake!",
    weatherEffect: 'steam',
    bgGradient: 'linear-gradient(180deg, #FFF3E0 0%, #FFECB3 100%)',
    items: [
      { letter: 'A', word: 'Apron', wordCn: '围裙', emoji: '👩‍🍳', stepImg: 'dress-up/assets/chef-step1.jpg' },
      { letter: 'C', word: 'Chef Hat', wordCn: '厨师帽', emoji: '🎩', stepImg: 'dress-up/assets/chef-step2.jpg' },
      { letter: 'R', word: 'Rolling Pin', wordCn: '擀面杖', emoji: '🥖', stepImg: 'dress-up/assets/chef-step3.jpg' },
      { letter: 'D', word: 'Dough', wordCn: '面团', emoji: '🍞', stepImg: 'dress-up/assets/chef-step4.jpg' },
      { letter: 'O', word: 'Oven', wordCn: '烤箱', emoji: '🔥', stepImg: 'dress-up/assets/chef-step5.jpg' },
      { letter: 'P', word: 'Plate', wordCn: '盘子', emoji: '🍽️', stepImg: 'dress-up/assets/chef-step6.jpg' },
      { letter: 'B', word: 'Bread', wordCn: '面包', emoji: '🍞', stepImg: 'dress-up/assets/chef-step7.jpg' },
      { letter: 'C', word: 'Cookie', wordCn: '饼干', emoji: '🍪', stepImg: 'dress-up/assets/chef-step8.jpg' },
      { letter: 'C', word: 'Cake', wordCn: '蛋糕', emoji: '🎂', stepImg: 'dress-up/assets/chef-step9.jpg' },
      { letter: 'F', word: 'Fork', wordCn: '叉子', emoji: '🍴', stepImg: 'dress-up/assets/chef-step10.jpg' },
      { letter: 'K', word: 'Knife', wordCn: '刀', emoji: '🔪', stepImg: 'dress-up/assets/chef-step11.jpg' },
    ]
  },
};

export const dressThemeList = Object.values(dressThemes);
```

- [ ] **Step 2: 验证 TypeScript 编译**

Run: `cd /workspace && npx tsc --noEmit`
Expected: 无报错（可能需要修复类型引用）

- [ ] **Step 3: Commit**

```bash
git add src/data/dressThemes.ts
git commit -m "refactor: rewrite dressThemes data to match JPG image sequence"
```

---

## Task 2: 新建穿衣主题选择页面

**Files:**
- Create: `src/pages/DressThemeSelect.tsx`
- Create: `src/pages/DressThemeSelect.css`

- [ ] **Step 1: 创建主题选择页面**

参照 `SceneSelect.tsx` 和静态 HTML 中场景选择的布局，创建穿衣主题选择页面。6个主题卡片网格布局，支持点击选择和键盘方向键导航。

页面布局：
- 顶部 TopBar（返回按钮 + 标题"穿衣服乐园" + 声音开关）
- 6个主题卡片（3x2网格），每个卡片显示 emoji + 中文名 + 英文名
- 选中高亮 + 脉冲动画
- 底部键盘提示

```typescript
// src/pages/DressThemeSelect.tsx
import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { dressThemeList } from '../data/dressThemes';
import TopBar from '../components/TopBar';
import './DressThemeSelect.css';

export default function DressThemeSelect() {
  const navigate = useNavigate();
  const [selectedIdx, setSelectedIdx] = useState(0);

  const startGame = useCallback((themeId: string) => {
    navigate(`/dress/${themeId}`);
  }, [navigate]);

  // 键盘导航：方向键选择，Enter确认
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      const cols = 3;
      switch (e.key) {
        case 'ArrowRight': setSelectedIdx(i => Math.min(i + 1, dressThemeList.length - 1)); break;
        case 'ArrowLeft': setSelectedIdx(i => Math.max(i - 1, 0)); break;
        case 'ArrowDown': setSelectedIdx(i => Math.min(i + cols, dressThemeList.length - 1)); break;
        case 'ArrowUp': setSelectedIdx(i => Math.max(i - cols, 0)); break;
        case 'Enter': startGame(dressThemeList[selectedIdx].id); break;
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [selectedIdx, startGame]);

  return (
    <div className="dress-theme-select">
      <TopBar title="穿衣服乐园" showBack showSound />
      <div className="dress-theme-grid">
        {dressThemeList.map((theme, idx) => (
          <div
            key={theme.id}
            className={`dress-theme-card ${idx === selectedIdx ? 'selected' : ''}`}
            onClick={() => setSelectedIdx(idx)}
            onDoubleClick={() => startGame(theme.id)}
          >
            <div className="dress-theme-emoji">{theme.emoji}</div>
            <div className="dress-theme-name">{theme.name}</div>
            <div className="dress-theme-en">{theme.nameEn}</div>
          </div>
        ))}
      </div>
      <div className="dress-theme-hint">
        <kbd>←</kbd> <kbd>→</kbd> <kbd>↑</kbd> <kbd>↓</kbd> 选择 · <kbd>Enter</kbd> 开始
      </div>
    </div>
  );
}
```

CSS 样式参照静态 HTML 中 `.scene-select` 和 `.scene-card` 的设计，使用 CSS 变量保持一致性。

- [ ] **Step 2: 验证编译**

Run: `cd /workspace && npx tsc --noEmit`

- [ ] **Step 3: Commit**

```bash
git add src/pages/DressThemeSelect.tsx src/pages/DressThemeSelect.css
git commit -m "feat: add dress theme selection page with 6 themes"
```

---

## Task 3: 重写 DressMode 为真正的 React 穿衣游戏

**Files:**
- Modify: `src/pages/DressMode.tsx`
- Create: `src/pages/DressMode.css`

这是核心任务。将现有的跳板代码替换为完整的 React 穿衣游戏页面。

- [ ] **Step 1: 重写 DressMode.tsx**

核心功能（对齐静态 HTML 版本的行为）：

1. **路由参数**：从 `useParams()` 获取 `themeId`
2. **游戏状态**：`currentItemIndex`、`wornCount`、`currentImg`、`gamePhase`（playing / celebrating）
3. **图片切换**：答对字母 → 切换步骤图（带 pop 动画）
4. **最终画面**：最后一个道具答对 → 立即切换最终图 → 300ms 后显示庆祝
5. **语音**：复用 `speech.ts`，答对后播放字母+单词发音（不阻塞 UI）
6. **键盘**：复用 `Keyboard.tsx`，物理+虚拟键盘
7. **问题面板**：右侧显示目标字母（大号弹跳）+ emoji + 英文单词 + 进度
8. **道具清单**：小圆点显示已完成/当前/未完成
9. **天气特效**：根据主题的 `weatherEffect` 渲染对应粒子动画
10. **庆祝弹窗**：彩带 + 主题庆祝语 + "Next" 按钮

页面布局（参照静态 HTML 版本，左右布局）：
- 左侧：兔子图片（`<img>` 标签，`object-fit: contain`）
- 右侧：问题面板（字母 + emoji + 单词）+ 道具清单
- 底部：虚拟键盘

关键实现细节：
- 图片预加载：进入页面时预加载当前主题的所有步骤图
- 答错防抖：500ms 内忽略重复错误按键
- 键盘按键在 `celebrating` 阶段不响应
- 返回按钮在游戏中不退出（需确认），避免误操作

```typescript
// src/pages/DressMode.tsx — 核心结构骨架
import { useState, useEffect, useRef, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { dressThemes, DressTheme, DressItem } from '../data/dressThemes';
import { speakLetter, speakWord } from '../utils/speech';
import { useSound } from '../utils/SoundContext';
import Keyboard from '../components/Keyboard';
import TopBar from '../components/TopBar';
import './DressMode.css';

export default function DressMode() {
  const { themeId } = useParams<{ themeId: string }>();
  const navigate = useNavigate();
  const { soundEnabled } = useSound();
  const theme = dressThemes[themeId || ''];

  const [currentItemIndex, setCurrentItemIndex] = useState(0);
  const [currentImg, setCurrentImg] = useState(theme?.startImg || '');
  const [isAnswering, setIsAnswering] = useState(false);
  const [isCelebrating, setIsCelebrating] = useState(false);
  const wrongTimerRef = useRef<number | null>(null);

  // 初始化图片
  useEffect(() => {
    if (theme) setCurrentImg(theme.startImg);
    setCurrentItemIndex(0);
    setIsCelebrating(false);
    setIsAnswering(false);
  }, [theme]);

  // 预加载图片
  useEffect(() => {
    if (!theme) return;
    theme.items.forEach(item => {
      const img = new Image();
      img.src = item.stepImg;
    });
    const finalImg = new Image();
    finalImg.src = theme.finalImg;
  }, [theme]);

  const currentItem: DressItem | undefined = theme?.items[currentItemIndex];

  const handleKeyPress = useCallback((letter: string) => {
    if (!theme || !currentItem || isCelebrating || isAnswering) return;
    const upper = letter.toUpperCase();
    if (upper === currentItem.letter) {
      // 答对
      setIsAnswering(true);
      const isLast = currentItemIndex >= theme.items.length - 1;
      if (isLast) {
        // 最后一个：立即显示最终图 + 庆祝
        setCurrentImg(theme.finalImg);
        setIsAnswering(false);
        setTimeout(() => setIsCelebrating(true), 300);
        if (soundEnabled) {
          speakLetter(currentItem.letter, () => speakWord(currentItem.word));
        }
      } else {
        // 非最后：显示步骤图
        setTimeout(() => {
          setCurrentImg(currentItem.stepImg);
          setIsAnswering(false);
          setCurrentItemIndex(i => i + 1);
        }, 200);
        if (soundEnabled) {
          speakLetter(currentItem.letter, () => speakWord(currentItem.word));
        }
      }
    } else {
      // 答错（防抖 500ms）
      if (wrongTimerRef.current) return;
      wrongTimerRef.current = window.setTimeout(() => {
        wrongTimerRef.current = null;
      }, 500);
      // TODO: 显示错误反馈动画
    }
  }, [theme, currentItem, currentItemIndex, isCelebrating, isAnswering, soundEnabled]);

  // 物理键盘
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key.length === 1 && /[a-zA-Z]/.test(e.key)) {
        handleKeyPress(e.key);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [handleKeyPress]);

  if (!theme) return <div>Theme not found</div>;

  return (
    <div className="dress-game" style={{ background: theme.bgGradient }}>
      <TopBar title={`${theme.emoji} ${theme.name}`} showBack showSound />
      <div className="dress-game-area">
        <div className="dress-bunny-container">
          <img src={currentImg} alt="" className="dress-bunny-img" />
        </div>
        <div className="dress-question-panel">
          {/* 问题框、道具清单 */}
        </div>
      </div>
      <Keyboard onKeyPress={handleKeyPress} highlightLetter={currentItem?.letter} />
      {isCelebrating && (
        <div className="dress-celebration">
          {/* 庆祝弹窗 */}
        </div>
      )}
    </div>
  );
}
```

完整实现需包含：天气特效组件、道具清单、庆祝弹窗（含彩带动画）、错误反馈动画等。CSS 参照静态 HTML 版本的样式，使用 CSS 变量。

- [ ] **Step 2: 验证编译**

Run: `cd /workspace && npx tsc --noEmit`

- [ ] **Step 3: Commit**

```bash
git add src/pages/DressMode.tsx src/pages/DressMode.css
git commit -m "feat: implement React dress-up game page"
```

---

## Task 4: 更新路由和场景选择

**Files:**
- Modify: `src/App.tsx`
- Modify: `src/pages/SceneSelect.tsx`

- [ ] **Step 1: 更新 App.tsx 路由**

将 `/dress` 路由改为先进入主题选择，添加 `/dress/:themeId` 动态路由。

```typescript
// 修改前
<Route path="/dress" element={<DressMode />} />

// 修改后
import DressThemeSelect from './pages/DressThemeSelect';
// ...
<Route path="/dress" element={<DressThemeSelect />} />
<Route path="/dress/:themeId" element={<DressMode />} />
```

- [ ] **Step 2: 更新 SceneSelect.tsx**

移除 `dress` 场景的特殊跳转逻辑（`window.location.href`），改为正常的 React 路由导航 `navigate('/dress')`。

```typescript
// 修改前（在 SceneSelect.tsx 中）
if (scene.isSpecial) {
  window.location.href = '/dress-up/';
  return;
}

// 修改后
if (scene.isSpecial) {
  navigate('/dress');
  return;
}
```

- [ ] **Step 3: 验证编译**

Run: `cd /workspace && npx tsc --noEmit`

- [ ] **Step 4: Commit**

```bash
git add src/App.tsx src/pages/SceneSelect.tsx
git commit -m "feat: integrate dress-up into React SPA routing"
```

---

## Task 5: 本地构建测试

**Files:** 无新建/修改

- [ ] **Step 1: 安装依赖并构建**

```bash
cd /workspace && npm install && npm run build
```

Expected: 构建成功，输出到 `dist/`

- [ ] **Step 2: 本地预览**

```bash
cd /workspace && npm run preview
```

在浏览器中验证：
1. 主页 → Play → 场景选择 → 穿衣乐园 → 主题选择 → 进入游戏
2. 探索模式和聆听模式仍正常工作
3. 穿衣游戏：键盘输入、图片切换、语音播放、庆祝弹窗
4. 响应式布局（手机/平板/桌面）
5. 返回导航正常

- [ ] **Step 3: 修复构建/运行中发现的问题**

可能的问题：
- `vite-plugin-singlefile` 可能把所有资源内联，导致图片加载异常 → 检查 Vite 配置
- TypeScript 类型错误 → 修复
- 路由在 GitHub Pages 子路径下不工作 → 确保 `base: './'` 或使用 HashRouter

- [ ] **Step 4: Commit 修复**

```bash
git add -A
git commit -m "fix: resolve build and runtime issues"
```

---

## Task 6: 部署上线

**Files:** 无新建/修改（使用 deploy-check Skill）

- [ ] **Step 1: 使用 deploy-check Skill 部署**

触发 deploy-check Skill，它会：
1. 检测到 GitHub Actions + Vite 构建
2. 自动同步 `public/` 中需要保留的静态资源
3. 提交推送
4. 等待 GitHub Actions 构建完成
5. 验证 CDN 是否刷新

注意：`npm run build` 会将 React 应用构建到 `dist/`，`public/` 中的文件会被复制到 `dist/`。所以 `public/dress-up/assets/` 中的图片会被自动包含在构建产物中。

- [ ] **Step 2: 验证线上**

访问 `https://kakapon-xu.github.io/bunny-abc/`，验证：
1. 主产品完整流程可用
2. 穿衣游戏6个主题全部正常
3. 旧的 `/dress-up/` 静态页面仍可访问（向后兼容）

- [ ] **Step 3: Commit**

```bash
git commit -m "deploy: v1.0 - React SPA with dress-up mode"
```

---

## Task 7: 清理和收尾

**Files:**
- Modify: `docs/superpowers/specs/2026-07-06-dress-mode-design.md`

- [ ] **Step 1: 更新设计文档**

在穿衣模式设计文档中记录实际实现方案（JPG 图片序列 vs SVG 衣物组件的决策）。

- [ ] **Step 2: 最终 Commit**

```bash
git add docs/
git commit -m "docs: update dress mode design doc with actual implementation"
```