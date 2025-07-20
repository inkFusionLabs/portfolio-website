# GitHub API Integration Setup

This guide will help you set up real GitHub statistics for the OmniFusion Music website.

## 🚀 Quick Setup

### 1. Update Repository Information

Edit `src/config/github.js` and update the following values:

```javascript
export const GITHUB_CONFIG = {
  // Your GitHub username/organization
  OWNER: 'your-github-username',
  
  // Your repository name
  REPO: 'your-repository-name',
  
  // ... other settings
}
```

### 2. Optional: Add Personal Access Token

For higher rate limits and better reliability, create a GitHub Personal Access Token:

1. Go to [GitHub Settings > Tokens](https://github.com/settings/tokens)
2. Click "Generate new token (classic)"
3. Give it a name like "OmniFusion Music Website"
4. Select scopes: `public_repo` (for public repos) or `repo` (for private repos)
5. Copy the token and add it to `src/config/github.js`:

```javascript
PERSONAL_ACCESS_TOKEN: 'ghp_your_token_here',
```

## 📊 What Statistics Are Tracked

The system automatically fetches and displays:

- **GitHub Stars** - Number of repository stars
- **Forks** - Number of repository forks
- **Watchers** - Number of repository watchers
- **Contributors** - Number of contributors
- **Open Issues** - Number of open issues
- **Weekly Commits** - Recent commit activity
- **Latest Release** - Most recent release information

## 🔄 Real-time Updates

- Statistics are cached for 5 minutes to avoid API rate limits
- Automatic refresh every 5 minutes
- Manual refresh button available on the website
- Fallback to cached data if API is unavailable

## 🛠️ Advanced Configuration

### Custom Cache Timeout

```javascript
CACHE_TIMEOUT: 10 * 60 * 1000, // 10 minutes
```

### Custom User Agent

```javascript
USER_AGENT: 'YourApp-Website-v1.0',
```

### Multiple Repositories

To track multiple repositories, you can modify the service to fetch from multiple sources:

```javascript
// In githubApi.js
async getAllStats() {
  const [repo1Stats, repo2Stats] = await Promise.all([
    this.getRepositoryStats('repo1'),
    this.getRepositoryStats('repo2')
  ])
  
  return {
    stars: repo1Stats.stars + repo2Stats.stars,
    forks: repo1Stats.forks + repo2Stats.forks,
    // ... combine other stats
  }
}
```

## 🚨 Rate Limits

GitHub API has rate limits:
- **Unauthenticated**: 60 requests per hour
- **Authenticated**: 5,000 requests per hour

The system includes:
- Intelligent caching to minimize API calls
- Error handling with fallback to cached data
- Automatic retry logic

## 🔧 Troubleshooting

### API Errors

If you see "Unable to load live stats" messages:

1. Check your repository name and owner in `github.js`
2. Verify the repository is public (or you have proper access)
3. Check your Personal Access Token if using one
4. Monitor browser console for detailed error messages

### Rate Limit Issues

If you're hitting rate limits:

1. Add a Personal Access Token
2. Increase cache timeout
3. Reduce refresh frequency

### CORS Issues

If you encounter CORS errors:

1. Ensure you're using the correct GitHub API URL
2. Check that your headers are properly set
3. Verify your Personal Access Token is valid

## 📈 Adding More Metrics

To add additional statistics:

1. Add new methods to `GitHubApiService`
2. Update `StatisticsTracker` to include new metrics
3. Modify components to display the new data

Example adding download statistics:

```javascript
// In githubApi.js
async getDownloadStats() {
  const releases = await this.getReleases()
  let totalDownloads = 0
  
  for (const release of releases) {
    const assets = await this.fetchWithCache(`/releases/${release.id}/assets`, `release-${release.id}`)
    totalDownloads += assets.reduce((sum, asset) => sum + asset.download_count, 0)
  }
  
  return totalDownloads
}
```

## 🔐 Security Notes

- Never commit Personal Access Tokens to version control
- Use environment variables for sensitive data in production
- Regularly rotate your tokens
- Use minimal required permissions for tokens

## 📝 Environment Variables (Production)

For production deployment, use environment variables:

```javascript
// In github.js
PERSONAL_ACCESS_TOKEN: process.env.GITHUB_TOKEN || null,
```

Set the environment variable in your deployment platform:
```bash
GITHUB_TOKEN=ghp_your_token_here
```

## ✅ Testing

To test the integration:

1. Start the development server: `npm run dev`
2. Check browser console for API calls
3. Verify statistics are loading correctly
4. Test the refresh button functionality
5. Check error handling by temporarily using invalid repository names

## 🎯 Next Steps

Once basic GitHub integration is working, consider adding:

- [ ] App store download statistics
- [ ] User analytics (Firebase, Mixpanel, etc.)
- [ ] Real-time user count
- [ ] Community engagement metrics
- [ ] Performance monitoring
- [ ] A/B testing capabilities 