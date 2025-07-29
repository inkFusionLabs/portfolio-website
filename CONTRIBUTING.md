# Contributing to OmniFusion Music

Thank you for your interest in contributing to OmniFusion Music! This document provides guidelines and information for contributors.

## 🎯 How Can I Contribute?

### Reporting Bugs
- Use the [bug report template](.github/ISSUE_TEMPLATE/bug_report.md)
- Include detailed steps to reproduce the issue
- Provide system information and error logs
- Add screenshots if applicable

### Suggesting Enhancements
- Use the [feature request template](.github/ISSUE_TEMPLATE/feature_request.md)
- Explain the problem you're trying to solve
- Describe your proposed solution
- Consider platform compatibility

### Code Contributions
- Fork the repository
- Create a feature branch
- Make your changes
- Add tests if applicable
- Submit a pull request

## 🛠️ Development Setup

### Prerequisites
- **Node.js** (v16 or higher)
- **Rust** (latest stable)
- **npm** or **yarn**
- **Git**

### Local Development
```bash
# Clone your fork
git clone https://github.com/yourusername/OmniFusionMusic.git
cd OmniFusionMusic

# Add upstream remote
git remote add upstream https://github.com/original-owner/OmniFusionMusic.git

# Install dependencies
npm install

# Install Tauri CLI globally
npm install -g @tauri-apps/cli

# Start development server
npm run dev
```

### Building
```bash
# Build for production
npm run build

# Build Tauri app
npm run tauri build
```

## 📝 Code Style Guidelines

### TypeScript/React
- Use TypeScript for all new code
- Follow React best practices
- Use functional components with hooks
- Prefer named exports over default exports
- Add proper TypeScript types

### Rust (Tauri Backend)
- Follow Rust naming conventions
- Use meaningful variable and function names
- Add documentation comments for public APIs
- Handle errors gracefully

### CSS/Styling
- Use Tailwind CSS utility classes
- Follow the existing design system
- Maintain responsive design principles
- Use CSS custom properties for theming

## 🧪 Testing

### Frontend Testing
```bash
# Run tests (when implemented)
npm test

# Run tests in watch mode
npm run test:watch
```

### Backend Testing
```bash
# Run Rust tests
cd src-tauri
cargo test
```

## 📦 Project Structure

### Frontend (`src/`)
```
src/
├── components/     # Reusable UI components
├── contexts/       # React contexts
├── pages/          # Application pages
├── services/       # API services
└── utils/          # Utility functions
```

### Backend (`src-tauri/`)
```
src-tauri/
├── src/           # Rust source code
├── Cargo.toml     # Rust dependencies
└── tauri.conf.json # Tauri configuration
```

## 🎵 Music Service Integration

When adding support for new music services:

1. **Research the API**: Understand the service's API documentation
2. **Authentication**: Implement OAuth or API key authentication
3. **Core Features**: Start with basic playback and search
4. **Advanced Features**: Add playlist management, recommendations
5. **Testing**: Test on multiple platforms
6. **Documentation**: Update setup guides and API documentation

### Current Services
- ✅ Spotify (in progress)
- 🔄 Apple Music (planned)
- 🔄 YouTube Music (planned)
- 🔄 Tidal (planned)
- 🔄 Deezer (planned)
- 🔄 Amazon Music (planned)

## 🔄 Pull Request Process

1. **Fork and Clone**: Fork the repository and clone your fork
2. **Create Branch**: Create a feature branch from `main`
3. **Make Changes**: Implement your feature or fix
4. **Test**: Ensure all tests pass and the app works correctly
5. **Commit**: Write clear, descriptive commit messages
6. **Push**: Push your branch to your fork
7. **Submit PR**: Create a pull request with a clear description

### Commit Message Format
```
type(scope): description

[optional body]

[optional footer]
```

Types:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes
- `refactor`: Code refactoring
- `test`: Adding tests
- `chore`: Maintenance tasks

### Pull Request Checklist
- [ ] Code follows project style guidelines
- [ ] Self-review completed
- [ ] Tests added/updated and passing
- [ ] Documentation updated
- [ ] No new warnings generated
- [ ] Screenshots added (if UI changes)

## 🏷️ Issue Labels

We use the following labels to categorize issues:

- `bug`: Something isn't working
- `enhancement`: New feature or request
- `documentation`: Improvements or additions to documentation
- `good first issue`: Good for newcomers
- `help wanted`: Extra attention is needed
- `priority: high`: High priority issues
- `priority: low`: Low priority issues
- `spotify`: Related to Spotify integration
- `apple-music`: Related to Apple Music integration
- `ui/ux`: User interface or experience related

## 🎉 Recognition

Contributors will be recognized in:
- The project README
- Release notes
- GitHub contributors page
- Community shoutouts

## 📞 Getting Help

- **Website**: Visit [OmniFusionMusic.com](https://omnifusionmusic.com) for documentation and guides
- **Discord**: Join our [Discord server](https://discord.gg/omnifusion)
- **GitHub Discussions**: Use [GitHub Discussions](https://github.com/yourusername/OmniFusionMusic/discussions)
- **Issues**: Create an issue for bugs or feature requests

## 📄 License

By contributing to OmniFusion Music, you agree that your contributions will be licensed under the MIT License.

---

Thank you for contributing to OmniFusion Music! 🎵 