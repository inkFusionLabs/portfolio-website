import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { exchangeCodeForTokens, getUserProfile } from '../config/spotify';

const SpotifyCallback = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [status, setStatus] = useState('Connecting to Spotify...');

  useEffect(() => {
    const code = searchParams.get('code');
    const error = searchParams.get('error');

    if (error) {
      setError(error);
      setTimeout(() => navigate('/'), 3000);
      return;
    }

    if (code) {
      handleAuthorizationCode(code);
    } else {
      setError('No authorization code received');
      setTimeout(() => navigate('/'), 3000);
    }
  }, [searchParams, navigate]);

  const handleAuthorizationCode = async (code) => {
    try {
      setStatus('Exchanging authorization code...');
      
      // Exchange the authorization code for tokens
      const tokens = await exchangeCodeForTokens(code);
      
      // Store tokens in localStorage
      localStorage.setItem('spotify_access_token', tokens.access_token);
      localStorage.setItem('spotify_refresh_token', tokens.refresh_token);
      localStorage.setItem('spotify_token_expires', Date.now() + (tokens.expires_in * 1000));
      localStorage.setItem('spotify_token_type', tokens.token_type);
      
      setStatus('Fetching user profile...');
      
      // Get user profile
      const userProfile = await getUserProfile(tokens.access_token);
      localStorage.setItem('spotify_user_profile', JSON.stringify(userProfile));
      
      setStatus('Success! Redirecting...');
      
      // Redirect back to the main page
      setTimeout(() => navigate('/'), 1000);
      
    } catch (error) {
      console.error('Error during authentication:', error);
      setError('Failed to complete authentication. Please try again.');
      setTimeout(() => navigate('/'), 3000);
    }
  };

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-400 text-6xl mb-4">❌</div>
          <h1 className="text-2xl font-bold mb-4">Authentication Error</h1>
          <p className="opacity-80 mb-4">{error}</p>
          <p className="text-sm opacity-60">Redirecting back to home page...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-teal-400 mx-auto mb-4"></div>
        <h1 className="text-2xl font-bold mb-4">Connecting to Spotify...</h1>
        <p className="opacity-80">{status}</p>
      </div>
    </div>
  );
};

export default SpotifyCallback; 