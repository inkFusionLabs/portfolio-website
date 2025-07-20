import React from 'react'
import useStatistics from '../hooks/useStatistics.js'
import { Github, Star, Users, GitBranch, AlertCircle, CheckCircle } from 'lucide-react'

const GitHubStatsTest = () => {
  const { formattedStats, githubStats, healthIndicators, loading, error, refresh } = useStatistics()

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className="glass p-4 rounded-2xl max-w-sm">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-bold text-white">GitHub Stats Test</h3>
          <button
            onClick={refresh}
            disabled={loading}
            className="text-blue-400 hover:text-blue-300 disabled:opacity-50"
          >
            {loading ? '🔄' : '🔄'}
          </button>
        </div>

        {error && (
          <div className="flex items-center space-x-2 text-red-400 text-sm mb-3">
            <AlertCircle className="w-4 h-4" />
            <span>API Error</span>
          </div>
        )}

        <div className="space-y-2 text-sm">
          <div className="flex items-center justify-between">
            <span className="text-gray-300">Stars:</span>
            <span className="text-white font-mono">{loading ? '...' : formattedStats.stars}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-300">Forks:</span>
            <span className="text-white font-mono">{loading ? '...' : formattedStats.forks}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-300">Contributors:</span>
            <span className="text-white font-mono">{loading ? '...' : formattedStats.contributors}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-300">Health Score:</span>
            <span className={`font-mono ${
              healthIndicators.score >= 80 ? 'text-green-400' :
              healthIndicators.score >= 60 ? 'text-blue-400' :
              healthIndicators.score >= 40 ? 'text-yellow-400' :
              'text-red-400'
            }`}>
              {loading ? '...' : `${healthIndicators.score}%`}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-300">Status:</span>
            <span className="text-white font-mono">{loading ? '...' : healthIndicators.status}</span>
          </div>
        </div>

        <div className="mt-3 pt-3 border-t border-white/10">
          <div className="text-xs text-gray-400">
            Last updated: {loading ? '...' : formattedStats.lastUpdated}
          </div>
        </div>
      </div>
    </div>
  )
}

export default GitHubStatsTest 