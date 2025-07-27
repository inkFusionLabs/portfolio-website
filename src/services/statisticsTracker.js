// Statistics tracking service for OmniFusion Music
import githubApi from './githubApi.js'

class StatisticsTracker {
  constructor() {
    this.stats = {
      github: {},
      downloads: 0,
      activeUsers: 0,
      userRating: 4.9,
      lastUpdated: null
    }
    this.subscribers = new Set()
    this.updateInterval = null
    this.isInitialized = false
  }

  // Initialize the tracker
  async initialize() {
    if (this.isInitialized) return

    try {
      // Load cached stats first
      this.loadCachedStats()
      
      // Fetch initial GitHub stats
      await this.updateGitHubStats()
      
      // Start periodic updates
      this.startPeriodicUpdates()
      
      this.isInitialized = true
      console.log('Statistics tracker initialized successfully')
    } catch (error) {
      console.error('Failed to initialize statistics tracker:', error)
      // Even if initialization fails, we can still work with cached data
      this.isInitialized = true
    }
  }

  // Update GitHub statistics
  async updateGitHubStats() {
    try {
      const githubStats = await githubApi.getAllStats()
      this.stats.github = githubStats
      this.stats.lastUpdated = new Date().toISOString()
      this.notifySubscribers()
      this.saveToCache()
    } catch (error) {
      console.error('Failed to update GitHub stats:', error)
    }
  }

  // Simulate download tracking (replace with real analytics)
  updateDownloadStats() {
    // In a real implementation, this would fetch from:
    // - GitHub releases API
    // - App store analytics
    // - Your own download tracking system
    
    // For now, we'll simulate realistic growth
    const baseDownloads = this.stats.github.stars * 15 // Rough estimate
    const randomGrowth = Math.floor(Math.random() * 50) + 10
    this.stats.downloads = baseDownloads + randomGrowth
  }

  // Simulate active users tracking
  updateActiveUsers() {
    // In a real implementation, this would come from:
    // - App analytics (Firebase, Mixpanel, etc.)
    // - Server-side user tracking
    // - Real-time user sessions
    
    // For now, simulate based on stars and downloads
    const baseUsers = Math.floor(this.stats.downloads * 0.3) // 30% of downloads
    const randomVariation = Math.floor(Math.random() * 20) - 10
    this.stats.activeUsers = Math.max(0, baseUsers + randomVariation)
  }

  // Update user rating (could come from app store reviews, internal feedback, etc.)
  updateUserRating() {
    // Simulate slight rating variations
    const variation = (Math.random() - 0.5) * 0.1 // ±0.05
    this.stats.userRating = Math.max(4.0, Math.min(5.0, 4.9 + variation))
  }

  // Get all current statistics
  getAllStats() {
    return {
      ...this.stats,
      // Add computed stats
      totalEngagement: this.stats.github.stars + this.stats.github.forks + this.stats.github.watchers,
      growthRate: this.calculateGrowthRate(),
      healthScore: this.calculateHealthScore()
    }
  }

  // Calculate project growth rate
  calculateGrowthRate() {
    // This would be more sophisticated in a real implementation
    const totalEngagement = this.stats.github.stars + this.stats.github.forks
    if (totalEngagement < 100) return 'Early Stage'
    if (totalEngagement < 500) return 'Growing'
    if (totalEngagement < 1000) return 'Popular'
    return 'Very Popular'
  }

  // Calculate project health score
  calculateHealthScore() {
    let score = 0
    
    // GitHub activity
    if (this.stats.github.weeklyCommits > 10) score += 25
    else if (this.stats.github.weeklyCommits > 5) score += 15
    else if (this.stats.github.weeklyCommits > 0) score += 5
    
    // Community engagement
    if (this.stats.github.stars > 1000) score += 25
    else if (this.stats.github.stars > 500) score += 20
    else if (this.stats.github.stars > 100) score += 15
    else if (this.stats.github.stars > 50) score += 10
    
    // Contributors
    if (this.stats.github.contributors > 10) score += 25
    else if (this.stats.github.contributors > 5) score += 20
    else if (this.stats.github.contributors > 2) score += 15
    else if (this.stats.github.contributors > 0) score += 10
    
    // Recent activity
    if (this.stats.github.latestRelease) {
      const daysSinceRelease = (Date.now() - new Date(this.stats.github.latestRelease.published_at).getTime()) / (1000 * 60 * 60 * 24)
      if (daysSinceRelease < 30) score += 25
      else if (daysSinceRelease < 90) score += 15
      else if (daysSinceRelease < 180) score += 5
    }
    
    return Math.min(100, score)
  }

  // Subscribe to statistics updates
  subscribe(callback) {
    this.subscribers.add(callback)
    // Immediately call with current stats
    callback(this.getAllStats())
    
    // Return unsubscribe function
    return () => {
      this.subscribers.delete(callback)
    }
  }

  // Notify all subscribers
  notifySubscribers() {
    const stats = this.getAllStats()
    this.subscribers.forEach(callback => {
      try {
        callback(stats)
      } catch (error) {
        console.error('Error in statistics subscriber callback:', error)
      }
    })
  }

  // Start periodic updates
  startPeriodicUpdates() {
    // Update GitHub stats every 5 minutes
    this.updateInterval = setInterval(async () => {
      await this.updateGitHubStats()
      this.updateDownloadStats()
      this.updateActiveUsers()
      this.updateUserRating()
    }, 5 * 60 * 1000) // 5 minutes
  }

  // Stop periodic updates
  stopPeriodicUpdates() {
    if (this.updateInterval) {
      clearInterval(this.updateInterval)
      this.updateInterval = null
    }
  }

  // Save stats to localStorage cache
  saveToCache() {
    try {
      localStorage.setItem('omnifusion-stats', JSON.stringify({
        stats: this.stats,
        timestamp: Date.now()
      }))
    } catch (error) {
      console.error('Failed to save stats to cache:', error)
    }
  }

  // Load stats from localStorage cache
  loadCachedStats() {
    try {
      const cached = localStorage.getItem('omnifusion-stats')
      if (cached) {
        const { stats, timestamp } = JSON.parse(cached)
        const cacheAge = Date.now() - timestamp
        
        // Use cached data if it's less than 1 hour old
        if (cacheAge < 60 * 60 * 1000) {
          this.stats = { ...this.stats, ...stats }
          console.log('Loaded cached statistics')
        }
      }
    } catch (error) {
      console.error('Failed to load cached stats:', error)
    }
  }

  // Manual refresh
  async refresh() {
    await this.updateGitHubStats()
    this.updateDownloadStats()
    this.updateActiveUsers()
    this.updateUserRating()
  }

  // Cleanup
  destroy() {
    this.stopPeriodicUpdates()
    this.subscribers.clear()
    this.isInitialized = false
  }
}

// Create singleton instance
const statisticsTracker = new StatisticsTracker()

export default statisticsTracker 