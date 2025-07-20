import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Music, Book, Video, MessageSquare, Download, Settings, HelpCircle, FileText, Play } from 'lucide-react';

const Support: React.FC = () => {
  const supportResources = [
    {
      title: "Getting Started",
      icon: <Play className="w-6 h-6" />,
      description: "Learn how to set up and use OmniFusion Music for the first time.",
      link: "#",
      category: "guide"
    },
    {
      title: "User Manual",
      icon: <Book className="w-6 h-6" />,
      description: "Comprehensive guide to all features and functionality.",
      link: "#",
      category: "guide"
    },
    {
      title: "Video Tutorials",
      icon: <Video className="w-6 h-6" />,
      description: "Step-by-step video guides for common tasks.",
      link: "#",
      category: "video"
    },
    {
      title: "Troubleshooting",
      icon: <Settings className="w-6 h-6" />,
      description: "Common issues and their solutions.",
      link: "#",
      category: "help"
    },
    {
      title: "API Documentation",
      icon: <FileText className="w-6 h-6" />,
      description: "Technical documentation for developers.",
      link: "#",
      category: "technical"
    },
    {
      title: "Download Center",
      icon: <Download className="w-6 h-6" />,
      description: "Download the latest version and previous releases.",
      link: "#",
      category: "download"
    }
  ];

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
            <HelpCircle className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Support &
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
              Documentation
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Everything you need to get the most out of OmniFusion Music. From getting started to advanced features.
          </p>
        </div>
      </section>

      {/* Quick Help */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-xl p-8 border border-indigo-500/30 text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-6">
                <MessageSquare className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">Need Immediate Help?</h3>
              <p className="text-gray-300 mb-6">Get real-time support from our team and community.</p>
              <Link 
                to="/contact"
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-200"
              >
                Contact Support
              </Link>
            </div>

            <div className="bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-xl p-8 border border-indigo-500/30 text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-6">
                <Book className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">Browse FAQ</h3>
              <p className="text-gray-300 mb-6">Find quick answers to common questions.</p>
              <Link 
                to="/faq"
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-200"
              >
                View FAQ
              </Link>
            </div>

            <div className="bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-xl p-8 border border-indigo-500/30 text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-6">
                <Download className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">Download Latest</h3>
              <p className="text-gray-300 mb-6">Get the newest version with bug fixes and features.</p>
              <button className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-200">
                Download Now
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Documentation */}
      <section className="py-16 bg-black/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Documentation
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Comprehensive guides and resources to help you master OmniFusion Music.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {supportResources.map((resource, index) => (
              <div key={index} className="bg-white/5 backdrop-blur-md rounded-xl p-8 border border-white/10 hover:border-indigo-500/30 transition-all duration-200">
                <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center mb-6">
                  {resource.icon}
                </div>
                <h3 className="text-xl font-semibold text-white mb-4">{resource.title}</h3>
                <p className="text-gray-400 mb-6">{resource.description}</p>
                <Link 
                  to={resource.link}
                  className="inline-flex items-center text-indigo-400 hover:text-indigo-300 transition-colors"
                >
                  Learn More
                  <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Community */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Join Our Community
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Connect with other music lovers, share feedback, and stay updated on the latest features.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white/5 backdrop-blur-md rounded-xl p-8 border border-white/10">
              <h3 className="text-2xl font-bold text-white mb-4">Discord Community</h3>
              <p className="text-gray-300 mb-6">
                Join thousands of music enthusiasts in our Discord server. Get real-time support, 
                share playlists, discuss features, and connect with the development team.
              </p>
              <button className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-200">
                Join Discord
              </button>
            </div>
            
            <div className="bg-white/5 backdrop-blur-md rounded-xl p-8 border border-white/10">
              <h3 className="text-2xl font-bold text-white mb-4">GitHub</h3>
              <p className="text-gray-300 mb-6">
                OmniFusion Music is open source! Contribute to the project, report bugs, 
                request features, and help shape the future of music streaming.
              </p>
              <button className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-200">
                View on GitHub
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
              <Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
              <Link to="/contact" className="hover:text-white transition-colors">Contact</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Support; 