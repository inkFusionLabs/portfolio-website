// Spotify OAuth Configuration
export const SPOTIFY_CONFIG = {
  CLIENT_ID: '0830208961c64908baf8bc1effbc4342',
  CLIENT_SECRET: 'c70789797dde459face1f0b6a3f12bef', // Note: This should be kept secure on the backend
  REDIRECT_URI: window.location.origin + '/callback',
  SCOPES: [
    'user-read-private',
    'user-read-email',
    'user-read-playback-state',
    'user-modify-playback-state',
    'user-read-currently-playing',
    'playlist-read-private',
    'playlist-read-collaborative',
    'user-library-read',
    'user-top-read'
  ],
  AUTH_URL: 'https://accounts.spotify.com/authorize',
  TOKEN_URL: 'https://accounts.spotify.com/api/token',
  API_BASE_URL: 'https://api.spotify.com/v1'
};

// Helper function to build authorization URL
export const buildAuthUrl = () => {
  const params = new URLSearchParams({
    client_id: SPOTIFY_CONFIG.CLIENT_ID,
    response_type: 'code',
    redirect_uri: SPOTIFY_CONFIG.REDIRECT_URI,
    scope: SPOTIFY_CONFIG.SCOPES.join(' '),
    show_dialog: 'true'
  });

  return `${SPOTIFY_CONFIG.AUTH_URL}?${params.toString()}`;
};

// Helper function to get user profile
export const getUserProfile = async (accessToken) => {
  try {
    const response = await fetch(`${SPOTIFY_CONFIG.API_BASE_URL}/me`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch user profile');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching user profile:', error);
    throw error;
  }
}; 