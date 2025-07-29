#!/bin/bash

# OmniFusion Music Callback System Setup Script
# This script helps you set up the callback system for your website

echo "🎵 OmniFusion Music Callback System Setup"
echo "=========================================="
echo ""

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: Please run this script from your project root directory"
    exit 1
fi

# Create website directory if it doesn't exist
if [ ! -d "website" ]; then
    echo "📁 Creating website directory..."
    mkdir -p website
fi

# Check if callback files exist
if [ ! -f "website/src/pages/Callback.jsx" ]; then
    echo "❌ Error: Callback files not found. Please extract the callback system files first."
    echo "   Download from: https://github.com/inkFusionLabs/OmniFusion-Music/releases"
    exit 1
fi

echo "✅ Callback system files found!"

# Install dependencies
echo "📦 Installing dependencies..."
cd website
npm install

# Check if .env file exists
if [ ! -f ".env" ]; then
    echo "🔧 Creating .env file..."
    cat > .env << EOF
# OAuth Client IDs
REACT_APP_SPOTIFY_CLIENT_ID=your_spotify_client_id
REACT_APP_GITHUB_CLIENT_ID=your_github_client_id
REACT_APP_GOOGLE_CLIENT_ID=your_google_client_id
REACT_APP_DISCORD_CLIENT_ID=your_discord_client_id

# Backend API URLs (if using separate backend)
REACT_APP_API_BASE_URL=http://localhost:3001/api
EOF
    echo "✅ Created .env file with placeholder values"
    echo "⚠️  Please update the .env file with your actual OAuth client IDs"
fi

# Create a quick start guide
echo "📖 Creating quick start guide..."
cat > QUICK_START.md << EOF
# Quick Start Guide

## 1. Configure OAuth Apps

### Spotify OAuth
1. Go to [Spotify Developer Dashboard](https://developer.spotify.com/dashboard)
2. Create a new app
3. Add redirect URI: \`http://localhost:3000/callback\`
4. Copy Client ID to .env file

### GitHub OAuth
1. Go to [GitHub Settings > OAuth Apps](https://github.com/settings/developers)
2. Create new OAuth App
3. Set Authorization callback URL: \`http://localhost:3000/callback\`
4. Copy Client ID to .env file

## 2. Start Development Server

\`\`\`bash
npm run dev
\`\`\`

## 3. Test the Callback System

Visit: http://localhost:3000/callback-demo

## 4. Available Routes

- \`/callback\` - Main callback handler
- \`/callback-demo\` - Testing interface

## 5. Documentation

- \`CALLBACK_SETUP.md\` - Comprehensive setup guide
- \`GITHUB_API_SETUP.md\` - GitHub API integration
- \`README.md\` - General website documentation

## Need Help?

- Check the troubleshooting section in CALLBACK_SETUP.md
- Review browser console for errors
- Test with the demo page
EOF

echo "✅ Created QUICK_START.md"

cd ..

echo ""
echo "🎉 Setup Complete!"
echo "=================="
echo ""
echo "Next steps:"
echo "1. Update .env file with your OAuth client IDs"
echo "2. Run 'cd website && npm run dev' to start the server"
echo "3. Visit http://localhost:3000/callback-demo to test"
echo "4. Read QUICK_START.md for detailed instructions"
echo ""
echo "📚 Documentation:"
echo "- CALLBACK_SETUP.md - Complete setup guide"
echo "- GITHUB_API_SETUP.md - GitHub integration"
echo "- QUICK_START.md - Quick start guide"
echo ""
echo "🚀 Happy coding!" 