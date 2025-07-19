const express = require('express')
const cors = require('cors')
const fs = require('fs').promises
const path = require('path')

const app = express()
const PORT = process.env.PORT || 3001

// Middleware
app.use(cors())
app.use(express.json())

// Data storage (in production, use a real database)
const dataDir = path.join(__dirname, 'data')
const betaUsersFile = path.join(dataDir, 'beta-users.json')
const feedbackFile = path.join(dataDir, 'feedback.json')
const statsFile = path.join(dataDir, 'stats.json')

// Ensure data directory exists
async function ensureDataDir() {
  try {
    await fs.access(dataDir)
  } catch {
    await fs.mkdir(dataDir, { recursive: true })
  }
}

// Load data from file
async function loadData(filePath, defaultValue = []) {
  try {
    const data = await fs.readFile(filePath, 'utf8')
    return JSON.parse(data)
  } catch {
    return defaultValue
  }
}

// Save data to file
async function saveData(filePath, data) {
  await fs.writeFile(filePath, JSON.stringify(data, null, 2))
}

// Initialize data files
async function initializeData() {
  await ensureDataDir()
  
  // Initialize beta users
  const betaUsers = await loadData(betaUsersFile, [])
  await saveData(betaUsersFile, betaUsers)
  
  // Initialize feedback
  const feedback = await loadData(feedbackFile, [])
  await saveData(feedbackFile, feedback)
  
  // Initialize stats
  const stats = await loadData(statsFile, {
    totalTesters: 0,
    activeTesters: 0,
    totalFeedback: 0,
    totalDownloads: 0,
    latestVersion: 'v0.1.0-beta'
  })
  await saveData(statsFile, stats)
}

// API Routes

