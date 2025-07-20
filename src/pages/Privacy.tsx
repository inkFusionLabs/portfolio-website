import React from 'react';
import { Shield, Lock, Eye, Database } from 'lucide-react';

const Privacy: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center p-3 bg-indigo-500/10 rounded-full mb-6">
            <Shield className="w-8 h-8 text-indigo-400" />
          </div>
          <h1 className="text-4xl font-bold mb-4">Privacy Policy</h1>
          <p className="text-xl text-gray-400">Last updated: January 15, 2024</p>
        </div>

        {/* Content */}
        <div className="prose prose-invert max-w-none">
          <div className="bg-slate-800/50 rounded-xl p-8 mb-8">
            <h2 className="text-2xl font-semibold mb-4 flex items-center">
              <Lock className="w-6 h-6 mr-2 text-indigo-400" />
              Your Privacy Matters
            </h2>
            <p className="text-gray-300 leading-relaxed">
              At OmniFusion Music, we believe your privacy is fundamental. This policy explains how we collect, 
              use, and protect your information when you use our desktop application.
            </p>
          </div>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Information We Collect</h2>
            <div className="bg-slate-800/50 rounded-xl p-6">
              <h3 className="text-xl font-medium mb-3">Local Data Only</h3>
              <p className="text-gray-300 mb-4">
                OmniFusion Music operates entirely on your local device. We do not collect, store, or transmit 
                any personal information to our servers.
              </p>
              <ul className="space-y-2 text-gray-300">
                <li>• Music preferences and settings (stored locally)</li>
                <li>• Playlist information (from your connected services)</li>
                <li>• Application usage data (stored locally only)</li>
              </ul>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Third-Party Services</h2>
            <div className="bg-slate-800/50 rounded-xl p-6">
              <h3 className="text-xl font-medium mb-3">Music Service Integration</h3>
              <p className="text-gray-300 mb-4">
                When you connect to music services like Spotify or Apple Music, you're connecting directly 
                to their APIs. We do not intercept or store your credentials.
              </p>
              <ul className="space-y-2 text-gray-300">
                <li>• Spotify: Uses OAuth 2.0 for secure authentication</li>
                <li>• Apple Music: Uses your system's authentication</li>
                <li>• YouTube Music: Uses your browser's authentication</li>
              </ul>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Data Security</h2>
            <div className="bg-slate-800/50 rounded-xl p-6">
              <div className="flex items-start mb-4">
                <Eye className="w-6 h-6 mr-3 text-green-400 mt-1" />
                <div>
                  <h3 className="text-xl font-medium mb-2">Local Storage</h3>
                  <p className="text-gray-300">
                    All your data is stored locally on your device using secure, encrypted storage methods.
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <Database className="w-6 h-6 mr-3 text-blue-400 mt-1" />
                <div>
                  <h3 className="text-xl font-medium mb-2">No Cloud Storage</h3>
                  <p className="text-gray-300">
                    We don't use cloud storage or external databases. Your music data never leaves your device.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Analytics and Tracking</h2>
            <div className="bg-slate-800/50 rounded-xl p-6">
              <h3 className="text-xl font-medium mb-3">No Tracking</h3>
              <p className="text-gray-300 mb-4">
                OmniFusion Music does not include any analytics, tracking, or telemetry features. 
                We respect your privacy and don't monitor your usage.
              </p>
              <ul className="space-y-2 text-gray-300">
                <li>• No usage analytics</li>
                <li>• No crash reporting</li>
                <li>• No user behavior tracking</li>
                <li>• No advertising or marketing data collection</li>
              </ul>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Updates and Changes</h2>
            <div className="bg-slate-800/50 rounded-xl p-6">
              <p className="text-gray-300 mb-4">
                We may update this privacy policy from time to time. Any changes will be reflected in the 
                "Last updated" date at the top of this page.
              </p>
              <p className="text-gray-300">
                For significant changes, we will notify users through the application or our website.
              </p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
            <div className="bg-slate-800/50 rounded-xl p-6">
              <p className="text-gray-300 mb-4">
                If you have any questions about this privacy policy or our privacy practices, please contact us:
              </p>
              <ul className="space-y-2 text-gray-300">
                <li>• Email: privacy@omnifusionmusic.com</li>
                <li>• GitHub: github.com/omnifusionmusic</li>
                <li>• Website: omnifusionmusic.com</li>
              </ul>
            </div>
          </section>

          {/* Footer */}
          <div className="text-center mt-12 pt-8 border-t border-slate-700">
            <p className="text-gray-400">
              This privacy policy is effective as of January 15, 2024 and will remain in effect except with 
              respect to any changes in its provisions in the future.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Privacy; 