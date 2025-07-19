import React, { createContext, useContext, useReducer, ReactNode, useEffect } from 'react'
import { spotifyService } from '../services/spotify'
import { spotifyPlaybackService } from '../services/spotifyPlayback'

// Define SpotifyPlaybackState interface locally
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
    current_track: {
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
    };
    previous_tracks: any[];
    next_tracks: any[];
  };
}

interface Track {
  id: string
  title: string
  artist: string
  album: string
  duration: number
  service: 'spotify' | 'apple' | 'youtube' | 'tidal' | 'deezer' | 'amazon'
  artwork: string
  url: string
}

interface Playlist {
  id: string
  name: string
  description: string
  tracks: Track[]
  service: string
  artwork: string
}

interface MusicState {
  currentTrack: Track | null
  queue: Track[]
  isPlaying: boolean
  volume: number
  playlists: Playlist[]
  connectedServices: string[]
  searchResults: Track[]
  currentPlaylist: Playlist | null
  userProfile: any | null
  recentlyPlayed: Track[]
  isLoading: boolean
  playbackState: SpotifyPlaybackState | null
  currentPosition: number
  currentDuration: number
}

type MusicAction =
  | { type: 'SET_CURRENT_TRACK'; payload: Track }
  | { type: 'SET_QUEUE'; payload: Track[] }
  | { type: 'SET_PLAYING'; payload: boolean }
  | { type: 'SET_VOLUME'; payload: number }
  | { type: 'ADD_TO_QUEUE'; payload: Track }
  | { type: 'REMOVE_FROM_QUEUE'; payload: string }
  | { type: 'SET_PLAYLISTS'; payload: Playlist[] }
  | { type: 'SET_CONNECTED_SERVICES'; payload: string[] }
  | { type: 'SET_SEARCH_RESULTS'; payload: Track[] }
  | { type: 'SET_CURRENT_PLAYLIST'; payload: Playlist }
  | { type: 'SET_USER_PROFILE'; payload: any }
  | { type: 'SET_RECENTLY_PLAYED'; payload: Track[] }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_PLAYBACK_STATE'; payload: SpotifyPlaybackState | null }
  | { type: 'SET_CURRENT_POSITION'; payload: number }
  | { type: 'SET_CURRENT_DURATION'; payload: number }

const initialState: MusicState = {
  currentTrack: null,
  queue: [],
  isPlaying: false,
  volume: 0.7,
  playlists: [],
  connectedServices: [],
  searchResults: [],
  currentPlaylist: null,
  userProfile: null,
  recentlyPlayed: [],
  isLoading: false,
  playbackState: null,
  currentPosition: 0,
  currentDuration: 0,
}

function musicReducer(state: MusicState, action: MusicAction): MusicState {
  switch (action.type) {
    case 'SET_CURRENT_TRACK':
      return { ...state, currentTrack: action.payload }
    case 'SET_QUEUE':
      return { ...state, queue: action.payload }
    case 'SET_PLAYING':
      return { ...state, isPlaying: action.payload }
    case 'SET_VOLUME':
      return { ...state, volume: action.payload }
    case 'ADD_TO_QUEUE':
      return { ...state, queue: [...state.queue, action.payload] }
    case 'REMOVE_FROM_QUEUE':
      return { ...state, queue: state.queue.filter(track => track.id !== action.payload) }
    case 'SET_PLAYLISTS':
      return { ...state, playlists: action.payload }
    case 'SET_CONNECTED_SERVICES':
      return { ...state, connectedServices: action.payload }
    case 'SET_SEARCH_RESULTS':
      return { ...state, searchResults: action.payload }
    case 'SET_CURRENT_PLAYLIST':
      return { ...state, currentPlaylist: action.payload }
    case 'SET_USER_PROFILE':
      return { ...state, userProfile: action.payload }
    case 'SET_RECENTLY_PLAYED':
      return { ...state, recentlyPlayed: action.payload }
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload }
    case 'SET_PLAYBACK_STATE':
      return { ...state, playbackState: action.payload }
    case 'SET_CURRENT_POSITION':
      return { ...state, currentPosition: action.payload }
    case 'SET_CURRENT_DURATION':
      return { ...state, currentDuration: action.payload }
    default:
      return state
  }
}

interface MusicContextType {
  state: MusicState
  dispatch: React.Dispatch<MusicAction>
  playTrack: (track: Track) => void
  pauseTrack: () => void
  nextTrack: () => void
  previousTrack: () => void
  addToQueue: (track: Track) => void
  removeFromQueue: (trackId: string) => void
  setVolume: (volume: number) => void
  seekTo: (position: number) => void
  searchMusic: (query: string) => Promise<void>
  connectService: (service: string) => void
  disconnectService: (service: string) => void
  loadUserData: () => Promise<void>
  loadPlaylists: () => Promise<void>
}

