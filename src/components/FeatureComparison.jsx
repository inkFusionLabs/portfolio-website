import React, { useState } from 'react';

const FeatureComparison = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Features' },
    { id: 'core', name: 'Core Features' },
    { id: 'integration', name: 'Service Integration' },
    { id: 'ui', name: 'User Interface' },
    { id: 'performance', name: 'Performance' }
  ];

  const features = [
    {
      name: 'Multi-Service Support',
      category: 'integration',
      omniFusion: { status: 'yes', details: 'Spotify, Apple Music, YouTube Music, Tidal' },
      spotify: { status: 'no', details: 'Spotify only' },
      appleMusic: { status: 'no', details: 'Apple Music only' },
      youtubeMusic: { status: 'no', details: 'YouTube Music only' }
    },
    {
      name: 'Cross-Platform Desktop App',
      category: 'core',
      omniFusion: { status: 'yes', details: 'Windows, macOS, Linux' },
      spotify: { status: 'yes', details: 'Windows, macOS, Linux' },
      appleMusic: { status: 'no', details: 'macOS only' },
      youtubeMusic: { status: 'no', details: 'Web browser only' }
    },
    {
      name: 'Unified Playlist Management',
      category: 'core',
      omniFusion: { status: 'yes', details: 'Sync across all services' },
      spotify: { status: 'no', details: 'Spotify playlists only' },
      appleMusic: { status: 'no', details: 'Apple Music playlists only' },
      youtubeMusic: { status: 'no', details: 'YouTube Music playlists only' }
    },
    {
      name: 'Smart Recommendations',
      category: 'core',
      omniFusion: { status: 'yes', details: 'AI-powered across all services' },
      spotify: { status: 'yes', details: 'Spotify algorithm only' },
      appleMusic: { status: 'yes', details: 'Apple algorithm only' },
      youtubeMusic: { status: 'yes', details: 'YouTube algorithm only' }
    },
    {
      name: 'Offline Listening',
      category: 'core',
      omniFusion: { status: 'yes', details: 'Download from any service' },
      spotify: { status: 'yes', details: 'Premium only' },
      appleMusic: { status: 'yes', details: 'Apple Music only' },
      youtubeMusic: { status: 'yes', details: 'Premium only' }
    },
    {
      name: 'Customizable Themes',
      category: 'ui',
      omniFusion: { status: 'yes', details: 'Multiple themes available' },
      spotify: { status: 'limited', details: 'Dark/Light mode only' },
      appleMusic: { status: 'no', details: 'System theme only' },
      youtubeMusic: { status: 'limited', details: 'Dark/Light mode only' }
    },
    {
      name: 'Native Desktop Performance',
      category: 'performance',
      omniFusion: { status: 'yes', details: 'Built with Tauri for speed' },
      spotify: { status: 'yes', details: 'Electron-based' },
      appleMusic: { status: 'yes', details: 'Native macOS app' },
      youtubeMusic: { status: 'no', details: 'Web-based, slower' }
    },
    {
      name: 'Free to Use',
      category: 'core',
      omniFusion: { status: 'yes', details: 'Completely free' },
      spotify: { status: 'limited', details: 'Free with ads' },
      appleMusic: { status: 'no', details: 'Paid subscription required' },
      youtubeMusic: { status: 'limited', details: 'Free with ads' }
    },
    {
      name: 'Cross-Service Search',
      category: 'core',
      omniFusion: { status: 'yes', details: 'Search all services at once' },
      spotify: { status: 'no', details: 'Spotify catalog only' },
      appleMusic: { status: 'no', details: 'Apple Music catalog only' },
      youtubeMusic: { status: 'no', details: 'YouTube Music catalog only' }
    },
    {
      name: 'Advanced Audio Controls',
      category: 'core',
      omniFusion: { status: 'yes', details: 'Equalizer, crossfade, normalization' },
      spotify: { status: 'yes', details: 'Basic equalizer' },
      appleMusic: { status: 'yes', details: 'System audio controls' },
      youtubeMusic: { status: 'limited', details: 'Basic controls' }
    }
  ];

  const filteredFeatures = selectedCategory === 'all' 
    ? features 
    : features.filter(feature => feature.category === selectedCategory);

  const getStatusIcon = (status) => {
    switch (status) {
      case 'yes':
        return <span className="text-green-400">✓</span>;
      case 'no':
        return <span className="text-red-400">✗</span>;
      case 'limited':
        return <span className="text-yellow-400">~</span>;
      default:
        return <span className="text-gray-400">-</span>;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'yes':
        return 'text-green-400';
      case 'no':
        return 'text-red-400';
      case 'limited':
        return 'text-yellow-400';
      default:
        return 'text-gray-400';
    }
  };

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
            How
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
              OmniFusion Music
            </span>
            Compares
          </h2>
          <p className="text-lg text-white/70 max-w-2xl mx-auto">
            See how our universal music platform stacks up against the competition.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 ${
                selectedCategory === category.id
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                  : 'bg-white/5 backdrop-blur-md text-white/70 hover:text-white border border-white/10'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Comparison Table */}
        <div className="overflow-x-auto">
          <div className="min-w-full bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 overflow-hidden">
            {/* Table Header */}
            <div className="grid grid-cols-5 gap-4 p-6 border-b border-white/10">
              <div className="font-bold text-white text-lg">Features</div>
              <div className="text-center">
                <div className="font-bold text-white mb-2">OmniFusion Music</div>
                <div className="text-xs text-white/60">Universal Platform</div>
              </div>
              <div className="text-center">
                <div className="font-bold text-white mb-2">Spotify</div>
                <div className="text-xs text-white/60">Single Service</div>
              </div>
              <div className="text-center">
                <div className="font-bold text-white mb-2">Apple Music</div>
                <div className="text-xs text-white/60">Apple Ecosystem</div>
              </div>
              <div className="text-center">
                <div className="font-bold text-white mb-2">YouTube Music</div>
                <div className="text-xs text-white/60">Web-Based</div>
              </div>
            </div>

            {/* Table Body */}
            <div className="divide-y divide-white/10">
              {filteredFeatures.map((feature, index) => (
                <div key={index} className="grid grid-cols-5 gap-4 p-6 hover:bg-white/5 transition-colors">
                  <div className="font-semibold text-white">{feature.name}</div>
                  
                  <div className="text-center">
                    <div className="flex items-center justify-center mb-2">
                      {getStatusIcon(feature.omniFusion.status)}
                    </div>
                    <div className={`text-xs ${getStatusColor(feature.omniFusion.status)}`}>
                      {feature.omniFusion.details}
                    </div>
                  </div>
                  
                  <div className="text-center">
                    <div className="flex items-center justify-center mb-2">
                      {getStatusIcon(feature.spotify.status)}
                    </div>
                    <div className={`text-xs ${getStatusColor(feature.spotify.status)}`}>
                      {feature.spotify.details}
                    </div>
                  </div>
                  
                  <div className="text-center">
                    <div className="flex items-center justify-center mb-2">
                      {getStatusIcon(feature.appleMusic.status)}
                    </div>
                    <div className={`text-xs ${getStatusColor(feature.appleMusic.status)}`}>
                      {feature.appleMusic.details}
                    </div>
                  </div>
                  
                  <div className="text-center">
                    <div className="flex items-center justify-center mb-2">
                      {getStatusIcon(feature.youtubeMusic.status)}
                    </div>
                    <div className={`text-xs ${getStatusColor(feature.youtubeMusic.status)}`}>
                      {feature.youtubeMusic.details}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 backdrop-blur-md rounded-2xl p-6 border border-white/10">
            <h3 className="text-xl md:text-2xl font-bold text-white mb-3">
              Ready to Experience the Difference?
            </h3>
            <p className="text-white/70 mb-6 max-w-xl mx-auto">
              Join thousands of users who have discovered the ultimate music streaming experience.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-full text-base transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/25">
                Download OmniFusion Music
              </button>
              <button className="px-6 py-3 bg-white/10 backdrop-blur-md text-white font-semibold rounded-full text-base border border-white/20 transition-all duration-300 hover:bg-white/20 hover:border-white/40">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeatureComparison; 