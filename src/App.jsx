import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import Callback from './pages/Callback';
import ErrorBoundary from './components/ErrorBoundary';
import PerformanceMonitor from './components/PerformanceMonitor';
import cacheService from './services/cacheService';
import analyticsService from './services/analyticsService';
import appIntegrationService from './services/appIntegrationService';
import './index.css';

function App() {
  useEffect(() => {
    // Initialize services
    const initializeServices = async () => {
      try {
        // Initialize cache service
        await cacheService.init();
        
        // Initialize app integration service
        await appIntegrationService.init();
        
        // Register service worker for PWA functionality
        if ('serviceWorker' in navigator) {
          try {
            const registration = await navigator.serviceWorker.register('/sw.js');
            console.log('Service Worker registered:', registration);
            
            // Track PWA installation
            window.addEventListener('beforeinstallprompt', (e) => {
              analyticsService.trackAppEvent('pwa_install_prompt', {
                platform: navigator.platform,
                user_agent: navigator.userAgent
              });
            });
          } catch (error) {
            console.log('Service Worker registration failed:', error);
          }
        }
        
        // Track app initialization
        analyticsService.trackAppEvent('initialization', {
          services_initialized: ['cache', 'analytics', 'app_integration', 'pwa'],
          app_installed: appIntegrationService.getAppStatus().installed,
          pwa_supported: 'serviceWorker' in navigator
        });
        
        console.log('Services initialized successfully');
      } catch (error) {
        console.error('Failed to initialize services:', error);
        analyticsService.trackError(error, { context: 'service_initialization' });
      }
    };

    initializeServices();
  }, []);

  return (
    <ErrorBoundary>
      <PerformanceMonitor />
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/callback" element={<Callback />} />
            <Route path="/callback/:type" element={<Callback />} />
          </Routes>
        </div>
      </Router>
    </ErrorBoundary>
  );
}

export default App;
