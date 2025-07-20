import React from 'react';
import Hero from './Hero';
import Features from './Features';
import AppShowcase from './AppShowcase';
import FeatureComparison from './FeatureComparison';
import ScreenshotsGallery from './ScreenshotsGallery';
import SystemRequirements from './SystemRequirements';
import Documentation from './Documentation';
import InteractiveDemo from './InteractiveDemo';
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
      <Hero />
      <Features />
      <AppShowcase />
      <FeatureComparison />
      <ScreenshotsGallery />
      <InteractiveDemo />
      <SystemRequirements />
      <Documentation />
      <Download />
      <FAQ />
      <ContactForm />
      <Newsletter />
      <AppConnectionStatus />
    </div>
  );
};

export default HomePage; 