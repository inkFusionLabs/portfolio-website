import React, { useState, useEffect } from 'react'
import { Star, Download, Users, GitBranch, Heart, MessageCircle, ThumbsUp, Award, RefreshCw } from 'lucide-react'
import useStatistics from '../hooks/useStatistics.js'

const SocialProof = () => {
  const { formattedStats, loading, error, refresh } = useStatistics()
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Intersection Observer for animations
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    const element = document.getElementById('social-proof')
    if (element) {
      observer.observe(element)
    }

    return () => {
      observer.disconnect()
    }
  }, [])

  const testimonials = [
    {
      id: 1,
      name: "Sarah Chen",
      role: "Music Producer",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      content: "OmniFusion Music has completely transformed my workflow. I can now manage all my playlists across different platforms seamlessly. The interface is beautiful and intuitive!",
      platform: "Spotify"
    },
    {
      id: 2,
      name: "Marcus Rodriguez",
      role: "DJ & Content Creator",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      content: "As someone who uses multiple streaming services, this app is a game-changer. The universal search feature alone saves me hours every week.",
      platform: "Apple Music"
    },
    {
      id: 3,
      name: "Emma Thompson",
      role: "Music Blogger",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      content: "The cross-platform playlist management is incredible. I can finally organize my music library properly across all my streaming services.",
      platform: "YouTube Music"
    },
    {
      id: 4,
      name: "David Kim",
      role: "Software Developer",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      content: "Being open-source, I love that I can contribute to this project. The code quality is excellent and the community is very welcoming.",
      platform: "Tidal"
    }
  ]

  const communityShowcase = [
    {
      id: 1,
      type: "playlist",
      title: "Ultimate Workout Mix",
      creator: "FitnessFreak",
      platforms: ["Spotify", "Apple Music"],
      likes: 234,
      image: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=300&h=200&fit=crop"
    },
    {
      id: 2,
      type: "theme",
      title: "Dark Mode Theme",
      creator: "DesignerPro",
      platforms: ["All Platforms"],
      likes: 156,
      image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=300&h=200&fit=crop"
    },
    {
      id: 3,
      type: "integration",
      title: "Discord Bot Integration",
      creator: "TechWizard",
      platforms: ["Discord"],
      likes: 89,
      image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=300&h=200&fit=crop"
    }
  ]

  const stats = [
    {
      icon: <Download className="w-6 h-6" />,
      value: loading ? "..." : formattedStats.downloads,
      label: "Downloads",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: <Star className="w-6 h-6" />,
      value: loading ? "..." : formattedStats.stars,
      label: "GitHub Stars",
      color: "from-yellow-500 to-orange-500"
    },
    {
      icon: <Users className="w-6 h-6" />,
      value: loading ? "..." : formattedStats.contributors,
      label: "Contributors",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: <Heart className="w-6 h-6" />,
      value: loading ? "..." : `${formattedStats.userRating}/5`,
      label: "User Rating",
      color: "from-pink-500 to-rose-500"
    }
  ]

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-400'}`}
      />
    ))
  }

  return (
    <section id="social-proof" className="py-20 bg-gray-800 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl floating-element"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl floating-element-delayed"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 fade-in">
          <div className="inline-flex items-center px-4 py-2 glass rounded-full mb-6">
            <Award className="w-4 h-4 text-yellow-400 mr-2" />
            <span className="text-sm font-medium">Community Trust</span>
          </div>
          <h2 className="text-5xl md:text-6xl font-black text-white mb-8">
            Loved by
            <span className="gradient-text"> Music Lovers</span>
          </h2>
          <p className="text-xl md:text-2xl text-gray-200 max-w-4xl mx-auto leading-relaxed">
            Join thousands of users who have transformed their music experience with OmniFusion Music
          </p>
        </div>

        {/* Stats Section */}
        <div className="relative">
          {error && (
            <div className="text-center mb-4">
              <div className="inline-flex items-center px-4 py-2 bg-red-500/20 text-red-400 rounded-full text-sm">
                <span>⚠️ Unable to load live stats. Using cached data.</span>
              </div>
            </div>
          )}
          
          <div className="flex justify-center mb-4">
            <button
              onClick={refresh}
              disabled={loading}
              className="flex items-center space-x-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              <span className="text-sm">Refresh Stats</span>
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
            {stats.map((stat, index) => (
              <div key={index} className="text-center fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${stat.color} rounded-2xl mb-4 shadow-lg`}>
                  {stat.icon}
                </div>
                <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
                <div className="text-gray-400 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonials Section */}
        <div className="mb-20">
          <h3 className="text-3xl font-bold text-white text-center mb-12">What Our Users Say</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <div 
                key={testimonial.id} 
                className="glass p-8 rounded-3xl fade-in hover:scale-105 transition-all duration-500"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="flex items-start space-x-4 mb-6">
                  <img 
                    src={testimonial.avatar} 
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-full object-cover border-2 border-white/20"
                  />
                  <div className="flex-1">
                    <h4 className="text-xl font-bold text-white">{testimonial.name}</h4>
                    <p className="text-gray-400">{testimonial.role}</p>
                    <div className="flex items-center space-x-2 mt-2">
                      <div className="flex">
                        {renderStars(testimonial.rating)}
                      </div>
                      <span className="text-sm text-gray-500">•</span>
                      <span className="text-sm text-gray-500">{testimonial.platform}</span>
                    </div>
                  </div>
                </div>
                <p className="text-gray-200 leading-relaxed text-lg italic">"{testimonial.content}"</p>
              </div>
            ))}
          </div>
        </div>

        {/* GitHub Integration */}
        <div className="glass p-8 rounded-3xl mb-20 fade-in">
          <div className="flex flex-col lg:flex-row items-center justify-between">
            <div className="flex-1 mb-8 lg:mb-0">
              <h3 className="text-3xl font-bold text-white mb-4">Open Source & Community Driven</h3>
              <p className="text-xl text-gray-200 mb-6">
                OmniFusion Music is built by the community, for the community. 
                Join our open-source project and help shape the future of music streaming.
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center space-x-2 bg-white/10 px-4 py-2 rounded-full">
                  <Star className="w-5 h-5 text-yellow-400" />
                  <span className="text-white font-semibold">{githubStars} stars</span>
                </div>
                <div className="flex items-center space-x-2 bg-white/10 px-4 py-2 rounded-full">
                  <GitBranch className="w-5 h-5 text-blue-400" />
                  <span className="text-white font-semibold">{contributors} contributors</span>
                </div>
                <div className="flex items-center space-x-2 bg-white/10 px-4 py-2 rounded-full">
                  <Download className="w-5 h-5 text-green-400" />
                  <span className="text-white font-semibold">{downloadCount.toLocaleString()}+ downloads</span>
                </div>
              </div>
            </div>
            <div className="flex flex-col space-y-4">
              <button className="btn-primary flex items-center space-x-3">
                <Star className="w-5 h-5" />
                <span>Star on GitHub</span>
              </button>
              <button className="btn-secondary flex items-center space-x-3">
                <GitBranch className="w-5 h-5" />
                <span>Contribute</span>
              </button>
            </div>
          </div>
        </div>

        {/* Community Showcase */}
        <div>
          <h3 className="text-3xl font-bold text-white text-center mb-12">Community Showcase</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {communityShowcase.map((item, index) => (
              <div 
                key={item.id} 
                className="glass rounded-3xl overflow-hidden fade-in hover:scale-105 transition-all duration-500 group"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={item.image} 
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <h4 className="text-white font-bold text-lg mb-1">{item.title}</h4>
                    <p className="text-gray-300 text-sm">by {item.creator}</p>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex flex-wrap gap-2">
                      {item.platforms.map((platform, idx) => (
                        <span key={idx} className="text-xs bg-white/10 px-2 py-1 rounded-full text-gray-300">
                          {platform}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center space-x-2 text-gray-400">
                      <ThumbsUp className="w-4 h-4" />
                      <span className="text-sm">{item.likes}</span>
                    </div>
                  </div>
                  <button className="w-full btn-secondary text-sm py-2">
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16 fade-in">
          <h3 className="text-2xl font-bold text-white mb-6">Join the Community</h3>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Be part of the growing community of music lovers who have discovered the power of unified music streaming.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="btn-primary flex items-center space-x-3">
              <Download className="w-5 h-5" />
              <span>Download Now</span>
            </button>
            <button className="btn-secondary flex items-center space-x-3">
              <MessageCircle className="w-5 h-5" />
              <span>Join Discord</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default SocialProof 