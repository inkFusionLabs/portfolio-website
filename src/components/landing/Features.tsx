import React from 'react';
import { Music, Search, Play, List, Zap, Shield, Smartphone, Globe } from 'lucide-react';

const features = [
  {
    icon: <Music className="w-8 h-8" />,
    title: "Universal Music Hub",
    description: "Connect Spotify, Apple Music, YouTube Music, and more in one beautiful interface. No more switching between apps.",
    color: "from-blue-500 to-cyan-500"
  },
  {
    icon: <Search className="w-8 h-8" />,
    title: "Smart Search",
    description: "Search across all your music services simultaneously. Find any song, artist, or album instantly.",
    color: "from-purple-500 to-pink-500"
  },
  {
    icon: <Play className="w-8 h-8" />,
    title: "Seamless Playback",
    description: "Control music playback across all services with unified controls. Play, pause, skip, and adjust volume from one place.",
    color: "from-green-500 to-emerald-500"
  },
  {
    icon: <List className="w-8 h-8" />,
    title: "Playlist Management",
    description: "View and manage playlists from different platforms. Create, edit, and organize your music collections.",
    color: "from-orange-500 to-red-500"
  },
  {
    icon: <Zap className="w-8 h-8" />,
    title: "Lightning Fast",
    description: "Built with modern technologies for optimal performance. Instant loading and smooth animations.",
    color: "from-yellow-500 to-orange-500"
  },
  {
    icon: <Shield className="w-8 h-8" />,
    title: "Privacy First",
    description: "Your music data stays on your device. No tracking, no ads, no data collection.",
    color: "from-indigo-500 to-purple-500"
  },
  {
    icon: <Smartphone className="w-8 h-8" />,
    title: "Cross-Platform",
    description: "Available on Windows, macOS, and Linux. Your music follows you everywhere.",
    color: "from-teal-500 to-cyan-500"
  },
  {
    icon: <Globe className="w-8 h-8" />,
    title: "Offline Support",
    description: "Access your downloaded music even without internet. Perfect for travel and offline listening.",
    color: "from-pink-500 to-rose-500"
  }
];

const Features: React.FC = () => {
  return (
    <section className="py-20 bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Everything You Need for
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
              Perfect Music Experience
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            OmniFusion Music brings together all the features you love from your favorite 
            music services, enhanced with powerful tools for discovery and organization.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative p-6 bg-slate-800/50 rounded-xl border border-slate-700 hover:border-slate-600 transition-all duration-300 hover:transform hover:scale-105"
            >
              {/* Icon */}
              <div className={`inline-flex p-3 rounded-lg bg-gradient-to-r ${feature.color} text-white mb-4 group-hover:scale-110 transition-transform duration-300`}>
                {feature.icon}
              </div>

              {/* Content */}
              <h3 className="text-xl font-semibold text-white mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-400 leading-relaxed">
                {feature.description}
              </p>

              {/* Hover Effect */}
              <div className={`absolute inset-0 bg-gradient-to-r ${feature.color} opacity-0 group-hover:opacity-5 rounded-xl transition-opacity duration-300`}></div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold rounded-xl hover:shadow-lg transform hover:scale-105 transition-all duration-200">
            <Zap className="w-5 h-5 mr-2" />
            Experience the Future of Music
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features; 