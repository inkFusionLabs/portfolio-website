import React, { useState, useEffect } from 'react'
import { Play, Pause, SkipForward, SkipBack, Volume2, Heart, Share2, List, Search, Home, Settings, ChevronLeft, ChevronRight, X, Maximize2, Minimize2 } from 'lucide-react'

const InteractiveDemo = () => {
  const [currentView, setCurrentView] = useState('main')
  const [isPlaying, setIsPlaying] = useState(true)
  const [currentTrack, setCurrentTrack] = useState(0)
  const [showTour, setShowTour] = useState(false)
  const [tourStep, setTourStep] = useState(0)
  const [isFullscreen, setIsFullscreen] = useState(false)

  const tracks = [
    { title: "Bohemian Rhapsody", artist: "Queen", service: "Spotify", duration: "5:55" },
    { title: "Hotel California", artist: "Eagles", service: "Apple Music", duration: "6:30" },
    { title: "Stairway to Heaven", artist: "Led Zeppelin", service: "YouTube Music", duration: "8:02" },
    { title: "Imagine", artist: "John Lennon", service: "Tidal", duration: "3:03" }
  ]

  const tourSteps = [
    {
      title: "Welcome to OmniFusion Music",
      description: "Your universal music command center. Let's explore the interface!",
      position: "center"
    },
    {
      title: "Multi-Service Integration",
      description: "See how we connect all your streaming services in one place",
      position: "top-left"
    },
    {
      title: "Universal Search",
      description: "Search across all platforms simultaneously",
      position: "top-center"
    },
    {
      title: "Unified Playlist",
      description: "Manage playlists from different services together",
      position: "bottom-left"
    },
    {
      title: "Cross-Platform Control",
      description: "Control playback across all connected services",
      position: "bottom-center"
    }
  ]

  const beforeAfterData = [
    {
      before: {
        title: "Multiple Apps",
        description: "Switching between 6 different music apps",
        time: "2-3 minutes",
        complexity: "High",
        features: ["Separate logins", "Different interfaces", "No cross-platform sync", "Fragmented experience"]
      },
      after: {
        title: "OmniFusion Music",
        description: "One unified interface for all services",
        time: "30 seconds",
        complexity: "Low",
        features: ["Single login", "Unified interface", "Cross-platform sync", "Seamless experience"]
      }
    }
  ]

  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        setCurrentTrack((prev) => (prev + 1) % tracks.length)
      }, 4000)
      return () => clearInterval(interval)
    }
  }, [isPlaying, tracks.length])

  const nextTrack = () => {
    setCurrentTrack((prev) => (prev + 1) % tracks.length)
  }

  const prevTrack = () => {
    setCurrentTrack((prev) => (prev - 1 + tracks.length) % tracks.length)
  }

  const nextTourStep = () => {
    if (tourStep < tourSteps.length - 1) {
      setTourStep(tourStep + 1)
    } else {
      setShowTour(false)
      setTourStep(0)
    }
  }

  const prevTourStep = () => {
    if (tourStep > 0) {
      setTourStep(tourStep - 1)
    }
  }

  return (
    <section id="demo" className="py-20 bg-gray-900 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl floating-element"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl floating-element-delayed"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 glass rounded-full mb-6">
            <Play className="w-4 h-4 text-green-400 mr-2" />
            <span className="text-sm font-medium">Interactive Demo</span>
          </div>
          <h2 className="text-5xl md:text-6xl font-black text-white mb-8">
            See OmniFusion Music
            <span className="gradient-text"> in Action</span>
          </h2>
          <p className="text-xl md:text-2xl text-gray-200 max-w-4xl mx-auto leading-relaxed">
            Experience the power of unified music streaming with our interactive demo
          </p>
        </div>

        {/* Demo Controls */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <button
            onClick={() => setCurrentView('main')}
            className={`px-6 py-3 rounded-full transition-all duration-300 ${
              currentView === 'main' ? 'btn-primary' : 'btn-secondary'
            }`}
          >
            App Interface
          </button>
          <button
            onClick={() => setCurrentView('before-after')}
            className={`px-6 py-3 rounded-full transition-all duration-300 ${
              currentView === 'before-after' ? 'btn-primary' : 'btn-secondary'
            }`}
          >
            Before & After
          </button>
          <button
            onClick={() => setShowTour(true)}
            className="btn-primary px-6 py-3 rounded-full transition-all duration-300"
          >
            Interactive Tour
          </button>
        </div>

        {/* Main Demo Interface */}
        {currentView === 'main' && (
          <div className="max-w-6xl mx-auto">
            <div className="glass rounded-3xl p-8 mb-8">
              {/* App Header */}
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                    <Play className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white">OmniFusion Music</h3>
                    <p className="text-gray-400">Universal Music Command Center</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <button className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors">
                    <Search className="w-5 h-5 text-white" />
                  </button>
                  <button className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors">
                    <Settings className="w-5 h-5 text-white" />
                  </button>
                  <button 
                    onClick={() => setIsFullscreen(!isFullscreen)}
                    className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
                  >
                    {isFullscreen ? <Minimize2 className="w-5 h-5 text-white" /> : <Maximize2 className="w-5 h-5 text-white" />}
                  </button>
                </div>
              </div>

              {/* Main Content Area */}
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                {/* Sidebar */}
                <div className="lg:col-span-1 space-y-4">
                  <div className="glass p-4 rounded-2xl">
                    <h4 className="text-lg font-semibold text-white mb-4">Services</h4>
                    <div className="space-y-3">
                      {['Spotify', 'Apple Music', 'YouTube Music', 'Tidal', 'Deezer', 'Amazon Music'].map((service, index) => (
                        <div key={service} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-white/10 transition-colors cursor-pointer">
                          <div className={`w-3 h-3 rounded-full ${index === 0 ? 'bg-green-400' : 'bg-blue-400'}`}></div>
                          <span className="text-gray-200">{service}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="glass p-4 rounded-2xl">
                    <h4 className="text-lg font-semibold text-white mb-4">Quick Actions</h4>
                    <div className="space-y-2">
                      <button className="w-full text-left p-2 rounded-lg hover:bg-white/10 transition-colors text-gray-200">
                        <Home className="w-4 h-4 inline mr-2" />
                        Home
                      </button>
                      <button className="w-full text-left p-2 rounded-lg hover:bg-white/10 transition-colors text-gray-200">
                        <Search className="w-4 h-4 inline mr-2" />
                        Search
                      </button>
                      <button className="w-full text-left p-2 rounded-lg hover:bg-white/10 transition-colors text-gray-200">
                        <List className="w-4 h-4 inline mr-2" />
                        Playlists
                      </button>
                    </div>
                  </div>
                </div>

                {/* Main Content */}
                <div className="lg:col-span-3">
                  <div className="glass p-6 rounded-2xl mb-6">
                    <h4 className="text-xl font-semibold text-white mb-4">Now Playing</h4>
                    <div className="flex items-center space-x-6">
                      <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center">
                        <Play className="w-8 h-8 text-white" />
                      </div>
                      <div className="flex-1">
                        <h5 className="text-lg font-semibold text-white">{tracks[currentTrack].title}</h5>
                        <p className="text-gray-400">{tracks[currentTrack].artist}</p>
                        <div className="flex items-center space-x-2 mt-2">
                          <span className="text-sm text-gray-500">{tracks[currentTrack].service}</span>
                          <span className="text-sm text-gray-500">•</span>
                          <span className="text-sm text-gray-500">{tracks[currentTrack].duration}</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <button onClick={prevTrack} className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors">
                          <SkipBack className="w-5 h-5 text-white" />
                        </button>
                        <button 
                          onClick={() => setIsPlaying(!isPlaying)}
                          className="p-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 transition-all duration-300"
                        >
                          {isPlaying ? <Pause className="w-6 h-6 text-white" /> : <Play className="w-6 h-6 text-white" />}
                        </button>
                        <button onClick={nextTrack} className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors">
                          <SkipForward className="w-5 h-5 text-white" />
                        </button>
                      </div>
                    </div>
                    
                    {/* Progress Bar */}
                    <div className="mt-6">
                      <div className="w-full bg-white/10 rounded-full h-2">
                        <div className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-1000" style={{ width: '45%' }}></div>
                      </div>
                      <div className="flex justify-between text-sm text-gray-400 mt-2">
                        <span>2:15</span>
                        <span>{tracks[currentTrack].duration}</span>
                      </div>
                    </div>
                  </div>

                  {/* Queue */}
                  <div className="glass p-6 rounded-2xl">
                    <h4 className="text-xl font-semibold text-white mb-4">Queue</h4>
                    <div className="space-y-3">
                      {tracks.map((track, index) => (
                        <div 
                          key={index}
                          className={`flex items-center space-x-4 p-3 rounded-lg transition-all duration-300 cursor-pointer ${
                            index === currentTrack ? 'bg-white/20' : 'hover:bg-white/10'
                          }`}
                          onClick={() => setCurrentTrack(index)}
                        >
                          <div className="w-10 h-10 bg-gradient-to-r from-gray-600 to-gray-700 rounded-lg flex items-center justify-center">
                            <Play className="w-4 h-4 text-white" />
                          </div>
                          <div className="flex-1">
                            <p className="text-white font-medium">{track.title}</p>
                            <p className="text-gray-400 text-sm">{track.artist}</p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className="text-xs text-gray-500 bg-white/10 px-2 py-1 rounded">{track.service}</span>
                            <span className="text-gray-400 text-sm">{track.duration}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Before & After Comparison */}
        {currentView === 'before-after' && (
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {beforeAfterData.map((comparison, index) => (
                <React.Fragment key={index}>
                  {/* Before */}
                  <div className="glass p-8 rounded-3xl">
                    <div className="text-center mb-6">
                      <div className="inline-flex items-center px-4 py-2 bg-red-500/20 rounded-full mb-4">
                        <X className="w-4 h-4 text-red-400 mr-2" />
                        <span className="text-sm font-medium text-red-400">Before</span>
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-2">{comparison.before.title}</h3>
                      <p className="text-gray-300">{comparison.before.description}</p>
                    </div>
                    
                    <div className="space-y-6">
                      <div className="flex items-center justify-between p-4 bg-red-500/10 rounded-2xl">
                        <span className="text-gray-200">Time to switch apps:</span>
                        <span className="text-red-400 font-bold">{comparison.before.time}</span>
                      </div>
                      <div className="flex items-center justify-between p-4 bg-red-500/10 rounded-2xl">
                        <span className="text-gray-200">Complexity:</span>
                        <span className="text-red-400 font-bold">{comparison.before.complexity}</span>
                      </div>
                      
                      <div>
                        <h4 className="text-lg font-semibold text-white mb-3">Pain Points:</h4>
                        <ul className="space-y-2">
                          {comparison.before.features.map((feature, idx) => (
                            <li key={idx} className="flex items-center space-x-2 text-gray-300">
                              <X className="w-4 h-4 text-red-400" />
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* After */}
                  <div className="glass p-8 rounded-3xl">
                    <div className="text-center mb-6">
                      <div className="inline-flex items-center px-4 py-2 bg-green-500/20 rounded-full mb-4">
                        <Play className="w-4 h-4 text-green-400 mr-2" />
                        <span className="text-sm font-medium text-green-400">After</span>
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-2">{comparison.after.title}</h3>
                      <p className="text-gray-300">{comparison.after.description}</p>
                    </div>
                    
                    <div className="space-y-6">
                      <div className="flex items-center justify-between p-4 bg-green-500/10 rounded-2xl">
                        <span className="text-gray-200">Time to switch apps:</span>
                        <span className="text-green-400 font-bold">{comparison.after.time}</span>
                      </div>
                      <div className="flex items-center justify-between p-4 bg-green-500/10 rounded-2xl">
                        <span className="text-gray-200">Complexity:</span>
                        <span className="text-green-400 font-bold">{comparison.after.complexity}</span>
                      </div>
                      
                      <div>
                        <h4 className="text-lg font-semibold text-white mb-3">Benefits:</h4>
                        <ul className="space-y-2">
                          {comparison.after.features.map((feature, idx) => (
                            <li key={idx} className="flex items-center space-x-2 text-gray-300">
                              <div className="w-4 h-4 bg-green-400 rounded-full flex items-center justify-center">
                                <div className="w-2 h-2 bg-white rounded-full"></div>
                              </div>
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </React.Fragment>
              ))}
            </div>
          </div>
        )}

        {/* Interactive Tour Overlay */}
        {showTour && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center">
            <div className="glass p-8 rounded-3xl max-w-2xl mx-4 relative">
              <button 
                onClick={() => setShowTour(false)}
                className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
              >
                <X className="w-5 h-5 text-white" />
              </button>
              
              <div className="text-center mb-8">
                <h3 className="text-3xl font-bold text-white mb-4">{tourSteps[tourStep].title}</h3>
                <p className="text-xl text-gray-200">{tourSteps[tourStep].description}</p>
              </div>
              
              <div className="flex justify-between items-center">
                <button 
                  onClick={prevTourStep}
                  disabled={tourStep === 0}
                  className={`px-6 py-3 rounded-full transition-all duration-300 ${
                    tourStep === 0 ? 'opacity-50 cursor-not-allowed' : 'btn-secondary'
                  }`}
                >
                  <ChevronLeft className="w-5 h-5" />
                  Previous
                </button>
                
                <div className="flex space-x-2">
                  {tourSteps.map((_, index) => (
                    <div 
                      key={index}
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${
                        index === tourStep ? 'bg-blue-500' : 'bg-white/30'
                      }`}
                    ></div>
                  ))}
                </div>
                
                <button 
                  onClick={nextTourStep}
                  className="btn-primary px-6 py-3 rounded-full transition-all duration-300"
                >
                  {tourStep === tourSteps.length - 1 ? 'Finish' : 'Next'}
                  <ChevronRight className="w-5 h-5 ml-2" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

export default InteractiveDemo 