// Speech synthesis utility using Web Speech API

let synth: SpeechSynthesis | null = null
let currentVoice: SpeechSynthesisVoice | null = null
let initialized = false
let preferredVoiceName: string | null = null
let speechWarmedUp = false

const STORAGE_KEY = 'bunny-abc-voice'

function getSynth(): SpeechSynthesis | null {
  if (typeof window === 'undefined') return null
  if (!synth) {
    if ('speechSynthesis' in window) {
      synth = window.speechSynthesis
    }
  }
  return synth
}

// Load saved voice preference from localStorage
function loadSavedVoice(): string | null {
  if (typeof window === 'undefined') return null
  try {
    return localStorage.getItem(STORAGE_KEY)
  } catch {
    return null
  }
}

// Save voice preference to localStorage
function saveVoice(name: string | null) {
  if (typeof window === 'undefined') return
  try {
    if (name) {
      localStorage.setItem(STORAGE_KEY, name)
    } else {
      localStorage.removeItem(STORAGE_KEY)
    }
  } catch {
    // ignore
  }
}

function pickBestVoice(voices: SpeechSynthesisVoice[]): SpeechSynthesisVoice | null {
  if (voices.length === 0) return null

  // First: try to find the user's saved preference
  const saved = preferredVoiceName || loadSavedVoice()
  if (saved) {
    const savedVoice = voices.find(v => v.name === saved)
    if (savedVoice) {
      preferredVoiceName = saved
      return savedVoice
    }
  }

  // Priority list for natural-sounding voices
  const priorityPatterns = [
    // Google voices tend to be very natural
    /Google US English/i,
    /Google UK English Female/i,
    /Google UK English Male/i,
    // Microsoft natural voices
    /Microsoft.*Online.*Natural/i,
    /Microsoft.*Jenny/i,
    /Microsoft.*Aria/i,
    /Microsoft.*Guy/i,
    // Apple voices
    /Samantha/i,
    /Karen/i,
    /Daniel/i,
    // Female US English (general)
    /en-US.*female/i,
    /female.*en-US/i,
    // Any US English
    /en-US/i,
    // Any UK English
    /en-GB/i,
    /en-UK/i,
    // Fallback: any English
    /^en-/i,
  ]

  for (const pattern of priorityPatterns) {
    const match = voices.find(v =>
      pattern.test(v.name) || pattern.test(v.lang)
    )
    if (match) return match
  }

  return voices[0] || null
}

// Get all available English voices
export function getEnglishVoices(): SpeechSynthesisVoice[] {
  const s = getSynth()
  if (!s) return []
  return s.getVoices().filter(v => v.lang.startsWith('en'))
}

// Set a specific voice by name
export function setVoiceByName(name: string): boolean {
  const voices = getEnglishVoices()
  const voice = voices.find(v => v.name === name)
  if (voice) {
    currentVoice = voice
    preferredVoiceName = name
    saveVoice(name)
    return true
  }
  return false
}

// Initialize voices (they load asynchronously in some browsers)
export function initSpeech(): Promise<void> {
  return new Promise((resolve) => {
    const s = getSynth()
    if (!s) {
      initialized = true
      resolve()
      return
    }

    const tryLoadVoices = () => {
      const voices = s.getVoices()
      if (voices.length > 0) {
        currentVoice = pickBestVoice(voices)
        initialized = true
        resolve()
        return true
      }
      return false
    }

    if (tryLoadVoices()) return

    s.onvoiceschanged = () => {
      tryLoadVoices()
    }

    // Fallback: resolve after 1.5s even if voices don't load properly
    setTimeout(() => {
      if (!initialized) {
        initialized = true
        resolve()
      }
    }, 1500)
  })
}

// Warm up speech synthesis (some browsers need a "kick" to start working)
export function warmUpSpeech(): void {
  if (speechWarmedUp) return
  const s = getSynth()
  if (!s) return

  // Some browsers need at least one speak call to "unlock" audio
  // We speak an empty string or very short sound to warm up
  try {
    const warmUpUtterance = new SpeechSynthesisUtterance('')
    warmUpUtterance.volume = 0
    if (currentVoice) {
      warmUpUtterance.voice = currentVoice
      warmUpUtterance.lang = currentVoice.lang
    }
    s.speak(warmUpUtterance)
    speechWarmedUp = true
  } catch {
    // ignore warm-up errors
  }
}

// Get the current selected voice info
export function getCurrentVoice(): SpeechSynthesisVoice | null {
  return currentVoice
}

// Speak text with child-friendly settings
export function speak(
  text: string,
  options: {
    rate?: number
    pitch?: number
    volume?: number
    onEnd?: () => void
    onError?: (error: SpeechSynthesisErrorEvent) => void
  } = {}
): void {
  const s = getSynth()
  if (!s) {
    console.warn('Speech synthesis not available')
    return
  }

  // Resume if paused (common Chrome issue)
  if (s.paused) {
    s.resume()
  }

  // Cancel any ongoing speech
  try {
    s.cancel()
  } catch {
    // ignore cancel errors
  }

  // Small delay after cancel to prevent race conditions in some browsers
  setTimeout(() => {
    try {
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.rate = options.rate ?? 0.85
      utterance.pitch = options.pitch ?? 1.1
      utterance.volume = options.volume ?? 1.0 // Full volume for better audibility

      if (currentVoice) {
        utterance.voice = currentVoice
        utterance.lang = currentVoice.lang
      } else {
        utterance.lang = 'en-US'
      }

      if (options.onEnd) {
        utterance.onend = options.onEnd
      }

      if (options.onError) {
        utterance.onerror = options.onError
      } else {
        utterance.onerror = (e) => {
          console.warn('Speech error:', e)
        }
      }

      s.speak(utterance)
      speechWarmedUp = true
    } catch (e) {
      console.error('Failed to speak:', e)
      if (options.onError) {
        options.onError({ error: 'synthesis-error' } as unknown as SpeechSynthesisErrorEvent)
      }
    }
  }, 50)
}

// Speak a full question sentence (slower, clearer)
export function speakQuestion(text: string, onEnd?: () => void): void {
  speak(text, { rate: 0.8, pitch: 1.15, onEnd })
}

// Speak a letter name
export function speakLetter(letter: string, onEnd?: () => void): void {
  speak(letter.toUpperCase(), { rate: 0.75, pitch: 1.2, onEnd })
}

// Speak a word
export function speakWord(word: string, onEnd?: () => void): void {
  speak(word, { rate: 0.8, pitch: 1.1, onEnd })
}

// Speak praise/encouragement (more energetic)
export function speakPraise(text: string, onEnd?: () => void): void {
  speak(text, { rate: 0.9, pitch: 1.25, onEnd })
}

// Stop all speech
export function stopSpeech(): void {
  const s = getSynth()
  if (s) {
    s.cancel()
  }
}

// Check if speech synthesis is available
export function isSpeechAvailable(): boolean {
  return typeof window !== 'undefined' && 'speechSynthesis' in window
}

// Check if speech is currently speaking
export function isSpeaking(): boolean {
  const s = getSynth()
  return s ? s.speaking : false
}

// Register a callback for when voices change (asynchronous loading)
// Returns an unsubscribe function
export function onVoicesChanged(callback: () => void): () => void {
  const s = getSynth()
  if (!s) return () => {}

  const handler = () => callback()
  s.addEventListener('voiceschanged', handler)
  return () => s.removeEventListener('voiceschanged', handler)
}
