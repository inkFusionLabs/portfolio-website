import React, { useState, useEffect } from 'react';

const KeyboardShortcuts = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeShortcuts, setActiveShortcuts] = useState([]);

  const shortcuts = [
    { key: 'Space', action: 'Play/Pause', category: 'Playback' },
    { key: '→', action: 'Next Track', category: 'Playback' },
    { key: '←', action: 'Previous Track', category: 'Playback' },
    { key: '↑', action: 'Volume Up', category: 'Playback' },
    { key: '↓', action: 'Volume Down', category: 'Playback' },
    { key: 'Ctrl + S', action: 'Search', category: 'Navigation' },
    { key: 'Ctrl + P', action: 'Create Playlist', category: 'Playlists' },
    { key: 'Ctrl + L', action: 'Toggle Library', category: 'Navigation' },
    { key: 'Ctrl + D', action: 'Download App', category: 'App' },
    { key: 'Ctrl + H', action: 'Show Help', category: 'Help' },
    { key: 'Ctrl + T', action: 'Toggle Theme', category: 'Settings' },
    { key: 'Ctrl + M', action: 'Toggle Mute', category: 'Playback' },
    { key: 'Ctrl + R', action: 'Toggle Repeat', category: 'Playback' },
    { key: 'Ctrl + Shift + R', action: 'Toggle Shuffle', category: 'Playback' },
    { key: 'F11', action: 'Fullscreen', category: 'View' },
    { key: 'Esc', action: 'Close Modal', category: 'Navigation' }
  ];

  useEffect(() => {
    const handleKeyDown = (event) => {
      // Toggle shortcuts panel
      if (event.ctrlKey && event.key === '?') {
        event.preventDefault();
        setIsVisible(!isVisible);
        return;
      }

      // Handle other shortcuts
      handleShortcut(event);
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isVisible]);

  const handleShortcut = (event) => {
    const key = event.key.toLowerCase();
    const ctrl = event.ctrlKey;
    const shift = event.shiftKey;
    const alt = event.altKey;

    // Create shortcut identifier
    let shortcutId = '';
    if (ctrl) shortcutId += 'ctrl+';
    if (shift) shortcutId += 'shift+';
    if (alt) shortcutId += 'alt+';
    shortcutId += key;

    // Find matching shortcut
    const shortcut = shortcuts.find(s => {
      const shortcutKey = s.key.toLowerCase().replace(/\s+/g, '');
      return shortcutKey === shortcutId || shortcutKey === key;
    });

    if (shortcut) {
      event.preventDefault();
      executeShortcut(shortcut);
    }
  };

  const executeShortcut = (shortcut) => {
    // Add visual feedback
    setActiveShortcuts(prev => [...prev, { ...shortcut, timestamp: Date.now() }]);
    
    // Remove from active shortcuts after 2 seconds
    setTimeout(() => {
      setActiveShortcuts(prev => prev.filter(s => s.timestamp !== Date.now()));
    }, 2000);

    // Execute the action
    switch (shortcut.action) {
      case 'Play/Pause':
        console.log('🎵 Toggle playback');
        break;
      case 'Next Track':
        console.log('⏭️ Next track');
        break;
      case 'Previous Track':
        console.log('⏮️ Previous track');
        break;
      case 'Volume Up':
        console.log('🔊 Volume up');
        break;
      case 'Volume Down':
        console.log('🔉 Volume down');
        break;
      case 'Search':
        console.log('🔍 Open search');
        break;
      case 'Create Playlist':
        console.log('📝 Create playlist');
        break;
      case 'Toggle Library':
        console.log('📚 Toggle library');
        break;
      case 'Download App':
        console.log('📱 Download app');
        break;
      case 'Show Help':
        console.log('❓ Show help');
        break;
      case 'Toggle Theme':
        console.log('🌙 Toggle theme');
        // Trigger theme change event
        window.dispatchEvent(new CustomEvent('themeChange'));
        break;
      case 'Toggle Mute':
        console.log('🔇 Toggle mute');
        break;
      case 'Toggle Repeat':
        console.log('🔁 Toggle repeat');
        break;
      case 'Toggle Shuffle':
        console.log('🔀 Toggle shuffle');
        break;
      case 'Fullscreen':
        console.log('🖥️ Toggle fullscreen');
        break;
      case 'Close Modal':
        console.log('❌ Close modal');
        setIsVisible(false);
        break;
    }
  };

  const getCategoryColor = (category) => {
    const colors = {
      'Playback': 'from-green-500 to-emerald-500',
      'Navigation': 'from-blue-500 to-cyan-500',
      'Playlists': 'from-purple-500 to-pink-500',
      'App': 'from-orange-500 to-red-500',
      'Help': 'from-indigo-500 to-purple-500',
      'Settings': 'from-gray-500 to-slate-500',
      'View': 'from-teal-500 to-green-500'
    };
    return colors[category] || 'from-gray-500 to-slate-500';
  };

  const groupByCategory = () => {
    const grouped = {};
    shortcuts.forEach(shortcut => {
      if (!grouped[shortcut.category]) {
        grouped[shortcut.category] = [];
      }
      grouped[shortcut.category].push(shortcut);
    });
    return grouped;
  };

  if (!isVisible) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <button
          onClick={() => setIsVisible(true)}
          className="bg-white/10 backdrop-blur-md rounded-full p-3 border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105"
          title="Keyboard Shortcuts (Ctrl + ?)"
        >
          <span className="text-xl">⌨️</span>
        </button>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 max-w-4xl w-full mx-4 max-h-[80vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white flex items-center">
            <span className="text-3xl mr-3">⌨️</span>
            Keyboard Shortcuts
          </h2>
          <button
            onClick={() => setIsVisible(false)}
            className="text-white/70 hover:text-white transition-colors"
          >
            ✕
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.entries(groupByCategory()).map(([category, categoryShortcuts]) => (
            <div key={category} className="space-y-3">
              <h3 className={`text-lg font-semibold bg-gradient-to-r ${getCategoryColor(category)} bg-clip-text text-transparent`}>
                {category}
              </h3>
              <div className="space-y-2">
                {categoryShortcuts.map((shortcut, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between bg-white/5 rounded-lg p-3 border border-white/10 hover:bg-white/10 transition-colors"
                  >
                    <span className="text-white/90 text-sm">{shortcut.action}</span>
                    <kbd className="px-2 py-1 bg-white/20 rounded text-xs font-mono text-white border border-white/30">
                      {shortcut.key}
                    </kbd>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Active Shortcuts Feedback */}
        {activeShortcuts.length > 0 && (
          <div className="fixed top-4 right-4 space-y-2">
            {activeShortcuts.map((shortcut, index) => (
              <div
                key={index}
                className="bg-green-500 text-white px-4 py-2 rounded-lg animate-fade-in flex items-center space-x-2"
              >
                <span>✅</span>
                <span>{shortcut.action}</span>
                <kbd className="px-2 py-1 bg-white/20 rounded text-xs font-mono">
                  {shortcut.key}
                </kbd>
              </div>
            ))}
          </div>
        )}

        <div className="mt-6 p-4 bg-blue-500/20 border border-blue-500/30 rounded-lg">
          <p className="text-blue-300 text-sm">
            💡 <strong>Tip:</strong> Press <kbd className="px-2 py-1 bg-white/20 rounded text-xs font-mono">Ctrl + ?</kbd> anytime to show/hide this panel
          </p>
        </div>
      </div>
    </div>
  );
};

export default KeyboardShortcuts; 