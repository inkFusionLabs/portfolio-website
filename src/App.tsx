import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import MiniPlayer from './components/MiniPlayer'
import Landing from './pages/Landing'
import Dashboard from './pages/Dashboard'
import Player from './pages/Player'
import Playlists from './pages/Playlists'
import Discovery from './pages/Discovery'
import Library from './pages/Library'
import Settings from './pages/Settings'
import Privacy from './pages/Privacy'
import Terms from './pages/Terms'
import SpotifyCallback from './pages/SpotifyCallback'
import { useMusic } from './contexts/MusicContext'

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const { state } = useMusic()

  // Check if we're on the landing page
  const isLandingPage = window.location.pathname === '/'

  if (isLandingPage) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/spotify-callback" element={<SpotifyCallback />} />
        </Routes>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
      
      {/* Main Content */}
      <div className={`transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-16'}`}>
        <div className="min-h-screen">
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/player" element={<Player />} />
            <Route path="/playlists" element={<Playlists />} />
            <Route path="/discovery" element={<Discovery />} />
            <Route path="/library" element={<Library />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/spotify-callback" element={<SpotifyCallback />} />
            {/* Redirect root to dashboard */}
            <Route path="/" element={<Dashboard />} />
          </Routes>
        </div>
      </div>

      {/* Mini Player (if track is playing) */}
      {state.currentTrack && <MiniPlayer />}
    </div>
  )
}

export default App 