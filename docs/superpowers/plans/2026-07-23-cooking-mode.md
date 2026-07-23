# 做饭大作战模式 — 实现计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 在 Bunny ABC React SPA 中新增"做饭大作战"游戏模式，孩子通过按键盘字母完成从面粉到面条的 6 步做菜流程。

**Architecture:** 纯 React 页面，复用现有 TopBar / Bunny / Keyboard 组件。数据驱动——食谱定义在 `cookingData.ts`，页面从数据渲染。路由 `/#/cook`。

**Tech Stack:** React 18 + TypeScript + Web Speech API + CSS 动画

---

## 文件结构

| 操作 | 文件 | 职责 |
|------|------|------|
| 新建 | `src/data/cookingData.ts` | 食谱数据模型 + 面条食谱数据 + 预加载工具函数 |
| 新建 | `src/styles/cooking.css` | 做饭模式专用样式 |
| 新建 | `src/components/CookingBowl.tsx` | 步骤图片展示容器 |
| 新建 | `src/components/CookingProgress.tsx` | 底部 6 圆点进度条 |
| 新建 | `src/pages/CookMode.tsx` | 主页面：游戏状态管理、交互逻辑 |
| 修改 | `src/App.tsx` | 新增 `/cook` 路由 |
| 修改 | `src/pages/ModeSelect.tsx` | 厨房场景新增 Cook 按钮 |
| 修改 | `src/pages/ModeSelect.css` | Cook 按钮样式 |
| 新建 | `public/cooking/` | 8 张 emoji 占位图片（后期替换为 AI 图片） |

---

### Task 1: 创建食谱数据模块

**Files:**
- Create: `src/data/cookingData.ts`

- [ ] **Step 1: 创建 `src/data/cookingData.ts`**

```typescript
// 做饭模式 — 食谱数据模型
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
  name: string
  nameEn: string
  emoji: string
  startImage: string
  finalImage: string
  steps: CookingStep[]
}

// 手工面条食谱
export const noodleRecipe: CookingRecipe = {
  id: 'noodle',
  name: '手工面条',
  nameEn: 'Handmade Noodles',
  emoji: '🍜',
  startImage: '/cooking/noodle-start.jpg',
  finalImage: '/cooking/noodle-final.jpg',
  steps: [
    {
      letter: 'F', word: 'Flour', wordCn: '面粉', emoji: '🌾',
      action: 'Add flour', image: '/cooking/noodle-step1.jpg',
    },
    {
      letter: 'W', word: 'Water', wordCn: '水', emoji: '💧',
      action: 'Add water', image: '/cooking/noodle-step2.jpg',
    },
    {
      letter: 'M', word: 'Mix', wordCn: '搅拌', emoji: '👐',
      action: 'Mix it up', image: '/cooking/noodle-step3.jpg',
    },
    {
      letter: 'R', word: 'Roll', wordCn: '擀面', emoji: '🍥',
      action: 'Roll it flat', image: '/cooking/noodle-step4.jpg',
    },
    {
      letter: 'C', word: 'Cut', wordCn: '切面', emoji: '🔪',
      action: 'Cut the dough', image: '/cooking/noodle-step5.jpg',
    },
    {
      letter: 'B', word: 'Boil', wordCn: '煮面', emoji: '🔥',
      action: 'Boil noodles', image: '/cooking/noodle-step6.jpg',
    },
  ],
}

// 当前仅一道菜，未来扩展为数组
export const allRecipes: CookingRecipe[] = [noodleRecipe]

/** 获取食谱 */
export function getRecipeById(id: string): CookingRecipe | undefined {
  return allRecipes.find(r => r.id === id)
}

/** 预加载食谱的所有图片 */
export function preloadRecipeImages(recipe: CookingRecipe): void {
  const images = [recipe.startImage, recipe.finalImage, ...recipe.steps.map(s => s.image)]
  images.forEach(src => {
    const img = new Image()
    img.src = src
  })
}
```

- [ ] **Step 2: 提交**

```bash
git add src/data/cookingData.ts
git commit -m "feat: add cooking recipe data model with noodle recipe"
```

---

### Task 2: 创建做饭模式样式

