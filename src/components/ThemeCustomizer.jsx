import React, { useState } from 'react'
import { Palette, Monitor, Smartphone, Tablet, Download, Share2 } from 'lucide-react'

const ThemeCustomizer = () => {
  const [selectedTheme, setSelectedTheme] = useState('default')
  const [selectedDevice, setSelectedDevice] = useState('desktop')

  const themes = [
    {
      id: 'default',
      name: 'OmniFusion Dark',
      description: 'Classic dark theme with blue accents',
      colors: {
        primary: '#3b82f6',
        secondary: '#8b5cf6',
        accent: '#06b6d4',
        background: '#0f172a',
        surface: '#1e293b'
      }
    },
    {
      id: 'sunset',
      name: 'Sunset Vibes',
      description: 'Warm orange and pink gradient',
      colors: {
        primary: '#f97316',
        secondary: '#ec4899',
        accent: '#f59e0b',
        background: '#1c1917',
        surface: '#292524'
      }
    },
    {
      id: 'ocean',
      name: 'Ocean Deep',
      description: 'Cool blue and teal tones',
      colors: {
        primary: '#0891b2',
        secondary: '#0ea5e9',
        accent: '#22d3ee',
        background: '#0c4a6e',
        surface: '#0e7490'
      }
    },
    {
      id: 'forest',
      name: 'Forest Green',
      description: 'Natural green and emerald',
      colors: {
        primary: '#059669',
        secondary: '#10b981',
        accent: '#34d399',
        background: '#064e3b',
        surface: '#065f46'
      }
    },
    {
      id: 'purple',
      name: 'Royal Purple',
      description: 'Rich purple and violet',
      colors: {
        primary: '#7c3aed',
        secondary: '#a855f7',
        accent: '#c084fc',
        background: '#2e1065',
        surface: '#4c1d95'
      }
    },
    {
      id: 'neon',
      name: 'Neon Cyber',
      description: 'Bright neon colors',
      colors: {
        primary: '#00ff88',
        secondary: '#ff0080',
        accent: '#00ffff',
        background: '#000000',
        surface: '#1a1a1a'
      }
    }
  ]

  const devices = [
    { id: 'desktop', name: 'Desktop', icon: Monitor },
    { id: 'tablet', name: 'Tablet', icon: Tablet },
    { id: 'mobile', name: 'Mobile', icon: Smartphone }
  ]

  const currentTheme = themes.find(t => t.id === selectedTheme)

  const getDeviceClass = () => {
    switch (selectedDevice) {
      case 'mobile':
        return 'w-80 h-[600px]'
      case 'tablet':
        return 'w-96 h-[700px]'
      default:
        return 'w-full h-[500px]'
    }
  }

  return (
    <div className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 glass rounded-full mb-6">
            <Palette className="w-4 h-4 text-purple-400 mr-2" />
            <span className="text-sm font-medium">Theme Customizer</span>
          </div>
          <h2 className="text-5xl md:text-6xl font-black text-white mb-8">
            Customize Your
            <span className="gradient-text"> Experience</span>
          </h2>
          <p className="text-xl md:text-2xl text-gray-200 max-w-4xl mx-auto leading-relaxed">
            Preview different themes and see how OmniFusion Music looks on various devices
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Theme Selector */}
          <div className="space-y-8">
            <div className="glass p-8 rounded-3xl">
              <h3 className="text-2xl font-bold text-white mb-6">Choose Your Theme</h3>
              <div className="grid grid-cols-2 gap-4">
                {themes.map((theme) => (
                  <div
                    key={theme.id}
                    onClick={() => setSelectedTheme(theme.id)}
                    className={`p-4 rounded-xl cursor-pointer transition-all ${
                      selectedTheme === theme.id
                        ? 'ring-2 ring-blue-500 bg-white/20'
                        : 'bg-white/5 hover:bg-white/10'
                    }`}
                  >
                    <div className="flex items-center space-x-3 mb-3">
                      <div
                        className="w-6 h-6 rounded-full"
                        style={{ backgroundColor: theme.colors.primary }}
                      ></div>
                      <div className="text-white font-medium">{theme.name}</div>
                    </div>
                    <p className="text-gray-400 text-sm">{theme.description}</p>
                    <div className="flex space-x-2 mt-3">
                      {Object.values(theme.colors).slice(0, 4).map((color, index) => (
                        <div
                          key={index}
                          className="w-4 h-4 rounded-full"
                          style={{ backgroundColor: color }}
                        ></div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Device Selector */}
            <div className="glass p-8 rounded-3xl">
              <h3 className="text-2xl font-bold text-white mb-6">Device Preview</h3>
              <div className="flex space-x-4">
                {devices.map((device) => (
                  <button
                    key={device.id}
                    onClick={() => setSelectedDevice(device.id)}
                    className={`flex flex-col items-center space-y-2 p-4 rounded-xl transition-all ${
                      selectedDevice === device.id
                        ? 'bg-white/20 ring-2 ring-blue-500'
                        : 'bg-white/5 hover:bg-white/10'
                    }`}
                  >
                    <device.icon className="w-8 h-8 text-white" />
                    <span className="text-white text-sm">{device.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Theme Info */}
            <div className="glass p-8 rounded-3xl">
              <h3 className="text-2xl font-bold text-white mb-6">Theme Details</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="text-white font-semibold mb-2">{currentTheme.name}</h4>
                  <p className="text-gray-300">{currentTheme.description}</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {Object.entries(currentTheme.colors).map(([key, color]) => (
                    <div key={key} className="flex items-center space-x-3">
                      <div
                        className="w-6 h-6 rounded-full"
                        style={{ backgroundColor: color }}
                      ></div>
                      <div>
                        <div className="text-white text-sm capitalize">{key}</div>
                        <div className="text-gray-400 text-xs">{color}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Preview */}
          <div className="space-y-8">
            <div className="glass p-8 rounded-3xl">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-white">Live Preview</h3>
                <div className="flex space-x-2">
                  <button className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors">
                    <Download className="w-5 h-5 text-white" />
                  </button>
                  <button className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors">
                    <Share2 className="w-5 h-5 text-white" />
                  </button>
                </div>
              </div>
              
              {/* App Preview */}
              <div
                className={`${getDeviceClass()} mx-auto rounded-2xl overflow-hidden shadow-2xl`}
                style={{
                  backgroundColor: currentTheme.colors.background,
                  border: `2px solid ${currentTheme.colors.surface}`
                }}
              >
                {/* App Header */}
                <div
                  className="h-16 flex items-center justify-between px-6"
                  style={{ backgroundColor: currentTheme.colors.surface }}
                >
                  <div className="flex items-center space-x-3">
                    <div
                      className="w-8 h-8 rounded-lg"
                      style={{ backgroundColor: currentTheme.colors.primary }}
                    ></div>
                    <span className="text-white font-semibold">OmniFusion</span>
                  </div>
                  <div className="flex space-x-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: currentTheme.colors.accent }}
                    ></div>
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: currentTheme.colors.secondary }}
                    ></div>
                  </div>
                </div>

                {/* App Content */}
                <div className="p-6 space-y-4">
                  {/* Sidebar */}
                  <div className="flex space-x-4">
                    <div
                      className="w-20 h-32 rounded-lg"
                      style={{ backgroundColor: currentTheme.colors.surface }}
                    ></div>
                    <div className="flex-1 space-y-3">
                      <div
                        className="h-8 rounded-lg"
                        style={{ backgroundColor: currentTheme.colors.primary }}
                      ></div>
                      <div
                        className="h-6 rounded-lg"
                        style={{ backgroundColor: currentTheme.colors.surface }}
                      ></div>
                      <div
                        className="h-6 rounded-lg"
                        style={{ backgroundColor: currentTheme.colors.surface }}
                      ></div>
                    </div>
                  </div>

                  {/* Music Player */}
                  <div
                    className="p-4 rounded-xl"
                    style={{ backgroundColor: currentTheme.colors.surface }}
                  >
                    <div className="flex items-center space-x-4">
                      <div
                        className="w-16 h-16 rounded-lg"
                        style={{ backgroundColor: currentTheme.colors.secondary }}
                      ></div>
                      <div className="flex-1">
                        <div
                          className="h-4 rounded mb-2"
                          style={{ backgroundColor: currentTheme.colors.primary }}
                        ></div>
                        <div
                          className="h-3 rounded w-2/3"
                          style={{ backgroundColor: currentTheme.colors.accent }}
                        ></div>
                      </div>
                      <div
                        className="w-12 h-12 rounded-full"
                        style={{ backgroundColor: currentTheme.colors.primary }}
                      ></div>
                    </div>
                  </div>

                  {/* Playlist */}
                  <div className="space-y-2">
                    {[1, 2, 3].map((item) => (
                      <div
                        key={item}
                        className="h-12 rounded-lg"
                        style={{ backgroundColor: currentTheme.colors.surface }}
                      ></div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Download Theme */}
            <div className="glass p-8 rounded-3xl text-center">
              <h3 className="text-2xl font-bold text-white mb-4">Ready to Customize?</h3>
              <p className="text-gray-300 mb-6">
                Download OmniFusion Music and apply your favorite theme
              </p>
              <button className="btn-primary">
                Download with {currentTheme.name} Theme
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ThemeCustomizer 