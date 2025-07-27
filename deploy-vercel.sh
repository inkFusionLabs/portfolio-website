#!/bin/bash

# OmniFusion Music Website - Vercel Deployment Script
# This script automatically deploys the website to Vercel

echo "🚀 Starting OmniFusion Music Website deployment..."

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found. Please run this script from the project root."
    exit 1
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Build the project
echo "🔨 Building project..."
npm run build

# Deploy to Vercel
echo "🚀 Deploying to Vercel..."
vercel --prod --yes

echo "✅ Deployment complete!"
echo "🌐 Your site should be live at: https://omni-fusion-music-website.vercel.app" 