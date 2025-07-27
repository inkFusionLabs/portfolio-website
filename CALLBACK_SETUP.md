# Callback System Setup Guide

This guide explains how to set up and use the callback system for OmniFusion Music website.

## 🚀 Overview

The callback system handles OAuth flows, download tracking, newsletter confirmations, and other redirect scenarios. It provides a unified interface for processing authentication results and user actions.

## 📁 Files Structure

```
website/src/
├── pages/
│   ├── Callback.jsx          # Main callback page
│   └── CallbackDemo.jsx      # Demo/testing page
├── services/
│   └── callbackService.js    # Callback handling service
└── App.jsx                   # Routes configuration
```

## 🔧 Setup Instructions

### 1. Environment Variables

Create a `.env` file in the website directory:

```bash
# OAuth Client IDs
REACT_APP_SPOTIFY_CLIENT_ID=your_spotify_client_id
REACT_APP_GITHUB_CLIENT_ID=your_github_client_id
REACT_APP_GOOGLE_CLIENT_ID=your_google_client_id
REACT_APP_DISCORD_CLIENT_ID=your_discord_client_id

# Backend API URLs (if using separate backend)
REACT_APP_API_BASE_URL=http://localhost:3001/api
```

### 2. OAuth App Registration

#### Spotify OAuth
1. Go to [Spotify Developer Dashboard](https://developer.spotify.com/dashboard)
2. Create a new app
3. Add redirect URI: `http://localhost:3000/callback`
4. Copy Client ID to environment variables

#### GitHub OAuth
1. Go to [GitHub Settings > OAuth Apps](https://github.com/settings/developers)
2. Create new OAuth App
3. Set Authorization callback URL: `http://localhost:3000/callback`
4. Copy Client ID to environment variables

## 🎯 Usage Examples

### 1. Spotify OAuth Flow

```javascript
import callbackService from '../services/callbackService.js'

// Generate OAuth URL
const spotifyUrl = callbackService.generateOAuthUrl('spotify')
window.location.href = spotifyUrl

// Handle callback (in Callback.jsx)
const handleSpotifyCallback = async (code, state) => {
  try {
    const result = await callbackService.handleSpotifyAuth(code, state)
    // Handle successful authentication
  } catch (error) {
    // Handle error
  }
}
```

### 2. Download Callback

```javascript
// Generate download URL with tracking
const downloadUrl = callbackService.generateDownloadUrl('macos', '1.2.0')
navigate(downloadUrl)

// Handle download callback
const handleDownloadCallback = async (code) => {
  const result = await callbackService.handleDownloadCallback(code)
  // Trigger actual download
}
```

### 3. Newsletter Confirmation

```javascript
// Generate confirmation URL
const confirmUrl = callbackService.generateNewsletterUrl(email, token)
navigate(confirmUrl)

// Handle confirmation
const handleNewsletterCallback = async (token) => {
  const result = await callbackService.handleNewsletterCallback(token)
  // Show success message
}
```

## 🔄 Callback Types

### 1. OAuth Callbacks
- **Spotify**: Music service integration
- **GitHub**: Community features and authentication
- **Google**: Alternative sign-in method
- **Discord**: Community integration

### 2. Download Callbacks
- Track download analytics
- Verify download requests
- Rate limiting
- Platform-specific downloads

### 3. Newsletter Callbacks
- Email confirmation
- Subscription activation
- Preference updates
- Welcome email triggers

## 🛡️ Security Features

### 1. State Parameter Protection
- CSRF protection with state parameter
- 5-minute expiration
- Secure random generation
- Automatic cleanup

### 2. Error Handling
- Comprehensive error messages
- Graceful fallbacks
- User-friendly error display
- Logging for debugging

### 3. Rate Limiting
- Built-in rate limiting support
- Download tracking
- Analytics integration
- Abuse prevention

## 📊 Analytics Integration

The callback system includes analytics tracking:

```javascript
// Track callback events
callbackService.trackCallback('spotify', true) // Success
callbackService.trackCallback('spotify', false, 'access_denied') // Error

// Google Analytics integration
if (window.gtag) {
  window.gtag('event', 'callback', {
    event_category: 'authentication',
    event_label: 'spotify',
    value: 1
  })
}
```

## 🧪 Testing

### 1. Demo Page
Visit `/callback-demo` to test different scenarios:
- OAuth flows
- Success/error states
- Download callbacks
- Newsletter confirmations

### 2. Test URLs
```javascript
// Success callback
/callback?type=spotify&code=success_code_123&state=test_state

// Error callback
/callback?type=spotify&error=access_denied&error_description=User%20denied%20access

// Loading state
/callback

// Download success
/callback?type=download&code=download_success
```

### 3. Manual Testing
1. Start the development server: `npm run dev`
2. Visit `http://localhost:3000/callback-demo`
3. Test different callback scenarios
4. Check browser console for logs
5. Verify state management

## 🔧 Customization

### 1. Add New OAuth Provider

```javascript
// In callbackService.js
const baseUrls = {
  // ... existing providers
  newProvider: 'https://newprovider.com/oauth/authorize'
}

const clientIds = {
  // ... existing providers
  newProvider: process.env.REACT_APP_NEW_PROVIDER_CLIENT_ID
}

const scopes = {
  // ... existing providers
  newProvider: 'required scopes here'
}
```

### 2. Custom Callback Handler

```javascript
// In Callback.jsx
const handleCustomCallback = async (code, state, error) => {
  if (error) {
    throw new Error(`Custom provider error: ${error}`)
  }
  
  // Custom logic here
  setStatus('success')
  setMessage('Custom callback successful!')
}
```

### 3. Styling Customization

The callback page uses CSS classes that can be customized:
- `.glass` - Glass morphism effect
- `.gradient-text` - Gradient text effect
- `.floating-element` - Floating animation
- `.btn-primary` - Primary button style

## 🚨 Troubleshooting

### Common Issues

1. **CORS Errors**
   - Ensure redirect URIs are correctly configured
   - Check that callback URL matches exactly

2. **State Parameter Errors**
   - Verify state is being generated and stored
   - Check localStorage for OAuth states
   - Ensure cleanup is working properly

3. **Environment Variables**
   - Verify all required environment variables are set
   - Restart development server after changes
   - Check for typos in variable names

4. **Callback Not Processing**
   - Check browser console for errors
   - Verify route is properly configured
   - Ensure callback component is imported

### Debug Mode

Enable debug logging:

```javascript
// In callbackService.js
const DEBUG = process.env.NODE_ENV === 'development'

if (DEBUG) {
  console.log('OAuth URL generated:', url)
  console.log('State stored:', state)
  console.log('Callback received:', { code, state, error })
}
```

## 📈 Production Deployment

### 1. Environment Variables
```bash
# Production environment variables
REACT_APP_SPOTIFY_CLIENT_ID=your_production_spotify_client_id
REACT_APP_GITHUB_CLIENT_ID=your_production_github_client_id
REACT_APP_API_BASE_URL=https://api.omnifusionmusic.com
```

### 2. Redirect URIs
Update OAuth app settings with production URLs:
- `https://omnifusionmusic.com/callback`
- `https://www.omnifusionmusic.com/callback`

### 3. SSL Certificate
Ensure HTTPS is enabled for production:
- Required for OAuth flows
- Secure cookie handling
- Analytics tracking

### 4. Monitoring
Set up monitoring for callback endpoints:
- Success/failure rates
- Response times
- Error tracking
- User analytics

## 🎯 Next Steps

1. **Backend Integration**: Connect to your backend API
2. **Database Storage**: Store user tokens and preferences
3. **Email Integration**: Set up welcome emails
4. **Analytics**: Connect to your analytics platform
5. **Testing**: Add unit and integration tests
6. **Documentation**: Update user-facing documentation

## 📞 Support

For issues or questions:
- Check the troubleshooting section
- Review browser console logs
- Test with the demo page
- Contact the development team 