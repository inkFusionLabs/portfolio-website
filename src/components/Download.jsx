import React, { useState } from 'react'
import { Download, Monitor, Apple, Terminal, Check, Star, Users, Code, Sparkles } from 'lucide-react'

const DownloadSection = () => {
  const [selectedPlatform, setSelectedPlatform] = useState('windows')

  const platforms = [
    {
      id: 'windows',
      name: 'Windows',
      icon: <Monitor className="w-6 h-6" />,
      version: 'v1.0.0',
      size: '45 MB',
      requirements: 'Windows 10 or later',
      downloadUrl: '#',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      id: 'macos',
      name: 'macOS',
      icon: <Apple className="w-6 h-6" />,
      version: 'v1.0.0',
      size: '52 MB',
      requirements: 'macOS 10.15 or later',
      downloadUrl: '#',
      color: 'from-gray-500 to-gray-700'
    },
    {
      id: 'linux',
      name: 'Linux',
      icon: <Terminal className="w-6 h-6" />,
      version: 'v1.0.0',
      size: '48 MB',
      requirements: 'Ubuntu 20.04+, Fedora 33+, Arch',
      downloadUrl: '#',
      color: 'from-orange-500 to-red-500'
    }
  ]

  const stats = [
    { icon: <Download className="w-6 h-6" />, value: '10K+', label: 'Downloads' },
    { icon: <Users className="w-6 h-6" />, value: '5K+', label: 'Active Users' },
    { icon: <Star className="w-6 h-6" />, value: '4.8', label: 'Rating' },
    { icon: <Code className="w-6 h-6" />, value: '100%', label: 'Open Source' }
  ]

  const selectedPlatformData = platforms.find(p => p.id === selectedPlatform)

  return (
    <section id="download" className="py-20 bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center px-4 py-2 glass rounded-full mb-6">
            <Sparkles className="w-4 h-4 text-yellow-400 mr-2" />
            <span className="text-sm font-medium">Ready to Download</span>
          </div>
          <h2 className="text-5xl md:text-6xl font-black text-white mb-8">
            Download
            <span className="gradient-text"> OmniFusion Music</span>
          </h2>
          <p className="text-xl md:text-2xl text-gray-200 max-w-4xl mx-auto leading-relaxed">
            Get started with the universal music command center. Free, open-source, and available on all major platforms.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-4">
                {stat.icon}
              </div>
              <div className="text-2xl font-bold text-white">{stat.value}</div>
              <div className="text-gray-400">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Platform Selection */}
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            {platforms.map((platform) => (
              <button
                key={platform.id}
                onClick={() => setSelectedPlatform(platform.id)}
                className={`p-6 rounded-2xl transition-all duration-300 ${
                  selectedPlatform === platform.id
                    ? 'glass border-2 border-blue-500'
                    : 'bg-gray-700 hover:bg-gray-600'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className={`w-10 h-10 rounded-lg bg-gradient-to-r ${platform.color} flex items-center justify-center`}>
                    {platform.icon}
                  </div>
                  <div className="text-left">
                    <div className="font-semibold text-white">{platform.name}</div>
                    <div className="text-sm text-gray-400">{platform.version}</div>
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Download Card */}
          <div className="glass p-8 rounded-3xl">
            <div className="flex flex-col lg:flex-row items-center justify-between">
              <div className="flex-1 mb-6 lg:mb-0">
                <div className="flex items-center space-x-4 mb-4">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${selectedPlatformData.color} flex items-center justify-center`}>
                    {selectedPlatformData.icon}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white">{selectedPlatformData.name}</h3>
                    <p className="text-gray-400">{selectedPlatformData.requirements}</p>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center space-x-2 text-gray-300">
                    <Check className="w-4 h-4 text-green-400" />
                    <span>Version {selectedPlatformData.version}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-300">
                    <Check className="w-4 h-4 text-green-400" />
                    <span>Size: {selectedPlatformData.size}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-300">
                    <Check className="w-4 h-4 text-green-400" />
                    <span>Free and Open Source</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col space-y-4">
                <button className="btn-primary flex items-center space-x-2 px-8 py-4">
                  <Download className="w-5 h-5" />
                  <span>Download for {selectedPlatformData.name}</span>
                </button>
                <button className="btn-secondary flex items-center space-x-2 px-8 py-4">
                  <Code className="w-5 h-5" />
                  <span>View Source Code</span>
                </button>
              </div>
            </div>
          </div>

          {/* Additional Info */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="glass p-6 rounded-2xl">
              <h3 className="text-xl font-bold text-white mb-4">What's Included</h3>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-green-400" />
                  <span>Multi-service music streaming</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-green-400" />
                  <span>Universal search across platforms</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-green-400" />
                  <span>Cross-platform playlist management</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-green-400" />
                  <span>Native desktop performance</span>
                </li>
              </ul>
            </div>

            <div className="glass p-6 rounded-2xl">
              <h3 className="text-xl font-bold text-white mb-4">System Requirements</h3>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-green-400" />
                  <span>4GB RAM minimum</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-green-400" />
                  <span>100MB free disk space</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-green-400" />
                  <span>Internet connection</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-green-400" />
                  <span>Active streaming service accounts</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default DownloadSection 