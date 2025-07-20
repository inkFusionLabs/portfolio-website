import React, { useEffect, useState } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'

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
        return (
          <div className="w-16 h-16 text-blue-400 animate-spin">
            <svg fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2a10 10 0 0 0-10 10c0 5.5 4.5 10 10 10s10-4.5 10-10c0-5.5-4.5-10-10-10zm0 18c-4.4 0-8-3.6-8-8s3.6-8 8-8 8 3.6 8 8-3.6 8-8 8z"/>
              <path d="M12 4a8 8 0 0 0-8 8c0 4.4 3.6 8 8 8s8-3.6 8-8c0-4.4-3.6-8-8-8zm0 14c-3.3 0-6-2.7-6-6s2.7-6 6-6 6 2.7 6 6-2.7 6-6 6z"/>
            </svg>
          </div>
        )
      case 'success':
        return (
          <div className="w-16 h-16 text-green-400">
            <svg fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
            </svg>
          </div>
        )
      case 'error':
        return (
          <div className="w-16 h-16 text-red-400">
            <svg fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11H7v-2h10v2z"/>
            </svg>
          </div>
        )
      default:
        return (
          <div className="w-16 h-16 text-blue-400 animate-spin">
            <svg fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2a10 10 0 0 0-10 10c0 5.5 4.5 10 10 10s10-4.5 10-10c0-5.5-4.5-10-10-10zm0 18c-4.4 0-8-3.6-8-8s3.6-8 8-8 8 3.6 8 8-3.6 8-8 8z"/>
              <path d="M12 4a8 8 0 0 0-8 8c0 4.4 3.6 8 8 8s8-3.6 8-8c0-4.4-3.6-8-8-8zm0 14c-3.3 0-6-2.7-6-6s2.7-6 6-6 6 2.7 6 6-2.7 6-6 6z"/>
            </svg>
          </div>
        )
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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center p-4">
      {/* Background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"></div>
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
            <button
              onClick={() => navigate('/')}
              className="w-full px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/25"
            >
              Go to Homepage
            </button>
            
            {status === 'success' && (
              <button
                onClick={() => window.location.reload()}
                className="w-full px-6 py-3 bg-white/10 backdrop-blur-md text-white font-semibold rounded-xl border border-white/20 transition-all duration-300 hover:bg-white/20 hover:border-white/40"
              >
                Try Another Action
              </button>
            )}
            
            {status === 'error' && (
              <button
                onClick={() => window.location.reload()}
                className="w-full px-6 py-3 bg-white/10 backdrop-blur-md text-white font-semibold rounded-xl border border-white/20 transition-all duration-300 hover:bg-white/20 hover:border-white/40"
              >
                Try Again
              </button>
            )}
          </div>

          {/* Countdown */}
          {(status === 'success' || status === 'error') && (
            <p className="text-gray-400 text-sm mt-4">
              Redirecting in {countdown} seconds...
            </p>
          )}
        </div>

        {/* Help Section */}
        <div className="mt-6">
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
                href="mailto:inkfusionapps@icloud.com"
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