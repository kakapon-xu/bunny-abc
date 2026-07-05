import { useNavigate } from 'react-router-dom'
import { useSound } from '../utils/SoundContext'
import './TopBar.css'

interface TopBarProps {
  showBack?: boolean
  showSound?: boolean
  title?: string
}

function TopBar({ showBack = true, showSound = true, title }: TopBarProps) {
  const navigate = useNavigate()
  const { soundEnabled, toggleSound } = useSound()

  return (
    <div className="top-bar">
      <div className="top-bar-left">
        {showBack && (
          <button className="top-bar-btn" onClick={() => navigate(-1)} aria-label="Back">
            ←
          </button>
        )}
      </div>
      {title && <div className="top-bar-title">{title}</div>}
      <div className="top-bar-right">
        {showSound && (
          <button className="top-bar-btn" onClick={toggleSound} aria-label="Toggle sound">
            {soundEnabled ? '🔊' : '🔇'}
          </button>
        )}
      </div>
    </div>
  )
}

export default TopBar
