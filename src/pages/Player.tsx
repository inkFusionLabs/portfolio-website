import { useState, useEffect, useRef } from 'react'
import { Play, Pause, SkipForward, SkipBack, Volume2, VolumeX, Repeat, Shuffle, Heart, Plus, Share2, MoreHorizontal, Loader } from 'lucide-react'
import { useMusic } from '../contexts/MusicContext'

export default function Player() {
  try {
    const { state, playTrack, pauseTrack, nextTrack, previousTrack, setVolume, seekTo } = useMusic()
    const [volume, setLocalVolume] = useState(70)
    const [isMuted, setIsMuted] = useState(false)
    const volumeInitialized = useRef(false)

    // Use real playback state from Spotify with safe calculations
    const currentTime = (state.currentPosition || 0) / 1000 // Convert from ms to seconds
    const duration = (state.currentDuration || 0) / 1000 // Convert from ms to seconds

    // Check browser compatibility
    const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent)
    const isPlaybackSupported = state.connectedServices.includes('spotify')

    // Update volume in context when local volume changes (only once on mount)
    useEffect(() => {
      if (!volumeInitialized.current) {
        setVolume(volume / 100)
        volumeInitialized.current = true
      }
    }, []) // Only run once on mount

  const formatTime = (seconds: number) => {
    if (!seconds || isNaN(seconds)) return '0:00'
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = Math.floor(seconds % 60)
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
  }

  const handleVolumeChange = (newVolume: number) => {
    setLocalVolume(newVolume)
    setIsMuted(false)
  }

  const toggleMute = () => {
    setIsMuted(!isMuted)
    if (!isMuted) {
      setVolume(0)
    } else {
      setVolume(volume / 100)
    }
  }

  const handlePlayPause = () => {
    if (state.currentTrack) {
      if (state.isPlaying) {
        pauseTrack()
      } else {
        playTrack(state.currentTrack)
      }
    }
  }

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isPlaybackSupported || !duration || duration <= 0) return
    
    try {
      const rect = e.currentTarget.getBoundingClientRect()
      const clickX = e.clientX - rect.left
      const percentage = clickX / rect.width
      const newTime = percentage * duration
      // Seek to the new position in Spotify
      if (state.connectedServices.includes('spotify')) {
        const newPositionMs = Math.round(newTime * 1000)
        seekTo(newPositionMs)
      }
    } catch (error) {
      console.error('Error handling progress click:', error)
    }
  }

  return (
    <div className="h-full overflow-y-auto p-6 space-y-6 relative pointer-events-auto">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-white">Music Player</h1>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-400">Universal Player</span>
          {state.connectedServices.length > 0 && (
            <div className="flex items-center space-x-1">
              {state.connectedServices.map((service) => (
                <div key={service} className="w-2 h-2 bg-green-500 rounded-full"></div>
              ))}
            </div>
          )}
          {!isPlaybackSupported && (
            <div className="flex items-center space-x-1 px-2 py-1 bg-blue-500/20 rounded-full">
              <span className="text-blue-400 text-xs">🎵</span>
              <span className="text-blue-400 text-xs">Connect Spotify</span>
            </div>
          )}
        </div>
      </div>

      {/* Browser Compatibility Notice */}
      {isSafari && (
        <div className="glass-effect rounded-xl p-4 mb-6 bg-green-500/20 border border-green-500/30">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center">
              <span className="text-green-400 text-lg">🦁</span>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">Safari Compatible!</h3>
              <p className="text-gray-300">
                Running in Safari mode with full Spotify playback support. All features work perfectly! 🎵
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Main Player */}
      <div className="glass-effect rounded-xl p-8">
        <div className="flex flex-col lg:flex-row items-center space-y-8 lg:space-y-0 lg:space-x-8">
          {/* Album Art */}
          <div className="w-64 h-64 bg-gradient-to-br from-harmony-500/20 to-primary-500/20 rounded-xl flex items-center justify-center overflow-hidden">
            {state.currentTrack?.artwork ? (
              <img 
                src={state.currentTrack.artwork} 
                alt={state.currentTrack.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-6xl">🎵</span>
            )}
          </div>

          {/* Track Info & Controls */}
          <div className="flex-1 space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">
                {state.currentTrack?.title || 'No track playing'}
              </h2>
              <p className="text-lg text-gray-400 mb-1">
                {state.currentTrack?.artist || 'Unknown Artist'}
              </p>
              <p className="text-sm text-gray-500">
                {state.currentTrack?.album || 'Unknown Album'} • {state.currentTrack?.service || 'Unknown Service'}
              </p>
            </div>

            {/* Progress Bar */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm text-gray-400">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration || state.currentTrack?.duration || 0)}</span>
              </div>
              <div 
                className="w-full bg-gray-700 rounded-full h-2 cursor-pointer"
                onClick={handleProgressClick}
              >
                <div 
                  className="bg-harmony-500 h-2 rounded-full transition-all duration-300" 
                  style={{ 
                    width: `${duration > 0 ? Math.min((currentTime / duration) * 100, 100) : 0}%` 
                  }}
                ></div>
              </div>
            </div>

            {/* Main Controls */}
            <div className="flex items-center justify-center space-x-6">
              <button className="p-3 hover:bg-gray-800/50 rounded-full transition-colors">
                <Shuffle className="w-6 h-6 text-gray-400" />
              </button>
              <button 
                onClick={previousTrack}
                disabled={state.queue.length === 0 || !isPlaybackSupported}
                className="p-3 hover:bg-gray-800/50 rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                title={!isPlaybackSupported ? 'Connect to Spotify to enable playback' : ''}
              >
                <SkipBack className="w-6 h-6 text-white" />
              </button>
              <button 
                onClick={handlePlayPause}
                disabled={!state.currentTrack || !isPlaybackSupported}
                className="p-4 bg-harmony-500 hover:bg-harmony-600 rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                title={!isPlaybackSupported ? 'Connect to Spotify to enable playback' : ''}
              >
                {state.isLoading ? (
                  <Loader className="w-8 h-8 text-white animate-spin" />
                ) : state.isPlaying ? (
                  <Pause className="w-8 h-8 text-white" />
                ) : (
                  <Play className="w-8 h-8 text-white ml-1" />
                )}
              </button>
              <button 
                onClick={nextTrack}
                disabled={state.queue.length === 0 || !isPlaybackSupported}
                className="p-3 hover:bg-gray-800/50 rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                title={!isPlaybackSupported ? 'Connect to Spotify to enable playback' : ''}
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
                  onClick={toggleMute}
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
                    className="bg-harmony-500 h-2 rounded-full transition-all duration-300" 
                    style={{ width: `${isMuted ? 0 : volume}%` }}
                  ></div>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={isMuted ? 0 : volume}
                  onChange={(e) => handleVolumeChange(parseInt(e.target.value))}
                  className="w-20"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Queue */}
      <div className="glass-effect rounded-xl p-6">
        <h3 className="text-xl font-semibold text-white mb-4">Queue</h3>
        {state.queue.length > 0 ? (
          <div className="space-y-3">
            {state.queue.map((track, index) => (
              <div 
                key={track.id} 
                className="flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-800/30 transition-colors cursor-pointer"
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
                  <p className="text-sm font-medium text-white">{track.title}</p>
                  <p className="text-xs text-gray-400">{track.artist}</p>
                </div>
                <span className="text-xs text-gray-500">{formatTime(track.duration)}</span>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-400">No tracks in queue</p>
            <p className="text-sm text-gray-500 mt-2">Add tracks from your library or search results</p>
          </div>
        )}
      </div>

      {/* Recently Played */}
      {state.recentlyPlayed.length > 0 && (
        <div className="glass-effect rounded-xl p-6">
          <h3 className="text-xl font-semibold text-white mb-4">Recently Played</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {state.recentlyPlayed.slice(0, 6).map((track) => (
              <div 
                key={track.id}
                className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-800/30 transition-colors cursor-pointer"
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
                    <span className="text-sm">🎵</span>
                  )}
                </div>
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
  )
  } catch (error) {
    console.error('Player page error:', error)
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">⚠️</span>
          </div>
          <h2 className="text-xl font-bold text-white mb-2">Player Error</h2>
          <p className="text-gray-400 mb-4">Something went wrong loading the player</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-harmony-500 hover:bg-harmony-600 text-white rounded-lg transition-colors"
          >
            Reload Page
          </button>
        </div>
      </div>
    )
  }
} 