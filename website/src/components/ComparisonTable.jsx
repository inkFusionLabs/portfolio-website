import React, { useState } from 'react'
import { Check, X, Star, DollarSign, Smartphone, Monitor, Globe, Music } from 'lucide-react'

const ComparisonTable = () => {
  const [activeTab, setActiveTab] = useState('features')

  const features = [
    {
      feature: "Universal Search",
      omnifusion: true,
      spotify: false,
      appleMusic: false,
      youtubeMusic: false,
      tidal: false
    },
    {
      feature: "Cross-Platform Playlists",
      omnifusion: true,
      spotify: false,
      appleMusic: false,
      youtubeMusic: false,
      tidal: false
    },
    {
      feature: "Multi-Service Integration",
      omnifusion: true,
      spotify: false,
      appleMusic: false,
      youtubeMusic: false,
      tidal: false
    },
    {
      feature: "Offline Mode",
      omnifusion: true,
      spotify: true,
      appleMusic: true,
      youtubeMusic: true,
      tidal: true
    },
    {
      feature: "Advanced Analytics",
      omnifusion: true,
      spotify: false,
      appleMusic: false,
      youtubeMusic: false,
      tidal: false
    },
    {
      feature: "Custom Themes",
      omnifusion: true,
      spotify: false,
      appleMusic: false,
      youtubeMusic: false,
      tidal: false
    },
    {
      feature: "Open Source",
      omnifusion: true,
      spotify: false,
      appleMusic: false,
      youtubeMusic: false,
      tidal: false
    },
    {
      feature: "Community Features",
      omnifusion: true,
      spotify: false,
      appleMusic: false,
      youtubeMusic: false,
      tidal: false
    }
  ]

  const pricing = [
    {
      plan: "Free Tier",
      omnifusion: "Full access to core features",
      spotify: "Limited features with ads",
      appleMusic: "3-month trial only",
      youtubeMusic: "Limited features with ads",
      tidal: "30-day trial only"
    },
    {
      plan: "Premium",
      omnifusion: "$4.99/month",
      spotify: "$9.99/month",
      appleMusic: "$9.99/month",
      youtubeMusic: "$9.99/month",
      tidal: "$9.99/month"
    },
    {
      plan: "Family Plan",
      omnifusion: "$7.99/month (6 users)",
      spotify: "$14.99/month (6 users)",
      appleMusic: "$14.99/month (6 users)",
      youtubeMusic: "$14.99/month (6 users)",
      tidal: "$14.99/month (6 users)"
    },
    {
      plan: "Student Discount",
      omnifusion: "$2.49/month",
      spotify: "$4.99/month",
      appleMusic: "$4.99/month",
      youtubeMusic: "$4.99/month",
      tidal: "$4.99/month"
    }
  ]

  const platforms = [
    {
      platform: "Windows",
      omnifusion: true,
      spotify: true,
      appleMusic: false,
      youtubeMusic: true,
      tidal: true
    },
    {
      platform: "macOS",
      omnifusion: true,
      spotify: true,
      appleMusic: true,
      youtubeMusic: true,
      tidal: true
    },
    {
      platform: "Linux",
      omnifusion: true,
      spotify: true,
      appleMusic: false,
      youtubeMusic: true,
      tidal: true
    },
    {
      platform: "iOS",
      omnifusion: "Coming Soon",
      spotify: true,
      appleMusic: true,
      youtubeMusic: true,
      tidal: true
    },
    {
      platform: "Android",
      omnifusion: "Coming Soon",
      spotify: true,
      appleMusic: false,
      youtubeMusic: true,
      tidal: true
    },
    {
      platform: "Web",
      omnifusion: true,
      spotify: true,
      appleMusic: true,
      youtubeMusic: true,
      tidal: true
    }
  ]

  const streamingServices = [
    {
      service: "Spotify",
      omnifusion: true,
      spotify: true,
      appleMusic: false,
      youtubeMusic: false,
      tidal: false
    },
    {
      service: "Apple Music",
      omnifusion: true,
      spotify: false,
      appleMusic: true,
      youtubeMusic: false,
      tidal: false
    },
    {
      service: "YouTube Music",
      omnifusion: true,
      spotify: false,
      appleMusic: false,
      youtubeMusic: true,
      tidal: false
    },
    {
      service: "Tidal",
      omnifusion: true,
      spotify: false,
      appleMusic: false,
      youtubeMusic: false,
      tidal: true
    },
    {
      service: "Deezer",
      omnifusion: true,
      spotify: false,
      appleMusic: false,
      youtubeMusic: false,
      tidal: false
    },
    {
      service: "Amazon Music",
      omnifusion: true,
      spotify: false,
      appleMusic: false,
      youtubeMusic: false,
      tidal: false
    }
  ]

  const renderCheckmark = (value) => {
    if (value === true) {
      return <Check className="w-5 h-5 text-green-400" />
    } else if (value === false) {
      return <X className="w-5 h-5 text-red-400" />
    } else {
      return <span className="text-sm text-yellow-400 font-medium">{value}</span>
    }
  }

  const tabs = [
    { id: 'features', label: 'Features', icon: <Star className="w-4 h-4" /> },
    { id: 'pricing', label: 'Pricing', icon: <DollarSign className="w-4 h-4" /> },
    { id: 'platforms', label: 'Platforms', icon: <Monitor className="w-4 h-4" /> },
    { id: 'services', label: 'Streaming Services', icon: <Music className="w-4 h-4" /> }
  ]

  const getTableData = () => {
    switch (activeTab) {
      case 'features':
        return features
      case 'pricing':
        return pricing
      case 'platforms':
        return platforms
      case 'services':
        return streamingServices
      default:
        return features
    }
  }

  return (
    <section id="comparison" className="py-20 bg-gray-900 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl floating-element"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl floating-element-delayed"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 fade-in">
          <div className="inline-flex items-center px-4 py-2 glass rounded-full mb-6">
            <Globe className="w-4 h-4 text-green-400 mr-2" />
            <span className="text-sm font-medium">Comparison</span>
          </div>
          <h2 className="text-5xl md:text-6xl font-black text-white mb-8">
            How Does
            <span className="gradient-text"> OmniFusion</span> Compare?
          </h2>
          <p className="text-xl md:text-2xl text-gray-200 max-w-4xl mx-auto leading-relaxed">
            See how OmniFusion Music stacks up against other music apps and streaming services
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-6 py-3 rounded-full transition-all duration-300 ${
                activeTab === tab.id ? 'btn-primary' : 'btn-secondary'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Comparison Table */}
        <div className="glass rounded-3xl p-8 overflow-x-auto">
          <div className="min-w-full">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-4 px-6 text-lg font-bold text-white">
                    {activeTab === 'features' && 'Feature'}
                    {activeTab === 'pricing' && 'Plan'}
                    {activeTab === 'platforms' && 'Platform'}
                    {activeTab === 'services' && 'Service'}
                  </th>
                  <th className="text-center py-4 px-6">
                    <div className="flex flex-col items-center">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mb-2">
                        <Music className="w-6 h-6 text-white" />
                      </div>
                      <span className="text-lg font-bold text-white">OmniFusion</span>
                      <span className="text-sm text-green-400">Recommended</span>
                    </div>
                  </th>
                  <th className="text-center py-4 px-6">
                    <div className="flex flex-col items-center">
                      <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center mb-2">
                        <Music className="w-6 h-6 text-white" />
                      </div>
                      <span className="text-lg font-bold text-white">Spotify</span>
                    </div>
                  </th>
                  <th className="text-center py-4 px-6">
                    <div className="flex flex-col items-center">
                      <div className="w-12 h-12 bg-red-500 rounded-xl flex items-center justify-center mb-2">
                        <Music className="w-6 h-6 text-white" />
                      </div>
                      <span className="text-lg font-bold text-white">Apple Music</span>
                    </div>
                  </th>
                  <th className="text-center py-4 px-6">
                    <div className="flex flex-col items-center">
                      <div className="w-12 h-12 bg-red-600 rounded-xl flex items-center justify-center mb-2">
                        <Music className="w-6 h-6 text-white" />
                      </div>
                      <span className="text-lg font-bold text-white">YouTube Music</span>
                    </div>
                  </th>
                  <th className="text-center py-4 px-6">
                    <div className="flex flex-col items-center">
                      <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center mb-2">
                        <Music className="w-6 h-6 text-white" />
                      </div>
                      <span className="text-lg font-bold text-white">Tidal</span>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {getTableData().map((row, index) => (
                  <tr key={index} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                    <td className="py-4 px-6 text-white font-medium">
                      {row.feature || row.plan || row.platform || row.service}
                    </td>
                    <td className="py-4 px-6 text-center">
                      <div className="flex justify-center">
                        {renderCheckmark(row.omnifusion)}
                      </div>
                    </td>
                    <td className="py-4 px-6 text-center">
                      <div className="flex justify-center">
                        {renderCheckmark(row.spotify)}
                      </div>
                    </td>
                    <td className="py-4 px-6 text-center">
                      <div className="flex justify-center">
                        {renderCheckmark(row.appleMusic)}
                      </div>
                    </td>
                    <td className="py-4 px-6 text-center">
                      <div className="flex justify-center">
                        {renderCheckmark(row.youtubeMusic)}
                      </div>
                    </td>
                    <td className="py-4 px-6 text-center">
                      <div className="flex justify-center">
                        {renderCheckmark(row.tidal)}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16 fade-in">
          <div className="glass p-8 rounded-3xl max-w-4xl mx-auto">
            <h3 className="text-3xl font-bold text-white mb-4">
              Ready to Experience the Difference?
            </h3>
            <p className="text-xl text-gray-200 mb-8">
              Join thousands of users who have switched to OmniFusion Music for a better music experience
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button className="btn-primary px-8 py-4 text-lg rounded-full">
                Download Now
              </button>
              <button className="btn-secondary px-8 py-4 text-lg rounded-full">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ComparisonTable 