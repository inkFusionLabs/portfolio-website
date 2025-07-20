import React, { useState, useEffect } from 'react'
import { Play, Pause, SkipBack, SkipForward, Volume2, Heart, Share2, Download } from 'lucide-react'

const InteractiveMusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTrack, setCurrentTrack] = useState(0)
  const [volume, setVolume] = useState(80)
  const [progress, setProgress] = useState(0)

  // Demo tracks
  const demoTracks = [
    {
      id: 1,
      title: "Midnight Dreams",
      artist: "Luna Echo",
      album: "Cosmic Vibes",
      duration: "3:45",
      cover: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop&crop=center"
    },
    {
      id: 2,
      title: "Electric Soul",
      artist: "Neon Pulse",
      album: "Digital Revolution",
      duration: "4:12",
      cover: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=300&h=300&fit=crop&crop=center"
    },
    {
      id: 3,
      title: "Ocean Waves",
      artist: "Ambient Flow",
      album: "Nature's Symphony",
      duration: "5:23",
      cover: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=300&fit=crop&crop=center"
    }
  ]

  const currentTrackData = demoTracks[currentTrack]

  useEffect(() => {
    let interval
    if (isPlaying) {
      interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            setIsPlaying(false)
            return 0
          }
          return prev + 0.5
        })
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [isPlaying])

  const togglePlay = () => {
    setIsPlaying(!isPlaying)
  }

  const nextTrack = () => {
    setCurrentTrack((prev) => (prev + 1) % demoTracks.length)
    setProgress(0)
  }

  const prevTrack = () => {
    setCurrentTrack((prev) => (prev - 1 + demoTracks.length) % demoTracks.length)
    setProgress(0)
  }

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <div className="py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 glass rounded-full mb-6">
            <Volume2 className="w-4 h-4 text-blue-400 mr-2" />
            <span className="text-sm font-medium">Interactive Demo</span>
          </div>
          <h2 className="text-5xl md:text-6xl font-black text-white mb-8">
            Try the
            <span className="gradient-text"> Music Player</span>
          </h2>
          <p className="text-xl md:text-2xl text-gray-200 max-w-4xl mx-auto leading-relaxed">
            Experience the power of OmniFusion Music with our interactive demo player
          </p>
        </div>

        <div className="glass p-8 rounded-3xl max-w-2xl mx-auto">
          {/* Album Art */}
          <div className="flex justify-center mb-8">
            <div className="relative group">
              <img
                src={currentTrackData.cover}
                alt={currentTrackData.album}
                className="w-64 h-64 rounded-2xl object-cover shadow-2xl transition-transform group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <button
                  onClick={togglePlay}
                  className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
                >
                  {isPlaying ? (
                    <Pause className="w-8 h-8 text-white" />
                  ) : (
                    <Play className="w-8 h-8 text-white ml-1" />
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Track Info */}
          <div className="text-center mb-6">
            <h3 className="text-2xl font-bold text-white mb-2">{currentTrackData.title}</h3>
            <p className="text-gray-300 text-lg">{currentTrackData.artist}</p>
            <p className="text-gray-400 text-sm">{currentTrackData.album}</p>
          </div>

          {/* Progress Bar */}
          <div className="mb-6">
            <div className="flex justify-between text-sm text-gray-400 mb-2">
              <span>{formatTime((progress / 100) * 225)}</span>
              <span>{currentTrackData.duration}</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center space-x-6 mb-6">
            <button
              onClick={prevTrack}
              className="p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            >
              <SkipBack className="w-6 h-6 text-white" />
            </button>
            
            <button
              onClick={togglePlay}
              className="p-4 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 transition-all transform hover:scale-105"
            >
              {isPlaying ? (
                <Pause className="w-8 h-8 text-white" />
              ) : (
                <Play className="w-8 h-8 text-white ml-1" />
              )}
            </button>
            
            <button
              onClick={nextTrack}
              className="p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            >
              <SkipForward className="w-6 h-6 text-white" />
            </button>
          </div>

          {/* Volume Control */}
          <div className="flex items-center justify-center space-x-4 mb-6">
            <Volume2 className="w-5 h-5 text-gray-400" />
            <input
              type="range"
              min="0"
              max="100"
              value={volume}
              onChange={(e) => setVolume(e.target.value)}
              className="w-32 h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
            />
            <span className="text-sm text-gray-400 w-8">{volume}%</span>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-center space-x-4">
            <button className="flex items-center space-x-2 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors">
              <Heart className="w-5 h-5 text-red-400" />
              <span className="text-white text-sm">Like</span>
            </button>
            <button className="flex items-center space-x-2 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors">
              <Share2 className="w-5 h-5 text-blue-400" />
              <span className="text-white text-sm">Share</span>
            </button>
            <button className="flex items-center space-x-2 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors">
              <Download className="w-5 h-5 text-green-400" />
              <span className="text-white text-sm">Download</span>
            </button>
          </div>

          {/* Track List */}
          <div className="mt-8">
            <h4 className="text-lg font-semibold text-white mb-4">Demo Playlist</h4>
            <div className="space-y-2">
              {demoTracks.map((track, index) => (
                <div
                  key={track.id}
                  onClick={() => {
                    setCurrentTrack(index)
                    setProgress(0)
                    setIsPlaying(true)
                  }}
                  className={`flex items-center space-x-4 p-3 rounded-lg cursor-pointer transition-colors ${
                    index === currentTrack ? 'bg-white/20' : 'bg-white/5 hover:bg-white/10'
                  }`}
                >
                  <img
                    src={track.cover}
                    alt={track.album}
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <p className="text-white font-medium">{track.title}</p>
                    <p className="text-gray-400 text-sm">{track.artist}</p>
                  </div>
                  <span className="text-gray-400 text-sm">{track.duration}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          height: 16px;
          width: 16px;
          border-radius: 50%;
          background: linear-gradient(to right, #3b82f6, #8b5cf6);
          cursor: pointer;
        }
        
        .slider::-moz-range-thumb {
          height: 16px;
          width: 16px;
          border-radius: 50%;
          background: linear-gradient(to right, #3b82f6, #8b5cf6);
          cursor: pointer;
          border: none;
        }
      `}</style>
    </div>
  )
}

export default InteractiveMusicPlayer 