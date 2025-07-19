import { useState, useMemo } from 'react'
import { Plus, Search, Filter, Play, Heart, Share2, Loader, Music, RefreshCw, Shuffle } from 'lucide-react'
import { useMusic } from '../contexts/MusicContext'

export default function Playlists() {
  const { state, playTrack, loadUserData } = useMusic()
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedService, setSelectedService] = useState('all')

  // Filter playlists based on search query and selected service
  const filteredPlaylists = useMemo(() => {
    let filtered = state.playlists

    // Filter by service
    if (selectedService !== 'all') {
      filtered = filtered.filter(playlist => playlist.service === selectedService)
    }

    // Filter by search query
    if (searchQuery.trim()) {
      filtered = filtered.filter(playlist => 
        playlist.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        playlist.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    return filtered
  }, [state.playlists, searchQuery, selectedService])

  const handlePlaylistClick = (playlist: any) => {
    // In a real implementation, you would load the playlist tracks
    console.log('Playing playlist:', playlist.name)
  }

  const handlePlayPlaylist = (playlist: any) => {
    // Play the first track of the playlist
    if (playlist.tracks.length > 0) {
      playTrack(playlist.tracks[0])
    } else {
      console.log('Playlist is empty:', playlist.name)
    }
  }

  const handleShufflePlaylist = (playlist: any) => {
    if (playlist.tracks.length > 0) {
      const shuffled = [...playlist.tracks].sort(() => Math.random() - 0.5)
      playTrack(shuffled[0])
    }
  }

  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
  }

  return (
    <div className="h-full overflow-y-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-white">Playlists</h1>
        <button className="px-4 py-2 bg-harmony-500 hover:bg-harmony-600 text-white rounded-lg transition-colors">
          <Plus className="w-4 h-4 mr-2" />
          Create Playlist
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="glass-effect rounded-xl p-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
              <Music className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Total Playlists</p>
              <p className="text-xl font-bold text-white">{state.playlists.length}</p>
            </div>
          </div>
        </div>
        <div className="glass-effect rounded-xl p-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
              <Play className="w-5 h-5 text-green-400" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Public</p>
              <p className="text-xl font-bold text-white">
                {state.playlists.filter(p => !p.name.toLowerCase().includes('private')).length}
              </p>
            </div>
          </div>
        </div>
        <div className="glass-effect rounded-xl p-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
              <Heart className="w-5 h-5 text-purple-400" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Liked</p>
              <p className="text-xl font-bold text-white">
                {state.playlists.filter(p => p.name.toLowerCase().includes('liked')).length}
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
              <p className="text-xl font-bold text-white">{state.connectedServices.length}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="glass-effect rounded-xl p-6">
        <div className="flex items-center space-x-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search playlists..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-harmony-500"
            />
          </div>
          <select
            value={selectedService}
            onChange={(e) => setSelectedService(e.target.value)}
            className="px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-harmony-500"
          >
            <option value="all">All Services</option>
            {state.connectedServices.map(service => (
              <option key={service} value={service} className="capitalize">
                {service}
              </option>
            ))}
          </select>
          <button className="p-3 bg-gray-800/50 hover:bg-gray-700/50 rounded-lg transition-colors">
            <Filter className="w-5 h-5 text-gray-400" />
          </button>
          <button 
            onClick={async () => {
              await loadUserData()
            }}
            disabled={state.isLoading}
            className="p-3 bg-harmony-500/20 hover:bg-harmony-500/30 rounded-lg transition-colors disabled:opacity-50"
            title="Refresh playlists"
          >
            <RefreshCw className={`w-5 h-5 text-harmony-400 ${state.isLoading ? 'animate-spin' : ''}`} />
          </button>
        </div>

        {state.isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader className="w-8 h-8 animate-spin text-harmony-400" />
          </div>
        ) : filteredPlaylists.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPlaylists.map((playlist) => (
              <div 
                key={playlist.id} 
                className="bg-gray-800/30 rounded-lg p-4 hover:bg-gray-800/50 transition-colors cursor-pointer"
                onClick={() => handlePlaylistClick(playlist)}
              >
                <div className="aspect-square bg-gradient-to-br from-harmony-500/20 to-primary-500/20 rounded-lg mb-4 flex items-center justify-center overflow-hidden">
                  {playlist.artwork ? (
                    <img 
                      src={playlist.artwork} 
                      alt={playlist.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-2xl">🎵</span>
                  )}
                </div>
                <h3 className="text-lg font-semibold text-white mb-2 truncate">{playlist.name}</h3>
                <p className="text-sm text-gray-400 mb-3 line-clamp-2">{playlist.description || 'No description'}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-xs text-gray-500">{playlist.tracks.length} tracks</span>
                    <span className="text-xs text-gray-500">•</span>
                    <span className="text-xs text-gray-500 capitalize">{playlist.service}</span>
                  </div>
                  <div className="flex space-x-2">
                    <button 
                      className="p-2 hover:bg-gray-700/50 rounded-lg transition-colors"
                      onClick={(e) => {
                        e.stopPropagation()
                        handlePlayPlaylist(playlist)
                      }}
                      title="Play playlist"
                    >
                      <Play className="w-4 h-4 text-gray-400" />
                    </button>
                    <button 
                      className="p-2 hover:bg-gray-700/50 rounded-lg transition-colors"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleShufflePlaylist(playlist)
                      }}
                      title="Shuffle playlist"
                    >
                      <Shuffle className="w-4 h-4 text-gray-400" />
                    </button>
                    <button className="p-2 hover:bg-gray-700/50 rounded-lg transition-colors">
                      <Heart className="w-4 h-4 text-gray-400" />
                    </button>
                    <button className="p-2 hover:bg-gray-700/50 rounded-lg transition-colors">
                      <Share2 className="w-4 h-4 text-gray-400" />
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
            <h3 className="text-lg font-semibold text-white mb-2">No playlists found</h3>
            <p className="text-gray-400">
              {searchQuery ? 'Try adjusting your search terms' : 'Connect a music service to see your playlists'}
            </p>
          </div>
        )}
      </div>
    </div>
  )
} 