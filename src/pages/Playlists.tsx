import { useState } from 'react'
import { Plus, Search, Filter, MoreHorizontal, Play, Heart, Share2 } from 'lucide-react'

export default function Playlists() {
  const [searchQuery, setSearchQuery] = useState('')

  return (
    <div className="h-full overflow-y-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-white">Playlists</h1>
        <button className="px-4 py-2 bg-harmony-500 hover:bg-harmony-600 text-white rounded-lg transition-colors">
          <Plus className="w-4 h-4 mr-2" />
          Create Playlist
        </button>
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
          <button className="p-3 bg-gray-800/50 hover:bg-gray-700/50 rounded-lg transition-colors">
            <Filter className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Mock playlists */}
          {Array.from({ length: 9 }).map((_, i) => (
            <div key={i} className="bg-gray-800/30 rounded-lg p-4 hover:bg-gray-800/50 transition-colors cursor-pointer">
              <div className="aspect-square bg-gradient-to-br from-harmony-500/20 to-primary-500/20 rounded-lg mb-4 flex items-center justify-center">
                <span className="text-2xl">🎵</span>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Playlist {i + 1}</h3>
              <p className="text-sm text-gray-400 mb-3">Description for playlist {i + 1}</p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500">24 tracks</span>
                <div className="flex space-x-2">
                  <button className="p-2 hover:bg-gray-700/50 rounded-lg transition-colors">
                    <Play className="w-4 h-4 text-gray-400" />
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
      </div>
    </div>
  )
} 