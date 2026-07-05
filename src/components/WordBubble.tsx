import { Word } from '../data/types'
import './WordBubble.css'

interface WordBubbleProps {
  word: Word | null
  showLetter?: boolean
  size?: 'small' | 'medium' | 'large'
}

function WordBubble({ word, showLetter = true, size = 'medium' }: WordBubbleProps) {
  if (!word) return null

  return (
    <div className={`word-bubble word-bubble-${size} animate-fadeIn`}>
      {showLetter && (
        <div className="word-letter">
          <span className="letter-upper">{word.letter.toUpperCase()}</span>
          <span className="letter-lower">{word.letter.toLowerCase()}</span>
        </div>
      )}
      <div className="word-image">{word.emoji}</div>
      <div className="word-text">{word.text}</div>
    </div>
  )
}

export default WordBubble
