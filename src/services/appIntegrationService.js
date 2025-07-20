// App Integration Service for OmniFusion Music App Communication
class AppIntegrationService {
  constructor() {
    this.appScheme = 'omnifusionmusic://';
    this.websiteUrl = window.location.origin;
    this.isAppInstalled = false;
    this.appVersion = null;
    
    // Initialize app detection
    this.detectApp();
  }

  // Detect if OmniFusion Music app is installed
  async detectApp() {
    try {
      // Try to ping the app
      const response = await this.pingApp();
      this.isAppInstalled = response.available;
      this.appVersion = response.version;
      
      console.log('OmniFusion Music app detected:', {
        installed: this.isAppInstalled,
        version: this.appVersion
      });
    } catch (error) {
      console.log('OmniFusion Music app not detected');
      this.isAppInstalled = false;
    }
  }

  // Ping the app to check if it's available
  async pingApp() {
    return new Promise((resolve, reject) => {
      const timeout = setTimeout(() => {
        reject(new Error('App ping timeout'));
      }, 1000);

      // Create a hidden iframe to test app availability
      const iframe = document.createElement('iframe');
      iframe.style.display = 'none';
      iframe.src = `${this.appScheme}ping`;
      
      iframe.onload = () => {
        clearTimeout(timeout);
        resolve({ available: true, version: '1.0.0' });
      };
      
      iframe.onerror = () => {
        clearTimeout(timeout);
        reject(new Error('App not available'));
      };

      document.body.appendChild(iframe);
      
      // Clean up after a short delay
      setTimeout(() => {
        document.body.removeChild(iframe);
      }, 2000);
    });
  }

  // Open the OmniFusion Music app with specific action
  openApp(action, data = {}) {
    const url = this.buildAppUrl(action, data);
    
    // Try to open the app
    window.location.href = url;
    
    // Fallback: if app doesn't open, redirect to download page
    setTimeout(() => {
      if (document.hidden || document.webkitHidden) {
        // App opened successfully
        return;
      }
      
      // App didn't open, redirect to download
      this.redirectToDownload();
    }, 2000);
  }

  // Build app URL with action and data
  buildAppUrl(action, data = {}) {
    const params = new URLSearchParams({
      action: action,
      source: 'website',
      timestamp: Date.now(),
      ...data
    });
    
    return `${this.appScheme}${action}?${params.toString()}`;
  }

  // Handle OAuth callback from app
  handleAppCallback(callbackData) {
    const { provider, tokens, user } = callbackData;
    
    // Store tokens for the app
    this.storeAppTokens(provider, tokens);
    
    // Notify the app that tokens are ready
    this.notifyApp('tokens_ready', { provider });
    
    // Track the authentication
    if (window.analyticsService) {
      window.analyticsService.trackAuth(provider, 'app_callback');
    }
    
    return { success: true, provider, user };
  }

  // Store tokens for app access
  storeAppTokens(provider, tokens) {
    const tokenData = {
      access_token: tokens.access_token,
      refresh_token: tokens.refresh_token,
      expires_at: Date.now() + (tokens.expires_in * 1000),
      provider,
      source: 'app'
    };

    // Store in localStorage for app access
    localStorage.setItem(`app_${provider}_tokens`, JSON.stringify(tokenData));
    
    // Also store in sessionStorage for immediate use
    sessionStorage.setItem(`${provider}_tokens`, JSON.stringify(tokenData));
  }

  // Notify the app of events
  notifyApp(event, data = {}) {
    const message = {
      event: event,
      data: data,
      timestamp: Date.now(),
      source: 'website'
    };

    // Send message to app via postMessage if in iframe
    if (window.parent !== window) {
      window.parent.postMessage(message, '*');
    }

    // Also try direct app communication
    const url = this.buildAppUrl('notify', message);
    window.location.href = url;
  }

  // Handle messages from the app
  handleAppMessage(event) {
    const { event: eventType, data } = event.data;
    
    switch (eventType) {
      case 'auth_complete':
        this.handleAppCallback(data);
        break;
      case 'app_ready':
        this.isAppInstalled = true;
        this.appVersion = data.version;
        break;
      case 'error':
        console.error('App error:', data);
        break;
      default:
        console.log('Unknown app message:', eventType, data);
    }
  }

  // Initialize app message handling
  initMessageHandling() {
    window.addEventListener('message', (event) => {
      this.handleAppMessage(event);
    });
  }

  // Open app for OAuth authentication
  openAppForAuth(provider) {
    const authData = {
      provider: provider,
      redirect_uri: `${this.websiteUrl}/callback/${provider}`,
      scope: this.getProviderScope(provider)
    };

    this.openApp('auth', authData);
  }

  // Get OAuth scope for provider
  getProviderScope(provider) {
    const scopes = {
      spotify: 'user-read-private user-read-email user-read-playback-state user-modify-playback-state user-read-currently-playing playlist-read-private playlist-modify-public playlist-modify-private',
      github: 'read:user user:email',
      apple: 'music'
    };
    
    return scopes[provider] || '';
  }

  // Open app for music playback
  openAppForPlayback(trackData) {
    this.openApp('play', {
      track_id: trackData.id,
      provider: trackData.provider,
      title: trackData.title,
      artist: trackData.artist
    });
  }

  // Open app for playlist management
  openAppForPlaylist(playlistData) {
    this.openApp('playlist', {
      playlist_id: playlistData.id,
      action: playlistData.action || 'view'
    });
  }

  // Open app for settings
  openAppForSettings() {
    this.openApp('settings');
  }

  // Redirect to download page if app is not installed
  redirectToDownload() {
    window.location.href = `${this.websiteUrl}/download`;
  }

  // Check if app supports specific feature
  async checkAppFeature(feature) {
    try {
      const response = await fetch(`${this.appScheme}feature-check?feature=${feature}`);
      return response.ok;
    } catch (error) {
      return false;
    }
  }

  // Get app status
  getAppStatus() {
    return {
      installed: this.isAppInstalled,
      version: this.appVersion,
      scheme: this.appScheme,
      website: this.websiteUrl
    };
  }

  // Initialize the service
  async init() {
    // Set up message handling
    this.initMessageHandling();
    
    // Detect app on page load
    await this.detectApp();
    
    // Notify app that website is ready
    this.notifyApp('website_ready', {
      url: window.location.href,
      title: document.title
    });
    
    console.log('App integration service initialized');
  }
}

// Create singleton instance
const appIntegrationService = new AppIntegrationService();

export default appIntegrationService; 