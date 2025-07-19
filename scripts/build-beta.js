#!/usr/bin/env node

const { execSync } = require('child_process')
const fs = require('fs')
const path = require('path')

// Configuration
const config = {
  appName: 'OmniFusion Music',
  version: process.env.BETA_VERSION || '0.1.0-beta',
  platforms: ['windows', 'macos', 'linux'],
  buildDir: 'dist-beta',
  uploadUrl: process.env.BETA_UPLOAD_URL || 'https://api.omnifusion.com/beta/upload'
}

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m'
}

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`)
}

function logStep(step) {
  log(`\n${colors.cyan}=== ${step} ===${colors.reset}`)
}

function logSuccess(message) {
  log(`✅ ${message}`, 'green')
}

function logError(message) {
  log(`❌ ${message}`, 'red')
}

function logWarning(message) {
  log(`⚠️  ${message}`, 'yellow')
}

// Check if required tools are installed
function checkDependencies() {
  logStep('Checking Dependencies')
  
  try {
    execSync('npm --version', { stdio: 'pipe' })
    logSuccess('npm is installed')
  } catch {
    logError('npm is not installed')
    process.exit(1)
  }

  try {
    execSync('cargo --version', { stdio: 'pipe' })
    logSuccess('Cargo is installed')
  } catch {
    logError('Cargo is not installed')
    process.exit(1)
  }

  try {
    execSync('tauri --version', { stdio: 'pipe' })
    logSuccess('Tauri CLI is installed')
  } catch {
    logError('Tauri CLI is not installed. Run: npm install -g @tauri-apps/cli')
    process.exit(1)
  }
}

// Update version in package.json and tauri.conf.json
function updateVersion() {
  logStep('Updating Version')
  
  try {
    // Update package.json
    const packagePath = path.join(process.cwd(), 'package.json')
    const packageJson = JSON.parse(fs.readFileSync(packagePath, 'utf8'))
    packageJson.version = config.version
    fs.writeFileSync(packagePath, JSON.stringify(packageJson, null, 2))
    logSuccess(`Updated package.json version to ${config.version}`)

    // Update tauri.conf.json
    const tauriPath = path.join(process.cwd(), 'src-tauri', 'tauri.conf.json')
    const tauriConfig = JSON.parse(fs.readFileSync(tauriPath, 'utf8'))
    tauriConfig.package.version = config.version
    fs.writeFileSync(tauriPath, JSON.stringify(tauriConfig, null, 2))
    logSuccess(`Updated tauri.conf.json version to ${config.version}`)
  } catch (error) {
    logError(`Failed to update version: ${error.message}`)
    process.exit(1)
  }
}

// Install dependencies
function installDependencies() {
  logStep('Installing Dependencies')
  
  try {
    execSync('npm install', { stdio: 'inherit' })
    logSuccess('Frontend dependencies installed')
    
    execSync('cd src-tauri && cargo build', { stdio: 'inherit' })
    logSuccess('Rust dependencies installed')
  } catch (error) {
    logError(`Failed to install dependencies: ${error.message}`)
    process.exit(1)
  }
}

// Build frontend
function buildFrontend() {
  logStep('Building Frontend')
  
  try {
    execSync('npm run build', { stdio: 'inherit' })
    logSuccess('Frontend built successfully')
  } catch (error) {
    logError(`Frontend build failed: ${error.message}`)
    process.exit(1)
  }
}

// Build Tauri app for specific platform
function buildTauriApp(platform) {
  logStep(`Building for ${platform}`)
  
  try {
    const target = platform === 'windows' ? 'x86_64-pc-windows-msvc' : 
                   platform === 'macos' ? 'x86_64-apple-darwin' : 
                   'x86_64-unknown-linux-gnu'
    
    execSync(`cd src-tauri && cargo tauri build --target ${target}`, { stdio: 'inherit' })
    logSuccess(`Built successfully for ${platform}`)
  } catch (error) {
    logError(`Build failed for ${platform}: ${error.message}`)
    return false
  }
  
  return true
}

// Create beta build directory structure
function createBuildStructure() {
  logStep('Creating Build Structure')
  
  try {
    if (!fs.existsSync(config.buildDir)) {
      fs.mkdirSync(config.buildDir, { recursive: true })
    }
    
    // Create platform-specific directories
    config.platforms.forEach(platform => {
      const platformDir = path.join(config.buildDir, platform)
      if (!fs.existsSync(platformDir)) {
        fs.mkdirSync(platformDir, { recursive: true })
      }
    })
    
    logSuccess('Build directory structure created')
  } catch (error) {
    logError(`Failed to create build structure: ${error.message}`)
    process.exit(1)
  }
}

// Copy built files to beta directory
function copyBuildFiles(platform) {
  logStep(`Copying ${platform} build files`)
  
  try {
    const sourceDir = path.join('src-tauri', 'target', 'release')
    const targetDir = path.join(config.buildDir, platform)
    
    // Find the built executable
    const files = fs.readdirSync(sourceDir)
    const executable = files.find(file => {
      if (platform === 'windows') return file.endsWith('.exe')
      if (platform === 'macos') return file.endsWith('.app') || file.endsWith('.dmg')
      return !file.includes('.') // Linux executable
    })
    
    if (!executable) {
      throw new Error(`No executable found for ${platform}`)
    }
    
    const sourcePath = path.join(sourceDir, executable)
    const targetPath = path.join(targetDir, executable)
    
    fs.copyFileSync(sourcePath, targetPath)
    logSuccess(`Copied ${executable} to ${targetDir}`)
    
    // Create metadata file
    const metadata = {
      version: config.version,
      platform,
      buildDate: new Date().toISOString(),
      fileName: executable,
      size: fs.statSync(sourcePath).size
    }
    
    fs.writeFileSync(
      path.join(targetDir, 'metadata.json'),
      JSON.stringify(metadata, null, 2)
    )
    
  } catch (error) {
    logError(`Failed to copy build files for ${platform}: ${error.message}`)
    return false
  }
  
  return true
}

// Generate changelog
function generateChangelog() {
  logStep('Generating Changelog')
  
  try {
    const changelogPath = path.join(config.buildDir, 'CHANGELOG.md')
    const changelog = `# OmniFusion Music Beta ${config.version}

