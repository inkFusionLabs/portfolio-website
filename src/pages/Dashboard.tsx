import { useState, useEffect } from 'react'
import { 
  Search, 
  Plus,
  Heart,
  Music,
  Loader
} from 'lucide-react'
import { useMusic } from '../contexts/MusicContext'
import SpotifyOnboarding from '../components/SpotifyOnboarding'
import { spotifyService } from '../services/spotify'

const serviceIcons = {
  spotify: Music,
  apple: Music,
  youtube: Music
}

const Dashboard = () => {
  const { state, playTrack, searchMusic } = useMusic()
  const [searchQuery, setSearchQuery] = useState('')
  const [showOnboarding, setShowOnboarding] = useState(false)

  // Check if user needs onboarding on component mount
  useEffect(() => {
    const checkOnboarding = async () => {
      const isConnected = await spotifyService.initialize()
      const hasSeenOnboarding = localStorage.getItem('spotify_onboarding_completed')
      
      if (!isConnected && !hasSeenOnboarding) {
        setShowOnboarding(true)
      }
    }
    
    checkOnboarding()
  }, [])

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

  const handleOnboardingComplete = () => {
    setShowOnboarding(false)
    localStorage.setItem('spotify_onboarding_completed', 'true')
    // Refresh the page to update the connection status
    window.location.reload()
  }

  const handleOnboardingSkip = () => {
    setShowOnboarding(false)
    localStorage.setItem('spotify_onboarding_completed', 'true')
  }

  return (
    <>
      <div className="h-full overflow-y-auto p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">
              Welcome to OmniFusion Music
              {state.userProfile && (
                <span className="text-harmony-400">, {state.userProfile.display_name}</span>
              )}
            </h1>
            <p className="text-gray-400">Your universal music command center</p>
          </div>
          <div className="flex items-center space-x-4">
            <button className="px-4 py-2 bg-harmony-500 hover:bg-harmony-600 text-white rounded-lg transition-colors">
              Connect Service
            </button>
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

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="glass-effect rounded-xl p-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                <Music className="w-5 h-5 text-blue-400" />
              </div>
              <div>
                <p className="text-sm text-gray-400">Total Tracks</p>
                <p className="text-xl font-bold text-white">
                  {state.isLoading ? '...' : state.recentlyPlayed.length}
                </p>
              </div>
            </div>
          </div>
          <div className="glass-effect rounded-xl p-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
                <Heart className="w-5 h-5 text-green-400" />
              </div>
              <div>
                <p className="text-sm text-gray-400">Liked Songs</p>
                <p className="text-xl font-bold text-white">
                  {state.isLoading ? '...' : state.recentlyPlayed.length}
                </p>
              </div>
            </div>
          </div>
          <div className="glass-effect rounded-xl p-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
                <Music className="w-5 h-5 text-purple-400" />
              </div>
              <div>
                <p className="text-sm text-gray-400">Playlists</p>
                <p className="text-xl font-bold text-white">
                  {state.isLoading ? '...' : state.playlists.length}
                </p>
              </div>
            </div>
          </div>
          <div className="glass-effect rounded-xl p-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-orange-500/20 rounded-lg flex items-center justify-center">
                <Music className="w-5 h-5 text-orange-400" />
              </div>
              <div>
                <p className="text-sm text-gray-400">Services</p>
                <p className="text-xl font-bold text-white">
                  {state.connectedServices.length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity & Playlists */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Tracks */}
          <div className="glass-effect rounded-xl p-6">
            <h2 className="text-xl font-semibold text-white mb-4">Recently Played</h2>
            {state.isLoading ? (
              <div className="flex items-center justify-center py-8">
                <Loader className="w-6 h-6 animate-spin text-harmony-400" />
              </div>
            ) : state.recentlyPlayed.length > 0 ? (
              <div className="space-y-3">
                {state.recentlyPlayed.slice(0, 5).map((track) => {
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
            ) : (
              <p className="text-gray-400 text-center py-8">No recently played tracks</p>
            )}
          </div>

          {/* Featured Playlists */}
          <div className="glass-effect rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-white">Your Playlists</h2>
              <button className="p-2 hover:bg-gray-800/50 rounded-lg transition-colors">
                <Plus className="w-5 h-5 text-gray-400" />
              </button>
            </div>
            {state.isLoading ? (
              <div className="flex items-center justify-center py-8">
                <Loader className="w-6 h-6 animate-spin text-harmony-400" />
              </div>
            ) : state.playlists.length > 0 ? (
              <div className="space-y-4">
                {state.playlists.slice(0, 5).map((playlist) => {
                  const ServiceIcon = serviceIcons[playlist.service as keyof typeof serviceIcons]
                  return (
                    <div
                      key={playlist.id}
                      className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-800/30 transition-colors cursor-pointer"
                    >
                      <img
                        src={playlist.artwork}
                        alt={playlist.name}
                        className="w-12 h-12 rounded-lg"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-white truncate">{playlist.name}</p>
                        <p className="text-xs text-gray-400 truncate">{playlist.description}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <ServiceIcon className="w-4 h-4 text-gray-400" />
                        <span className="text-xs text-gray-500">{playlist.tracks.length} tracks</span>
                      </div>
                    </div>
                  )
                })}
              </div>
            ) : (
              <p className="text-gray-400 text-center py-8">No playlists found</p>
            )}
          </div>
        </div>

        {/* AI Recommendations */}
        <div className="glass-effect rounded-xl p-6">
          <h2 className="text-xl font-semibold text-white mb-4">AI Recommendations</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-lg p-4 border border-blue-500/30">
              <h3 className="text-lg font-semibold text-white mb-2">Based on Your Mood</h3>
              <p className="text-sm text-gray-400 mb-3">Discover music that matches your current vibe</p>
              <button className="px-4 py-2 bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 rounded-lg transition-colors">
                Explore
              </button>
            </div>
            <div className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-lg p-4 border border-green-500/30">
              <h3 className="text-lg font-semibold text-white mb-2">New Releases</h3>
              <p className="text-sm text-gray-400 mb-3">Stay updated with the latest from your favorite artists</p>
              <button className="px-4 py-2 bg-green-500/20 hover:bg-green-500/30 text-green-400 rounded-lg transition-colors">
                Discover
              </button>
            </div>
            <div className="bg-gradient-to-br from-orange-500/20 to-red-500/20 rounded-lg p-4 border border-orange-500/30">
              <h3 className="text-lg font-semibold text-white mb-2">Collaborative Mix</h3>
              <p className="text-sm text-gray-400 mb-3">Music curated by friends and the community</p>
              <button className="px-4 py-2 bg-orange-500/20 hover:bg-orange-500/30 text-orange-400 rounded-lg transition-colors">
                Join
              </button>
            </div>
          </div>
        </div>
      </div>
      {showOnboarding && (
        <SpotifyOnboarding
          onComplete={handleOnboardingComplete}
          onSkip={handleOnboardingSkip}
        />
      )}
    </>
  )
}

export default Dashboard 