**Files:**
- Create: `src/styles/cooking.css`

- [ ] **Step 1: 创建 `src/styles/cooking.css`**

```css
/* 做饭模式 — 专用样式 */

.cook-page {
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
}

/* 游戏区域 */
.cook-game-area {
  flex: 1;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  padding: 16px;
  max-width: 480px;
}

/* 步骤图片容器 */
.cook-bowl {
  width: 85%;
  max-width: 340px;
  aspect-ratio: 1;
  border-radius: 24px;
  overflow: hidden;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  position: relative;
  background: #fff;
}

.cook-bowl img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.cook-bowl.animate-in {
  animation: cookFadeIn 0.4s ease;
}

@keyframes cookFadeIn {
  from { opacity: 0; transform: scale(0.95); }
  to { opacity: 1; transform: scale(1); }
}

/* 题目框 */
.cook-question {
  background: white;
  border-radius: 20px;
  padding: 16px 28px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  min-width: 200px;
  transition: transform 0.2s ease;
}

.cook-question.wrong {
  animation: cookShake 0.4s ease;
  border: 3px solid #ff4444;
}

.cook-question.correct {
  animation: cookPulse 0.4s ease;
  border: 3px solid #22c55e;
  background: #f0fdf4;
}

@keyframes cookShake {
  0%, 100% { transform: translateX(0); }
  20% { transform: translateX(-8px); }
  40% { transform: translateX(8px); }
  60% { transform: translateX(-6px); }
  80% { transform: translateX(6px); }
}

@keyframes cookPulse {
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
}

.cook-question-letter {
  font-size: 48px;
  font-weight: 900;
  color: var(--color-primary);
  line-height: 1;
}

.cook-question-word {
  font-size: 22px;
  font-weight: 700;
  color: var(--color-text);
}

.cook-question-cn {
  font-size: 14px;
  color: var(--color-text-muted);
}

.cook-question-action {
  font-size: 14px;
  color: var(--color-primary);
  font-weight: 600;
  margin-top: 2px;
}

/* 进度条 */
.cook-progress {
  display: flex;
  gap: 10px;
  padding: 8px 0;
}

.cook-progress-dot {
  width: 14px;
  height: 14px;
  border-radius: 50%;
  border: 2px solid #d0d0d0;
  background: #f5f5f5;
  transition: all 0.3s ease;
}

.cook-progress-dot.done {
  background: #22c55e;
  border-color: #22c55e;
}

.cook-progress-dot.current {
  background: var(--color-primary);
  border-color: var(--color-primary-dark);
  animation: dotPulse 0.8s ease-in-out infinite;
}

@keyframes dotPulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.4); }
}

/* 反馈文字 */
.cook-feedback {
  font-size: 48px;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: opacity 0.2s ease;
}

.cook-feedback.show {
  opacity: 1;
}

.cook-feedback:not(.show) {
  opacity: 0;
}

/* 庆祝画面 */
.cook-celebration {
  position: fixed;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
  z-index: 100;
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.5s ease;
}

.cook-celebration.active {
  opacity: 1;
  pointer-events: auto;
}

.cook-celebration-bg {
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, #fff8a0, #ffe880);
  z-index: -1;
}

.cook-celebration-emoji {
  font-size: 80px;
  animation: celebBounce 0.6s ease infinite alternate;
}

@keyframes celebBounce {
  from { transform: translateY(0) scale(1); }
  to { transform: translateY(-16px) scale(1.1); }
}

.cook-celebration-text {
  font-size: 28px;
  font-weight: 800;
  color: #333;
  text-align: center;
}

.cook-celebration-sub {
  font-size: 16px;
  color: #666;
}

.cook-celebration-btns {
  display: flex;
  gap: 16px;
  margin-top: 8px;
}

.cook-celebration-btn {
  padding: 14px 28px;
  border-radius: 16px;
  font-size: 18px;
  font-weight: 700;
  border: none;
  cursor: pointer;
  pointer-events: auto;
  transition: transform 0.15s ease;
}

.cook-celebration-btn:active {
  transform: scale(0.95);
}

.cook-celebration-btn.primary {
  background: var(--color-primary);
  color: white;
  box-shadow: 0 4px 12px rgba(255, 107, 157, 0.4);
}

.cook-celebration-btn.secondary {
  background: white;
  color: var(--color-text);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

/* 星星特效 */
.cook-sparkles {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 101;
}

.cook-sparkle {
  position: absolute;
  font-size: 24px;
  animation: sparkleFall linear forwards;
}

@keyframes sparkleFall {
  0% {
    transform: translateY(-60px) rotate(0deg) scale(0);
    opacity: 1;
  }
  20% {
    transform: translateY(10vh) rotate(90deg) scale(1);
    opacity: 1;
  }
  100% {
    transform: translateY(100vh) rotate(360deg) scale(0.3);
    opacity: 0;
  }
}

/* 开始画面 */
.cook-intro {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
  text-align: center;
}

.cook-intro-emoji {
  font-size: 72px;
  animation: celebBounce 1s ease infinite alternate;
}

.cook-intro-title {
  font-size: 28px;
  font-weight: 800;
  color: var(--color-text);
}

.cook-intro-hint {
  font-size: 16px;
  color: var(--color-text-muted);
  display: flex;
  align-items: center;
  gap: 6px;
}

.cook-intro-hint kbd {
  background: #eee;
  border-radius: 6px;
  padding: 2px 8px;
  font-size: 14px;
  font-weight: 700;
}

/* 响应式 */
@media (min-width: 768px) {
  .cook-bowl {
    max-width: 400px;
  }
  .cook-question-letter {
    font-size: 60px;
  }
  .cook-question-word {
    font-size: 28px;
  }
  .cook-progress-dot {
    width: 18px;
    height: 18px;
  }
}
```

