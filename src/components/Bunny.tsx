import { BunnyMood } from '../data/types'
import './Bunny.css'

interface BunnyProps {
  mood?: BunnyMood
  size?: 'small' | 'medium' | 'large'
  onClick?: () => void
}

const moodEmojis: Record<BunnyMood, string> = {
  idle: '🐰',
  surprised: '🤩',
  happy: '😄',
  thinking: '🤔',
  encouraging: '😌',
  sleepy: '😴',
}

function Bunny({ mood = 'idle', size = 'medium', onClick }: BunnyProps) {
  return (
    <div
      className={`bunny bunny-${size} bunny-mood-${mood}`}
      onClick={onClick}
      role="img"
      aria-label="Cute bunny character"
    >
      <span className="bunny-emoji">{moodEmojis[mood]}</span>
    </div>
  )
}

export default Bunny
