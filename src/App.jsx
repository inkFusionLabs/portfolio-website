import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import SpotifyCallback from './components/SpotifyCallback';
import Analytics from './components/Analytics';
import ErrorBoundary from './components/ErrorBoundary';
import './index.css';

function App() {
  return (
    <ErrorBoundary>
      <Router>
        <Analytics />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/callback" element={<SpotifyCallback />} />
        </Routes>
      </Router>
    </ErrorBoundary>
  );
}

export default App;
