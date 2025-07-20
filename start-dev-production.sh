#!/bin/bash

echo "🌐 Starting Development with Production Domain"
echo "=============================================="
echo ""

# Kill any existing processes
echo "🔄 Stopping existing processes..."
pkill -f "vite\|tauri" || true
sleep 2

# Use production domain for development
echo "🔧 Configuring for production domain..."
cat > .env << EOF
# Development Environment Variables (using production domain)
# Spotify API Credentials
VITE_SPOTIFY_CLIENT_ID=0830208961c64908baf8bc1effbc4342
VITE_SPOTIFY_CLIENT_SECRET=c70789797dde459face1f0b6a3f12bef
VITE_SPOTIFY_REDIRECT_URI=https://www.omnifusionmusic.com/spotify-callback

# Development Settings
VITE_APP_ENV=development
EOF

echo "✅ Environment configured for production domain"
echo ""

echo "📝 Spotify App Settings:"
echo "Redirect URI: https://www.omnifusionmusic.com/spotify-callback"
echo ""

echo "🚀 Starting development server..."
npm run tauri dev 