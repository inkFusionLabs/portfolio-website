#!/bin/bash

echo "🌐 Starting Local Tunnel for Spotify OAuth"
echo "=========================================="
echo ""

# Kill any existing processes on port 1420
echo "🔄 Stopping existing processes..."
pkill -f "vite\|tauri" || true
sleep 2

# Start the tunnel
echo "🚀 Starting local tunnel..."
lt --port 1420 --subdomain omnifusion-dev &
TUNNEL_PID=$!

# Wait for tunnel to be ready
echo "⏳ Waiting for tunnel to be ready..."
sleep 5

# Get the tunnel URL
TUNNEL_URL=$(curl -s http://localhost:4040/api/tunnels | grep -o '"public_url":"[^"]*"' | cut -d'"' -f4)

if [ -z "$TUNNEL_URL" ]; then
    echo "❌ Failed to get tunnel URL. Trying alternative method..."
    TUNNEL_URL="https://omnifusion-dev.loca.lt"
fi

echo ""
echo "✅ Tunnel is ready!"
echo "🌐 Public URL: $TUNNEL_URL"
echo "🔄 Redirect URI: $TUNNEL_URL/spotify-callback"
echo ""

# Update the development environment with the tunnel URL
echo "🔧 Updating environment configuration..."
cat > .env << EOF
# Development Environment Variables
# Spotify API Credentials
VITE_SPOTIFY_CLIENT_ID=0830208961c64908baf8bc1effbc4342
VITE_SPOTIFY_CLIENT_SECRET=c70789797dde459face1f0b6a3f12bef
VITE_SPOTIFY_REDIRECT_URI=$TUNNEL_URL/spotify-callback

# Development Settings
VITE_APP_ENV=development
EOF

echo "✅ Environment updated with tunnel URL"
echo ""

echo "📝 Next Steps:"
echo "1. Go to https://developer.spotify.com/dashboard"
echo "2. Select your OmniFusion Music app"
echo "3. Click 'Edit Settings'"
echo "4. Add this Redirect URI: $TUNNEL_URL/spotify-callback"
echo "5. Save the changes"
echo ""

echo "🚀 Starting development server..."
npm run tauri dev

# Cleanup when script exits
trap "echo '🛑 Stopping tunnel...'; kill $TUNNEL_PID 2>/dev/null; exit" INT TERM
wait 