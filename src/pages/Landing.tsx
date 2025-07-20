import React from 'react';
import Hero from '../components/landing/Hero';
import Features from '../components/landing/Features';
import Download from '../components/landing/Download';
import Footer from '../components/landing/Footer';

const Landing: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-900">
      <Hero />
      <Features />
      <Download />
      <Footer />
    </div>
  );
};

export default Landing; 