import { useParams, useNavigate } from 'react-router-dom'
import { getSceneById } from '../data/scenes'
import TopBar from '../components/TopBar'
import Bunny from '../components/Bunny'
import './ModeSelect.css'

function ModeSelect() {
  const { sceneId } = useParams<{ sceneId: string }>()
  const navigate = useNavigate()
  const scene = sceneId ? getSceneById(sceneId) : undefined

  if (!scene) {
    return <div className="mode-select-page">Scene not found</div>
  }

  return (
    <div
      className="mode-select-page"
      style={{
        background: `linear-gradient(180deg, ${scene.bgFrom} 0%, ${scene.bgTo} 100%)`,
      }}
    >
      <TopBar />
      <div className="mode-select-content">
        <div className="mode-scene-title">
          <span className="mode-scene-emoji">{scene.emoji}</span>
          <h2>{scene.nameEn}</h2>
        </div>

        <Bunny mood="idle" size="large" />

        <div className="mode-buttons">
          <button
            className="mode-btn mode-btn-explore"
            onClick={() => navigate(`/scene/${scene.id}/explore`)}
          >
            <div className="mode-btn-icon">🔍</div>
            <div className="mode-btn-title">Explore</div>
            <div className="mode-btn-desc">Tap letters to discover!</div>
          </button>

          <button
            className="mode-btn mode-btn-listen"
            onClick={() => navigate(`/scene/${scene.id}/listen`)}
          >
            <div className="mode-btn-icon">🎯</div>
            <div className="mode-btn-title">Find it!</div>
            <div className="mode-btn-desc">Listen and find the letter</div>
          </button>
        </div>
      </div>
    </div>
  )
}

export default ModeSelect
