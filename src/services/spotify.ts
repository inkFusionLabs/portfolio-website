interface SpotifyTrack {
  id: string
  name: string
  artists: Array<{ name: string }>
  album: { name: string; images: Array<{ url: string }> }
  duration_ms: number
  external_urls: { spotify: string }
  uri: string
}

interface SpotifyPlaylist {
  id: string
  name: string
  description: string
  images: Array<{ url: string }>
  tracks: { total: number }
  external_urls: { spotify: string }
}

interface SpotifyUser {
  id: string
  display_name: string
  images: Array<{ url: string }>
}

class SpotifyService {
  private clientId: string
  private clientSecret: string
  private accessToken: string | null = null
  private refreshToken: string | null = null
  private redirectUri: string

  constructor() {
    // Production credentials
    this.clientId = '0830208961c64908baf8bc1effbc4342'
    this.clientSecret = 'c70789797dde459face1f0b6a3f12bef'
    // Use your website callback since that's what's configured in Spotify
    this.redirectUri = 'http://www.omnifusionmusic.com/spotify-callback'
  }

  async initialize(): Promise<boolean> {
    try {
      // Check if we have a callback with authorization code (when returning from website)
      const urlParams = new URLSearchParams(window.location.search)
      const code = urlParams.get('code')
      const state = urlParams.get('state')
      
      if (code && state) {
        console.log('🎵 Found authorization code in URL, processing...')
        const success = await this.handleManualCode(code)
        if (success) {
          // Clear the URL parameters
          window.history.replaceState({}, document.title, window.location.pathname)
          // Dispatch event to notify the app
          window.dispatchEvent(new CustomEvent('spotifyConnected'))
          return true
        }
      }
      
      // Load tokens from localStorage
      this.accessToken = localStorage.getItem('spotify_access_token')
      this.refreshToken = localStorage.getItem('spotify_refresh_token')

      if (this.accessToken) {
        // Check if token is still valid
        const isValid = await this.isTokenValid()
        if (isValid) {
          return true
        } else {
          // Try to refresh the token
          const refreshed = await this.refreshAccessToken()
          return refreshed
        }
      }

      return false
    } catch (error) {
      console.error('Failed to initialize Spotify service:', error)
      return false
    }
  }

  // Start OAuth authentication flow - Production Ready
  async startAuth(): Promise<void> {
    console.log('=== STARTING SPOTIFY AUTH ===')
    console.log('Client ID:', this.clientId ? 'SET' : 'NOT SET')
    console.log('Redirect URI:', this.redirectUri)
    
    if (!this.clientId) {
      throw new Error('Spotify Client ID not configured.')
    }
    
    // Generate state parameter for security
    const state = Math.random().toString(36).substring(2, 15)
    localStorage.setItem('spotify_auth_state', state)
    
    // Build authorization URL
    const authUrl = new URL('https://accounts.spotify.com/authorize')
    authUrl.searchParams.set('client_id', this.clientId)
    authUrl.searchParams.set('response_type', 'code')
    authUrl.searchParams.set('redirect_uri', this.redirectUri)
    authUrl.searchParams.set('state', state)
    authUrl.searchParams.set('scope', 'user-read-private user-read-email user-library-read user-library-modify playlist-read-private playlist-read-collaborative playlist-modify-public playlist-modify-private user-read-playback-state user-modify-playback-state user-read-currently-playing streaming')
    authUrl.searchParams.set('show_dialog', 'true')
    
    console.log('Authorization URL:', authUrl.toString())
    
    // Try multiple methods to open the browser
    let opened = false
    
    try {
      console.log('Trying Tauri shell...')
      // Method 1: Try Tauri shell
      const { open } = await import('@tauri-apps/api/shell')
      await open(authUrl.toString())
      console.log('✅ Opened with Tauri shell')
      opened = true
    } catch (error) {
      console.log('❌ Tauri shell failed:', error)
      console.log('Trying window.open...')
      
      // Method 2: Fallback to window.open
      try {
        const newWindow = window.open(authUrl.toString(), '_blank')
        if (newWindow) {
          console.log('✅ Opened with window.open')
          opened = true
        } else {
          console.log('❌ window.open failed - popup blocked')
        }
      } catch (windowError) {
        console.log('❌ window.open error:', windowError)
      }
    }
    
    if (!opened) {
      throw new Error('Failed to open browser. Please allow popups and try again.')
    }
    
    console.log('✅ Spotify authorization opened in browser')
    console.log('📋 Please complete the authorization in your browser')
    console.log('🔄 You will be redirected to the website to copy the code')
  }







  // Handle manual code entry (production fallback)
  async handleManualCode(code: string): Promise<boolean> {
    try {
      console.log('Handling manual auth code:', code)
      
      // Get the saved state
      const state = localStorage.getItem('spotify_auth_state')
      if (!state) {
        throw new Error('No state parameter found. Please try again.')
      }
      
      // Exchange the code for tokens
      const response = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': 'Basic ' + btoa(this.clientId + ':' + this.clientSecret)
        },
        body: new URLSearchParams({
          grant_type: 'authorization_code',
          code: code,
          redirect_uri: this.redirectUri
        }).toString()
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        console.error('Token exchange failed:', errorData)
        throw new Error(`Failed to get access token: ${response.status} ${response.statusText}`)
      }

      const data = await response.json()
      this.accessToken = data.access_token
      this.refreshToken = data.refresh_token

      // Store tokens
      localStorage.setItem('spotify_access_token', this.accessToken || '')
      localStorage.setItem('spotify_refresh_token', this.refreshToken || '')

