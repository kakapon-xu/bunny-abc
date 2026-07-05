import { useState, useEffect, useCallback } from 'react'
import { getEnglishVoices, setVoiceByName, getCurrentVoice, speak, onVoicesChanged, warmUpSpeech } from '../utils/speech'
import './VoiceSelector.css'

interface VoiceSelectorProps {
  isOpen: boolean
  onClose: () => void
}

function VoiceSelector({ isOpen, onClose }: VoiceSelectorProps) {
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([])
  const [selectedName, setSelectedName] = useState<string>('')
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [playingName, setPlayingName] = useState<string>('')
  const [errorMsg, setErrorMsg] = useState<string>('')

  const refreshVoices = useCallback(() => {
    const list = getEnglishVoices()
    setVoices(list)
    const current = getCurrentVoice()
    if (current) setSelectedName(current.name)
    setErrorMsg('')
  }, [])

  // When modal opens, get voices immediately and also listen for changes
  useEffect(() => {
    if (!isOpen) return

    refreshVoices()
    warmUpSpeech()

    // Listen for voice changes (voices load asynchronously in many browsers)
    const unsubscribe = onVoicesChanged(() => {
      refreshVoices()
    })

    return unsubscribe
  }, [isOpen, refreshVoices])

  const handleSelect = (name: string) => {
    setSelectedName(name)
    setVoiceByName(name)
    setPlayingName(name)
    setErrorMsg('')

    // Preview the voice
    speak('Hello! I am your bunny friend!', {
      rate: 0.85,
      pitch: 1.1,
      volume: 1.0,
      onEnd: () => {
        setPlayingName('')
      },
      onError: (e) => {
        console.error('Voice preview error:', e)
        setPlayingName('')
        setErrorMsg('Voice not working. Try another voice or check your browser settings.')
      },
    })
  }

  const handleRefresh = () => {
    setIsRefreshing(true)
    refreshVoices()
    setTimeout(() => setIsRefreshing(false), 500)
  }

  if (!isOpen) return null

  return (
    <div className="voice-overlay" onClick={onClose}>
      <div className="voice-modal" onClick={e => e.stopPropagation()}>
        <div className="voice-header">
          <h2>🎙️ Choose a Voice</h2>
          <div className="voice-header-actions">
            <button className="voice-refresh" onClick={handleRefresh} aria-label="Refresh voices" disabled={isRefreshing}>
              {isRefreshing ? '⏳' : '🔄'}
            </button>
            <button className="voice-close" onClick={onClose}>✕</button>
          </div>
        </div>

        {errorMsg && (
          <div className="voice-error">
            ⚠️ {errorMsg}
          </div>
        )}

        <div className="voice-list">
          {voices.length === 0 && (
            <div className="voice-empty">
              <div className="voice-empty-icon">🎤</div>
              <div className="voice-empty-text">Loading voices...</div>
              <div className="voice-empty-hint">
                If nothing appears, your browser may not support text-to-speech.
                <br />
                Try Chrome, Edge, or Safari for the best experience.
              </div>
              <button className="voice-empty-btn" onClick={handleRefresh}>
                🔄 Try again
              </button>
            </div>
          )}
          {voices.map(voice => (
            <button
              key={voice.name}
              className={`voice-item ${selectedName === voice.name ? 'voice-selected' : ''}`}
              onClick={() => handleSelect(voice.name)}
            >
              <span className="voice-play-indicator">
                {playingName === voice.name ? (
                  <span className="voice-playing">🔊</span>
                ) : (
                  <span className="voice-play-icon">▶</span>
                )}
              </span>
              <div className="voice-info">
                <span className="voice-name">{voice.name}</span>
                <span className="voice-lang">{voice.lang}</span>
              </div>
              {selectedName === voice.name && <span className="voice-check">✓</span>}
            </button>
          ))}
        </div>
        <div className="voice-footer">
          <div className="voice-tip">💡 Tap a voice to hear a preview</div>
          <button className="voice-done" onClick={onClose}>
            Done
          </button>
        </div>
      </div>
    </div>
  )
}

export default VoiceSelector
