import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import { MusicProvider } from './contexts/MusicContext'
import Sidebar from './components/Sidebar'
import Dashboard from './pages/Dashboard'
import Library from './pages/Library'
import Player from './pages/Player'
import Playlists from './pages/Playlists'
import Discovery from './pages/Discovery'
import Settings from './pages/Settings'
import MiniPlayer from './components/MiniPlayer'
import ErrorBoundary from './components/ErrorBoundary'
import SimpleAuth from './components/SimpleAuth'
import SpotifyCallback from './pages/SpotifyCallback'

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [isLoading, setIsLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [, setUserData] = useState<{ name: string; email: string } | null>(null)

  // Check for existing authentication
  useEffect(() => {
    console.log('🎵 OmniFusion Music App: Starting up...')
    
    const savedUser = localStorage.getItem('omnifusion_user')
    if (savedUser) {
      try {
        const user = JSON.parse(savedUser)
        setUserData(user)
        setIsAuthenticated(true)
        console.log('🎵 User already authenticated:', user.name)
      } catch (error) {
        console.error('Failed to parse saved user data:', error)
        localStorage.removeItem('omnifusion_user')
      }
    }
    
    const timer = setTimeout(() => {
      console.log('🎵 OmniFusion Music App: Loading complete')
      setIsLoading(false)
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  const handleLogin = (userData: { name: string; email: string }) => {
    setUserData(userData)
    setIsAuthenticated(true)
    console.log('🎵 User authenticated:', userData.name)
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-harmony-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <h1 className="text-2xl font-bold text-white mb-2">OmniFusion Music</h1>
          <p className="text-gray-400">Loading your music experience...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return <SimpleAuth onLogin={handleLogin} />
  }

  return (
    <ErrorBoundary>
      <MusicProvider>
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
          <div className="flex h-screen relative">
            <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
            <main className={`flex-1 overflow-hidden transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-16'}`}>
              <div className="h-full overflow-y-auto bg-transparent">
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/library" element={<Library />} />
                  <Route path="/player" element={<Player />} />
                  <Route path="/playlists" element={<Playlists />} />
                  <Route path="/discovery" element={<Discovery />} />
                  <Route path="/settings" element={<Settings />} />
                  <Route path="/spotify-callback" element={<SpotifyCallback />} />
                </Routes>
              </div>
            </main>
          </div>
          <MiniPlayer />
        </div>
      </MusicProvider>
    </ErrorBoundary>
  )
}

export default App 