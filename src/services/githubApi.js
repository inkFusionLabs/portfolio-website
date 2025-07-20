import React from 'react';

// GitHub API service for fetching live repository statistics
const GITHUB_API_BASE = 'https://api.github.com';
const REPO_OWNER = 'inkFusionLabs';
const REPO_NAME = 'OmniFusion-Music';

// Cache for API responses to avoid rate limiting
let cache = {
  stars: null,
  forks: null,
  lastUpdated: null
};

const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

export const fetchGitHubStats = async () => {
  try {
    // Check cache first
    const now = Date.now();
    if (cache.lastUpdated && (now - cache.lastUpdated) < CACHE_DURATION) {
      return {
        stars: cache.stars,
        forks: cache.forks,
        cached: true
      };
    }

    // Fetch from GitHub API
    const response = await fetch(`${GITHUB_API_BASE}/repos/${REPO_OWNER}/${REPO_NAME}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/vnd.github.v3+json',
        'User-Agent': 'OmniFusion-Music-Website'
      }
    });

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`);
    }

    const data = await response.json();
    
    // Update cache
    cache = {
      stars: data.stargazers_count,
      forks: data.forks_count,
      lastUpdated: now
    };

    return {
      stars: data.stargazers_count,
      forks: data.forks_count,
      cached: false
    };
  } catch (error) {
    console.error('Error fetching GitHub stats:', error);
    
    // Return cached data if available, otherwise fallback
    if (cache.stars !== null) {
      return {
        stars: cache.stars,
        forks: cache.forks,
        cached: true,
        error: true
      };
    }
    
    // Fallback data
    return {
      stars: 89,
      forks: 12,
      cached: false,
      error: true
    };
  }
};

export const fetchRepositoryInfo = async () => {
  try {
    const response = await fetch(`${GITHUB_API_BASE}/repos/${REPO_OWNER}/${REPO_NAME}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/vnd.github.v3+json',
        'User-Agent': 'OmniFusion-Music-Website'
      }
    });

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`);
    }

    const data = await response.json();
    
    return {
      name: data.name,
      description: data.description,
      language: data.language,
      stars: data.stargazers_count,
      forks: data.forks_count,
      issues: data.open_issues_count,
      lastUpdated: data.updated_at,
      url: data.html_url
    };
  } catch (error) {
    console.error('Error fetching repository info:', error);
    return null;
  }
};

// Hook for managing GitHub stats with automatic updates
export const useGitHubStats = () => {
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

  return { ...stats, refresh: updateStats };
}; 