import React from 'react'
import { Music, Github, Twitter, MessageCircle, Mail, Heart } from 'lucide-react'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  const footerLinks = {
    product: [
      { name: 'Features', href: '#features' },
      { name: 'Download', href: '#download' },
      { name: 'Roadmap', href: 'https://github.com/yourusername/OmniFusionMusic/blob/main/ROADMAP.md' },
      { name: 'Changelog', href: 'https://github.com/yourusername/OmniFusionMusic/releases' }
    ],
    support: [
      { name: 'Documentation', href: 'https://github.com/yourusername/OmniFusionMusic/wiki' },
      { name: 'Issues', href: 'https://github.com/yourusername/OmniFusionMusic/issues' },
      { name: 'Discord', href: 'https://discord.gg/omnifusion' },
      { name: 'Contact', href: 'mailto:inkfusionlabs@icloud.com' }
    ],
    legal: [
      { name: 'Privacy Policy', href: '/privacy' },
      { name: 'Terms of Service', href: '/terms' },
      { name: 'License', href: 'https://github.com/yourusername/OmniFusionMusic/blob/main/LICENSE' },
      { name: 'Third Party Licenses', href: '/licenses' }
    ]
  }

  const socialLinks = [
    { name: 'GitHub', icon: <Github className="w-5 h-5" />, href: 'https://github.com/yourusername/OmniFusionMusic' },
    { name: 'Twitter', icon: <Twitter className="w-5 h-5" />, href: 'https://twitter.com/omnifusionmusic' },
    { name: 'Discord', icon: <MessageCircle className="w-5 h-5" />, href: 'https://discord.gg/omnifusion' },
    { name: 'Email', icon: <Mail className="w-5 h-5" />, href: 'mailto:inkfusionlabs@icloud.com' }
  ]

  return (
    <footer className="bg-gray-900 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Music className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white">OmniFusion Music</span>
            </div>
            <p className="text-gray-400 mb-6 max-w-md">
              The universal music command center that brings all your streaming services together 
              in one beautiful desktop application.
            </p>
            
            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-800 hover:bg-gray-700 rounded-lg flex items-center justify-center text-gray-400 hover:text-white transition-colors"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Product</h3>
            <ul className="space-y-2">
              {footerLinks.product.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 text-sm mb-4 md:mb-0">
              © {currentYear} OmniFusion Labs. All rights reserved.
            </div>
            
            <div className="flex items-center space-x-2 text-gray-400 text-sm">
              <span>Made with</span>
              <Heart className="w-4 h-4 text-red-500" />
              <span>by the OmniFusion team</span>
            </div>
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="mt-8 p-6 glass rounded-2xl">
          <div className="text-center">
            <h3 className="text-xl font-bold text-white mb-2">Stay Updated</h3>
            <p className="text-gray-400 mb-4">
              Get notified about new features, updates, and releases.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
              />
              <button className="btn-primary whitespace-nowrap">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="mt-6 text-center text-gray-400 text-sm">
          <p>
            Questions? Contact us at{' '}
            <a href="mailto:inkfusionlabs@icloud.com" className="text-blue-400 hover:text-blue-300">
              inkfusionlabs@icloud.com
            </a>
          </p>
          <p className="mt-2">
            Visit us at{' '}
            <a href="https://omnifusionmusic.com" className="text-blue-400 hover:text-blue-300">
              omnifusionmusic.com
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer 