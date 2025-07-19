import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Features from './components/Features'
import InteractiveDemo from './components/InteractiveDemo'
import DownloadSection from './components/Download'
import Footer from './components/Footer'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-900">
        <Navbar />
        <Routes>
          <Route path="/" element={
            <>
              <Hero />
              <Features />
              <InteractiveDemo />
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