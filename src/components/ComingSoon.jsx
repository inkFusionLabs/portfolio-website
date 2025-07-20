import React, { useState, useEffect } from 'react';

const ComingSoon = ({ platform = 'all', showProgress = true }) => {
  const [progress, setProgress] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Development progress data
  const developmentData = {
    overall: {
      progress: 85,
      estimatedCompletion: 'Q1 2025',
      currentPhase: 'Beta Testing',
      nextPhase: 'Public Release'
    },
    phases: [
      { name: 'Core Development', progress: 100, status: 'Completed' },
      { name: 'UI/UX Design', progress: 100, status: 'Completed' },
      { name: 'Music Service Integration', progress: 90, status: 'In Progress' },
      { name: 'Beta Testing', progress: 60, status: 'In Progress' },
      { name: 'Performance Optimization', progress: 80, status: 'In Progress' },
      { name: 'Final Testing', progress: 0, status: 'Pending' },
      { name: 'Public Release', progress: 0, status: 'Pending' }
    ]
  };

  useEffect(() => {
    // Animate progress bar on mount
    const timer = setTimeout(() => {
      setProgress(developmentData.overall.progress);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const handleNotifyClick = () => {
    // Scroll to newsletter section
    const newsletterSection = document.getElementById('newsletter');
    if (newsletterSection) {
      newsletterSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleBetaSignup = () => {
    // Scroll to beta testing section
    const betaSection = document.getElementById('beta-testing');
    if (betaSection) {
      betaSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="group relative">
      {/* Main Coming Soon Button */}
      <button 
        className="w-full group relative px-6 py-4 bg-gradient-to-r from-purple-600/80 to-pink-600/80 text-white font-semibold rounded-xl transition-all duration-300 hover:from-purple-600 hover:to-pink-600 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/25 border border-white/20"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handleNotifyClick}
      >
        <span className="relative z-10 flex items-center justify-center gap-3">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
          </svg>
          <span className="text-lg">Coming Soon</span>
          <span className="text-sm opacity-80">({developmentData.overall.estimatedCompletion})</span>
        </span>
        
        {/* Progress Bar Overlay */}
        {showProgress && (
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20 rounded-b-xl overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-green-400 to-blue-400 transition-all duration-1000 ease-out"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        )}
      </button>

      {/* Hover Tooltip with Detailed Progress */}
      {isHovered && showProgress && (
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-4 w-80 bg-black/90 backdrop-blur-md rounded-xl p-4 border border-white/20 shadow-2xl z-50">
          <div className="text-center mb-4">
            <h4 className="text-white font-semibold text-lg mb-1">Development Progress</h4>
            <p className="text-white/70 text-sm">{developmentData.overall.currentPhase}</p>
          </div>
          
          {/* Overall Progress */}
          <div className="mb-4">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-white/70">Overall Progress</span>
              <span className="text-white font-semibold">{progress}%</span>
            </div>
            <div className="w-full bg-white/20 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-green-400 to-blue-400 h-2 rounded-full transition-all duration-1000"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>

          {/* Development Phases */}
          <div className="space-y-2 mb-4">
            {developmentData.phases.map((phase, index) => (
              <div key={index} className="flex items-center justify-between text-xs">
                <span className={`${phase.status === 'Completed' ? 'text-green-400' : phase.status === 'In Progress' ? 'text-yellow-400' : 'text-white/50'}`}>
                  {phase.name}
                </span>
                <span className={`${phase.status === 'Completed' ? 'text-green-400' : phase.status === 'In Progress' ? 'text-yellow-400' : 'text-white/50'}`}>
                  {phase.progress}%
                </span>
              </div>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2">
            <button 
              onClick={handleNotifyClick}
              className="flex-1 px-3 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs font-semibold rounded-lg hover:scale-105 transition-all duration-300"
            >
              Get Notified
            </button>
            <button 
              onClick={handleBetaSignup}
              className="flex-1 px-3 py-2 bg-white/10 text-white text-xs font-semibold rounded-lg border border-white/20 hover:bg-white/20 transition-all duration-300"
            >
              Join Beta
            </button>
          </div>

          {/* Arrow */}
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-black/90"></div>
        </div>
      )}

      {/* Platform-specific info */}
      {platform !== 'all' && (
        <div className="mt-2 text-center">
          <p className="text-white/60 text-sm">
            {platform === 'macOS' && 'Optimized for macOS 11.0+'}
            {platform === 'Windows' && 'Optimized for Windows 10+'}
            {platform === 'Linux' && 'Optimized for Ubuntu 20.04+'}
          </p>
        </div>
      )}
    </div>
  );
};

export default ComingSoon; 