import { useState } from 'react'
import { Search, Sparkles, TrendingUp, Heart, Play, Plus } from 'lucide-react'

export default function Discovery() {
  const [activeTab, setActiveTab] = useState('recommendations')

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

      {/* Tabs */}
      <div className="flex space-x-1 bg-gray-800/50 rounded-lg p-1">
        {['recommendations', 'trending', 'new-releases', 'mood-based'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === tab
                ? 'bg-harmony-500 text-white'
                : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
            }`}
          >
            {tab.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="glass-effect rounded-xl p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="bg-gray-800/30 rounded-lg p-4 hover:bg-gray-800/50 transition-colors cursor-pointer group">
              <div className="aspect-square bg-gradient-to-br from-harmony-500/20 to-primary-500/20 rounded-lg mb-4 flex items-center justify-center relative overflow-hidden">
                <span className="text-3xl">🎵</span>
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Play className="w-8 h-8 text-white" />
                </div>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Track {i + 1}</h3>
              <p className="text-sm text-gray-400 mb-3">Artist {i + 1}</p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500">3:45</span>
                <div className="flex space-x-2">
                  <button className="p-2 hover:bg-gray-700/50 rounded-lg transition-colors">
                    <Heart className="w-4 h-4 text-gray-400" />
                  </button>
                  <button className="p-2 hover:bg-gray-700/50 rounded-lg transition-colors">
                    <Plus className="w-4 h-4 text-gray-400" />
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