import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Play, Pause, SkipBack, SkipForward, Volume2, Search, Heart, Share2, Download, Music, Smartphone, Globe, Brain } from 'lucide-react';

const Demo: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTab, setCurrentTab] = useState('main');

  const mockTracks = [
    { id: 1, title: "Blinding Lights", artist: "The Weeknd", album: "After Hours", duration: "3:20", service: "spotify" },
    { id: 2, title: "Levitating", artist: "Dua Lipa", album: "Future Nostalgia", duration: "3:23", service: "apple" },
    { id: 3, title: "Watermelon Sugar", artist: "Harry Styles", album: "Fine Line", duration: "2:54", service: "youtube" },
    { id: 4, title: "Dance Monkey", artist: "Tones and I", album: "The Kids Are Coming", duration: "3:29", service: "spotify" },
    { id: 5, title: "Circles", artist: "Post Malone", album: "Hollywood's Bleeding", duration: "3:35", service: "apple" }
  ];

  const getServiceIcon = (service: string) => {
    switch (service) {
      case "spotify":
        return <div className="w-4 h-4 bg-green-500 rounded-full"></div>;
      case "apple":
        return <div className="w-4 h-4 bg-pink-500 rounded-full"></div>;
      case "youtube":
        return <div className="w-4 h-4 bg-red-500 rounded-full"></div>;
      default:
        return <div className="w-4 h-4 bg-gray-500 rounded-full"></div>;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-black/20 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center space-x-2 text-white hover:text-gray-300 transition-colors">
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Home</span>
            </Link>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Music className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white">OmniFusion</span>
            </div>
          </div>
        </div>
      </nav>

      {/* Header */}
      <section className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Interactive
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
              Demo
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Experience the future of music streaming. See how OmniFusion brings all your music services together 
            in one beautiful, intelligent interface.
          </p>
        </div>
      </section>

      {/* Demo Interface */}
      <section className="pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* App Mockup */}
            <div className="relative">
              <div className="bg-gray-800 rounded-2xl p-6 shadow-2xl border border-white/10 backdrop-blur-md">
                {/* App Header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
                      <Music className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-white font-semibold">OmniFusion</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button className="p-2 text-gray-400 hover:text-white transition-colors">
                      <Search className="w-5 h-5" />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-white transition-colors">
                      <Heart className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {/* Navigation Tabs */}
                <div className="flex space-x-1 mb-6 bg-gray-700 rounded-lg p-1">
                  <button 
                    onClick={() => setCurrentTab('main')}
                    className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                      currentTab === 'main' 
                        ? 'bg-indigo-500 text-white' 
                        : 'text-gray-300 hover:text-white'
                    }`}
                  >
                    Library
                  </button>
                  <button 
                    onClick={() => setCurrentTab('search')}
                    className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                      currentTab === 'search' 
                        ? 'bg-indigo-500 text-white' 
                        : 'text-gray-300 hover:text-white'
                    }`}
                  >
                    Search
                  </button>
                  <button 
                    onClick={() => setCurrentTab('playlists')}
                    className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                      currentTab === 'playlists' 
                        ? 'bg-indigo-500 text-white' 
                        : 'text-gray-300 hover:text-white'
                    }`}
                  >
                    Playlists
                  </button>
                </div>

                {/* Content Area */}
                <div className="space-y-3">
                  {mockTracks.map((track) => (
                    <div key={track.id} className="flex items-center space-x-3 p-3 bg-gray-700/50 rounded-lg hover:bg-gray-700 transition-colors cursor-pointer">
                      <div className="flex items-center space-x-2 flex-1">
                        {getServiceIcon(track.service)}
                        <div className="flex-1">
                          <div className="text-white font-medium">{track.title}</div>
                          <div className="text-gray-400 text-sm">{track.artist} • {track.album}</div>
                        </div>
                      </div>
                      <div className="text-gray-400 text-sm">{track.duration}</div>
                      <button className="p-2 text-gray-400 hover:text-white transition-colors">
                        <Play className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>

                {/* Player Controls */}
                <div className="mt-6 p-4 bg-gray-700/50 rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
                        <Music className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <div className="text-white font-medium">Blinding Lights</div>
                        <div className="text-gray-400 text-sm">The Weeknd</div>
                      </div>
                    </div>
                    <button className="p-2 text-gray-400 hover:text-white transition-colors">
                      <Heart className="w-5 h-5" />
                    </button>
                  </div>
                  
                  <div className="flex items-center justify-center space-x-4">
                    <button className="p-2 text-gray-400 hover:text-white transition-colors">
                      <SkipBack className="w-5 h-5" />
                    </button>
                    <button 
                      onClick={() => setIsPlaying(!isPlaying)}
                      className="p-3 bg-indigo-500 rounded-full text-white hover:bg-indigo-600 transition-colors"
                    >
                      {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
                    </button>
                    <button className="p-2 text-gray-400 hover:text-white transition-colors">
                      <SkipForward className="w-5 h-5" />
                    </button>
                  </div>
                  
                  <div className="flex items-center space-x-3 mt-3">
                    <Volume2 className="w-4 h-4 text-gray-400" />
                    <div className="flex-1 bg-gray-600 rounded-full h-1">
                      <div className="bg-indigo-500 h-1 rounded-full w-3/4"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Feature Highlights */}
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold text-white mb-6">Key Features</h2>
                <div className="space-y-4">
                  <div className="flex items-start space-x-4 p-4 bg-white/5 backdrop-blur-md rounded-xl border border-white/10">
                    <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Globe className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-2">Universal Music Access</h3>
                      <p className="text-gray-400">Connect Spotify, Apple Music, YouTube Music, and more. All your music in one place with seamless switching between services.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4 p-4 bg-white/5 backdrop-blur-md rounded-xl border border-white/10">
                    <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Search className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-2">Smart Search</h3>
                      <p className="text-gray-400">Search across all your music services simultaneously. Find any song, artist, or album instantly.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4 p-4 bg-white/5 backdrop-blur-md rounded-xl border border-white/10">
                    <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Brain className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-2">AI Recommendations</h3>
                      <p className="text-gray-400">Get intelligent music recommendations based on your listening habits across all services.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4 p-4 bg-white/5 backdrop-blur-md rounded-xl border border-white/10">
                    <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Smartphone className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-2">Cross-Platform Sync</h3>
                      <p className="text-gray-400">Your playlists and preferences sync seamlessly across Windows, macOS, and Linux.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Call to Action */}
              <div className="p-6 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-xl border border-indigo-500/30">
                <h3 className="text-xl font-semibold text-white mb-3">Ready to Experience the Future?</h3>
                <p className="text-gray-300 mb-4">Join the waitlist and be among the first to experience unified music streaming.</p>
                <button className="w-full py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold rounded-lg hover:shadow-lg transform hover:scale-105 transition-all duration-200">
                  Get Early Access
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black/20 backdrop-blur-md border-t border-white/10 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="w-6 h-6 bg-gradient-to-r from-indigo-500 to-purple-600 rounded flex items-center justify-center">
                <Music className="w-4 h-4 text-white" />
              </div>
              <span className="text-white font-semibold">OmniFusion Music</span>
            </div>
            <div className="flex space-x-6 text-sm text-gray-400">
              <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
              <Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
              <Link to="/roadmap" className="hover:text-white transition-colors">Roadmap</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Demo; 