import React, { useState } from 'react'
import { CheckCircle, Clock, Star, Zap, Users, Globe, Smartphone, Palette, Bot, Shield } from 'lucide-react'

const Roadmap = () => {
  const [activePhase, setActivePhase] = useState('current')

  const roadmapData = {
    completed: [
      {
        id: 1,
        title: "Core App Development",
        description: "Basic desktop application with multi-service integration",
        features: ["Spotify integration", "Apple Music support", "Basic UI/UX", "Cross-platform compatibility"],
        date: "Q1 2024",
        icon: <CheckCircle className="w-6 h-6" />,
        color: "from-green-500 to-emerald-500"
      },
      {
        id: 2,
        title: "Enhanced Streaming Support",
        description: "Added support for additional streaming platforms",
        features: ["YouTube Music integration", "Tidal support", "Deezer integration", "Amazon Music support"],
        date: "Q2 2024",
        icon: <Globe className="w-6 h-6" />,
        color: "from-blue-500 to-cyan-500"
      },
      {
        id: 3,
        title: "Advanced Features",
        description: "Implemented advanced music management features",
        features: ["Universal search", "Cross-platform playlists", "Smart recommendations", "Offline mode"],
        date: "Q3 2024",
        icon: <Zap className="w-6 h-6" />,
        color: "from-purple-500 to-pink-500"
      }
    ],
    current: [
      {
        id: 4,
        title: "Community & Social Features",
        description: "Building community features and social integration",
        features: ["User profiles", "Social sharing", "Community playlists", "Collaborative features"],
        date: "Q4 2024",
        icon: <Users className="w-6 h-6" />,
        color: "from-orange-500 to-red-500",
        progress: 75
      },
      {
        id: 5,
        title: "Mobile App Development",
        description: "Creating mobile companion apps for iOS and Android",
        features: ["iOS app", "Android app", "Cross-device sync", "Mobile-specific features"],
        date: "Q1 2025",
        icon: <Smartphone className="w-6 h-6" />,
        color: "from-indigo-500 to-purple-500",
        progress: 45
      }
    ],
    planned: [
      {
        id: 6,
        title: "AI-Powered Features",
        description: "Advanced AI integration for personalized music experience",
        features: ["AI playlist generation", "Smart mood detection", "Voice commands", "Predictive recommendations"],
        date: "Q2 2025",
        icon: <Bot className="w-6 h-6" />,
        color: "from-pink-500 to-rose-500"
      },
      {
        id: 7,
        title: "Advanced Customization",
        description: "Enhanced customization and theming options",
        features: ["Custom themes", "Plugin system", "Advanced settings", "Developer API"],
        date: "Q3 2025",
        icon: <Palette className="w-6 h-6" />,
        color: "from-yellow-500 to-orange-500"
      },
      {
        id: 8,
        title: "Enterprise Features",
        description: "Professional and enterprise-grade features",
        features: ["Team collaboration", "Advanced analytics", "Enterprise security", "Admin dashboard"],
        date: "Q4 2025",
        icon: <Shield className="w-6 h-6" />,
        color: "from-gray-500 to-slate-500"
      }
    ]
  }

  const renderPhase = (phase, data) => {
    return (
      <div className="space-y-8">
        {data.map((item, index) => (
          <div 
            key={item.id} 
            className="glass p-8 rounded-3xl fade-in hover:scale-105 transition-all duration-500"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="flex items-start space-x-6">
              <div className={`w-16 h-16 bg-gradient-to-r ${item.color} rounded-2xl flex items-center justify-center text-white shadow-lg`}>
                {item.icon}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-2xl font-bold text-white">{item.title}</h3>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-400">{item.date}</span>
                    {phase === 'current' && item.progress && (
                      <div className="flex items-center space-x-2">
                        <div className="w-20 h-2 bg-white/10 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-gradient-to-r from-orange-500 to-red-500 rounded-full transition-all duration-1000"
                            style={{ width: `${item.progress}%` }}
                          ></div>
                        </div>
                        <span className="text-sm text-gray-400">{item.progress}%</span>
                      </div>
                    )}
                  </div>
                </div>
                <p className="text-gray-300 text-lg mb-6">{item.description}</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {item.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      <span className="text-gray-200">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <section id="roadmap" className="py-20 bg-gray-900 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl floating-element"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl floating-element-delayed"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 fade-in">
          <div className="inline-flex items-center px-4 py-2 glass rounded-full mb-6">
            <Star className="w-4 h-4 text-yellow-400 mr-2" />
            <span className="text-sm font-medium">Product Roadmap</span>
          </div>
          <h2 className="text-5xl md:text-6xl font-black text-white mb-8">
            Our Journey to
            <span className="gradient-text"> Perfect Music</span>
          </h2>
          <p className="text-xl md:text-2xl text-gray-200 max-w-4xl mx-auto leading-relaxed">
            See how OmniFusion Music evolves from a simple desktop app to a comprehensive music ecosystem
          </p>
        </div>

        {/* Phase Navigation */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <button
            onClick={() => setActivePhase('completed')}
            className={`px-6 py-3 rounded-full transition-all duration-300 ${
              activePhase === 'completed' ? 'btn-primary' : 'btn-secondary'
            }`}
          >
            <CheckCircle className="w-4 h-4 mr-2" />
            Completed
          </button>
          <button
            onClick={() => setActivePhase('current')}
            className={`px-6 py-3 rounded-full transition-all duration-300 ${
              activePhase === 'current' ? 'btn-primary' : 'btn-secondary'
            }`}
          >
            <Clock className="w-4 h-4 mr-2" />
            In Progress
          </button>
          <button
            onClick={() => setActivePhase('planned')}
            className={`px-6 py-3 rounded-full transition-all duration-300 ${
              activePhase === 'planned' ? 'btn-primary' : 'btn-secondary'
            }`}
          >
            <Star className="w-4 h-4 mr-2" />
            Planned
          </button>
        </div>

        {/* Roadmap Content */}
        <div className="fade-in">
          {activePhase === 'completed' && renderPhase('completed', roadmapData.completed)}
          {activePhase === 'current' && renderPhase('current', roadmapData.current)}
          {activePhase === 'planned' && renderPhase('planned', roadmapData.planned)}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16 fade-in">
          <h3 className="text-2xl font-bold text-white mb-6">Help Shape the Future</h3>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Have ideas for features? Want to contribute to the roadmap? Join our community and help us build the ultimate music experience.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="btn-primary flex items-center space-x-3">
              <Star className="w-5 h-5" />
              <span>Suggest Features</span>
            </button>
            <button className="btn-secondary flex items-center space-x-3">
              <Users className="w-5 h-5" />
              <span>Join Community</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Roadmap 