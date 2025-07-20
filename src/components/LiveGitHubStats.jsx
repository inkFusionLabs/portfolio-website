import React from 'react';
import { fetchGitHubStats } from '../services/githubApi';

const LiveGitHubStats = ({ className = "" }) => {
  const [stats, setStats] = React.useState({
    stars: 89,
    forks: 12,
    loading: false,
    error: false,
    lastUpdated: null
  });

  const updateStats = React.useCallback(async () => {
    setStats(prev => ({ ...prev, loading: true }));
    
    try {
      const data = await fetchGitHubStats();
      setStats({
        stars: data.stars,
        forks: data.forks,
        loading: false,
        error: data.error || false,
        lastUpdated: new Date()
      });
    } catch (error) {
      setStats(prev => ({
        ...prev,
        loading: false,
        error: true
      }));
    }
  }, []);

  React.useEffect(() => {
    updateStats();
    
    // Update every 5 minutes
    const interval = setInterval(updateStats, 5 * 60 * 1000);
    
    return () => clearInterval(interval);
  }, [updateStats]);

  const formatNumber = (num) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'k';
    }
    return num.toString();
  };

  const getLastUpdatedText = () => {
    if (!stats.lastUpdated) return '';
    
    const now = new Date();
    const diff = now - stats.lastUpdated;
    const minutes = Math.floor(diff / 60000);
    
    if (minutes < 1) return 'Just now';
    if (minutes === 1) return '1 minute ago';
    if (minutes < 60) return `${minutes} minutes ago`;
    
    const hours = Math.floor(minutes / 60);
    if (hours === 1) return '1 hour ago';
    return `${hours} hours ago`;
  };

  return (
    <div className={`live-github-stats ${className}`}>
      <div className="flex items-center justify-center space-x-6">
        {/* GitHub Stars */}
        <div className="text-center">
          <div className="flex items-center justify-center space-x-2">
            <div className="text-2xl font-bold text-white">
              {stats.loading ? (
                <div className="animate-pulse">...</div>
              ) : (
                formatNumber(stats.stars)
              )}
            </div>
            <svg 
              className="w-5 h-5 text-yellow-400" 
              fill="currentColor" 
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          </div>
          <div className="text-gray-400 text-sm">GitHub Stars</div>
        </div>

        {/* GitHub Forks */}
        <div className="text-center">
          <div className="flex items-center justify-center space-x-2">
            <div className="text-2xl font-bold text-white">
              {stats.loading ? (
                <div className="animate-pulse">...</div>
              ) : (
                formatNumber(stats.forks)
              )}
            </div>
            <svg 
              className="w-5 h-5 text-blue-400" 
              fill="currentColor" 
              viewBox="0 0 20 20"
            >
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="text-gray-400 text-sm">Forks</div>
        </div>
      </div>

      {/* Status indicator */}
      <div className="mt-2 text-center">
        <div className="flex items-center justify-center space-x-2">
          <div className={`w-2 h-2 rounded-full ${
            stats.loading ? 'bg-yellow-400 animate-pulse' : 
            stats.error ? 'bg-red-400' : 'bg-green-400'
          }`}></div>
          <span className="text-xs text-gray-500">
            {stats.loading ? 'Updating...' : 
             stats.error ? 'Using cached data' : 
             `Live • Updated ${getLastUpdatedText()}`}
          </span>
        </div>
      </div>

      {/* Refresh button */}
      <div className="mt-2 text-center">
        <button
          onClick={updateStats}
          disabled={stats.loading}
          className="text-xs text-blue-400 hover:text-blue-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {stats.loading ? 'Updating...' : 'Refresh'}
        </button>
      </div>
    </div>
  );
};

export default LiveGitHubStats; 