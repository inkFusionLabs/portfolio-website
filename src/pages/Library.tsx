import { useState } from 'react'
import { Search, Filter, Grid, List, Heart, Clock, Music, Star } from 'lucide-react'

export default function Library() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [searchQuery, setSearchQuery] = useState('')

  return (
    <div className="h-full overflow-y-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-white">Music Library</h1>
        <div className="flex items-center space-x-2">
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
          <button className="p-3 bg-gray-800/50 hover:bg-gray-700/50 rounded-lg transition-colors">
            <Filter className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-gray-800/30 rounded-lg p-4">
            <div className="flex items-center space-x-3">
              <Music className="w-6 h-6 text-blue-400" />
              <div>
                <p className="text-sm text-gray-400">Total Tracks</p>
                <p className="text-xl font-bold text-white">2,847</p>
              </div>
            </div>
          </div>
          <div className="bg-gray-800/30 rounded-lg p-4">
            <div className="flex items-center space-x-3">
              <Heart className="w-6 h-6 text-red-400" />
              <div>
                <p className="text-sm text-gray-400">Liked Songs</p>
                <p className="text-xl font-bold text-white">127</p>
              </div>
            </div>
          </div>
          <div className="bg-gray-800/30 rounded-lg p-4">
            <div className="flex items-center space-x-3">
              <Star className="w-6 h-6 text-yellow-400" />
              <div>
                <p className="text-sm text-gray-400">Favorites</p>
                <p className="text-xl font-bold text-white">89</p>
              </div>
            </div>
          </div>
          <div className="bg-gray-800/30 rounded-lg p-4">
            <div className="flex items-center space-x-3">
              <Clock className="w-6 h-6 text-green-400" />
              <div>
                <p className="text-sm text-gray-400">Recently Added</p>
                <p className="text-xl font-bold text-white">23</p>
              </div>
            </div>
          </div>
        </div>

        {/* Library Content */}
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="bg-gray-800/30 rounded-lg p-4 hover:bg-gray-800/50 transition-colors cursor-pointer group">
                <div className="aspect-square bg-gradient-to-br from-harmony-500/20 to-primary-500/20 rounded-lg mb-4 flex items-center justify-center relative overflow-hidden">
                  <span className="text-3xl">🎵</span>
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="text-white text-sm font-medium">Play</span>
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Track {i + 1}</h3>
                <p className="text-sm text-gray-400 mb-3">Artist {i + 1}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">3:45</span>
                  <div className="flex space-x-2">
                    <button className="p-1 hover:bg-gray-700/50 rounded transition-colors">
                      <Heart className="w-4 h-4 text-gray-400" />
                    </button>
                    <button className="p-1 hover:bg-gray-700/50 rounded transition-colors">
                      <Star className="w-4 h-4 text-gray-400" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-2">
            {Array.from({ length: 10 }).map((_, i) => (
              <div key={i} className="flex items-center space-x-4 p-4 bg-gray-800/30 rounded-lg hover:bg-gray-800/50 transition-colors cursor-pointer">
                <div className="w-12 h-12 bg-gradient-to-br from-harmony-500/20 to-primary-500/20 rounded-lg flex items-center justify-center">
                  <span className="text-lg">🎵</span>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-white">Track {i + 1}</p>
                  <p className="text-xs text-gray-400">Artist {i + 1} • Album {i + 1}</p>
                </div>
                <div className="flex items-center space-x-4">
                  <span className="text-xs text-gray-500">3:45</span>
                  <div className="flex space-x-2">
                    <button className="p-1 hover:bg-gray-700/50 rounded transition-colors">
                      <Heart className="w-4 h-4 text-gray-400" />
                    </button>
                    <button className="p-1 hover:bg-gray-700/50 rounded transition-colors">
                      <Star className="w-4 h-4 text-gray-400" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
} 