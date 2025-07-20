import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Shield, Lock, Eye, Database, Users, Music } from 'lucide-react';

const Privacy: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-black/20 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center space-x-2 text-white hover:text-gray-300 transition-colors">
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Home</span>
            </Link>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Music className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white">OmniFusion</span>
            </div>
          </div>
        </div>
      </nav>

      {/* Header */}
      <section className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-20 h-20 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Shield className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Privacy
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
              Policy
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Your privacy is our priority. Learn how we protect your data and ensure your music experience remains secure.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-12">
            {/* Data Collection */}
            <div className="bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/10">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <Database className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-white">Data Collection</h2>
              </div>
              <div className="space-y-4 text-gray-300">
                <p>OmniFusion Music collects minimal data necessary to provide you with the best music streaming experience:</p>
                <ul className="space-y-2 ml-6">
                  <li className="flex items-start space-x-2">
                    <span className="text-indigo-400 mt-1">•</span>
                    <span>Account information from your connected music services (Spotify, Apple Music, etc.)</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-indigo-400 mt-1">•</span>
                    <span>Your music preferences and listening history to provide personalized recommendations</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-indigo-400 mt-1">•</span>
                    <span>Application usage data to improve performance and user experience</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-indigo-400 mt-1">•</span>
                    <span>Device information for cross-platform synchronization</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Data Security */}
            <div className="bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/10">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <Lock className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-white">Data Security</h2>
              </div>
              <div className="space-y-4 text-gray-300">
                <p>We implement industry-standard security measures to protect your data:</p>
                <ul className="space-y-2 ml-6">
                  <li className="flex items-start space-x-2">
                    <span className="text-indigo-400 mt-1">•</span>
                    <span>End-to-end encryption for all data transmission</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-indigo-400 mt-1">•</span>
                    <span>Secure authentication with OAuth 2.0 for music service connections</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-indigo-400 mt-1">•</span>
                    <span>Local data storage with optional cloud synchronization</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-indigo-400 mt-1">•</span>
                    <span>Regular security audits and updates</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Data Usage */}
            <div className="bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/10">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <Eye className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-white">How We Use Your Data</h2>
              </div>
              <div className="space-y-4 text-gray-300">
                <p>Your data is used exclusively to enhance your music experience:</p>
                <ul className="space-y-2 ml-6">
                  <li className="flex items-start space-x-2">
                    <span className="text-indigo-400 mt-1">•</span>
                    <span>Providing personalized music recommendations</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-indigo-400 mt-1">•</span>
                    <span>Synchronizing your playlists across devices</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-indigo-400 mt-1">•</span>
                    <span>Improving application performance and features</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-indigo-400 mt-1">•</span>
                    <span>Providing customer support and troubleshooting</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Data Sharing */}
            <div className="bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/10">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-white">Data Sharing</h2>
              </div>
              <div className="space-y-4 text-gray-300">
                <p>We do not sell, trade, or rent your personal information to third parties. Data is only shared when:</p>
                <ul className="space-y-2 ml-6">
                  <li className="flex items-start space-x-2">
                    <span className="text-indigo-400 mt-1">•</span>
                    <span>Required by law or legal process</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-indigo-400 mt-1">•</span>
                    <span>Necessary to provide music streaming services (with your connected music platforms)</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-indigo-400 mt-1">•</span>
                    <span>You explicitly consent to sharing for specific features</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Your Rights */}
            <div className="bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/10">
              <h2 className="text-2xl font-bold text-white mb-6">Your Rights</h2>
              <div className="space-y-4 text-gray-300">
                <p>You have complete control over your data:</p>
                <ul className="space-y-2 ml-6">
                  <li className="flex items-start space-x-2">
                    <span className="text-indigo-400 mt-1">•</span>
                    <span>Access and download your personal data at any time</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-indigo-400 mt-1">•</span>
                    <span>Request deletion of your account and associated data</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-indigo-400 mt-1">•</span>
                    <span>Opt out of data collection for non-essential features</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-indigo-400 mt-1">•</span>
                    <span>Contact us with any privacy concerns or questions</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Contact */}
            <div className="bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-2xl p-8 border border-indigo-500/30 text-center">
              <h2 className="text-2xl font-bold text-white mb-4">Questions About Privacy?</h2>
              <p className="text-gray-300 mb-6">
                We're committed to transparency and protecting your privacy. Contact us with any questions.
              </p>
              <button className="px-8 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold rounded-lg hover:shadow-lg transform hover:scale-105 transition-all duration-200">
                Contact Us
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black/20 backdrop-blur-md border-t border-white/10 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="w-6 h-6 bg-gradient-to-r from-indigo-500 to-purple-600 rounded flex items-center justify-center">
                <Music className="w-4 h-4 text-white" />
              </div>
              <span className="text-white font-semibold">OmniFusion Music</span>
            </div>
            <div className="flex space-x-6 text-sm text-gray-400">
              <Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
              <Link to="/roadmap" className="hover:text-white transition-colors">Roadmap</Link>
              <Link to="/demo" className="hover:text-white transition-colors">Demo</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Privacy; 