      console.log('Successfully obtained Spotify tokens')
      return true
    } catch (error) {
      console.error('Error handling manual auth code:', error)
      throw error
    }
  }

  private async refreshAccessToken(): Promise<boolean> {
    if (!this.refreshToken) return false

    try {
      const response = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': 'Basic ' + btoa(this.clientId + ':' + this.clientSecret)
        },
        body: new URLSearchParams({
          grant_type: 'refresh_token',
          refresh_token: this.refreshToken || ''
        }).toString()
      })

      if (!response.ok) {
        throw new Error('Failed to refresh token')
      }

      const data = await response.json()
      this.accessToken = data.access_token
      
      if (data.refresh_token) {
        this.refreshToken = data.refresh_token
        localStorage.setItem('spotify_refresh_token', this.refreshToken || '')
      }

      localStorage.setItem('spotify_access_token', this.accessToken || '')
      return true
    } catch (error) {
      console.error('Error refreshing Spotify token:', error)
      return false
    }
  }

  private async isTokenValid(): Promise<boolean> {
    if (!this.accessToken) return false

    try {
      const response = await fetch('https://api.spotify.com/v1/me', {
        headers: {
          'Authorization': `Bearer ${this.accessToken}`
        }
      })
      return response.ok
    } catch {
      return false
    }
  }

  // Search for tracks
  async searchTracks(query: string, limit: number = 20): Promise<SpotifyTrack[]> {
    if (!this.accessToken) throw new Error('Not authenticated')

    try {
      const response = await fetch(
        `https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=track&limit=${limit}`,
        {
          headers: {
            'Authorization': `Bearer ${this.accessToken}`
          }
        }
      )

      if (!response.ok) throw new Error('Search failed')

      const data = await response.json()
      return data.tracks.items
    } catch (error) {
      console.error('Error searching Spotify tracks:', error)
      throw error
    }
  }

  // Get user's playlists
  async getUserPlaylists(): Promise<SpotifyPlaylist[]> {
    if (!this.accessToken) throw new Error('Not authenticated')

    try {
      const response = await fetch('https://api.spotify.com/v1/me/playlists?limit=50', {
        headers: {
          'Authorization': `Bearer ${this.accessToken}`
        }
      })

      if (!response.ok) throw new Error('Failed to get playlists')

      const data = await response.json()
      return data.items
    } catch (error) {
      console.error('Error getting Spotify playlists:', error)
      throw error
    }
  }

  // Get user's saved tracks
  async getSavedTracks(limit: number = 20): Promise<SpotifyTrack[]> {
    if (!this.accessToken) throw new Error('Not authenticated')

    try {
      const response = await fetch(`https://api.spotify.com/v1/me/tracks?limit=${limit}`, {
        headers: {
          'Authorization': `Bearer ${this.accessToken}`
        }
      })

      if (!response.ok) throw new Error('Failed to get saved tracks')

      const data = await response.json()
      return data.items.map((item: any) => item.track)
    } catch (error) {
      console.error('Error getting Spotify saved tracks:', error)
      throw error
    }
  }

  // Get current user
  async getCurrentUser(): Promise<SpotifyUser | null> {
    if (!this.accessToken) return null

    try {
      const response = await fetch('https://api.spotify.com/v1/me', {
        headers: {
          'Authorization': `Bearer ${this.accessToken}`
        }
      })

      if (!response.ok) return null

      return await response.json()
    } catch (error) {
      console.error('Error getting Spotify user:', error)
      return null
    }
  }

  // Get recommendations
  async getRecommendations(limit: number = 20, seed_genres?: string): Promise<SpotifyTrack[]> {
    if (!this.accessToken) throw new Error('Not authenticated')

    try {
      const params = new URLSearchParams({
        limit: limit.toString(),
        seed_genres: seed_genres || 'pop,rock,electronic'
      })

      const response = await fetch(`https://api.spotify.com/v1/recommendations?${params}`, {
        headers: {
          'Authorization': `Bearer ${this.accessToken}`
        }
      })

      if (!response.ok) throw new Error('Failed to get recommendations')

      const data = await response.json()
      return data.tracks
    } catch (error) {
      console.error('Error getting Spotify recommendations:', error)
      throw error
    }
  }

  // Get top tracks
  async getTopTracks(limit: number = 20): Promise<SpotifyTrack[]> {
    if (!this.accessToken) throw new Error('Not authenticated')

    try {
      const response = await fetch(`https://api.spotify.com/v1/me/top/tracks?limit=${limit}`, {
        headers: {
          'Authorization': `Bearer ${this.accessToken}`
        }
      })

      if (!response.ok) throw new Error('Failed to get top tracks')

      const data = await response.json()
      return data.items
    } catch (error) {
      console.error('Error getting Spotify top tracks:', error)
      throw error
    }
  }

  // Get new releases
  async getNewReleases(limit: number = 20): Promise<SpotifyTrack[]> {
    if (!this.accessToken) throw new Error('Not authenticated')

    try {
      const response = await fetch(`https://api.spotify.com/v1/browse/new-releases?limit=${limit}`, {
        headers: {
          'Authorization': `Bearer ${this.accessToken}`
        }
      })

      if (!response.ok) throw new Error('Failed to get new releases')

      const data = await response.json()
      return data.albums.items.map((album: any) => album.tracks?.items || []).flat()
    } catch (error) {
      console.error('Error getting Spotify new releases:', error)
      throw error
    }
  }

  disconnect(): void {
    this.accessToken = null
    this.refreshToken = null
    localStorage.removeItem('spotify_access_token')
    localStorage.removeItem('spotify_refresh_token')
    console.log('Spotify disconnected')
  }

  isConnected(): boolean {
    return !!this.accessToken
  }
}

export const spotifyService = new SpotifyService() 