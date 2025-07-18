import React from 'react'
import { Download, Play, Music, Zap, Globe } from 'lucide-react'

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 hero-gradient opacity-90"></div>
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-pink-500/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '4s' }}></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center px-4 py-2 glass rounded-full mb-8">
            <Zap className="w-4 h-4 text-yellow-400 mr-2" />
            <span className="text-sm font-medium">Universal Music Command Center</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            All Your Music.
            <br />
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              One App.
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-3xl mx-auto">
            Connect Spotify, Apple Music, YouTube Music, Tidal, Deezer, and Amazon Music 
            in one beautiful desktop application. Your universal music command center.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <button className="btn-primary flex items-center space-x-2">
              <Download className="w-5 h-5" />
              <span>Download for Free</span>
            </button>
            <button className="btn-secondary flex items-center space-x-2">
              <Play className="w-5 h-5" />
              <span>Watch Demo</span>
            </button>
          </div>

          {/* Platform Support */}
          <div className="flex flex-wrap justify-center items-center gap-6 text-gray-300">
            <div className="flex items-center space-x-2">
              <Globe className="w-5 h-5" />
              <span>Windows</span>
            </div>
            <div className="flex items-center space-x-2">
              <Globe className="w-5 h-5" />
              <span>macOS</span>
            </div>
            <div className="flex items-center space-x-2">
              <Globe className="w-5 h-5" />
              <span>Linux</span>
            </div>
          </div>
        </div>
      </div>

      {/* App Preview Mockup */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2">
        <div className="relative">
          <div className="w-80 h-48 glass rounded-2xl p-4 animate-pulse-glow">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <Music className="w-5 h-5 text-blue-400" />
                <span className="text-sm font-medium">Now Playing</span>
              </div>
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="h-2 bg-white/20 rounded"></div>
              <div className="h-2 bg-white/20 rounded w-3/4"></div>
              <div className="h-2 bg-white/20 rounded w-1/2"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero 