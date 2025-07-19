import { useState, useEffect, useCallback } from 'react'
import statisticsTracker from '../services/statisticsTracker.js'

export const useStatistics = () => {
  const [stats, setStats] = useState({
    github: {
      stars: 0,
      forks: 0,
      watchers: 0,
      openIssues: 0,
      contributors: 0,
      weeklyCommits: 0
    },
    downloads: 0,
    activeUsers: 0,
    userRating: 4.9,
    totalEngagement: 0,
    growthRate: 'Early Stage',
    healthScore: 0,
    lastUpdated: null
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Initialize statistics tracker
  useEffect(() => {
    const initializeStats = async () => {
      try {
        setLoading(true)
        await statisticsTracker.initialize()
        setError(null)
      } catch (err) {
        setError(err.message)
        console.error('Failed to initialize statistics:', err)
      } finally {
        setLoading(false)
      }
    }

    initializeStats()

    // Cleanup on unmount
    return () => {
      statisticsTracker.destroy()
    }
  }, [])

  // Subscribe to statistics updates
  useEffect(() => {
    const unsubscribe = statisticsTracker.subscribe((newStats) => {
      setStats(newStats)
    })

    return unsubscribe
  }, [])

  // Manual refresh function
  const refresh = useCallback(async () => {
    try {
      setLoading(true)
      await statisticsTracker.refresh()
      setError(null)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [])

  // Get formatted stats for display
  const getFormattedStats = useCallback(() => {
    return {
      stars: stats.github.stars.toLocaleString(),
      forks: stats.github.forks.toLocaleString(),
      watchers: stats.github.watchers.toLocaleString(),
      contributors: stats.github.contributors.toLocaleString(),
      downloads: stats.downloads.toLocaleString(),
      activeUsers: stats.activeUsers.toLocaleString(),
      userRating: stats.userRating.toFixed(1),
      totalEngagement: stats.totalEngagement.toLocaleString(),
      weeklyCommits: stats.github.weeklyCommits.toLocaleString(),
      healthScore: Math.round(stats.healthScore),
      lastUpdated: stats.lastUpdated ? new Date(stats.lastUpdated).toLocaleString() : 'Never'
    }
  }, [stats])

  // Get GitHub-specific stats
  const getGitHubStats = useCallback(() => {
    return {
      ...stats.github,
      formatted: {
        stars: stats.github.stars.toLocaleString(),
        forks: stats.github.forks.toLocaleString(),
        watchers: stats.github.watchers.toLocaleString(),
        contributors: stats.github.contributors.toLocaleString(),
        weeklyCommits: stats.github.weeklyCommits.toLocaleString()
      }
    }
  }, [stats.github])

  // Get project health indicators
  const getHealthIndicators = useCallback(() => {
    const healthScore = stats.healthScore
    let status = 'Unknown'
    let color = 'gray'

    if (healthScore >= 80) {
      status = 'Excellent'
      color = 'green'
    } else if (healthScore >= 60) {
      status = 'Good'
      color = 'blue'
    } else if (healthScore >= 40) {
      status = 'Fair'
      color = 'yellow'
    } else if (healthScore >= 20) {
      status = 'Poor'
      color = 'orange'
    } else {
      status = 'Critical'
      color = 'red'
    }

    return {
      score: healthScore,
      status,
      color,
      growthRate: stats.growthRate
    }
  }, [stats.healthScore, stats.growthRate])

  return {
    stats,
    formattedStats: getFormattedStats(),
    githubStats: getGitHubStats(),
    healthIndicators: getHealthIndicators(),
    loading,
    error,
    refresh
  }
}

export default useStatistics 