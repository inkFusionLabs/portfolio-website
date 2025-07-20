import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Update build timestamp in vercel.json
const vercelConfigPath = path.join(__dirname, '..', 'vercel.json')
const vercelConfig = JSON.parse(fs.readFileSync(vercelConfigPath, 'utf8'))

// Set current timestamp
const now = new Date().toISOString()
vercelConfig.env.VITE_BUILD_TIME = now

// Write back to file
fs.writeFileSync(vercelConfigPath, JSON.stringify(vercelConfig, null, 2))

console.log(`✅ Updated build timestamp to: ${now}`) 