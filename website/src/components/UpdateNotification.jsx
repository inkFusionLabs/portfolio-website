import React, { useState, useEffect } from 'react'
import { RefreshCw, X } from 'lucide-react'

const UpdateNotification = () => {
  const [showUpdate, setShowUpdate] = useState(false)
  const [isUpdating, setIsUpdating] = useState(false)

  useEffect(() => {
    // Check for updates every 5 minutes
    const checkForUpdates = () => {
      // Check if there's a new version by comparing build timestamps
      const currentBuildTime = import.meta.env.VITE_BUILD_TIME || Date.now()
      const lastKnownBuildTime = localStorage.getItem('lastBuildTime')
      
      if (lastKnownBuildTime && parseInt(currentBuildTime) > parseInt(lastKnownBuildTime)) {
        setShowUpdate(true)
      }
      
      // Store current build time
      localStorage.setItem('lastBuildTime', currentBuildTime)
    }

    // Check immediately
    checkForUpdates()

    // Set up interval for checking updates
    const interval = setInterval(checkForUpdates, 5 * 60 * 1000) // 5 minutes

    // Listen for visibility change to check for updates when user returns to tab
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        checkForUpdates()
      }
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)

    return () => {
      clearInterval(interval)
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [])

  const handleUpdate = () => {
    setIsUpdating(true)
    // Reload the page to get the latest version
    window.location.reload()
  }

  const dismissUpdate = () => {
    setShowUpdate(false)
  }

  if (!showUpdate) return null

  return (
    <div className="fixed top-4 right-4 z-50 animate-slide-in">
      <div className="glass p-4 rounded-2xl shadow-2xl border border-white/10 max-w-sm">
        <div className="flex items-start space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center flex-shrink-0">
            <RefreshCw className={`w-5 h-5 text-white ${isUpdating ? 'animate-spin' : ''}`} />
          </div>
          <div className="flex-1">
            <h4 className="text-white font-semibold mb-1">New Update Available</h4>
            <p className="text-gray-300 text-sm mb-3">
              A new version of OmniFusion Music is ready. Refresh to get the latest features!
            </p>
            <div className="flex space-x-2">
              <button
                onClick={handleUpdate}
                disabled={isUpdating}
                className="btn-primary text-sm px-3 py-1.5"
              >
                {isUpdating ? 'Updating...' : 'Update Now'}
              </button>
              <button
                onClick={dismissUpdate}
                className="btn-secondary text-sm px-3 py-1.5"
              >
                Later
              </button>
            </div>
          </div>
          <button
            onClick={dismissUpdate}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default UpdateNotification 