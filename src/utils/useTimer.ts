import { useState, useEffect, useRef, useCallback } from 'react'

interface UseTimerOptions {
  /** Time limit in minutes */
  limitMinutes?: number
  /** Callback when time limit is reached */
  onTimeUp?: () => void
}

interface UseTimerReturn {
  /** Elapsed time in seconds */
  elapsed: number
  /** Whether the time limit has been reached */
  isTimeUp: boolean
  /** Reset the timer */
  reset: () => void
  /** Pause the timer */
  pause: () => void
  /** Resume the timer */
  resume: () => void
}

export function useTimer({
  limitMinutes = 10,
  onTimeUp,
}: UseTimerOptions = {}): UseTimerReturn {
  const [elapsed, setElapsed] = useState(0)
  const [isTimeUp, setIsTimeUp] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const intervalRef = useRef<number | null>(null)
  const timeUpFiredRef = useRef(false)

  const limitSeconds = limitMinutes * 60

  const reset = useCallback(() => {
    setElapsed(0)
    setIsTimeUp(false)
    timeUpFiredRef.current = false
  }, [])

  const pause = useCallback(() => {
    setIsPaused(true)
  }, [])

  const resume = useCallback(() => {
    setIsPaused(false)
  }, [])

  useEffect(() => {
    if (isPaused) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
      return
    }

    intervalRef.current = window.setInterval(() => {
      setElapsed(prev => {
        const next = prev + 1
        if (next >= limitSeconds && !timeUpFiredRef.current) {
          timeUpFiredRef.current = true
          setIsTimeUp(true)
          onTimeUp?.()
        }
        return next
      })
    }, 1000)

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
    }
  }, [isPaused, limitSeconds, onTimeUp])

  return { elapsed, isTimeUp, reset, pause, resume }
}
