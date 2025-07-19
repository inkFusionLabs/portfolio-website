import { useEffect, useState } from 'react'
import { spotifyService } from '../services/spotify'

export default function SpotifyCallback() {
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading')
  const [message, setMessage] = useState('Connecting to Spotify...')
  const [code, setCode] = useState('')

  useEffect(() => {
    const handleCallback = async () => {
      try {
        // Get URL parameters
        const urlParams = new URLSearchParams(window.location.search)
        const authCode = urlParams.get('code')
        const state = urlParams.get('state')
        const error = urlParams.get('error')

        if (error) {
          setStatus('error')
          setMessage(`Authorization failed: ${error}`)
          return
        }

        if (!authCode || !state) {
          setStatus('error')
          setMessage('Missing authorization code or state parameter')
          return
        }

        // Store the code and show it to user
        setCode(authCode)
        setStatus('success')
        setMessage('Authorization successful! Copy the code below and return to the app.')
        
      } catch (error) {
        console.error('Error in Spotify callback:', error)
        setStatus('error')
        setMessage('An unexpected error occurred')
      }
    }

    handleCallback()
  }, [])

  const copyCode = async () => {
    try {
      await navigator.clipboard.writeText(code)
      alert('Code copied to clipboard! Return to the app and paste it.')
    } catch (error) {
      alert('Failed to copy. Please manually select and copy the code.')
    }
  }

  const handleManualCode = async () => {
    try {
      const success = await spotifyService.handleManualCode(code)
      if (success) {
        setMessage('Successfully connected! You can close this window.')
        setTimeout(() => window.close(), 2000)
      } else {
        setMessage('Failed to connect. Please try again.')
      }
    } catch (error) {
      setMessage(`Connection failed: ${error instanceof Error ? error.message : 'Unknown error'}`)
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-6">
      <div className="bg-gray-800 rounded-lg p-8 max-w-md w-full text-center">
        <div className="mb-6">
          {status === 'loading' && (
            <div className="w-12 h-12 border-4 border-harmony-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          )}
          {status === 'success' && (
            <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          )}
          {status === 'error' && (
            <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
          )}
        </div>
        
        <h2 className="text-xl font-semibold text-white mb-2">
          {status === 'loading' && 'Connecting to Spotify'}
          {status === 'success' && 'Authorization Successful!'}
          {status === 'error' && 'Connection Failed'}
        </h2>
        
        <p className="text-gray-400 text-sm mb-6">
          {message}
        </p>
        
        {status === 'success' && code && (
          <div className="space-y-4">
            <div className="bg-gray-700 rounded-lg p-4">
              <p className="text-sm text-gray-300 mb-2">Authorization Code:</p>
              <div className="bg-gray-800 rounded p-3 font-mono text-sm text-white break-all border border-gray-600">
                {code}
              </div>
            </div>
            
            <div className="flex space-x-3">
              <button
                onClick={copyCode}
                className="flex-1 px-4 py-2 bg-harmony-500 hover:bg-harmony-600 text-white rounded-lg transition-colors"
              >
                Copy Code
              </button>
              <button
                onClick={handleManualCode}
                className="flex-1 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors"
              >
                Connect Now
              </button>
            </div>
            
            <p className="text-xs text-gray-500">
              Option 1: Copy the code and paste it in the app<br />
              Option 2: Click "Connect Now" to connect directly
            </p>
          </div>
        )}
        
        {status === 'error' && (
          <button
            onClick={() => window.close()}
            className="px-6 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors"
          >
            Close Window
          </button>
        )}
      </div>
    </div>
  )
} 