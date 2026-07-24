import { useState, useEffect } from 'react'

interface CookingBowlProps {
  imageSrc: string
  alt: string
}

function CookingBowl({ imageSrc, alt }: CookingBowlProps) {
  const [animate, setAnimate] = useState(false)

  useEffect(() => {
    setAnimate(false)
    const timer = setTimeout(() => setAnimate(true), 50)
    return () => clearTimeout(timer)
  }, [imageSrc])

  return (
    <div className={`cook-bowl ${animate ? 'animate-in' : ''}`}>
      <img
        src={imageSrc}
        alt={alt}
        onError={(e) => {
          (e.target as HTMLImageElement).style.display = 'none'
        }}
      />
    </div>
  )
}

export default CookingBowl
