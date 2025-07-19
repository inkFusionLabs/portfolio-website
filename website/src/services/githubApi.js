// GitHub API service for fetching real repository statistics
import { GITHUB_CONFIG, getRepoApiUrl, getApiHeaders } from '../config/github.js'

class GitHubApiService {
  constructor() {
    this.baseUrl = getRepoApiUrl()
    this.cache = new Map()
    this.cacheTimeout = GITHUB_CONFIG.CACHE_TIMEOUT
  }

  // Check if cached data is still valid
  isCacheValid(key) {
    const cached = this.cache.get(key)
    if (!cached) return false
    return Date.now() - cached.timestamp < this.cacheTimeout
  }

  // Generic fetch method with error handling
  async fetchWithCache(endpoint, cacheKey) {
    // Return cached data if valid
    if (this.isCacheValid(cacheKey)) {
      return this.cache.get(cacheKey).data
    }

    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        headers: getApiHeaders()
      })

      if (!response.ok) {
        throw new Error(`GitHub API error: ${response.status} ${response.statusText}`)
      }

      const data = await response.json()
      
      // Cache the response
      this.cache.set(cacheKey, {
        data,
        timestamp: Date.now()
      })

      return data
    } catch (error) {
      console.error('GitHub API fetch error:', error)
      // Return cached data if available, even if expired
      const cached = this.cache.get(cacheKey)
      if (cached) {
        console.warn('Using cached data due to API error')
        return cached.data
      }
      throw error
    }
  }

  // Get basic repository information
  async getRepositoryInfo() {
    return this.fetchWithCache('', 'repo-info')
  }

  // Get repository statistics
  async getRepositoryStats() {
    const repoInfo = await this.getRepositoryInfo()
    
    return {
      stars: repoInfo.stargazers_count,
      forks: repoInfo.forks_count,
      watchers: repoInfo.watchers_count,
      openIssues: repoInfo.open_issues_count,
      language: repoInfo.language,
      description: repoInfo.description,
      homepage: repoInfo.homepage,
      updatedAt: repoInfo.updated_at,
      createdAt: repoInfo.created_at,
      size: repoInfo.size,
      defaultBranch: repoInfo.default_branch
    }
  }

  // Get contributors list
  async getContributors() {
    return this.fetchWithCache('/contributors', 'contributors')
  }

  // Get contributors count
  async getContributorsCount() {
    const contributors = await this.getContributors()
    return contributors.length
  }

  // Get recent releases
  async getReleases() {
    return this.fetchWithCache('/releases', 'releases')
  }

  // Get latest release
  async getLatestRelease() {
    const releases = await this.getReleases()
    return releases.length > 0 ? releases[0] : null
  }

  // Get commit activity
  async getCommitActivity() {
    return this.fetchWithCache('/stats/commit_activity', 'commit-activity')
  }

  // Get weekly commit count
  async getWeeklyCommitCount() {
    const activity = await this.getCommitActivity()
    if (!activity || activity.length === 0) return 0
    
    // Sum up commits from the last 4 weeks
    const recentWeeks = activity.slice(-4)
    return recentWeeks.reduce((total, week) => total + week.total, 0)
  }

  // Get all statistics in one call
  async getAllStats() {
    try {
      const [repoStats, contributors, latestRelease, weeklyCommits] = await Promise.all([
        this.getRepositoryStats(),
        this.getContributorsCount(),
        this.getLatestRelease(),
        this.getWeeklyCommitCount()
      ])

      return {
        ...repoStats,
        contributors,
        latestRelease,
        weeklyCommits,
        lastUpdated: new Date().toISOString()
      }
    } catch (error) {
      console.error('Error fetching all GitHub stats:', error)
      // Return fallback data
      return {
        stars: 0,
        forks: 0,
        watchers: 0,
        openIssues: 0,
        contributors: 0,
        weeklyCommits: 0,
        error: error.message,
        lastUpdated: new Date().toISOString()
      }
    }
  }

  // Clear cache
  clearCache() {
    this.cache.clear()
  }

  // Clear specific cache entry
  clearCacheEntry(key) {
    this.cache.delete(key)
  }
}

// Create singleton instance
const githubApi = new GitHubApiService()

export default githubApi 