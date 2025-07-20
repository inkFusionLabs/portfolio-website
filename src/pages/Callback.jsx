import React, { useEffect, useState } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { CheckCircle, XCircle, Loader2, Music, Shield, Users, Download } from 'lucide-react'

const Callback = () => {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const [status, setStatus] = useState('loading')
  const [message, setMessage] = useState('Processing your request...')
  const [error, setError] = useState(null)
  const [countdown, setCountdown] = useState(5)

  useEffect(() => {
    const handleCallback = async () => {
      try {
        // Get callback parameters
        const code = searchParams.get('code')
        const state = searchParams.get('state')
        const error = searchParams.get('error')
        const callbackType = searchParams.get('type') || 'oauth'

        // Handle different callback types
        switch (callbackType) {
          case 'spotify':
            await handleSpotifyCallback(code, state, error)
            break
          case 'github':
            await handleGitHubCallback(code, state, error)
            break
          case 'download':
            await handleDownloadCallback(code, error)
            break
          case 'newsletter':
            await handleNewsletterCallback(code, error)
            break
          default:
            await handleGenericCallback(code, state, error)
        }
      } catch (err) {
        console.error('Callback error:', err)
        setStatus('error')
        setError(err.message)
        setMessage('Something went wrong. Please try again.')
      }
    }

    handleCallback()
  }, [searchParams, navigate])

  // Countdown timer for auto-redirect
  useEffect(() => {
    if (status === 'success' || status === 'error') {
      const timer = setInterval(() => {
        setCountdown(prev => {
          if (prev <= 1) {
            clearInterval(timer)
            navigate('/')
            return 0
          }
          return prev - 1
        })
      }, 1000)

      return () => clearInterval(timer)
    }
  }, [status, navigate])

  const handleSpotifyCallback = async (code, state, error) => {
    if (error) {
      throw new Error(`Spotify authorization failed: ${error}`)
    }

    if (!code) {
      throw new Error('No authorization code received from Spotify')
    }

    // Simulate API call to exchange code for tokens
    setMessage('Connecting to Spotify...')
    await new Promise(resolve => setTimeout(resolve, 2000))

    // Here you would typically:
    // 1. Send the code to your backend
    // 2. Exchange it for access/refresh tokens
    // 3. Store tokens securely
    // 4. Redirect to the app

    setStatus('success')
    setMessage('Successfully connected to Spotify!')
  }

  const handleGitHubCallback = async (code, state, error) => {
    if (error) {
      throw new Error(`GitHub authorization failed: ${error}`)
    }

    if (!code) {
      throw new Error('No authorization code received from GitHub')
    }

    setMessage('Connecting to GitHub...')
    await new Promise(resolve => setTimeout(resolve, 1500))

    // Here you would typically:
    // 1. Exchange code for access token
    // 2. Fetch user information
    // 3. Create or update user account
    // 4. Set up authentication session

    setStatus('success')
    setMessage('Successfully connected to GitHub!')
  }

  const handleDownloadCallback = async (code, error) => {
    if (error) {
      throw new Error(`Download failed: ${error}`)
    }

    setMessage('Preparing your download...')
    await new Promise(resolve => setTimeout(resolve, 1000))

    // Here you would typically:
    // 1. Verify download request
    // 2. Generate download link
    // 3. Track download analytics
    // 4. Redirect to download

    setStatus('success')
    setMessage('Download ready! Starting download...')
  }

  const handleNewsletterCallback = async (code, error) => {
    if (error) {
      throw new Error(`Newsletter subscription failed: ${error}`)
    }

    setMessage('Confirming your subscription...')
    await new Promise(resolve => setTimeout(resolve, 1000))

    // Here you would typically:
    // 1. Verify subscription token
    // 2. Activate subscription
    // 3. Send welcome email
    // 4. Update user preferences

    setStatus('success')
    setMessage('Newsletter subscription confirmed!')
  }

  const handleGenericCallback = async (code, state, error) => {
    if (error) {
      throw new Error(`Authentication failed: ${error}`)
    }

    setMessage('Processing authentication...')
    await new Promise(resolve => setTimeout(resolve, 1500))

    setStatus('success')
    setMessage('Authentication successful!')
  }

  const getStatusIcon = () => {
    switch (status) {
      case 'loading':
        return <Loader2 className="w-16 h-16 text-blue-400 animate-spin" />
      case 'success':
        return <CheckCircle className="w-16 h-16 text-green-400" />
      case 'error':
        return <XCircle className="w-16 h-16 text-red-400" />
      default:
        return <Loader2 className="w-16 h-16 text-blue-400 animate-spin" />
    }
  }

  const getStatusColor = () => {
    switch (status) {
      case 'loading':
        return 'from-blue-500 to-cyan-500'
      case 'success':
        return 'from-green-500 to-emerald-500'
      case 'error':
        return 'from-red-500 to-pink-500'
      default:
        return 'from-blue-500 to-cyan-500'
    }
  }

  const getBackgroundColor = () => {
    switch (status) {
      case 'loading':
        return 'bg-blue-500/10'
      case 'success':
        return 'bg-green-500/10'
      case 'error':
        return 'bg-red-500/10'
      default:
        return 'bg-blue-500/10'
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl floating-element"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl floating-element-delayed"></div>
      </div>

      <div className="relative z-10 max-w-md w-full">
        {/* Main Callback Card */}
        <div className={`glass p-8 rounded-3xl text-center ${getBackgroundColor()}`}>
          {/* Status Icon */}
          <div className="flex justify-center mb-6">
            {getStatusIcon()}
          </div>

          {/* Status Title */}
          <h1 className="text-3xl font-bold text-white mb-4">
            {status === 'loading' && 'Processing...'}
            {status === 'success' && 'Success!'}
            {status === 'error' && 'Error'}
          </h1>

          {/* Status Message */}
          <p className="text-xl text-gray-200 mb-6">
            {message}
          </p>

          {/* Error Details */}
          {error && (
            <div className="bg-red-500/20 border border-red-500/30 rounded-xl p-4 mb-6">
              <p className="text-red-300 text-sm">{error}</p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="space-y-3">
            {status === 'success' && (
              <button
                onClick={() => navigate('/')}
                className={`w-full py-3 px-6 bg-gradient-to-r ${getStatusColor()} text-white font-semibold rounded-xl hover:opacity-90 transition-opacity`}
              >
                Continue to OmniFusion Music
              </button>
            )}

            {status === 'error' && (
              <div className="space-y-3">
                <button
                  onClick={() => window.location.reload()}
                  className="w-full py-3 px-6 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold rounded-xl hover:opacity-90 transition-opacity"
                >
                  Try Again
                </button>
                <button
                  onClick={() => navigate('/')}
                  className="w-full py-3 px-6 bg-white/10 text-white font-semibold rounded-xl hover:bg-white/20 transition-colors"
                >
                  Go Home
                </button>
              </div>
            )}

            {/* Countdown */}
            {(status === 'success' || status === 'error') && (
              <p className="text-sm text-gray-400">
                Redirecting in {countdown} seconds...
              </p>
            )}
          </div>
        </div>

        {/* Additional Info Cards */}
        <div className="mt-6 space-y-4">
          {/* What's Next */}
          {status === 'success' && (
            <div className="glass p-6 rounded-2xl">
              <h3 className="text-lg font-semibold text-white mb-4">What's Next?</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Music className="w-5 h-5 text-green-400" />
                  <span className="text-gray-300">Start exploring your music library</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Users className="w-5 h-5 text-blue-400" />
                  <span className="text-gray-300">Connect with other music lovers</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Download className="w-5 h-5 text-purple-400" />
                  <span className="text-gray-300">Download the desktop app</span>
                </div>
              </div>
            </div>
          )}

          {/* Security Info */}
          <div className="glass p-6 rounded-2xl">
            <div className="flex items-center space-x-3 mb-3">
              <Shield className="w-5 h-5 text-green-400" />
              <h3 className="text-lg font-semibold text-white">Security</h3>
            </div>
            <p className="text-gray-300 text-sm">
              Your data is encrypted and secure. We never store sensitive information like passwords.
            </p>
          </div>

          {/* Support */}
          <div className="glass p-6 rounded-2xl">
            <h3 className="text-lg font-semibold text-white mb-3">Need Help?</h3>
            <div className="space-y-2">
              <button
                onClick={() => navigate('/#faq')}
                className="w-full text-left text-gray-300 hover:text-white transition-colors text-sm"
              >
                📖 Check our FAQ
              </button>
              <button
                onClick={() => navigate('/#community')}
                className="w-full text-left text-gray-300 hover:text-white transition-colors text-sm"
              >
                💬 Join our community
              </button>
              <a
                href="mailto:support@omnifusionmusic.com"
                className="block text-gray-300 hover:text-white transition-colors text-sm"
              >
                📧 Contact support
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Callback 