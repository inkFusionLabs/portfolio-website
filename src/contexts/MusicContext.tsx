import React, { createContext, useContext, useReducer, ReactNode, useEffect, useMemo, useCallback } from 'react'
import { spotifyService } from '../services/spotify'

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
  volume: 50,
  playlists: [
    {
      id: 'playlist1',
      name: 'Chill Vibes',
      description: 'Relaxing music for your downtime',
      tracks: [],
      service: 'spotify',
      artwork: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop'
    },
    {
      id: 'playlist2',
      name: 'Workout Mix',
      description: 'High energy tracks for your workout',
      tracks: [],
      service: 'spotify',
      artwork: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=300&h=300&fit=crop'
    }
  ],
  connectedServices: ['spotify'],
  searchResults: [],
  currentPlaylist: null,
  userProfile: {
    id: 'sample-user',
    display_name: 'John Constable',
    email: 'john@example.com',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
        height: 150,
        width: 150
      }
    ],
    followers: {
      total: 127
    }
  },
  recentlyPlayed: [
    {
      id: 'sample1',
      title: 'Bohemian Rhapsody',
      artist: 'Queen',
      album: 'A Night at the Opera',
      duration: 354,
      service: 'spotify',
      artwork: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop',
      url: ''
    },
    {
      id: 'sample2',
      title: 'Hotel California',
      artist: 'Eagles',
      album: 'Hotel California',
      duration: 391,
      service: 'spotify',
      artwork: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=300&h=300&fit=crop',
      url: ''
    },
    {
      id: 'sample3',
      title: 'Imagine',
      artist: 'John Lennon',
      album: 'Imagine',
      duration: 183,
      service: 'spotify',
      artwork: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=300&h=300&fit=crop',
      url: ''
    }
  ],
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

  const loadUserData = useCallback(async () => {
    dispatch({ type: 'SET_LOADING', payload: true })
    try {
      // Check if Spotify is connected
      const isConnected = await spotifyService.initialize()
      
      if (isConnected) {
        console.log('🎵 Spotify connected, loading real data')
        
        // Load user profile
        const userProfile = await spotifyService.getCurrentUser()
        if (userProfile) {
          dispatch({ type: 'SET_USER_PROFILE', payload: userProfile })
        }
        
        // Load user playlists
        const playlists = await spotifyService.getUserPlaylists()
        const formattedPlaylists: Playlist[] = playlists.map(playlist => ({
          id: playlist.id,
          name: playlist.name,
          description: playlist.description || '',
          tracks: [],
          service: 'spotify',
          artwork: playlist.images[0]?.url || 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop'
        }))
        dispatch({ type: 'SET_PLAYLISTS', payload: formattedPlaylists })
        
        // Load saved tracks
        const savedTracks = await spotifyService.getSavedTracks(20)
        const formattedTracks: Track[] = savedTracks.map(track => ({
          id: track.id,
          title: track.name,
          artist: track.artists[0]?.name || 'Unknown Artist',
          album: track.album.name,
          duration: Math.floor(track.duration_ms / 1000),
          service: 'spotify',
          artwork: track.album.images[0]?.url || 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop',
          url: track.external_urls.spotify
        }))
        dispatch({ type: 'SET_RECENTLY_PLAYED', payload: formattedTracks })
        dispatch({ type: 'SET_CONNECTED_SERVICES', payload: ['spotify'] })
        
      } else {
        console.log('🎵 Spotify not connected, loading demo data for beta')
        
        // Demo data for beta users
        const sampleTracks: Track[] = [
          {
            id: 'sample1',
            title: 'Bohemian Rhapsody',
            artist: 'Queen',
            album: 'A Night at the Opera',
            duration: 354,
            service: 'spotify',
            artwork: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop',
            url: ''
          },
          {
            id: 'sample2',
            title: 'Hotel California',
            artist: 'Eagles',
            album: 'Hotel California',
            duration: 391,
            service: 'spotify',
            artwork: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=300&h=300&fit=crop',
            url: ''
          },
          {
            id: 'sample3',
            title: 'Imagine',
            artist: 'John Lennon',
            album: 'Imagine',
            duration: 183,
            service: 'spotify',
            artwork: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=300&h=300&fit=crop',
            url: ''
          }
        ]
        
        const samplePlaylists: Playlist[] = [
          {
            id: 'playlist1',
            name: 'Chill Vibes',
            description: 'Relaxing music for your downtime',
            tracks: sampleTracks,
            service: 'spotify',
            artwork: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop'
          },
          {
            id: 'playlist2',
            name: 'Workout Mix',
            description: 'High energy tracks for your workout',
            tracks: sampleTracks,
            service: 'spotify',
            artwork: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=300&h=300&fit=crop'
          }
        ]
        
        dispatch({ type: 'SET_RECENTLY_PLAYED', payload: sampleTracks })
        dispatch({ type: 'SET_PLAYLISTS', payload: samplePlaylists })
        dispatch({ type: 'SET_CONNECTED_SERVICES', payload: [] })
      }
    } catch (error) {
      console.error('Failed to load user data:', error)
      // Fallback to demo data on error
      dispatch({ type: 'SET_CONNECTED_SERVICES', payload: [] })
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false })
    }
  }, [])

  const loadPlaylists = useCallback(async () => {
    // Demo playlists - no authentication required
    console.log('🎵 Loading demo playlists')
  }, [])

  // Load user data on mount
  useEffect(() => {
    let mounted = true
    
    const initializeData = async () => {
      if (!mounted) return
      await loadUserData()
    }
    
    initializeData()
    
    return () => {
      mounted = false
    }
  }, [loadUserData])

  // No authentication events needed for simple demo

  const playTrack = useCallback(async (track: Track) => {
    console.log('🎵 Playing track:', track.title)
    // Simple UI-only playback - no authentication required
    dispatch({ type: 'SET_CURRENT_TRACK', payload: track })
    dispatch({ type: 'SET_PLAYING', payload: true })
  }, [])

  const pauseTrack = useCallback(async () => {
    // Simple UI-only pause
    dispatch({ type: 'SET_PLAYING', payload: false })
  }, [])

  const nextTrack = useCallback(async () => {
    // Simple UI-only next track
    if (state.queue.length > 0) {
      const nextTrack = state.queue[0]
      const newQueue = state.queue.slice(1)
      dispatch({ type: 'SET_CURRENT_TRACK', payload: nextTrack })
      dispatch({ type: 'SET_QUEUE', payload: newQueue })
    }
  }, [state.queue])

  const previousTrack = useCallback(async () => {
    // Simple UI-only previous track
    console.log('🎵 Previous track')
  }, [])

  const addToQueue = useCallback((track: Track) => {
    dispatch({ type: 'ADD_TO_QUEUE', payload: track })
  }, [])

  const removeFromQueue = useCallback((trackId: string) => {
    dispatch({ type: 'REMOVE_FROM_QUEUE', payload: trackId })
  }, [])

  const setVolume = useCallback(async (volume: number) => {
    // Simple UI-only volume control
    dispatch({ type: 'SET_VOLUME', payload: volume })
  }, [])

  const seekTo = useCallback(async (position: number) => {
    // Simple UI-only seek
    console.log('🎵 Seeking to position:', position)
  }, [])

  const searchMusic = useCallback(async (query: string) => {
    if (!query.trim()) return
    
    dispatch({ type: 'SET_LOADING', payload: true })
    try {
      // Check if Spotify is connected
      const isConnected = await spotifyService.initialize()
      
      if (isConnected) {
        // Use Spotify search
        const spotifyTracks = await spotifyService.searchTracks(query, 20)
        const formattedTracks: Track[] = spotifyTracks.map(track => ({
          id: track.id,
          title: track.name,
          artist: track.artists[0]?.name || 'Unknown Artist',
          album: track.album.name,
          duration: Math.floor(track.duration_ms / 1000),
          service: 'spotify',
          artwork: track.album.images[0]?.url || 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop',
          url: track.external_urls.spotify
        }))
        dispatch({ type: 'SET_SEARCH_RESULTS', payload: formattedTracks })
      } else {
        // Fallback to demo search results
        const demoResults: Track[] = [
          {
            id: 'search1',
            title: `Search result for "${query}"`,
            artist: 'Demo Artist',
            album: 'Demo Album',
            duration: 180,
            service: 'spotify',
            artwork: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop',
            url: ''
          }
        ]
        dispatch({ type: 'SET_SEARCH_RESULTS', payload: demoResults })
      }
    } catch (error) {
      console.error('Search failed:', error)
      dispatch({ type: 'SET_SEARCH_RESULTS', payload: [] })
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false })
    }
  }, [])

  const connectService = useCallback((service: string) => {
    if (!state.connectedServices.includes(service)) {
      dispatch({ type: 'SET_CONNECTED_SERVICES', payload: [...state.connectedServices, service] })
    }
  }, [state.connectedServices])

  const disconnectService = useCallback((service: string) => {
    dispatch({ type: 'SET_CONNECTED_SERVICES', payload: state.connectedServices.filter(s => s !== service) })
  }, [state.connectedServices])

  // No cleanup needed for simple demo

  const value: MusicContextType = useMemo(() => ({
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
  }), [
    state,
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
  ])

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