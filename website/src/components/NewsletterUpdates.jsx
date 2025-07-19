import React, { useState } from 'react'
import { Mail, Download, Calendar, Users, Star, Zap, ArrowRight, CheckCircle, Clock, Gift, Check } from 'lucide-react'

const NewsletterUpdates = () => {
  const [email, setEmail] = useState('')
  const [isSubscribed, setIsSubscribed] = useState(false)
  const [activeTab, setActiveTab] = useState('releases')

  const releaseNotes = [
    {
      version: "v2.1.0",
      date: "December 15, 2024",
      type: "major",
      title: "Enhanced Cross-Platform Sync",
      description: "Major improvements to playlist synchronization across all streaming services",
      features: [
        "Improved playlist sync reliability",
        "New conflict resolution system",
        "Enhanced error handling and recovery",
        "Performance optimizations for large libraries"
      ],
      breaking: false
    },
    {
      version: "v2.0.5",
      date: "December 8, 2024",
      type: "patch",
      title: "Bug Fixes & Performance",
      description: "Various bug fixes and performance improvements",
      features: [
        "Fixed playlist import issues",
        "Improved search performance",
        "Resolved authentication problems",
        "Enhanced offline mode stability"
      ],
      breaking: false
    },
    {
      version: "v2.0.0",
      date: "November 30, 2024",
      type: "major",
      title: "Complete UI Overhaul",
      description: "Brand new interface with improved user experience",
      features: [
        "Redesigned modern interface",
        "New dark and light themes",
        "Improved accessibility features",
        "Enhanced mobile responsiveness"
      ],
      breaking: true
    }
  ]

  const roadmapItems = [
    {
      quarter: "Q1 2025",
      status: "in-progress",
      items: [
        {
          title: "Mobile Apps Launch",
          description: "iOS and Android apps with full feature parity",
          progress: 75,
          icon: <Download className="w-5 h-5" />
        },
        {
          title: "Advanced Analytics",
          description: "Detailed listening insights and trends",
          progress: 60,
          icon: <Zap className="w-5 h-5" />
        },
        {
          title: "Social Features",
          description: "Share playlists and discover music with friends",
          progress: 40,
          icon: <Users className="w-5 h-5" />
        }
      ]
    },
    {
      quarter: "Q2 2025",
      status: "planned",
      items: [
        {
          title: "AI-Powered Recommendations",
          description: "Smart music suggestions based on your taste",
          progress: 0,
          icon: <Star className="w-5 h-5" />
        },
        {
          title: "Voice Control",
          description: "Control playback with voice commands",
          progress: 0,
          icon: <Zap className="w-5 h-5" />
        },
        {
          title: "Podcast Integration",
          description: "Manage podcasts alongside your music",
          progress: 0,
          icon: <Download className="w-5 h-5" />
        }
      ]
    },
    {
      quarter: "Q3 2025",
      status: "planned",
      items: [
        {
          title: "Collaborative Playlists",
          description: "Create and edit playlists with friends in real-time",
          progress: 0,
          icon: <Users className="w-5 h-5" />
        },
        {
          title: "Advanced Search Filters",
          description: "Find music by mood, genre, year, and more",
          progress: 0,
          icon: <Zap className="w-5 h-5" />
        },
        {
          title: "Custom Integrations",
          description: "Connect with third-party apps and services",
          progress: 0,
          icon: <Download className="w-5 h-5" />
        }
      ]
    }
  ]

  const betaFeatures = [
    {
      title: "Early Access to New Features",
      description: "Try new features before they're released to everyone",
      icon: <Gift className="w-6 h-6" />
    },
    {
      title: "Direct Developer Feedback",
      description: "Share your thoughts directly with our development team",
      icon: <Users className="w-6 h-6" />
    },
    {
      title: "Exclusive Beta Community",
      description: "Join our private Discord server for beta testers",
      icon: <Star className="w-6 h-6" />
    },
    {
      title: "Priority Support",
      description: "Get faster support for any issues you encounter",
      icon: <Zap className="w-6 h-6" />
    }
  ]

  const handleSubscribe = (e) => {
    e.preventDefault()
    if (email) {
      setIsSubscribed(true)
      setEmail('')
      // Here you would typically send the email to your backend
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'text-green-400'
      case 'in-progress':
        return 'text-yellow-400'
      case 'planned':
        return 'text-blue-400'
      default:
        return 'text-gray-400'
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-400" />
      case 'in-progress':
        return <Clock className="w-5 h-5 text-yellow-400" />
      case 'planned':
        return <Calendar className="w-5 h-5 text-blue-400" />
      default:
        return <Calendar className="w-5 h-5 text-gray-400" />
    }
  }

  return (
    <section id="newsletter-updates" className="py-20 bg-gray-800 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl floating-element"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl floating-element-delayed"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 fade-in">
          <div className="inline-flex items-center px-4 py-2 glass rounded-full mb-6">
            <Mail className="w-4 h-4 text-blue-400 mr-2" />
            <span className="text-sm font-medium">Stay Updated</span>
          </div>
          <h2 className="text-5xl md:text-6xl font-black text-white mb-8">
            Never Miss an
            <span className="gradient-text"> Update</span>
          </h2>
          <p className="text-xl md:text-2xl text-gray-200 max-w-4xl mx-auto leading-relaxed">
            Get the latest news, updates, and exclusive access to new features
          </p>
        </div>

        {/* Newsletter Signup */}
        <div className="glass p-8 rounded-3xl mb-16 fade-in">
          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold text-white mb-4">
              Subscribe to Our Newsletter
            </h3>
            <p className="text-xl text-gray-200">
              Get notified about new releases, features, and exclusive content
            </p>
          </div>

          {!isSubscribed ? (
            <form onSubmit={handleSubscribe} className="max-w-md mx-auto">
              <div className="flex gap-4">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="flex-1 px-6 py-4 bg-white/10 border border-white/20 rounded-full text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
                <button
                  type="submit"
                  className="btn-primary px-8 py-4 rounded-full flex items-center space-x-2"
                >
                  <span>Subscribe</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </form>
          ) : (
            <div className="text-center">
              <div className="inline-flex items-center space-x-2 text-green-400 mb-4">
                <CheckCircle className="w-6 h-6" />
                <span className="text-lg font-medium">Successfully Subscribed!</span>
              </div>
              <p className="text-gray-200">You'll receive our next update soon.</p>
            </div>
          )}
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <button
            onClick={() => setActiveTab('releases')}
            className={`flex items-center space-x-2 px-6 py-3 rounded-full transition-all duration-300 ${
              activeTab === 'releases' ? 'btn-primary' : 'btn-secondary'
            }`}
          >
            <Download className="w-4 h-4" />
            <span>Release Notes</span>
          </button>
          <button
            onClick={() => setActiveTab('roadmap')}
            className={`flex items-center space-x-2 px-6 py-3 rounded-full transition-all duration-300 ${
              activeTab === 'roadmap' ? 'btn-primary' : 'btn-secondary'
            }`}
          >
            <Calendar className="w-4 h-4" />
            <span>Roadmap</span>
          </button>
          <button
            onClick={() => setActiveTab('beta')}
            className={`flex items-center space-x-2 px-6 py-3 rounded-full transition-all duration-300 ${
              activeTab === 'beta' ? 'btn-primary' : 'btn-secondary'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Beta Program</span>
          </button>
        </div>

        {/* Content Sections */}
        {activeTab === 'releases' && (
          <div className="space-y-8">
            {releaseNotes.map((release, index) => (
              <div key={release.version} className="glass p-8 rounded-3xl fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <div className="flex items-center space-x-4 mb-2">
                      <h3 className="text-2xl font-bold text-white">{release.version}</h3>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        release.type === 'major' ? 'bg-blue-500/20 text-blue-400' :
                        release.type === 'minor' ? 'bg-green-500/20 text-green-400' :
                        'bg-yellow-500/20 text-yellow-400'
                      }`}>
                        {release.type}
                      </span>
                      {release.breaking && (
                        <span className="px-3 py-1 rounded-full text-sm font-medium bg-red-500/20 text-red-400">
                          Breaking Changes
                        </span>
                      )}
                    </div>
                    <p className="text-gray-400">{release.date}</p>
                  </div>
                </div>
                
                <h4 className="text-xl font-semibold text-white mb-4">{release.title}</h4>
                <p className="text-gray-200 mb-6">{release.description}</p>
                
                <div className="space-y-2">
                  {release.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                      <span className="text-gray-200">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'roadmap' && (
          <div className="space-y-12">
            {roadmapItems.map((quarter, quarterIndex) => (
              <div key={quarter.quarter} className="fade-in" style={{ animationDelay: `${quarterIndex * 0.1}s` }}>
                <div className="flex items-center space-x-4 mb-8">
                  {getStatusIcon(quarter.status)}
                  <h3 className="text-2xl font-bold text-white">{quarter.quarter}</h3>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(quarter.status)}`}>
                    {quarter.status.replace('-', ' ')}
                  </span>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {quarter.items.map((item, itemIndex) => (
                    <div key={itemIndex} className="glass p-6 rounded-2xl">
                      <div className="flex items-center space-x-3 mb-4">
                        <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                          {item.icon}
                        </div>
                        <h4 className="text-lg font-semibold text-white">{item.title}</h4>
                      </div>
                      <p className="text-gray-300 mb-4">{item.description}</p>
                      
                      {item.progress > 0 && (
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-400">Progress</span>
                            <span className="text-white">{item.progress}%</span>
                          </div>
                          <div className="w-full bg-white/10 rounded-full h-2">
                            <div 
                              className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-500"
                              style={{ width: `${item.progress}%` }}
                            ></div>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'beta' && (
          <div className="fade-in">
            <div className="glass p-8 rounded-3xl mb-12">
              <div className="text-center mb-8">
                <h3 className="text-3xl font-bold text-white mb-4">
                  Join Our Beta Program
                </h3>
                <p className="text-xl text-gray-200">
                  Get early access to new features and help shape the future of OmniFusion Music
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {betaFeatures.map((feature, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-white flex-shrink-0">
                      {feature.icon}
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-white mb-2">{feature.title}</h4>
                      <p className="text-gray-300">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="text-center">
                <button className="btn-primary px-8 py-4 text-lg rounded-full">
                  Apply for Beta Access
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

export default NewsletterUpdates 