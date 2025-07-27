# 🚀 Quick Start: Beta Testing Setup

Get your beta testing program up and running in 5 minutes!

## Step 1: Start the Beta API Server

```bash
# Navigate to the API directory
cd api

# Install dependencies
npm install

# Start the server
npm start
```

The API server will run on `http://localhost:3001`

## Step 2: Update Website Configuration

In `website/src/services/betaService.js`, update the API URL:

```javascript
this.baseUrl = 'http://localhost:3001' // Change this line
```

## Step 3: Start Your Website

```bash
# In a new terminal, navigate to website directory
cd website

# Install dependencies (if not already done)
npm install

# Start the development server
npm run dev
```

Your website will run on `http://localhost:5173`

## Step 4: Test Beta Signup

1. Visit your website
2. Scroll to the "Join Beta" section
3. Enter your email and select a platform
4. Click "Join Beta Program"
5. You should see a success message

## Step 5: Build Your First Beta

```bash
# In the root directory
npm run beta:build
```

This will:
- Build your app for all platforms
- Create a `dist-beta` directory
- Generate download links
- Create a changelog

## Step 6: Serve Beta Downloads

```bash
# Serve the beta builds locally
npm run beta:serve
```

Downloads will be available at `http://localhost:8080`

## 🎉 You're Ready!

Your beta testing program is now active with:
- ✅ User signup system
- ✅ Feedback collection
- ✅ Automated builds
- ✅ Download management
- ✅ Statistics tracking

## Next Steps

1. **Customize the UI** - Modify `BetaTesting.jsx` to match your brand
2. **Set up email notifications** - Configure email service for signup confirmations
3. **Deploy to production** - Move API server to a cloud provider
4. **Add analytics** - Integrate with Google Analytics or similar
5. **Set up monitoring** - Monitor server health and performance

## Troubleshooting

**API server won't start:**
```bash
# Check if port 3001 is available
lsof -i :3001
# Kill process if needed
kill -9 <PID>
```

**Build fails:**
```bash
# Clean and rebuild
npm run beta:clean
npm run beta:setup
npm run beta:build
```

**Website won't connect to API:**
- Check that API server is running on port 3001
- Verify CORS settings in `beta-server.js`
- Check browser console for errors

## Support

For issues:
1. Check the console for error messages
2. Verify all dependencies are installed
3. Ensure ports are not in use
4. Check file permissions

---

**Happy Beta Testing! 🎵** 