## Release Date
${new Date().toLocaleDateString()}

## What's New
- Beta testing program launch
- Initial release with core features
- Multi-platform support (Windows, macOS, Linux)

## Known Issues
- Some features may be unstable
- Performance optimizations in progress

## Installation
1. Download the appropriate build for your platform
2. Extract the archive
3. Run the executable
4. Follow the setup instructions

## Feedback
Please report bugs and feature requests through the beta testing portal.

---
Generated on ${new Date().toISOString()}
`
    
    fs.writeFileSync(changelogPath, changelog)
    logSuccess('Changelog generated')
  } catch (error) {
    logWarning(`Failed to generate changelog: ${error.message}`)
  }
}

// Upload builds (placeholder for actual implementation)
function uploadBuilds() {
  logStep('Uploading Builds')
  
  // This would integrate with your actual upload service
  logWarning('Upload functionality not implemented yet')
  log('To implement uploads, modify the uploadBuilds function in this script')
  log(`Upload URL: ${config.uploadUrl}`)
}

// Generate download links
function generateDownloadLinks() {
  logStep('Generating Download Links')
  
  try {
    const links = {}
    
    config.platforms.forEach(platform => {
      const platformDir = path.join(config.buildDir, platform)
      const metadataPath = path.join(platformDir, 'metadata.json')
      
      if (fs.existsSync(metadataPath)) {
        const metadata = JSON.parse(fs.readFileSync(metadataPath, 'utf8'))
        links[platform] = {
          downloadUrl: `${config.uploadUrl}/${platform}/${metadata.fileName}`,
          version: metadata.version,
          size: metadata.size,
          buildDate: metadata.buildDate
        }
      }
    })
    
    const linksPath = path.join(config.buildDir, 'download-links.json')
    fs.writeFileSync(linksPath, JSON.stringify(links, null, 2))
    logSuccess('Download links generated')
    
    // Log the links
    Object.entries(links).forEach(([platform, link]) => {
      log(`${platform}: ${link.downloadUrl}`, 'cyan')
    })
    
  } catch (error) {
    logError(`Failed to generate download links: ${error.message}`)
  }
}

// Main build process
async function main() {
  log(`🚀 Starting Beta Build Process for ${config.appName} ${config.version}`, 'bright')
  
  try {
    checkDependencies()
    updateVersion()
    installDependencies()
    buildFrontend()
    createBuildStructure()
    
    const buildResults = {}
    
    for (const platform of config.platforms) {
      const buildSuccess = buildTauriApp(platform)
      if (buildSuccess) {
        const copySuccess = copyBuildFiles(platform)
        buildResults[platform] = copySuccess
      } else {
        buildResults[platform] = false
      }
    }
    
    generateChangelog()
    generateDownloadLinks()
    uploadBuilds()
    
    // Summary
    logStep('Build Summary')
    Object.entries(buildResults).forEach(([platform, success]) => {
      if (success) {
        logSuccess(`${platform}: Build completed`)
      } else {
        logError(`${platform}: Build failed`)
      }
    })
    
    log(`\n${colors.green}🎉 Beta build process completed!${colors.reset}`)
    log(`Builds are available in: ${colors.cyan}${config.buildDir}${colors.reset}`)
    
  } catch (error) {
    logError(`Build process failed: ${error.message}`)
    process.exit(1)
  }
}

// Run the build process
if (require.main === module) {
  main()
}

module.exports = {
  config,
  main,
  buildTauriApp,
  copyBuildFiles
} 