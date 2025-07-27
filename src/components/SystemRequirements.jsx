import React, { useState } from 'react';

const SystemRequirements = () => {
  const [selectedPlatform, setSelectedPlatform] = useState('windows');

  const requirements = {
    windows: {
      os: 'Windows 10 (version 1903) or later',
      processor: 'Intel Core i3 or AMD equivalent',
      memory: '4 GB RAM minimum, 8 GB recommended',
      storage: '500 MB available space',
      graphics: 'DirectX 11 compatible graphics card',
      network: 'Broadband internet connection',
      additional: [
        'Microsoft Visual C++ Redistributable 2019',
        '.NET Framework 4.7.2 or later',
        'Windows Media Foundation'
      ]
    },
    macos: {
      os: 'macOS 10.15 (Catalina) or later',
      processor: 'Intel Core i3 or Apple M1/M2',
      memory: '4 GB RAM minimum, 8 GB recommended',
      storage: '500 MB available space',
      graphics: 'Metal-compatible graphics card',
      network: 'Broadband internet connection',
      additional: [
        'macOS Security & Privacy permissions',
        'Audio output device support',
        'iCloud integration (optional)'
      ]
    },
    linux: {
      os: 'Ubuntu 20.04+, Fedora 33+, or equivalent',
      processor: 'Intel Core i3 or AMD equivalent',
      memory: '4 GB RAM minimum, 8 GB recommended',
      storage: '500 MB available space',
      graphics: 'OpenGL 3.3 compatible graphics',
      network: 'Broadband internet connection',
      additional: [
        'PulseAudio or ALSA audio system',
        'GTK3 or Qt5 libraries',
        'libssl and libcrypto libraries'
      ]
    }
  };

  const features = [
    {
      icon: "🎵",
      title: "Music Streaming",
      description: "Stream from Spotify, Apple Music, YouTube Music, and more"
    },
    {
      icon: "💾",
      title: "Offline Playback",
      description: "Download and play music offline (with premium subscriptions)"
    },
    {
      icon: "📱",
      title: "Cross-Platform Sync",
      description: "Sync playlists and preferences across all your devices"
    },
    {
      icon: "🎨",
      title: "Custom Themes",
      description: "Personalize your interface with beautiful themes"
    },
    {
      icon: "🔍",
      title: "Advanced Search",
      description: "Search across all connected music services simultaneously"
    },
    {
      icon: "📊",
      title: "Analytics",
      description: "Track your listening habits and discover new music"
    }
  ];

  const performance = [
    {
      metric: "Startup Time",
      value: "< 3 seconds",
      description: "Fast application startup"
    },
    {
      metric: "Memory Usage",
      value: "~150 MB",
      description: "Efficient memory management"
    },
    {
      metric: "CPU Usage",
      value: "< 5%",
      description: "Minimal CPU impact during playback"
    },
    {
      metric: "Network",
      value: "128 kbps+",
      description: "Minimum bandwidth for streaming"
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-b from-gray-900 to-black relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            System
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
              Requirements
            </span>
          </h2>
          <p className="text-lg text-white/70 max-w-2xl mx-auto">
            Ensure your system meets the requirements for optimal OmniFusion Music performance.
          </p>
        </div>

        {/* Platform Selection */}
        <div className="flex justify-center mb-8">
          <div className="bg-white/5 backdrop-blur-md rounded-xl p-1 border border-white/10">
            {Object.keys(requirements).map((platform) => (
              <button
                key={platform}
                onClick={() => setSelectedPlatform(platform)}
                className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 capitalize ${
                  selectedPlatform === platform
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                    : 'text-white/70 hover:text-white'
                }`}
              >
                {platform === 'macos' ? 'macOS' : platform}
              </button>
            ))}
          </div>
        </div>

        {/* Requirements Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* System Requirements */}
          <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10">
            <h3 className="text-xl font-bold text-white mb-6 flex items-center">
              <span className="text-2xl mr-3">💻</span>
              System Requirements
            </h3>
            <div className="space-y-4">
              {Object.entries(requirements[selectedPlatform]).map(([key, value]) => (
                <div key={key} className="border-b border-white/10 pb-3 last:border-b-0">
                  <h4 className="text-white font-semibold capitalize mb-1">
                    {key === 'os' ? 'Operating System' : 
                     key === 'processor' ? 'Processor' :
                     key === 'memory' ? 'Memory (RAM)' :
                     key === 'storage' ? 'Storage' :
                     key === 'graphics' ? 'Graphics' :
                     key === 'network' ? 'Network' :
                     key === 'additional' ? 'Additional Requirements' : key}
                  </h4>
                  {Array.isArray(value) ? (
                    <ul className="text-white/70 text-sm space-y-1">
                      {value.map((item, index) => (
                        <li key={index} className="flex items-start">
                          <span className="text-purple-400 mr-2">•</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-white/70 text-sm">{value}</p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Performance Metrics */}
          <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10">
            <h3 className="text-xl font-bold text-white mb-6 flex items-center">
              <span className="text-2xl mr-3">⚡</span>
              Performance Metrics
            </h3>
            <div className="space-y-4">
              {performance.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                  <div>
                    <h4 className="text-white font-semibold text-sm">{item.metric}</h4>
                    <p className="text-white/60 text-xs">{item.description}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-purple-400 font-bold">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold text-white text-center mb-8">
            Supported Features
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div key={index} className="bg-white/5 backdrop-blur-md rounded-xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300">
                <div className="text-3xl mb-4">{feature.icon}</div>
                <h4 className="text-white font-semibold text-lg mb-2">{feature.title}</h4>
                <p className="text-white/70 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Download Section */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 backdrop-blur-md rounded-2xl p-6 border border-white/10">
            <h3 className="text-xl md:text-2xl font-bold text-white mb-3">
              Ready to Get Started?
            </h3>
            <p className="text-white/70 mb-6 max-w-xl mx-auto">
              Download OmniFusion Music for your platform and start enjoying universal music streaming today.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-full text-base transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/25">
                Download Now
              </button>
              <button className="px-6 py-3 bg-white/10 backdrop-blur-md text-white font-semibold rounded-full text-base border border-white/20 transition-all duration-300 hover:bg-white/20 hover:border-white/40">
                View Installation Guide
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SystemRequirements; 