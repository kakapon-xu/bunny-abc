import { useState, useCallback, useEffect } from 'react'
import './Keyboard.css'

interface KeyboardProps {
  onKeyPress?: (letter: string) => void
  highlightLetter?: string | null
}

const KEYBOARD_ROWS = [
  ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
  ['Z', 'X', 'C', 'V', 'B', 'N', 'M'],
]

function Keyboard({ onKeyPress, highlightLetter }: KeyboardProps) {
  const [pressedKey, setPressedKey] = useState<string | null>(null)

  // Physical keyboard handler
  const handlePhysicalKey = useCallback((e: KeyboardEvent) => {
    const key = e.key.toUpperCase()
    if (/^[A-Z]$/.test(key)) {
      setPressedKey(key)
      onKeyPress?.(key)
      setTimeout(() => setPressedKey(null), 150)
    }
  }, [onKeyPress])

  useEffect(() => {
    window.addEventListener('keydown', handlePhysicalKey)
    return () => window.removeEventListener('keydown', handlePhysicalKey)
  }, [handlePhysicalKey])

  const handleVirtualKey = (letter: string) => {
    setPressedKey(letter)
    onKeyPress?.(letter)
    setTimeout(() => setPressedKey(null), 150)
  }

  return (
    <div className="keyboard">
      {KEYBOARD_ROWS.map((row, rowIndex) => (
        <div key={rowIndex} className="keyboard-row" style={{ paddingLeft: rowIndex * 12 }}>
          {row.map(letter => {
            const isHighlighted = highlightLetter?.toUpperCase() === letter
            const isPressed = pressedKey === letter
            return (
              <button
                key={letter}
                className={`keyboard-key ${isHighlighted ? 'key-highlight' : ''} ${isPressed ? 'key-pressed' : ''}`}
                onClick={() => handleVirtualKey(letter)}
                aria-label={`Letter ${letter}`}
              >
                {letter}
              </button>
            )
          })}
        </div>
      ))}
    </div>
  )
}

export default Keyboard
