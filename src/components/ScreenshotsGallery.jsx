import React, { useState } from 'react'
import { ChevronLeft, ChevronRight, X, Play, Pause, Maximize, Smartphone, Monitor, Tablet, Zap, Music, Users, Search, Heart, Download } from 'lucide-react'

const ScreenshotsGallery = () => {
  const [selectedImage, setSelectedImage] = useState(null)
  const [activeTab, setActiveTab] = useState('overview')
  const [currentComparison, setCurrentComparison] = useState(0)

  const screenshots = {
    overview: [
      {
        id: 1,
        title: "Main Dashboard",
        description: "Unified music management interface with cross-platform integration",
        image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=600&fit=crop",
        platform: "Desktop",
        features: ["Universal Search", "Cross-Platform Playlists", "Smart Recommendations"]
      },
      {
        id: 2,
        title: "Music Player",
        description: "Advanced player with enhanced controls and visualizations",
        image: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=800&h=600&fit=crop",
        platform: "Desktop",
        features: ["High-Quality Audio", "Visualizations", "Advanced Controls"]
      },
      {
        id: 3,
        title: "Playlist Management",
        description: "Intuitive playlist creation and organization tools",
        image: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=800&h=600&fit=crop",
        platform: "Desktop",
        features: ["Drag & Drop", "Smart Organization", "Collaborative Editing"]
      }
    ],
    mobile: [
      {
        id: 4,
        title: "Mobile Dashboard",
        description: "Optimized mobile interface for on-the-go music management",
        image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=800&fit=crop",
        platform: "iOS",
        features: ["Touch-Optimized", "Gesture Controls", "Offline Mode"]
      },
      {
        id: 5,
        title: "Mobile Player",
        description: "Full-featured mobile music player with gesture controls",
        image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=800&fit=crop",
        platform: "Android",
        features: ["Gesture Controls", "Background Play", "Lock Screen Controls"]
      },
      {
        id: 6,
        title: "Mobile Search",
        description: "Voice-enabled search across all connected platforms",
        image: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=400&h=800&fit=crop",
        platform: "iOS/Android",
        features: ["Voice Search", "Quick Filters", "Recent Searches"]
      }
    ],
    features: [
      {
        id: 7,
        title: "Universal Search",
        description: "Search across all your music platforms simultaneously",
        image: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=800&h=600&fit=crop",
        feature: "Search",
        highlights: ["Cross-Platform", "Real-Time Results", "Smart Filters"]
      },
      {
        id: 8,
        title: "Social Features",
        description: "Share and discover music with the community",
        image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=600&fit=crop",
        feature: "Community",
        highlights: ["Social Sharing", "Collaborative Playlists", "User Profiles"]
      },
      {
        id: 9,
        title: "Advanced Analytics",
        description: "Detailed insights into your listening habits",
        image: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=800&h=600&fit=crop",
        feature: "Analytics",
        highlights: ["Listening Stats", "Trend Analysis", "Personalized Insights"]
      }
    ]
  }

  const beforeAfterComparisons = [
    {
      id: 1,
      title: "Multiple Apps vs OmniFusion",
      before: {
        title: "Before: Multiple Apps",
        description: "Managing music across 5+ different apps",
        image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=600&fit=crop",
        issues: ["Fragmented experience", "Different interfaces", "No cross-platform sync", "Multiple subscriptions"]
      },
      after: {
        title: "After: OmniFusion Music",
        description: "Unified experience across all platforms",
        image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=600&fit=crop",
        benefits: ["Single interface", "Universal search", "Cross-platform sync", "Cost effective"]
      }
    },
    {
      id: 2,
      title: "Playlist Management",
      before: {
        title: "Before: Manual Management",
        description: "Creating and managing playlists separately",
        image: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=800&h=600&fit=crop",
        issues: ["Duplicate work", "No sync between platforms", "Time consuming", "Inconsistent organization"]
      },
      after: {
        title: "After: Smart Management",
        description: "Intelligent playlist creation and sync",
        image: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=800&h=600&fit=crop",
        benefits: ["Auto-sync", "Smart organization", "Time saving", "Consistent experience"]
      }
    },
    {
      id: 3,
      title: "Music Discovery",
      before: {
        title: "Before: Limited Discovery",
        description: "Stuck within platform silos",
        image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=600&fit=crop",
        issues: ["Platform limitations", "Limited recommendations", "Missed opportunities", "Fragmented discovery"]
      },
      after: {
        title: "After: Universal Discovery",
        description: "Discover music across all platforms",
        image: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=800&h=600&fit=crop",
        benefits: ["Cross-platform discovery", "Smart recommendations", "Broader selection", "Unified experience"]
      }
    }
  ]

  const platformPreviews = [
    {
      platform: "Desktop",
      icon: <Monitor className="w-6 h-6" />,
      screenshots: [
        {
          title: "Main Interface",
          image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=600&fit=crop",
          description: "Full-featured desktop application with advanced controls"
        },
        {
          title: "Library View",
          image: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=800&h=600&fit=crop",
          description: "Comprehensive library management with smart organization"
        },
        {
          title: "Settings Panel",
          image: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=800&h=600&fit=crop",
          description: "Advanced settings and customization options"
        }
      ]
    },
    {
      platform: "Mobile",
      icon: <Smartphone className="w-6 h-6" />,
      screenshots: [
        {
          title: "Mobile Dashboard",
          image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=800&fit=crop",
          description: "Touch-optimized mobile interface"
        },
        {
          title: "Mobile Player",
          image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=800&fit=crop",
          description: "Full-featured mobile music player"
        },
        {
          title: "Mobile Search",
          image: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=400&h=800&fit=crop",
          description: "Voice-enabled mobile search"
        }
      ]
    },
    {
      platform: "Tablet",
      icon: <Tablet className="w-6 h-6" />,
      screenshots: [
        {
          title: "Tablet Interface",
          image: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=800&h=600&fit=crop",
          description: "Optimized tablet experience with larger touch targets"
        },
        {
          title: "Tablet Player",
          image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=600&fit=crop",
          description: "Enhanced tablet music player with gesture controls"
        },
        {
          title: "Tablet Library",
          image: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=800&h=600&fit=crop",
          description: "Comprehensive tablet library view"
        }
      ]
    }
  ]

  const openModal = (image) => {
    setSelectedImage(image)
  }

  const closeModal = () => {
    setSelectedImage(null)
  }

  const nextComparison = () => {
    setCurrentComparison((prev) => (prev + 1) % beforeAfterComparisons.length)
  }

  const prevComparison = () => {
    setCurrentComparison((prev) => (prev - 1 + beforeAfterComparisons.length) % beforeAfterComparisons.length)
  }

  return (
    <section id="screenshots" className="py-20 bg-gray-900 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl floating-element"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl floating-element-delayed"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 fade-in">
          <div className="inline-flex items-center px-4 py-2 glass rounded-full mb-6">
            <Maximize className="w-4 h-4 text-blue-400 mr-2" />
            <span className="text-sm font-medium">App Screenshots</span>
          </div>
          <h2 className="text-5xl md:text-6xl font-black text-white mb-8">
            See OmniFusion
            <span className="gradient-text"> In Action</span>
          </h2>
          <p className="text-xl md:text-2xl text-gray-200 max-w-4xl mx-auto leading-relaxed">
            Explore the beautiful interface and powerful features that make OmniFusion Music the ultimate music management solution
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-6 py-3 rounded-full transition-all duration-300 ${
              activeTab === 'overview' ? 'btn-primary' : 'btn-secondary'
            }`}
          >
            <Monitor className="w-4 h-4 mr-2" />
            Overview
          </button>
          <button
            onClick={() => setActiveTab('mobile')}
            className={`px-6 py-3 rounded-full transition-all duration-300 ${
              activeTab === 'mobile' ? 'btn-primary' : 'btn-secondary'
            }`}
          >
            <Smartphone className="w-4 h-4 mr-2" />
            Mobile
          </button>
          <button
            onClick={() => setActiveTab('features')}
            className={`px-6 py-3 rounded-full transition-all duration-300 ${
              activeTab === 'features' ? 'btn-primary' : 'btn-secondary'
            }`}
          >
            <Zap className="w-4 h-4 mr-2" />
            Features
          </button>
        </div>

        {/* Screenshots Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {screenshots[activeTab].map((screenshot, index) => (
            <div 
              key={screenshot.id} 
              className="glass rounded-3xl overflow-hidden fade-in hover:scale-105 transition-all duration-500 group cursor-pointer"
              style={{ animationDelay: `${index * 0.1}s` }}
              onClick={() => openModal(screenshot)}
            >
              <div className="relative">
                <img 
                  src={screenshot.image} 
                  alt={screenshot.title}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="bg-white/20 backdrop-blur-sm rounded-full p-4">
                    <Maximize className="w-8 h-8 text-white" />
                  </div>
                </div>
                <div className="absolute top-4 left-4">
                  <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm text-white font-medium">
                    {screenshot.platform}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-2">{screenshot.title}</h3>
                <p className="text-gray-300 mb-4">{screenshot.description}</p>
                <div className="flex flex-wrap gap-2">
                  {screenshot.features?.map((feature, idx) => (
                    <span key={idx} className="text-xs bg-white/10 px-2 py-1 rounded-full text-gray-300">
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Before/After Comparisons */}
        <div className="mb-20">
          <h3 className="text-3xl font-bold text-white text-center mb-12">Before vs After</h3>
          <div className="glass p-8 rounded-3xl">
            <div className="flex items-center justify-between mb-8">
              <h4 className="text-2xl font-bold text-white">{beforeAfterComparisons[currentComparison].title}</h4>
              <div className="flex space-x-2">
                <button onClick={prevComparison} className="btn-secondary p-2">
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button onClick={nextComparison} className="btn-secondary p-2">
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Before */}
              <div className="text-center">
                <div className="relative mb-6">
                  <img 
                    src={beforeAfterComparisons[currentComparison].before.image} 
                    alt="Before"
                    className="w-full h-64 object-cover rounded-2xl"
                  />
                  <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                    BEFORE
                  </div>
                </div>
                <h5 className="text-xl font-bold text-red-400 mb-2">{beforeAfterComparisons[currentComparison].before.title}</h5>
                <p className="text-gray-300 mb-4">{beforeAfterComparisons[currentComparison].before.description}</p>
                <ul className="space-y-2">
                  {beforeAfterComparisons[currentComparison].before.issues.map((issue, idx) => (
                    <li key={idx} className="flex items-center space-x-2 text-gray-400">
                      <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                      <span>{issue}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* After */}
              <div className="text-center">
                <div className="relative mb-6">
                  <img 
                    src={beforeAfterComparisons[currentComparison].after.image} 
                    alt="After"
                    className="w-full h-64 object-cover rounded-2xl"
                  />
                  <div className="absolute top-4 left-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                    AFTER
                  </div>
                </div>
                <h5 className="text-xl font-bold text-green-400 mb-2">{beforeAfterComparisons[currentComparison].after.title}</h5>
                <p className="text-gray-300 mb-4">{beforeAfterComparisons[currentComparison].after.description}</p>
                <ul className="space-y-2">
                  {beforeAfterComparisons[currentComparison].after.benefits.map((benefit, idx) => (
                    <li key={idx} className="flex items-center space-x-2 text-gray-400">
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Platform-Specific Previews */}
        <div>
          <h3 className="text-3xl font-bold text-white text-center mb-12">Platform-Specific Interfaces</h3>
          <div className="space-y-12">
            {platformPreviews.map((platform, index) => (
              <div key={platform.platform} className="glass p-8 rounded-3xl fade-in" style={{ animationDelay: `${index * 0.2}s` }}>
                <div className="flex items-center space-x-3 mb-8">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center text-white">
                    {platform.icon}
                  </div>
                  <h4 className="text-2xl font-bold text-white">{platform.platform}</h4>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {platform.screenshots.map((screenshot, idx) => (
                    <div key={idx} className="text-center group cursor-pointer" onClick={() => openModal(screenshot)}>
                      <div className="relative mb-4">
                        <img 
                          src={screenshot.image} 
                          alt={screenshot.title}
                          className="w-full h-48 object-cover rounded-2xl group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <div className="bg-white/20 backdrop-blur-sm rounded-full p-3">
                            <Maximize className="w-6 h-6 text-white" />
                          </div>
                        </div>
                      </div>
                      <h5 className="text-lg font-bold text-white mb-2">{screenshot.title}</h5>
                      <p className="text-gray-300 text-sm">{screenshot.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16 fade-in">
          <h3 className="text-2xl font-bold text-white mb-6">Experience It Yourself</h3>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Download OmniFusion Music today and transform your music listening experience across all platforms.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="btn-primary flex items-center space-x-3">
              <Download className="w-5 h-5" />
              <span>Download Now</span>
            </button>
            <button className="btn-secondary flex items-center space-x-3">
              <Play className="w-5 h-5" />
              <span>Watch Demo</span>
            </button>
          </div>
        </div>
      </div>

      {/* Modal */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="relative max-w-4xl w-full">
            <button 
              onClick={closeModal}
              className="absolute top-4 right-4 z-10 bg-white/20 backdrop-blur-sm rounded-full p-2 hover:bg-white/30 transition-colors"
            >
              <X className="w-6 h-6 text-white" />
            </button>
            <img 
              src={selectedImage.image} 
              alt={selectedImage.title}
              className="w-full h-auto rounded-2xl"
            />
            <div className="absolute bottom-4 left-4 right-4 bg-black/60 backdrop-blur-sm rounded-2xl p-4">
              <h3 className="text-xl font-bold text-white mb-2">{selectedImage.title}</h3>
              <p className="text-gray-200">{selectedImage.description}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

export default ScreenshotsGallery 