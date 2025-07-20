import React, { useState } from 'react';
import ComingSoon from './ComingSoon';

const BetaTesting = () => {
  const [isHovered, setIsHovered] = useState(false);

  const betaFeatures = [
    {
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M13 2.05v3.03c3.39.49 6 3.39 6 6.92 0 .9-.18 1.75-.5 2.54l2.6 1.53c.56-1.24.9-2.62.9-4.07 0-5.18-3.95-9.45-9-9.95zM12 19c-3.87 0-7-3.13-7-7 0-3.53 2.61-6.43 6-6.92V2.05c-5.05.5-9 4.76-9 9.95 0 5.52 4.47 10 9.99 10 3.31 0 6.24-1.61 8.06-4.09l-2.6-1.53C16.17 17.98 14.21 19 12 19z"/>
        </svg>
      ),
      title: 'Early Access',
      description: 'Be among the first to experience OmniFusion Music before public release'
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
      ),
      title: 'Exclusive Features',
      description: 'Access to premium features and experimental functionality'
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M16 4c0-1.11.89-2 2-2s2 .89 2 2-.89 2-2 2-2-.89-2-2zm4 18v-6h2.5l-2.54-7.63A1.5 1.5 0 0 0 18.54 8H17c-.8 0-1.54.37-2.01 1l-6.68 8.99c-.31.42-.31.99 0 1.41.31.42.89.42 1.2 0L15 16h3l3.5 6H20z"/>
        </svg>
      ),
      title: 'Direct Feedback',
      description: 'Share your thoughts directly with our development team'
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z"/>
        </svg>
      ),
      title: 'Priority Support',
      description: 'Get dedicated support and faster response times'
    }
  ];

  const betaPhases = [
    {
      phase: 'Phase 1',
      name: 'Internal Testing',
      status: 'Completed',
      description: 'Core functionality testing with development team',
      progress: 100,
      color: 'text-green-400'
    },
    {
      phase: 'Phase 2',
      name: 'Closed Alpha',
      status: 'In Progress',
      description: 'Limited testing with select users and partners',
      progress: 75,
      color: 'text-yellow-400'
    },
    {
      phase: 'Phase 3',
      name: 'Open Beta',
      status: 'Q1 2026',
      description: 'Public beta testing with wider user base',
      progress: 0,
      color: 'text-purple-400'
    },
    {
      phase: 'Phase 4',
      name: 'Public Release',
      status: 'Q2 2026',
      description: 'Full public release of OmniFusion Music',
      progress: 0,
      color: 'text-blue-400'
    }
  ];

  const requirements = [
    'Windows 10+ / macOS 11.0+ / Ubuntu 20.04+',
    'Minimum 4GB RAM, 2GB free disk space',
    'Active internet connection for music streaming',
    'Valid Spotify, Apple Music, or YouTube Music account',
    'Willingness to provide feedback and report bugs'
  ];

  return (
    <section className="py-16 bg-gradient-to-b from-black to-gray-900 relative overflow-hidden" id="beta-testing">
      {/* Background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Beta Testing Program
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
              Coming Soon
            </span>
          </h2>
          <p className="text-xl text-white/70 max-w-3xl mx-auto mb-8">
            Join our exclusive beta testing program and help shape the future of music streaming. 
            Get early access to OmniFusion Music and exclusive features before anyone else.
          </p>

          {/* Beta Status Card */}
          <div className="max-w-2xl mx-auto mb-12">
            <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 backdrop-blur-md rounded-2xl p-8 border border-white/10">
              <div className="flex items-center justify-center gap-3 mb-4">
                <svg className="w-8 h-8 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
                <h3 className="text-2xl font-bold text-white">Beta Program Status</h3>
              </div>
              <p className="text-white/80 mb-6">
                We're currently in <span className="text-yellow-400 font-semibold">Phase 2: Closed Alpha</span> testing. 
                The public beta program will launch in <span className="text-purple-400 font-semibold">Q1 2026</span>.
              </p>
              
              <div className="flex justify-center">
                <ComingSoon platform="beta" showProgress={true} />
              </div>
            </div>
          </div>
        </div>

        {/* Beta Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {betaFeatures.map((feature, index) => (
            <div 
              key={index}
              className="group bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-105"
            >
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                {feature.icon}
              </div>
              <h3 className="text-white font-semibold text-lg mb-3">{feature.title}</h3>
              <p className="text-white/70 text-sm">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Beta Phases */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-white text-center mb-8">Beta Testing Phases</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {betaPhases.map((phase, index) => (
              <div 
                key={index}
                className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-white/60 text-sm font-medium">{phase.phase}</span>
                  <span className={`text-sm font-semibold ${phase.color}`}>{phase.status}</span>
                </div>
                
                <h4 className="text-white font-semibold text-lg mb-2">{phase.name}</h4>
                <p className="text-white/70 text-sm mb-4">{phase.description}</p>
                
                <div className="w-full bg-white/20 rounded-full h-2 mb-2">
                  <div 
                    className={`h-2 rounded-full transition-all duration-1000 ${
                      phase.progress === 100 ? 'bg-green-400' : 
                      phase.progress > 0 ? 'bg-yellow-400' : 'bg-gray-400'
                    }`}
                    style={{ width: `${phase.progress}%` }}
                  ></div>
                </div>
                <span className={`text-xs ${phase.color}`}>{phase.progress}% Complete</span>
              </div>
            ))}
          </div>
        </div>

        {/* Requirements */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-white text-center mb-8">Beta Tester Requirements</h3>
          <div className="max-w-3xl mx-auto">
            <div className="bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-white font-semibold text-lg mb-4">System Requirements</h4>
                  <ul className="space-y-3">
                    {requirements.slice(0, 3).map((req, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <svg className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                        </svg>
                        <span className="text-white/80 text-sm">{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="text-white font-semibold text-lg mb-4">Account Requirements</h4>
                  <ul className="space-y-3">
                    {requirements.slice(3).map((req, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <svg className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                        </svg>
                        <span className="text-white/80 text-sm">{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* What to Expect */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-white text-center mb-8">What to Expect as a Beta Tester</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10">
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-xl flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
              </div>
              <h4 className="text-white font-semibold text-lg mb-3">Early Access</h4>
              <p className="text-white/70 text-sm">
                Get the latest builds and features before public release. Test new functionality 
                and provide feedback that shapes the final product.
              </p>
            </div>
            
            <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                </svg>
              </div>
              <h4 className="text-white font-semibold text-lg mb-3">Direct Communication</h4>
              <p className="text-white/70 text-sm">
                Join our beta tester community. Share feedback, report bugs, and suggest 
                features directly with our development team.
              </p>
            </div>
            
            <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10">
              <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
              </div>
              <h4 className="text-white font-semibold text-lg mb-3">Exclusive Perks</h4>
              <p className="text-white/70 text-sm">
                Enjoy exclusive features, priority support, and special recognition as an 
                early adopter. Your name in our credits and special beta tester badge.
              </p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 backdrop-blur-md rounded-2xl p-8 border border-white/10">
            <h3 className="text-2xl font-bold text-white mb-4">Ready to Join the Beta?</h3>
            <p className="text-white/70 mb-6 max-w-2xl mx-auto">
              While the beta program is coming soon, you can get notified when applications open. 
              Join our newsletter to be among the first to know when beta testing begins.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => {
                  const newsletterSection = document.getElementById('newsletter');
                  if (newsletterSection) newsletterSection.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-full text-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/25"
              >
                Get Notified
              </button>
              <button 
                onClick={() => {
                  const contactSection = document.getElementById('contact');
                  if (contactSection) contactSection.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-8 py-4 bg-white/10 backdrop-blur-md text-white font-semibold rounded-full text-lg border border-white/20 transition-all duration-300 hover:bg-white/20 hover:border-white/40"
              >
                Contact Us
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BetaTesting; 