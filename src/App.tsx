import { Routes, Route } from 'react-router-dom'
import Landing from './pages/Landing'
import Privacy from './pages/Privacy'
import Terms from './pages/Terms'
import Roadmap from './pages/Roadmap'
import Demo from './pages/Demo'

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/roadmap" element={<Roadmap />} />
        <Route path="/demo" element={<Demo />} />
      </Routes>
    </div>
  )
}

export default App 