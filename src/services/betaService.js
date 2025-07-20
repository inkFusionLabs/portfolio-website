// Beta Testing Service
class BetaService {
  constructor() {
    this.baseUrl = process.env.REACT_APP_API_URL || 'https://api.omnifusion.com'
    this.betaEndpoint = '/api/beta'
  }

  // Sign up for beta testing
  async signup(email, platform, preferences = {}) {
    try {
      const response = await fetch(`${this.betaEndpoint}/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          platform,
          preferences,
          timestamp: new Date().toISOString()
        })
      })

      if (!response.ok) {
        throw new Error('Beta signup failed')
      }

      const data = await response.json()
      return data
    } catch (error) {
      console.error('Beta signup error:', error)
      throw error
    }
  }

  // Submit feedback
  async submitFeedback(type, message, metadata = {}) {
    try {
      const response = await fetch(`${this.betaEndpoint}/feedback`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type,
          message,
          metadata,
          timestamp: new Date().toISOString()
        })
      })

      if (!response.ok) {
        throw new Error('Feedback submission failed')
      }

      const data = await response.json()
      return data
    } catch (error) {
      console.error('Feedback submission error:', error)
      throw error
    }
  }

  // Get beta download links
  async getDownloadLinks(platform) {
    try {
      const response = await fetch(`${this.betaEndpoint}/downloads/${platform}`)
      
      if (!response.ok) {
        throw new Error('Failed to fetch download links')
      }

      const data = await response.json()
      return data
    } catch (error) {
      console.error('Download links error:', error)
      throw error
    }
  }

  // Get beta statistics
  async getBetaStats() {
    try {
      const response = await fetch(`${this.betaEndpoint}/stats`)
      
      if (!response.ok) {
        throw new Error('Failed to fetch beta stats')
      }

      const data = await response.json()
      return data
    } catch (error) {
      console.error('Beta stats error:', error)
      throw error
    }
  }

  // Check for beta updates
  async checkForUpdates(currentVersion) {
    try {
      const response = await fetch(`${this.betaEndpoint}/updates?version=${currentVersion}`)
      
      if (!response.ok) {
        throw new Error('Failed to check for updates')
      }

      const data = await response.json()
      return data
    } catch (error) {
      console.error('Update check error:', error)
      throw error
    }
  }

  // Report crash or error
  async reportCrash(error, context = {}) {
    try {
      const response = await fetch(`${this.betaEndpoint}/crash`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          error: error.message,
          stack: error.stack,
          context,
          timestamp: new Date().toISOString()
        })
      })

      if (!response.ok) {
        throw new Error('Crash report failed')
      }

      const data = await response.json()
      return data
    } catch (error) {
      console.error('Crash report error:', error)
      throw error
    }
  }

  // Get beta tester profile
  async getProfile(email) {
    try {
      const response = await fetch(`${this.betaEndpoint}/profile/${encodeURIComponent(email)}`)
      
      if (!response.ok) {
        throw new Error('Failed to fetch profile')
      }

      const data = await response.json()
      return data
    } catch (error) {
      console.error('Profile fetch error:', error)
      throw error
    }
  }

  // Update beta tester preferences
  async updatePreferences(email, preferences) {
    try {
      const response = await fetch(`${this.betaEndpoint}/preferences`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          preferences,
          timestamp: new Date().toISOString()
        })
      })

      if (!response.ok) {
        throw new Error('Failed to update preferences')
      }

      const data = await response.json()
      return data
    } catch (error) {
      console.error('Preferences update error:', error)
      throw error
    }
  }

  // Local storage fallbacks for demo
  getLocalBetaUsers() {
    try {
      return JSON.parse(localStorage.getItem('betaUsers') || '[]')
    } catch {
      return []
    }
  }

  getLocalFeedback() {
    try {
      return JSON.parse(localStorage.getItem('betaFeedback') || '[]')
    } catch {
      return []
    }
  }

  saveLocalBetaUser(user) {
    try {
      const users = this.getLocalBetaUsers()
      users.push(user)
      localStorage.setItem('betaUsers', JSON.stringify(users))
    } catch (error) {
      console.error('Failed to save local beta user:', error)
    }
  }

  saveLocalFeedback(feedback) {
    try {
      const feedbacks = this.getLocalFeedback()
      feedbacks.push(feedback)
      localStorage.setItem('betaFeedback', JSON.stringify(feedbacks))
    } catch (error) {
      console.error('Failed to save local feedback:', error)
    }
  }
}

export default new BetaService() 