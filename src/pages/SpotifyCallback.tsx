import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

export default function SpotifyCallback() {
  const [searchParams] = useSearchParams()
  const [code, setCode] = useState<string>('')
  const [error, setError] = useState<string>('')
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    // Extract authorization code from URL
    const authCode = searchParams.get('code')
    const errorParam = searchParams.get('error')
    const state = searchParams.get('state')

    if (errorParam) {
      setError(`Authorization failed: ${errorParam}`)
      return
    }

    if (!authCode) {
      setError('No authorization code found in URL')
      return
    }

    // Verify state parameter for security
    const savedState = localStorage.getItem('spotify_auth_state')
    if (state && savedState && state !== savedState) {
      setError('Invalid state parameter - possible security issue')
      return
    }

    setCode(authCode)
    
    // Clear the state from localStorage
    localStorage.removeItem('spotify_auth_state')
  }, [searchParams])

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy to clipboard:', err)
    }
  }

  const openDesktopApp = () => {
    // Try to open the desktop app
    try {
      window.location.href = 'omnifusion://spotify-callback?code=' + code
    } catch (err) {
      console.log('Could not open desktop app, showing manual instructions')
    }
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 flex items-center justify-center p-4">
        <div className="bg-gray-800 rounded-lg p-8 max-w-md w-full text-center">
          <div className="text-red-500 text-6xl mb-4">❌</div>
          <h1 className="text-2xl font-bold text-white mb-4">Authorization Failed</h1>
          <p className="text-gray-300 mb-6">{error}</p>
          <button 
            onClick={() => window.close()}
            className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded-lg transition-colors"
          >
            Close Window
          </button>
        </div>
      </div>
    )
  }

  if (!code) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 flex items-center justify-center p-4">
        <div className="bg-gray-800 rounded-lg p-8 max-w-md w-full text-center">
          <div className="w-8 h-8 border-2 border-harmony-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <h1 className="text-2xl font-bold text-white mb-4">Processing Authorization</h1>
          <p className="text-gray-300">Please wait...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 flex items-center justify-center p-4">
      <div className="bg-gray-800 rounded-lg p-8 max-w-lg w-full text-center shadow-2xl">
        <div className="text-green-500 text-6xl mb-4">🎵</div>
        <h1 className="text-3xl font-bold text-white mb-2">Authorization Successful!</h1>
        <p className="text-gray-300 mb-6">
          Your Spotify account has been authorized. Copy the code below and paste it into the OmniFusion Music app.
        </p>
        
        <div className="bg-gray-700 rounded-lg p-4 mb-6">
          <p className="text-sm text-gray-400 mb-2">Authorization Code:</p>
          <div className="bg-gray-900 rounded p-3 mb-3">
            <code className="text-green-400 text-lg font-mono break-all">{code}</code>
          </div>
          <button
            onClick={copyToClipboard}
            className={`w-full py-3 px-4 rounded-lg font-semibold transition-all ${
              copied 
                ? 'bg-green-600 text-white' 
                : 'bg-harmony-500 hover:bg-harmony-600 text-white'
            }`}
          >
            {copied ? '✅ Copied!' : '📋 Copy Code'}
          </button>
        </div>

        <div className="space-y-3">
          <button
            onClick={openDesktopApp}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-semibold transition-colors"
          >
            🖥️ Open Desktop App
          </button>
          
          <div className="text-sm text-gray-400">
            <p>If the desktop app doesn't open automatically:</p>
            <ol className="text-left mt-2 space-y-1">
              <li>1. Return to the OmniFusion Music app</li>
              <li>2. Go to Settings → Music Services</li>
              <li>3. Click "Connect Spotify"</li>
              <li>4. Paste the code above when prompted</li>
            </ol>
          </div>
        </div>

        <button 
          onClick={() => window.close()}
          className="mt-6 text-gray-400 hover:text-white transition-colors"
        >
          Close this window
        </button>
      </div>
    </div>
  )
} 