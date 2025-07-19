# 🎵 OmniFusion Music

A universal music command center that brings all your music services together in one beautiful, cross-platform desktop application.

## ✨ Features

- **Universal Music Hub**: Connect and manage multiple music services from one interface
- **Spotify Integration**: Full Spotify API integration with OAuth authentication
- **Cross-Platform**: Built with Tauri for Windows, macOS, and Linux
- **Modern UI**: Beautiful glass morphism design with dark theme
- **Real-time Playback**: Control music playback across connected services
- **Smart Search**: Search across all your connected music services
- **Playlist Management**: View and manage playlists from different platforms

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm
- Rust (for Tauri development)
- Spotify Developer Account (for Spotify integration)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/omnifusion-music.git
   cd omnifusion-music
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up Spotify API** (see [Spotify Setup Guide](./SPOTIFY_SETUP.md))
   - Create a Spotify Developer app
   - Add your credentials to `.env` file

4. **Start development**
   ```bash
   npm run tauri dev
   ```

## 🔐 Spotify Authentication

The app now features a **simplified, error-free Spotify authentication process**:

### ✅ What's New
- **One-click connection**: Click "Connect Spotify" and you're done
- **Automatic browser opening**: No more broken URLs or manual copying
- **Manual fallback**: If the browser doesn't open, copy the URL manually
- **Clear error messages**: Know exactly what went wrong and how to fix it
- **Secure OAuth flow**: Uses proper state parameters and localhost redirects

### 🔄 How It Works
1. **Click Connect**: Opens Spotify's official authorization page
2. **Authorize**: Log in to Spotify and grant permissions  
3. **Automatic Redirect**: You're redirected back to the app automatically
4. **Manual Fallback**: If needed, manually copy the authorization code

### 🛠️ Troubleshooting
- **"Client ID not configured"**: Check your `.env` file
- **"Invalid redirect URI"**: Ensure `http://localhost:1420/spotify-callback` is in your Spotify app settings
- **Browser doesn't open**: Use the manual URL copy feature
- **"Invalid authorization code"**: Generate a new authorization URL

## 📁 Project Structure

```
OmniFusionMusic/
├── src/
│   ├── components/          # Reusable UI components
│   ├── pages/              # Main application pages
│   ├── services/           # API services (Spotify, etc.)
│   ├── contexts/           # React contexts for state management
│   └── main.tsx           # Application entry point
├── src-tauri/             # Tauri backend (Rust)
├── website/               # Marketing website
└── docs/                  # Documentation
```

## 🎯 Roadmap

### Phase 1: Core Features ✅
- [x] Spotify integration with OAuth
- [x] Modern UI with glass morphism
- [x] Cross-platform desktop app
- [x] Music playback controls
- [x] Playlist management

### Phase 2: Enhanced Features 🚧
- [ ] Apple Music integration
- [ ] YouTube Music integration
- [ ] Advanced search and filters
- [ ] AI-powered recommendations
- [ ] Collaborative playlists

### Phase 3: Advanced Features 📋
- [ ] Mobile app companion
- [ ] Social features
- [ ] Music analytics
- [ ] Custom themes
- [ ] Plugin system

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](./CONTRIBUTING.md) for details.

### Development Setup

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Tauri](https://tauri.app/) for the cross-platform framework
- [React](https://reactjs.org/) for the UI library
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [Spotify Web API](https://developer.spotify.com/documentation/web-api/) for music integration

## 📞 Support

- 📧 Email: support@omnifusionmusic.com
- 🐛 Issues: [GitHub Issues](https://github.com/yourusername/omnifusion-music/issues)
- 📖 Documentation: [Wiki](https://github.com/yourusername/omnifusion-music/wiki)

---

**Made with ❤️ by the OmniFusion Music Team** 