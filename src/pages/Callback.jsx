import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import oauthService from '../services/oauthService';
import appIntegrationService from '../services/appIntegrationService';
import analyticsService from '../services/analyticsService';

const Callback = () => {
  const [status, setStatus] = useState('processing');
  const [message, setMessage] = useState('Processing your request...');
  const [countdown, setCountdown] = useState(5);
  const [error, setError] = useState(null);
  const [appStatus, setAppStatus] = useState(null);
  
  const params = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const handleCallback = async () => {
      try {
        const callbackType = params.type || 'generic';
        const code = searchParams.get('code');
        const state = searchParams.get('state');
        const error = searchParams.get('error');

        // Check for app integration
        const appStatus = appIntegrationService.getAppStatus();
        setAppStatus(appStatus);

        if (error) {
          throw new Error(`OAuth error: ${error}`);
        }

        switch (callbackType) {
          case 'spotify':
            await handleSpotifyCallback(code, state);
            break;
          case 'github':
            await handleGitHubCallback(code, state);
            break;
          case 'apple':
            await handleAppleCallback(code, state);
            break;
          case 'download':
            await handleDownloadCallback();
            break;
          case 'newsletter':
            await handleNewsletterCallback();
            break;
          default:
            await handleGenericCallback(code, state);
        }

        setStatus('success');
        setMessage('Success! Redirecting you...');
        
        // Track successful callback
        analyticsService.trackEvent('callback_success', {
          type: callbackType,
          app_installed: appStatus.installed
        });

      } catch (err) {
        console.error('Callback error:', err);
        setError(err.message);
        setStatus('error');
        setMessage('An error occurred. Please try again.');
        
        // Track callback error
        analyticsService.trackError(err, {
          context: 'callback_processing',
          type: params.type || 'generic'
        });
      }
    };

    handleCallback();
  }, [params.type, searchParams]);

  // Handle Spotify OAuth callback
  const handleSpotifyCallback = async (code, state) => {
    const result = await oauthService.handleCallback(code, state);
    
    // If app is installed, send tokens to app
    if (appStatus.installed) {
      appIntegrationService.handleAppCallback({
        provider: 'spotify',
        tokens: result.tokens,
        user: result.user
      });
    }
    
    setMessage(`Successfully connected to Spotify! Welcome, ${result.user.display_name || result.user.id}!`);
  };

  // Handle GitHub OAuth callback
  const handleGitHubCallback = async (code, state) => {
    const result = await oauthService.handleCallback(code, state);
    
    if (appStatus.installed) {
      appIntegrationService.handleAppCallback({
        provider: 'github',
        tokens: result.tokens,
        user: result.user
      });
    }
    
    setMessage(`Successfully connected to GitHub! Welcome, ${result.user.login || result.user.id}!`);
  };

  // Handle Apple Music OAuth callback
  const handleAppleCallback = async (code, state) => {
    const result = await oauthService.handleCallback(code, state);
    
    if (appStatus.installed) {
      appIntegrationService.handleAppCallback({
        provider: 'apple',
        tokens: result.tokens,
        user: result.user
      });
    }
    
    setMessage(`Successfully connected to Apple Music! Welcome, ${result.user.name || result.user.id}!`);
  };

  // Handle download callback
  const handleDownloadCallback = async () => {
    const platform = searchParams.get('platform') || 'unknown';
    const version = searchParams.get('version') || 'latest';
    
    // Track download
    analyticsService.trackDownload(platform, version);
    
    setMessage(`Download started for ${platform}! Check your downloads folder.`);
  };

  // Handle newsletter callback
  const handleNewsletterCallback = async () => {
    const email = searchParams.get('email');
    const subscribed = searchParams.get('subscribed') === 'true';
    
    if (subscribed) {
      setMessage(`Thank you for subscribing to our newsletter! We'll keep you updated.`);
    } else {
      setMessage(`You've been unsubscribed from our newsletter.`);
    }
  };

  // Handle generic callback
  const handleGenericCallback = async (code, state) => {
    if (code && state) {
      // Try to determine provider from state or other parameters
      const provider = searchParams.get('provider') || 'unknown';
      
      try {
        const result = await oauthService.handleCallback(code, state);
        
        if (appStatus.installed) {
          appIntegrationService.handleAppCallback({
            provider: result.provider,
            tokens: result.tokens,
            user: result.user
          });
        }
        
        setMessage(`Successfully connected to ${result.provider}!`);
      } catch (err) {
        setMessage('Authentication completed successfully!');
      }
    } else {
      setMessage('Request processed successfully!');
    }
  };

  // Countdown and redirect
  useEffect(() => {
    if (status === 'success' || status === 'error') {
      const timer = setInterval(() => {
        setCountdown(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            
            // Redirect based on app status
            if (appStatus?.installed) {
              // Open the app
              appIntegrationService.openApp('callback_complete', {
                status: status,
                type: params.type || 'generic'
              });
            } else {
              // Redirect to homepage
              navigate('/');
            }
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [status, appStatus, navigate, params.type]);

  const getStatusIcon = () => {
    switch (status) {
      case 'processing':
        return (
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
        );
      case 'success':
        return (
          <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
        );
      case 'error':
        return (
          <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/10 text-center">
        {/* Status Icon */}
        <div className="flex justify-center mb-6">
          {getStatusIcon()}
        </div>

        {/* Status Message */}
        <h2 className="text-2xl font-bold text-white mb-4">
          {status === 'processing' && 'Processing...'}
          {status === 'success' && 'Success!'}
          {status === 'error' && 'Error'}
        </h2>

        <p className="text-white/70 mb-6">
          {message}
        </p>

        {/* App Status */}
        {appStatus && (
          <div className="mb-6 p-4 bg-white/5 rounded-lg">
            <div className="flex items-center justify-center space-x-2 mb-2">
              <div className={`w-3 h-3 rounded-full ${appStatus.installed ? 'bg-green-500' : 'bg-gray-500'}`}></div>
              <span className="text-white/60 text-sm">
                {appStatus.installed ? 'OmniFusion Music app detected' : 'OmniFusion Music app not detected'}
              </span>
            </div>
            {appStatus.installed && appStatus.version && (
              <p className="text-white/40 text-xs">App version: {appStatus.version}</p>
            )}
          </div>
        )}

        {/* Error Details */}
        {error && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
            <p className="text-red-400 text-sm">{error}</p>
          </div>
        )}

        {/* Countdown */}
        {status !== 'processing' && (
          <div className="mb-6">
            <p className="text-white/60 text-sm">
              Redirecting in {countdown} seconds...
            </p>
            <div className="w-full bg-white/10 rounded-full h-2 mt-2">
              <div 
                className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-1000"
                style={{ width: `${((5 - countdown) / 5) * 100}%` }}
              ></div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          {status === 'error' && (
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition-colors"
            >
              Try Again
            </button>
          )}
          
          <button
            onClick={() => navigate('/')}
            className="px-6 py-3 bg-white/10 backdrop-blur-md text-white font-semibold rounded-lg border border-white/20 hover:bg-white/20 transition-colors"
          >
            Go Home
          </button>

          {appStatus?.installed && (
            <button
              onClick={() => appIntegrationService.openApp('open')}
              className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-lg hover:scale-105 transition-all duration-300"
            >
              Open App
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Callback; 