const MusicContext = createContext<MusicContextType | undefined>(undefined)

export function MusicProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(musicReducer, initialState)

  // Load user data on mount
  useEffect(() => {
    loadUserData()
  }, [])

  // Listen for Spotify connection events
  useEffect(() => {
    const handleSpotifyConnected = () => {
      console.log('Spotify connected event received - reloading user data')
      loadUserData()
    }
    
    window.addEventListener('spotifyConnected', handleSpotifyConnected)
    
    return () => {
      window.removeEventListener('spotifyConnected', handleSpotifyConnected)
    }
  }, [])



  const loadUserData = async () => {
    dispatch({ type: 'SET_LOADING', payload: true })
    try {
      // Check if Spotify is connected
      const isConnected = await spotifyService.initialize()
      if (isConnected) {
        dispatch({ type: 'SET_CONNECTED_SERVICES', payload: ['spotify'] })
        
        // Initialize playback service
        const accessToken = localStorage.getItem('spotify_access_token')
        if (accessToken) {
          try {
            const playbackConnected = await spotifyPlaybackService.initialize(accessToken)
            if (playbackConnected) {
              // Set up playback state listeners
              spotifyPlaybackService.onStateUpdate((playbackState) => {
                dispatch({ type: 'SET_PLAYBACK_STATE', payload: playbackState })
                if (playbackState) {
                  dispatch({ type: 'SET_PLAYING', payload: !playbackState.paused })
                  dispatch({ type: 'SET_CURRENT_POSITION', payload: playbackState.position })
                  dispatch({ type: 'SET_CURRENT_DURATION', payload: playbackState.duration })
                  
                  // Update current track if it changed
                  if (playbackState.track_window.current_track) {
                    const currentTrack: Track = {
                      id: playbackState.track_window.current_track.id,
                      title: playbackState.track_window.current_track.name,
                      artist: playbackState.track_window.current_track.artists[0]?.name || 'Unknown Artist',
                      album: playbackState.track_window.current_track.album.name,
                      duration: Math.round(playbackState.duration / 1000),
                      service: 'spotify' as const,
                      artwork: playbackState.track_window.current_track.album.images[0]?.url || '',
                      url: playbackState.track_window.current_track.uri
                    }
                    dispatch({ type: 'SET_CURRENT_TRACK', payload: currentTrack })
                  }
                }
              })
              
              spotifyPlaybackService.onError((error) => {
                console.error('Playback error:', error)
              })
            } else {
              console.warn('Spotify playback service failed to initialize - using fallback mode')
            }
          } catch (error) {
            console.error('Error initializing playback service:', error)
          }
        }
        
        // Load user profile
        const profile = await spotifyService.getCurrentUser()
        if (profile) {
          dispatch({ type: 'SET_USER_PROFILE', payload: profile })
        }
        
        // Load playlists
        await loadPlaylists()
        
        // Load recently played tracks
        const recentTracks = await spotifyService.getSavedTracks(10)
        const formattedRecentTracks = recentTracks.map((track: any) => ({
          id: track.id,
          title: track.name,
          artist: track.artists[0]?.name || 'Unknown Artist',
          album: track.album?.name || 'Unknown Album',
          duration: Math.round(track.duration_ms / 1000),
          service: 'spotify' as const,
          artwork: track.album?.images[0]?.url || '',
          url: track.external_urls?.spotify || ''
        }))
        dispatch({ type: 'SET_RECENTLY_PLAYED', payload: formattedRecentTracks })
      }
    } catch (error) {
      console.error('Failed to load user data:', error)
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false })
    }
  }

  const loadPlaylists = async () => {
    try {
      const spotifyPlaylists = await spotifyService.getUserPlaylists()
      const formattedPlaylists = spotifyPlaylists.map((playlist: any) => ({
        id: playlist.id,
        name: playlist.name,
        description: playlist.description || '',
        tracks: [],
        service: 'spotify',
        artwork: playlist.images[0]?.url || ''
      }))
      dispatch({ type: 'SET_PLAYLISTS', payload: formattedPlaylists })
    } catch (error) {
      console.error('Failed to load playlists:', error)
    }
  }

  const playTrack = async (track: Track) => {
    if (track.service === 'spotify' && spotifyPlaybackService.isConnected()) {
      try {
        // Convert track URL to Spotify URI
        const spotifyUri = `spotify:track:${track.id}`
        const success = await spotifyPlaybackService.playTrack(spotifyUri)
        if (success) {
          dispatch({ type: 'SET_CURRENT_TRACK', payload: track })
          dispatch({ type: 'SET_PLAYING', payload: true })
        }
      } catch (error) {
        console.error('Failed to play track:', error)
        // Fallback to UI-only mode
        dispatch({ type: 'SET_CURRENT_TRACK', payload: track })
        dispatch({ type: 'SET_PLAYING', payload: true })
      }
    } else {
      // For other services or when playback service is not available, just update the UI state
      dispatch({ type: 'SET_CURRENT_TRACK', payload: track })
      dispatch({ type: 'SET_PLAYING', payload: true })
    }
  }

  const pauseTrack = async () => {
    if (state.connectedServices.includes('spotify') && spotifyPlaybackService.isConnected()) {
      try {
        await spotifyPlaybackService.pause()
      } catch (error) {
        console.error('Failed to pause track:', error)
      }
    }
    dispatch({ type: 'SET_PLAYING', payload: false })
  }

  const nextTrack = async () => {
    if (state.connectedServices.includes('spotify') && spotifyPlaybackService.isConnected()) {
      try {
        await spotifyPlaybackService.nextTrack()
      } catch (error) {
        console.error('Failed to go to next track:', error)
      }
    } else if (state.queue.length > 0) {
      const nextTrack = state.queue[0]
      const newQueue = state.queue.slice(1)
      dispatch({ type: 'SET_CURRENT_TRACK', payload: nextTrack })
      dispatch({ type: 'SET_QUEUE', payload: newQueue })
    }
  }

  const previousTrack = async () => {
    if (state.connectedServices.includes('spotify') && spotifyPlaybackService.isConnected()) {
      try {
        await spotifyPlaybackService.previousTrack()
      } catch (error) {
        console.error('Failed to go to previous track:', error)
      }
    }
  }

  const addToQueue = (track: Track) => {
    dispatch({ type: 'ADD_TO_QUEUE', payload: track })
  }

  const removeFromQueue = (trackId: string) => {
    dispatch({ type: 'REMOVE_FROM_QUEUE', payload: trackId })
  }

  const setVolume = async (volume: number) => {
    if (state.connectedServices.includes('spotify') && spotifyPlaybackService.isConnected()) {
      try {
        await spotifyPlaybackService.setVolume(volume)
      } catch (error) {
        console.error('Failed to set volume:', error)
      }
    }
    dispatch({ type: 'SET_VOLUME', payload: volume })
  }

  const seekTo = async (position: number) => {
    if (state.connectedServices.includes('spotify') && spotifyPlaybackService.isConnected()) {
      try {
        await spotifyPlaybackService.seekTo(position)
      } catch (error) {
        console.error('Failed to seek:', error)
      }
    }
  }

  const searchMusic = async (query: string) => {
    if (!query.trim()) return
    
    dispatch({ type: 'SET_LOADING', payload: true })
    try {
      const results = await spotifyService.searchTracks(query, 20)
      const formattedResults = results.map((track: any) => ({
        id: track.id,
        title: track.name,
        artist: track.artists[0]?.name || 'Unknown Artist',
        album: track.album?.name || 'Unknown Album',
        duration: Math.round(track.duration_ms / 1000),
        service: 'spotify' as const,
        artwork: track.album?.images[0]?.url || '',
        url: track.external_urls?.spotify || ''
      }))
      dispatch({ type: 'SET_SEARCH_RESULTS', payload: formattedResults })
    } catch (error) {
      console.error('Search failed:', error)
      dispatch({ type: 'SET_SEARCH_RESULTS', payload: [] })
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false })
    }
  }

  const connectService = (service: string) => {
    if (!state.connectedServices.includes(service)) {
      dispatch({ type: 'SET_CONNECTED_SERVICES', payload: [...state.connectedServices, service] })
    }
  }

  const disconnectService = (service: string) => {
    dispatch({ type: 'SET_CONNECTED_SERVICES', payload: state.connectedServices.filter(s => s !== service) })
  }

  const value: MusicContextType = {
    state,
    dispatch,
    playTrack,
    pauseTrack,
    nextTrack,
    previousTrack,
    addToQueue,
    removeFromQueue,
    setVolume,
    seekTo,
    searchMusic,
    connectService,
    disconnectService,
    loadUserData,
    loadPlaylists,
  }

  return (
    <MusicContext.Provider value={value}>
      {children}
    </MusicContext.Provider>
  )
}

export function useMusic() {
  const context = useContext(MusicContext)
  if (context === undefined) {
    throw new Error('useMusic must be used within a MusicProvider')
  }
  return context
} 