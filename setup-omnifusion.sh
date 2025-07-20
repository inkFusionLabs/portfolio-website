#!/bin/bash

echo "🎵 OmniFusion Music - Spotify API Setup"
echo "========================================"
echo "Website: https://www.omnifusionmusic.com"
echo ""

# Get Spotify credentials
read -p "Enter your Spotify Client ID: " CLIENT_ID
read -p "Enter your Spotify Client Secret: " CLIENT_SECRET

if [ -z "$CLIENT_ID" ] || [ -z "$CLIENT_SECRET" ]; then
    echo "❌ Client ID and Client Secret are required. Exiting."
    exit 1
fi

echo ""
echo "🔧 Creating production environment file..."

# Create production environment file
cat > .env.production << EOF
# Production Environment Variables
# Configured for https://www.omnifusionmusic.com
VITE_SPOTIFY_CLIENT_ID=$CLIENT_ID
VITE_SPOTIFY_CLIENT_SECRET=$CLIENT_SECRET
VITE_SPOTIFY_REDIRECT_URI=https://www.omnifusionmusic.com/spotify-callback
VITE_APP_ENV=production
EOF

echo "✅ Created .env.production file"
echo ""

echo "📝 Next Steps:"
echo "1. Go to https://developer.spotify.com/dashboard"
echo "2. Select your OmniFusion Music app"
echo "3. Click 'Edit Settings'"
echo "4. Add this Redirect URI: https://www.omnifusionmusic.com/spotify-callback"
echo "5. Save the changes"
echo ""
echo "🚀 Your app is now configured for production!"
echo "   Website: https://www.omnifusionmusic.com"
echo "   Redirect URI: https://www.omnifusionmusic.com/spotify-callback"
echo ""
echo "💡 Don't forget to:"
echo "   - Deploy your app to https://www.omnifusionmusic.com"
echo "   - Test the Spotify connection on your live website"
echo "   - Update any documentation with your domain"
echo "" 