import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle, Clock, Star, Zap, Music, Smartphone, Globe, Brain, Users, Shield } from 'lucide-react';

const Roadmap: React.FC = () => {
  const roadmapItems = [
    {
      phase: "Phase 1: Foundation",
      status: "completed",
      date: "Q1 2024",
      items: [
        { text: "Core application architecture", completed: true },
        { text: "Basic UI/UX design system", completed: true },
        { text: "Spotify API integration", completed: true },
        { text: "Local music library support", completed: true },
        { text: "Cross-platform build setup", completed: true }
      ]
    },
    {
      phase: "Phase 2: Core Features",
      status: "in-progress",
      date: "Q2 2024",
      items: [
        { text: "Apple Music integration", completed: false },
        { text: "YouTube Music integration", completed: false },
        { text: "Unified search functionality", completed: false },
        { text: "Playlist management", completed: false },
        { text: "Basic playback controls", completed: false }
      ]
    },
    {
      phase: "Phase 3: Intelligence",
      status: "planned",
      date: "Q3 2024",
      items: [
        { text: "AI-powered recommendations", completed: false },
        { text: "Smart playlist generation", completed: false },
        { text: "Voice commands", completed: false },
        { text: "Mood-based music selection", completed: false },
        { text: "Cross-service playlist sync", completed: false }
      ]
    },
    {
      phase: "Phase 4: Advanced Features",
      status: "planned",
      date: "Q4 2024",
      items: [
        { text: "Social features & sharing", completed: false },
        { text: "Advanced audio controls", completed: false },
        { text: "Offline mode", completed: false },
        { text: "Multi-device sync", completed: false },
        { text: "Custom themes & skins", completed: false }
      ]
    },
    {
      phase: "Phase 5: Ecosystem",
      status: "future",
      date: "Q1 2025",
      items: [
        { text: "Mobile companion app", completed: false },
        { text: "Web player version", completed: false },
        { text: "API for developers", completed: false },
        { text: "Plugin system", completed: false },
        { text: "Enterprise features", completed: false }
      ]
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-6 h-6 text-green-500" />;
      case "in-progress":
        return <Clock className="w-6 h-6 text-yellow-500 animate-pulse" />;
      case "planned":
        return <Star className="w-6 h-6 text-blue-500" />;
      case "future":
        return <Zap className="w-6 h-6 text-purple-500" />;
      default:
        return <Clock className="w-6 h-6 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "border-green-500/30 bg-green-500/10";
      case "in-progress":
        return "border-yellow-500/30 bg-yellow-500/10";
      case "planned":
        return "border-blue-500/30 bg-blue-500/10";
      case "future":
        return "border-purple-500/30 bg-purple-500/10";
      default:
        return "border-gray-500/30 bg-gray-500/10";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-black/20 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center space-x-2 text-white hover:text-gray-300 transition-colors">
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Home</span>
            </Link>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Music className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white">OmniFusion</span>
            </div>
          </div>
        </div>
      </nav>

      {/* Header */}
      <section className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Development
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
              Roadmap
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Our journey to revolutionize music streaming. See what we've built, what we're working on, 
            and what's coming next.
          </p>
        </div>
      </section>

      {/* Roadmap */}
      <section className="pb-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-12">
            {roadmapItems.map((phase, index) => (
              <div key={index} className={`relative ${index !== roadmapItems.length - 1 ? 'pb-12' : ''}`}>
                {/* Connection Line */}
                {index !== roadmapItems.length - 1 && (
                  <div className="absolute left-8 top-16 w-0.5 h-full bg-gradient-to-b from-gray-600 to-transparent"></div>
                )}
                
                <div className={`relative flex items-start space-x-6 p-8 rounded-2xl border ${getStatusColor(phase.status)} backdrop-blur-md`}>
                  {/* Status Icon */}
                  <div className="flex-shrink-0 w-16 h-16 bg-white/10 rounded-xl flex items-center justify-center border border-white/20">
                    {getStatusIcon(phase.status)}
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-2xl font-bold text-white">{phase.phase}</h3>
                      <span className="px-4 py-2 bg-white/10 rounded-full text-sm text-gray-300 border border-white/20">
                        {phase.date}
                      </span>
                    </div>
                    
                    <div className="space-y-3">
                      {phase.items.map((item, itemIndex) => (
                        <div key={itemIndex} className="flex items-center space-x-3">
                          {item.completed ? (
                            <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                          ) : (
                            <div className="w-5 h-5 border-2 border-gray-600 rounded-full flex-shrink-0"></div>
                          )}
                          <span className={`text-lg ${item.completed ? 'text-gray-400 line-through' : 'text-gray-300'}`}>
                            {item.text}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Overview */}
      <section className="py-16 bg-black/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              Key Features
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
                Coming Soon
              </span>
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="p-8 bg-white/5 backdrop-blur-md rounded-xl border border-white/10 text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-6">
                <Globe className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">Universal Access</h3>
              <p className="text-gray-400">Connect all your music services in one beautiful interface</p>
            </div>
            
            <div className="p-8 bg-white/5 backdrop-blur-md rounded-xl border border-white/10 text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-6">
                <Brain className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">AI Intelligence</h3>
              <p className="text-gray-400">Smart recommendations and automated playlist curation</p>
            </div>
            
            <div className="p-8 bg-white/5 backdrop-blur-md rounded-xl border border-white/10 text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-6">
                <Smartphone className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">Cross-Platform</h3>
              <p className="text-gray-400">Seamless experience across Windows, macOS, and Linux</p>
            </div>
            
            <div className="p-8 bg-white/5 backdrop-blur-md rounded-xl border border-white/10 text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-6">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">Social Features</h3>
              <p className="text-gray-400">Share playlists and discover music with friends</p>
            </div>
            
            <div className="p-8 bg-white/5 backdrop-blur-md rounded-xl border border-white/10 text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-6">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">Privacy First</h3>
              <p className="text-gray-400">Your data stays local and secure</p>
            </div>
            
            <div className="p-8 bg-white/5 backdrop-blur-md rounded-xl border border-white/10 text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-6">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">Lightning Fast</h3>
              <p className="text-gray-400">Optimized performance for instant music access</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black/20 backdrop-blur-md border-t border-white/10 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="w-6 h-6 bg-gradient-to-r from-indigo-500 to-purple-600 rounded flex items-center justify-center">
                <Music className="w-4 h-4 text-white" />
              </div>
              <span className="text-white font-semibold">OmniFusion Music</span>
            </div>
            <div className="flex space-x-6 text-sm text-gray-400">
              <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
              <Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
              <Link to="/demo" className="hover:text-white transition-colors">Demo</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Roadmap; 