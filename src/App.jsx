import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import DevelopmentStatus from './components/DevelopmentStatus'
import Features from './components/Features'
import InteractiveDemo from './components/InteractiveDemo'
import SocialProof from './components/SocialProof'
import ScreenshotsGallery from './components/ScreenshotsGallery'
import Roadmap from './components/Roadmap'
import Changelog from './components/Changelog'
import FAQ from './components/FAQ'
import DownloadSection from './components/Download'
import Footer from './components/Footer'
import EnhancedAnimations from './components/EnhancedAnimations'

function App() {
  return (
    <Router>
      <div className="App">
        <EnhancedAnimations />
        <Navbar />
        <Routes>
          <Route path="/" element={
            <>
              <Hero />
              <DevelopmentStatus />
              <Features />
              <InteractiveDemo />
              <ScreenshotsGallery />
              <SocialProof />
              <Roadmap />
              <Changelog />
              <FAQ />
              <DownloadSection />
            </>
          } />
        </Routes>
        <Footer />
      </div>
    </Router>
  )
}

export default App 