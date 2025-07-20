import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Music, Users, Globe, Zap, Shield, Download, Star, Heart, Code, Rocket, Target } from 'lucide-react';

const About: React.FC = () => {
  const teamMembers = [
    {
      name: "Alex Chen",
      role: "Founder & Lead Developer",
      bio: "Passionate about creating seamless music experiences. 10+ years in software development.",
      avatar: "👨‍💻"
    },
    {
      name: "Sarah Kim",
      role: "UI/UX Designer",
      bio: "Crafting beautiful interfaces that users love. Expert in design systems and user research.",
      avatar: "👩‍🎨"
    },
    {
      name: "Marcus Rodriguez",
      role: "Backend Engineer",
      bio: "Building robust infrastructure for millions of music lovers. Database and API specialist.",
      avatar: "👨‍🔧"
    }
  ];

  const milestones = [
    {
      year: "2023",
      title: "Project Started",
      description: "The idea for OmniFusion Music was born from frustration with fragmented music experiences."
    },
    {
      year: "2024 Q1",
      title: "Core Development",
      description: "Built the foundation with Spotify integration and basic music playback."
    },
    {
      year: "2024 Q2",
      title: "Beta Testing",
      description: "Launched closed beta with 100+ music enthusiasts providing valuable feedback."
    },
    {
      year: "2024 Q3",
      title: "Public Launch",
      description: "OmniFusion Music will be available to everyone, completely free."
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
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            About
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
              OmniFusion Music
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            We're on a mission to unify the fragmented world of music streaming and create 
            the ultimate music experience for desktop users.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Our Mission
              </h2>
              <p className="text-lg text-gray-300 mb-6">
                Music is universal, but the way we access it is fragmented. You have Spotify for one playlist, 
                Apple Music for another, YouTube Music for that one song that's not available anywhere else. 
                It's frustrating, time-consuming, and expensive.
              </p>
              <p className="text-lg text-gray-300 mb-6">
                We believe music should be seamless. That's why we're building OmniFusion Music - a single, 
                beautiful desktop application that brings all your music services together in one place.
              </p>
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-white font-semibold">One App, All Music</h3>
                  <p className="text-gray-400 text-sm">Unified experience across all platforms</p>
                </div>
              </div>
            </div>
            <div className="bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/10">
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center p-6 bg-white/5 rounded-xl">
                  <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Heart className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-white font-semibold mb-2">Made with Love</h3>
                  <p className="text-gray-400 text-sm">By music lovers, for music lovers</p>
                </div>
                <div className="text-center p-6 bg-white/5 rounded-xl">
                  <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Code className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-white font-semibold mb-2">Open Source</h3>
                  <p className="text-gray-400 text-sm">Transparent and community-driven</p>
                </div>
                <div className="text-center p-6 bg-white/5 rounded-xl">
                  <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Rocket className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-white font-semibold mb-2">Fast & Lightweight</h3>
                  <p className="text-gray-400 text-sm">Optimized for performance</p>
                </div>
                <div className="text-center p-6 bg-white/5 rounded-xl">
                  <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Shield className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-white font-semibold mb-2">Privacy First</h3>
                  <p className="text-gray-400 text-sm">Your data stays local</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-black/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              What Makes Us Different
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              We're not just another music player. We're redefining how you experience music on desktop.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="p-8 bg-white/5 backdrop-blur-md rounded-xl border border-white/10">
              <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center mb-6">
                <Globe className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">Universal Access</h3>
              <p className="text-gray-400">
                Connect to Spotify, Apple Music, YouTube Music, and more. All your music in one beautiful interface.
              </p>
            </div>
            
            <div className="p-8 bg-white/5 backdrop-blur-md rounded-xl border border-white/10">
              <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center mb-6">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">Lightning Fast</h3>
              <p className="text-gray-400">
                Built with modern technologies for instant search, seamless playback, and smooth performance.
              </p>
            </div>
            
            <div className="p-8 bg-white/5 backdrop-blur-md rounded-xl border border-white/10">
              <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center mb-6">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">Privacy Focused</h3>
              <p className="text-gray-400">
                Your data stays local. No tracking, no ads, no compromises. Just pure music enjoyment.
              </p>
            </div>
            
            <div className="p-8 bg-white/5 backdrop-blur-md rounded-xl border border-white/10">
              <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center mb-6">
                <Download className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">Free Forever</h3>
              <p className="text-gray-400">
                No subscription fees, no hidden costs. Enjoy unlimited music for free, forever.
              </p>
            </div>
            
            <div className="p-8 bg-white/5 backdrop-blur-md rounded-xl border border-white/10">
              <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center mb-6">
                <Star className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">AI Powered</h3>
              <p className="text-gray-400">
                Smart recommendations, automated playlist curation, and intelligent music discovery.
              </p>
            </div>
            
            <div className="p-8 bg-white/5 backdrop-blur-md rounded-xl border border-white/10">
              <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center mb-6">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">Community Driven</h3>
              <p className="text-gray-400">
                Built with feedback from music enthusiasts. Your ideas shape the future of the app.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Meet the Team
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              A small team of passionate developers and designers working to revolutionize music streaming.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="text-center p-8 bg-white/5 backdrop-blur-md rounded-xl border border-white/10">
                <div className="text-4xl mb-4">{member.avatar}</div>
                <h3 className="text-xl font-semibold text-white mb-2">{member.name}</h3>
                <p className="text-indigo-400 mb-4">{member.role}</p>
                <p className="text-gray-400">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-16 bg-black/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Our Journey
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              From idea to reality - the story of how OmniFusion Music came to be.
            </p>
          </div>
          
          <div className="space-y-8">
            {milestones.map((milestone, index) => (
              <div key={index} className="flex items-start space-x-6">
                <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold">{milestone.year}</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-white mb-2">{milestone.title}</h3>
                  <p className="text-gray-400">{milestone.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-2xl p-12 border border-indigo-500/30">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Experience the Future?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Join thousands of music lovers who are already excited about OmniFusion Music.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold rounded-xl hover:shadow-lg transform hover:scale-105 transition-all duration-200">
                Get Early Access
              </button>
              <Link to="/contact" className="px-8 py-4 border-2 border-gray-600 text-gray-300 font-semibold rounded-xl hover:border-indigo-500 hover:text-indigo-400 transition-all duration-200">
                Contact Us
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

export default About; 