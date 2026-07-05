import { useState, useEffect, useCallback } from 'react'
import { useParams } from 'react-router-dom'
import { getSceneById } from '../data/scenes'
import { getRandomWordByLetter } from '../data/words'
import { Word } from '../data/types'
import { speakWord, speakLetter, initSpeech } from '../utils/speech'
import { useSound } from '../utils/SoundContext'
import { getRandomLine } from '../data/bunnyLines'
import { BunnyMood } from '../data/types'
import TopBar from '../components/TopBar'
import Bunny from '../components/Bunny'
import Keyboard from '../components/Keyboard'
import WordBubble from '../components/WordBubble'
import { useTimer } from '../utils/useTimer'
import './ExploreMode.css'

function ExploreMode() {
  const { sceneId } = useParams<{ sceneId: string }>()
  const scene = sceneId ? getSceneById(sceneId) : undefined
  const { soundEnabled } = useSound()

  const [currentWord, setCurrentWord] = useState<Word | null>(null)
  const [currentLetter, setCurrentLetter] = useState<string>('')
  const [bunnyMood, setBunnyMood] = useState<BunnyMood>('idle')
  const [bunnyLine, setBunnyLine] = useState('')
  const [speechReady, setSpeechReady] = useState(false)

  const { isTimeUp } = useTimer({
    limitMinutes: 10,
    onTimeUp: () => setBunnyMood('sleepy'),
  })

  // Initialize speech on mount
  useEffect(() => {
    initSpeech().then(() => setSpeechReady(true))
  }, [])

  // Play letter sound followed by word sound
  const playLetterAndWord = useCallback((letter: string, word: Word) => {
    if (!soundEnabled || !speechReady) return

    speakLetter(letter, () => {
      // After letter finishes, speak the word after a small delay
      setTimeout(() => {
        speakWord(word.text)
      }, 200)
    })
  }, [soundEnabled, speechReady])

  const handleKeyPress = useCallback((letter: string) => {
    if (!scene || isTimeUp) return

    const word = getRandomWordByLetter(letter, scene.id)
    if (word) {
      setCurrentWord(word)
      setCurrentLetter(letter)
      setBunnyMood('surprised')
      setBunnyLine(getRandomLine('explore'))

      playLetterAndWord(letter, word)

      // Reset bunny mood after animation
      setTimeout(() => {
        setBunnyMood('idle')
        setBunnyLine('')
      }, 2000)
    }
  }, [scene, soundEnabled, speechReady, isTimeUp, playLetterAndWord])

  // Handle space key to replay sound
  const handleSpaceKey = useCallback(() => {
    if (!currentWord || !currentLetter || isTimeUp) return
    playLetterAndWord(currentLetter, currentWord)
  }, [currentWord, currentLetter, isTimeUp, playLetterAndWord])

  // Listen for space key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space' || e.key === ' ') {
        e.preventDefault()
        handleSpaceKey()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handleSpaceKey])

  const handleBunnyClick = () => {
    if (isTimeUp) {
      setBunnyLine(getRandomLine('rest'))
      return
    }
    setBunnyMood('happy')
    setBunnyLine(getRandomLine('greet'))
    setTimeout(() => {
      setBunnyMood('idle')
      setBunnyLine('')
    }, 1500)
  }

  if (!scene) {
    return <div className="explore-page">Scene not found</div>
  }

  return (
    <div
      className="explore-page"
      style={{
        background: `linear-gradient(180deg, ${scene.bgFrom} 0%, ${scene.bgTo} 100%)`,
      }}
    >
      <TopBar />

      <div className="explore-content">
        <div className="explore-top">
          {currentWord && (
            <WordBubble word={currentWord} size="medium" />
          )}
          {bunnyLine && (
            <div className="bunny-speech-bubble">{bunnyLine}</div>
          )}
        </div>

        <div className="explore-bunny-area">
          <Bunny mood={bunnyMood} size="large" onClick={handleBunnyClick} />
        </div>

        <div className="explore-keyboard-area">
          <Keyboard onKeyPress={handleKeyPress} />
        </div>
      </div>
    </div>
  )
}

export default ExploreMode
