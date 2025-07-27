# Vercel Automatic Deployment Setup

This guide will help you set up automatic deployments to Vercel when you commit to GitHub.

## Current Status

✅ **Project Linked**: Your local repository is linked to Vercel project `omnifusionmusic-website`
✅ **GitHub Actions**: Workflow created at `.github/workflows/deploy.yml`
✅ **Deployment Script**: Created `deploy-vercel.sh` for manual deployments

## Required GitHub Secrets

To enable automatic deployments, you need to add these secrets to your GitHub repository:

### 1. Get Vercel Token
1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click on your profile → Settings → Tokens
3. Create a new token with name "GitHub Actions"
4. Copy the token

### 2. Get Project Details
Your project details:
- **Project ID**: `prj_MUqdrwNsihv0Qg218MOOwgL1UaxC`
- **Organization ID**: `inkfusion-labs-projects`

### 3. Add GitHub Secrets
1. Go to your GitHub repository: https://github.com/inkFusionLabs/OmniFusionMusic-Website
2. Click Settings → Secrets and variables → Actions
3. Add these secrets:
   - `VERCEL_TOKEN`: Your Vercel token from step 1
   - `VERCEL_ORG_ID`: `inkfusion-labs-projects`
   - `VERCEL_PROJECT_ID`: `prj_MUqdrwNsihv0Qg218MOOwgL1UaxC`

## How It Works

### Automatic Deployment
- Every push to the `main` branch triggers automatic deployment
- GitHub Actions builds and deploys your site to Vercel
- Your site updates automatically at: https://omni-fusion-music-website.vercel.app

### Manual Deployment
You can also deploy manually using:
```bash
./deploy-vercel.sh
```

## Testing the Setup

1. Make a small change to your website
2. Commit and push to GitHub:
   ```bash
   git add .
   git commit -m "Test automatic deployment"
   git push origin main
   ```
3. Check the Actions tab in your GitHub repository
4. Your site should update automatically within 2-3 minutes

## Troubleshooting

If automatic deployments don't work:
1. Check GitHub Actions logs for errors
2. Verify all secrets are set correctly
3. Ensure Vercel project is properly linked
4. Try manual deployment with `./deploy-vercel.sh`

## Current Deployment URL

🌐 **Live Site**: https://omni-fusion-music-website.vercel.app 