import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

const SpotifyCallback = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  useEffect(() => {
    const code = searchParams.get('code');
    const error = searchParams.get('error');

    if (error) {
      setError(error);
      setTimeout(() => navigate('/'), 3000);
      return;
    }

    if (code) {
      // Store the authorization code
      localStorage.setItem('spotify_auth_code', code);
      
      // In a real app, you'd send this code to your backend to exchange for tokens
      console.log('Authorization code received:', code);
      
      // For demo purposes, we'll simulate the token exchange
      setTimeout(() => {
        const mockToken = 'mock_access_token_' + Date.now();
        localStorage.setItem('spotify_access_token', mockToken);
        localStorage.removeItem('spotify_auth_code');
        
        // Redirect back to the main page
        navigate('/');
      }, 2000);
    } else {
      setError('No authorization code received');
      setTimeout(() => navigate('/'), 3000);
    }
  }, [searchParams, navigate]);

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
        <p className="opacity-80">Please wait while we complete the authentication.</p>
      </div>
    </div>
  );
};

export default SpotifyCallback; 