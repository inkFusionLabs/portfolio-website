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
  <div className="w-full h-full bg-gradient-to-br from-gray-900 to-black p-2">
    <img 
      src="/screenshots/main-interface.png" 
      alt="OmniFusion Music Main Interface" 
      className="w-full h-full object-cover rounded-lg"
      onError={(e) => {
        e.target.style.display = 'none';
        e.target.nextSibling.style.display = 'block';
      }}
    />
    <div className="w-full h-full bg-gradient-to-br from-gray-900 to-black p-4 rounded-lg" style={{display: 'none'}}>
      {/* Fallback mockup if image fails to load */}
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
      <div className="text-center text-white/60 text-sm">
        Upload your screenshot to /public/screenshots/main-interface.png
      </div>
    </div>
  </div>
);

// Playlist Management Screenshot Component
const PlaylistManagementScreenshot = () => (
  <div className="w-full h-full bg-gradient-to-br from-gray-900 to-black p-2">
    <img 
      src="/screenshots/playlist-management.png" 
      alt="OmniFusion Music Playlist Management" 
      className="w-full h-full object-cover rounded-lg"
      onError={(e) => {
        e.target.style.display = 'none';
        e.target.nextSibling.style.display = 'block';
      }}
    />
    <div className="w-full h-full bg-gradient-to-br from-gray-900 to-black p-4 rounded-lg" style={{display: 'none'}}>
      {/* Fallback mockup if image fails to load */}
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
      <div className="text-center text-white/60 text-sm">
        Upload your playlist screenshot to /public/screenshots/playlist-management.png
      </div>
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