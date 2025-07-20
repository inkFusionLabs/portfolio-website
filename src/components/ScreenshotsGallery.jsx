import React, { useState } from 'react';
import AppScreenshots from './AppScreenshots';
import AdditionalScreenshots from './AdditionalScreenshots';

const ScreenshotsGallery = () => {
  const [activeCategory, setActiveCategory] = useState('main');

  const categories = [
    { id: 'main', name: 'Main Features', component: <AppScreenshots /> },
    { id: 'advanced', name: 'Advanced Features', component: <AdditionalScreenshots /> }
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
            App
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
              Screenshots
            </span>
          </h2>
          <p className="text-lg text-white/70 max-w-2xl mx-auto">
            Explore the beautiful and intuitive interface of OmniFusion Music through these detailed screenshots.
          </p>
        </div>

        {/* Category Navigation */}
        <div className="flex justify-center mb-8">
          <div className="bg-white/5 backdrop-blur-md rounded-xl p-1 border border-white/10">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                  activeCategory === category.id
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                    : 'text-white/70 hover:text-white'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* Screenshots Content */}
        <div className="mb-12">
          {categories.find(cat => cat.id === activeCategory)?.component}
        </div>

        {/* Feature Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white/5 backdrop-blur-md rounded-xl p-6 border border-white/10">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
            </div>
            <h3 className="text-white font-semibold text-lg mb-2">Beautiful Design</h3>
            <p className="text-white/70 text-sm">
              Modern, intuitive interface with smooth animations and professional aesthetics.
            </p>
          </div>

          <div className="bg-white/5 backdrop-blur-md rounded-xl p-6 border border-white/10">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
              </svg>
            </div>
            <h3 className="text-white font-semibold text-lg mb-2">Cross-Platform</h3>
            <p className="text-white/70 text-sm">
              Seamless integration across Windows, macOS, and Linux with native performance.
            </p>
          </div>

          <div className="bg-white/5 backdrop-blur-md rounded-xl p-6 border border-white/10">
            <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
              </svg>
            </div>
            <h3 className="text-white font-semibold text-lg mb-2">Smart Sync</h3>
            <p className="text-white/70 text-sm">
              Intelligent playlist management and synchronization across all music services.
            </p>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 backdrop-blur-md rounded-2xl p-6 border border-white/10">
            <h3 className="text-xl md:text-2xl font-bold text-white mb-3">
              Ready to Experience OmniFusion Music?
            </h3>
            <p className="text-white/70 mb-6 max-w-xl mx-auto">
              Download the app today and transform how you listen to music across all your favorite services.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-full text-base transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/25">
                Download Now
              </button>
              <button className="px-6 py-3 bg-white/10 backdrop-blur-md text-white font-semibold rounded-full text-base border border-white/20 transition-all duration-300 hover:bg-white/20 hover:border-white/40">
                View All Features
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ScreenshotsGallery; 