import { Routes, Route } from 'react-router-dom'
import { useState } from 'react'
import Sidebar from './components/Sidebar'
import Dashboard from './pages/Dashboard'
import Playlists from './pages/Playlists'
import Discovery from './pages/Discovery'
import Player from './pages/Player'
import Library from './pages/Library'
import Settings from './pages/Settings'
import SpotifyCallback from './components/SpotifyCallback'
import { MusicProvider } from './contexts/MusicContext'

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true)

  return (
    <MusicProvider>
      <div className="flex h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900">
        <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
        
        <main className={`flex-1 flex flex-col transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-16'}`}>
          <div className="flex-1 overflow-hidden">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/playlists" element={<Playlists />} />
              <Route path="/discovery" element={<Discovery />} />
              <Route path="/player" element={<Player />} />
              <Route path="/library" element={<Library />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/callback" element={<SpotifyCallback />} />
            </Routes>
          </div>
        </main>
      </div>
    </MusicProvider>
  )
}

export default App 