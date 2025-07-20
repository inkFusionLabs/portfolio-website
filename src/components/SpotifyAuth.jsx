import React, { useState, useEffect } from 'react';
import { buildAuthUrl, getUserProfile } from '../config/spotify';

const SpotifyAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userProfile, setUserProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Check if user is already authenticated
  useEffect(() => {
    const token = localStorage.getItem('spotify_access_token');
    if (token) {
      setIsAuthenticated(true);
      fetchUserProfile(token);
    }
  }, []);

  const handleSpotifyLogin = () => {
    setIsLoading(true);
    window.location.href = buildAuthUrl();
  };

  const fetchUserProfile = async (token) => {
    try {
      // In a real app, you'd make an actual API call
      // For demo purposes, we'll use mock data
      const mockProfile = {
        id: 'demo_user_123',
        display_name: 'Demo User',
        email: 'demo@example.com',
        images: [{ url: 'https://via.placeholder.com/150' }],
        followers: { total: 42 },
        product: 'premium'
      };
      
      setUserProfile(mockProfile);
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('spotify_access_token');
    setIsAuthenticated(false);
    setUserProfile(null);
  };

  if (isLoading) {
    return (
      <div className="tech-stack mb-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-400 mx-auto mb-4"></div>
          <p className="text-lg opacity-80">Connecting to Spotify...</p>
        </div>
      </div>
    );
  }

  if (isAuthenticated && userProfile) {
    return (
      <div className="tech-stack mb-12">
        <div className="text-center mb-6">
          <h3 className="text-3xl font-bold mb-4 text-green-400">
            ✅ Connected to Spotify
          </h3>
        </div>
        
        <div className="bg-green-400/10 border border-green-400/30 rounded-2xl p-6 backdrop-blur-md mb-6">
          <div className="flex items-center justify-center mb-4">
            <img 
              src={userProfile.images[0]?.url} 
              alt="Profile" 
              className="w-16 h-16 rounded-full mr-4"
            />
            <div className="text-left">
              <h4 className="text-xl font-semibold">{userProfile.display_name}</h4>
              <p className="opacity-70">{userProfile.email}</p>
              <p className="text-sm opacity-60">{userProfile.followers.total} followers</p>
            </div>
          </div>
          
          <div className="flex justify-center gap-4">
            <span className="bg-green-400/20 px-3 py-1 rounded-full text-sm">
              {userProfile.product} account
            </span>
            <span className="bg-blue-400/20 px-3 py-1 rounded-full text-sm">
              Connected
            </span>
          </div>
        </div>
        
        <div className="text-center">
          <button
            onClick={handleLogout}
            className="btn btn-secondary"
          >
            🔌 Disconnect from Spotify
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="tech-stack mb-12">
      <div className="text-center mb-8">
        <h3 className="text-3xl font-bold mb-4 text-teal-400">
          🎵 Connect Your Spotify Account
        </h3>
        <p className="text-lg opacity-80 mb-6">
          Connect your Spotify account to see how OmniFusion Music integrates with your library
        </p>
      </div>

      <div className="text-center">
        <button
          onClick={handleSpotifyLogin}
          className="btn btn-primary text-lg px-8 py-4"
          style={{ backgroundColor: '#1DB954', borderColor: '#1DB954' }}
        >
          🎵 Connect with Spotify
        </button>
        
        <p className="text-sm opacity-60 mt-4">
          This will redirect you to Spotify to authorize access to your account
        </p>
      </div>
    </div>
  );
};

export default SpotifyAuth; 