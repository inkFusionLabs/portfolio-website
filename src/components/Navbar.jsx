import React, { useState } from 'react'
import { Menu, X, Music } from 'lucide-react'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="fixed top-0 w-full z-50 glass">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <Music className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-white">OmniFusion Music</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-gray-300 hover:text-white transition-colors">Features</a>
            <a href="#demo" className="text-gray-300 hover:text-white transition-colors">Demo</a>
            <a href="#social-proof" className="text-gray-300 hover:text-white transition-colors">Community</a>
            <a href="#roadmap" className="text-gray-300 hover:text-white transition-colors">Roadmap</a>
            <a href="#changelog" className="text-gray-300 hover:text-white transition-colors">Updates</a>
            <a href="#download" className="text-gray-300 hover:text-white transition-colors">Download</a>
            <a href="#about" className="text-gray-300 hover:text-white transition-colors">About</a>
            <button className="btn-primary">Download Now</button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-300 hover:text-white focus:outline-none"
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
              <a href="#social-proof" className="block px-3 py-2 text-gray-300 hover:text-white transition-colors">Community</a>
              <a href="#roadmap" className="block px-3 py-2 text-gray-300 hover:text-white transition-colors">Roadmap</a>
              <a href="#changelog" className="block px-3 py-2 text-gray-300 hover:text-white transition-colors">Updates</a>
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