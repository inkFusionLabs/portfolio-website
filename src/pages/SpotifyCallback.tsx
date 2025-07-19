import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { spotifyService } from '../services/spotify'
import { Loader, CheckCircle, XCircle } from 'lucide-react'

export default function SpotifyCallback() {
  const navigate = useNavigate()
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading')
  const [message, setMessage] = useState('Processing authorization...')

  useEffect(() => {
    handleCallback()
  }, [])

  const handleCallback = async () => {
    try {
      const urlParams = new URLSearchParams(window.location.search)
      const code = urlParams.get('code')
      const state = urlParams.get('state')
      const error = urlParams.get('error')

      if (error) {
        setStatus('error')
        setMessage(`Authorization failed: ${error}`)
        setTimeout(() => navigate('/'), 3000)
        return
      }

      if (!code) {
        setStatus('error')
        setMessage('No authorization code received')
        setTimeout(() => navigate('/'), 3000)
        return
      }

      // Verify state parameter
      const savedState = localStorage.getItem('spotify_auth_state')
      if (state !== savedState) {
        setStatus('error')
        setMessage('Invalid state parameter')
        setTimeout(() => navigate('/'), 3000)
        return
      }

      setMessage('Exchanging code for access token...')
      
      // Exchange code for access token
      const success = await spotifyService.handleManualCode(code)
      
      if (success) {
        setStatus('success')
        setMessage('Successfully connected to Spotify!')
        localStorage.removeItem('spotify_auth_state')
        setTimeout(() => navigate('/'), 2000)
      } else {
        setStatus('error')
        setMessage('Failed to exchange authorization code')
        setTimeout(() => navigate('/'), 3000)
      }
    } catch (error) {
      console.error('Callback error:', error)
      setStatus('error')
      setMessage('An unexpected error occurred')
      setTimeout(() => navigate('/'), 3000)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center">
      <div className="glass-effect rounded-xl p-8 max-w-md w-full mx-4 text-center">
        <div className="mb-6">
          {status === 'loading' && (
            <Loader className="w-12 h-12 text-harmony-500 animate-spin mx-auto" />
          )}
          {status === 'success' && (
            <CheckCircle className="w-12 h-12 text-green-500 mx-auto" />
          )}
          {status === 'error' && (
            <XCircle className="w-12 h-12 text-red-500 mx-auto" />
          )}
        </div>
        
        <h2 className="text-2xl font-bold text-white mb-4">
          {status === 'loading' && 'Connecting to Spotify...'}
          {status === 'success' && 'Connected Successfully!'}
          {status === 'error' && 'Connection Failed'}
        </h2>
        
        <p className="text-gray-300 mb-6">{message}</p>
        
        {status === 'loading' && (
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div className="bg-harmony-500 h-2 rounded-full animate-pulse"></div>
          </div>
        )}
        
        {status === 'error' && (
          <button
            onClick={() => navigate('/')}
            className="px-6 py-3 bg-harmony-500 hover:bg-harmony-600 text-white rounded-lg transition-colors"
          >
            Return to App
          </button>
        )}
      </div>
    </div>
  )
} 