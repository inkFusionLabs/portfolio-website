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
  private redirectUri: string
  private accessToken: string | null = null
  private refreshToken: string | null = null

  constructor() {
    this.clientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID || ''
    this.redirectUri = 'http://localhost:1420/callback'
  }

  // Initialize Spotify authentication
  async initialize(): Promise<boolean> {
    const storedToken = localStorage.getItem('spotify_access_token')
    const storedRefreshToken = localStorage.getItem('spotify_refresh_token')
    
    if (storedToken && storedRefreshToken) {
      this.accessToken = storedToken
      this.refreshToken = storedRefreshToken
      
      // Check if token is still valid
      if (await this.isTokenValid()) {
        return true
      } else {
        // Refresh the token
        return await this.refreshAccessToken()
      }
    }
    
    return false
  }

  // Start OAuth flow
  async authenticate(): Promise<void> {
    const scopes = [
      'user-read-private',
      'user-read-email',
      'user-library-read',
      'user-library-modify',
      'playlist-read-private',
      'playlist-read-collaborative',
      'playlist-modify-public',
      'playlist-modify-private',
      'user-read-playback-state',
      'user-modify-playback-state',
      'user-read-currently-playing',
      'streaming'
    ]

    const authUrl = `https://accounts.spotify.com/authorize?client_id=${this.clientId}&response_type=code&redirect_uri=${encodeURIComponent(this.redirectUri)}&scope=${encodeURIComponent(scopes.join(' '))}&show_dialog=true`

    // Open auth URL in default browser
    window.open(authUrl, '_blank')
  }

  // Handle OAuth callback
  async handleCallback(code: string): Promise<boolean> {
    try {
      const response = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': 'Basic ' + btoa(this.clientId + ':' + (import.meta.env.VITE_SPOTIFY_CLIENT_SECRET || ''))
        },
        body: new URLSearchParams({
          grant_type: 'authorization_code',
          code: code,
          redirect_uri: this.redirectUri
        }).toString()
      })

      if (!response.ok) {
        throw new Error('Failed to get access token')
      }

      const data = await response.json()
      this.accessToken = data.access_token
      this.refreshToken = data.refresh_token

      // Store tokens
      localStorage.setItem('spotify_access_token', this.accessToken)
      localStorage.setItem('spotify_refresh_token', this.refreshToken)

      return true
    } catch (error) {
      console.error('Error handling Spotify callback:', error)
      return false
    }
  }

  // Refresh access token
  private async refreshAccessToken(): Promise<boolean> {
    if (!this.refreshToken) return false

    try {
      const response = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': 'Basic ' + btoa(this.clientId + ':' + (import.meta.env.VITE_SPOTIFY_CLIENT_SECRET || ''))
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
        localStorage.setItem('spotify_refresh_token', this.refreshToken)
      }

      localStorage.setItem('spotify_access_token', this.accessToken)
      return true
    } catch (error) {
      console.error('Error refreshing Spotify token:', error)
      return false
    }
  }

  // Check if current token is valid
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

  // Disconnect Spotify
  disconnect(): void {
    this.accessToken = null
    this.refreshToken = null
    localStorage.removeItem('spotify_access_token')
    localStorage.removeItem('spotify_refresh_token')
  }

  // Check if connected
  isConnected(): boolean {
    return this.accessToken !== null
  }
}

export const spotifyService = new SpotifyService()
export type { SpotifyTrack, SpotifyPlaylist, SpotifyUser } 