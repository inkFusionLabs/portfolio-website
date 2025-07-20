import React from 'react';
import ComingSoon from './ComingSoon';

const Download = () => {
  const platforms = [
    {
      name: 'macOS',
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
        </svg>
      ),
      version: 'v2.1.0',
      size: '45.2 MB',
      requirements: 'macOS 11.0+',
      gradient: 'from-gray-600 to-gray-800',
      progress: 90
    },
    {
      name: 'Windows',
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M0 3.554L9.75 2.77v9.451H0m10.949-9.602L24 0v11.446H10.949M0 12.541h9.75v9.451L0 20.506M10.949 12.541H24V24l-12.9-1.095"/>
        </svg>
      ),
      version: 'v2.1.0',
      size: '52.8 MB',
      requirements: 'Windows 10+',
      gradient: 'from-blue-600 to-blue-800',
      progress: 85
    },
    {
      name: 'Linux',
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
        </svg>
      ),
      version: 'v2.1.0',
      size: '48.5 MB',
      requirements: 'Ubuntu 20.04+',
      gradient: 'from-orange-600 to-red-600',
      progress: 75
    }
  ];

  const developmentPhases = [
    { name: 'Core Development', progress: 100, status: 'Completed', color: 'text-green-400' },
    { name: 'UI/UX Design', progress: 100, status: 'Completed', color: 'text-green-400' },
    { name: 'Music Service Integration', progress: 90, status: 'In Progress', color: 'text-yellow-400' },
    { name: 'Cross-Platform Testing', progress: 80, status: 'In Progress', color: 'text-yellow-400' },
    { name: 'Performance Optimization', progress: 85, status: 'In Progress', color: 'text-yellow-400' },
    { name: 'Beta Testing', progress: 60, status: 'In Progress', color: 'text-yellow-400' },
    { name: 'Final Testing & Release', progress: 0, status: 'Pending', color: 'text-gray-400' }
  ];

  return (
    <section className="py-16 bg-gradient-to-b from-gray-900 to-black relative overflow-hidden" id="download">
      {/* Background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Coming Soon
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
              OmniFusion Music
            </span>
          </h2>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            We're working hard to bring you the ultimate music streaming experience. 
            Join our beta program to get early access.
          </p>

          {/* Overall Progress */}
          <div className="max-w-md mx-auto mb-8">
            <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10">
              <div className="flex justify-between items-center mb-3">
                <span className="text-white font-semibold">Overall Progress</span>
                <span className="text-white/70 text-sm">Q1 2025</span>
              </div>
              <div className="w-full bg-white/20 rounded-full h-3 mb-3">
                <div 
                  className="bg-gradient-to-r from-green-400 to-blue-400 h-3 rounded-full transition-all duration-1000"
                  style={{ width: '85%' }}
                ></div>
              </div>
              <p className="text-white/60 text-sm">85% Complete - Beta Testing Phase</p>
            </div>
          </div>
        </div>

        {/* Development Phases */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {developmentPhases.map((phase, index) => (
            <div key={index} className="bg-white/5 backdrop-blur-md rounded-xl p-4 border border-white/10">
              <div className="flex justify-between items-center mb-2">
                <span className={`text-sm font-medium ${phase.color}`}>{phase.name}</span>
                <span className={`text-xs ${phase.color}`}>{phase.progress}%</span>
              </div>
              <div className="w-full bg-white/20 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full transition-all duration-1000 ${
                    phase.status === 'Completed' ? 'bg-green-400' : 
                    phase.status === 'In Progress' ? 'bg-yellow-400' : 'bg-gray-400'
                  }`}
                  style={{ width: `${phase.progress}%` }}
                ></div>
              </div>
              <p className={`text-xs mt-1 ${phase.color}`}>{phase.status}</p>
            </div>
          ))}
        </div>

        {/* Platform Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {platforms.map((platform, index) => (
            <div 
              key={index}
              className="group bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-105"
            >
              <div className={`w-12 h-12 bg-gradient-to-r ${platform.gradient} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                {platform.icon}
              </div>
              
              <h3 className="text-white font-bold text-xl mb-2">{platform.name}</h3>
              <p className="text-white/70 mb-3">Version {platform.version}</p>
              
              <div className="space-y-1 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-white/60">Size:</span>
                  <span className="text-white">{platform.size}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-white/60">Requirements:</span>
                  <span className="text-white">{platform.requirements}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-white/60">Progress:</span>
                  <span className="text-white">{platform.progress}%</span>
                </div>
              </div>

              <ComingSoon platform={platform.name} showProgress={false} />
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 backdrop-blur-md rounded-2xl p-8 border border-white/10">
            <h3 className="text-2xl font-bold text-white mb-4">Be the First to Experience It</h3>
            <p className="text-white/70 mb-6 max-w-2xl mx-auto">
              Join our beta program to get early access to OmniFusion Music. 
              Help us shape the future of music streaming while enjoying exclusive features.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => {
                  const betaSection = document.getElementById('beta-testing');
                  if (betaSection) betaSection.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-full text-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/25"
              >
                Join Beta Program
              </button>
              <button 
                onClick={() => {
                  const newsletterSection = document.getElementById('newsletter');
                  if (newsletterSection) newsletterSection.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-8 py-4 bg-white/10 backdrop-blur-md text-white font-semibold rounded-full text-lg border border-white/20 transition-all duration-300 hover:bg-white/20 hover:border-white/40"
              >
                Get Notified
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Download; 