import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import Callback from './pages/Callback';
import ErrorBoundary from './components/ErrorBoundary';
import cacheService from './services/cacheService';
import analyticsService from './services/analyticsService';
import './index.css';

function App() {
  useEffect(() => {
    // Initialize services
    const initializeServices = async () => {
      try {
        // Initialize cache service
        await cacheService.init();
        
        // Track app initialization
        analyticsService.trackAppEvent('initialization', {
          services_initialized: ['cache', 'analytics']
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