- [ ] **Step 2: 提交**

```bash
git add src/styles/cooking.css
git commit -m "feat: add cooking mode styles"
```

---

### Task 3: 创建 CookingBowl 组件

**Files:**
- Create: `src/components/CookingBowl.tsx`

- [ ] **Step 1: 创建 `src/components/CookingBowl.tsx`**

```typescript
import { useState, useEffect } from 'react'

interface CookingBowlProps {
  imageSrc: string
  alt: string
}

function CookingBowl({ imageSrc, alt }: CookingBowlProps) {
  const [animate, setAnimate] = useState(false)

  useEffect(() => {
    // 每次图片切换时触发动画
    setAnimate(false)
    const timer = setTimeout(() => setAnimate(true), 50)
    return () => clearTimeout(timer)
  }, [imageSrc])

  return (
    <div className={`cook-bowl ${animate ? 'animate-in' : ''}`}>
      <img
        src={imageSrc}
        alt={alt}
        onError={(e) => {
          // 图片加载失败时显示占位 emoji
          (e.target as HTMLImageElement).style.display = 'none'
        }}
      />
    </div>
  )
}

export default CookingBowl
```

- [ ] **Step 2: 提交**

```bash
git add src/components/CookingBowl.tsx
git commit -m "feat: add CookingBowl component"
```

---

### Task 4: 创建 CookingProgress 组件

**Files:**
- Create: `src/components/CookingProgress.tsx`

- [ ] **Step 1: 创建 `src/components/CookingProgress.tsx`**

```typescript
interface CookingProgressProps {
  total: number
  current: number  // 0-based: 0 = 第 1 步进行中
}

function CookingProgress({ total, current }: CookingProgressProps) {
  return (
    <div className="cook-progress">
      {Array.from({ length: total }, (_, i) => {
        let dotClass = 'cook-progress-dot'
        if (i < current) dotClass += ' done'
        else if (i === current) dotClass += ' current'
        return <div key={i} className={dotClass} />
      })}
    </div>
  )
}

export default CookingProgress
```

- [ ] **Step 2: 提交**

```bash
git add src/components/CookingProgress.tsx
git commit -m "feat: add CookingProgress component"
```

---

### Task 5: 创建 CookMode 主页面

**Files:**
- Create: `src/pages/CookMode.tsx`

- [ ] **Step 1: 创建 `src/pages/CookMode.tsx`**

