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
import BetaTesting from './components/BetaTesting'
import Footer from './components/Footer'
import EnhancedAnimations from './components/EnhancedAnimations'
import ComparisonTable from './components/ComparisonTable'
import NewsletterUpdates from './components/NewsletterUpdates'
import CommunityFeatures from './components/CommunityFeatures'
import SponsorshipIntegration from './components/SponsorshipIntegration'
import InteractiveElements from './components/InteractiveElements'
import GitHubStatsTest from './components/GitHubStatsTest'
import InteractiveMusicPlayer from './components/InteractiveMusicPlayer'
import LiveStats from './components/LiveStats'
import ThemeCustomizer from './components/ThemeCustomizer'
import Accomplishments from './components/Accomplishments'
import UpdateNotification from './components/UpdateNotification'
import Callback from './pages/Callback'
import CallbackDemo from './pages/CallbackDemo'

function App() {
  return (
    <Router>
      <div className="App">
        <UpdateNotification />
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
              <ComparisonTable />
              <NewsletterUpdates />
              <CommunityFeatures />
              <SponsorshipIntegration />
              <InteractiveElements />
              <Accomplishments />
              <InteractiveMusicPlayer />
              <LiveStats />
              <ThemeCustomizer />
              <BetaTesting />
              <Roadmap />
              <Changelog />
              <FAQ />
              <DownloadSection />
            </>
          } />
          <Route path="/callback" element={<Callback />} />
          <Route path="/callback-demo" element={<CallbackDemo />} />
        </Routes>
        <Footer />
        <GitHubStatsTest />
      </div>
    </Router>
  )
}

export default App 