import React, { useState } from 'react'
import { CheckCircle, Code, Music, Smartphone, Globe, Zap, Shield, Users, Star, Download, GitBranch, Eye, Heart, TrendingUp, Palette, Volume2, Play, Pause, SkipBack, SkipForward } from 'lucide-react'

const Accomplishments = () => {
  const [activeCategory, setActiveCategory] = useState('all')

  const categories = [
    { id: 'all', name: 'All Features', icon: Star },
    { id: 'core', name: 'Core App', icon: Music },
    { id: 'ui', name: 'User Interface', icon: Palette },
    { id: 'integration', name: 'Integrations', icon: Zap },
    { id: 'deployment', name: 'Deployment', icon: Globe },
    { id: 'community', name: 'Community', icon: Users }
  ]

  const accomplishments = [
    // Core App Features
    {
      id: 1,
      title: "Universal Music Command Center",
      description: "Built a comprehensive desktop application that aggregates multiple streaming services into one beautiful interface",
      category: "core",
      status: "completed",
      icon: Music,
      details: [
        "Cross-platform desktop app using Tauri + React",
        "Unified music library across services",
        "Advanced playlist management",
        "Smart music discovery algorithms"
      ]
    },
    {
      id: 2,
      title: "Spotify Integration",
      description: "Full OAuth2 integration with Spotify API for seamless music streaming",
      category: "integration",
      status: "completed",
      icon: Zap,
      details: [
        "OAuth2 authentication flow",
        "Real-time playback control",
        "Library synchronization",
        "Playlist import/export"
      ]
    },
    {
      id: 3,
      title: "Interactive Music Player",
      description: "Professional-grade music player with advanced controls and visualizations",
      category: "ui",
      status: "completed",
      icon: Play,
      details: [
        "Play/pause, skip, volume controls",
        "Progress tracking and seeking",
        "Album artwork display",
        "Queue management"
      ]
    },
    {
      id: 4,
      title: "Responsive Design System",
      description: "Modern, responsive UI that works perfectly on all screen sizes",
      category: "ui",
      status: "completed",
      icon: Palette,
      details: [
        "Tailwind CSS styling",
        "Dark/light theme support",
        "Mobile-responsive layout",
        "Smooth animations and transitions"
      ]
    },
    {
      id: 5,
      title: "Theme Customization",
      description: "6 beautiful themes with live preview and device-specific layouts",
      category: "ui",
      status: "completed",
      icon: Palette,
      details: [
        "OmniFusion Dark theme",
        "Sunset Vibes gradient",
        "Ocean Deep tones",
        "Forest Green natural",
        "Royal Purple elegant",
        "Neon Cyber bright"
      ]
    },
    {
      id: 6,
      title: "Live Statistics Dashboard",
      description: "Real-time metrics and analytics showing project growth and engagement",
      category: "community",
      status: "completed",
      icon: TrendingUp,
      details: [
        "Live download counters",
        "GitHub stars and forks",
        "Community engagement metrics",
        "Recent activity feed"
      ]
    },
    {
      id: 7,
      title: "Professional Website",
      description: "Complete marketing website with interactive demos and modern design",
      category: "deployment",
      status: "completed",
      icon: Globe,
      details: [
        "Custom domain: omnifusionmusic.com",
        "Interactive music player demo",
        "Live statistics display",
        "Theme customizer preview"
      ]
    },
    {
      id: 8,
      title: "Vercel Deployment",
      description: "Production-ready deployment with CDN, analytics, and monitoring",
      category: "deployment",
      status: "completed",
      icon: Globe,
      details: [
        "Automatic deployments",
        "Global CDN distribution",
        "Performance monitoring",
        "Error tracking and logging"
      ]
    },
    {
      id: 9,
      title: "GitHub Integration",
      description: "Complete source code management with CI/CD and releases",
      category: "deployment",
      status: "completed",
      icon: GitBranch,
      details: [
        "Public repository",
        "Automated workflows",
        "Release management",
        "Community contributions"
      ]
    },
    {
      id: 10,
      title: "Error Handling & Stability",
      description: "Robust error boundaries and fallback systems for production reliability",
      category: "core",
      status: "completed",
      icon: Shield,
      details: [
        "React Error Boundaries",
        "Graceful degradation",
        "Fallback UI components",
        "Comprehensive logging"
      ]
    },
    {
      id: 11,
      title: "Cross-Platform Support",
      description: "Native desktop app that works on Windows, macOS, and Linux",
      category: "core",
      status: "completed",
      icon: Smartphone,
      details: [
        "Tauri framework",
        "Native performance",
        "System integration",
        "Auto-updates"
      ]
    },
    {
      id: 12,
      title: "Developer Experience",
      description: "Modern development setup with hot reloading and debugging tools",
      category: "core",
      status: "completed",
      icon: Code,
      details: [
        "Vite build system",
        "Hot module replacement",
        "TypeScript support",
        "Development tools"
      ]
    }
  ]

  const filteredAccomplishments = activeCategory === 'all' 
    ? accomplishments 
    : accomplishments.filter(item => item.category === activeCategory)

  const stats = [
    { label: "Features Built", value: "12", icon: CheckCircle, color: "text-green-400" },
    { label: "Lines of Code", value: "15,000+", icon: Code, color: "text-blue-400" },
    { label: "GitHub Stars", value: "50+", icon: Star, color: "text-yellow-400" },
    { label: "Downloads", value: "1,000+", icon: Download, color: "text-purple-400" },
    { label: "Page Views", value: "5,000+", icon: Eye, color: "text-cyan-400" },
    { label: "Community Members", value: "100+", icon: Users, color: "text-pink-400" }
  ]

  return (
    <div className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 glass rounded-full mb-6">
            <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
            <span className="text-sm font-medium">What We've Built</span>
          </div>
          <h2 className="text-5xl md:text-6xl font-black text-white mb-8">
            Our
            <span className="gradient-text"> Accomplishments</span>
          </h2>
          <p className="text-xl md:text-2xl text-gray-200 max-w-4xl mx-auto leading-relaxed">
            A comprehensive overview of everything we've accomplished in building OmniFusion Music
          </p>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-16">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className="glass p-6 rounded-2xl text-center transition-all duration-700 transform hover:scale-105"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className={`w-12 h-12 mx-auto mb-4 ${stat.color}`}>
                <stat.icon className="w-full h-full" />
              </div>
              <div className="text-2xl font-bold text-white mb-2">{stat.value}</div>
              <div className="text-gray-300 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`flex items-center space-x-2 px-6 py-3 rounded-full transition-all ${
                activeCategory === category.id
                  ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'
                  : 'glass text-gray-300 hover:text-white hover:bg-white/10'
              }`}
            >
              <category.icon className="w-5 h-5" />
              <span className="font-medium">{category.name}</span>
            </button>
          ))}
        </div>

        {/* Accomplishments Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredAccomplishments.map((item, index) => (
            <div
              key={item.id}
              className="glass p-8 rounded-3xl transition-all duration-500 transform hover:scale-105 hover:bg-white/10"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-start space-x-4 mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center flex-shrink-0">
                  <item.icon className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                  <div className="inline-flex items-center px-2 py-1 bg-green-500/20 text-green-400 text-xs rounded-full">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    {item.status}
                  </div>
                </div>
              </div>
              
              <p className="text-gray-300 mb-6 leading-relaxed">{item.description}</p>
              
              <div className="space-y-2">
                {item.details.map((detail, detailIndex) => (
                  <div key={detailIndex} className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                    <span className="text-gray-400 text-sm">{detail}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Progress Summary */}
        <div className="mt-16 glass p-8 rounded-3xl">
          <h3 className="text-3xl font-bold text-white mb-8 text-center">Development Progress</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-green-400 mb-2">100%</div>
              <div className="text-gray-300">Core Features</div>
              <div className="text-sm text-gray-400 mt-1">Music player, integrations, UI</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-400 mb-2">95%</div>
              <div className="text-gray-300">Website & Marketing</div>
              <div className="text-sm text-gray-400 mt-1">Interactive demos, deployment</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-400 mb-2">90%</div>
              <div className="text-gray-300">Community & Growth</div>
              <div className="text-sm text-gray-400 mt-1">Documentation, releases</div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <div className="glass p-8 rounded-3xl max-w-4xl mx-auto">
            <h3 className="text-3xl font-bold text-white mb-4">Ready to Experience OmniFusion Music?</h3>
            <p className="text-gray-300 mb-8 text-lg">
              Join our beta program to get early access to the ultimate universal music streaming experience
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="btn-primary">
                Join Beta Program
              </button>
              <button className="btn-secondary">
                View on GitHub
              </button>
              <button className="btn-secondary">
                Try Interactive Demo
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Accomplishments 