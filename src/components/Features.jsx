import React from 'react';

const Features = () => {
  const features = [
    {
      icon: '🎯',
      title: 'Universal Hub',
      description: 'Connect to multiple streaming services and control them all from one beautiful interface.'
    },
    {
      icon: '🎨',
      title: 'Beautiful Design',
      description: 'Modern glass morphism UI with smooth animations and customizable themes.'
    },
    {
      icon: '🚀',
      title: 'Cross-Platform',
      description: 'Available on Windows, macOS, and Linux with native performance.'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
      {features.map((feature, index) => (
        <div key={index} className="feature-card">
          <h3 className="text-2xl font-semibold mb-4 text-teal-400">
            {feature.icon} {feature.title}
          </h3>
          <p className="opacity-80 leading-relaxed">
            {feature.description}
          </p>
        </div>
      ))}
    </div>
  );
};

export default Features; 