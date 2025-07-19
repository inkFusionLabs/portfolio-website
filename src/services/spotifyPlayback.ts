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

class SpotifyPlaybackService {
  private player: SpotifyPlayer | null = null;
  private deviceId: string | null = null;
  private accessToken: string | null = null;
  private isInitialized = false;
  private stateUpdateCallbacks: ((state: SpotifyPlaybackState | null) => void)[] = [];
  private errorCallbacks: ((error: string) => void)[] = [];

  constructor() {
    this.initializeSDK();
  }

  private initializeSDK(): void {
    window.onSpotifyWebPlaybackSDKReady = () => {
      console.log('Spotify Web Playback SDK is ready');
      this.isInitialized = true;
    };
  }

  async initialize(accessToken: string): Promise<boolean> {
    // Check if we're in Safari or if the SDK is not available
    const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
    if (isSafari) {
      console.warn('Spotify Web Playback SDK is not supported in Safari');
      return false;
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

    this.accessToken = accessToken;

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

  async playTrack(spotifyUri: string): Promise<boolean> {
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
    if (this.player) {
      await this.player.pause();
    }
  }

  async resume(): Promise<void> {
    if (this.player) {
      await this.player.resume();
    }
  }

  async nextTrack(): Promise<void> {
    if (this.player) {
      await this.player.nextTrack();
    }
  }

  async previousTrack(): Promise<void> {
    if (this.player) {
      await this.player.previousTrack();
    }
  }

  async setVolume(volume: number): Promise<void> {
    if (this.player) {
      await this.player.setVolume(volume);
    }
  }

  async getVolume(): Promise<number> {
    if (this.player) {
      return await this.player.getVolume();
    }
    return 0;
  }

  async getCurrentState(): Promise<SpotifyPlaybackState | null> {
    if (this.player) {
      return await this.player.getCurrentState();
    }
    return null;
  }

  async seekTo(position: number): Promise<void> {
    if (!this.deviceId || !this.accessToken) {
      console.error('No device ID or access token available');
      return;
    }

    try {
      const response = await fetch(`https://api.spotify.com/v1/me/player/seek?position_ms=${position}&device_id=${this.deviceId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${this.accessToken}`
        }
      });

      if (!response.ok) {
        console.error('Failed to seek:', response.statusText);
      }
    } catch (error) {
      console.error('Error seeking:', error);
    }
  }

  onStateUpdate(callback: (state: SpotifyPlaybackState | null) => void): void {
    this.stateUpdateCallbacks.push(callback);
  }

  onError(callback: (error: string) => void): void {
    this.errorCallbacks.push(callback);
  }

  disconnect(): void {
    if (this.player) {
      this.player.disconnect();
      this.player = null;
    }
    this.deviceId = null;
    this.accessToken = null;
    this.stateUpdateCallbacks = [];
    this.errorCallbacks = [];
  }

  isConnected(): boolean {
    return this.player !== null && this.deviceId !== null;
  }
}

export const spotifyPlaybackService = new SpotifyPlaybackService();
export type { SpotifyPlaybackState, SpotifyTrack }; 