import { useState, useEffect } from 'react'
import { 
  Search, 
  Heart,
  Music,
  Loader,
  Clock,
  Radio,
  Users,
  Plus
} from 'lucide-react'
import { useMusic } from '../contexts/MusicContext'
import SpotifyOnboarding from '../components/SpotifyOnboarding'

const serviceIcons = {
  spotify: Music,
  apple: Music,
  youtube: Music
}

const Dashboard = () => {
  const { state, playTrack, searchMusic, loadUserData } = useMusic()
  const [searchQuery, setSearchQuery] = useState('')
  const [showOnboarding, setShowOnboarding] = useState(false)

  // Load sample data on component mount
  useEffect(() => {
    console.log('🎵 Dashboard: Loading sample data...')
    console.log('🎵 Current state:', state)
    
    // Show onboarding if no services are connected
    if (state.connectedServices.length === 0) {
      setShowOnboarding(true)
    }
  }, [state.connectedServices.length])

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      await searchMusic(searchQuery)
    }
  }

  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
  }

  const handleOnboardingSuccess = () => {
    setShowOnboarding(false)
    loadUserData()
  }

  const handleOnboardingCancel = () => {
    setShowOnboarding(false)
  }

  // Simple demo data
  const recentlyPlayedCount = 3
  const playlistsCount = 2

  // Show onboarding if no services connected
  if (showOnboarding) {
    return (
      <div className="h-full overflow-y-auto p-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-white mb-2">
              Welcome to OmniFusion Music
            </h1>
            <p className="text-xl text-gray-400">Your universal music command center</p>
          </div>
          <SpotifyOnboarding 
            onSuccess={handleOnboardingSuccess}
            onCancel={handleOnboardingCancel}
          />
        </div>
      </div>
    )
  }

  return (
    <>
      <div className="h-full overflow-y-auto p-6 space-y-6 bg-transparent">
        {/* Welcome Message */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">
            Welcome to OmniFusion Music
          </h1>
          <p className="text-xl text-gray-400">Your universal music command center</p>
          <div className="mt-4 flex items-center justify-center space-x-2">
            <span className="text-sm text-gray-400">Beta User</span>
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
          </div>
        </div>

        {/* Simple Status */}
        <div className="glass-effect rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-white">Ready to Play</h2>
              <p className="text-gray-400">Start exploring your music</p>
            </div>
            <div className="flex items-center space-x-2 px-4 py-2 bg-green-500/20 rounded-lg">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-green-400 text-sm">Ready</span>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button className="glass-effect rounded-xl p-4 hover:bg-gray-800/50 transition-all duration-300 transform hover:scale-105">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-red-500/20 rounded-lg flex items-center justify-center">
                <Heart className="w-5 h-5 text-red-400" />
              </div>
              <div className="text-left">
                <p className="text-sm font-medium text-white">Liked Songs</p>
                <p className="text-xs text-gray-400">127 tracks</p>
              </div>
            </div>
          </button>
          <button className="glass-effect rounded-xl p-4 hover:bg-gray-800/50 transition-all duration-300 transform hover:scale-105">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                <Clock className="w-5 h-5 text-blue-400" />
              </div>
              <div className="text-left">
                <p className="text-sm font-medium text-white">Recently Played</p>
                <p className="text-xs text-gray-400">{recentlyPlayedCount} tracks</p>
              </div>
            </div>
          </button>
          <button className="glass-effect rounded-xl p-4 hover:bg-gray-800/50 transition-all duration-300 transform hover:scale-105">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
                <Radio className="w-5 h-5 text-purple-400" />
              </div>
              <div className="text-left">
                <p className="text-sm font-medium text-white">Radio Stations</p>
                <p className="text-xs text-gray-400">{playlistsCount} stations</p>
              </div>
            </div>
          </button>
          <button className="glass-effect rounded-xl p-4 hover:bg-gray-800/50 transition-all duration-300 transform hover:scale-105">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-orange-500/20 rounded-lg flex items-center justify-center">
                <Users className="w-5 h-5 text-orange-400" />
              </div>
              <div className="text-left">
                <p className="text-sm font-medium text-white">Collaborative</p>
                <p className="text-xs text-gray-400">8 playlists</p>
              </div>
            </div>
          </button>
        </div>

        {/* Music Services */}
        <div className="glass-effect rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-white mb-2">Music Services</h2>
              <p className="text-gray-400">
                {state.connectedServices.length > 0 
                  ? `${state.connectedServices.length} service${state.connectedServices.length > 1 ? 's' : ''} connected`
                  : 'No services connected'
                }
              </p>
            </div>
            <div className="flex items-center space-x-4">
              {state.connectedServices.length > 0 ? (
                <button 
                  className="px-6 py-3 bg-gradient-to-r from-harmony-500 to-purple-600 hover:from-harmony-600 hover:to-purple-700 text-white rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  Start Playing
                </button>
              ) : (
                <button 
                  onClick={() => setShowOnboarding(true)}
                  className="px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center space-x-2"
                >
                  <Plus className="w-4 h-4" />
                  <span>Connect Service</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Universal Search */}
        <div className="glass-effect rounded-xl p-6">
          <h2 className="text-xl font-semibold text-white mb-4">Universal Search</h2>
          <form onSubmit={handleSearch} className="flex space-x-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search across all your music services..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-harmony-500 focus:border-transparent"
              />
            </div>
            <button
              type="submit"
              disabled={state.isLoading}
              className="px-6 py-3 bg-harmony-500 hover:bg-harmony-600 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
            >
              {state.isLoading ? (
                <>
                  <Loader className="w-4 h-4 animate-spin" />
                  <span>Searching...</span>
                </>
              ) : (
                <span>Search</span>
              )}
            </button>
          </form>

          {/* Search Results */}
          {state.searchResults.length > 0 && (
            <div className="mt-6">
              <h3 className="text-lg font-semibold text-white mb-4">Search Results</h3>
              <div className="space-y-2">
                {state.searchResults.map((track) => {
                  const ServiceIcon = serviceIcons[track.service as keyof typeof serviceIcons]
                  return (
                    <div
                      key={track.id}
                      className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-800/30 transition-colors cursor-pointer"
                      onClick={() => playTrack(track)}
                    >
                      <img
                        src={track.artwork}
                        alt={track.title}
                        className="w-12 h-12 rounded-lg"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-white truncate">{track.title}</p>
                        <p className="text-xs text-gray-400 truncate">{track.artist}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <ServiceIcon className="w-4 h-4 text-gray-400" />
                        <span className="text-xs text-gray-500">{formatDuration(track.duration)}</span>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )}
        </div>

        {/* Recently Played */}
        {state.recentlyPlayed.length > 0 && (
          <div className="glass-effect rounded-xl p-6">
            <h2 className="text-xl font-semibold text-white mb-4">Recently Played</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {state.recentlyPlayed.slice(0, 6).map((track) => (
                <div
                  key={track.id}
                  className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-800/30 transition-colors cursor-pointer"
                  onClick={() => playTrack(track)}
                >
                  <img
                    src={track.artwork}
                    alt={track.title}
                    className="w-12 h-12 rounded-lg"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-white truncate">{track.title}</p>
                    <p className="text-xs text-gray-400 truncate">{track.artist}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default Dashboard 