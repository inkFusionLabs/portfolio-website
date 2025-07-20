import React from 'react';
import { Github, Twitter, Mail, Heart, Music } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center mb-4">
              <Music className="w-8 h-8 text-indigo-400 mr-3" />
              <span className="text-2xl font-bold text-white">OmniFusion Music</span>
            </div>
            <p className="text-gray-400 mb-6 max-w-md">
              The universal music command center that brings all your music services together 
              in one beautiful, cross-platform desktop application.
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://github.com/omnifusionmusic" 
                className="text-gray-400 hover:text-white transition-colors duration-200"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="w-6 h-6" />
              </a>
              <a 
                href="https://twitter.com/omnifusionmusic" 
                className="text-gray-400 hover:text-white transition-colors duration-200"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Twitter className="w-6 h-6" />
              </a>
              <a 
                href="mailto:contact@omnifusionmusic.com" 
                className="text-gray-400 hover:text-white transition-colors duration-200"
              >
                <Mail className="w-6 h-6" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="/download" className="text-gray-400 hover:text-white transition-colors duration-200">
                  Download
                </a>
              </li>
              <li>
                <a href="/features" className="text-gray-400 hover:text-white transition-colors duration-200">
                  Features
                </a>
              </li>
              <li>
                <a href="/roadmap" className="text-gray-400 hover:text-white transition-colors duration-200">
                  Roadmap
                </a>
              </li>
              <li>
                <a href="/changelog" className="text-gray-400 hover:text-white transition-colors duration-200">
                  Changelog
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <a href="/docs" className="text-gray-400 hover:text-white transition-colors duration-200">
                  Documentation
                </a>
              </li>
              <li>
                <a href="/faq" className="text-gray-400 hover:text-white transition-colors duration-200">
                  FAQ
                </a>
              </li>
              <li>
                <a href="/issues" className="text-gray-400 hover:text-white transition-colors duration-200">
                  Report Issues
                </a>
              </li>
              <li>
                <a href="/contact" className="text-gray-400 hover:text-white transition-colors duration-200">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-slate-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center text-gray-400 mb-4 md:mb-0">
              <span>© 2024 OmniFusion Music. Made with</span>
              <Heart className="w-4 h-4 mx-1 text-red-400" />
              <span>for music lovers.</span>
            </div>
            
            <div className="flex space-x-6">
              <a href="/privacy" className="text-gray-400 hover:text-white transition-colors duration-200">
                Privacy Policy
              </a>
              <a href="/terms" className="text-gray-400 hover:text-white transition-colors duration-200">
                Terms of Service
              </a>
              <a href="/cookies" className="text-gray-400 hover:text-white transition-colors duration-200">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>

        {/* Platform Badges */}
        <div className="mt-8 pt-8 border-t border-slate-800">
          <div className="text-center">
            <h4 className="text-sm font-medium text-gray-400 mb-4">Available On</h4>
            <div className="flex justify-center space-x-4">
              <div className="flex items-center px-3 py-1 bg-slate-800 rounded-lg text-gray-300 text-sm">
                <span className="mr-2">🪟</span>
                Windows
              </div>
              <div className="flex items-center px-3 py-1 bg-slate-800 rounded-lg text-gray-300 text-sm">
                <span className="mr-2">🍎</span>
                macOS
              </div>
              <div className="flex items-center px-3 py-1 bg-slate-800 rounded-lg text-gray-300 text-sm">
                <span className="mr-2">🐧</span>
                Linux
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 