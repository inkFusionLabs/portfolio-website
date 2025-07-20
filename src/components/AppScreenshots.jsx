import React from 'react';

const AppScreenshots = () => {
  const screenshots = [
    {
      id: 1,
      title: "Main Interface",
      description: "Clean, modern desktop interface with unified music controls",
      component: <MainInterfaceScreenshot />
    },
    {
      id: 2,
      title: "Playlist Management",
      description: "Seamlessly manage playlists across all music services",
      component: <PlaylistManagementScreenshot />
    },
    {
      id: 3,
      title: "Multi-Service Integration",
      description: "Connect and switch between Spotify, Apple Music, and more",
      component: <MultiServiceScreenshot />
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {screenshots.map((screenshot) => (
        <div key={screenshot.id} className="group">
          <div className="bg-white/5 backdrop-blur-md rounded-2xl p-4 border border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-105">
            <div className="w-full h-48 mb-4 flex items-center justify-center border border-white/10 rounded-xl overflow-hidden">
              {screenshot.component}
            </div>
            <h3 className="text-white font-semibold text-lg mb-2">{screenshot.title}</h3>
            <p className="text-white/70 text-sm">{screenshot.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

// Main Interface Screenshot Component
const MainInterfaceScreenshot = () => (
  <div className="w-full h-full bg-gradient-to-br from-gray-900 to-black p-4">
    {/* App Header */}
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center space-x-3">
        <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
          <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
          </svg>
        </div>
        <span className="text-white font-semibold text-sm">OmniFusion Music</span>
      </div>
      <div className="flex space-x-2">
        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
        <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
      </div>
    </div>

    {/* Sidebar */}
    <div className="flex space-x-4">
      <div className="w-16 bg-white/5 rounded-lg p-2">
        <div className="space-y-3">
          <div className="w-full h-8 bg-purple-500/20 rounded flex items-center justify-center">
            <svg className="w-4 h-4 text-purple-400" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
          </div>
          <div className="w-full h-8 bg-white/10 rounded flex items-center justify-center">
            <svg className="w-4 h-4 text-white/60" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
            </svg>
          </div>
          <div className="w-full h-8 bg-white/10 rounded flex items-center justify-center">
            <svg className="w-4 h-4 text-white/60" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
            </svg>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1">
        {/* Now Playing */}
        <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-lg p-3 mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z"/>
              </svg>
            </div>
            <div className="flex-1">
              <div className="text-white font-semibold text-sm">Bohemian Rhapsody</div>
              <div className="text-white/60 text-xs">Queen</div>
            </div>
            <div className="flex space-x-2">
              <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-white/60" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
                </svg>
              </div>
              <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-white/60" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z"/>
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-4">
          <div className="w-full bg-white/10 rounded-full h-1">
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-1 rounded-full" style={{width: '45%'}}></div>
          </div>
          <div className="flex justify-between text-white/60 text-xs mt-1">
            <span>2:15</span>
            <span>5:55</span>
          </div>
        </div>

        {/* Service Icons */}
        <div className="flex space-x-2">
          <div className="w-6 h-6 bg-green-500 rounded flex items-center justify-center">
            <span className="text-white text-xs font-bold">S</span>
          </div>
          <div className="w-6 h-6 bg-red-500 rounded flex items-center justify-center">
            <span className="text-white text-xs font-bold">A</span>
          </div>
          <div className="w-6 h-6 bg-blue-500 rounded flex items-center justify-center">
            <span className="text-white text-xs font-bold">Y</span>
          </div>
        </div>
      </div>
    </div>
  </div>
);

// Playlist Management Screenshot Component
const PlaylistManagementScreenshot = () => (
  <div className="w-full h-full bg-gradient-to-br from-gray-900 to-black p-4">
    {/* App Header */}
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center space-x-3">
        <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
          <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
          </svg>
        </div>
        <span className="text-white font-semibold text-sm">Playlists</span>
      </div>
    </div>

    {/* Playlist List */}
    <div className="space-y-2">
      <div className="bg-white/5 rounded-lg p-3 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
            </svg>
          </div>
          <div>
            <div className="text-white font-semibold text-sm">My Favorites</div>
            <div className="text-white/60 text-xs">Spotify • 127 songs</div>
          </div>
        </div>
        <div className="flex space-x-1">
          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          <div className="w-2 h-2 bg-red-500 rounded-full"></div>
          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
        </div>
      </div>

      <div className="bg-white/5 rounded-lg p-3 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
          </div>
          <div>
            <div className="text-white font-semibold text-sm">Workout Mix</div>
            <div className="text-white/60 text-xs">Apple Music • 45 songs</div>
          </div>
        </div>
        <div className="flex space-x-1">
          <div className="w-2 h-2 bg-red-500 rounded-full"></div>
        </div>
      </div>

      <div className="bg-white/5 rounded-lg p-3 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-blue-500 rounded-lg flex items-center justify-center">
            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
            </svg>
          </div>
          <div>
            <div className="text-white font-semibold text-sm">Chill Vibes</div>
            <div className="text-white/60 text-xs">YouTube Music • 89 songs</div>
          </div>
        </div>
        <div className="flex space-x-1">
          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
        </div>
      </div>
    </div>

    {/* Sync Status */}
    <div className="mt-4 bg-green-500/10 rounded-lg p-2 flex items-center space-x-2">
      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
      <span className="text-green-400 text-xs">All playlists synced</span>
    </div>
  </div>
);

// Multi-Service Integration Screenshot Component
const MultiServiceScreenshot = () => (
  <div className="w-full h-full bg-gradient-to-br from-gray-900 to-black p-4">
    {/* App Header */}
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center space-x-3">
        <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
          <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
          </svg>
        </div>
        <span className="text-white font-semibold text-sm">Services</span>
      </div>
    </div>

    {/* Service Cards */}
    <div className="space-y-3">
      <div className="bg-gradient-to-r from-green-600/20 to-green-500/20 rounded-lg p-3 border border-green-500/30">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">S</span>
            </div>
            <div>
              <div className="text-white font-semibold text-sm">Spotify</div>
              <div className="text-green-400 text-xs">Connected • Premium</div>
            </div>
          </div>
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-red-600/20 to-red-500/20 rounded-lg p-3 border border-red-500/30">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-red-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">A</span>
            </div>
            <div>
              <div className="text-white font-semibold text-sm">Apple Music</div>
              <div className="text-red-400 text-xs">Connected • Individual</div>
            </div>
          </div>
          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-blue-600/20 to-blue-500/20 rounded-lg p-3 border border-blue-500/30">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">Y</span>
            </div>
            <div>
              <div className="text-white font-semibold text-sm">YouTube Music</div>
              <div className="text-blue-400 text-xs">Connected • Premium</div>
            </div>
          </div>
          <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
        </div>
      </div>

      <div className="bg-white/5 rounded-lg p-3 border border-white/10">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center">
              <span className="text-white/40 font-bold text-sm">T</span>
            </div>
            <div>
              <div className="text-white/40 font-semibold text-sm">Tidal</div>
              <div className="text-white/30 text-xs">Not connected</div>
            </div>
          </div>
          <div className="w-3 h-3 bg-white/20 rounded-full"></div>
        </div>
      </div>
    </div>

    {/* Stats */}
    <div className="mt-4 grid grid-cols-2 gap-2">
      <div className="bg-white/5 rounded-lg p-2 text-center">
        <div className="text-white font-bold text-sm">3</div>
        <div className="text-white/60 text-xs">Connected</div>
      </div>
      <div className="bg-white/5 rounded-lg p-2 text-center">
        <div className="text-white font-bold text-sm">1,247</div>
        <div className="text-white/60 text-xs">Total Songs</div>
      </div>
    </div>
  </div>
);

export default AppScreenshots; 