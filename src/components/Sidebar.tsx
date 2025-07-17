import { NavLink } from 'react-router-dom'
import { 
  Home, 
  ListMusic, 
  Search, 
  Play, 
  Library, 
  Settings, 
  Menu,
  Music,
  Heart,
  Clock,
  Radio,
  Users
} from 'lucide-react'
import { useMusic } from '../contexts/MusicContext'

interface SidebarProps {
  isOpen: boolean
  setIsOpen: (open: boolean) => void
}

const navigationItems = [
  { path: '/', icon: Home, label: 'Dashboard' },
  { path: '/playlists', icon: ListMusic, label: 'Playlists' },
  { path: '/discovery', icon: Search, label: 'Discovery' },
  { path: '/player', icon: Play, label: 'Player' },
  { path: '/library', icon: Library, label: 'Library' },
  { path: '/settings', icon: Settings, label: 'Settings' },
]

const quickActions = [
  { icon: Heart, label: 'Liked Songs', count: 127 },
  { icon: Clock, label: 'Recently Played', count: 45 },
  { icon: Radio, label: 'Radio Stations', count: 12 },
  { icon: Users, label: 'Collaborative', count: 8 },
]

export default function Sidebar({ isOpen, setIsOpen }: SidebarProps) {
  const { state } = useMusic()

  return (
    <div className={`fixed left-0 top-0 h-full bg-gray-900/95 backdrop-blur-xl border-r border-gray-700/50 transition-all duration-300 z-50 ${
      isOpen ? 'w-64' : 'w-16'
    }`}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-700/50">
        {isOpen && (
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-harmony-500 to-primary-500 rounded-lg flex items-center justify-center">
              <Music className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gradient">OmniFusion Music</span>
          </div>
        )}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 rounded-lg hover:bg-gray-800/50 transition-colors"
        >
          <Menu className="w-5 h-5 text-gray-300" />
        </button>
      </div>

      {/* Navigation */}
      <nav className="p-4 space-y-2">
        {navigationItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center space-x-3 p-3 rounded-lg transition-all duration-200 group ${
                isActive
                  ? 'bg-harmony-500/20 text-harmony-400 border border-harmony-500/30'
                  : 'text-gray-300 hover:bg-gray-800/50 hover:text-white'
              }`
            }
          >
            <item.icon className="w-5 h-5 flex-shrink-0" />
            {isOpen && <span className="font-medium">{item.label}</span>}
          </NavLink>
        ))}
      </nav>

      {/* Quick Actions */}
      {isOpen && (
        <div className="px-4">
          <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">
            Quick Actions
          </h3>
          <div className="space-y-2">
            {quickActions.map((action) => (
              <button
                key={action.label}
                className="flex items-center justify-between w-full p-3 rounded-lg text-gray-300 hover:bg-gray-800/50 hover:text-white transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <action.icon className="w-4 h-4" />
                  <span className="text-sm">{action.label}</span>
                </div>
                <span className="text-xs bg-gray-700 px-2 py-1 rounded-full">
                  {action.count}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Connected Services */}
      {isOpen && (
        <div className="px-4 mt-6">
          <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">
            Connected Services
          </h3>
          <div className="space-y-2">
            {state.connectedServices.length === 0 ? (
              <p className="text-xs text-gray-500">No services connected</p>
            ) : (
              state.connectedServices.map((service) => (
                <div
                  key={service}
                  className="flex items-center space-x-2 p-2 rounded-lg bg-green-500/10 border border-green-500/20"
                >
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-green-400 capitalize">{service}</span>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* Current Track (if playing) */}
      {state.currentTrack && isOpen && (
        <div className="absolute bottom-4 left-4 right-4">
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-3 border border-gray-700/50">
            <div className="flex items-center space-x-3">
              <img
                src={state.currentTrack.artwork}
                alt={state.currentTrack.title}
                className="w-10 h-10 rounded-md"
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">
                  {state.currentTrack.title}
                </p>
                <p className="text-xs text-gray-400 truncate">
                  {state.currentTrack.artist}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
} 