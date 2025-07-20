import React, { useState } from 'react';
import AppScreenshots from './AppScreenshots';

const AppShowcase = () => {
  const [activeTab, setActiveTab] = useState('screenshots');

  const features = [
    {
      icon: "🎵",
      title: "Universal Music Hub",
      description: "Access all your music services from one beautiful interface"
    },
    {
      icon: "🔄",
      title: "Smart Sync",
      description: "Your playlists and favorites sync across all platforms"
    },
    {
      icon: "🎨",
      title: "Customizable Themes",
      description: "Personalize your experience with beautiful themes"
    },
    {
      icon: "⚡",
      title: "Lightning Fast",
      description: "Native desktop performance with instant loading"
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-b from-gray-900 to-black relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            See
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
              OmniFusion Music
            </span>
            in Action
          </h2>
          <p className="text-lg text-white/70 max-w-2xl mx-auto">
            Experience the future of desktop music streaming with our intuitive and beautiful interface.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-8">
          <div className="bg-white/5 backdrop-blur-md rounded-xl p-1 border border-white/10">
            <button
              onClick={() => setActiveTab('screenshots')}
              className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                activeTab === 'screenshots'
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                  : 'text-white/70 hover:text-white'
              }`}
            >
              Screenshots
            </button>
            <button
              onClick={() => setActiveTab('features')}
              className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                activeTab === 'features'
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                  : 'text-white/70 hover:text-white'
              }`}
            >
              Features
            </button>
          </div>
        </div>

        {/* Content */}
        {activeTab === 'screenshots' ? (
          <AppScreenshots />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div key={index} className="group">
                <div className="bg-white/5 backdrop-blur-md rounded-xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-105">
                  <div className="text-3xl mb-4">{feature.icon}</div>
                  <h3 className="text-white font-semibold text-lg mb-2">{feature.title}</h3>
                  <p className="text-white/70 text-sm">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Call to Action */}
        <div className="text-center mt-12">
          <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 backdrop-blur-md rounded-2xl p-6 border border-white/10">
            <h3 className="text-xl md:text-2xl font-bold text-white mb-3">
              Ready to Experience the Future of Music?
            </h3>
            <p className="text-white/70 mb-6 max-w-xl mx-auto">
              Download OmniFusion Music today and transform how you listen to music on your desktop.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-full text-base transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/25">
                Download Now
              </button>
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