import React, { useState } from 'react';

const Download = () => {
  const [selectedPlatform, setSelectedPlatform] = useState('macos');

  const downloads = {
    macos: {
      name: 'macOS',
      icon: '🍎',
      version: 'v1.0.0',
      size: '45.2 MB',
      requirements: 'macOS 10.15+',
      downloadUrl: 'https://github.com/REPLACE_WITH_YOUR_USERNAME/OmniFusionMusic/releases/latest/download/OmniFusionMusic-macOS.dmg'
    },
    windows: {
      name: 'Windows',
      icon: '🪟',
      version: 'v1.0.0',
      size: '52.8 MB',
      requirements: 'Windows 10+',
      downloadUrl: 'https://github.com/REPLACE_WITH_YOUR_USERNAME/OmniFusionMusic/releases/latest/download/OmniFusionMusic-Windows.exe'
    },
    linux: {
      name: 'Linux',
      icon: '🐧',
      version: 'v1.0.0',
      size: '38.5 MB',
      requirements: 'Ubuntu 20.04+, Fedora 33+',
      downloadUrl: 'https://github.com/REPLACE_WITH_YOUR_USERNAME/OmniFusionMusic/releases/latest/download/OmniFusionMusic-Linux.AppImage'
    }
  };

  const handleDownload = (platform) => {
    const download = downloads[platform];
    // For now, just show an alert. In production, this would trigger the actual download
    alert(`Downloading OmniFusion Music ${download.version} for ${download.name}...\n\nThis is a placeholder. Replace with actual download logic.`);
  };

  return (
    <div className="mb-12">
      <div className="text-center mb-8">
        <h2 className="text-4xl font-bold mb-4 gradient-text">
          📥 Download OmniFusion Music
        </h2>
        <p className="text-xl opacity-80">
          Available for macOS, Windows, and Linux
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {Object.entries(downloads).map(([key, platform]) => (
          <div
            key={key}
            className={`feature-card cursor-pointer transition-all duration-300 ${
              selectedPlatform === key ? 'ring-2 ring-teal-400 scale-105' : 'hover:scale-102'
            }`}
            onClick={() => setSelectedPlatform(key)}
          >
            <div className="text-center">
              <div className="text-4xl mb-4">{platform.icon}</div>
              <h3 className="text-2xl font-semibold mb-2">{platform.name}</h3>
              <p className="text-sm opacity-70 mb-2">Version {platform.version}</p>
              <p className="text-sm opacity-70 mb-2">{platform.size}</p>
              <p className="text-xs opacity-60">{platform.requirements}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center">
        <button
          onClick={() => handleDownload(selectedPlatform)}
          className="btn btn-primary text-lg px-12 py-6"
        >
          {downloads[selectedPlatform].icon} Download for {downloads[selectedPlatform].name}
        </button>
        
        <div className="mt-4 text-sm opacity-70">
          <p>Version {downloads[selectedPlatform].version} • {downloads[selectedPlatform].size}</p>
          <p className="mt-1">Requirements: {downloads[selectedPlatform].requirements}</p>
        </div>
      </div>

      <div className="mt-8 text-center">
        <p className="text-sm opacity-60 mb-4">
          Looking for a different version? Check out our{' '}
          <a href="https://github.com/REPLACE_WITH_YOUR_USERNAME/OmniFusionMusic/releases" 
             className="text-teal-400 hover:underline" 
             target="_blank" 
             rel="noopener noreferrer">
            releases page
          </a>
        </p>
      </div>
    </div>
  );
};

export default Download; 