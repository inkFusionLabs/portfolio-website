#!/bin/bash

# OmniFusion Music Website Deployment Script

echo "🎵 OmniFusion Music Website Deployment"
echo "======================================"

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found. Please run this script from the website directory."
    exit 1
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Build the website
echo "🏗️ Building website..."
npm run build

# Check if build was successful
if [ ! -d "dist" ]; then
    echo "❌ Error: Build failed. dist folder not found."
    exit 1
fi

echo "✅ Build completed successfully!"
echo "📁 Static files are ready in the 'dist' folder"

# Deployment options
echo ""
echo "🌐 Deployment Options:"
echo "1. Deploy to Vercel (recommended)"
echo "2. Deploy to Netlify"
echo "3. Deploy to GitHub Pages"
echo "4. Manual deployment (just build)"
echo ""

read -p "Choose deployment option (1-4): " choice

case $choice in
    1)
        echo "🚀 Deploying to Vercel..."
        if command -v vercel &> /dev/null; then
            vercel --prod
        else
            echo "❌ Vercel CLI not found. Please install it first:"
            echo "npm install -g vercel"
            echo "Then run: vercel --prod"
        fi
        ;;
    2)
        echo "🚀 Deploying to Netlify..."
        if command -v netlify &> /dev/null; then
            netlify deploy --prod --dir=dist
        else
            echo "❌ Netlify CLI not found. Please install it first:"
            echo "npm install -g netlify-cli"
            echo "Then run: netlify deploy --prod --dir=dist"
        fi
        ;;
    3)
        echo "🚀 Deploying to GitHub Pages..."
        if [ -d ".git" ]; then
            npm install --save-dev gh-pages
            npm run deploy
        else
            echo "❌ Not a git repository. Please initialize git first."
        fi
        ;;
    4)
        echo "✅ Build completed. Manual deployment ready."
        echo "📁 Upload the 'dist' folder contents to your hosting service."
        ;;
    *)
        echo "❌ Invalid option. Please choose 1-4."
        exit 1
        ;;
esac

echo ""
echo "🎉 Deployment process completed!"
echo "📧 For support, contact: hello@omnifusionmusic.com" 