// Callback service for handling OAuth and other redirect scenarios
class CallbackService {
  constructor() {
    this.baseUrl = window.location.origin
    this.callbackUrl = `${this.baseUrl}/callback`
  }

  // Generate OAuth URLs for different services
  generateOAuthUrl(service, options = {}) {
    try {
      const baseUrls = {
        spotify: 'https://accounts.spotify.com/authorize',
        github: 'https://github.com/login/oauth/authorize',
        google: 'https://accounts.google.com/o/oauth2/v2/auth',
        discord: 'https://discord.com/api/oauth2/authorize'
      }

      const clientIds = {
        spotify: process.env.REACT_APP_SPOTIFY_CLIENT_ID || 'your_spotify_client_id',
        github: process.env.REACT_APP_GITHUB_CLIENT_ID || 'your_github_client_id',
        google: process.env.REACT_APP_GOOGLE_CLIENT_ID || 'your_google_client_id',
        discord: process.env.REACT_APP_DISCORD_CLIENT_ID || 'your_discord_client_id'
      }

      const scopes = {
        spotify: 'user-read-private user-read-email playlist-read-private playlist-modify-public playlist-modify-private',
        github: 'read:user user:email',
        google: 'https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email',
        discord: 'identify email'
      }

      const state = this.generateState()
      const params = new URLSearchParams({
        client_id: clientIds[service],
        redirect_uri: this.callbackUrl,
        response_type: 'code',
        scope: scopes[service],
        state: state,
        type: service,
        ...options
      })

      // Store state for verification
      this.storeState(state, service)

      return `${baseUrls[service]}?${params.toString()}`
    } catch (error) {
      console.error('Error generating OAuth URL:', error)
      // Return a safe fallback URL
      return `${this.callbackUrl}?type=${service}&error=generation_failed`
    }
  }

  // Generate state parameter for CSRF protection
  generateState() {
    try {
      // Use crypto.getRandomValues if available, otherwise fallback
      if (typeof crypto !== 'undefined' && crypto.getRandomValues) {
        const array = new Uint8Array(32)
        crypto.getRandomValues(array)
        return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('')
      } else {
        // Fallback for older browsers
        return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
      }
    } catch (error) {
      console.error('Error generating state:', error)
      // Fallback state generation
      return Date.now().toString(36) + Math.random().toString(36).substring(2, 15)
    }
  }

  // Store state for verification
  storeState(state, service) {
    try {
      const states = JSON.parse(localStorage.getItem('oauth_states') || '{}')
      states[state] = {
        service,
        timestamp: Date.now()
      }
      localStorage.setItem('oauth_states', JSON.stringify(states))
    } catch (error) {
      console.error('Error storing state:', error)
    }
  }

  // Verify state parameter
  verifyState(state) {
    try {
      const states = JSON.parse(localStorage.getItem('oauth_states') || '{}')
      const stateData = states[state]
      
      if (!stateData) {
        return false
      }

      // Check if state is not expired (5 minutes)
      if (Date.now() - stateData.timestamp > 5 * 60 * 1000) {
        delete states[state]
        localStorage.setItem('oauth_states', JSON.stringify(states))
        return false
      }

      // Remove used state
      delete states[state]
      localStorage.setItem('oauth_states', JSON.stringify(states))
      
      return stateData.service
    } catch (error) {
      console.error('Error verifying state:', error)
      return false
    }
  }

  // Handle Spotify OAuth
  async handleSpotifyAuth(code, state) {
    try {
      const service = this.verifyState(state)
      if (service !== 'spotify') {
        throw new Error('Invalid state parameter')
      }

      // For demo purposes, return mock data instead of making API calls
      return {
        success: true,
        user: {
          id: 'demo_user_123',
          name: 'Demo User',
          email: 'demo@example.com'
        },
        message: 'Demo authentication successful'
      }
    } catch (error) {
      console.error('Error handling Spotify auth:', error)
      return {
        success: false,
        error: error.message
      }
    }
  }

  // Handle GitHub OAuth
  async handleGitHubAuth(code, state) {
    try {
      const service = this.verifyState(state)
      if (service !== 'github') {
        throw new Error('Invalid state parameter')
      }

      // For demo purposes, return mock data instead of making API calls
      return {
        success: true,
        user: {
          id: 'demo_github_user',
          name: 'Demo GitHub User',
          email: 'demo@github.com'
        },
        message: 'Demo GitHub authentication successful'
      }
    } catch (error) {
      console.error('Error handling GitHub auth:', error)
      return {
        success: false,
        error: error.message
      }
    }
  }

  // Handle download callback
  async handleDownloadCallback(code) {
    try {
      // For demo purposes, return mock data instead of making API calls
      return {
        success: true,
        downloadUrl: 'https://example.com/demo-download',
        message: 'Demo download successful'
      }
    } catch (error) {
      console.error('Error handling download callback:', error)
      return {
        success: false,
        error: error.message
      }
    }
  }

  // Handle newsletter subscription callback
  async handleNewsletterCallback(token) {
    try {
      // For demo purposes, return mock data instead of making API calls
      return {
        success: true,
        message: 'Demo newsletter subscription confirmed'
      }
    } catch (error) {
      console.error('Error handling newsletter callback:', error)
      return {
        success: false,
        error: error.message
      }
    }
  }

  // Generate download URL with callback
  generateDownloadUrl(platform, version) {
    try {
      const params = new URLSearchParams({
        platform,
        version,
        timestamp: Date.now().toString()
      })

      return `${this.callbackUrl}?type=download&code=${btoa(params.toString())}`
    } catch (error) {
      console.error('Error generating download URL:', error)
      return `${this.callbackUrl}?type=download&error=generation_failed`
    }
  }

  // Generate newsletter confirmation URL
  generateNewsletterUrl(email, token) {
    try {
      const params = new URLSearchParams({
        email,
        token,
        timestamp: Date.now().toString()
      })

      return `${this.callbackUrl}?type=newsletter&code=${btoa(params.toString())}`
    } catch (error) {
      console.error('Error generating newsletter URL:', error)
      return `${this.callbackUrl}?type=newsletter&error=generation_failed`
    }
  }

  // Track callback analytics (safe version)
  trackCallback(type, success, error = null) {
    try {
      console.log(`Callback tracked: ${type} - ${success ? 'success' : 'failed'}`, error)
      // In a real implementation, you would send this to your analytics service
    } catch (err) {
      console.error('Error tracking callback:', err)
    }
  }

  // Cleanup expired states
  cleanupExpiredStates() {
    try {
      const states = JSON.parse(localStorage.getItem('oauth_states') || '{}')
      const now = Date.now()
      let cleaned = false

      Object.keys(states).forEach(state => {
        if (now - states[state].timestamp > 5 * 60 * 1000) {
          delete states[state]
          cleaned = true
        }
      })

      if (cleaned) {
        localStorage.setItem('oauth_states', JSON.stringify(states))
      }
    } catch (error) {
      console.error('Error cleaning up states:', error)
    }
  }

  // Initialize the service
  init() {
    try {
      this.cleanupExpiredStates()
      console.log('Callback service initialized')
    } catch (error) {
      console.error('Error initializing callback service:', error)
    }
  }
}

// Create and export a singleton instance
const callbackService = new CallbackService()
callbackService.init()

export default callbackService 