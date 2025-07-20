import React from 'react';
import { FileText, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';

const Terms: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center p-3 bg-indigo-500/10 rounded-full mb-6">
            <FileText className="w-8 h-8 text-indigo-400" />
          </div>
          <h1 className="text-4xl font-bold mb-4">Terms of Service</h1>
          <p className="text-xl text-gray-400">Last updated: January 15, 2024</p>
        </div>

        {/* Content */}
        <div className="prose prose-invert max-w-none">
          <div className="bg-slate-800/50 rounded-xl p-8 mb-8">
            <h2 className="text-2xl font-semibold mb-4">Acceptance of Terms</h2>
            <p className="text-gray-300 leading-relaxed">
              By downloading, installing, or using OmniFusion Music, you agree to be bound by these Terms of Service. 
              If you do not agree to these terms, please do not use our application.
            </p>
          </div>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Description of Service</h2>
            <div className="bg-slate-800/50 rounded-xl p-6">
              <h3 className="text-xl font-medium mb-3">What OmniFusion Music Does</h3>
              <p className="text-gray-300 mb-4">
                OmniFusion Music is a desktop application that allows you to connect to multiple music streaming 
                services and manage your music library from a single interface.
              </p>
              <ul className="space-y-2 text-gray-300">
                <li>• Connect to music streaming services (Spotify, Apple Music, etc.)</li>
                <li>• Search and play music from connected services</li>
                <li>• Manage playlists and music libraries</li>
                <li>• Control music playback across services</li>
              </ul>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">User Responsibilities</h2>
            <div className="bg-slate-800/50 rounded-xl p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-xl font-medium mb-3 flex items-center text-green-400">
                    <CheckCircle className="w-5 h-5 mr-2" />
                    You May:
                  </h3>
                  <ul className="space-y-2 text-gray-300">
                    <li>• Use the application for personal, non-commercial purposes</li>
                    <li>• Connect to music services you have accounts with</li>
                    <li>• Download and install updates</li>
                    <li>• Provide feedback and report bugs</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-medium mb-3 flex items-center text-red-400">
                    <XCircle className="w-5 h-5 mr-2" />
                    You May Not:
                  </h3>
                  <ul className="space-y-2 text-gray-300">
                    <li>• Use the application for commercial purposes</li>
                    <li>• Reverse engineer or modify the application</li>
                    <li>• Distribute modified versions</li>
                    <li>• Violate music service terms of use</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Third-Party Services</h2>
            <div className="bg-slate-800/50 rounded-xl p-6">
              <h3 className="text-xl font-medium mb-3">Music Service Integration</h3>
              <p className="text-gray-300 mb-4">
                OmniFusion Music integrates with third-party music services. Your use of these services is 
                subject to their respective terms of service and privacy policies.
              </p>
              <div className="bg-slate-700/50 rounded-lg p-4">
                <h4 className="font-medium mb-2">Important Notice:</h4>
                <p className="text-gray-300 text-sm">
                  We are not affiliated with, endorsed by, or sponsored by Spotify, Apple Inc., Google, 
                  or any other music service provider. Their trademarks and service marks are the property 
                  of their respective owners.
                </p>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Intellectual Property</h2>
            <div className="bg-slate-800/50 rounded-xl p-6">
              <h3 className="text-xl font-medium mb-3">Our Rights</h3>
              <p className="text-gray-300 mb-4">
                OmniFusion Music and its original content, features, and functionality are owned by 
                OmniFusion Music and are protected by international copyright, trademark, patent, 
                trade secret, and other intellectual property laws.
              </p>
              <h3 className="text-xl font-medium mb-3">Your Rights</h3>
              <p className="text-gray-300">
                You retain all rights to your music content and playlists. We do not claim ownership 
                of any music or content you access through the application.
              </p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Disclaimer of Warranties</h2>
            <div className="bg-slate-800/50 rounded-xl p-6">
              <div className="flex items-start mb-4">
                <AlertTriangle className="w-6 h-6 mr-3 text-yellow-400 mt-1" />
                <div>
                  <h3 className="text-xl font-medium mb-2">"As Is" Service</h3>
                  <p className="text-gray-300">
                    OmniFusion Music is provided "as is" without any warranties, express or implied. 
                    We do not guarantee that the application will be error-free or uninterrupted.
                  </p>
                </div>
              </div>
              <ul className="space-y-2 text-gray-300">
                <li>• The application may have bugs or limitations</li>
                <li>• Music service integrations may change or break</li>
                <li>• Features may be added, modified, or removed</li>
                <li>• We are not responsible for music service outages</li>
              </ul>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Limitation of Liability</h2>
            <div className="bg-slate-800/50 rounded-xl p-6">
              <p className="text-gray-300 mb-4">
                In no event shall OmniFusion Music be liable for any indirect, incidental, special, 
                consequential, or punitive damages, including without limitation, loss of profits, 
                data, use, goodwill, or other intangible losses.
              </p>
              <p className="text-gray-300">
                Our total liability to you for any claims arising from the use of the application 
                shall not exceed the amount you paid for the application (which is $0 for the free version).
              </p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Updates and Changes</h2>
            <div className="bg-slate-800/50 rounded-xl p-6">
              <h3 className="text-xl font-medium mb-3">Terms Updates</h3>
              <p className="text-gray-300 mb-4">
                We reserve the right to modify these terms at any time. Changes will be effective 
                immediately upon posting on our website or within the application.
              </p>
              <h3 className="text-xl font-medium mb-3">Application Updates</h3>
              <p className="text-gray-300">
                We may release updates to improve functionality, fix bugs, or add new features. 
                Updates may be automatic or require manual installation.
              </p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Termination</h2>
            <div className="bg-slate-800/50 rounded-xl p-6">
              <p className="text-gray-300 mb-4">
                You may stop using OmniFusion Music at any time by uninstalling the application. 
                We may terminate or suspend access to the application immediately, without prior 
                notice, for any reason.
              </p>
              <p className="text-gray-300">
                Upon termination, your right to use the application will cease immediately, 
                and you should uninstall the application from your device.
              </p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Governing Law</h2>
            <div className="bg-slate-800/50 rounded-xl p-6">
              <p className="text-gray-300">
                These terms shall be governed by and construed in accordance with the laws of the 
                jurisdiction where OmniFusion Music operates, without regard to its conflict of law provisions.
              </p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Contact Information</h2>
            <div className="bg-slate-800/50 rounded-xl p-6">
              <p className="text-gray-300 mb-4">
                If you have any questions about these Terms of Service, please contact us:
              </p>
              <ul className="space-y-2 text-gray-300">
                <li>• Email: legal@omnifusionmusic.com</li>
                <li>• GitHub: github.com/omnifusionmusic</li>
                <li>• Website: omnifusionmusic.com</li>
              </ul>
            </div>
          </section>

          {/* Footer */}
          <div className="text-center mt-12 pt-8 border-t border-slate-700">
            <p className="text-gray-400">
              These terms of service are effective as of January 15, 2024. By using OmniFusion Music, 
              you acknowledge that you have read, understood, and agree to be bound by these terms.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Terms; 