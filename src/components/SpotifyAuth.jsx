import React, { useState, useEffect } from 'react';
import { buildAuthUrl, getUserProfile } from '../config/spotify';

const SpotifyAuth = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [userProfile, setUserProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Check if user is already connected
    const accessToken = localStorage.getItem('spotify_access_token');
    const profile = localStorage.getItem('spotify_user_profile');
    
    if (accessToken && profile) {
      setIsConnected(true);
      setUserProfile(JSON.parse(profile));
    }
  }, []);

  const handleConnect = () => {
    setIsLoading(true);
    // Redirect to Spotify authorization
    window.location.href = buildAuthUrl();
  };

  const handleDisconnect = () => {
    // Clear all Spotify data
    localStorage.removeItem('spotify_access_token');
    localStorage.removeItem('spotify_refresh_token');
    localStorage.removeItem('spotify_token_expires');
    localStorage.removeItem('spotify_token_type');
    localStorage.removeItem('spotify_user_profile');
    
    setIsConnected(false);
    setUserProfile(null);
  };

  return (
    <section className="py-20 bg-gradient-to-b from-black to-gray-900 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-green-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-green-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Connect Your
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-400">
              Spotify Account
            </span>
          </h2>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            Link your Spotify account to experience seamless integration with the OmniFusion Music desktop app. 
            Access your playlists, favorites, and listening history in one unified desktop interface.
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          {!isConnected ? (
            <div className="bg-white/5 backdrop-blur-md rounded-3xl p-8 border border-white/10 text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
                </svg>
              </div>
              
              <h3 className="text-2xl font-bold text-white mb-4">
                Ready to Connect?
              </h3>
              <p className="text-white/70 mb-8 leading-relaxed">
                Connect your Spotify account to unlock personalized features, sync your playlists, 
                and enjoy a unified music experience in the OmniFusion Music desktop app.
              </p>

              <button
                onClick={handleConnect}
                disabled={isLoading}
                className="group relative px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold rounded-full text-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-green-500/25 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span className="relative z-10 flex items-center gap-3">
                  {isLoading ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  ) : (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                    </svg>
                  )}
                  {isLoading ? 'Connecting...' : 'Connect with Spotify'}
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-green-600 to-emerald-600 rounded-full blur opacity-0 group-hover:opacity-75 transition-opacity duration-300"></div>
              </button>

              <p className="text-sm text-white/50 mt-4">
                This will redirect you to Spotify to authorize access to your account for the desktop app.
              </p>
            </div>
          ) : (
            <div className="bg-white/5 backdrop-blur-md rounded-3xl p-8 border border-white/10">
              <div className="flex items-center justify-center mb-6">
                <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center">
                  <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                  </svg>
                </div>
              </div>

              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-white mb-2">
                  Connected Successfully! 🎉
                </h3>
                {userProfile && (
                  <div className="flex items-center justify-center gap-4 mb-4">
                    {userProfile.images && userProfile.images[0] && (
                      <img 
                        src={userProfile.images[0].url} 
                        alt={userProfile.display_name}
                        className="w-12 h-12 rounded-full border-2 border-white/20"
                      />
                    )}
                    <div className="text-left">
                      <p className="text-white font-semibold">{userProfile.display_name}</p>
                      <p className="text-white/70 text-sm">{userProfile.email}</p>
                    </div>
                  </div>
                )}
                <p className="text-white/70">
                  Your Spotify account is now connected and ready to use with the OmniFusion Music desktop app.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-full transition-all duration-300 hover:scale-105">
                  Download Desktop App
                </button>
                <button 
                  onClick={handleDisconnect}
                  className="px-6 py-3 bg-white/10 backdrop-blur-md text-white font-semibold rounded-full border border-white/20 transition-all duration-300 hover:bg-white/20 hover:border-white/40"
                >
                  Disconnect
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Benefits */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
          <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10 text-center">
            <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
            </div>
            <h4 className="text-white font-semibold mb-2">Sync Playlists</h4>
            <p className="text-white/70 text-sm">All your Spotify playlists automatically sync to the OmniFusion Music desktop app.</p>
          </div>

          <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10 text-center">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
              </svg>
            </div>
            <h4 className="text-white font-semibold mb-2">Smart Recommendations</h4>
            <p className="text-white/70 text-sm">Get personalized music recommendations based on your Spotify history in the desktop app.</p>
          </div>

          <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10 text-center">
            <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-red-500 rounded-xl flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
              </svg>
            </div>
            <h4 className="text-white font-semibold mb-2">Unified Desktop Control</h4>
            <p className="text-white/70 text-sm">Control your Spotify playback directly from the OmniFusion Music desktop application.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SpotifyAuth; 