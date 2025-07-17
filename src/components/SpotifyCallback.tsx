import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { spotifyService } from '../services/spotify'

export default function SpotifyCallback() {
  const navigate = useNavigate()

  useEffect(() => {
    const handleCallback = async () => {
      const urlParams = new URLSearchParams(window.location.search)
      const code = urlParams.get('code')
      const error = urlParams.get('error')

      if (error) {
        console.error('Spotify authentication error:', error)
        navigate('/settings?error=spotify_auth_failed')
        return
      }

      if (code) {
        try {
          const success = await spotifyService.handleCallback(code)
          if (success) {
            navigate('/settings?success=spotify_connected')
          } else {
            navigate('/settings?error=spotify_connection_failed')
          }
        } catch (error) {
          console.error('Error handling Spotify callback:', error)
          navigate('/settings?error=spotify_connection_failed')
        }
      } else {
        navigate('/settings')
      }
    }

    handleCallback()
  }, [navigate])

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-harmony-500 mx-auto mb-4"></div>
        <h2 className="text-xl font-semibold text-white mb-2">Connecting to Spotify...</h2>
        <p className="text-gray-400">Please wait while we complete your authentication.</p>
      </div>
    </div>
  )
} 