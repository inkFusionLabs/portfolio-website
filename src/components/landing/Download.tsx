import React from 'react';
import { Download as DownloadIcon, Zap, Check, Star } from 'lucide-react';

const platforms = [
  {
    name: "Windows",
    icon: "🪟",
    version: "Windows 10+",
    size: "45 MB",
    downloadUrl: "#windows-download",
    color: "from-blue-500 to-cyan-500"
  },
  {
    name: "macOS",
    icon: "🍎",
    version: "macOS 10.15+",
    size: "52 MB",
    downloadUrl: "#macos-download",
    color: "from-gray-500 to-gray-700"
  },
  {
    name: "Linux",
    icon: "🐧",
    version: "Ubuntu 20.04+",
    size: "48 MB",
    downloadUrl: "#linux-download",
    color: "from-orange-500 to-red-500"
  }
];

const systemRequirements = [
  "4GB RAM minimum (8GB recommended)",
  "2GB free disk space",
  "Internet connection for streaming",
  "Spotify/Apple Music account (optional)"
];

const Download: React.FC = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Download OmniFusion Music
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
              Available on All Platforms
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Get started with OmniFusion Music today. Download for your platform 
            and experience the future of music management.
          </p>
        </div>

        {/* Download Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {platforms.map((platform, index) => (
            <div
              key={index}
              className="group relative p-8 bg-slate-800/50 rounded-xl border border-slate-700 hover:border-slate-600 transition-all duration-300 hover:transform hover:scale-105"
            >
              {/* Platform Icon */}
              <div className="text-4xl mb-4">{platform.icon}</div>
              
              {/* Platform Info */}
              <h3 className="text-2xl font-bold text-white mb-2">{platform.name}</h3>
              <p className="text-gray-400 mb-4">{platform.version}</p>
              <p className="text-sm text-gray-500 mb-6">Size: {platform.size}</p>

              {/* Download Button */}
              <button className={`w-full py-3 px-6 bg-gradient-to-r ${platform.color} text-white font-semibold rounded-lg hover:shadow-lg transform hover:scale-105 transition-all duration-200 flex items-center justify-center`}>
                                 <DownloadIcon className="w-5 h-5 mr-2" />
                Download for {platform.name}
              </button>

              {/* Hover Effect */}
              <div className={`absolute inset-0 bg-gradient-to-r ${platform.color} opacity-0 group-hover:opacity-5 rounded-xl transition-opacity duration-300`}></div>
            </div>
          ))}
        </div>

        {/* System Requirements */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="text-3xl font-bold text-white mb-6">
              System Requirements
            </h3>
            <div className="space-y-4">
              {systemRequirements.map((requirement, index) => (
                <div key={index} className="flex items-center">
                  <Check className="w-5 h-5 text-green-400 mr-3 flex-shrink-0" />
                  <span className="text-gray-300">{requirement}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-slate-800/50 rounded-xl p-8 border border-slate-700">
            <h4 className="text-xl font-semibold text-white mb-4 flex items-center">
              <Star className="w-5 h-5 text-yellow-400 mr-2" />
              What's New in v1.0
            </h4>
            <ul className="space-y-3 text-gray-300">
              <li>• Spotify integration with OAuth</li>
              <li>• Universal search across services</li>
              <li>• Beautiful glass morphism UI</li>
              <li>• Cross-platform compatibility</li>
              <li>• Offline playlist support</li>
              <li>• Performance optimizations</li>
            </ul>
          </div>
        </div>

        {/* Additional Info */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center px-6 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-gray-300">
            <Zap className="w-5 h-5 mr-2 text-indigo-400" />
            Free forever • No ads • No tracking
          </div>
        </div>
      </div>
    </section>
  );
};

export default Download; 