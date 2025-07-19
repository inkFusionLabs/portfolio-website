import { useState } from 'react'
import { Music, ExternalLink, CheckCircle, Copy, X } from 'lucide-react'
import { spotifyService } from '../services/spotify'
import { open } from '@tauri-apps/api/shell'

interface SpotifyOnboardingProps {
  onComplete: () => void
  onSkip: () => void
}

export default function SpotifyOnboarding({ onComplete, onSkip }: SpotifyOnboardingProps) {
  const [step, setStep] = useState<'intro' | 'connecting' | 'manual' | 'success'>('intro')
  const [authUrl, setAuthUrl] = useState('')
  const [manualCode, setManualCode] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleStartConnection = async () => {
    setIsLoading(true)
    setError('')
    
    try {
      const url = await spotifyService.startAuth()
      setAuthUrl(url)
      
      // Open Spotify's authentication page
      await open(url)
      setStep('connecting')
      
    } catch (error) {
      console.error('Failed to start Spotify authentication:', error)
      setError(error instanceof Error ? error.message : 'Failed to start authentication')
    } finally {
      setIsLoading(false)
    }
  }

  const handleManualCodeSubmit = async () => {
    if (!manualCode.trim()) {
      setError('Please enter the authorization code')
      return
    }

    setIsLoading(true)
    setError('')
    
    try {
      const success = await spotifyService.handleManualCode(manualCode.trim())
      
      if (success) {
        setStep('success')
        setTimeout(() => {
          onComplete()
        }, 2000)
      } else {
        setError('Invalid authorization code. Please try again.')
      }
    } catch (error) {
      console.error('Failed to handle manual code:', error)
      setError(error instanceof Error ? error.message : 'Failed to authenticate')
    } finally {
      setIsLoading(false)
    }
  }

  const copyAuthUrl = async () => {
    try {
      await navigator.clipboard.writeText(authUrl)
    } catch (error) {
      console.error('Failed to copy URL:', error)
    }
  }

  const handleSkip = () => {
    onSkip()
  }

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-6 z-50">
      <div className="glass-effect rounded-xl p-8 max-w-md w-full">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center">
              <Music className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Connect Spotify</h2>
              <p className="text-sm text-gray-400">Step {step === 'intro' ? 1 : step === 'connecting' ? 2 : step === 'manual' ? 3 : 4} of 4</p>
            </div>
          </div>
          <button
            onClick={handleSkip}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        {step === 'intro' && (
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-lg font-semibold text-white mb-2">
                Welcome to OmniFusion Music!
              </h3>
              <p className="text-gray-300 mb-4">
                Connect your Spotify account to access your music library, playlists, and start streaming your favorite tracks.
              </p>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center space-x-3 p-3 bg-gray-800/30 rounded-lg">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span className="text-sm text-gray-300">Access your music library</span>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-gray-800/30 rounded-lg">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span className="text-sm text-gray-300">Control playback from the app</span>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-gray-800/30 rounded-lg">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span className="text-sm text-gray-300">Manage your playlists</span>
              </div>
            </div>

            <button
              onClick={handleStartConnection}
              disabled={isLoading}
              className="w-full px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Opening...</span>
                </>
              ) : (
                <>
                  <ExternalLink className="w-4 h-4" />
                  <span>Connect Spotify</span>
                </>
              )}
            </button>
          </div>
        )}

        {step === 'connecting' && (
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-lg font-semibold text-white mb-2">
                Authorize Spotify
              </h3>
              <p className="text-gray-300 mb-4">
                A browser window should have opened. If not, copy the URL below and paste it in your browser.
              </p>
            </div>

            {authUrl && (
              <div className="space-y-3">
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={authUrl}
                    readOnly
                    className="flex-1 px-3 py-2 text-sm bg-gray-800 border border-gray-600 rounded text-gray-300"
                  />
                  <button
                    onClick={copyAuthUrl}
                    className="px-3 py-2 bg-gray-600 hover:bg-gray-700 rounded text-white"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            <div className="space-y-3">
              <p className="text-sm text-gray-400">
                After authorizing, you'll get a code. Paste it here:
              </p>
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={manualCode}
                  onChange={(e) => setManualCode(e.target.value)}
                  placeholder="Enter authorization code"
                  className="flex-1 px-3 py-2 bg-gray-800 border border-gray-600 rounded text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                <button
                  onClick={handleManualCodeSubmit}
                  disabled={isLoading || !manualCode.trim()}
                  className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? 'Connecting...' : 'Connect'}
                </button>
              </div>
            </div>

            {error && (
              <div className="p-3 bg-red-500/20 border border-red-500/30 rounded-lg">
                <p className="text-sm text-red-400">{error}</p>
              </div>
            )}
          </div>
        )}

        {step === 'success' && (
          <div className="text-center space-y-6">
            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle className="w-8 h-8 text-white" />
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-white mb-2">
                Successfully Connected!
              </h3>
              <p className="text-gray-300">
                Your Spotify account is now connected. You can start exploring your music library.
              </p>
            </div>
          </div>
        )}

        {/* Footer */}
        {step !== 'success' && (
          <div className="mt-6 pt-6 border-t border-gray-700">
            <button
              onClick={handleSkip}
              className="w-full px-4 py-2 text-gray-400 hover:text-white transition-colors"
            >
              Skip for now
            </button>
          </div>
        )}
      </div>
    </div>
  )
} 