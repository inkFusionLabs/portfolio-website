import { Play, Pause, SkipForward, SkipBack, Volume2, VolumeX } from 'lucide-react'
import { useMusic } from '../contexts/MusicContext'
import { useState, useCallback, useMemo } from 'react'

export default function MiniPlayer() {
  const { state, playTrack, pauseTrack, nextTrack, previousTrack, setVolume } = useMusic()
  const [isMuted, setIsMuted] = useState(false)
  const [volume, setLocalVolume] = useState(70)

  // Add error boundary and null checks
  if (!state || !state.currentTrack) {
    return null
  }

  const handlePlayPause = useCallback(() => {
    if (state.currentTrack) {
      if (state.isPlaying) {
        pauseTrack()
      } else {
        playTrack(state.currentTrack)
      }
    }
  }, [state.currentTrack, state.isPlaying, pauseTrack, playTrack])

  const handleVolumeChange = useCallback((newVolume: number) => {
    setLocalVolume(newVolume)
    setVolume(newVolume / 100)
    setIsMuted(newVolume === 0)
  }, [setVolume])

  const toggleMute = useCallback(() => {
    if (isMuted) {
      setIsMuted(false)
      setLocalVolume(70)
      setVolume(0.7)
    } else {
      setIsMuted(true)
      setLocalVolume(0)
      setVolume(0)
    }
  }, [isMuted, setVolume])



  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-900/95 backdrop-blur-lg border-t border-gray-800 z-50">
      <div className="flex items-center justify-between px-4 py-3">
        {/* Track Info */}
        <div className="flex items-center space-x-3 flex-1 min-w-0">
          <div className="w-12 h-12 bg-gradient-to-br from-harmony-500/20 to-primary-500/20 rounded-lg flex items-center justify-center overflow-hidden flex-shrink-0">
            {state.currentTrack.artwork ? (
              <img 
                src={state.currentTrack.artwork} 
                alt={state.currentTrack.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-lg">🎵</span>
            )}
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-medium text-white truncate">{state.currentTrack.title}</p>
            <p className="text-xs text-gray-400 truncate">{state.currentTrack.artist}</p>
          </div>
        </div>

        {/* Playback Controls */}
        <div className="flex items-center space-x-2">
          <button 
            onClick={previousTrack}
            className="p-2 hover:bg-gray-800/50 rounded-full transition-colors"
            title="Previous track"
          >
            <SkipBack className="w-4 h-4 text-white" />
          </button>
          <button 
            onClick={handlePlayPause}
            className="p-2 bg-harmony-500 hover:bg-harmony-600 rounded-full transition-colors"
            title={state.isPlaying ? 'Pause' : 'Play'}
          >
            {state.isPlaying ? (
              <Pause className="w-4 h-4 text-white" />
            ) : (
              <Play className="w-4 h-4 text-white ml-0.5" />
            )}
          </button>
          <button 
            onClick={nextTrack}
            className="p-2 hover:bg-gray-800/50 rounded-full transition-colors"
            title="Next track"
          >
            <SkipForward className="w-4 h-4 text-white" />
          </button>
        </div>

        {/* Volume Control */}
        <div className="flex items-center space-x-2 flex-shrink-0">
          <button 
            onClick={toggleMute}
            className="p-1 hover:bg-gray-800/50 rounded transition-colors"
            title={isMuted ? 'Unmute' : 'Mute'}
          >
            {isMuted ? (
              <VolumeX className="w-4 h-4 text-gray-400" />
            ) : (
              <Volume2 className="w-4 h-4 text-gray-400" />
            )}
          </button>
          <input
            type="range"
            min="0"
            max="100"
            value={isMuted ? 0 : volume}
            onChange={(e) => handleVolumeChange(parseInt(e.target.value))}
            className="w-16 h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
            title="Volume"
          />
        </div>
      </div>

      {/* Progress Bar */}
      {(() => {
        const progress = useMemo(() => {
          if (state.currentDuration > 0 && state.currentPosition >= 0) {
            return Math.min((state.currentPosition / state.currentDuration) * 100, 100)
          }
          return 0
        }, [state.currentPosition, state.currentDuration])

        if (state.currentDuration > 0 && state.currentPosition >= 0) {
          return (
            <div className="w-full bg-gray-800 h-1">
              <div 
                className="bg-harmony-500 h-1 transition-all duration-300" 
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          )
        }
        return null
      })()}
    </div>
  )
} 