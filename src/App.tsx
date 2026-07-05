import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import SceneSelect from './pages/SceneSelect'
import ModeSelect from './pages/ModeSelect'
import ExploreMode from './pages/ExploreMode'
import ListenMode from './pages/ListenMode'
import { SoundProvider } from './utils/SoundContext'

function App() {
  return (
    <SoundProvider>
      <div className="app">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/scenes" element={<SceneSelect />} />
          <Route path="/scene/:sceneId/mode" element={<ModeSelect />} />
          <Route path="/scene/:sceneId/explore" element={<ExploreMode />} />
          <Route path="/scene/:sceneId/listen" element={<ListenMode />} />
        </Routes>
      </div>
    </SoundProvider>
  )
}

export default App
