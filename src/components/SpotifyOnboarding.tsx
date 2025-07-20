import { useState } from 'react'
import { Music, ExternalLink, CheckCircle, AlertCircle, Loader } from 'lucide-react'
import { spotifyService } from '../services/spotify'
import { useNotifications } from '../contexts/NotificationContext'

interface SpotifyOnboardingProps {
  onSuccess?: () => void
  onCancel?: () => void
}

export default function SpotifyOnboarding({ onSuccess, onCancel }: SpotifyOnboardingProps) {
  const [isConnecting, setIsConnecting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [step, setStep] = useState<'initial' | 'connecting' | 'success' | 'error'>('initial')
  const { showSuccess, showError } = useNotifications()

  const handleConnect = async () => {
    setIsConnecting(true)
    setError(null)
    setStep('connecting')

    try {
      await spotifyService.startAuth()
      setStep('success')
      showSuccess('Spotify Connected!', 'Your Spotify account has been successfully connected.')
      onSuccess?.()
    } catch (err) {
      console.error('Spotify connection failed:', err)
      const errorMessage = err instanceof Error ? err.message : 'Failed to connect to Spotify'
      setError(errorMessage)
      setStep('error')
      showError('Connection Failed', errorMessage)
    } finally {
      setIsConnecting(false)
    }
  }

  const handleRetry = () => {
    setStep('initial')
    setError(null)
  }

  return (
    <div className="glass-effect rounded-xl p-8 max-w-md mx-auto">
      <div className="text-center space-y-6">
        {/* Header */}
        <div className="space-y-2">
          <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto">
            <Music className="w-8 h-8 text-green-400" />
          </div>
          <h2 className="text-2xl font-bold text-white">Connect Spotify</h2>
          <p className="text-gray-400">
            Connect your Spotify account to start enjoying your music library
          </p>
        </div>

        {/* Connection Steps */}
        {step === 'initial' && (
          <div className="space-y-4">
            <div className="text-left space-y-3">
              <div className="flex items-center space-x-3 text-sm text-gray-300">
                <CheckCircle className="w-4 h-4 text-green-400" />
                <span>Access your playlists and library</span>
              </div>
              <div className="flex items-center space-x-3 text-sm text-gray-300">
                <CheckCircle className="w-4 h-4 text-green-400" />
                <span>Control playback from OmniFusion</span>
              </div>
              <div className="flex items-center space-x-3 text-sm text-gray-300">
                <CheckCircle className="w-4 h-4 text-green-400" />
                <span>Search across your music</span>
              </div>
            </div>
            
            <button
              onClick={handleConnect}
              disabled={isConnecting}
              className="w-full px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              {isConnecting ? (
                <>
                  <Loader className="w-4 h-4 animate-spin" />
                  <span>Connecting...</span>
                </>
              ) : (
                <>
                  <ExternalLink className="w-4 h-4" />
                  <span>Connect Spotify Account</span>
                </>
              )}
            </button>
          </div>
        )}

        {step === 'connecting' && (
          <div className="space-y-4">
            <div className="flex items-center justify-center space-x-3">
              <Loader className="w-6 h-6 animate-spin text-green-400" />
              <span className="text-white">Opening Spotify authorization...</span>
            </div>
            <p className="text-sm text-gray-400">
              Please complete the authorization in your browser. You'll be redirected back to complete the setup.
            </p>
          </div>
        )}

        {step === 'success' && (
          <div className="space-y-4">
            <div className="flex items-center justify-center space-x-3">
              <CheckCircle className="w-6 h-6 text-green-400" />
              <span className="text-white">Successfully Connected!</span>
            </div>
            <p className="text-sm text-gray-400">
              Your Spotify account is now connected. You can start exploring your music library.
            </p>
          </div>
        )}

        {step === 'error' && (
          <div className="space-y-4">
            <div className="flex items-center justify-center space-x-3">
              <AlertCircle className="w-6 h-6 text-red-400" />
              <span className="text-white">Connection Failed</span>
            </div>
            <p className="text-sm text-red-400">{error}</p>
            <div className="flex space-x-3">
              <button
                onClick={handleRetry}
                className="flex-1 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors"
              >
                Try Again
              </button>
              {onCancel && (
                <button
                  onClick={onCancel}
                  className="flex-1 px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors"
                >
                  Cancel
                </button>
              )}
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="text-xs text-gray-500">
          By connecting, you agree to Spotify's terms of service and privacy policy.
        </div>
      </div>
    </div>
  )
} 