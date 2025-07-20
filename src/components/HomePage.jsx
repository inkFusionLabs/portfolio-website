import React from 'react';
import Hero from './Hero';
import Features from './Features';
import AppShowcase from './AppShowcase';
import Download from './Download';
import Newsletter from './Newsletter';

const HomePage = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <Features />
      <AppShowcase />
      <Download />
      <Newsletter />
    </div>
  );
};

export default HomePage; 