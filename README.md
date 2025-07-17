# OmniFusion Music

A universal music command center that aggregates multiple streaming services into one beautiful desktop application.

## 🎵 Features

- **Multi-Service Support**: Connect to Spotify, Apple Music, YouTube Music, Tidal, Deezer, and Amazon Music
- **Universal Search**: Search across all your connected music services simultaneously
- **Unified Playback**: Control music from all services in one interface
- **Playlist Management**: View and manage playlists from all connected services
- **Cross-Platform**: Available on Windows, macOS, and Linux
- **Modern UI**: Beautiful glass morphism design with dark theme

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- Rust (for Tauri development)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd OmniFusion-Music
```

2. Install dependencies:
```bash
npm install
```

3. Install Tauri CLI:
```bash
npm install -g @tauri-apps/cli
```

### Development

Run the development server:
```bash
npm run dev
```

This will start both the React development server and the Tauri application.

### Building

Build for production:
```bash
npm run build
```

Build the Tauri application:
```bash
npm run tauri build
```

## 🛠️ Tech Stack

- **Frontend**: React 18 + TypeScript
- **UI Framework**: Tailwind CSS
- **Desktop Framework**: Tauri (Rust)
- **Icons**: Lucide React
- **Routing**: React Router DOM

## 📁 Project Structure

```
OmniFusion-Music/
├── src/
│   ├── components/     # Reusable UI components
│   ├── contexts/       # React contexts (MusicContext)
│   ├── pages/          # Application pages
│   └── main.tsx        # Application entry point
├── src-tauri/          # Tauri backend (Rust)
├── public/             # Static assets
└── dist/               # Build output
```

## 🎯 Roadmap

- [ ] Real service integration (Spotify API, Apple Music API, etc.)
- [ ] Offline mode support
- [ ] Cross-service playlist creation
- [ ] Advanced audio controls
- [ ] Music recommendations
- [ ] Social features (sharing, collaborative playlists)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Tauri](https://tauri.app/) for the cross-platform desktop framework
- [React](https://reactjs.org/) for the UI library
- [Tailwind CSS](https://tailwindcss.com/) for the styling framework
- [Lucide](https://lucide.dev/) for the beautiful icons 