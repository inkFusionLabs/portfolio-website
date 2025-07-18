import React from 'react'
import { Search, Play, List, Share2, Zap, Shield, Smartphone, Music } from 'lucide-react'

const Features = () => {
  const features = [
    {
      icon: <Search className="w-8 h-8" />,
      title: "Universal Search",
      description: "Search across all your connected music services simultaneously. Find any track, album, or artist instantly.",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: <Play className="w-8 h-8" />,
      title: "Unified Playback",
      description: "Control music from all services in one interface. Seamlessly switch between platforms without interruption.",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: <List className="w-8 h-8" />,
      title: "Playlist Management",
      description: "View and manage playlists from all connected services. Create cross-platform playlists effortlessly.",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: <Share2 className="w-8 h-8" />,
      title: "Cross-Service Sharing",
      description: "Share music across different platforms. Send tracks between Spotify, Apple Music, and more.",
      color: "from-orange-500 to-red-500"
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Lightning Fast",
      description: "Built with Tauri for native performance. Instant startup and smooth playback across all platforms.",
      color: "from-yellow-500 to-orange-500"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Privacy First",
      description: "Your music data stays on your device. No cloud storage, no tracking, just pure music enjoyment.",
      color: "from-indigo-500 to-purple-500"
    }
  ]

  const services = [
    { name: "Spotify", color: "#1DB954", icon: "🎵" },
    { name: "Apple Music", color: "#FA243C", icon: "🍎" },
    { name: "YouTube Music", color: "#FF0000", icon: "▶️" },
    { name: "Tidal", color: "#000000", icon: "🌊" },
    { name: "Deezer", color: "#00C7F2", icon: "🎧" },
    { name: "Amazon Music", color: "#FF9900", icon: "📦" }
  ]

  return (
    <section id="features" className="py-20 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Everything You Need in
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"> One Place</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            OmniFusion Music brings together all your favorite streaming services 
            with powerful features designed for music lovers.
          </p>
        </div>

        {/* Supported Services */}
        <div className="mb-20">
          <h3 className="text-2xl font-bold text-white text-center mb-8">Supported Services</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {services.map((service, index) => (
              <div key={index} className="feature-card text-center group">
                <div className="text-4xl mb-3">{service.icon}</div>
                <h4 className="font-semibold text-white group-hover:text-blue-400 transition-colors">
                  {service.name}
                </h4>
                <div 
                  className="w-8 h-1 mx-auto mt-2 rounded-full transition-all duration-300 group-hover:w-12"
                  style={{ backgroundColor: service.color }}
                ></div>
              </div>
            ))}
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="feature-card group">
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${feature.color} flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform duration-300`}>
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-4">{feature.title}</h3>
              <p className="text-gray-300 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Platform Support */}
        <div className="mt-20 text-center">
          <h3 className="text-2xl font-bold text-white mb-8">Available on All Major Platforms</h3>
          <div className="flex flex-wrap justify-center items-center gap-8">
            <div className="feature-card px-8 py-6">
              <Smartphone className="w-12 h-12 text-blue-400 mx-auto mb-4" />
              <h4 className="font-semibold text-white">Windows</h4>
              <p className="text-gray-300 text-sm">Windows 10 & 11</p>
            </div>
            <div className="feature-card px-8 py-6">
              <Smartphone className="w-12 h-12 text-blue-400 mx-auto mb-4" />
              <h4 className="font-semibold text-white">macOS</h4>
              <p className="text-gray-300 text-sm">macOS 10.15+</p>
            </div>
            <div className="feature-card px-8 py-6">
              <Smartphone className="w-12 h-12 text-blue-400 mx-auto mb-4" />
              <h4 className="font-semibold text-white">Linux</h4>
              <p className="text-gray-300 text-sm">Ubuntu, Fedora, Arch</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Features 