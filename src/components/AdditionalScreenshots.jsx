import React from 'react';

const AdditionalScreenshots = () => {
  const screenshots = [
    {
      id: 1,
      title: "Search & Discovery",
      description: "Search across all music services simultaneously",
      component: <SearchDiscoveryScreenshot />
    },
    {
      id: 2,
      title: "Audio Settings",
      description: "Advanced audio controls and equalizer",
      component: <AudioSettingsScreenshot />
    },
    {
      id: 3,
      title: "Theme Customization",
      description: "Personalize your interface with custom themes",
      component: <ThemeCustomizationScreenshot />
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

// Search & Discovery Screenshot
const SearchDiscoveryScreenshot = () => (
  <div className="w-full h-full bg-gradient-to-br from-gray-900 to-black p-4">
    {/* Search Bar */}
    <div className="mb-4">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <svg className="w-4 h-4 text-white/60" fill="currentColor" viewBox="0 0 24 24">
            <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
          </svg>
        </div>
        <input
          type="text"
          placeholder="Search across all services..."
          className="w-full pl-10 pr-4 py-2 bg-white/10 backdrop-blur-md text-white placeholder-white/50 rounded-lg border border-white/20 focus:outline-none focus:border-white/40"
          value="Bohemian Rhapsody"
          readOnly
        />
      </div>
    </div>

    {/* Search Results */}
    <div className="space-y-2">
      <div className="bg-white/5 rounded-lg p-2 flex items-center space-x-3">
        <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded flex items-center justify-center">
          <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z"/>
          </svg>
        </div>
        <div className="flex-1">
          <div className="text-white font-semibold text-xs">Bohemian Rhapsody</div>
          <div className="text-white/60 text-xs">Queen • Spotify</div>
        </div>
        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
      </div>

      <div className="bg-white/5 rounded-lg p-2 flex items-center space-x-3">
        <div className="w-8 h-8 bg-gradient-to-br from-red-500 to-pink-500 rounded flex items-center justify-center">
          <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z"/>
          </svg>
        </div>
        <div className="flex-1">
          <div className="text-white font-semibold text-xs">Bohemian Rhapsody</div>
          <div className="text-white/60 text-xs">Queen • Apple Music</div>
        </div>
        <div className="w-2 h-2 bg-red-500 rounded-full"></div>
      </div>

      <div className="bg-white/5 rounded-lg p-2 flex items-center space-x-3">
        <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded flex items-center justify-center">
          <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z"/>
          </svg>
        </div>
        <div className="flex-1">
          <div className="text-white font-semibold text-xs">Bohemian Rhapsody</div>
          <div className="text-white/60 text-xs">Queen • YouTube Music</div>
        </div>
        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
      </div>
    </div>

    {/* Service Filters */}
    <div className="mt-4 flex space-x-2">
      <div className="px-2 py-1 bg-green-500/20 rounded text-green-400 text-xs">Spotify</div>
      <div className="px-2 py-1 bg-red-500/20 rounded text-red-400 text-xs">Apple Music</div>
      <div className="px-2 py-1 bg-blue-500/20 rounded text-blue-400 text-xs">YouTube</div>
    </div>
  </div>
);

// Audio Settings Screenshot
const AudioSettingsScreenshot = () => (
  <div className="w-full h-full bg-gradient-to-br from-gray-900 to-black p-4">
    {/* Header */}
    <div className="flex items-center space-x-3 mb-4">
      <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
        </svg>
      </div>
      <span className="text-white font-semibold text-sm">Audio Settings</span>
    </div>

    {/* Equalizer */}
    <div className="mb-4">
      <div className="text-white/70 text-xs mb-2">Equalizer</div>
      <div className="flex items-end space-x-1 h-16">
        {[60, 80, 100, 120, 140, 160, 180, 200, 220, 240].map((freq, index) => (
          <div key={freq} className="flex-1 bg-gradient-to-t from-purple-500 to-pink-500 rounded-t" 
               style={{height: `${Math.random() * 60 + 20}%`}}></div>
        ))}
      </div>
      <div className="flex justify-between text-white/40 text-xs mt-1">
        <span>60Hz</span>
        <span>240Hz</span>
      </div>
    </div>

    {/* Audio Settings */}
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-white/70 text-xs">Crossfade</span>
        <div className="w-16 h-6 bg-white/10 rounded-full relative">
          <div className="w-8 h-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <span className="text-white/70 text-xs">Normalize Volume</span>
        <div className="w-16 h-6 bg-white/10 rounded-full relative">
          <div className="w-12 h-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <span className="text-white/70 text-xs">High Quality</span>
        <div className="w-16 h-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full relative">
          <div className="w-6 h-6 bg-white rounded-full absolute right-0"></div>
        </div>
      </div>
    </div>

    {/* Audio Quality Info */}
    <div className="mt-4 bg-white/5 rounded-lg p-2">
      <div className="text-white/60 text-xs">Current Quality: 320 kbps</div>
      <div className="text-white/60 text-xs">Format: MP3</div>
    </div>
  </div>
);

// Theme Customization Screenshot
const ThemeCustomizationScreenshot = () => (
  <div className="w-full h-full bg-gradient-to-br from-gray-900 to-black p-4">
    {/* Header */}
    <div className="flex items-center space-x-3 mb-4">
      <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9c.83 0 1.5-.67 1.5-1.5 0-.39-.15-.74-.39-1.01-.23-.26-.38-.61-.38-.99 0-.83.67-1.5 1.5-1.5H16c2.76 0 5-2.24 5-5 0-4.42-4.03-8-9-8zm-5.5 9c-.83 0-1.5-.67-1.5-1.5S5.67 9 6.5 9 8 9.67 8 10.5 7.33 12 6.5 12zm3-4C8.67 8 8 7.33 8 6.5S8.67 5 9.5 5s1.5.67 1.5 1.5S10.33 8 9.5 8zm5 0c-.83 0-1.5-.67-1.5-1.5S13.67 5 14.5 5s1.5.67 1.5 1.5S15.33 8 14.5 8zm3 4c-.83 0-1.5-.67-1.5-1.5S16.67 9 17.5 9s1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/>
        </svg>
      </div>
      <span className="text-white font-semibold text-sm">Themes</span>
    </div>

    {/* Theme Options */}
    <div className="grid grid-cols-2 gap-2 mb-4">
      <div className="bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg p-3 border-2 border-purple-400">
        <div className="text-white text-xs font-semibold">Purple</div>
        <div className="text-white/80 text-xs">Active</div>
      </div>
      <div className="bg-gradient-to-br from-blue-600 to-cyan-600 rounded-lg p-3 border border-white/20">
        <div className="text-white text-xs font-semibold">Ocean</div>
        <div className="text-white/60 text-xs">Available</div>
      </div>
      <div className="bg-gradient-to-br from-green-600 to-emerald-600 rounded-lg p-3 border border-white/20">
        <div className="text-white text-xs font-semibold">Forest</div>
        <div className="text-white/60 text-xs">Available</div>
      </div>
      <div className="bg-gradient-to-br from-orange-600 to-red-600 rounded-lg p-3 border border-white/20">
        <div className="text-white text-xs font-semibold">Sunset</div>
        <div className="text-white/60 text-xs">Available</div>
      </div>
    </div>

    {/* Customization Options */}
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-white/70 text-xs">Dark Mode</span>
        <div className="w-16 h-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full relative">
          <div className="w-6 h-6 bg-white rounded-full absolute right-0"></div>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <span className="text-white/70 text-xs">Blur Effects</span>
        <div className="w-16 h-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full relative">
          <div className="w-6 h-6 bg-white rounded-full absolute right-0"></div>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <span className="text-white/70 text-xs">Animations</span>
        <div className="w-16 h-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full relative">
          <div className="w-6 h-6 bg-white rounded-full absolute right-0"></div>
        </div>
      </div>
    </div>

    {/* Preview */}
    <div className="mt-4 bg-white/5 rounded-lg p-2">
      <div className="text-white/60 text-xs mb-2">Preview</div>
      <div className="w-full h-8 bg-gradient-to-r from-purple-600 to-pink-600 rounded"></div>
    </div>
  </div>
);

export default AdditionalScreenshots; 