import { useNavigate } from 'react-router-dom'
import { scenes } from '../data/scenes'
import SceneCard from '../components/SceneCard'
import TopBar from '../components/TopBar'
import './SceneSelect.css'

function SceneSelect() {
  const navigate = useNavigate()

  const handleSceneClick = (sceneId: string) => {
    navigate(`/scene/${sceneId}/mode`)
  }

  return (
    <div className="scene-select-page">
      <TopBar title="Choose a scene" />
      <div className="scene-select-content">
        <h2 className="scene-select-title">Where do you want to go?</h2>
        <div className="scene-grid">
          {scenes.map(scene => (
            <SceneCard
              key={scene.id}
              scene={scene}
              onClick={() => handleSceneClick(scene.id)}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default SceneSelect
