import { useState, useEffect, useMemo } from 'react'
import { Search, Filter, Grid, List, Heart, Clock, Music, Star, Play, Loader, RefreshCw, Shuffle } from 'lucide-react'
import { useMusic } from '../contexts/MusicContext'
import { spotifyService } from '../services/spotify'

interface LibraryTrack {
  id: string
  title: string
  artist: string
  album: string
  duration: number
  artwork: string
  service: 'spotify' | 'apple' | 'youtube' | 'tidal' | 'deezer' | 'amazon'
  url: string
  addedAt?: string
  isLiked?: boolean
}

export default function Library() {
  const { state, playTrack, loadUserData } = useMusic()
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [searchQuery, setSearchQuery] = useState('')
  const [libraryTracks, setLibraryTracks] = useState<LibraryTrack[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [selectedFilter, setSelectedFilter] = useState('all')

  useEffect(() => {
    if (state.connectedServices.includes('spotify')) {
      loadLibraryTracks()
    }
  }, [state.connectedServices])

  const loadLibraryTracks = async () => {
    setIsLoading(true)
    try {
      const savedTracks = await spotifyService.getSavedTracks(50)
      
      const formattedTracks = savedTracks.map((track: any) => ({
        id: track.id,
        title: track.name,
        artist: track.artists?.[0]?.name || 'Unknown Artist',
        album: track.album?.name || 'Unknown Album',
        duration: Math.round(track.duration_ms / 1000),
        artwork: track.album?.images?.[0]?.url || '',
        service: 'spotify' as const,
        url: track.external_urls?.spotify || '',
        addedAt: new Date().toISOString(), // Spotify doesn't provide added_at in search results
        isLiked: true
      }))

      setLibraryTracks(formattedTracks)
    } catch (error) {
      console.error('Failed to load library tracks:', error)
      setLibraryTracks([])
    } finally {
      setIsLoading(false)
    }
  }

  const filteredTracks = useMemo(() => {
    let filtered = libraryTracks

    // Filter by search query
    if (searchQuery.trim()) {
      filtered = filtered.filter(track => 
        track.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        track.artist.toLowerCase().includes(searchQuery.toLowerCase()) ||
        track.album.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    // Filter by type
    switch (selectedFilter) {
      case 'liked':
        filtered = filtered.filter(track => track.isLiked)
        break
      case 'recent':
        // Show tracks added in last 30 days
        const thirtyDaysAgo = new Date()
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)
        filtered = filtered.filter(track => 
          track.addedAt && new Date(track.addedAt) > thirtyDaysAgo
        )
        break
      case 'favorites':
        // This would be based on user's favorite tracks
        filtered = filtered.slice(0, Math.floor(filtered.length * 0.3)) // Top 30% as favorites
        break
      default:
        break
    }

    return filtered
  }, [libraryTracks, searchQuery, selectedFilter])

  const handlePlayAll = () => {
    if (filteredTracks.length > 0) {
      // Play the first track and add the rest to queue
      playTrack(filteredTracks[0])
      filteredTracks.slice(1).forEach(track => {
        // Add to queue functionality would be implemented here
        console.log('Adding to queue:', track.title)
      })
    }
  }

  const handleShufflePlay = () => {
    if (filteredTracks.length > 0) {
      const shuffled = [...filteredTracks].sort(() => Math.random() - 0.5)
      playTrack(shuffled[0])
    }
  }

  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
  }

  const getLibraryStats = () => {
    const totalTracks = libraryTracks.length
    const likedTracks = libraryTracks.filter(track => track.isLiked).length
    const recentTracks = libraryTracks.filter(track => {
      if (!track.addedAt) return false
      const thirtyDaysAgo = new Date()
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)
      return new Date(track.addedAt) > thirtyDaysAgo
    }).length
    const favoriteTracks = Math.floor(totalTracks * 0.3) // Top 30% as favorites

    return { totalTracks, likedTracks, recentTracks, favoriteTracks }
  }

  const stats = getLibraryStats()

  return (
    <div className="h-full overflow-y-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-white">Music Library</h1>
        <div className="flex items-center space-x-2">
          {filteredTracks.length > 0 && (
            <>
              <button
                onClick={handlePlayAll}
                className="px-4 py-2 bg-harmony-500 hover:bg-harmony-600 text-white rounded-lg transition-colors flex items-center space-x-2"
              >
                <Play className="w-4 h-4" />
                <span>Play All</span>
              </button>
              <button
                onClick={handleShufflePlay}
                className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors flex items-center space-x-2"
              >
                <Shuffle className="w-4 h-4" />
                <span>Shuffle</span>
              </button>
            </>
          )}
          <button
            onClick={() => setViewMode('grid')}
            className={`p-2 rounded-lg transition-colors ${
              viewMode === 'grid' ? 'bg-harmony-500 text-white' : 'bg-gray-800/50 text-gray-400'
            }`}
          >
            <Grid className="w-5 h-5" />
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`p-2 rounded-lg transition-colors ${
              viewMode === 'list' ? 'bg-harmony-500 text-white' : 'bg-gray-800/50 text-gray-400'
            }`}
          >
            <List className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="glass-effect rounded-xl p-6">
        <div className="flex items-center space-x-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search your library..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-harmony-500"
            />
          </div>
          <select
            value={selectedFilter}
            onChange={(e) => setSelectedFilter(e.target.value)}
            className="px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-harmony-500"
          >
            <option value="all">All Tracks</option>
            <option value="liked">Liked Songs</option>
            <option value="recent">Recently Added</option>
            <option value="favorites">Favorites</option>
          </select>
          <button className="p-3 bg-gray-800/50 hover:bg-gray-700/50 rounded-lg transition-colors">
            <Filter className="w-5 h-5 text-gray-400" />
          </button>
          <button 
            onClick={async () => {
              setIsLoading(true)
              await loadUserData()
              await loadLibraryTracks()
              setIsLoading(false)
            }}
            disabled={isLoading}
            className="p-3 bg-harmony-500/20 hover:bg-harmony-500/30 rounded-lg transition-colors disabled:opacity-50"
            title="Refresh library data"
          >
            <RefreshCw className={`w-5 h-5 text-harmony-400 ${isLoading ? 'animate-spin' : ''}`} />
          </button>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-gray-800/30 rounded-lg p-4">
            <div className="flex items-center space-x-3">
              <Music className="w-6 h-6 text-blue-400" />
              <div>
                <p className="text-sm text-gray-400">Total Tracks</p>
                <p className="text-xl font-bold text-white">{stats.totalTracks}</p>
              </div>
            </div>
          </div>
          <div className="bg-gray-800/30 rounded-lg p-4">
            <div className="flex items-center space-x-3">
              <Heart className="w-6 h-6 text-red-400" />
              <div>
                <p className="text-sm text-gray-400">Liked Songs</p>
                <p className="text-xl font-bold text-white">{stats.likedTracks}</p>
              </div>
            </div>
          </div>
          <div className="bg-gray-800/30 rounded-lg p-4">
            <div className="flex items-center space-x-3">
              <Star className="w-6 h-6 text-yellow-400" />
              <div>
                <p className="text-sm text-gray-400">Favorites</p>
                <p className="text-xl font-bold text-white">{stats.favoriteTracks}</p>
              </div>
            </div>
          </div>
          <div className="bg-gray-800/30 rounded-lg p-4">
            <div className="flex items-center space-x-3">
              <Clock className="w-6 h-6 text-green-400" />
              <div>
                <p className="text-sm text-gray-400">Recently Added</p>
                <p className="text-xl font-bold text-white">{stats.recentTracks}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Library Content */}
        {!state.connectedServices.includes('spotify') ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-800/50 rounded-full flex items-center justify-center mx-auto mb-4">
              <Music className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Connect Spotify for Your Library</h3>
            <p className="text-gray-400">Connect your Spotify account to see your saved tracks and library</p>
          </div>
        ) : isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader className="w-8 h-8 animate-spin text-harmony-400" />
          </div>
        ) : filteredTracks.length > 0 ? (
          <>
            {viewMode === 'grid' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredTracks.map((track) => (
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
                          className="p-1 hover:bg-gray-700/50 rounded transition-colors"
                          onClick={(e) => {
                            e.stopPropagation()
                            console.log('Toggle like:', track.title)
                          }}
                        >
                          <Heart className={`w-4 h-4 ${track.isLiked ? 'text-red-400 fill-current' : 'text-gray-400'}`} />
                        </button>
                        <button 
                          className="p-1 hover:bg-gray-700/50 rounded transition-colors"
                          onClick={(e) => {
                            e.stopPropagation()
                            console.log('Toggle favorite:', track.title)
                          }}
                        >
                          <Star className="w-4 h-4 text-gray-400" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-2">
                {filteredTracks.map((track) => (
                  <div 
                    key={track.id} 
                    className="flex items-center space-x-4 p-4 bg-gray-800/30 rounded-lg hover:bg-gray-800/50 transition-colors cursor-pointer"
                    onClick={() => playTrack(track)}
                  >
                    <div className="w-12 h-12 bg-gradient-to-br from-harmony-500/20 to-primary-500/20 rounded-lg flex items-center justify-center overflow-hidden">
                      {track.artwork ? (
                        <img 
                          src={track.artwork} 
                          alt={track.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span className="text-lg">🎵</span>
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-white truncate">{track.title}</p>
                      <p className="text-xs text-gray-400 truncate">{track.artist} • {track.album}</p>
                    </div>
                    <div className="flex items-center space-x-4">
                      <span className="text-xs text-gray-500">{formatDuration(track.duration)}</span>
                      <div className="flex space-x-2">
                        <button 
                          className="p-1 hover:bg-gray-700/50 rounded transition-colors"
                          onClick={(e) => {
                            e.stopPropagation()
                            console.log('Toggle like:', track.title)
                          }}
                        >
                          <Heart className={`w-4 h-4 ${track.isLiked ? 'text-red-400 fill-current' : 'text-gray-400'}`} />
                        </button>
                        <button 
                          className="p-1 hover:bg-gray-700/50 rounded transition-colors"
                          onClick={(e) => {
                            e.stopPropagation()
                            console.log('Toggle favorite:', track.title)
                          }}
                        >
                          <Star className="w-4 h-4 text-gray-400" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-800/50 rounded-full flex items-center justify-center mx-auto mb-4">
              <Music className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">No tracks found</h3>
            <p className="text-gray-400">
              {searchQuery ? 'Try adjusting your search terms' : 'Your library is empty. Start adding some tracks!'}
            </p>
          </div>
        )}
      </div>
    </div>
  )
} 