import { useState, useEffect } from 'react'
import { Sparkles, Heart, Play, Plus, Loader, TrendingUp, Clock, Music } from 'lucide-react'
import { useMusic } from '../contexts/MusicContext'
import { spotifyService } from '../services/spotify'

interface RecommendationTrack {
  id: string
  title: string
  artist: string
  album: string
  duration: number
  artwork: string
  service: 'spotify' | 'apple' | 'youtube' | 'tidal' | 'deezer' | 'amazon'
  url: string
}

export default function Discovery() {
  const { state, playTrack } = useMusic()
  const [activeTab, setActiveTab] = useState('recommendations')
  const [recommendations, setRecommendations] = useState<RecommendationTrack[]>([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (state.connectedServices.includes('spotify')) {
      loadRecommendations()
    }
  }, [activeTab, state.connectedServices])

  const loadRecommendations = async () => {
    setIsLoading(true)
    try {
      let tracks: any[] = []
      
      switch (activeTab) {
        case 'recommendations':
          // Get recommendations based on user's listening history
          tracks = await spotifyService.getRecommendations(20)
          break
        case 'trending':
          // Get trending tracks (using top tracks as proxy)
          tracks = await spotifyService.getTopTracks(20)
          break
        case 'new-releases':
          // Get new releases
          tracks = await spotifyService.getNewReleases(20)
          break
        case 'mood-based':
          // Get mood-based recommendations
          tracks = await spotifyService.getRecommendations(20, 'dance')
          break
        default:
          tracks = await spotifyService.getRecommendations(20)
      }

      const formattedTracks = tracks.map((track: any) => ({
        id: track.id,
        title: track.name,
        artist: track.artists?.[0]?.name || 'Unknown Artist',
        album: track.album?.name || 'Unknown Album',
        duration: Math.round(track.duration_ms / 1000),
        artwork: track.album?.images?.[0]?.url || '',
        service: 'spotify' as const,
        url: track.external_urls?.spotify || ''
      }))

      setRecommendations(formattedTracks)
    } catch (error) {
      console.error('Failed to load recommendations:', error)
      setRecommendations([])
    } finally {
      setIsLoading(false)
    }
  }

  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
  }

  const getTabIcon = (tab: string) => {
    switch (tab) {
      case 'recommendations':
        return <Sparkles className="w-4 h-4" />
      case 'trending':
        return <TrendingUp className="w-4 h-4" />
      case 'new-releases':
        return <Clock className="w-4 h-4" />
      case 'mood-based':
        return <Heart className="w-4 h-4" />
      default:
        return <Music className="w-4 h-4" />
    }
  }

  return (
    <div className="h-full overflow-y-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Music Discovery</h1>
          <p className="text-gray-400">AI-powered recommendations and trending music</p>
        </div>
        <div className="flex items-center space-x-2">
          <Sparkles className="w-5 h-5 text-harmony-400" />
          <span className="text-harmony-400 font-medium">AI Powered</span>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="glass-effect rounded-xl p-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Recommendations</p>
              <p className="text-xl font-bold text-white">{recommendations.length}</p>
            </div>
          </div>
        </div>
        <div className="glass-effect rounded-xl p-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-green-400" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Trending</p>
              <p className="text-xl font-bold text-white">{activeTab === 'trending' ? recommendations.length : '...'}</p>
            </div>
          </div>
        </div>
        <div className="glass-effect rounded-xl p-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
              <Clock className="w-5 h-5 text-purple-400" />
            </div>
            <div>
              <p className="text-sm text-gray-400">New Releases</p>
              <p className="text-xl font-bold text-white">{activeTab === 'new-releases' ? recommendations.length : '...'}</p>
            </div>
          </div>
        </div>
        <div className="glass-effect rounded-xl p-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-orange-500/20 rounded-lg flex items-center justify-center">
              <Heart className="w-5 h-5 text-orange-400" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Mood Based</p>
              <p className="text-xl font-bold text-white">{activeTab === 'mood-based' ? recommendations.length : '...'}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 bg-gray-800/50 rounded-lg p-1">
        {['recommendations', 'trending', 'new-releases', 'mood-based'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors flex items-center space-x-2 ${
              activeTab === tab
                ? 'bg-harmony-500 text-white'
                : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
            }`}
          >
            {getTabIcon(tab)}
            <span>{tab.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}</span>
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="glass-effect rounded-xl p-6">
        {!state.connectedServices.includes('spotify') ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-800/50 rounded-full flex items-center justify-center mx-auto mb-4">
              <Music className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Connect Spotify for Recommendations</h3>
            <p className="text-gray-400">Connect your Spotify account to get personalized music recommendations</p>
          </div>
        ) : isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader className="w-8 h-8 animate-spin text-harmony-400" />
          </div>
        ) : recommendations.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recommendations.map((track) => (
              <div 
                key={track.id} 
                className="bg-gray-800/30 rounded-lg p-4 hover:bg-gray-800/50 transition-colors cursor-pointer group"
                onClick={() => playTrack(track)}
              >
                <div className="aspect-square bg-gradient-to-br from-harmony-500/20 to-primary-500/20 rounded-lg mb-4 flex items-center justify-center relative overflow-hidden">
                  {track.artwork ? (
                    <img 
                      src={track.artwork} 
                      alt={track.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-3xl">🎵</span>
                  )}
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Play className="w-8 h-8 text-white" />
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2 truncate">{track.title}</h3>
                <p className="text-sm text-gray-400 mb-3 truncate">{track.artist}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">{formatDuration(track.duration)}</span>
                  <div className="flex space-x-2">
                    <button 
                      className="p-2 hover:bg-gray-700/50 rounded-lg transition-colors"
                      onClick={(e) => {
                        e.stopPropagation()
                        // Add to favorites
                        console.log('Added to favorites:', track.title)
                      }}
                    >
                      <Heart className="w-4 h-4 text-gray-400" />
                    </button>
                    <button 
                      className="p-2 hover:bg-gray-700/50 rounded-lg transition-colors"
                      onClick={(e) => {
                        e.stopPropagation()
                        // Add to playlist
                        console.log('Add to playlist:', track.title)
                      }}
                    >
                      <Plus className="w-4 h-4 text-gray-400" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-800/50 rounded-full flex items-center justify-center mx-auto mb-4">
              <Music className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">No recommendations found</h3>
            <p className="text-gray-400">Try a different category or check back later for new recommendations</p>
          </div>
        )}
      </div>
    </div>
  )
} 