```typescript
import { useState, useCallback, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { noodleRecipe, preloadRecipeImages } from '../data/cookingData'
import { speakLetter, speakWord, initSpeech } from '../utils/speech'
import { useSound } from '../utils/SoundContext'
import TopBar from '../components/TopBar'
import Bunny from '../components/Bunny'
import Keyboard from '../components/Keyboard'
import CookingBowl from '../components/CookingBowl'
import CookingProgress from '../components/CookingProgress'
import '../styles/cooking.css'

type GameState = 'intro' | 'playing' | 'celebration'

function CookMode() {
  const navigate = useNavigate()
  const { soundEnabled } = useSound()
  const recipe = noodleRecipe  // 未来可从路由参数选择食谱

  const [gameState, setGameState] = useState<GameState>('intro')
  const [currentStep, setCurrentStep] = useState(0)
  const [isAnswering, setIsAnswering] = useState(false)
  const [feedbackType, setFeedbackType] = useState<'correct' | 'wrong' | null>(null)
  const [speechReady, setSpeechReady] = useState(false)
  const [sparkles, setSparkles] = useState<{ id: number; emoji: string; x: number; delay: number }[]>([])

  const currentStepData = recipe.steps[currentStep]
  const sparkleIdRef = useRef(0)

  // 初始化语音
  useEffect(() => {
    initSpeech().then(() => setSpeechReady(true))
  }, [])

  // 预加载食谱图片
  useEffect(() => {
    preloadRecipeImages(recipe)
  }, [recipe])

  // 物理键盘监听
  useEffect(() => {
    if (gameState !== 'playing' || isAnswering) return

    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key.toUpperCase()
      if (key.length === 1 && key >= 'A' && key <= 'Z') {
        handleAnswer(key)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [gameState, currentStep, isAnswering, soundEnabled, speechReady])

  // 进入游戏
  const startGame = useCallback(() => {
    setCurrentStep(0)
    setGameState('playing')
    setIsAnswering(false)
    setFeedbackType(null)
  }, [])

  // 播放当前题目语音
  const playQuestion = useCallback((step: typeof recipe.steps[0]) => {
    if (!soundEnabled || !speechReady) return
    speakLetter(step.letter, () => {
      speakWord(step.word)
    })
  }, [soundEnabled, speechReady])

  // 进入某一题时播放语音
  useEffect(() => {
    if (gameState === 'playing' && currentStep < recipe.steps.length) {
      const timer = setTimeout(() => {
        playQuestion(recipe.steps[currentStep])
      }, 300)
      return () => clearTimeout(timer)
    }
  }, [gameState, currentStep, playQuestion, recipe.steps])

  // 处理按键回答
  const handleAnswer = useCallback((letter: string) => {
    if (isAnswering || gameState !== 'playing') return

    setIsAnswering(true)
    const correct = letter === currentStepData.letter

    if (correct) {
      setFeedbackType('correct')
      // 播放动作词组
      if (soundEnabled && speechReady) {
        speakWord(currentStepData.action)
      }
      // 延迟进入下一步
      setTimeout(() => {
        const nextStep = currentStep + 1
        if (nextStep >= recipe.steps.length) {
          // 全部完成
          setGameState('celebration')
          triggerCelebration()
        } else {
          setCurrentStep(nextStep)
          setFeedbackType(null)
          setIsAnswering(false)
        }
      }, 1200)
    } else {
      setFeedbackType('wrong')
      // 播放错误字母
      if (soundEnabled && speechReady) {
        speakLetter(letter)
      }
      setTimeout(() => {
        setFeedbackType(null)
        setIsAnswering(false)
      }, 800)
    }
  }, [isAnswering, gameState, currentStep, currentStepData, soundEnabled, speechReady, recipe.steps.length])

  // 庆祝特效
  const triggerCelebration = useCallback(() => {
    const emojis = ['✨', '🌟', '⭐', '💫', '🎉', '🥳', '💖', '🍜']
    const newSparkles = Array.from({ length: 30 }, (_, i) => ({
      id: sparkleIdRef.current++,
      emoji: emojis[i % emojis.length],
      x: Math.random() * 100,
      delay: Math.random() * 2,
    }))
    setSparkles(newSparkles)

    // 播放庆祝语音
    if (soundEnabled && speechReady) {
      setTimeout(() => {
        speakWord('Yummy!')
        setTimeout(() => speakWord('Noodles are ready!'), 1500)
        setTimeout(() => speakWord("Let's eat!"), 3000)
      }, 500)
    }

    // 5秒后清除星星
    setTimeout(() => setSparkles([]), 5000)
  }, [soundEnabled, speechReady])

  // 重新开始
  const restart = useCallback(() => {
    setSparkles([])
    startGame()
  }, [startGame])

  // 获取当前显示图片
  const getDisplayImage = (): string => {
    if (gameState === 'intro') return recipe.startImage
    if (gameState === 'celebration') return recipe.finalImage
    // 显示当前步骤的图片（如果当前是第0步显示开始图）
    if (currentStep === 0) return recipe.startImage
    return recipe.steps[currentStep - 1].image
  }

  return (
    <div className="cook-page">
      <TopBar
        title={gameState === 'celebration' ? 'Yummy!' : '🍜 Noodles'}
        showBack={gameState !== 'celebration'}
      />

      {/* 开始画面 */}
      {gameState === 'intro' && (
        <div className="cook-game-area">
          <div className="cook-intro">
            <div className="cook-intro-emoji">🍜</div>
            <h2 className="cook-intro-title">Let's Cook Noodles!</h2>
            <CookingBowl imageSrc={recipe.startImage} alt="Empty bowl" />
            <p className="cook-intro-hint">
              Press <kbd>Enter</kbd> to start
            </p>
          </div>
          <Keyboard
            onKeyPress={(key: string) => {
              if (key === 'Enter') startGame()
            }}
            highlightLetter={null}
          />
        </div>
      )}

      {/* 游戏进行中 */}
      {gameState === 'playing' && (
        <div className="cook-game-area">
          <Bunny mood="encouraging" size="sm" />
          <CookingBowl
            imageSrc={getDisplayImage()}
            alt={currentStepData.wordCn}
          />
          <div className={`cook-question ${feedbackType === 'correct' ? 'correct' : ''} ${feedbackType === 'wrong' ? 'wrong' : ''}`}>
            <div className="cook-question-letter">{currentStepData.letter}</div>
            <div className="cook-question-word">
              {currentStepData.word} <span style={{ fontSize: '14px' }}>{currentStepData.wordCn}</span>
            </div>
            <div className="cook-question-action">{currentStepData.action}</div>
          </div>
          <div className="cook-feedback show">
            {feedbackType === 'correct' && '✅'}
            {feedbackType === 'wrong' && '❌'}
          </div>
          <CookingProgress total={recipe.steps.length} current={currentStep} />
          <Keyboard
            onKeyPress={(key: string) => handleAnswer(key)}
            highlightLetter={currentStepData.letter}
          />
        </div>
      )}

      {/* 庆祝画面 */}
      {gameState === 'celebration' && (
        <>
          <div className={`cook-celebration active`}>
            <div className="cook-celebration-bg" />
            <div className="cook-celebration-emoji">🍜</div>
            <CookingBowl imageSrc={recipe.finalImage} alt="Noodles done!" />
            <div className="cook-celebration-text">Yummy! Noodles are ready!</div>
            <div className="cook-celebration-sub">Let's eat! 🥢</div>
            <div className="cook-celebration-btns">
              <button className="cook-celebration-btn primary" onClick={restart}>
                🍜 再做一碗
              </button>
              <button className="cook-celebration-btn secondary" onClick={() => navigate('/scenes')}>
                ← 返回
              </button>
            </div>
          </div>
          {/* 星星特效 */}
          <div className="cook-sparkles">
            {sparkles.map(s => (
              <div
                key={s.id}
                className="cook-sparkle"
                style={{
                  left: `${s.x}%`,
                  animationDelay: `${s.delay}s`,
                  animationDuration: '3s',
                }}
              >
                {s.emoji}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  )
}

export default CookMode
```