// Beta signup
app.post('/api/beta/signup', async (req, res) => {
  try {
    const { email, platform, preferences } = req.body
    
    if (!email || !platform) {
      return res.status(400).json({ error: 'Email and platform are required' })
    }
    
    const betaUsers = await loadData(betaUsersFile)
    
    // Check if user already exists
    const existingUser = betaUsers.find(user => user.email === email)
    if (existingUser) {
      return res.status(409).json({ error: 'User already signed up for beta' })
    }
    
    // Add new user
    const newUser = {
      id: Date.now().toString(),
      email,
      platform,
      preferences,
      date: new Date().toISOString(),
      status: 'active'
    }
    
    betaUsers.push(newUser)
    await saveData(betaUsersFile, betaUsers)
    
    // Update stats
    const stats = await loadData(statsFile)
    stats.totalTesters = betaUsers.length
    stats.activeTesters = betaUsers.filter(user => user.status === 'active').length
    await saveData(statsFile, stats)
    
    res.json({
      success: true,
      message: 'Successfully signed up for beta testing',
      user: newUser
    })
  } catch (error) {
    console.error('Beta signup error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

// Submit feedback
app.post('/api/beta/feedback', async (req, res) => {
  try {
    const { type, message, metadata } = req.body
    
    if (!type || !message) {
      return res.status(400).json({ error: 'Type and message are required' })
    }
    
    const feedback = await loadData(feedbackFile)
    
    const newFeedback = {
      id: Date.now().toString(),
      type,
      message,
      metadata,
      date: new Date().toISOString(),
      status: 'new'
    }
    
    feedback.push(newFeedback)
    await saveData(feedbackFile, feedback)
    
    // Update stats
    const stats = await loadData(statsFile)
    stats.totalFeedback = feedback.length
    await saveData(statsFile, stats)
    
    res.json({
      success: true,
      message: 'Feedback submitted successfully',
      feedback: newFeedback
    })
  } catch (error) {
    console.error('Feedback submission error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

// Get download links
app.get('/api/beta/downloads/:platform', async (req, res) => {
  try {
    const { platform } = req.params
    
    // In production, this would fetch from your actual file storage
    const downloadLinks = {
      windows: {
        downloadUrl: `https://your-domain.com/beta/downloads/windows/OmniFusion-Music-windows-beta.exe`,
        version: 'v0.1.0-beta',
        size: 45678901,
        buildDate: new Date().toISOString()
      },
      macos: {
        downloadUrl: `https://your-domain.com/beta/downloads/macos/OmniFusion-Music-macos-beta.dmg`,
        version: 'v0.1.0-beta',
        size: 52345678,
        buildDate: new Date().toISOString()
      },
      linux: {
        downloadUrl: `https://your-domain.com/beta/downloads/linux/OmniFusion-Music-linux-beta.AppImage`,
        version: 'v0.1.0-beta',
        size: 48912345,
        buildDate: new Date().toISOString()
      }
    }
    
    const link = downloadLinks[platform]
    if (!link) {
      return res.status(404).json({ error: 'Platform not supported' })
    }
    
    res.json(link)
  } catch (error) {
    console.error('Download links error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

// Get beta statistics
app.get('/api/beta/stats', async (req, res) => {
  try {
    const stats = await loadData(statsFile)
    res.json(stats)
  } catch (error) {
    console.error('Stats error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

// Check for updates
app.get('/api/beta/updates', async (req, res) => {
  try {
    const { version } = req.query
    
    // In production, this would check against your actual version database
    const latestVersion = 'v0.1.0-beta'
    const hasUpdate = version !== latestVersion
    
    res.json({
      hasUpdate,
      latestVersion,
      downloadUrl: hasUpdate ? 'https://your-domain.com/beta/downloads/latest' : null,
      changelog: hasUpdate ? 'Bug fixes and performance improvements' : null
    })
  } catch (error) {
    console.error('Update check error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

// Report crash
app.post('/api/beta/crash', async (req, res) => {
  try {
    const { error, stack, context } = req.body
    
    if (!error) {
      return res.status(400).json({ error: 'Error message is required' })
    }
    
    const crashReport = {
      id: Date.now().toString(),
      error,
      stack,
      context,
      date: new Date().toISOString(),
      status: 'new'
    }
    
    // In production, save to crash reports file or database
    console.error('Crash report:', crashReport)
    
    res.json({
      success: true,
      message: 'Crash report submitted successfully'
    })
  } catch (error) {
    console.error('Crash report error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

// Get beta tester profile
app.get('/api/beta/profile/:email', async (req, res) => {
  try {
    const { email } = req.params
    const betaUsers = await loadData(betaUsersFile)
    
    const user = betaUsers.find(u => u.email === email)
    if (!user) {
      return res.status(404).json({ error: 'User not found' })
    }
    
    res.json(user)
  } catch (error) {
    console.error('Profile fetch error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

// Update beta tester preferences
app.put('/api/beta/preferences', async (req, res) => {
  try {
    const { email, preferences } = req.body
    
    if (!email || !preferences) {
      return res.status(400).json({ error: 'Email and preferences are required' })
    }
    
    const betaUsers = await loadData(betaUsersFile)
    const userIndex = betaUsers.findIndex(u => u.email === email)
    
    if (userIndex === -1) {
      return res.status(404).json({ error: 'User not found' })
    }
    
    betaUsers[userIndex].preferences = { ...betaUsers[userIndex].preferences, ...preferences }
    await saveData(betaUsersFile, betaUsers)
    
    res.json({
      success: true,
      message: 'Preferences updated successfully',
      user: betaUsers[userIndex]
    })
  } catch (error) {
    console.error('Preferences update error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

// Get all beta users (admin endpoint)
app.get('/api/beta/users', async (req, res) => {
  try {
    const betaUsers = await loadData(betaUsersFile)
    res.json(betaUsers)
  } catch (error) {
    console.error('Users fetch error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

// Get all feedback (admin endpoint)
app.get('/api/beta/feedback', async (req, res) => {
  try {
    const feedback = await loadData(feedbackFile)
    res.json(feedback)
  } catch (error) {
    console.error('Feedback fetch error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

// Start server
async function startServer() {
  await initializeData()
  
  app.listen(PORT, () => {
    console.log(`🚀 Beta testing API server running on port ${PORT}`)
    console.log(`📊 Health check: http://localhost:${PORT}/api/health`)
    console.log(`📝 API documentation: http://localhost:${PORT}/api/beta`)
  })
}

startServer().catch(console.error)

module.exports = app 