import React from 'react';
import Hero from './Hero';
import Buttons from './Buttons';
import Features from './Features';
import SpotifyAuth from './SpotifyAuth';
import Download from './Download';
import TechStack from './TechStack';
import Newsletter from './Newsletter';
import Footer from './Footer';

const HomePage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="container mx-auto px-4 py-8">
        <Hero />
        <Buttons />
        <Features />
        <SpotifyAuth />
        <Download />
        <TechStack />
        <Newsletter />
        <Footer />
      </div>
    </div>
  );
};

export default HomePage; 