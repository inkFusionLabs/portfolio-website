import React, { useState } from 'react';

const Documentation = () => {
  const [activeCategory, setActiveCategory] = useState('getting-started');
  const [expandedItems, setExpandedItems] = useState(new Set(['installation']));

  const toggleItem = (itemId) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(itemId)) {
      newExpanded.delete(itemId);
    } else {
      newExpanded.add(itemId);
    }
    setExpandedItems(newExpanded);
  };

  const documentation = {
    'getting-started': {
      title: 'Getting Started',
      icon: '🚀',
      items: [
        {
          id: 'installation',
          title: 'Installation Guide',
          content: `
            <h4>Step-by-Step Installation</h4>
            <ol>
              <li><strong>Download:</strong> Visit our download page and select your operating system</li>
              <li><strong>Install:</strong> Run the installer and follow the setup wizard</li>
              <li><strong>Launch:</strong> Start OmniFusion Music from your applications menu</li>
              <li><strong>Connect:</strong> Link your music streaming accounts</li>
            </ol>
            
            <h4>System Requirements</h4>
            <ul>
              <li>Windows 10+ / macOS 10.15+ / Linux (Ubuntu 20.04+)</li>
              <li>4GB RAM minimum (8GB recommended)</li>
              <li>500MB available storage space</li>
              <li>Broadband internet connection</li>
            </ul>
          `
        },
        {
          id: 'first-setup',
          title: 'First Time Setup',
          content: `
            <h4>Welcome to OmniFusion Music!</h4>
            <p>Follow these steps to get started:</p>
            
            <h5>1. Account Setup</h5>
            <ul>
              <li>Create your OmniFusion account or sign in</li>
              <li>Choose your preferred theme and language</li>
              <li>Set up your music preferences</li>
            </ul>
            
            <h5>2. Connect Music Services</h5>
            <ul>
              <li>Click "Add Service" in the sidebar</li>
              <li>Select your preferred music streaming service</li>
              <li>Follow the OAuth authentication process</li>
              <li>Repeat for additional services</li>
            </ul>
            
            <h5>3. Import Your Library</h5>
            <ul>
              <li>Sync your existing playlists</li>
              <li>Import your favorite artists and albums</li>
              <li>Set up your listening preferences</li>
            </ul>
          `
        },
        {
          id: 'interface-overview',
          title: 'Interface Overview',
          content: `
            <h4>Main Interface Components</h4>
            
            <h5>🎵 Now Playing Bar</h5>
            <p>Located at the bottom, shows current track with playback controls</p>
            
            <h5>📁 Sidebar Navigation</h5>
            <ul>
              <li><strong>Home:</strong> Your personalized music dashboard</li>
              <li><strong>Library:</strong> Your music collection across all services</li>
              <li><strong>Playlists:</strong> Manage and create playlists</li>
              <li><strong>Search:</strong> Universal search across all services</li>
              <li><strong>Settings:</strong> App configuration and preferences</li>
            </ul>
            
            <h5>🎨 Theme Customization</h5>
            <p>Access themes and customization options in Settings > Appearance</p>
          `
        }
      ]
    },
    'features': {
      title: 'Features Guide',
      icon: '✨',
      items: [
        {
          id: 'universal-search',
          title: 'Universal Search',
          content: `
            <h4>Search Across All Services</h4>
            <p>Find music from all your connected streaming services in one place.</p>
            
            <h5>How to Use:</h5>
            <ol>
              <li>Click the search icon in the sidebar</li>
              <li>Type your search query</li>
              <li>Filter results by service, type, or date</li>
              <li>Click on any result to play or add to library</li>
            </ol>
            
            <h5>Search Filters:</h5>
            <ul>
              <li><strong>All Services:</strong> Search across all connected platforms</li>
              <li><strong>Specific Service:</strong> Search within one service only</li>
              <li><strong>Type:</strong> Filter by songs, albums, artists, or playlists</li>
              <li><strong>Date:</strong> Filter by release date or added date</li>
            </ul>
          `
        },
        {
          id: 'playlist-management',
          title: 'Playlist Management',
          content: `
            <h4>Create and Manage Playlists</h4>
            
            <h5>Creating Playlists:</h5>
            <ol>
              <li>Click "New Playlist" in the sidebar</li>
              <li>Enter playlist name and description</li>
              <li>Choose privacy settings</li>
              <li>Add songs from your library or search results</li>
            </ol>
            
            <h5>Cross-Service Playlists:</h5>
            <ul>
              <li>Combine songs from different streaming services</li>
              <li>Sync playlists across all connected accounts</li>
              <li>Share playlists with friends</li>
              <li>Export playlists in various formats</li>
            </ul>
            
            <h5>Playlist Features:</h5>
            <ul>
              <li><strong>Smart Playlists:</strong> Auto-update based on criteria</li>
              <li><strong>Collaborative:</strong> Invite friends to contribute</li>
              <li><strong>Offline:</strong> Download for offline listening</li>
              <li><strong>Shuffle:</strong> Randomize playlist order</li>
            </ul>
          `
        },
        {
          id: 'offline-mode',
          title: 'Offline Mode',
          content: `
            <h4>Listen Without Internet</h4>
            
            <h5>Downloading Music:</h5>
            <ol>
              <li>Select songs, albums, or playlists</li>
              <li>Click the download icon</li>
              <li>Choose download quality</li>
              <li>Wait for download to complete</li>
            </ol>
            
            <h5>Offline Features:</h5>
            <ul>
              <li>Play downloaded music without internet</li>
              <li>Sync across devices when online</li>
              <li>Manage storage usage</li>
              <li>Auto-download new releases from followed artists</li>
            </ul>
            
            <h5>Storage Management:</h5>
            <ul>
              <li>Set download location in Settings</li>
              <li>Configure maximum storage usage</li>
              <li>Auto-delete old downloads</li>
              <li>View storage usage statistics</li>
            </ul>
          `
        }
      ]
    },
    'troubleshooting': {
      title: 'Troubleshooting',
      icon: '🔧',
      items: [
        {
          id: 'connection-issues',
          title: 'Connection Issues',
          content: `
            <h4>Fixing Connection Problems</h4>
            
            <h5>Common Issues:</h5>
            <ul>
              <li><strong>Service Not Connecting:</strong> Check your internet connection and try re-authenticating</li>
              <li><strong>Playback Errors:</strong> Verify your subscription status and restart the app</li>
              <li><strong>Sync Problems:</strong> Check if the service is experiencing downtime</li>
            </ul>
            
            <h5>Solutions:</h5>
            <ol>
              <li>Restart OmniFusion Music</li>
              <li>Check your internet connection</li>
              <li>Re-authenticate your streaming service accounts</li>
              <li>Clear app cache in Settings > Advanced</li>
              <li>Update to the latest version</li>
            </ol>
            
            <h5>Still Having Issues?</h5>
            <p>Contact our support team at <a href="mailto:inkfusionapps@icloud.com" className="text-purple-400 hover:underline">inkfusionapps@icloud.com</a></p>
          `
        },
        {
          id: 'audio-problems',
          title: 'Audio Problems',
          content: `
            <h4>Audio Troubleshooting</h4>
            
            <h5>No Sound:</h5>
            <ul>
              <li>Check your system volume and audio output device</li>
              <li>Verify the app volume is not muted</li>
              <li>Test with different audio output devices</li>
              <li>Restart your audio drivers</li>
            </ul>
            
            <h5>Poor Audio Quality:</h5>
            <ul>
              <li>Check your streaming quality settings</li>
              <li>Verify your internet connection speed</li>
              <li>Update your audio drivers</li>
              <li>Try different audio output formats</li>
            </ul>
            
            <h5>Audio Settings:</h5>
            <p>Access audio settings in Settings > Audio to configure:</p>
            <ul>
              <li>Output device selection</li>
              <li>Audio quality preferences</li>
              <li>Equalizer settings</li>
              <li>Crossfade options</li>
            </ul>
          `
        },
        {
          id: 'performance-issues',
          title: 'Performance Issues',
          content: `
            <h4>Performance Optimization</h4>
            
            <h5>Slow Performance:</h5>
            <ul>
              <li>Close unnecessary background applications</li>
              <li>Check available system memory</li>
              <li>Update graphics drivers</li>
              <li>Clear app cache and temporary files</li>
            </ul>
            
            <h5>High CPU Usage:</h5>
            <ul>
              <li>Reduce audio quality settings</li>
              <li>Disable unnecessary visual effects</li>
              <li>Update to the latest version</li>
              <li>Check for background processes</li>
            </ul>
            
            <h5>Memory Issues:</h5>
            <ul>
              <li>Restart the application regularly</li>
              <li>Limit the number of cached songs</li>
              <li>Clear download cache</li>
              <li>Monitor system resource usage</li>
            </ul>
          `
        }
      ]
    },
    'advanced': {
      title: 'Advanced Features',
      icon: '⚡',
      items: [
        {
          id: 'api-integration',
          title: 'API Integration',
          content: `
            <h4>Developer API</h4>
            
            <h5>Available APIs:</h5>
            <ul>
              <li><strong>Music Control API:</strong> Control playback programmatically</li>
              <li><strong>Library API:</strong> Access and modify your music library</li>
              <li><strong>Playlist API:</strong> Create and manage playlists</li>
              <li><strong>Search API:</strong> Search across all services</li>
            </ul>
            
            <h5>Getting Started:</h5>
            <ol>
              <li>Enable developer mode in Settings</li>
              <li>Generate API keys in the developer console</li>
              <li>Read the API documentation</li>
              <li>Start building your integrations</li>
            </ol>
            
            <h5>Documentation:</h5>
            <p>Visit our <a href="#" className="text-purple-400 hover:underline">API Documentation</a> for detailed guides and examples.</p>
          `
        },
        {
          id: 'customization',
          title: 'Advanced Customization',
          content: `
            <h4>Customize Your Experience</h4>
            
            <h5>Theme Development:</h5>
            <ul>
              <li>Create custom themes using CSS</li>
              <li>Share themes with the community</li>
              <li>Import themes from other users</li>
              <li>Modify existing themes</li>
            </ul>
            
            <h5>Keyboard Shortcuts:</h5>
            <ul>
              <li>Customize keyboard shortcuts</li>
              <li>Create global hotkeys</li>
              <li>Set up media key controls</li>
              <li>Configure game controller support</li>
            </ul>
            
            <h5>Plugins and Extensions:</h5>
            <ul>
              <li>Install community plugins</li>
              <li>Create custom extensions</li>
              <li>Integrate with other applications</li>
              <li>Add new music services</li>
            </ul>
          `
        },
        {
          id: 'automation',
          title: 'Automation & Scripts',
          content: `
            <h4>Automate Your Music Experience</h4>
            
            <h5>Automation Features:</h5>
            <ul>
              <li><strong>Smart Playlists:</strong> Auto-update based on listening habits</li>
              <li><strong>Scheduled Playlists:</strong> Play specific music at certain times</li>
              <li><strong>Mood Detection:</strong> Automatically adjust music based on activity</li>
              <li><strong>Cross-Device Sync:</strong> Seamless playback across devices</li>
            </ul>
            
            <h5>Scripting:</h5>
            <ul>
              <li>Write custom automation scripts</li>
              <li>Integrate with home automation systems</li>
              <li>Create custom workflows</li>
              <li>Automate playlist generation</li>
            </ul>
            
            <h5>Examples:</h5>
            <p>Check our <a href="#" className="text-purple-400 hover:underline">Scripting Guide</a> for examples and tutorials.</p>
          `
        }
      ]
    }
  };

  return (
    <section className="py-16 bg-gradient-to-b from-gray-900 to-black relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Documentation &
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
              Help Center
            </span>
          </h2>
          <p className="text-lg text-white/70 max-w-2xl mx-auto">
            Everything you need to know about using OmniFusion Music effectively.
          </p>
        </div>

        {/* Category Navigation */}
        <div className="flex justify-center mb-8">
          <div className="bg-white/5 backdrop-blur-md rounded-xl p-1 border border-white/10">
            {Object.entries(documentation).map(([key, category]) => (
              <button
                key={key}
                onClick={() => setActiveCategory(key)}
                className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                  activeCategory === key
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                    : 'text-white/70 hover:text-white'
                }`}
              >
                <span className="mr-2">{category.icon}</span>
                {category.title}
              </button>
            ))}
          </div>
        </div>

        {/* Documentation Content */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/10">
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
              <span className="text-3xl mr-3">{documentation[activeCategory].icon}</span>
              {documentation[activeCategory].title}
            </h3>
            
            <div className="space-y-4">
              {documentation[activeCategory].items.map((item) => (
                <div key={item.id} className="border border-white/10 rounded-xl overflow-hidden">
                  <button
                    onClick={() => toggleItem(item.id)}
                    className="w-full px-6 py-4 text-left bg-white/5 hover:bg-white/10 transition-colors flex items-center justify-between"
                  >
                    <span className="text-white font-semibold">{item.title}</span>
                    <span className="text-white/60 text-xl">
                      {expandedItems.has(item.id) ? '−' : '+'}
                    </span>
                  </button>
                  
                  {expandedItems.has(item.id) && (
                    <div className="px-6 py-4 bg-white/5">
                      <div 
                        className="text-white/80 prose prose-invert max-w-none"
                        dangerouslySetInnerHTML={{ __html: item.content }}
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Help */}
        <div className="mt-12 text-center">
          <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 backdrop-blur-md rounded-2xl p-6 border border-white/10">
            <h3 className="text-xl md:text-2xl font-bold text-white mb-3">
              Need More Help?
            </h3>
            <p className="text-white/70 mb-6 max-w-xl mx-auto">
              Can't find what you're looking for? Our support team is here to help.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href="mailto:inkfusionapps@icloud.com"
                className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-full text-base transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/25"
              >
                Contact Support
              </a>
              <button className="px-6 py-3 bg-white/10 backdrop-blur-md text-white font-semibold rounded-full text-base border border-white/20 transition-all duration-300 hover:bg-white/20 hover:border-white/40">
                Community Forum
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Documentation; 