import React, { useState } from 'react';

const PressKit = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { id: 'overview', name: 'Overview', icon: '📋' },
    { id: 'assets', name: 'Assets', icon: '🖼️' },
    { id: 'facts', name: 'Facts', icon: '📊' },
    { id: 'quotes', name: 'Quotes', icon: '💬' },
    { id: 'contact', name: 'Contact', icon: '📧' }
  ];

  const pressAssets = [
    {
      name: 'App Icon',
      description: 'High-resolution app icon in various formats',
      formats: ['PNG', 'SVG', 'ICO'],
      sizes: ['512x512', '256x256', '128x128', '64x64'],
      downloadUrl: '#'
    },
    {
      name: 'Screenshots',
      description: 'App screenshots for different platforms',
      formats: ['PNG', 'JPG'],
      sizes: ['1920x1080', '1280x720', '750x1334'],
      downloadUrl: '#'
    },
    {
      name: 'Logo',
      description: 'OmniFusion Music logo in various formats',
      formats: ['PNG', 'SVG', 'PDF'],
      sizes: ['Vector', 'High-res', 'Print-ready'],
      downloadUrl: '#'
    },
    {
      name: 'Brand Guidelines',
      description: 'Complete brand guidelines and style guide',
      formats: ['PDF'],
      sizes: ['A4', 'Digital'],
      downloadUrl: '#'
    }
  ];

  const keyFacts = [
    { metric: '10,000+', label: 'Active Users', icon: '👥' },
    { metric: '50+', label: 'Countries', icon: '🌍' },
    { metric: '4.9/5', label: 'User Rating', icon: '⭐' },
    { metric: '15+', label: 'Music Services', icon: '🎵' },
    { metric: '99.9%', label: 'Uptime', icon: '⚡' },
    { metric: '24/7', label: 'Support', icon: '🛟' }
  ];

  const pressQuotes = [
    {
      quote: "OmniFusion Music represents the future of music streaming - a unified platform that respects user choice while delivering exceptional experience.",
      author: "TechCrunch",
      date: "2024"
    },
    {
      quote: "The most innovative music player we've seen this year. It solves a real problem that music lovers face every day.",
      author: "Music Weekly",
      date: "2024"
    },
    {
      quote: "A game-changer for anyone who uses multiple music services. The interface is intuitive and the performance is outstanding.",
      author: "Digital Trends",
      date: "2024"
    }
  ];

  const contactInfo = {
    press: "press@omnifusionmusic.com",
    general: "hello@omnifusionmusic.com",
    support: "support@omnifusionmusic.com",
    phone: "+1 (555) 123-4567",
    address: "OmniFusion Labs, San Francisco, CA"
  };

  const downloadAsset = (asset) => {
    // Simulate download
    console.log(`Downloading ${asset.name}...`);
    
    // Show download notification
    const notification = document.createElement('div');
    notification.className = 'fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg z-50 animate-fade-in';
    notification.textContent = `📥 Downloading ${asset.name}...`;
    document.body.appendChild(notification);
    
    setTimeout(() => {
      notification.remove();
    }, 3000);
  };

  const renderOverview = () => (
    <div className="space-y-6">
      <div className="bg-white/5 rounded-xl p-6 border border-white/10">
        <h3 className="text-xl font-bold text-white mb-4">About OmniFusion Music</h3>
        <p className="text-white/80 leading-relaxed mb-4">
          OmniFusion Music is a revolutionary desktop application that unifies all your favorite music streaming services 
          into one seamless, intuitive interface. Built for music enthusiasts, professionals, and anyone who values 
          choice and convenience in their listening experience.
        </p>
        <p className="text-white/80 leading-relaxed">
          Our mission is to eliminate the fragmentation of the music streaming landscape by providing a single, 
          powerful platform that respects user preferences while delivering exceptional audio quality and user experience.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white/5 rounded-xl p-6 border border-white/10">
          <h4 className="text-lg font-semibold text-white mb-3">Key Features</h4>
          <ul className="space-y-2 text-white/80">
            <li>• Universal music service integration</li>
            <li>• Cross-platform playlist management</li>
            <li>• Advanced audio controls</li>
            <li>• Smart recommendations</li>
            <li>• Offline listening support</li>
            <li>• Voice control integration</li>
          </ul>
        </div>

        <div className="bg-white/5 rounded-xl p-6 border border-white/10">
          <h4 className="text-lg font-semibold text-white mb-3">Supported Platforms</h4>
          <ul className="space-y-2 text-white/80">
            <li>• macOS 10.15+</li>
            <li>• Windows 10/11</li>
            <li>• Linux (Ubuntu 20.04+)</li>
            <li>• Web Browser (Chrome, Firefox, Safari)</li>
          </ul>
        </div>
      </div>
    </div>
  );

  const renderAssets = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {pressAssets.map((asset, index) => (
          <div key={index} className="bg-white/5 rounded-xl p-6 border border-white/10 hover:bg-white/10 transition-colors">
            <h4 className="text-lg font-semibold text-white mb-2">{asset.name}</h4>
            <p className="text-white/70 text-sm mb-4">{asset.description}</p>
            
            <div className="space-y-3">
              <div>
                <span className="text-white/60 text-xs">Formats:</span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {asset.formats.map((format, i) => (
                    <span key={i} className="px-2 py-1 bg-white/10 rounded text-xs text-white/80">
                      {format}
                    </span>
                  ))}
                </div>
              </div>
              
              <div>
                <span className="text-white/60 text-xs">Sizes:</span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {asset.sizes.map((size, i) => (
                    <span key={i} className="px-2 py-1 bg-white/10 rounded text-xs text-white/80">
                      {size}
                    </span>
                  ))}
                </div>
              </div>
              
              <button
                onClick={() => downloadAsset(asset)}
                className="w-full mt-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white py-2 rounded-lg hover:scale-105 transition-all duration-300"
              >
                📥 Download {asset.name}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderFacts = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        {keyFacts.map((fact, index) => (
          <div key={index} className="bg-white/5 rounded-xl p-6 border border-white/10 text-center hover:bg-white/10 transition-colors">
            <div className="text-3xl mb-2">{fact.icon}</div>
            <div className="text-2xl font-bold text-white mb-1">{fact.metric}</div>
            <div className="text-white/70 text-sm">{fact.label}</div>
          </div>
        ))}
      </div>
      
      <div className="bg-white/5 rounded-xl p-6 border border-white/10">
        <h4 className="text-lg font-semibold text-white mb-4">Technical Specifications</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-white/80">
          <div>
            <strong>Platform:</strong> Electron-based desktop application
          </div>
          <div>
            <strong>Audio Quality:</strong> Up to 320kbps (depends on service)
          </div>
          <div>
            <strong>Languages:</strong> English, Spanish, French, German, Japanese
          </div>
          <div>
            <strong>File Size:</strong> ~150MB (varies by platform)
          </div>
        </div>
      </div>
    </div>
  );

  const renderQuotes = () => (
    <div className="space-y-6">
      {pressQuotes.map((quote, index) => (
        <div key={index} className="bg-white/5 rounded-xl p-6 border border-white/10">
          <blockquote className="text-white/90 text-lg italic mb-4">
            "{quote.quote}"
          </blockquote>
          <div className="flex items-center justify-between">
            <div className="text-white font-semibold">{quote.author}</div>
            <div className="text-white/60 text-sm">{quote.date}</div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderContact = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white/5 rounded-xl p-6 border border-white/10">
          <h4 className="text-lg font-semibold text-white mb-4">Press Contact</h4>
          <div className="space-y-3">
            <div>
              <span className="text-white/60 text-sm">Press Inquiries:</span>
              <div className="text-white font-medium">{contactInfo.press}</div>
            </div>
            <div>
              <span className="text-white/60 text-sm">General Inquiries:</span>
              <div className="text-white font-medium">{contactInfo.general}</div>
            </div>
            <div>
              <span className="text-white/60 text-sm">Support:</span>
              <div className="text-white font-medium">{contactInfo.support}</div>
            </div>
          </div>
        </div>

        <div className="bg-white/5 rounded-xl p-6 border border-white/10">
          <h4 className="text-lg font-semibold text-white mb-4">Company Info</h4>
          <div className="space-y-3">
            <div>
              <span className="text-white/60 text-sm">Phone:</span>
              <div className="text-white font-medium">{contactInfo.phone}</div>
            </div>
            <div>
              <span className="text-white/60 text-sm">Address:</span>
              <div className="text-white font-medium">{contactInfo.address}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white/5 rounded-xl p-6 border border-white/10">
        <h4 className="text-lg font-semibold text-white mb-4">Press Kit Download</h4>
        <p className="text-white/70 mb-4">
          Download our complete press kit including all assets, fact sheets, and media resources.
        </p>
        <button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-lg hover:scale-105 transition-all duration-300">
          📥 Download Complete Press Kit
        </button>
      </div>
    </div>
  );

  return (
    <div className="bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/10">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-white mb-4 flex items-center justify-center">
          <span className="text-4xl mr-3">📰</span>
          Press Kit
        </h2>
        <p className="text-white/70 text-lg max-w-2xl mx-auto">
          Media resources, brand assets, and information for journalists and content creators
        </p>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 flex items-center space-x-2 ${
              activeTab === tab.id
                ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                : 'bg-white/10 text-white/70 hover:bg-white/20'
            }`}
          >
            <span>{tab.icon}</span>
            <span>{tab.name}</span>
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="min-h-[400px]">
        {activeTab === 'overview' && renderOverview()}
        {activeTab === 'assets' && renderAssets()}
        {activeTab === 'facts' && renderFacts()}
        {activeTab === 'quotes' && renderQuotes()}
        {activeTab === 'contact' && renderContact()}
      </div>
    </div>
  );
};

export default PressKit; 