import React, { useState } from 'react'
import { Plus, Bug, Zap, Shield, Star, Download, Users, Palette, Globe, Smartphone } from 'lucide-react'

const Changelog = () => {
  const [selectedVersion, setSelectedVersion] = useState('latest')

  const changelogData = [
    {
      version: "v1.2.0",
      date: "December 15, 2024",
      codename: "Community Edition",
      type: "major",
      description: "Major update introducing community features and enhanced social integration",
      changes: {
        new: [
          "Community playlists and sharing",
          "User profiles and social features",
          "Collaborative playlist editing",
          "Social media integration",
          "Community forums and discussions"
        ],
        improved: [
          "Enhanced UI/UX design",
          "Better performance optimization",
          "Improved search algorithms",
          "More responsive interface"
        ],
        fixed: [
          "Fixed playlist sync issues",
          "Resolved audio playback bugs",
          "Fixed cross-platform compatibility",
          "Resolved memory leak issues"
        ]
      },
      icon: <Users className="w-6 h-6" />,
      color: "from-blue-500 to-cyan-500"
    },
    {
      version: "v1.1.5",
      date: "November 28, 2024",
      codename: "Performance Boost",
      type: "minor",
      description: "Performance improvements and bug fixes",
      changes: {
        new: [
          "Advanced caching system",
          "Background sync improvements"
        ],
        improved: [
          "Faster app startup time",
          "Reduced memory usage",
          "Better offline mode",
          "Enhanced error handling"
        ],
        fixed: [
          "Fixed high CPU usage",
          "Resolved network timeout issues",
          "Fixed playlist corruption bugs"
        ]
      },
      icon: <Zap className="w-6 h-6" />,
      color: "from-yellow-500 to-orange-500"
    },
    {
      version: "v1.1.0",
      date: "October 12, 2024",
      codename: "Multi-Platform",
      type: "major",
      description: "Added support for additional streaming platforms",
      changes: {
        new: [
          "Amazon Music integration",
          "Deezer support",
          "Enhanced Tidal features",
          "YouTube Music improvements"
        ],
        improved: [
          "Better platform switching",
          "Improved audio quality",
          "Enhanced metadata handling"
        ],
        fixed: [
          "Fixed authentication issues",
          "Resolved playback interruptions",
          "Fixed metadata sync problems"
        ]
      },
      icon: <Globe className="w-6 h-6" />,
      color: "from-green-500 to-emerald-500"
    },
    {
      version: "v1.0.5",
      date: "September 5, 2024",
      codename: "Stability Update",
      type: "patch",
      description: "Bug fixes and stability improvements",
      changes: {
        new: [],
        improved: [
          "Better error messages",
          "Improved crash handling"
        ],
        fixed: [
          "Fixed app crashes on startup",
          "Resolved playlist loading issues",
          "Fixed search functionality",
          "Resolved audio sync problems"
        ]
      },
      icon: <Shield className="w-6 h-6" />,
      color: "from-red-500 to-pink-500"
    },
    {
      version: "v1.0.0",
      date: "August 1, 2024",
      codename: "Initial Release",
      type: "major",
      description: "First stable release of OmniFusion Music",
      changes: {
        new: [
          "Core desktop application",
          "Spotify integration",
          "Apple Music support",
          "Basic playlist management",
          "Universal search",
          "Cross-platform compatibility"
        ],
        improved: [],
        fixed: []
      },
      icon: <Star className="w-6 h-6" />,
      color: "from-purple-500 to-pink-500"
    }
  ]

  const getTypeColor = (type) => {
    switch (type) {
      case 'major': return 'from-purple-500 to-pink-500'
      case 'minor': return 'from-blue-500 to-cyan-500'
      case 'patch': return 'from-green-500 to-emerald-500'
      default: return 'from-gray-500 to-slate-500'
    }
  }

  const getTypeLabel = (type) => {
    switch (type) {
      case 'major': return 'Major'
      case 'minor': return 'Minor'
      case 'patch': return 'Patch'
      default: return 'Update'
    }
  }

  const renderChanges = (changes) => {
    return (
      <div className="space-y-6">
        {changes.new.length > 0 && (
          <div>
            <h4 className="text-lg font-semibold text-green-400 mb-3 flex items-center">
              <Plus className="w-5 h-5 mr-2" />
              New Features
            </h4>
            <ul className="space-y-2">
              {changes.new.map((feature, index) => (
                <li key={index} className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-gray-200">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
        
        {changes.improved.length > 0 && (
          <div>
            <h4 className="text-lg font-semibold text-blue-400 mb-3 flex items-center">
              <Zap className="w-5 h-5 mr-2" />
              Improvements
            </h4>
            <ul className="space-y-2">
              {changes.improved.map((improvement, index) => (
                <li key={index} className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-gray-200">{improvement}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
        
        {changes.fixed.length > 0 && (
          <div>
            <h4 className="text-lg font-semibold text-red-400 mb-3 flex items-center">
              <Bug className="w-5 h-5 mr-2" />
              Bug Fixes
            </h4>
            <ul className="space-y-2">
              {changes.fixed.map((fix, index) => (
                <li key={index} className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-gray-200">{fix}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    )
  }

  return (
    <section id="changelog" className="py-20 bg-gray-800 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl floating-element"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl floating-element-delayed"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 fade-in">
          <div className="inline-flex items-center px-4 py-2 glass rounded-full mb-6">
            <Download className="w-4 h-4 text-green-400 mr-2" />
            <span className="text-sm font-medium">Latest Updates</span>
          </div>
          <h2 className="text-5xl md:text-6xl font-black text-white mb-8">
            What's
            <span className="gradient-text"> New</span>
          </h2>
          <p className="text-xl md:text-2xl text-gray-200 max-w-4xl mx-auto leading-relaxed">
            Stay up to date with the latest features, improvements, and bug fixes in OmniFusion Music
          </p>
        </div>

        {/* Version Navigation */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {changelogData.map((release, index) => (
            <button
              key={release.version}
              onClick={() => setSelectedVersion(release.version)}
              className={`px-6 py-3 rounded-full transition-all duration-300 ${
                selectedVersion === release.version ? 'btn-primary' : 'btn-secondary'
              }`}
            >
              <span className="font-semibold">{release.version}</span>
              <span className="text-xs ml-2 opacity-75">{release.codename}</span>
            </button>
          ))}
        </div>

        {/* Changelog Content */}
        <div className="fade-in">
          {changelogData.map((release) => (
            release.version === selectedVersion && (
              <div key={release.version} className="glass p-8 rounded-3xl">
                <div className="flex items-start space-x-6 mb-8">
                  <div className={`w-16 h-16 bg-gradient-to-r ${release.color} rounded-2xl flex items-center justify-center text-white shadow-lg`}>
                    {release.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="text-3xl font-bold text-white mb-2">{release.version}</h3>
                        <p className="text-xl text-gray-300">{release.codename}</p>
                      </div>
                      <div className="text-right">
                        <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-gradient-to-r ${getTypeColor(release.type)} text-white`}>
                          {getTypeLabel(release.type)}
                        </div>
                        <p className="text-gray-400 text-sm mt-2">{release.date}</p>
                      </div>
                    </div>
                    <p className="text-gray-200 text-lg">{release.description}</p>
                  </div>
                </div>
                
                {renderChanges(release.changes)}
              </div>
            )
          ))}
        </div>

        {/* Download Section */}
        <div className="text-center mt-16 fade-in">
          <h3 className="text-2xl font-bold text-white mb-6">Get the Latest Version</h3>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Download the newest version of OmniFusion Music and experience all the latest features and improvements.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="btn-primary flex items-center space-x-3">
              <Download className="w-5 h-5" />
              <span>Download Latest</span>
            </button>
            <button className="btn-secondary flex items-center space-x-3">
              <Star className="w-5 h-5" />
              <span>View All Releases</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Changelog 