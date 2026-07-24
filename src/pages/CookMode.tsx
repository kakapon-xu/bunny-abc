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
  const recipe = noodleRecipe

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

  // 进入游戏
  const startGame = useCallback(() => {
    setCurrentStep(0)
    setGameState('playing')
    setIsAnswering(false)
    setFeedbackType(null)
  }, [])

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

    if (soundEnabled && speechReady) {
      setTimeout(() => {
        speakWord('Yummy!')
        setTimeout(() => speakWord('Noodles are ready!'), 1500)
        setTimeout(() => speakWord("Let's eat!"), 3000)
      }, 500)
    }

    setTimeout(() => setSparkles([]), 5000)
  }, [soundEnabled, speechReady])

  // 处理按键回答 — 用 ref 存储最新闭包，避免 useEffect 循环依赖
  const handleAnswerRef = useRef<(letter: string) => void>(() => {})
  const latestStateRef = useRef({ currentStep, isAnswering, gameState, soundEnabled, speechReady, currentStepData, triggerCelebration, recipe })
  latestStateRef.current = { currentStep, isAnswering, gameState, soundEnabled, speechReady, currentStepData, triggerCelebration, recipe }

  handleAnswerRef.current = (letter: string) => {
    const s = latestStateRef.current
    if (s.isAnswering || s.gameState !== 'playing') return

    setIsAnswering(true)
    const correct = letter === s.currentStepData.letter

    if (correct) {
      setFeedbackType('correct')
      if (s.soundEnabled && s.speechReady) {
        speakWord(s.currentStepData.action)
      }
      setTimeout(() => {
        const nextStep = s.currentStep + 1
        if (nextStep >= s.recipe.steps.length) {
          setGameState('celebration')
          s.triggerCelebration()
        } else {
          setCurrentStep(nextStep)
          setFeedbackType(null)
          setIsAnswering(false)
        }
      }, 1200)
    } else {
      setFeedbackType('wrong')
      if (s.soundEnabled && s.speechReady) {
        speakLetter(letter)
      }
      setTimeout(() => {
        setFeedbackType(null)
        setIsAnswering(false)
      }, 800)
    }
  }

  // 物理键盘监听
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (gameState === 'intro') {
        if (e.key === 'Enter') {
          startGame()
          return
        }
      }
      if (gameState === 'playing' && !isAnswering) {
        const key = e.key.toUpperCase()
        if (key.length === 1 && key >= 'A' && key <= 'Z') {
          handleAnswerRef.current(key)
        }
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [gameState, isAnswering, startGame])

  // 播放当前题目语音
  useEffect(() => {
    if (gameState === 'playing' && currentStep < recipe.steps.length && soundEnabled && speechReady) {
      const timer = setTimeout(() => {
        speakLetter(recipe.steps[currentStep].letter, () => {
          speakWord(recipe.steps[currentStep].word)
        })
      }, 300)
      return () => clearTimeout(timer)
    }
  }, [gameState, currentStep, recipe.steps, soundEnabled, speechReady])

  // 重新开始
  const restart = useCallback(() => {
    setSparkles([])
    startGame()
  }, [startGame])

  // 获取当前显示图片
  const getDisplayImage = (): string => {
    if (gameState === 'intro') return recipe.startImage
    if (gameState === 'celebration') return recipe.finalImage
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
          <Bunny mood="encouraging" size="small" />
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
            onKeyPress={(key: string) => handleAnswerRef.current(key)}
            highlightLetter={currentStepData.letter}
          />
        </div>
      )}

      {/* 庆祝画面 */}
      {gameState === 'celebration' && (
        <>
          <div className="cook-celebration active">
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
