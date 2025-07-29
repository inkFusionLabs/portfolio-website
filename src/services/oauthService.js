// OAuth Service for Real Authentication Flows
class OAuthService {
  constructor() {
    this.config = {
      spotify: {
        clientId: process.env.VITE_SPOTIFY_CLIENT_ID || 'your_spotify_client_id',
        redirectUri: `${window.location.origin}/callback/spotify`,
        scope: 'user-read-private user-read-email user-read-playback-state user-modify-playback-state user-read-currently-playing playlist-read-private playlist-modify-public playlist-modify-private',
        authUrl: 'https://accounts.spotify.com/authorize'
      },
      github: {
        clientId: process.env.VITE_GITHUB_CLIENT_ID || 'your_github_client_id',
        redirectUri: `${window.location.origin}/callback/github`,
        scope: 'read:user user:email',
        authUrl: 'https://github.com/login/oauth/authorize'
      },
      apple: {
        clientId: process.env.VITE_APPLE_CLIENT_ID || 'your_apple_client_id',
        redirectUri: `${window.location.origin}/callback/apple`,
        scope: 'music',
        authUrl: 'https://music.apple.com/oauth/authorize'
      }
    };
    
    this.stateStore = new Map();
  }

  // Generate secure random state parameter
  generateState() {
    const array = new Uint8Array(32);
    crypto.getRandomValues(array);
    return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
  }

  // Store state for verification
  storeState(provider, state) {
    this.stateStore.set(state, {
      provider,
      timestamp: Date.now(),
      expiresAt: Date.now() + (10 * 60 * 1000) // 10 minutes
    });
  }

  // Verify state parameter
  verifyState(state) {
    const stored = this.stateStore.get(state);
    if (!stored) {
      return false;
    }

    if (Date.now() > stored.expiresAt) {
      this.stateStore.delete(state);
      return false;
    }

    this.stateStore.delete(state);
    return stored.provider;
  }

  // Initialize OAuth flow
  async initiateAuth(provider) {
    const config = this.config[provider];
    if (!config) {
      throw new Error(`Unsupported provider: ${provider}`);
    }

    const state = this.generateState();
    this.storeState(provider, state);

    const params = new URLSearchParams({
      client_id: config.clientId,
      response_type: 'code',
      redirect_uri: config.redirectUri,
      state: state,
      scope: config.scope
    });

    // Store provider in session for callback handling
    sessionStorage.setItem('oauth_provider', provider);

    // Redirect to OAuth provider
    window.location.href = `${config.authUrl}?${params.toString()}`;
  }

  // Handle OAuth callback
  async handleCallback(code, state) {
    const provider = this.verifyState(state);
    if (!provider) {
      throw new Error('Invalid or expired state parameter');
    }

    const config = this.config[provider];
    const tokenResponse = await this.exchangeCodeForToken(provider, code, config.redirectUri);
    
    // Store tokens securely
    this.storeTokens(provider, tokenResponse);
    
    return {
      provider,
      tokens: tokenResponse,
      user: await this.getUserInfo(provider, tokenResponse.access_token)
    };
  }

