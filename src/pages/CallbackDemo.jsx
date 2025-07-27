import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Music, Github, Download, Mail, Shield, Play, ExternalLink } from 'lucide-react'
import callbackService from '../services/callbackService.js'

const CallbackDemo = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  const handleOAuthRedirect = async (service) => {
    setLoading(true)
    try {
      const url = callbackService.generateOAuthUrl(service)
      // Use a safer navigation method
      if (url && url.startsWith('http')) {
        window.open(url, '_blank', 'noopener,noreferrer')
      } else {
        navigate(url)
      }
    } catch (error) {
      console.error(`Failed to generate ${service} OAuth URL:`, error)
      // Show a fallback message
      alert(`Demo: ${service} OAuth flow would redirect to external service`)
    } finally {
      setLoading(false)
    }
  }

  const handleDownloadRedirect = () => {
    setLoading(true)
    try {
      const url = callbackService.generateDownloadUrl('macos', '1.2.0')
      navigate(url)
    } catch (error) {
      console.error('Failed to generate download URL:', error)
      alert('Demo: Download callback would trigger file download')
    } finally {
      setLoading(false)
    }
  }

  const handleNewsletterRedirect = () => {
    setLoading(true)
    try {
      const url = callbackService.generateNewsletterUrl('demo@example.com', 'demo_token_123')
      navigate(url)
    } catch (error) {
      console.error('Failed to generate newsletter URL:', error)
      alert('Demo: Newsletter confirmation would activate subscription')
    } finally {
      setLoading(false)
    }
  }

  const demoCallbacks = [
    {
      title: 'Spotify OAuth',
      description: 'Connect your Spotify account to OmniFusion Music',
      icon: <Music className="w-8 h-8" />,
      color: 'from-green-500 to-emerald-500',
      action: () => handleOAuthRedirect('spotify'),
      type: 'oauth'
    },
    {
      title: 'GitHub OAuth',
      description: 'Sign in with GitHub to access community features',
      icon: <Github className="w-8 h-8" />,
      color: 'from-gray-700 to-gray-900',
      action: () => handleOAuthRedirect('github'),
      type: 'oauth'
    },
    {
      title: 'Download Callback',
      description: 'Test download flow with callback tracking',
      icon: <Download className="w-8 h-8" />,
      color: 'from-blue-500 to-cyan-500',
      action: handleDownloadRedirect,
      type: 'download'
    },
    {
      title: 'Newsletter Confirmation',
      description: 'Test newsletter subscription confirmation',
      icon: <Mail className="w-8 h-8" />,
      color: 'from-purple-500 to-pink-500',
      action: handleNewsletterRedirect,
      type: 'newsletter'
    }
  ]

  const testUrls = [
    {
      title: 'Success Callback',
      description: 'Simulate successful authentication',
      url: '/callback?type=spotify&code=success_code_123&state=test_state',
      color: 'from-green-500 to-emerald-500'
    },
    {
      title: 'Error Callback',
      description: 'Simulate authentication error',
      url: '/callback?type=spotify&error=access_denied&error_description=User%20denied%20access',
      color: 'from-red-500 to-pink-500'
    },
    {
      title: 'Loading State',
      description: 'Show loading state (no parameters)',
      url: '/callback',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      title: 'Download Success',
      description: 'Simulate successful download',
      url: '/callback?type=download&code=download_success',
      color: 'from-yellow-500 to-orange-500'
    }
  ]

  return (
    <div className="min-h-screen bg-gray-900 py-20">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl floating-element"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl floating-element-delayed"></div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 glass rounded-full mb-6">
            <Shield className="w-4 h-4 text-blue-400 mr-2" />
            <span className="text-sm font-medium">Callback Demo</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-black text-white mb-8">
            Test Your
            <span className="gradient-text"> Callbacks</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 max-w-4xl mx-auto leading-relaxed">
            Test different OAuth flows and callback scenarios for OmniFusion Music
          </p>
        </div>

        {/* OAuth Callbacks */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white text-center mb-12">OAuth & Authentication</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {demoCallbacks.map((callback, index) => (
              <div key={index} className="glass p-6 rounded-2xl hover:scale-105 transition-all duration-300">
                <div className="flex items-start space-x-4">
                  <div className={`w-16 h-16 bg-gradient-to-r ${callback.color} rounded-xl flex items-center justify-center text-white flex-shrink-0`}>
                    {callback.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white mb-2">{callback.title}</h3>
                    <p className="text-gray-300 mb-4">{callback.description}</p>
                    <button
                      onClick={callback.action}
                      disabled={loading}
                      className={`px-6 py-3 bg-gradient-to-r ${callback.color} text-white font-semibold rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center space-x-2`}
                    >
                      {loading ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          <span>Loading...</span>
                        </>
                      ) : (
                        <>
                          <Play className="w-4 h-4" />
                          <span>Test {callback.type === 'oauth' ? 'OAuth' : callback.type}</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Test URLs */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white text-center mb-12">Test Different Scenarios</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {testUrls.map((test, index) => (
              <div key={index} className="glass p-6 rounded-2xl">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">{test.title}</h3>
                    <p className="text-gray-300 text-sm">{test.description}</p>
                  </div>
                  <div className={`w-12 h-12 bg-gradient-to-r ${test.color} rounded-xl flex items-center justify-center text-white`}>
                    <ExternalLink className="w-6 h-6" />
                  </div>
                </div>
                <button
                  onClick={() => navigate(test.url)}
                  className={`w-full py-3 px-6 bg-gradient-to-r ${test.color} text-white font-semibold rounded-xl hover:opacity-90 transition-opacity`}
                >
                  Test Scenario
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Information */}
        <div className="glass p-8 rounded-3xl">
          <h2 className="text-2xl font-bold text-white mb-6">How Callbacks Work</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-white">1</span>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Initiate Flow</h3>
              <p className="text-gray-300 text-sm">
                User clicks login/download button and gets redirected to service
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-white">2</span>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Service Redirects</h3>
              <p className="text-gray-300 text-sm">
                Service processes request and redirects back to callback URL
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-white">3</span>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Process Result</h3>
              <p className="text-gray-300 text-sm">
                Callback page processes result and shows success/error state
              </p>
            </div>
          </div>
        </div>



        {/* Back to Home */}
        <div className="text-center mt-12">
          <button
            onClick={() => navigate('/')}
            className="btn-primary px-8 py-4 text-lg rounded-full"
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  )
}

export default CallbackDemo 