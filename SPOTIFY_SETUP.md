# Spotify API Setup for OmniFusion Music

## Step 1: Create a Spotify Developer Account

1. Go to [Spotify Developer Dashboard](https://developer.spotify.com/dashboard)
2. Log in with your Spotify account
3. Click "Create App"

## Step 2: Configure Your App

1. **App Name**: `OmniFusion Music`
2. **App Description**: `Universal music command center`
3. **Website**: `http://localhost:1420`
4. **Redirect URIs**: `http://localhost:1420/callback`
5. **API Permissions**: Select all the scopes listed in the app

## Step 3: Get Your Credentials

After creating the app, you'll get:
- **Client ID**: Copy this
- **Client Secret**: Copy this

## Step 4: Add Environment Variables

Create a `.env` file in your project root with:

```env
VITE_SPOTIFY_CLIENT_ID=your_client_id_here
VITE_SPOTIFY_CLIENT_SECRET=your_client_secret_here
```

## Step 5: Test the Integration

1. Start the app: `npm run tauri dev`
2. Go to Settings → Music Services
3. Click "Connect Spotify"
4. Complete the OAuth flow

## Required Scopes

The app requests these Spotify permissions:
- `user-read-private` - Read user profile
- `user-read-email` - Read user email
- `user-library-read` - Read saved tracks
- `user-library-modify` - Modify saved tracks
- `playlist-read-private` - Read private playlists
- `playlist-read-collaborative` - Read collaborative playlists
- `playlist-modify-public` - Modify public playlists
- `playlist-modify-private` - Modify private playlists
- `user-read-playback-state` - Read playback state
- `user-modify-playback-state` - Control playback
- `user-read-currently-playing` - Read currently playing
- `streaming` - Stream music

## Troubleshooting

- **"Invalid redirect URI"**: Make sure the redirect URI in your Spotify app matches exactly: `http://localhost:1420/callback`
- **"Client ID not found"**: Check that your `.env` file is in the project root and has the correct variable names
- **"Invalid client secret"**: Double-check your client secret in the `.env` file 