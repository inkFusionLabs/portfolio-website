import React from 'react'
import { Download, Play, Music, Zap, Globe, Sparkles, Star } from 'lucide-react'

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Enhanced Background Gradient */}
      <div className="absolute inset-0 hero-gradient opacity-95"></div>
      
      {/* Enhanced Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-80 h-80 bg-blue-500/30 rounded-full blur-3xl floating-element"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/30 rounded-full blur-3xl floating-element-delayed"></div>
        <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-pink-500/25 rounded-full blur-3xl floating-element-delayed-2"></div>
        <div className="absolute bottom-1/3 left-1/4 w-72 h-72 bg-cyan-500/20 rounded-full blur-3xl floating-element"></div>
        
        {/* Floating particles */}
        <div className="absolute top-1/4 left-1/3 w-2 h-2 bg-white/60 rounded-full floating-element"></div>
        <div className="absolute top-3/4 right-1/3 w-1 h-1 bg-white/40 rounded-full floating-element-delayed"></div>
        <div className="absolute top-1/2 left-1/6 w-1.5 h-1.5 bg-white/50 rounded-full floating-element-delayed-2"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-5xl mx-auto">
          {/* Enhanced Badge */}
          <div className="inline-flex items-center px-6 py-3 glass rounded-full mb-12 group hover:scale-105 transition-transform duration-300">
            <Sparkles className="w-5 h-5 text-yellow-400 mr-3 group-hover:rotate-180 transition-transform duration-500" />
            <span className="text-sm font-semibold gradient-text">Universal Music Command Center</span>
            <Star className="w-4 h-4 text-pink-400 ml-2 group-hover:scale-125 transition-transform duration-300" />
          </div>

          {/* Enhanced Main Heading */}
          <h1 className="text-6xl md:text-8xl font-black text-white mb-8 leading-tight">
            All Your Music.
            <br />
            <span className="gradient-text">
              One App.
            </span>
          </h1>

          {/* Enhanced Subtitle */}
          <p className="text-xl md:text-3xl text-gray-100 mb-12 max-w-4xl mx-auto leading-relaxed">
            Connect <span className="gradient-text font-semibold">Spotify</span>, <span className="gradient-text font-semibold">Apple Music</span>, <span className="gradient-text font-semibold">YouTube Music</span>, <span className="gradient-text font-semibold">Tidal</span>, <span className="gradient-text font-semibold">Deezer</span>, and <span className="gradient-text font-semibold">Amazon Music</span> 
            <br />in one beautiful desktop application.
          </p>

          {/* Enhanced CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
            <button className="btn-primary flex items-center space-x-3 group">
              <Download className="w-6 h-6 group-hover:animate-bounce" />
              <span className="text-lg">Download for Free</span>
              <Sparkles className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>
            <button className="btn-secondary flex items-center space-x-3 group">
              <Play className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" />
              <span className="text-lg">Watch Demo</span>
            </button>
          </div>

          {/* Enhanced Platform Support */}
          <div className="flex flex-wrap justify-center items-center gap-8 text-gray-200">
            <div className="flex items-center space-x-3 glass px-4 py-2 rounded-full hover:scale-105 transition-transform duration-300">
              <Globe className="w-5 h-5 text-blue-400" />
              <span className="font-medium">Windows</span>
            </div>
            <div className="flex items-center space-x-3 glass px-4 py-2 rounded-full hover:scale-105 transition-transform duration-300">
              <Globe className="w-5 h-5 text-purple-400" />
              <span className="font-medium">macOS</span>
            </div>
            <div className="flex items-center space-x-3 glass px-4 py-2 rounded-full hover:scale-105 transition-transform duration-300">
              <Globe className="w-5 h-5 text-pink-400" />
              <span className="font-medium">Linux</span>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced App Preview Mockup */}
      <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2">
        <div className="relative group">
          <div className="w-96 h-56 glass rounded-3xl p-6 animate-pulse-glow group-hover:scale-105 transition-transform duration-500">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <Music className="w-4 h-4 text-white" />
                </div>
                <span className="text-sm font-semibold gradient-text">Now Playing</span>
              </div>
              <div className="flex space-x-2">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                <div className="w-3 h-3 bg-blue-400 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                <div className="w-3 h-3 bg-purple-400 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
              </div>
            </div>
            <div className="space-y-3">
              <div className="h-3 bg-white/20 rounded-full shimmer"></div>
              <div className="h-3 bg-white/20 rounded-full w-4/5 shimmer" style={{ animationDelay: '0.5s' }}></div>
              <div className="h-3 bg-white/20 rounded-full w-3/5 shimmer" style={{ animationDelay: '1s' }}></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero 