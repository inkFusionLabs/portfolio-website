# Spotify API Setup for OmniFusion Music

## Step 1: Create a Spotify Developer Account

1. Go to [Spotify Developer Dashboard](https://developer.spotify.com/dashboard)
2. Log in with your Spotify account
3. Click "Create App"

## Step 2: Configure Your App

### For Development (Localhost)
1. **App Name**: `OmniFusion Music`
2. **App Description**: `Universal music command center`
3. **Website**: `http://localhost:1420`
4. **Redirect URIs**: `http://localhost:1420/spotify-callback`
5. **API Permissions**: Select all the scopes listed in the app

### For Production (Your Website)
1. **App Name**: `OmniFusion Music`
2. **App Description**: `Universal music command center`
3. **Website**: `https://www.omnifusionmusic.com`
4. **Redirect URIs**: `https://www.omnifusionmusic.com/spotify-callback`
5. **API Permissions**: Select all the scopes listed in the app

## Step 3: Get Your Credentials

After creating the app, you'll get:
- **Client ID**: Copy this
- **Client Secret**: Copy this

## Step 4: Add Environment Variables

### For Development
Create a `.env` file in your project root with:

```env
# Required for Spotify OAuth
VITE_SPOTIFY_CLIENT_ID=your_client_id_here
VITE_SPOTIFY_CLIENT_SECRET=your_client_secret_here
```

### For Production
Create a `.env.production` file in your project root with:

```env
# Production Spotify OAuth
VITE_SPOTIFY_CLIENT_ID=your_client_id_here
VITE_SPOTIFY_CLIENT_SECRET=your_client_secret_here
VITE_SPOTIFY_REDIRECT_URI=https://www.omnifusionmusic.com/spotify-callback
VITE_APP_ENV=production
```

**Important**: Replace `yourdomain.com` with your actual domain name.

## Step 5: Test the Integration

### Development Testing
1. Start the app: `npm run tauri dev`
2. Go to Settings → Music Services
3. Click "Connect Spotify"
4. Complete the OAuth flow in your browser
5. If the browser doesn't open automatically, copy the URL and paste it manually
6. After authorization, paste the code back into the app

### Production Testing
1. Deploy your app to your website
2. Navigate to your app's Settings page
3. Click "Connect Spotify"
4. Complete the OAuth flow
5. You should be redirected back to your website automatically

## How the New Authentication Works

### Simple OAuth Flow
1. **Click Connect**: Opens Spotify's official authorization page in your browser
2. **Authorize**: Log in to Spotify and grant permissions
3. **Automatic Redirect**: You'll be redirected back to the app automatically
4. **Manual Fallback**: If the redirect doesn't work, you can manually copy the authorization code

### Benefits of the New System
- ✅ **No broken URLs**: Uses proper redirect URIs for both development and production
- ✅ **No clitches**: Handles errors gracefully with clear messages
- ✅ **Simple process**: One-click connection with manual fallback
- ✅ **Secure**: Uses state parameter to prevent CSRF attacks
- ✅ **User-friendly**: Clear instructions and error messages
- ✅ **Environment-aware**: Automatically uses correct redirect URI for dev/prod

## Required Scopes

The app requests these Spotify permissions:
- `user-read-private` - Read user profile
- `user-read-email` - Read user email
- `user-library-read` - Read saved tracks
- `user-library-modify` - Modify saved tracks
- `playlist-read-private` - Read private playlists
- `playlist-read-collaborative` - Read collaborative playlists
- `playlist-modify-public` - Create and modify public playlists
- `playlist-modify-private` - Create and modify private playlists
- `user-read-playback-state` - Read current playback state
- `user-modify-playback-state` - Control playback (play, pause, skip)
- `user-read-currently-playing` - Read currently playing track
- `streaming` - Stream music through the app

## Troubleshooting

### Common Issues

1. **"Client ID not configured"**
   - Make sure your `.env` file exists and contains the correct credentials
   - Restart the development server after adding environment variables

2. **"Invalid redirect URI"**
   - **Development**: Ensure the redirect URI in your Spotify app settings matches exactly: `http://localhost:1420/spotify-callback`
   - **Production**: Ensure the redirect URI matches exactly: `https://www.omnifusionmusic.com/spotify-callback`

3. **"Invalid authorization code"**
   - Authorization codes can only be used once
   - Generate a new authorization URL and try again

4. **Browser doesn't open automatically**
   - Use the manual URL copy feature
   - Paste the URL into your browser manually

5. **"Invalid state parameter"**
   - This is a security feature to prevent CSRF attacks
   - Try the connection process again

### Development vs Production

- **Development**: Uses `http://localhost:1420/spotify-callback`
- **Production**: Uses `https://www.omnifusionmusic.com/spotify-callback`

Make sure to update your Spotify app settings when deploying to production.

## Deployment Checklist

Before deploying to production:

1. ✅ **Update Spotify App Settings**
   - Add your production redirect URI: `https://www.omnifusionmusic.com/spotify-callback`
   - Remove the development redirect URI if not needed

2. ✅ **Create Production Environment File**
   - Create `.env.production` with your production credentials
   - Set `VITE_SPOTIFY_REDIRECT_URI` to your production URL

3. ✅ **Test Production OAuth Flow**
   - Deploy your app
   - Test the Spotify connection on your live website
   - Verify the redirect works correctly

4. ✅ **Update Documentation**
   - Update any user-facing documentation with your domain
   - Update support links and contact information

## Security Notes

- The app uses the state parameter to prevent CSRF attacks
- Authorization codes are single-use and expire quickly
- Access tokens are stored securely in localStorage
- Refresh tokens are used to maintain long-term access
- All API calls use HTTPS
- Production redirect URIs must use HTTPS 