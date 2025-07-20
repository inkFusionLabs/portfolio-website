import React from 'react';
import { Download, Play, Zap } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 opacity-20"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Badge */}
        <div className="inline-flex items-center px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-sm font-medium mb-8">
          <Zap className="w-4 h-4 mr-2" />
          Universal Music Command Center
        </div>

        {/* Main Headline */}
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
          All Your Music.
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
            One Beautiful App.
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
          Connect Spotify, Apple Music, YouTube Music, and more in a single, 
          elegant desktop application. Smart search, playlist management, and 
          seamless playback across all your services.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
          <button className="group relative px-8 py-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 flex items-center">
            <Download className="w-5 h-5 mr-2" />
            Download for Free
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-700 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
          </button>
          
          <button className="px-8 py-4 border-2 border-gray-600 text-gray-300 font-semibold rounded-xl hover:border-indigo-500 hover:text-indigo-400 transition-all duration-200 flex items-center">
            <Play className="w-5 h-5 mr-2" />
            Watch Demo
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto">
          <div className="text-center">
            <div className="text-3xl font-bold text-white mb-2">3+</div>
            <div className="text-gray-400">Music Services</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-white mb-2">∞</div>
            <div className="text-gray-400">Playlists</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-white mb-2">100%</div>
            <div className="text-gray-400">Free</div>
          </div>
        </div>

        {/* Platform Badges */}
        <div className="mt-16 flex flex-wrap justify-center gap-4">
          <div className="flex items-center px-4 py-2 bg-white/10 rounded-lg text-white text-sm">
            <span className="mr-2">🪟</span>
            Windows
          </div>
          <div className="flex items-center px-4 py-2 bg-white/10 rounded-lg text-white text-sm">
            <span className="mr-2">🍎</span>
            macOS
          </div>
          <div className="flex items-center px-4 py-2 bg-white/10 rounded-lg text-white text-sm">
            <span className="mr-2">🐧</span>
            Linux
          </div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-indigo-500/20 rounded-full blur-xl animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-32 h-32 bg-purple-500/20 rounded-full blur-xl animate-pulse delay-1000"></div>
      <div className="absolute top-1/2 left-20 w-16 h-16 bg-blue-500/20 rounded-full blur-xl animate-pulse delay-500"></div>
    </section>
  );
};

export default Hero; 