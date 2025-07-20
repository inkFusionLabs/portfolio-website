import { useState, useEffect } from 'react'
import { Settings as SettingsIcon, Music, Shield, Bell, Palette, Wifi, User, ExternalLink, LogOut } from 'lucide-react'
import { spotifyService } from '../services/spotify'

export default function Settings() {
  const [activeTab, setActiveTab] = useState('services')
  const [isSpotifyConnected, setIsSpotifyConnected] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [connectionError, setConnectionError] = useState('')

  // Initialize Spotify service on component mount
  useEffect(() => {
    const initSpotify = async () => {
      try {
        const connected = await spotifyService.initialize()
        setIsSpotifyConnected(connected)
      } catch (error) {
        console.error('Failed to initialize Spotify:', error)
        setIsSpotifyConnected(false)
      }
    }
    
    initSpotify()
  }, [])

  // Listen for Spotify connection status updates
  useEffect(() => {
    const checkConnectionStatus = () => {
      const accessToken = localStorage.getItem('spotify_access_token')
      setIsSpotifyConnected(!!accessToken)
    }
    
    // Check on mount
    checkConnectionStatus()
    
    // Listen for storage changes (when tokens are added/removed)
    const handleStorageChange = () => {
      checkConnectionStatus()
    }
    
    // Listen for custom Spotify connection event
    const handleSpotifyConnected = () => {
      setIsSpotifyConnected(true)
      setConnectionError('')
    }
    
    window.addEventListener('storage', handleStorageChange)
    window.addEventListener('spotifyConnected', handleSpotifyConnected)
    
    return () => {
      window.removeEventListener('storage', handleStorageChange)
      window.removeEventListener('spotifyConnected', handleSpotifyConnected)
    }
  }, [])

  const handleSpotifyConnect = async () => {
    console.log('=== SPOTIFY CONNECT BUTTON CLICKED ===')
    setIsLoading(true)
    setConnectionError('')
    
    try {
      // Start the OAuth flow (opens popup window)
      await spotifyService.startAuth()
      console.log('Spotify OAuth popup opened')
      
    } catch (error) {
      console.error('Failed to start Spotify authentication:', error)
      setConnectionError(error instanceof Error ? error.message : 'Failed to start authentication')
    } finally {
      setIsLoading(false)
    }
  }

  const handleSpotifyDisconnect = () => {
    spotifyService.disconnect()
    setIsSpotifyConnected(false)
    setConnectionError('')
  }

  const handleLogout = () => {
    localStorage.removeItem('omnifusion_user')
    window.location.reload()
  }

  const tabs = [
    { id: 'services', label: 'Music Services', icon: Music },
    { id: 'account', label: 'Account', icon: User },
    { id: 'privacy', label: 'Privacy & Security', icon: Shield },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'appearance', label: 'Appearance', icon: Palette },
    { id: 'connectivity', label: 'Connectivity', icon: Wifi },
  ]

  return (
    <div className="h-full overflow-y-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-white">Settings</h1>
        <div className="flex items-center space-x-2">
          <SettingsIcon className="w-6 h-6 text-harmony-400" />
          <span className="text-harmony-400 font-medium">Configuration</span>
        </div>
      </div>

      <div className="flex space-x-6">
        {/* Sidebar */}
        <div className="w-64 space-y-2">
          {tabs.map((tab) => {
            const Icon = tab.icon
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                  activeTab === tab.id
                    ? 'bg-harmony-500/20 text-harmony-400 border border-harmony-500/30'
                    : 'text-gray-300 hover:bg-gray-800/50 hover:text-white'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{tab.label}</span>
              </button>
            )
          })}
        </div>

        {/* Content */}
        <div className="flex-1">
          <div className="glass-effect rounded-xl p-6">
            {activeTab === 'services' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-white mb-6">Music Services</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Spotify Service Card */}
                  <div className="bg-gray-800/30 rounded-lg p-4 border border-gray-700/50">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-white">Spotify</h3>
                      <div className="flex items-center space-x-2">
                        <div className={`w-3 h-3 rounded-full ${isSpotifyConnected ? 'bg-green-500' : 'bg-red-500'}`}></div>
                        <span className="text-sm text-gray-400">
                          {isSpotifyConnected ? 'Connected' : 'Disconnected'}
                        </span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-400 mb-4">
                      Connect your Spotify account to access your music library and playlists.
                    </p>
                    
                    {connectionError && (
                      <div className="mb-4 p-3 bg-red-500/20 border border-red-500/30 rounded-lg">
                        <p className="text-sm text-red-400">{connectionError}</p>
                      </div>
                    )}
                    
                    {isSpotifyConnected ? (
                      <button 
                        onClick={handleSpotifyDisconnect}
                        className="w-full px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
                      >
                        Disconnect Spotify
                      </button>
                    ) : (
                      <div className="space-y-2">
                        <button 
                          onClick={handleSpotifyConnect}
                          disabled={isLoading}
                          className="w-full px-4 py-2 bg-harmony-500 hover:bg-harmony-600 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                        >
                          {isLoading ? (
                            <>
                              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                              <span>Opening...</span>
                            </>
                          ) : (
                            <>
                              <ExternalLink className="w-4 h-4" />
                              <span>Connect Spotify</span>
                            </>
                          )}
                        </button>
                        
                        <button 
                          onClick={() => {
                            console.log('Testing browser open...')
                            window.open('https://www.google.com', '_blank')
                          }}
                          className="w-full px-2 py-1 bg-gray-600 hover:bg-gray-700 text-white rounded text-xs transition-colors"
                        >
                          Test Browser (opens Google)
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Other Services */}
                  {['Apple Music', 'YouTube Music', 'Amazon Music', 'Tidal', 'Deezer'].map((service) => (
                    <div key={service} className="bg-gray-800/30 rounded-lg p-4 border border-gray-700/50">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-white">{service}</h3>
                        <div className="flex items-center space-x-2">
                          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                          <span className="text-sm text-gray-400">Disconnected</span>
                        </div>
                      </div>
                      <p className="text-sm text-gray-400 mb-4">
                        Connect your {service} account to access your music library and playlists.
                      </p>
                      <button className="w-full px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors" disabled>
                        Coming Soon
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'account' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-white mb-6">Account Settings</h2>
                
                <div className="space-y-4">
                  <div className="bg-gray-800/30 rounded-lg p-4 border border-gray-700/50">
                    <h3 className="text-lg font-semibold text-white mb-4">Beta Access</h3>
                    <p className="text-sm text-gray-400 mb-4">
                      You are currently using the OmniFusion Music beta version. Thank you for being an early adopter!
                    </p>
                    <div className="flex items-center space-x-2 px-3 py-2 bg-blue-500/20 border border-blue-500/30 rounded-lg">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="text-sm text-blue-400">Beta User</span>
                    </div>
                  </div>

                  <div className="bg-gray-800/30 rounded-lg p-4 border border-gray-700/50">
                    <h3 className="text-lg font-semibold text-white mb-4">Account Actions</h3>
                    <button 
                      onClick={handleLogout}
                      className="w-full px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors flex items-center justify-center space-x-2"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'privacy' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-white mb-6">Privacy & Security</h2>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gray-800/30 rounded-lg">
                    <div>
                      <h3 className="text-lg font-semibold text-white">Data Collection</h3>
                      <p className="text-sm text-gray-400">Allow HarmonyHub to collect usage data for better recommendations</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" defaultChecked className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-harmony-500"></div>
                    </label>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 bg-gray-800/30 rounded-lg">
                    <div>
                      <h3 className="text-lg font-semibold text-white">Cross-Service Sync</h3>
                      <p className="text-sm text-gray-400">Sync your music preferences across all connected services</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" defaultChecked className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-harmony-500"></div>
                    </label>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'notifications' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-white mb-6">Notifications</h2>
                
                <div className="space-y-4">
                  {[
                    { title: 'New Music Releases', desc: 'Get notified when your favorite artists release new music' },
                    { title: 'Playlist Updates', desc: 'Receive updates when your collaborative playlists are modified' },
                    { title: 'Service Connections', desc: 'Notifications about service connection status' },
                    { title: 'Weekly Reports', desc: 'Get weekly summaries of your listening activity' }
                  ].map((notification, i) => (
                    <div key={i} className="flex items-center justify-between p-4 bg-gray-800/30 rounded-lg">
                      <div>
                        <h3 className="text-lg font-semibold text-white">{notification.title}</h3>
                        <p className="text-sm text-gray-400">{notification.desc}</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" defaultChecked={i < 2} className="sr-only peer" />
                        <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-harmony-500"></div>
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'appearance' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-white mb-6">Appearance</h2>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-4">Theme</h3>
                    <div className="grid grid-cols-3 gap-4">
                      {['Light', 'Dark', 'Auto'].map((theme) => (
                        <button
                          key={theme}
                          className={`p-4 rounded-lg border-2 transition-colors ${
                            theme === 'Dark' 
                              ? 'border-harmony-500 bg-harmony-500/20 text-harmony-400'
                              : 'border-gray-600 bg-gray-800/30 text-gray-300 hover:border-gray-500'
                          }`}
                        >
                          {theme}
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-4">Accent Color</h3>
                    <div className="grid grid-cols-6 gap-3">
                      {['#d946ef', '#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'].map((color) => (
                        <button
                          key={color}
                          className="w-12 h-12 rounded-lg border-2 border-gray-600 hover:border-white transition-colors"
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'connectivity' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-white mb-6">Connectivity</h2>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gray-800/30 rounded-lg">
                    <div>
                      <h3 className="text-lg font-semibold text-white">Offline Mode</h3>
                      <p className="text-sm text-gray-400">Download music for offline listening</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-harmony-500"></div>
                    </label>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 bg-gray-800/30 rounded-lg">
                    <div>
                      <h3 className="text-lg font-semibold text-white">High Quality Streaming</h3>
                      <p className="text-sm text-gray-400">Stream music in high quality (uses more data)</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" defaultChecked className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-harmony-500"></div>
                    </label>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
} 