- [ ] **Step 2: 提交**

```bash
git add src/pages/CookMode.tsx
git commit -m "feat: add CookMode page with full game flow"
```

---

### Task 6: 添加路由

**Files:**
- Modify: `src/App.tsx`

- [ ] **Step 1: 在 `src/App.tsx` 添加 CookMode 导入和路由**

在文件顶部导入区域添加：
```typescript
import CookMode from './pages/CookMode'
```

在 `<Routes>` 内部，`DressMode` 路由之后添加：
```typescript
<Route path="/cook" element={<CookMode />} />
```

完整路由列表变为：
```typescript
<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/scenes" element={<SceneSelect />} />
  <Route path="/scene/:sceneId/mode" element={<ModeSelect />} />
  <Route path="/scene/:sceneId/explore" element={<ExploreMode />} />
  <Route path="/scene/:sceneId/listen" element={<ListenMode />} />
  <Route path="/dress" element={<DressMode />} />
  <Route path="/cook" element={<CookMode />} />
</Routes>
```

- [ ] **Step 2: 提交**

```bash
git add src/App.tsx
git commit -m "feat: add /cook route for cooking mode"
```

---

### Task 7: 修改 ModeSelect 添加 Cook 按钮

**Files:**
- Modify: `src/pages/ModeSelect.tsx`
- Modify: `src/pages/ModeSelect.css`

