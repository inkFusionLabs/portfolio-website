import { useState } from 'react'
import { Play, Pause, SkipForward, SkipBack, Volume2, VolumeX, Repeat, Shuffle, Heart, Plus, Share2, MoreHorizontal } from 'lucide-react'
import { useMusic } from '../contexts/MusicContext'

export default function Player() {
  const { state, playTrack, pauseTrack, nextTrack, previousTrack } = useMusic()
  const [volume, setVolume] = useState(70)
  const [isMuted, setIsMuted] = useState(false)

  return (
    <div className="h-full overflow-y-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-white">Music Player</h1>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-400">Universal Player</span>
        </div>
      </div>

      {/* Main Player */}
      <div className="glass-effect rounded-xl p-8">
        <div className="flex flex-col lg:flex-row items-center space-y-8 lg:space-y-0 lg:space-x-8">
          {/* Album Art */}
          <div className="w-64 h-64 bg-gradient-to-br from-harmony-500/20 to-primary-500/20 rounded-xl flex items-center justify-center">
            <span className="text-6xl">🎵</span>
          </div>

          {/* Track Info & Controls */}
          <div className="flex-1 space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">Bohemian Rhapsody</h2>
              <p className="text-lg text-gray-400 mb-1">Queen</p>
              <p className="text-sm text-gray-500">A Night at the Opera • Spotify</p>
            </div>

            {/* Progress Bar */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm text-gray-400">
                <span>2:34</span>
                <span>5:55</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div className="bg-harmony-500 h-2 rounded-full" style={{ width: '42%' }}></div>
              </div>
            </div>

            {/* Main Controls */}
            <div className="flex items-center justify-center space-x-6">
              <button className="p-3 hover:bg-gray-800/50 rounded-full transition-colors">
                <Shuffle className="w-6 h-6 text-gray-400" />
              </button>
              <button 
                onClick={previousTrack}
                className="p-3 hover:bg-gray-800/50 rounded-full transition-colors"
              >
                <SkipBack className="w-6 h-6 text-white" />
              </button>
              <button 
                onClick={state.isPlaying ? pauseTrack : () => playTrack(state.currentTrack!)}
                className="p-4 bg-harmony-500 hover:bg-harmony-600 rounded-full transition-colors"
              >
                {state.isPlaying ? (
                  <Pause className="w-8 h-8 text-white" />
                ) : (
                  <Play className="w-8 h-8 text-white ml-1" />
                )}
              </button>
              <button 
                onClick={nextTrack}
                className="p-3 hover:bg-gray-800/50 rounded-full transition-colors"
              >
                <SkipForward className="w-6 h-6 text-white" />
              </button>
              <button className="p-3 hover:bg-gray-800/50 rounded-full transition-colors">
                <Repeat className="w-6 h-6 text-gray-400" />
              </button>
            </div>

            {/* Secondary Controls */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <button className="p-2 hover:bg-gray-800/50 rounded-lg transition-colors">
                  <Heart className="w-5 h-5 text-gray-400" />
                </button>
                <button className="p-2 hover:bg-gray-800/50 rounded-lg transition-colors">
                  <Plus className="w-5 h-5 text-gray-400" />
                </button>
                <button className="p-2 hover:bg-gray-800/50 rounded-lg transition-colors">
                  <Share2 className="w-5 h-5 text-gray-400" />
                </button>
                <button className="p-2 hover:bg-gray-800/50 rounded-lg transition-colors">
                  <MoreHorizontal className="w-5 h-5 text-gray-400" />
                </button>
              </div>

              {/* Volume Control */}
              <div className="flex items-center space-x-3">
                <button 
                  onClick={() => setIsMuted(!isMuted)}
                  className="p-2 hover:bg-gray-800/50 rounded-lg transition-colors"
                >
                  {isMuted ? (
                    <VolumeX className="w-5 h-5 text-gray-400" />
                  ) : (
                    <Volume2 className="w-5 h-5 text-gray-400" />
                  )}
                </button>
                <div className="w-24 bg-gray-700 rounded-full h-2">
                  <div 
                    className="bg-harmony-500 h-2 rounded-full" 
                    style={{ width: `${isMuted ? 0 : volume}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Queue */}
      <div className="glass-effect rounded-xl p-6">
        <h3 className="text-xl font-semibold text-white mb-4">Queue</h3>
        <div className="space-y-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-800/30 transition-colors cursor-pointer">
              <div className="w-12 h-12 bg-gradient-to-br from-harmony-500/20 to-primary-500/20 rounded-lg flex items-center justify-center">
                <span className="text-lg">🎵</span>
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-white">Track {i + 1}</p>
                <p className="text-xs text-gray-400">Artist {i + 1}</p>
              </div>
              <span className="text-xs text-gray-500">3:45</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
} 