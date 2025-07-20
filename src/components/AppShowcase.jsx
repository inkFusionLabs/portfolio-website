import React, { useState } from 'react';
import ComingSoon from './ComingSoon';

const AppShowcase = () => {
  const [activeFeature, setActiveFeature] = useState(0);

  const features = [
    {
      icon: '🎵',
      title: 'Universal Music Hub',
      description: 'Access Spotify, Apple Music, YouTube Music, and more from one beautiful interface'
    },
    {
      icon: '🎨',
      title: 'Beautiful Design',
      description: 'Modern glass morphism design with stunning visualizations and animations'
    },
    {
      icon: '🔊',
      title: 'Voice Control',
      description: 'Control your music with natural voice commands and AI-powered features'
    },
    {
      icon: '⚡',
      title: 'Lightning Fast',
      description: 'Optimized performance with instant search and seamless playback'
    },
    {
      icon: '🔄',
      title: 'Smart Sync',
      description: 'Intelligent playlist management and synchronization across all services'
    },
    {
      icon: '🎯',
      title: 'Cross-Platform',
      description: 'Available for Windows, macOS, and Linux with native performance'
    }
  ];

  const showcaseItems = [
    {
      title: 'Main Interface',
      description: 'Clean, intuitive design that puts your music first',
      image: '/screenshots/main-interface.png',
      features: ['Universal search', 'Quick access toolbar', 'Now playing widget']
    },
    {
      title: 'Playlist Management',
      description: 'Organize and sync playlists across all your music services',
      image: '/screenshots/playlist-management.png',
      features: ['Cross-service sync', 'Smart organization', 'Batch operations']
    },
    {
      title: 'Music Visualization',
      description: 'Stunning real-time visualizations that respond to your music',
      image: '/screenshots/visualization.png',
      features: ['Real-time audio analysis', 'Multiple visual themes', 'Customizable effects']
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-b from-black to-gray-900 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-pink-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Experience the Future of
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
              Music Streaming
            </span>
          </h2>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            OmniFusion Music combines the power of all your favorite music services 
            into one stunning desktop application.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="group bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-105 cursor-pointer"
              onClick={() => setActiveFeature(index)}
            >
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                {feature.icon}
              </div>
              <h3 className="text-white font-semibold text-xl mb-3">{feature.title}</h3>
              <p className="text-white/70">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Interactive Showcase */}
        <div className="bg-white/5 backdrop-blur-md rounded-3xl p-8 border border-white/10 mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Screenshot/Preview */}
            <div className="relative">
              <div className="bg-gradient-to-br from-purple-600/20 to-pink-600/20 rounded-2xl p-4 border border-white/10">
                <div className="bg-gray-800 rounded-xl h-64 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-6xl mb-4">🎵</div>
                    <p className="text-white/60">App Screenshot Preview</p>
                    <p className="text-white/40 text-sm mt-2">Coming Soon</p>
                  </div>
                </div>
              </div>
              
              {/* Floating elements */}
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
              </div>
            </div>

            {/* Feature Details */}
            <div>
              <h3 className="text-2xl font-bold text-white mb-4">
                {showcaseItems[activeFeature]?.title || 'Main Interface'}
              </h3>
              <p className="text-white/70 mb-6">
                {showcaseItems[activeFeature]?.description || 'Clean, intuitive design that puts your music first'}
              </p>
              
              <div className="space-y-3">
                {(showcaseItems[activeFeature]?.features || ['Universal search', 'Quick access toolbar', 'Now playing widget']).map((feature, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                    <span className="text-white/80">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 backdrop-blur-md rounded-2xl p-6 border border-white/10">
            <h3 className="text-xl md:text-2xl font-bold text-white mb-3">
              Ready to Experience the Future of Music?
            </h3>
            <p className="text-white/70 mb-6 max-w-xl mx-auto">
              Download OmniFusion Music today and transform how you listen to music on your desktop.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <ComingSoon platform="all" showProgress={false} />
              <button className="px-6 py-3 bg-white/10 backdrop-blur-md text-white font-semibold rounded-full text-base border border-white/20 transition-all duration-300 hover:bg-white/20 hover:border-white/40">
                Watch Demo Video
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AppShowcase; 