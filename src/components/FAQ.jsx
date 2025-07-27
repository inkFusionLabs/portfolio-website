import React, { useState } from 'react';

const FAQ = () => {
  const [openItems, setOpenItems] = useState(new Set());

  const faqs = [
    {
      id: 1,
      question: "What is OmniFusion Music?",
      answer: "OmniFusion Music is a universal desktop music streaming application that allows you to access and manage multiple music services (Spotify, Apple Music, YouTube Music, Tidal) from one beautiful, unified interface. It's built with modern technologies for fast, native performance."
    },
    {
      id: 2,
      question: "Is OmniFusion Music free to use?",
      answer: "Yes! OmniFusion Music is completely free to download and use. You'll need your own subscriptions to the individual music services (Spotify Premium, Apple Music, etc.) to access their content, but our app itself is free."
    },
    {
      id: 3,
      question: "Which platforms are supported?",
      answer: "OmniFusion Music is available for Windows, macOS, and Linux. It's built with Tauri, which provides native performance across all major desktop operating systems."
    },
    {
      id: 4,
      question: "How do I connect my music services?",
      answer: "Connecting your music services is simple! Just click the 'Connect' button for each service you want to use. You'll be redirected to the service's login page, and once you authorize OmniFusion Music, it will be connected and ready to use."
    },
    {
      id: 5,
      question: "Can I sync my playlists across services?",
      answer: "Yes! OmniFusion Music allows you to create unified playlists that can include tracks from multiple services. You can also sync your existing playlists and manage them all from one place."
    },
    {
      id: 6,
      question: "Does OmniFusion Music work offline?",
      answer: "Yes, you can download tracks for offline listening, just like with the individual music services. The downloaded content will be available even when you're not connected to the internet."
    },
    {
      id: 7,
      question: "Is my data secure?",
      answer: "Absolutely! We take your privacy and security seriously. OmniFusion Music only stores your authentication tokens locally on your device. We never have access to your passwords or personal data from the music services."
    },
    {
      id: 8,
      question: "Can I use multiple accounts for the same service?",
      answer: "Currently, OmniFusion Music supports one account per music service. However, you can easily switch between different accounts by disconnecting and reconnecting with a different account."
    },
    {
      id: 9,
      question: "What audio quality does OmniFusion Music support?",
      answer: "OmniFusion Music supports the same audio quality as the individual services you're connected to. This includes high-quality streaming up to 320kbps for Spotify Premium, lossless audio for Apple Music, and other high-quality formats supported by each service."
    },
    {
      id: 10,
      question: "How do I get support if I have issues?",
      answer: "We're here to help! You can contact us at inkfusionapps@icloud.com for technical support, feature requests, or any other questions. We typically respond within 24 hours."
    },
    {
      id: 11,
      question: "Will OmniFusion Music work with my existing music library?",
      answer: "Yes! OmniFusion Music can integrate with your local music files and existing music libraries. You can import and manage your local music alongside your streaming services."
    },
    {
      id: 12,
      question: "Are there any system requirements?",
      answer: "OmniFusion Music is designed to work on most modern computers. You'll need Windows 10+, macOS 10.15+, or a recent Linux distribution. The app requires about 100MB of disk space and 2GB of RAM for optimal performance."
    }
  ];

  const toggleItem = (id) => {
    const newOpenItems = new Set(openItems);
    if (newOpenItems.has(id)) {
      newOpenItems.delete(id);
    } else {
      newOpenItems.add(id);
    }
    setOpenItems(newOpenItems);
  };

  return (
    <section className="py-16 bg-gradient-to-b from-gray-900 to-black relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Frequently Asked
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
              Questions
            </span>
          </h2>
          <p className="text-lg text-white/70 max-w-2xl mx-auto">
            Find answers to the most common questions about OmniFusion Music.
          </p>
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqs.map((faq) => (
            <div
              key={faq.id}
              className="bg-white/5 backdrop-blur-md rounded-xl border border-white/10 overflow-hidden"
            >
              <button
                onClick={() => toggleItem(faq.id)}
                className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-white/5 transition-colors"
              >
                <h3 className="text-white font-semibold text-lg pr-4">
                  {faq.question}
                </h3>
                <div className="flex-shrink-0">
                  <svg
                    className={`w-5 h-5 text-white/70 transition-transform duration-300 ${
                      openItems.has(faq.id) ? 'rotate-180' : ''
                    }`}
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M7 10l5 5 5-5z"/>
                  </svg>
                </div>
              </button>
              
              {openItems.has(faq.id) && (
                <div className="px-6 pb-4">
                  <p className="text-white/70 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Contact CTA */}
        <div className="text-center mt-12">
          <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 backdrop-blur-md rounded-2xl p-6 border border-white/10">
            <h3 className="text-xl md:text-2xl font-bold text-white mb-3">
              Still Have Questions?
            </h3>
            <p className="text-white/70 mb-6 max-w-xl mx-auto">
              Can't find what you're looking for? Our support team is here to help.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href="mailto:inkfusionapps@icloud.com"
                className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-full text-base transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/25"
              >
                Contact Support
              </a>
              <button className="px-6 py-3 bg-white/10 backdrop-blur-md text-white font-semibold rounded-full text-base border border-white/20 transition-all duration-300 hover:bg-white/20 hover:border-white/40">
                Download Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ; 