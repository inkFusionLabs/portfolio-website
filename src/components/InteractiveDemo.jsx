import React, { useState, useEffect } from 'react';

const InteractiveDemo = () => {
  const [currentDemo, setCurrentDemo] = useState('player');
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState({
    title: 'Bohemian Rhapsody',
    artist: 'Queen',
    album: 'A Night at the Opera',
    duration: 355,
    currentTime: 0,
    service: 'spotify'
  });
  const [volume, setVolume] = useState(80);
  const [isShuffled, setIsShuffled] = useState(false);
  const [isRepeated, setIsRepeated] = useState(false);

  // Simulate track progress
  useEffect(() => {
    let interval;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTrack(prev => ({
          ...prev,
          currentTime: prev.currentTime >= prev.duration ? 0 : prev.currentTime + 1
        }));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const demos = [
    {
      id: 'player',
      title: 'Music Player',
      icon: '🎵',
      description: 'Experience the main music player interface'
    },
    {
      id: 'search',
      title: 'Universal Search',
      icon: '🔍',
      description: 'Search across all music services'
    },
    {
      id: 'playlists',
      title: 'Playlist Management',
      icon: '📋',
      description: 'Create and manage playlists'
    },
    {
      id: 'settings',
      title: 'Audio Settings',
      icon: '⚙️',
      description: 'Configure audio preferences'
    }
  ];

  const renderPlayerDemo = () => (
    <div className="bg-gradient-to-br from-gray-900 to-black rounded-2xl p-6 border border-white/10">
      {/* Now Playing */}
      <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-xl p-4 mb-6">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
            <span className="text-white text-2xl">🎵</span>
          </div>
          <div className="flex-1">
            <h3 className="text-white font-semibold text-lg">{currentTrack.title}</h3>
            <p className="text-white/70">{currentTrack.artist}</p>
            <p className="text-white/50 text-sm">{currentTrack.album}</p>
          </div>
          <div className="flex items-center space-x-2">
            <div className={`w-3 h-3 rounded-full ${currentTrack.service === 'spotify' ? 'bg-green-500' : 'bg-red-500'}`}></div>
            <span className="text-white/60 text-sm capitalize">{currentTrack.service}</span>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-6">
        <div className="w-full bg-white/10 rounded-full h-2 mb-2">
          <div 
            className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${(currentTrack.currentTime / currentTrack.duration) * 100}%` }}
          ></div>
        </div>
        <div className="flex justify-between text-white/60 text-sm">
          <span>{formatTime(currentTrack.currentTime)}</span>
          <span>{formatTime(currentTrack.duration)}</span>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center space-x-4 mb-6">
        <button 
          onClick={() => setIsShuffled(!isShuffled)}
          className={`p-3 rounded-full transition-colors ${isShuffled ? 'bg-purple-500 text-white' : 'bg-white/10 text-white/60 hover:bg-white/20'}`}
        >
          🔀
        </button>
        <button className="p-3 rounded-full bg-white/10 text-white/60 hover:bg-white/20 transition-colors">
          ⏮️
        </button>
        <button 
          onClick={() => setIsPlaying(!isPlaying)}
          className="p-4 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:scale-105 transition-all duration-300"
        >
          {isPlaying ? '⏸️' : '▶️'}
        </button>
        <button className="p-3 rounded-full bg-white/10 text-white/60 hover:bg-white/20 transition-colors">
          ⏭️
        </button>
        <button 
          onClick={() => setIsRepeated(!isRepeated)}
          className={`p-3 rounded-full transition-colors ${isRepeated ? 'bg-purple-500 text-white' : 'bg-white/10 text-white/60 hover:bg-white/20'}`}
        >
          🔁
        </button>
      </div>

      {/* Volume Control */}
      <div className="flex items-center space-x-3">
        <span className="text-white/60">🔊</span>
        <input
          type="range"
          min="0"
          max="100"
          value={volume}
          onChange={(e) => setVolume(e.target.value)}
          className="flex-1 h-2 bg-white/10 rounded-lg appearance-none cursor-pointer slider"
        />
        <span className="text-white/60 text-sm w-12">{volume}%</span>
      </div>
    </div>
  );

  const renderSearchDemo = () => (
    <div className="bg-gradient-to-br from-gray-900 to-black rounded-2xl p-6 border border-white/10">
      <div className="mb-6">
        <div className="relative">
          <input
            type="text"
            placeholder="Search across all services..."
            className="w-full px-4 py-3 pl-12 bg-white/10 backdrop-blur-md text-white placeholder-white/50 rounded-lg border border-white/20 focus:outline-none focus:border-white/40"
          />
          <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/60">🔍</span>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center space-x-3 p-3 bg-white/5 rounded-lg">
          <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded flex items-center justify-center">
            <span className="text-white text-sm">🎵</span>
          </div>
          <div className="flex-1">
            <div className="text-white font-semibold">Bohemian Rhapsody</div>
            <div className="text-white/60 text-sm">Queen • Spotify</div>
          </div>
          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
        </div>

        <div className="flex items-center space-x-3 p-3 bg-white/5 rounded-lg">
          <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-pink-500 rounded flex items-center justify-center">
            <span className="text-white text-sm">🎵</span>
          </div>
          <div className="flex-1">
            <div className="text-white font-semibold">Bohemian Rhapsody</div>
            <div className="text-white/60 text-sm">Queen • Apple Music</div>
          </div>
          <div className="w-2 h-2 bg-red-500 rounded-full"></div>
        </div>

        <div className="flex items-center space-x-3 p-3 bg-white/5 rounded-lg">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded flex items-center justify-center">
            <span className="text-white text-sm">🎵</span>
          </div>
          <div className="flex-1">
            <div className="text-white font-semibold">Bohemian Rhapsody</div>
            <div className="text-white/60 text-sm">Queen • YouTube Music</div>
          </div>
          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
        </div>
      </div>

      <div className="mt-6 flex space-x-2">
        <div className="px-3 py-1 bg-green-500/20 rounded-full text-green-400 text-sm">Spotify</div>
        <div className="px-3 py-1 bg-red-500/20 rounded-full text-red-400 text-sm">Apple Music</div>
        <div className="px-3 py-1 bg-blue-500/20 rounded-full text-blue-400 text-sm">YouTube</div>
      </div>
    </div>
  );

  const renderPlaylistDemo = () => (
    <div className="bg-gradient-to-br from-gray-900 to-black rounded-2xl p-6 border border-white/10">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-white font-semibold text-lg">My Playlists</h3>
        <button className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:scale-105 transition-all duration-300">
          + New Playlist
        </button>
      </div>

      <div className="space-y-3">
        <div className="flex items-center space-x-3 p-3 bg-white/5 rounded-lg">
          <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded flex items-center justify-center">
            <span className="text-white">📋</span>
          </div>
          <div className="flex-1">
            <div className="text-white font-semibold">My Favorites</div>
            <div className="text-white/60 text-sm">127 songs • Spotify</div>
          </div>
          <div className="flex space-x-1">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <div className="w-2 h-2 bg-red-500 rounded-full"></div>
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
          </div>
        </div>

        <div className="flex items-center space-x-3 p-3 bg-white/5 rounded-lg">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded flex items-center justify-center">
            <span className="text-white">💪</span>
          </div>
          <div className="flex-1">
            <div className="text-white font-semibold">Workout Mix</div>
            <div className="text-white/60 text-sm">45 songs • Apple Music</div>
          </div>
          <div className="flex space-x-1">
            <div className="w-2 h-2 bg-red-500 rounded-full"></div>
          </div>
        </div>

        <div className="flex items-center space-x-3 p-3 bg-white/5 rounded-lg">
          <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-blue-500 rounded flex items-center justify-center">
            <span className="text-white">😌</span>
          </div>
          <div className="flex-1">
            <div className="text-white font-semibold">Chill Vibes</div>
            <div className="text-white/60 text-sm">89 songs • YouTube Music</div>
          </div>
          <div className="flex space-x-1">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
          </div>
        </div>
      </div>

      <div className="mt-6 bg-green-500/10 rounded-lg p-3 border border-green-500/30">
        <div className="flex items-center space-x-2">
          <span className="text-green-400">✅</span>
          <span className="text-green-400 text-sm">All playlists synced</span>
        </div>
      </div>
    </div>
  );

  const renderSettingsDemo = () => (
    <div className="bg-gradient-to-br from-gray-900 to-black rounded-2xl p-6 border border-white/10">
      <h3 className="text-white font-semibold text-lg mb-6">Audio Settings</h3>

      <div className="space-y-6">
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-white/70">Equalizer</span>
          </div>
          <div className="flex items-end space-x-1 h-16">
            {[60, 80, 100, 120, 140, 160, 180, 200, 220, 240].map((freq, index) => (
              <div 
                key={freq} 
                className="flex-1 bg-gradient-to-t from-purple-500 to-pink-500 rounded-t transition-all duration-300 hover:opacity-80 cursor-pointer"
                style={{height: `${Math.random() * 60 + 20}%`}}
              ></div>
            ))}
          </div>
          <div className="flex justify-between text-white/40 text-xs mt-1">
            <span>60Hz</span>
            <span>240Hz</span>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-white/70">Crossfade</span>
            <div className="w-16 h-6 bg-white/10 rounded-full relative">
              <div className="w-8 h-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-white/70">Normalize Volume</span>
            <div className="w-16 h-6 bg-white/10 rounded-full relative">
              <div className="w-12 h-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-white/70">High Quality</span>
            <div className="w-16 h-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full relative">
              <div className="w-6 h-6 bg-white rounded-full absolute right-0"></div>
            </div>
          </div>
        </div>

        <div className="bg-white/5 rounded-lg p-3">
          <div className="text-white/60 text-xs">Current Quality: 320 kbps</div>
          <div className="text-white/60 text-xs">Format: MP3</div>
        </div>
      </div>
    </div>
  );

  const renderDemo = () => {
    switch (currentDemo) {
      case 'player':
        return renderPlayerDemo();
      case 'search':
        return renderSearchDemo();
      case 'playlists':
        return renderPlaylistDemo();
      case 'settings':
        return renderSettingsDemo();
      default:
        return renderPlayerDemo();
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
            Interactive
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
              Demo
            </span>
          </h2>
          <p className="text-lg text-white/70 max-w-2xl mx-auto">
            Experience OmniFusion Music firsthand with our interactive demos.
          </p>
        </div>

        {/* Demo Navigation */}
        <div className="flex justify-center mb-8">
          <div className="bg-white/5 backdrop-blur-md rounded-xl p-1 border border-white/10">
            {demos.map((demo) => (
              <button
                key={demo.id}
                onClick={() => setCurrentDemo(demo.id)}
                className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                  currentDemo === demo.id
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                    : 'text-white/70 hover:text-white'
                }`}
              >
                <span className="mr-2">{demo.icon}</span>
                {demo.title}
              </button>
            ))}
          </div>
        </div>

        {/* Demo Content */}
        <div className="max-w-2xl mx-auto mb-8">
          {renderDemo()}
        </div>

        {/* Demo Description */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 backdrop-blur-md rounded-2xl p-6 border border-white/10">
            <h3 className="text-xl font-bold text-white mb-3">
              {demos.find(d => d.id === currentDemo)?.title}
            </h3>
            <p className="text-white/70 mb-6 max-w-xl mx-auto">
              {demos.find(d => d.id === currentDemo)?.description}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-full text-base transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/25">
                Download App
              </button>
              <button className="px-6 py-3 bg-white/10 backdrop-blur-md text-white font-semibold rounded-full text-base border border-white/20 transition-all duration-300 hover:bg-white/20 hover:border-white/40">
                View All Features
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InteractiveDemo; 