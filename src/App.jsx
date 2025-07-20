import React from 'react';
import Hero from './components/Hero';
import Buttons from './components/Buttons';
import Features from './components/Features';
import TechStack from './components/TechStack';
import Footer from './components/Footer';
import './index.css';

function App() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="container mx-auto px-4 py-8">
        <Hero />
        <Buttons />
        <Features />
        <TechStack />
        <Footer />
      </div>
    </div>
  );
}

export default App;
