import React from 'react';
import Hero from './Hero';
import Features from './Features';
import AppShowcase from './AppShowcase';
import FeatureComparison from './FeatureComparison';
import ScreenshotsGallery from './ScreenshotsGallery';
import SystemRequirements from './SystemRequirements';
import Documentation from './Documentation';
import InteractiveDemo from './InteractiveDemo';
import MusicVisualizer from './MusicVisualizer';
import VoiceControl from './VoiceControl';
import KeyboardShortcuts from './KeyboardShortcuts';
import Testimonials from './Testimonials';
import PressKit from './PressKit';
import Download from './Download';
import FAQ from './FAQ';
import ContactForm from './ContactForm';
import Newsletter from './Newsletter';
import ThemeToggle from './ThemeToggle';
import AppConnectionStatus from './AppConnectionStatus';

const HomePage = () => {
  return (
    <div className="min-h-screen">
      <ThemeToggle />
      <KeyboardShortcuts />
      <Hero />
      <Features />
      <AppShowcase />
      <FeatureComparison />
      <ScreenshotsGallery />
      <InteractiveDemo />
      
      {/* New Interactive Features */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">Interactive Features</h2>
            <p className="text-white/70 text-lg max-w-2xl mx-auto">
              Experience the power of OmniFusion Music with these interactive demos
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <MusicVisualizer isPlaying={true} />
            <VoiceControl />
          </div>
        </div>
      </section>
      
      <SystemRequirements />
      <Documentation />
      
      {/* Social Proof */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <Testimonials />
        </div>
      </section>
      
      <Download />
      <FAQ />
      <ContactForm />
      <Newsletter />
      <AppConnectionStatus />
      
      {/* Press Kit */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <PressKit />
        </div>
      </section>
    </div>
  );
};

export default HomePage; 