  // Exchange authorization code for tokens
  async exchangeCodeForToken(provider, code, redirectUri) {
    const config = this.config[provider];
    
    const tokenParams = {
      grant_type: 'authorization_code',
      code: code,
      redirect_uri: redirectUri,
      client_id: config.clientId
    };

    // Add client secret for server-side flow (in production)
    if (config.clientSecret) {
      tokenParams.client_secret = config.clientSecret;
    }

    const response = await fetch(`${this.getTokenUrl(provider)}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams(tokenParams)
    });

    if (!response.ok) {
      throw new Error(`Token exchange failed: ${response.statusText}`);
    }

    return await response.json();
  }

  // Get token URL for different providers
  getTokenUrl(provider) {
    switch (provider) {
      case 'spotify':
        return 'https://accounts.spotify.com/api/token';
      case 'github':
        return 'https://github.com/login/oauth/access_token';
      case 'apple':
        return 'https://music.apple.com/oauth/token';
      default:
        throw new Error(`Unsupported provider: ${provider}`);
    }
  }

  // Store tokens securely
  storeTokens(provider, tokens) {
    const tokenData = {
      access_token: tokens.access_token,
      refresh_token: tokens.refresh_token,
      expires_at: Date.now() + (tokens.expires_in * 1000),
      provider
    };

    // Store in memory for immediate use
    sessionStorage.setItem(`${provider}_tokens`, JSON.stringify(tokenData));
    
    // Store refresh token in localStorage for persistence
    if (tokens.refresh_token) {
      localStorage.setItem(`${provider}_refresh_token`, tokens.refresh_token);
    }
  }

  // Get stored tokens
  getTokens(provider) {
    const tokenData = sessionStorage.getItem(`${provider}_tokens`);
    if (!tokenData) {
      return null;
    }

    const tokens = JSON.parse(tokenData);
    if (Date.now() > tokens.expires_at) {
      // Token expired, try to refresh
      return this.refreshTokens(provider);
    }

    return tokens;
  }

  // Refresh expired tokens
  async refreshTokens(provider) {
    const refreshToken = localStorage.getItem(`${provider}_refresh_token`);
    if (!refreshToken) {
      throw new Error('No refresh token available');
    }

    const config = this.config[provider];
    const response = await fetch(this.getTokenUrl(provider), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'refresh_token',
        refresh_token: refreshToken,
        client_id: config.clientId
      })
    });

    if (!response.ok) {
      // Refresh failed, clear tokens and require re-authentication
      this.clearTokens(provider);
      throw new Error('Token refresh failed');
    }

    const tokens = await response.json();
    this.storeTokens(provider, tokens);
    return tokens;
  }

  // Clear stored tokens
  clearTokens(provider) {
    sessionStorage.removeItem(`${provider}_tokens`);
    localStorage.removeItem(`${provider}_refresh_token`);
  }

  // Get user information
  async getUserInfo(provider, accessToken) {
    const userUrls = {
      spotify: 'https://api.spotify.com/v1/me',
      github: 'https://api.github.com/user',
      apple: 'https://api.music.apple.com/v1/me'
    };

    const response = await fetch(userUrls[provider], {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`Failed to get user info: ${response.statusText}`);
    }

    return await response.json();
  }

  // Make authenticated API request
  async makeAuthenticatedRequest(provider, endpoint, options = {}) {
    const tokens = this.getTokens(provider);
    if (!tokens) {
      throw new Error('No valid tokens found');
    }

    const response = await fetch(endpoint, {
      ...options,
      headers: {
        'Authorization': `Bearer ${tokens.access_token}`,
        'Content-Type': 'application/json',
        ...options.headers
      }
    });

    if (response.status === 401) {
      // Token expired, try to refresh
      const refreshedTokens = await this.refreshTokens(provider);
      return this.makeAuthenticatedRequest(provider, endpoint, options);
    }

    return response;
  }

  // Check if user is authenticated
  isAuthenticated(provider) {
    const tokens = this.getTokens(provider);
    return tokens !== null;
  }

  // Get all authenticated providers
  getAuthenticatedProviders() {
    const providers = [];
    Object.keys(this.config).forEach(provider => {
      if (this.isAuthenticated(provider)) {
        providers.push(provider);
      }
    });
    return providers;
  }

  // Logout from specific provider
  logout(provider) {
    this.clearTokens(provider);
    
    // Clear any provider-specific data
    sessionStorage.removeItem('oauth_provider');
    
    // Redirect to logout URL if available
    const logoutUrls = {
      spotify: 'https://accounts.spotify.com/logout',
      github: 'https://github.com/logout',
      apple: 'https://music.apple.com/logout'
    };

    if (logoutUrls[provider]) {
      window.open(logoutUrls[provider], '_blank');
    }
  }

  // Logout from all providers
  logoutAll() {
    Object.keys(this.config).forEach(provider => {
      this.clearTokens(provider);
    });
    sessionStorage.clear();
  }

  // Get authentication status for all providers
  getAuthStatus() {
    const status = {};
    Object.keys(this.config).forEach(provider => {
      status[provider] = {
        authenticated: this.isAuthenticated(provider),
        tokens: this.getTokens(provider)
      };
    });
    return status;
  }
}

// Create singleton instance
const oauthService = new OAuthService();

export default oauthService; 