import { useState, useEffect, useCallback, useRef } from 'react'
import { useParams } from 'react-router-dom'
import { getSceneById } from '../data/scenes'
import { getWordsByScene } from '../data/words'
import { Word } from '../data/types'
import { speakLetter, speakWord, speakQuestion, speakPraise, initSpeech } from '../utils/speech'
import { useSound } from '../utils/SoundContext'
import { getRandomLine, formatQuestion, parseQuestion } from '../data/bunnyLines'
import { BunnyMood } from '../data/types'
import TopBar from '../components/TopBar'
import Bunny from '../components/Bunny'
import Keyboard from '../components/Keyboard'
import WordBubble from '../components/WordBubble'
import { useTimer } from '../utils/useTimer'
import './ListenMode.css'

type GameState = 'asking' | 'correct' | 'wrong' | 'sleepy'

function ListenMode() {
  const { sceneId } = useParams<{ sceneId: string }>()
  const scene = sceneId ? getSceneById(sceneId) : undefined
  const sceneWords = scene ? getWordsByScene(scene.id) : []
  const { soundEnabled } = useSound()

  const [currentWord, setCurrentWord] = useState<Word | null>(null)
  const [gameState, setGameState] = useState<GameState>('asking')
  const [questionTemplate, setQuestionTemplate] = useState('')
  const [showHint, setShowHint] = useState(false)
  const [speechReady, setSpeechReady] = useState(false)
  const questionAskedRef = useRef(false)

  const { isTimeUp } = useTimer({
    limitMinutes: 10,
    onTimeUp: () => setGameState('sleepy'),
  })

  // Pick a random word from the scene
  const pickNewWord = useCallback(() => {
    if (sceneWords.length === 0) return
    const randomWord = sceneWords[Math.floor(Math.random() * sceneWords.length)]
    setCurrentWord(randomWord)
    setShowHint(false)
    setGameState('asking')
    questionAskedRef.current = false
  }, [sceneWords])

  // Initialize and pick first word
  useEffect(() => {
    initSpeech().then(() => {
      setSpeechReady(true)
    })
  }, [])

  // Pick first word when scene loads
  useEffect(() => {
    if (sceneWords.length > 0 && !currentWord) {
      pickNewWord()
    }
  }, [sceneWords, currentWord, pickNewWord])

  // Set question template immediately when a new word is picked (even without speech)
  useEffect(() => {
    if (currentWord && !questionAskedRef.current && gameState === 'asking') {
      questionAskedRef.current = true
      const template = getRandomLine('question')
      setQuestionTemplate(template)
    }
  }, [currentWord, gameState])

  // Speak the question when ready
  useEffect(() => {
    if (currentWord && speechReady && soundEnabled && questionTemplate && gameState === 'asking') {
      const questionText = formatQuestion(questionTemplate, currentWord.letter)
      const timer = setTimeout(() => {
        speakQuestion(questionText, () => {
          speakLetter(currentWord.letter)
        })
      }, 400)
      return () => clearTimeout(timer)
    }
  }, [currentWord, speechReady, soundEnabled, questionTemplate, gameState])

  // Replay the full question
  const replayQuestion = useCallback(() => {
    if (!currentWord || !soundEnabled || !speechReady || isTimeUp) return
    const template = getRandomLine('question')
    setQuestionTemplate(template)
    const question = formatQuestion(template, currentWord.letter)
    speakQuestion(question, () => {
      speakLetter(currentWord.letter)
    })
  }, [currentWord, soundEnabled, speechReady, isTimeUp])

  // Space key to replay question
  useEffect(() => {
    const handleSpace = (e: KeyboardEvent) => {
      if (e.code === 'Space' && gameState === 'asking' && !isTimeUp) {
        e.preventDefault()
        replayQuestion()
      }
    }
    window.addEventListener('keydown', handleSpace)
    return () => window.removeEventListener('keydown', handleSpace)
  }, [gameState, isTimeUp, replayQuestion])

  const handleKeyPress = useCallback((letter: string) => {
    if (!currentWord || gameState !== 'asking' || isTimeUp) return

    if (letter.toUpperCase() === currentWord.letter.toUpperCase()) {
      // Correct!
      setGameState('correct')
      setShowHint(true)
      if (soundEnabled && speechReady) {
        speakLetter(currentWord.letter, () => {
          speakWord(currentWord.text, () => {
            const praise = getRandomLine('correct')
            speakPraise(praise)
          })
        })
      }

      // After celebration, pick next word
      setTimeout(() => {
        pickNewWord()
      }, 2500)
    } else {
      // Wrong - gentle encouragement
      setGameState('wrong')
      if (soundEnabled && speechReady) {
        const encourage = getRandomLine('wrong')
        speakPraise(encourage)
      }
      setTimeout(() => {
        setGameState('asking')
      }, 1200)
    }
  }, [currentWord, gameState, soundEnabled, speechReady, isTimeUp, pickNewWord])

  const handleBunnyClick = () => {
    if (isTimeUp) return
    // Clicking bunny replays the question
    replayQuestion()
  }

  const handleHintClick = () => {
    if (currentWord && soundEnabled && speechReady) {
      speakWord(currentWord.text)
    }
    setShowHint(true)
  }

  const bunnyMood: BunnyMood =
    gameState === 'correct' ? 'happy' :
    gameState === 'wrong' ? 'encouraging' :
    gameState === 'sleepy' ? 'sleepy' :
    'thinking'

  if (!scene) {
    return <div className="listen-page">Scene not found</div>
  }

  return (
    <div
      className="listen-page"
      style={{
        background: `linear-gradient(180deg, ${scene.bgFrom} 0%, ${scene.bgTo} 100%)`,
      }}
    >
      <TopBar />

      <div className="listen-content">
        <div className="listen-top">
          {gameState === 'asking' && currentWord && (
            <div className="question-row">
              <div className="question-bunny-avatar">
                <Bunny mood={bunnyMood} size="small" onClick={handleBunnyClick} />
              </div>
              <div className="question-box">
              <div className="question-text">
                {currentWord && questionTemplate && (() => {
                  const parts = parseQuestion(questionTemplate, currentWord.letter)
                  return (
                    <>
                      {parts.before}
                      {parts.letter && (
                        <span className="question-letter">{parts.letter}</span>
                      )}
                      {parts.after}
                    </>
                  )
                })()}
              </div>
              {currentWord && questionTemplate && !questionTemplate.includes('{letter}') && (
                <div className="question-big-letter">
                  {currentWord.letter.toUpperCase()}
                </div>
              )}
                <div className="question-buttons">
                  <button className="replay-btn" onClick={replayQuestion} aria-label="Replay question">
                    🔊 Play again
                  </button>
                  {!showHint && (
                    <button className="hint-btn" onClick={handleHintClick}>
                      👀 Hint
                    </button>
                  )}
                </div>
                <div className="space-hint">Press Space to replay</div>
              </div>
            </div>
          )}

          {(gameState === 'correct' || showHint) && currentWord && (
            <WordBubble word={currentWord} size="large" />
          )}

          {gameState === 'sleepy' && (
            <div className="sleepy-message">
              <div className="sleepy-emoji">😴</div>
              <div className="sleepy-text">I'm sleepy... let's rest!</div>
            </div>
          )}
        </div>

        <div className="listen-bunny-area">
          <Bunny mood={bunnyMood} size="large" onClick={handleBunnyClick} />
        </div>

        <div className="listen-keyboard-area">
          <Keyboard
            onKeyPress={handleKeyPress}
            highlightLetter={gameState === 'correct' ? currentWord?.letter : null}
          />
        </div>
      </div>
    </div>
  )
}

export default ListenMode