- [ ] **Step 1: 在 ModeSelect.tsx 中，找到厨房场景的 mode 按钮区域，添加 Cook 按钮**

在 `<div className="mode-buttons">` 内部，两个现有按钮（Explore / Listen）之后，添加条件渲染的 Cook 按钮：

```typescript
{sceneId === 'kitchen' && (
  <button
    className="mode-btn mode-btn-cook"
    onClick={() => navigate('/cook')}
  >
    <span className="mode-btn-icon">🍜</span>
    <div>
      <div className="mode-btn-title">Cook</div>
      <div className="mode-btn-desc">做一碗手工面条!</div>
    </div>
  </button>
)}
```

> **注意**：`sceneId` 来自 `useParams<{ sceneId: string }>()`，已在组件中定义。无需额外导入。

- [ ] **Step 2: 在 ModeSelect.css 末尾添加 Cook 按钮样式**

```css
.mode-btn-cook {
  border-left: 6px solid #f59e0b;
}
```

- [ ] **Step 3: 提交**

```bash
git add src/pages/ModeSelect.tsx src/pages/ModeSelect.css
git commit -m "feat: add Cook mode button for kitchen scene"
```

---

### Task 8: 创建占位图片

**Files:**
- Create: `public/cooking/` 目录 + 8 张占位 SVG 图片

- [ ] **Step 1: 创建占位图片目录和生成脚本**

```bash
mkdir -p /workspace/public/cooking
```

创建 8 张占位 SVG（等 AI 图片就绪后替换）：

```bash
cd /workspace/public/cooking

# 每张占位 SVG：大号 emoji 居中，显示步骤名称
cat > noodle-start.svg << 'EOF'
<svg xmlns="http://www.w3.org/2000/svg" width="1024" height="1024" viewBox="0 0 1024 1024">
  <rect width="1024" height="1024" fill="#fff8e7"/>
  <text x="512" y="380" text-anchor="middle" font-size="200">🥣</text>
  <text x="512" y="600" text-anchor="middle" font-size="48" font-family="sans-serif" fill="#555">Start Cooking</text>
  <text x="512" y="700" text-anchor="middle" font-size="32" font-family="sans-serif" fill="#999">Let's make noodles!</text>
</svg>
EOF

for i in 1 2 3 4 5 6; do
  case $i in
    1) emoji="🌾"; label="Flour";;
    2) emoji="💧"; label="Water";;
    3) emoji="👐"; label="Mix";;
    4) emoji="🍥"; label="Roll";;
    5) emoji="🔪"; label="Cut";;
    6) emoji="🔥"; label="Boil";;
  esac
  cat > "noodle-step${i}.svg" << EOF
<svg xmlns="http://www.w3.org/2000/svg" width="1024" height="1024" viewBox="0 0 1024 1024">
  <rect width="1024" height="1024" fill="#fff8e7"/>
  <text x="512" y="380" text-anchor="middle" font-size="200">${emoji}</text>
  <text x="512" y="600" text-anchor="middle" font-size="48" font-family="sans-serif" fill="#555">Step ${i}: ${label}</text>
  <text x="512" y="700" text-anchor="middle" font-size="32" font-family="sans-serif" fill="#999">AI image coming soon</text>
</svg>
EOF
done

cat > noodle-final.svg << 'EOF'
<svg xmlns="http://www.w3.org/2000/svg" width="1024" height="1024" viewBox="0 0 1024 1024">
  <rect width="1024" height="1024" fill="#fff8a0"/>
  <text x="512" y="380" text-anchor="middle" font-size="200">🍜</text>
  <text x="512" y="600" text-anchor="middle" font-size="48" font-family="sans-serif" fill="#555">Yummy Noodles!</text>
  <text x="512" y="700" text-anchor="middle" font-size="32" font-family="sans-serif" fill="#999">AI image coming soon</text>
</svg>
EOF
```

