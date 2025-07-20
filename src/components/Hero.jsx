import React from 'react';

const Hero = () => {
  return (
    <div className="text-center max-w-4xl mx-auto px-8 py-16">
      <h1 className="text-6xl md:text-7xl font-bold mb-4 gradient-text">
        🎵 OmniFusion Music
      </h1>
      <p className="text-2xl md:text-3xl mb-8 opacity-90">
        Universal Music Command Center
      </p>
      <p className="text-lg md:text-xl mb-12 opacity-80 leading-relaxed">
        A beautiful desktop application that aggregates multiple streaming services into one unified interface. 
        Connect to Spotify, Apple Music, YouTube Music, and more - all from a single, elegant application.
      </p>
    </div>
  );
};

export default Hero; 