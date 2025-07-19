// GitHub API Configuration
// Update these values with your actual GitHub repository information

export const GITHUB_CONFIG = {
  // Your GitHub username/organization
  OWNER: 'inkFusionLabs',
  
  // Your repository name
  REPO: 'OmniFusionMusic',
  
  // GitHub API base URL (usually don't need to change this)
  API_BASE: 'https://api.github.com',
  
  // Cache timeout in milliseconds (5 minutes)
  CACHE_TIMEOUT: 5 * 60 * 1000,
  
  // User agent for API requests
  USER_AGENT: 'OmniFusionMusic-Website',
  
  // Optional: GitHub Personal Access Token for higher rate limits
  // Get one from: https://github.com/settings/tokens
  // Only needed if you're hitting rate limits
  PERSONAL_ACCESS_TOKEN: null, // Set this if you have a token
  
  // Repository URLs
  REPO_URL: `https://github.com/inkFusionLabs/OmniFusionMusic`,
  ISSUES_URL: `https://github.com/inkFusionLabs/OmniFusionMusic/issues`,
  DISCUSSIONS_URL: `https://github.com/inkFusionLabs/OmniFusionMusic/discussions`,
  WIKI_URL: `https://github.com/inkFusionLabs/OmniFusionMusic/wiki`
}

// Helper function to get the full repository API URL
export const getRepoApiUrl = () => {
  return `${GITHUB_CONFIG.API_BASE}/repos/${GITHUB_CONFIG.OWNER}/${GITHUB_CONFIG.REPO}`
}

// Helper function to get headers for API requests
export const getApiHeaders = () => {
  const headers = {
    'Accept': 'application/vnd.github.v3+json',
    'User-Agent': GITHUB_CONFIG.USER_AGENT
  }
  
  // Add authorization header if token is provided
  if (GITHUB_CONFIG.PERSONAL_ACCESS_TOKEN) {
    headers['Authorization'] = `token ${GITHUB_CONFIG.PERSONAL_ACCESS_TOKEN}`
  }
  
  return headers
}

export default GITHUB_CONFIG 