import React, { useState } from 'react'
import { ChevronDown, ChevronUp, HelpCircle, Download, Users, Shield, Globe, Smartphone, Zap, Music } from 'lucide-react'

const FAQ = () => {
  const [openItems, setOpenItems] = useState(new Set([0])) // First item open by default

  const toggleItem = (index) => {
    const newOpenItems = new Set(openItems)
    if (newOpenItems.has(index)) {
      newOpenItems.delete(index)
    } else {
      newOpenItems.add(index)
    }
    setOpenItems(newOpenItems)
  }

  const faqData = [
    {
      category: "Getting Started",
      icon: <Download className="w-5 h-5" />,
      questions: [
        {
          question: "How do I get started with OmniFusion Music?",
          answer: "Getting started is easy! Simply download the app for your platform (Windows, macOS, Linux), install it, and connect your streaming service accounts. The app will guide you through the setup process and automatically sync your existing playlists and music library."
        },
        {
          question: "Which streaming services does OmniFusion Music support?",
          answer: "OmniFusion Music supports all major streaming services including Spotify, Apple Music, YouTube Music, Tidal, Deezer, and Amazon Music. We're constantly adding new platforms to provide you with the most comprehensive music management experience."
        },
        {
          question: "Is OmniFusion Music free to use?",
          answer: "Yes! OmniFusion Music offers a free tier with core features including cross-platform playlist management, universal search, and basic music organization. Premium features like advanced analytics, unlimited playlist sync, and priority support are available through our affordable subscription plans."
        }
      ]
    },
    {
      category: "Features & Functionality",
      icon: <Zap className="w-5 h-5" />,
      questions: [
        {
          question: "How does the universal search work?",
          answer: "Universal search allows you to find music across all your connected streaming services simultaneously. Simply type in an artist, song, or album name, and OmniFusion Music will search through Spotify, Apple Music, YouTube Music, and all other connected platforms to find what you're looking for."
        },
        {
          question: "Can I sync playlists between different streaming services?",
          answer: "Absolutely! OmniFusion Music's cross-platform playlist sync feature allows you to create playlists that work across all your streaming services. When you add a song to a playlist, it will be available on all platforms where that song exists, ensuring you never lose your music organization."
        },
        {
          question: "Does OmniFusion Music work offline?",
          answer: "Yes! OmniFusion Music includes offline functionality that allows you to access your playlists and music library even when you're not connected to the internet. You can also download songs for offline listening on supported platforms."
        }
      ]
    },
    {
      category: "Platform Support",
      icon: <Globe className="w-5 h-5" />,
      questions: [
        {
          question: "What operating systems does OmniFusion Music support?",
          answer: "OmniFusion Music is available for Windows 10/11, macOS 10.15+, and Linux (Ubuntu 18.04+). We also offer mobile apps for iOS and Android devices, ensuring you can manage your music across all your devices seamlessly."
        },
        {
          question: "When will the mobile app be available?",
          answer: "Our mobile apps for iOS and Android are currently in development and will be available in Q1 2025. The mobile apps will include all the core features of the desktop version, optimized for touch interfaces and mobile workflows."
        },
        {
          question: "Can I use OmniFusion Music on multiple devices?",
          answer: "Yes! OmniFusion Music syncs your settings, playlists, and preferences across all your devices. Simply sign in with your account on any supported device, and all your music organization will be available instantly."
        }
      ]
    },
    {
      category: "Account & Security",
      icon: <Shield className="w-5 h-5" />,
      questions: [
        {
          question: "Is my data secure with OmniFusion Music?",
          answer: "Absolutely! We take security seriously. All your data is encrypted in transit and at rest. We never store your streaming service passwords - we use secure OAuth authentication that only gives us permission to access your music library, not your account credentials."
        },
        {
          question: "Can I disconnect my streaming service accounts?",
          answer: "Yes, you can disconnect any streaming service account at any time through the settings menu. When you disconnect an account, OmniFusion Music will stop accessing that service, and any playlists or data from that service will be removed from the app."
        },
        {
          question: "What happens to my data if I cancel my subscription?",
          answer: "If you cancel your subscription, you'll still have access to all your data and playlists. You'll be moved to the free tier, which includes core features. Your music organization and settings will remain intact, and you can upgrade again at any time."
        }
      ]
    },
    {
      category: "Community & Support",
      icon: <Users className="w-5 h-5" />,
      questions: [
        {
          question: "How can I get help if I have issues?",
          answer: "We offer multiple support channels! You can check our comprehensive documentation, visit our community forums, or contact our support team directly. Premium users get priority support with faster response times and dedicated assistance."
        },
        {
          question: "Can I contribute to OmniFusion Music development?",
          answer: "Yes! OmniFusion Music is open-source, and we welcome contributions from the community. You can report bugs, suggest features, or contribute code through our GitHub repository. We also have a community Discord server where you can connect with other users and developers."
        },
        {
          question: "How often do you release updates?",
          answer: "We release regular updates with new features, improvements, and bug fixes. Major updates typically come every 2-3 months, with smaller patches and improvements released more frequently. You can enable automatic updates to always have the latest version."
        }
      ]
    },
    {
      category: "Pricing & Plans",
      icon: <Music className="w-5 h-5" />,
      questions: [
        {
          question: "What's included in the free plan?",
          answer: "The free plan includes core features like cross-platform playlist management, universal search, basic music organization, and support for up to 3 streaming services. It's perfect for getting started and managing your music across multiple platforms."
        },
        {
          question: "What additional features come with the premium plan?",
          answer: "Premium features include unlimited streaming service connections, advanced analytics and insights, priority support, unlimited playlist sync, custom themes, advanced search filters, and early access to new features. Premium users also get exclusive community features and beta access."
        },
        {
          question: "Do you offer student or family discounts?",
          answer: "Yes! We offer a 50% discount for students with valid .edu email addresses. We also have family plans that allow up to 6 family members to share a premium subscription at a reduced rate. Contact our support team for more information about these special pricing options."
        }
      ]
    }
  ]

  return (
    <section id="faq" className="py-20 bg-gray-800 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl floating-element"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl floating-element-delayed"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 fade-in">
          <div className="inline-flex items-center px-4 py-2 glass rounded-full mb-6">
            <HelpCircle className="w-4 h-4 text-blue-400 mr-2" />
            <span className="text-sm font-medium">Frequently Asked Questions</span>
          </div>
          <h2 className="text-5xl md:text-6xl font-black text-white mb-8">
            Got
            <span className="gradient-text"> Questions?</span>
          </h2>
          <p className="text-xl md:text-2xl text-gray-200 max-w-4xl mx-auto leading-relaxed">
            Find answers to the most common questions about OmniFusion Music. Can't find what you're looking for? Contact our support team.
          </p>
        </div>

        {/* FAQ Categories */}
        <div className="space-y-12">
          {faqData.map((category, categoryIndex) => (
            <div key={categoryIndex} className="fade-in" style={{ animationDelay: `${categoryIndex * 0.1}s` }}>
              <div className="flex items-center space-x-3 mb-8">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center text-white">
                  {category.icon}
                </div>
                <h3 className="text-2xl font-bold text-white">{category.category}</h3>
              </div>
              
              <div className="space-y-4">
                {category.questions.map((item, itemIndex) => {
                  const globalIndex = categoryIndex * 3 + itemIndex
                  const isOpen = openItems.has(globalIndex)
                  
                  return (
                    <div key={itemIndex} className="glass rounded-2xl overflow-hidden">
                      <button
                        onClick={() => toggleItem(globalIndex)}
                        className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-white/5 transition-colors"
                      >
                        <h4 className="text-lg font-semibold text-white pr-4">{item.question}</h4>
                        <div className="flex-shrink-0">
                          {isOpen ? (
                            <ChevronUp className="w-5 h-5 text-gray-400" />
                          ) : (
                            <ChevronDown className="w-5 h-5 text-gray-400" />
                          )}
                        </div>
                      </button>
                      
                      {isOpen && (
                        <div className="px-6 pb-4">
                          <div className="border-t border-white/10 pt-4">
                            <p className="text-gray-300 leading-relaxed">{item.answer}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16 fade-in">
          <h3 className="text-2xl font-bold text-white mb-6">Still Have Questions?</h3>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Can't find the answer you're looking for? Our support team is here to help you get the most out of OmniFusion Music.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="btn-primary flex items-center space-x-3">
              <HelpCircle className="w-5 h-5" />
              <span>Contact Support</span>
            </button>
            <button className="btn-secondary flex items-center space-x-3">
              <Users className="w-5 h-5" />
              <span>Join Community</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default FAQ 