> **注意**：CookMode.tsx 引用的是 `.jpg` 路径，但 Vite 开发服务器和构建都支持 `.svg`。暂用 SVG 占位，后续替换为 AI 生成的 JPG 时无需改代码。

- [ ] **Step 2: 将 SVG 引用改为在代码中同时支持 .svg 和 .jpg**

在 `cookingData.ts` 中将图片路径后缀从 `.jpg` 改为 `.svg`（后续替换为 AI 图片时改回 `.jpg`）：

```typescript
// 将所有 .jpg 改为 .svg（占位期间）
startImage: '/cooking/noodle-start.svg',
finalImage: '/cooking/noodle-final.svg',
// ... steps 同理
```

- [ ] **Step 3: 提交**

```bash
git add public/cooking/ src/data/cookingData.ts
git commit -m "feat: add placeholder SVG images for cooking mode"
```

---

### Task 9: 构建验证

**Files:**
- 无新文件

- [ ] **Step 1: 构建项目**

```bash
cd /workspace && npm run build 2>&1 | tail -10
```

期望：`✓ built in Xs`，无 TypeScript 错误

- [ ] **Step 2: 启动预览服务器验证页面**

```bash
cd /workspace && npm run preview -- --port 4173 &
sleep 2
curl -s http://localhost:4173/ | head -5
```

期望：返回 React 首页 HTML

- [ ] **Step 3: 验证 `/cook` 路由可访问**

在浏览器中打开 `http://localhost:4173/#/cook`，检查：
- 开始画面显示 normal
- 按 Enter 进入游戏，第一题显示 F for Flour
- 按 F 正确跳到 W for Water
- 按错键显示 ❌ 反馈
- 6 步全部完成后显示庆祝画面

- [ ] **Step 4: 提交（如有修改）**

```bash
git add -A && git commit -m "fix: build verification tweaks" || echo "No changes needed"
```

---

### Task 10: 部署

**Files:**
- 无修改

- [ ] **Step 1: 推送并观察 CI**

```bash
git push
```

- [ ] **Step 2: 等待 CI 完成后验证线上**

```bash
curl -sL "https://kakapon-xu.github.io/bunny-abc/" | head -5
```

- [ ] **Step 3: 在浏览器中验证线上版本**

打开 `https://kakapon-xu.github.io/bunny-abc/`：
- 首页正常
- 场景选择中有"🍽️ 小厨房 Kitchen"卡片
- 点击进入看到 Explore / Listen / Cook 三个按钮
- 点击 Cook 进入做饭模式
- 完整流程可玩

---

## 自审检查

1. **Spec 覆盖**：所有设计要求均有对应 Task。数据模型 → Task 1，样式 → Task 2，组件 → Task 3-4，主页面 → Task 5，路由 → Task 6，模式选择 → Task 7，占位图 → Task 8，构建验证 → Task 9，部署 → Task 10。

2. **占位符检查**：无 TBD/TODO。占位图片用 SVG 明确标记 "AI image coming soon"。

3. **类型一致性**：`CookingRecipe` / `CookingStep` 在 cookingData.ts 定义，CookMode.tsx 和 CookingBowl.tsx 中引用一致。`handleAnswer` 接收 `letter: string`，Keyboard 的 `onKeyPress` 也接收 `(key: string)`。