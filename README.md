# OmniFusion Music Website

A modern, responsive website for OmniFusion Music - the universal music command center.

## 🚀 Quick Deploy to Vercel

### Option 1: Deploy with Vercel CLI (Recommended)

1. **Install Vercel CLI** (if not already installed):
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**:
   ```bash
   vercel login
   ```

3. **Deploy from the website directory**:
   ```bash
   cd website
   ./deploy-vercel.sh
   ```

### Option 2: Deploy from GitHub

1. **Push your code to GitHub**:
   ```bash
   cd website
   git init
   git add .
   git commit -m "Initial website commit"
   git branch -M main
   git remote add origin https://github.com/yourusername/OmniFusionMusic.git
   git push -u origin main
   ```

2. **Connect to Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Sign up/Login with your GitHub account
   - Click "New Project"
   - Import your GitHub repository
   - Select the `website` folder as the root directory
   - Click "Deploy"

## 🛠️ Tech Stack

- **Frontend**: React 18 + Vite
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Routing**: React Router DOM
- **Deployment**: Vercel

## 📦 Local Development

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start development server**:
   ```bash
   npm run dev
   ```

3. **Build for production**:
   ```bash
   npm run build
   ```

## 🎨 Features

- **Modern Design**: Glassmorphism UI with beautiful gradients and animations
- **Responsive**: Works perfectly on desktop, tablet, and mobile devices
- **Fast**: Built with Vite and React for optimal performance
- **SEO Optimized**: Proper meta tags, Open Graph, and structured data
- **Download Section**: Platform-specific download buttons with version info
- **Newsletter Signup**: Email collection for updates and announcements

## 📁 Project Structure

```
website/
├── src/
│   ├── components/     # React components
│   │   ├── Hero.jsx    # Hero section
│   │   ├── Features.jsx # Features showcase
│   │   ├── Download.jsx # Download section
│   │   ├── Footer.jsx  # Footer component
│   │   └── Navbar.jsx  # Navigation
│   ├── App.jsx         # Main app component
│   ├── main.jsx        # App entry point
│   └── index.css       # Global styles
├── public/             # Static assets
├── dist/               # Build output
├── vercel.json         # Vercel configuration
├── tailwind.config.js  # Tailwind CSS config
├── postcss.config.js   # PostCSS configuration
└── package.json        # Dependencies
```

## 🔧 Configuration

### Environment Variables
Create a `.env` file for:
```env
VITE_APP_NAME=OmniFusion Music
VITE_APP_VERSION=1.0.0
VITE_GITHUB_URL=https://github.com/your-repo/OmniFusionMusic
VITE_DISCORD_URL=https://discord.gg/omnifusion
```

### Custom Domain Setup
1. Add your domain in Vercel dashboard
2. Configure DNS records:
   ```
   Type: A
   Name: @
   Value: 76.76.19.19
   
   Type: CNAME
   Name: www
   Value: cname.vercel-dns.com
   ```

## 📊 Analytics

### Google Analytics
Add to `index.html`:
```html
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

## 🎯 Customization

### Updating Download Links
Edit `src/components/Download.jsx` to update:
- Download URLs for each platform
- Version numbers
- File sizes
- System requirements

### Changing Colors
Modify the gradient colors in:
- `src/index.css` (button styles)
- `tailwind.config.js` (theme colors)
- Individual components

## 🚨 Troubleshooting

### Build Issues
1. Ensure all dependencies are installed: `npm install`
2. Check for icon import issues (use valid Lucide React icons)
3. Verify Tailwind CSS configuration

### Deployment Issues
1. Check Vercel build logs
2. Ensure `vercel.json` is properly configured
3. Verify environment variables are set

## 📈 Performance

The website is optimized with:
- ✅ Vite for fast builds
- ✅ Tailwind CSS for minimal CSS
- ✅ React 18 with concurrent features
- ✅ Proper caching headers
- ✅ Image optimization
- ✅ Code splitting

## 🔄 Continuous Deployment

Once connected to GitHub, Vercel will automatically:
- Deploy on every push to `main` branch
- Create preview deployments for pull requests
- Rollback to previous versions if needed

## 📞 Support

For website issues or questions:
- Create an issue on GitHub
- Check the deployment logs in Vercel dashboard
- Review the build output locally

## 📄 License

This website is part of the OmniFusion Music project and follows the same license terms.

---

**Ready to deploy?** Run `./deploy-vercel.sh` from the website directory! 