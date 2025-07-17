import React, { createContext, useContext, useReducer, ReactNode } from 'react'

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

const initialState: MusicState = {
  currentTrack: null,
  queue: [],
  isPlaying: false,
  volume: 0.7,
  playlists: [],
  connectedServices: [],
  searchResults: [],
  currentPlaylist: null,
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
  searchMusic: (query: string) => void
  connectService: (service: string) => void
  disconnectService: (service: string) => void
}

const MusicContext = createContext<MusicContextType | undefined>(undefined)

export function MusicProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(musicReducer, initialState)

  const playTrack = (track: Track) => {
    dispatch({ type: 'SET_CURRENT_TRACK', payload: track })
    dispatch({ type: 'SET_PLAYING', payload: true })
  }

  const pauseTrack = () => {
    dispatch({ type: 'SET_PLAYING', payload: false })
  }

  const nextTrack = () => {
    if (state.queue.length > 0) {
      const nextTrack = state.queue[0]
      const newQueue = state.queue.slice(1)
      dispatch({ type: 'SET_CURRENT_TRACK', payload: nextTrack })
      dispatch({ type: 'SET_QUEUE', payload: newQueue })
    }
  }

  const previousTrack = () => {
    // Implementation for previous track logic
  }

  const addToQueue = (track: Track) => {
    dispatch({ type: 'ADD_TO_QUEUE', payload: track })
  }

  const removeFromQueue = (trackId: string) => {
    dispatch({ type: 'REMOVE_FROM_QUEUE', payload: trackId })
  }

  const setVolume = (volume: number) => {
    dispatch({ type: 'SET_VOLUME', payload: volume })
  }

  const searchMusic = (query: string) => {
    // Mock search results for now
    const mockResults: Track[] = [
      {
        id: '1',
        title: 'Bohemian Rhapsody',
        artist: 'Queen',
        album: 'A Night at the Opera',
        duration: 354,
        service: 'spotify',
        artwork: 'https://via.placeholder.com/300',
        url: ''
      },
      {
        id: '2',
        title: 'Hotel California',
        artist: 'Eagles',
        album: 'Hotel California',
        duration: 391,
        service: 'apple',
        artwork: 'https://via.placeholder.com/300',
        url: ''
      }
    ]
    dispatch({ type: 'SET_SEARCH_RESULTS', payload: mockResults })
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
    searchMusic,
    connectService,
    disconnectService,
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