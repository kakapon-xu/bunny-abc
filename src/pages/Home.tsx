import { useState } from 'react'
import { Link } from 'react-router-dom'
import VoiceSelector from '../components/VoiceSelector'
import './Home.css'

function Home() {
  const [voiceOpen, setVoiceOpen] = useState(false)

  return (
    <div className="home-page">
      <div className="home-sky">
        <div className="home-cloud cloud-1">☁️</div>
        <div className="home-cloud cloud-2">☁️</div>
      </div>
      <div className="home-ground">
        <h1 className="home-title">🐰 Bunny ABC</h1>
        <div className="home-bunny animate-hop">🐰</div>
        <Link to="/scenes" className="home-play-btn">
          ▶ Play
        </Link>
        <button className="home-voice-btn" onClick={() => setVoiceOpen(true)} aria-label="Choose voice">
          🎙️ Voice
        </button>
      </div>

      <VoiceSelector isOpen={voiceOpen} onClose={() => setVoiceOpen(false)} />
    </div>
  )
}

export default Home
