import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Music, Calendar, Clock, User, ArrowRight } from 'lucide-react';

const Blog: React.FC = () => {
  const blogPosts = [
    {
      id: 1,
      title: "Introducing OmniFusion Music: The Future of Music Streaming",
      excerpt: "We're excited to announce OmniFusion Music, a revolutionary desktop application that unifies all your music streaming services into one beautiful, intelligent interface.",
      author: "Alex Chen",
      date: "March 15, 2024",
      readTime: "5 min read",
      category: "Announcement",
      featured: true
    },
    {
      id: 2,
      title: "Why We're Building a Universal Music Player",
      excerpt: "Music streaming has become fragmented. You have Spotify for one playlist, Apple Music for another, YouTube Music for that one song that's not available anywhere else.",
      author: "Sarah Kim",
      date: "March 10, 2024",
      readTime: "4 min read",
      category: "Product"
    },
    {
      id: 3,
      title: "The Technology Behind OmniFusion Music",
      excerpt: "Learn about the modern tech stack we're using to build a fast, secure, and scalable music streaming application that works across all platforms.",
      author: "Marcus Rodriguez",
      date: "March 5, 2024",
      readTime: "7 min read",
      category: "Technical"
    },
    {
      id: 4,
      title: "Privacy First: How We Protect Your Data",
      excerpt: "In an era of data collection and privacy concerns, we're taking a different approach. Learn how OmniFusion Music keeps your data local and secure.",
      author: "Alex Chen",
      date: "February 28, 2024",
      readTime: "6 min read",
      category: "Privacy"
    },
    {
      id: 5,
      title: "Our Roadmap: What's Coming in 2024",
      excerpt: "Get a sneak peek at the features and improvements we're planning for OmniFusion Music throughout 2024 and beyond.",
      author: "Sarah Kim",
      date: "February 20, 2024",
      readTime: "8 min read",
      category: "Roadmap"
    },
    {
      id: 6,
      title: "Building a Community-Driven Music App",
      excerpt: "We believe the best products are built with the community. Here's how we're involving music lovers in the development of OmniFusion Music.",
      author: "Marcus Rodriguez",
      date: "February 15, 2024",
      readTime: "5 min read",
      category: "Community"
    }
  ];

  const categories = ["All", "Announcement", "Product", "Technical", "Privacy", "Roadmap", "Community"];

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
            Blog &
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
              Updates
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Stay updated with the latest news, features, and insights about OmniFusion Music.
          </p>
        </div>
      </section>

      {/* Featured Post */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {blogPosts.filter(post => post.featured).map(post => (
            <div key={post.id} className="bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-2xl p-8 border border-indigo-500/30">
              <div className="flex items-center space-x-3 mb-4">
                <span className="px-3 py-1 bg-indigo-500 text-white text-sm font-medium rounded-full">
                  {post.category}
                </span>
                <span className="text-gray-400 text-sm">Featured</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{post.title}</h2>
              <p className="text-xl text-gray-300 mb-6">{post.excerpt}</p>
              <div className="flex items-center space-x-6 text-sm text-gray-400 mb-6">
                <div className="flex items-center space-x-2">
                  <User className="w-4 h-4" />
                  <span>{post.author}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4" />
                  <span>{post.date}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4" />
                  <span>{post.readTime}</span>
                </div>
              </div>
              <button className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-200">
                Read Full Article
                <ArrowRight className="w-4 h-4 ml-2" />
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="py-8 bg-black/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category, index) => (
              <button
                key={index}
                className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                  category === "All"
                    ? "bg-gradient-to-r from-indigo-500 to-purple-600 text-white"
                    : "bg-white/10 text-gray-300 hover:bg-white/20 hover:text-white"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.filter(post => !post.featured).map(post => (
              <article key={post.id} className="bg-white/5 backdrop-blur-md rounded-xl border border-white/10 overflow-hidden hover:border-indigo-500/30 transition-all duration-200">
                <div className="p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <span className="px-3 py-1 bg-indigo-500/20 text-indigo-300 text-sm font-medium rounded-full">
                      {post.category}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3 line-clamp-2">{post.title}</h3>
                  <p className="text-gray-400 mb-4 line-clamp-3">{post.excerpt}</p>
                  <div className="flex items-center justify-between text-sm text-gray-400 mb-4">
                    <div className="flex items-center space-x-2">
                      <User className="w-4 h-4" />
                      <span>{post.author}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4" />
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400 text-sm">{post.date}</span>
                    <button className="inline-flex items-center text-indigo-400 hover:text-indigo-300 transition-colors">
                      Read More
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-16 bg-black/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-2xl p-12 border border-indigo-500/30">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Stay Updated
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Get the latest news, feature updates, and exclusive insights delivered to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
              <button className="px-8 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-200">
                Subscribe
              </button>
            </div>
            <p className="text-gray-400 text-sm mt-4">
              No spam, unsubscribe at any time.
            </p>
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

export default Blog; 