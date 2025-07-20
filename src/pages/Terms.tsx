import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, FileText, Scale, AlertTriangle, CheckCircle, Music } from 'lucide-react';

const Terms: React.FC = () => {
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
            <FileText className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Terms of
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
              Service
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Please read these terms carefully before using OmniFusion Music. By using our service, you agree to these terms.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-12">
            {/* Acceptance */}
            <div className="bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/10">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-white">Acceptance of Terms</h2>
              </div>
              <div className="space-y-4 text-gray-300">
                <p>
                  By downloading, installing, or using OmniFusion Music, you agree to be bound by these Terms of Service. 
                  If you do not agree to these terms, please do not use our application.
                </p>
                <p>
                  These terms apply to all users of OmniFusion Music, including users who access the application 
                  through third-party music services.
                </p>
              </div>
            </div>

            {/* Service Description */}
            <div className="bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/10">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <Music className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-white">Service Description</h2>
              </div>
              <div className="space-y-4 text-gray-300">
                <p>OmniFusion Music is a desktop application that allows you to:</p>
                <ul className="space-y-2 ml-6">
                  <li className="flex items-start space-x-2">
                    <span className="text-indigo-400 mt-1">•</span>
                    <span>Connect to multiple music streaming services</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-indigo-400 mt-1">•</span>
                    <span>Search and play music across all connected services</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-indigo-400 mt-1">•</span>
                    <span>Manage playlists and music libraries</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-indigo-400 mt-1">•</span>
                    <span>Access personalized recommendations</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* User Responsibilities */}
            <div className="bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/10">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <Scale className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-white">User Responsibilities</h2>
              </div>
              <div className="space-y-4 text-gray-300">
                <p>As a user of OmniFusion Music, you agree to:</p>
                <ul className="space-y-2 ml-6">
                  <li className="flex items-start space-x-2">
                    <span className="text-indigo-400 mt-1">•</span>
                    <span>Use the application only for lawful purposes</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-indigo-400 mt-1">•</span>
                    <span>Respect the terms of service of connected music platforms</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-indigo-400 mt-1">•</span>
                    <span>Not attempt to reverse engineer or modify the application</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-indigo-400 mt-1">•</span>
                    <span>Not use the application to violate any copyright or intellectual property rights</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-indigo-400 mt-1">•</span>
                    <span>Keep your account credentials secure and confidential</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Third-Party Services */}
            <div className="bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/10">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <AlertTriangle className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-white">Third-Party Services</h2>
              </div>
              <div className="space-y-4 text-gray-300">
                <p>
                  OmniFusion Music integrates with third-party music streaming services. By using these integrations, 
                  you acknowledge that:
                </p>
                <ul className="space-y-2 ml-6">
                  <li className="flex items-start space-x-2">
                    <span className="text-indigo-400 mt-1">•</span>
                    <span>You are subject to the terms and conditions of each music service</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-indigo-400 mt-1">•</span>
                    <span>We are not responsible for the content, policies, or practices of third-party services</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-indigo-400 mt-1">•</span>
                    <span>Your use of third-party services is at your own risk</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-indigo-400 mt-1">•</span>
                    <span>We may discontinue support for any third-party service at any time</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Intellectual Property */}
            <div className="bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/10">
              <h2 className="text-2xl font-bold text-white mb-6">Intellectual Property</h2>
              <div className="space-y-4 text-gray-300">
                <p>
                  OmniFusion Music and its original content, features, and functionality are owned by OmniFusion 
                  and are protected by international copyright, trademark, patent, trade secret, and other 
                  intellectual property laws.
                </p>
                <p>
                  You may not copy, modify, distribute, sell, or lease any part of our application without 
                  our prior written consent.
                </p>
              </div>
            </div>

            {/* Privacy */}
            <div className="bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/10">
              <h2 className="text-2xl font-bold text-white mb-6">Privacy</h2>
              <div className="space-y-4 text-gray-300">
                <p>
                  Your privacy is important to us. Please review our Privacy Policy, which also governs your 
                  use of OmniFusion Music, to understand our practices.
                </p>
                <Link to="/privacy" className="inline-flex items-center text-indigo-400 hover:text-indigo-300 transition-colors">
                  Read our Privacy Policy
                </Link>
              </div>
            </div>

            {/* Disclaimers */}
            <div className="bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/10">
              <h2 className="text-2xl font-bold text-white mb-6">Disclaimers</h2>
              <div className="space-y-4 text-gray-300">
                <p>
                  OmniFusion Music is provided "as is" without warranties of any kind. We do not guarantee that:
                </p>
                <ul className="space-y-2 ml-6">
                  <li className="flex items-start space-x-2">
                    <span className="text-indigo-400 mt-1">•</span>
                    <span>The application will be error-free or uninterrupted</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-indigo-400 mt-1">•</span>
                    <span>All music services will be available at all times</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-indigo-400 mt-1">•</span>
                    <span>The application will meet your specific requirements</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Limitation of Liability */}
            <div className="bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/10">
              <h2 className="text-2xl font-bold text-white mb-6">Limitation of Liability</h2>
              <div className="space-y-4 text-gray-300">
                <p>
                  In no event shall OmniFusion be liable for any indirect, incidental, special, consequential, 
                  or punitive damages, including without limitation, loss of profits, data, use, goodwill, or 
                  other intangible losses, resulting from your use of the application.
                </p>
              </div>
            </div>

            {/* Changes to Terms */}
            <div className="bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/10">
              <h2 className="text-2xl font-bold text-white mb-6">Changes to Terms</h2>
              <div className="space-y-4 text-gray-300">
                <p>
                  We reserve the right to modify these terms at any time. We will notify users of any material 
                  changes through the application or our website. Your continued use of OmniFusion Music after 
                  such modifications constitutes acceptance of the updated terms.
                </p>
              </div>
            </div>

            {/* Contact */}
            <div className="bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-2xl p-8 border border-indigo-500/30 text-center">
              <h2 className="text-2xl font-bold text-white mb-4">Questions About Terms?</h2>
              <p className="text-gray-300 mb-6">
                If you have any questions about these Terms of Service, please contact us.
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
              <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
              <Link to="/roadmap" className="hover:text-white transition-colors">Roadmap</Link>
              <Link to="/demo" className="hover:text-white transition-colors">Demo</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Terms; 