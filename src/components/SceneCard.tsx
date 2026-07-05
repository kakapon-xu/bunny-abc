import { Scene } from '../data/types'
import './SceneCard.css'

interface SceneCardProps {
  scene: Scene
  onClick?: () => void
}

function SceneCard({ scene, onClick }: SceneCardProps) {
  return (
    <button
      className="scene-card"
      style={{
        background: `linear-gradient(135deg, ${scene.bgFrom} 0%, ${scene.bgTo} 100%)`,
      }}
      onClick={onClick}
    >
      <div className="scene-card-emoji">{scene.emoji}</div>
      <div className="scene-card-name">{scene.name}</div>
      <div className="scene-card-name-en">{scene.nameEn}</div>
    </button>
  )
}

export default SceneCard
