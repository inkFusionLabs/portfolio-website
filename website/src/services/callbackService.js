// Callback service for handling OAuth and other redirect scenarios
class CallbackService {
  constructor() {
    this.baseUrl = window.location.origin
    this.callbackUrl = `${this.baseUrl}/callback`
  }

  // Generate OAuth URLs for different services
  generateOAuthUrl(service, options = {}) {
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
  }

  // Generate state parameter for CSRF protection
  generateState() {
    const array = new Uint8Array(32)
    crypto.getRandomValues(array)
    return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('')
  }

  // Store state for verification
  storeState(state, service) {
    const states = JSON.parse(localStorage.getItem('oauth_states') || '{}')
    states[state] = {
      service,
      timestamp: Date.now()
    }
    localStorage.setItem('oauth_states', JSON.stringify(states))
  }

  // Verify state parameter
  verifyState(state) {
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
  }

  // Handle Spotify OAuth
  async handleSpotifyAuth(code, state) {
    const service = this.verifyState(state)
    if (service !== 'spotify') {
      throw new Error('Invalid state parameter')
    }

    // Here you would typically:
    // 1. Send code to your backend
    // 2. Exchange for tokens
    // 3. Store tokens securely
    // 4. Return user data

    const response = await fetch('/api/auth/spotify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ code, state })
    })

    if (!response.ok) {
      throw new Error('Failed to authenticate with Spotify')
    }

    return await response.json()
  }

  // Handle GitHub OAuth
  async handleGitHubAuth(code, state) {
    const service = this.verifyState(state)
    if (service !== 'github') {
      throw new Error('Invalid state parameter')
    }

    const response = await fetch('/api/auth/github', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ code, state })
    })

    if (!response.ok) {
      throw new Error('Failed to authenticate with GitHub')
    }

    return await response.json()
  }

  // Handle download callback
  async handleDownloadCallback(code) {
    const response = await fetch('/api/download/verify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ code })
    })

    if (!response.ok) {
      throw new Error('Invalid download request')
    }

    const data = await response.json()
    
    // Trigger download
    if (data.downloadUrl) {
      window.location.href = data.downloadUrl
    }

    return data
  }

  // Handle newsletter subscription callback
  async handleNewsletterCallback(token) {
    const response = await fetch('/api/newsletter/confirm', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ token })
    })

    if (!response.ok) {
      throw new Error('Failed to confirm newsletter subscription')
    }

    return await response.json()
  }

  // Generate download URL with callback
  generateDownloadUrl(platform, version) {
    const params = new URLSearchParams({
      platform,
      version,
      timestamp: Date.now().toString()
    })

    // In a real implementation, you might:
    // 1. Generate a signed download token
    // 2. Track download analytics
    // 3. Rate limit downloads
    // 4. Redirect to actual download

    return `${this.callbackUrl}?type=download&code=${btoa(params.toString())}`
  }

  // Generate newsletter confirmation URL
  generateNewsletterUrl(email, token) {
    const params = new URLSearchParams({
      email,
      token,
      type: 'newsletter'
    })

    return `${this.callbackUrl}?${params.toString()}`
  }

  // Track callback analytics
  trackCallback(type, success, error = null) {
    // In a real implementation, you would send this to your analytics service
    console.log('Callback tracked:', { type, success, error, timestamp: new Date().toISOString() })
    
    // Example: Google Analytics
    if (window.gtag) {
      window.gtag('event', 'callback', {
        event_category: 'authentication',
        event_label: type,
        value: success ? 1 : 0
      })
    }
  }

  // Clean up expired states
  cleanupExpiredStates() {
    const states = JSON.parse(localStorage.getItem('oauth_states') || '{}')
    const now = Date.now()
    const expired = Object.keys(states).filter(state => 
      now - states[state].timestamp > 5 * 60 * 1000
    )
    
    expired.forEach(state => delete states[state])
    localStorage.setItem('oauth_states', JSON.stringify(states))
  }

  // Initialize service
  init() {
    // Clean up expired states on init
    this.cleanupExpiredStates()
    
    // Set up periodic cleanup
    setInterval(() => {
      this.cleanupExpiredStates()
    }, 10 * 60 * 1000) // Every 10 minutes
  }
}

// Create singleton instance
const callbackService = new CallbackService()

// Initialize on load
if (typeof window !== 'undefined') {
  callbackService.init()
}

export default callbackService 