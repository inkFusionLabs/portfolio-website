import React from 'react';

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
      downloadUrl: '#'
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
      downloadUrl: '#'
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
      downloadUrl: '#'
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
            Download
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
              OmniFusion Music
            </span>
          </h2>
          <p className="text-lg text-white/70 max-w-2xl mx-auto">
            Available for all major platforms. Download now and start your unified music journey.
          </p>
        </div>

        {/* Download Cards */}
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
              </div>

              <button className="w-full group relative px-4 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/25">
                <span className="relative z-10 flex items-center justify-center gap-2 text-sm">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                  </svg>
                  Download for {platform.name}
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg blur opacity-0 group-hover:opacity-75 transition-opacity duration-300"></div>
              </button>
            </div>
          ))}
        </div>

        {/* Additional Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white/5 backdrop-blur-md rounded-xl p-6 border border-white/10">
            <h3 className="text-white font-bold text-lg mb-3 flex items-center gap-2">
              <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
              </svg>
              Free & Open Source
            </h3>
            <p className="text-white/70 leading-relaxed text-sm">
              OmniFusion Music is completely free to use and open source. No hidden fees, no subscriptions, 
              just pure music enjoyment.
            </p>
          </div>

          <div className="bg-white/5 backdrop-blur-md rounded-xl p-6 border border-white/10">
            <h3 className="text-white font-bold text-lg mb-3 flex items-center gap-2">
              <svg className="w-5 h-5 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
              </svg>
              Regular Updates
            </h3>
            <p className="text-white/70 leading-relaxed text-sm">
              We regularly update OmniFusion Music with new features, bug fixes, and performance improvements 
              to ensure the best experience.
            </p>
          </div>
        </div>

        {/* System Requirements */}
        <div className="mt-12 text-center">
          <h3 className="text-xl font-bold text-white mb-6">System Requirements</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto">
            <div className="bg-white/5 backdrop-blur-md rounded-xl p-4 border border-white/10">
              <h4 className="text-white font-semibold mb-2">Minimum</h4>
              <ul className="text-white/70 text-xs space-y-1">
                <li>• 4GB RAM</li>
                <li>• 2GB Storage</li>
                <li>• Internet Connection</li>
              </ul>
            </div>
            <div className="bg-white/5 backdrop-blur-md rounded-xl p-4 border border-white/10">
              <h4 className="text-white font-semibold mb-2">Recommended</h4>
              <ul className="text-white/70 text-xs space-y-1">
                <li>• 8GB RAM</li>
                <li>• 5GB Storage</li>
                <li>• High-speed Internet</li>
              </ul>
            </div>
            <div className="bg-white/5 backdrop-blur-md rounded-xl p-4 border border-white/10">
              <h4 className="text-white font-semibold mb-2">Supported</h4>
              <ul className="text-white/70 text-xs space-y-1">
                <li>• Spotify Premium</li>
                <li>• Apple Music</li>
                <li>• YouTube Music</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Download; 