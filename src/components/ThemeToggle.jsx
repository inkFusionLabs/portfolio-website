import React, { useState, useEffect } from 'react';

const ThemeToggle = () => {
  const [isDark, setIsDark] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    // Check for saved theme preference or default to dark
    const savedTheme = localStorage.getItem('omnifusion-theme');
    if (savedTheme) {
      setIsDark(savedTheme === 'dark');
      applyTheme(savedTheme === 'dark');
    } else {
      // Default to dark theme
      setIsDark(true);
      applyTheme(true);
    }
  }, []);

  const applyTheme = (dark) => {
    const root = document.documentElement;
    
    if (dark) {
      root.classList.add('dark');
      root.style.setProperty('--bg-primary', '#000000');
      root.style.setProperty('--text-primary', '#ffffff');
      root.style.setProperty('--accent-primary', '#8B5CF6');
      root.style.setProperty('--accent-secondary', '#A855F7');
    } else {
      root.classList.remove('dark');
      root.style.setProperty('--bg-primary', '#ffffff');
      root.style.setProperty('--text-primary', '#000000');
      root.style.setProperty('--accent-primary', '#667eea');
      root.style.setProperty('--accent-secondary', '#764ba2');
    }
  };

  const toggleTheme = () => {
    setIsAnimating(true);
    
    setTimeout(() => {
      const newTheme = !isDark;
      setIsDark(newTheme);
      applyTheme(newTheme);
      localStorage.setItem('omnifusion-theme', newTheme ? 'dark' : 'light');
      
      // Add theme change animation
      const themeChangeEvent = new CustomEvent('themeChange', { 
        detail: { theme: newTheme ? 'dark' : 'light' } 
      });
      window.dispatchEvent(themeChangeEvent);
      
      setIsAnimating(false);
    }, 300);
  };

  return (
    <div className="fixed top-4 left-4 z-50">
      <button
        onClick={toggleTheme}
        disabled={isAnimating}
        className={`
          relative w-14 h-14 rounded-full flex items-center justify-center text-xl
          transition-all duration-500 ease-in-out transform
          ${isAnimating ? 'scale-110' : 'hover:scale-105'}
          ${isDark 
            ? 'bg-gradient-to-r from-purple-600 to-pink-600 shadow-glow-lg' 
            : 'bg-gradient-to-r from-yellow-400 to-orange-500 shadow-glow-lg'
          }
        `}
        aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      >
        {/* Sun Icon */}
        <div className={`
          absolute inset-0 flex items-center justify-center transition-all duration-500
          ${isDark ? 'opacity-0 rotate-90 scale-0' : 'opacity-100 rotate-0 scale-100'}
        `}>
          ☀️
        </div>
        
        {/* Moon Icon */}
        <div className={`
          absolute inset-0 flex items-center justify-center transition-all duration-500
          ${isDark ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-0'}
        `}>
          🌙
        </div>
        
        {/* Ripple Effect */}
        {isAnimating && (
          <div className="absolute inset-0 rounded-full bg-white/20 animate-ping"></div>
        )}
      </button>
      
      {/* Theme Indicator */}
      <div className={`
        absolute -bottom-8 left-1/2 transform -translate-x-1/2
        px-2 py-1 rounded-full text-xs font-medium transition-all duration-300
        ${isDark 
          ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30' 
          : 'bg-yellow-500/20 text-yellow-700 border border-yellow-500/30'
        }
      `}>
        {isDark ? 'Dark' : 'Light'}
      </div>
    </div>
  );
};

export default ThemeToggle; 