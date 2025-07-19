import React, { useState } from 'react'
import { Menu, X } from 'lucide-react'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-900/80 backdrop-blur-lg border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="text-2xl font-bold text-white">OmniFusion Music</div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-gray-300 hover:text-white transition-colors">Features</a>
            <a href="#demo" className="text-gray-300 hover:text-white transition-colors">Demo</a>
            <a href="#screenshots" className="text-gray-300 hover:text-white transition-colors">Gallery</a>
            <a href="#social-proof" className="text-gray-300 hover:text-white transition-colors">Community</a>
            <a href="#roadmap" className="text-gray-300 hover:text-white transition-colors">Roadmap</a>
            <a href="#changelog" className="text-gray-300 hover:text-white transition-colors">Updates</a>
            <a href="#faq" className="text-gray-300 hover:text-white transition-colors">FAQ</a>
            <a href="#download" className="text-gray-300 hover:text-white transition-colors">Download</a>
            <a href="#about" className="text-gray-300 hover:text-white transition-colors">About</a>
            <a href="#beta-testing" className="btn-primary">Join Beta</a>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-300 hover:text-white transition-colors"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 glass rounded-lg mt-2">
              <a href="#features" className="block px-3 py-2 text-gray-300 hover:text-white transition-colors">Features</a>
              <a href="#demo" className="block px-3 py-2 text-gray-300 hover:text-white transition-colors">Demo</a>
              <a href="#screenshots" className="block px-3 py-2 text-gray-300 hover:text-white transition-colors">Gallery</a>
              <a href="#social-proof" className="block px-3 py-2 text-gray-300 hover:text-white transition-colors">Community</a>
              <a href="#roadmap" className="block px-3 py-2 text-gray-300 hover:text-white transition-colors">Roadmap</a>
              <a href="#changelog" className="block px-3 py-2 text-gray-300 hover:text-white transition-colors">Updates</a>
              <a href="#faq" className="block px-3 py-2 text-gray-300 hover:text-white transition-colors">FAQ</a>
              <a href="#download" className="block px-3 py-2 text-gray-300 hover:text-white transition-colors">Download</a>
              <a href="#about" className="block px-3 py-2 text-gray-300 hover:text-white transition-colors">About</a>
              <button className="w-full mt-4 btn-primary">Download Now</button>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar 