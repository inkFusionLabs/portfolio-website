declare global {
  interface Window {
    onSpotifyWebPlaybackSDKReady: () => void;
    Spotify: {
      Player: new (config: any) => SpotifyPlayer;
    };
  }
}

interface SpotifyPlayer {
  connect(): Promise<boolean>;
  disconnect(): void;
  getCurrentState(): Promise<SpotifyPlaybackState | null>;
  setName(name: string): Promise<void>;
  getVolume(): Promise<number>;
  setVolume(volume: number): Promise<void>;
  pause(): Promise<void>;
  resume(): Promise<void>;
  previousTrack(): Promise<void>;
  nextTrack(): Promise<void>;
  activateElement(): Promise<void>;
  addListener(event: string, callback: (data: any) => void): void;
  removeListener(event: string): void;
}

interface SpotifyPlaybackState {
  context: {
    uri: string;
    metadata: any;
  };
  disallows: {
    pausing: boolean;
    peeking_next: boolean;
    peeking_prev: boolean;
    resuming: boolean;
    seeking: boolean;
    skipping_next: boolean;
    skipping_prev: boolean;
  };
  duration: number;
  paused: boolean;
  position: number;
  repeat_mode: number;
  shuffle: boolean;
  track_window: {
    current_track: SpotifyTrack;
    previous_tracks: SpotifyTrack[];
    next_tracks: SpotifyTrack[];
  };
}

interface SpotifyTrack {
  id: string;
  uri: string;
  type: string;
  media_type: string;
  name: string;
  is_playable: boolean;
  album: {
    uri: string;
    name: string;
    images: Array<{ url: string; height: number; width: number }>;
  };
  artists: Array<{
    uri: string;
    name: string;
  }>;
}

interface SpotifyDevice {
  id: string;
  is_active: boolean;
  is_private_session: boolean;
  is_restricted: boolean;
  name: string;
  type: string;
  volume_percent: number;
}

class SpotifyPlaybackService {
  private player: SpotifyPlayer | null = null;
  private deviceId: string | null = null;
  private accessToken: string | null = null;
  private isInitialized = false;
  private stateUpdateCallbacks: ((state: SpotifyPlaybackState | null) => void)[] = [];
  private errorCallbacks: ((error: string) => void)[] = [];
  private isSafari = false;
  private useRestAPI = false;
  private pollingInterval: number | null = null;

  constructor() {
    this.isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
    this.useRestAPI = this.isSafari;
    
    if (this.isSafari) {
      console.log('🦁 Safari detected - Using REST API fallback for playback control');
    } else {
      this.initializeSDK();
    }
  }

  private initializeSDK(): void {
    window.onSpotifyWebPlaybackSDKReady = () => {
      console.log('Spotify Web Playback SDK is ready');
      this.isInitialized = true;
    };
  }

  async initialize(accessToken: string): Promise<boolean> {
    this.accessToken = accessToken;

    if (this.useRestAPI) {
      console.log('🎵 Using REST API mode for Safari compatibility');
      // Start polling for playback state
      this.startPolling();
      return true;
    }

    if (!window.Spotify) {
      console.error('Spotify Web Playback SDK not loaded');
      return false;
    }

    if (!this.isInitialized) {
      console.log('Waiting for Spotify SDK to initialize...');
      try {
        await new Promise<void>((resolve, reject) => {
          const timeout = setTimeout(() => {
            reject(new Error('SDK initialization timeout'));
          }, 10000); // 10 second timeout

          const checkReady = () => {
            if (this.isInitialized) {
              clearTimeout(timeout);
              resolve();
            } else {
              setTimeout(checkReady, 100);
            }
          };
          checkReady();
        });
      } catch (error) {
        console.error('Failed to initialize Spotify SDK:', error);
        return false;
      }
    }

    try {
      this.player = new window.Spotify.Player({
        name: 'OmniFusion Music Player',
        getOAuthToken: (cb: (token: string) => void) => { cb(accessToken); },
        volume: 0.5
      });

      // Error handling
      this.player.addListener('initialization_error', ({ message }) => {
        console.error('Failed to initialize:', message);
        this.errorCallbacks.forEach(callback => callback(message));
      });

      this.player.addListener('authentication_error', ({ message }) => {
        console.error('Failed to authenticate:', message);
        this.errorCallbacks.forEach(callback => callback(message));
      });

      this.player.addListener('account_error', ({ message }) => {
        console.error('Failed to validate Spotify account:', message);
        this.errorCallbacks.forEach(callback => callback(message));
      });

      this.player.addListener('playback_error', ({ message }) => {
        console.error('Failed to perform playback:', message);
        this.errorCallbacks.forEach(callback => callback(message));
      });

      // Playback status updates
      this.player.addListener('player_state_changed', (state) => {
        console.log('Playback state changed:', state);
        this.stateUpdateCallbacks.forEach(callback => callback(state));
      });

      // Ready
      this.player.addListener('ready', ({ device_id }) => {
        console.log('Ready with Device ID', device_id);
        this.deviceId = device_id;
      });

      // Not Ready
      this.player.addListener('not_ready', ({ device_id }) => {
        console.log('Device ID has gone offline', device_id);
        this.deviceId = null;
      });

      // Connect to the player
      const connected = await this.player.connect();
      if (connected) {
        console.log('Successfully connected to Spotify!');
        return true;
      } else {
        console.error('Failed to connect to Spotify');
        return false;
      }
    } catch (error) {
      console.error('Error initializing Spotify playback:', error);
      return false;
    }
  }

  private async getActiveDevice(): Promise<string | null> {
    if (!this.accessToken) return null;

    try {
      const response = await fetch('https://api.spotify.com/v1/me/player/devices', {
        headers: {
          'Authorization': `Bearer ${this.accessToken}`
        }
      });

      if (!response.ok) return null;

      const data = await response.json();
      const activeDevice = data.devices.find((device: SpotifyDevice) => device.is_active);
      
      if (activeDevice) {
        this.deviceId = activeDevice.id;
        return activeDevice.id;
      }

      // If no active device, use the first available device
      if (data.devices.length > 0) {
        this.deviceId = data.devices[0].id;
        return data.devices[0].id;
      }

      return null;
    } catch (error) {
      console.error('Error getting active device:', error);
      return null;
    }
  }

  private startPolling(): void {
    if (this.pollingInterval) {
      clearInterval(this.pollingInterval);
    }

    // Poll every 2 seconds for playback state
    this.pollingInterval = window.setInterval(async () => {
      try {
        const state = await this.getCurrentState();
        this.stateUpdateCallbacks.forEach(callback => callback(state));
      } catch (error) {
        console.error('Error polling playback state:', error);
      }
    }, 2000);
  }

  async playTrack(spotifyUri: string): Promise<boolean> {
    if (this.useRestAPI) {
      const deviceId = await this.getActiveDevice();
      if (!deviceId) {
        console.error('No active device available');
        return false;
      }

      try {
        const response = await fetch(`https://api.spotify.com/v1/me/player/play?device_id=${deviceId}`, {
          method: 'PUT',
          body: JSON.stringify({ uris: [spotifyUri] }),
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.accessToken}`
          }
        });

        if (response.ok) {
          console.log('Started playing track:', spotifyUri);
          return true;
        } else {
          console.error('Failed to play track:', response.statusText);
          return false;
        }
      } catch (error) {
        console.error('Error playing track:', error);
        return false;
      }
    }

    if (!this.deviceId || !this.accessToken) {
      console.error('No device ID or access token available');
      return false;
    }

    try {
      const response = await fetch(`https://api.spotify.com/v1/me/player/play?device_id=${this.deviceId}`, {
        method: 'PUT',
        body: JSON.stringify({ uris: [spotifyUri] }),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.accessToken}`
        }
      });

      if (response.ok) {
        console.log('Started playing track:', spotifyUri);
        return true;
      } else {
        console.error('Failed to play track:', response.statusText);
        return false;
      }
    } catch (error) {
      console.error('Error playing track:', error);
      return false;
    }
  }

  async playPlaylist(playlistUri: string): Promise<boolean> {
    if (this.useRestAPI) {
      const deviceId = await this.getActiveDevice();
      if (!deviceId) {
        console.error('No active device available');
        return false;
      }

      try {
        const response = await fetch(`https://api.spotify.com/v1/me/player/play?device_id=${deviceId}`, {
          method: 'PUT',
          body: JSON.stringify({ context_uri: playlistUri }),
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.accessToken}`
          }
        });

        if (response.ok) {
          console.log('Started playing playlist:', playlistUri);
          return true;
        } else {
          console.error('Failed to play playlist:', response.statusText);
          return false;
        }
      } catch (error) {
        console.error('Error playing playlist:', error);
        return false;
      }
    }

    if (!this.deviceId || !this.accessToken) {
      console.error('No device ID or access token available');
      return false;
    }

    try {
      const response = await fetch(`https://api.spotify.com/v1/me/player/play?device_id=${this.deviceId}`, {
        method: 'PUT',
        body: JSON.stringify({ context_uri: playlistUri }),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.accessToken}`
        }
      });

      if (response.ok) {
        console.log('Started playing playlist:', playlistUri);
        return true;
      } else {
        console.error('Failed to play playlist:', response.statusText);
        return false;
      }
    } catch (error) {
      console.error('Error playing playlist:', error);
      return false;
    }
  }

  async pause(): Promise<void> {
    if (this.useRestAPI) {
      try {
        await fetch('https://api.spotify.com/v1/me/player/pause', {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${this.accessToken}`
          }
        });
      } catch (error) {
        console.error('Error pausing playback:', error);
      }
      return;
    }

    if (this.player) {
      await this.player.pause();
    }
  }

  async resume(): Promise<void> {
    if (this.useRestAPI) {
      try {
        await fetch('https://api.spotify.com/v1/me/player/play', {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${this.accessToken}`
          }
        });
      } catch (error) {
        console.error('Error resuming playback:', error);
      }
      return;
    }

    if (this.player) {
      await this.player.resume();
    }
  }

  async nextTrack(): Promise<void> {
    if (this.useRestAPI) {
      try {
        await fetch('https://api.spotify.com/v1/me/player/next', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${this.accessToken}`
          }
        });
      } catch (error) {
        console.error('Error skipping to next track:', error);
      }
      return;
    }

    if (this.player) {
      await this.player.nextTrack();
    }
  }

  async previousTrack(): Promise<void> {
    if (this.useRestAPI) {
      try {
        await fetch('https://api.spotify.com/v1/me/player/previous', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${this.accessToken}`
          }
        });
      } catch (error) {
        console.error('Error skipping to previous track:', error);
      }
      return;
    }

    if (this.player) {
      await this.player.previousTrack();
    }
  }

  async setVolume(volume: number): Promise<void> {
    if (this.useRestAPI) {
      try {
        await fetch(`https://api.spotify.com/v1/me/player/volume?volume_percent=${Math.round(volume * 100)}`, {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${this.accessToken}`
          }
        });
      } catch (error) {
        console.error('Error setting volume:', error);
      }
      return;
    }

    if (this.player) {
      await this.player.setVolume(volume);
    }
  }

  async getVolume(): Promise<number> {
    if (this.useRestAPI) {
      try {
        // For REST API mode, we'll get volume from the device list
        const response = await fetch('https://api.spotify.com/v1/me/player/devices', {
          headers: {
            'Authorization': `Bearer ${this.accessToken}`
          }
        });

        if (response.ok) {
          const data = await response.json();
          const activeDevice = data.devices.find((device: SpotifyDevice) => device.is_active);
          return activeDevice?.volume_percent ? activeDevice.volume_percent / 100 : 0.5;
        }
        return 0.5;
      } catch (error) {
        console.error('Error getting volume:', error);
        return 0.5;
      }
    }

    if (this.player) {
      return await this.player.getVolume();
    }
    return 0.5;
  }

  async getCurrentState(): Promise<SpotifyPlaybackState | null> {
    if (this.useRestAPI) {
      if (!this.accessToken) return null;

      try {
        const response = await fetch('https://api.spotify.com/v1/me/player', {
          headers: {
            'Authorization': `Bearer ${this.accessToken}`
          }
        });

        if (!response.ok) return null;

        const data = await response.json();
        if (!data) return null;

        // Convert REST API response to match Web Playback SDK format
        return {
          context: {
            uri: data.context?.uri || '',
            metadata: data.context?.metadata || {}
          },
          disallows: {
            pausing: data.actions?.disallows?.includes('pausing') || false,
            peeking_next: data.actions?.disallows?.includes('peeking_next') || false,
            peeking_prev: data.actions?.disallows?.includes('peeking_prev') || false,
            resuming: data.actions?.disallows?.includes('resuming') || false,
            seeking: data.actions?.disallows?.includes('seeking') || false,
            skipping_next: data.actions?.disallows?.includes('skipping_next') || false,
            skipping_prev: data.actions?.disallows?.includes('skipping_prev') || false
          },
          duration: data.item?.duration_ms || 0,
          paused: !data.is_playing,
          position: data.progress_ms || 0,
          repeat_mode: data.repeat_state === 'off' ? 0 : data.repeat_state === 'track' ? 1 : 2,
          shuffle: data.shuffle_state || false,
          track_window: {
            current_track: data.item ? {
              id: data.item.id,
              uri: data.item.uri,
              type: data.item.type,
              media_type: data.item.type,
              name: data.item.name,
              is_playable: data.item.is_playable !== false,
              album: {
                uri: data.item.album.uri,
                name: data.item.album.name,
                images: data.item.album.images
              },
              artists: data.item.artists
            } : {
              id: '',
              uri: '',
              type: '',
              media_type: '',
              name: '',
              is_playable: false,
              album: {
                uri: '',
                name: '',
                images: []
              },
              artists: []
            },
            previous_tracks: [],
            next_tracks: []
          }
        };
      } catch (error) {
        console.error('Error getting current state:', error);
        return null;
      }
    }

    if (this.player) {
      return await this.player.getCurrentState();
    }
    return null;
  }

  async seekTo(position: number): Promise<void> {
    if (this.useRestAPI) {
      try {
        await fetch(`https://api.spotify.com/v1/me/player/seek?position_ms=${Math.round(position)}`, {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${this.accessToken}`
          }
        });
      } catch (error) {
        console.error('Error seeking to position:', error);
      }
      return;
    }

    // Web Playback SDK doesn't have a direct seek method
    // This would need to be implemented differently
    console.warn('Seeking not supported in Web Playback SDK mode');
  }

  onStateUpdate(callback: (state: SpotifyPlaybackState | null) => void): void {
    this.stateUpdateCallbacks.push(callback);
  }

  onError(callback: (error: string) => void): void {
    this.errorCallbacks.push(callback);
  }

  disconnect(): void {
    if (this.pollingInterval) {
      clearInterval(this.pollingInterval);
      this.pollingInterval = null;
    }

    if (this.player) {
      this.player.disconnect();
    }

    this.player = null;
    this.deviceId = null;
    this.accessToken = null;
    this.isInitialized = false;
    this.stateUpdateCallbacks = [];
    this.errorCallbacks = [];
    
    console.log('Spotify playback service disconnected');
  }

  isConnected(): boolean {
    return this.useRestAPI ? !!this.accessToken : !!this.player;
  }

  isSafariMode(): boolean {
    return this.useRestAPI;
  }
}

export const spotifyPlaybackService = new SpotifyPlaybackService() 