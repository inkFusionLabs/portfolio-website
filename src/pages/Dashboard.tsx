import { useState } from 'react'
import { 
  Search, 
  Play, 
  Pause, 
  SkipForward, 
  SkipBack, 
  Volume2,
  Plus,
  Heart,
  Share2,
  MoreHorizontal,
  Music
} from 'lucide-react'
import { useMusic } from '../contexts/MusicContext'

const mockPlaylists = [
  {
    id: '1',
    name: 'Chill Vibes',
    description: 'Perfect for relaxing evenings',
    tracks: 24,
    service: 'spotify',
    artwork: 'https://via.placeholder.com/150/1DB954/FFFFFF?text=Chill'
  },
  {
    id: '2',
    name: 'Workout Mix',
    description: 'High energy for your workouts',
    tracks: 18,
    service: 'apple',
    artwork: 'https://via.placeholder.com/150/FA243C/FFFFFF?text=Workout'
  },
  {
    id: '3',
    name: 'Study Focus',
    description: 'Concentration and productivity',
    tracks: 32,
    service: 'youtube',
    artwork: 'https://via.placeholder.com/150/FF0000/FFFFFF?text=Study'
  }
]

const mockRecentTracks = [
  {
    id: '1',
    title: 'Bohemian Rhapsody',
    artist: 'Queen',
    album: 'A Night at the Opera',
    duration: 354,
    service: 'spotify' as const,
    artwork: 'https://via.placeholder.com/60/1DB954/FFFFFF?text=Q',
    playedAt: '2 hours ago',
    url: ''
  },
  {
    id: '2',
    title: 'Hotel California',
    artist: 'Eagles',
    album: 'Hotel California',
    duration: 391,
    service: 'apple' as const,
    artwork: 'https://via.placeholder.com/60/FA243C/FFFFFF?text=E',
    playedAt: '4 hours ago',
    url: ''
  },
  {
    id: '3',
    title: 'Stairway to Heaven',
    artist: 'Led Zeppelin',
    album: 'Led Zeppelin IV',
    duration: 482,
    service: 'youtube' as const,
    artwork: 'https://via.placeholder.com/60/FF0000/FFFFFF?text=L',
    playedAt: '6 hours ago',
    url: ''
  }
]

const serviceIcons = {
  spotify: Music,
  apple: Music,
  youtube: Music
}

export default function Dashboard() {
  const { state, playTrack, pauseTrack, searchMusic } = useMusic()
  const [searchQuery, setSearchQuery] = useState('')

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      searchMusic(searchQuery)
    }
  }

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <div className="h-full overflow-y-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Welcome to OmniFusion Music</h1>
          <p className="text-gray-400">Your universal music command center</p>
        </div>
        <div className="flex items-center space-x-4">
          <button className="px-4 py-2 bg-harmony-500 hover:bg-harmony-600 text-white rounded-lg transition-colors">
            Connect Service
          </button>
        </div>
      </div>

      {/* Universal Search */}
      <div className="glass-effect rounded-xl p-6">
        <h2 className="text-xl font-semibold text-white mb-4">Universal Search</h2>
        <form onSubmit={handleSearch} className="flex space-x-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search across all your music services..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-harmony-500 focus:border-transparent"
            />
          </div>
          <button
            type="submit"
            className="px-6 py-3 bg-harmony-500 hover:bg-harmony-600 text-white rounded-lg transition-colors"
          >
            Search
          </button>
        </form>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="glass-effect rounded-xl p-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
              <Music className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Total Tracks</p>
              <p className="text-xl font-bold text-white">2,847</p>
            </div>
          </div>
        </div>
        <div className="glass-effect rounded-xl p-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
              <Heart className="w-5 h-5 text-green-400" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Liked Songs</p>
              <p className="text-xl font-bold text-white">127</p>
            </div>
          </div>
        </div>
        <div className="glass-effect rounded-xl p-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
              <Music className="w-5 h-5 text-purple-400" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Playlists</p>
              <p className="text-xl font-bold text-white">23</p>
            </div>
          </div>
        </div>
        <div className="glass-effect rounded-xl p-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-orange-500/20 rounded-lg flex items-center justify-center">
              <Music className="w-5 h-5 text-orange-400" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Services</p>
              <p className="text-xl font-bold text-white">3</p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity & Playlists */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Tracks */}
        <div className="glass-effect rounded-xl p-6">
          <h2 className="text-xl font-semibold text-white mb-4">Recently Played</h2>
          <div className="space-y-3">
            {mockRecentTracks.map((track) => {
              const ServiceIcon = serviceIcons[track.service as keyof typeof serviceIcons]
              return (
                <div
                  key={track.id}
                  className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-800/30 transition-colors cursor-pointer"
                  onClick={() => playTrack(track)}
                >
                  <img
                    src={track.artwork}
                    alt={track.title}
                    className="w-12 h-12 rounded-lg"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-white truncate">{track.title}</p>
                    <p className="text-xs text-gray-400 truncate">{track.artist}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <ServiceIcon className="w-4 h-4 text-gray-400" />
                    <span className="text-xs text-gray-500">{track.playedAt}</span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Featured Playlists */}
        <div className="glass-effect rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-white">Featured Playlists</h2>
            <button className="p-2 hover:bg-gray-800/50 rounded-lg transition-colors">
              <Plus className="w-5 h-5 text-gray-400" />
            </button>
          </div>
          <div className="space-y-4">
            {mockPlaylists.map((playlist) => {
              const ServiceIcon = serviceIcons[playlist.service as keyof typeof serviceIcons]
              return (
                <div
                  key={playlist.id}
                  className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-800/30 transition-colors cursor-pointer"
                >
                  <img
                    src={playlist.artwork}
                    alt={playlist.name}
                    className="w-12 h-12 rounded-lg"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-white truncate">{playlist.name}</p>
                    <p className="text-xs text-gray-400 truncate">{playlist.description}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <ServiceIcon className="w-4 h-4 text-gray-400" />
                    <span className="text-xs text-gray-500">{playlist.tracks} tracks</span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* AI Recommendations */}
      <div className="glass-effect rounded-xl p-6">
        <h2 className="text-xl font-semibold text-white mb-4">AI Recommendations</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-lg p-4 border border-blue-500/30">
            <h3 className="text-lg font-semibold text-white mb-2">Based on Your Mood</h3>
            <p className="text-sm text-gray-300 mb-3">Perfect for your current vibe</p>
            <button className="text-sm text-blue-400 hover:text-blue-300">Explore →</button>
          </div>
          <div className="bg-gradient-to-br from-green-500/20 to-teal-500/20 rounded-lg p-4 border border-green-500/30">
            <h3 className="text-lg font-semibold text-white mb-2">New Discoveries</h3>
            <p className="text-sm text-gray-300 mb-3">Artists you might love</p>
            <button className="text-sm text-green-400 hover:text-green-300">Discover →</button>
          </div>
          <div className="bg-gradient-to-br from-orange-500/20 to-red-500/20 rounded-lg p-4 border border-orange-500/30">
            <h3 className="text-lg font-semibold text-white mb-2">Trending Now</h3>
            <p className="text-sm text-gray-300 mb-3">What's hot across platforms</p>
            <button className="text-sm text-orange-400 hover:text-orange-300">Trending →</button>
          </div>
        </div>
      </div>
    </div>
  )
} 