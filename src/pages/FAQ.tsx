import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Music, ChevronDown, ChevronUp, Search, HelpCircle } from 'lucide-react';

const FAQ: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [openItems, setOpenItems] = useState<number[]>([]);

  const faqCategories = [
    {
      title: "General",
      icon: "🎵",
      items: [
        {
          question: "What is OmniFusion Music?",
          answer: "OmniFusion Music is a desktop application that unifies all your music streaming services into one beautiful interface. It allows you to connect Spotify, Apple Music, YouTube Music, and more, providing a seamless music experience across all platforms."
        },
        {
          question: "Is OmniFusion Music free?",
          answer: "Yes! OmniFusion Music is completely free and will remain free forever. We believe music should be accessible to everyone without subscription fees or hidden costs."
        },
        {
          question: "When will OmniFusion Music be available?",
          answer: "We're currently in development and plan to launch in Q3 2024. You can join our early access list to be notified when the beta becomes available."
        },
        {
          question: "What platforms will be supported?",
          answer: "OmniFusion Music will be available for Windows, macOS, and Linux. We're building native applications for each platform to ensure the best performance and user experience."
        }
      ]
    },
    {
      title: "Features",
      icon: "⚡",
      items: [
        {
          question: "Which music services can I connect?",
          answer: "We're planning to support Spotify, Apple Music, YouTube Music, Amazon Music, Tidal, and Deezer. The initial release will focus on Spotify and Apple Music, with more services added over time."
        },
        {
          question: "Can I search across all my music services?",
          answer: "Yes! OmniFusion Music features universal search that searches across all your connected music services simultaneously. Find any song, artist, or album instantly."
        },
        {
          question: "Will I be able to create playlists?",
          answer: "Absolutely! You can create, edit, and manage playlists that work across all your connected services. Our smart playlist features will help you discover new music based on your listening habits."
        },
        {
          question: "Does OmniFusion Music have AI features?",
          answer: "Yes! We're building AI-powered features including smart recommendations, automated playlist curation, mood-based music selection, and intelligent music discovery."
        }
      ]
    },
    {
      title: "Privacy & Security",
      icon: "🔒",
      items: [
        {
          question: "Is my data safe with OmniFusion Music?",
          answer: "Absolutely. We take privacy seriously. Your music data stays local on your device, and we don't collect or store any personal information. We use secure OAuth authentication for music service connections."
        },
        {
          question: "Do you track my listening habits?",
          answer: "No, we don't track your listening habits or collect any analytics data. Your music preferences and history remain private and local to your device."
        },
        {
          question: "Are my music service credentials secure?",
          answer: "Yes. We use industry-standard OAuth 2.0 authentication, which means we never see or store your actual passwords. You authenticate directly with each music service."
        }
      ]
    },
    {
      title: "Technical",
      icon: "🛠️",
      items: [
        {
          question: "What are the system requirements?",
          answer: "OmniFusion Music is designed to be lightweight and efficient. We'll support Windows 10+, macOS 10.15+, and most modern Linux distributions. Minimum 4GB RAM and 100MB disk space."
        },
        {
          question: "Will it work offline?",
          answer: "While you'll need an internet connection to stream music from your connected services, OmniFusion Music will cache your playlists and recently played music for offline access."
        },
        {
          question: "Can I use it with my existing music library?",
          answer: "Yes! OmniFusion Music will support local music files alongside your streaming services, giving you access to your entire music collection in one place."
        },
        {
          question: "Will there be a mobile app?",
          answer: "We're focusing on the desktop experience first, but mobile apps are planned for the future. The desktop app will be our priority to ensure the best possible experience."
        }
      ]
    },
    {
      title: "Support",
      icon: "💬",
      items: [
        {
          question: "How can I get help if I have issues?",
          answer: "You can reach out to us through our contact form, join our Discord community for real-time support, or check our comprehensive support documentation."
        },
        {
          question: "Can I request new features?",
          answer: "Absolutely! We love hearing from our community. You can submit feature requests through our contact form or join our Discord to discuss ideas with other users and our team."
        },
        {
          question: "How often do you release updates?",
          answer: "We plan to release regular updates with new features, bug fixes, and improvements. Major updates will be released monthly, with smaller patches as needed."
        },
        {
          question: "Is OmniFusion Music open source?",
          answer: "Yes! OmniFusion Music will be open source, allowing the community to contribute, review the code, and help improve the application."
        }
      ]
    }
  ];

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const filteredCategories = faqCategories.map(category => ({
    ...category,
    items: category.items.filter(item =>
      item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(category => category.items.length > 0);

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
            Frequently Asked
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
              Questions
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Find answers to common questions about OmniFusion Music. Can't find what you're looking for? 
            <Link to="/contact" className="text-indigo-400 hover:text-indigo-300 transition-colors"> Contact us</Link>.
          </p>
        </div>
      </section>

      {/* Search */}
      <section className="pb-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search questions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredCategories.map((category, categoryIndex) => (
            <div key={categoryIndex} className="mb-12">
              <div className="flex items-center space-x-3 mb-6">
                <span className="text-2xl">{category.icon}</span>
                <h2 className="text-2xl font-bold text-white">{category.title}</h2>
              </div>
              
              <div className="space-y-4">
                {category.items.map((item, itemIndex) => {
                  const globalIndex = categoryIndex * 100 + itemIndex;
                  const isOpen = openItems.includes(globalIndex);
                  
                  return (
                    <div key={itemIndex} className="bg-white/5 backdrop-blur-md rounded-xl border border-white/10 overflow-hidden">
                      <button
                        onClick={() => toggleItem(globalIndex)}
                        className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-white/5 transition-colors"
                      >
                        <span className="text-white font-medium pr-4">{item.question}</span>
                        {isOpen ? (
                          <ChevronUp className="w-5 h-5 text-gray-400 flex-shrink-0" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />
                        )}
                      </button>
                      
                      {isOpen && (
                        <div className="px-6 pb-4">
                          <p className="text-gray-300 leading-relaxed">{item.answer}</p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
          
          {filteredCategories.length === 0 && (
            <div className="text-center py-12">
              <HelpCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">No questions found</h3>
              <p className="text-gray-400 mb-6">Try adjusting your search terms or browse all categories.</p>
              <button
                onClick={() => setSearchTerm('')}
                className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-200"
              >
                Clear Search
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Still Need Help */}
      <section className="py-16 bg-black/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-2xl p-12 border border-indigo-500/30">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Still Need Help?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Can't find the answer you're looking for? Our support team is here to help.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/contact"
                className="px-8 py-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold rounded-xl hover:shadow-lg transform hover:scale-105 transition-all duration-200"
              >
                Contact Support
              </Link>
              <Link 
                to="/support"
                className="px-8 py-4 border-2 border-gray-600 text-gray-300 font-semibold rounded-xl hover:border-indigo-500 hover:text-indigo-400 transition-all duration-200"
              >
                View Documentation
              </Link>
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

export default FAQ; 