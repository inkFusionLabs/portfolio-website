import React, { useState } from 'react'
import { Music, Lock, User, Mail } from 'lucide-react'

interface SimpleAuthProps {
  onLogin: (userData: { name: string; email: string }) => void
}

export default function SimpleAuth({ onLogin }: SimpleAuthProps) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim() || !email.trim()) return

    setIsLoading(true)
    
    // Simulate a brief loading time
    setTimeout(() => {
      // Store user data in localStorage for persistence
      localStorage.setItem('omnifusion_user', JSON.stringify({ name, email }))
      onLogin({ name, email })
      setIsLoading(false)
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 flex items-center justify-center p-4">
      <div className="glass-effect rounded-2xl p-8 w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-r from-harmony-500 to-primary-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Music className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">OmniFusion Music</h1>
          <p className="text-gray-400">Beta Access</p>
        </div>

        {/* Auth Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              <User className="w-4 h-4 inline mr-2" />
              Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-harmony-500 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              <Mail className="w-4 h-4 inline mr-2" />
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-harmony-500 focus:border-transparent"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isLoading || !name.trim() || !email.trim()}
            className="w-full px-6 py-3 bg-gradient-to-r from-harmony-500 to-purple-600 hover:from-harmony-600 hover:to-purple-700 text-white rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center space-x-2"
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Signing In...</span>
              </>
            ) : (
              <>
                <Lock className="w-4 h-4" />
                <span>Access Beta</span>
              </>
            )}
          </button>
        </form>

        {/* Beta Info */}
        <div className="mt-6 p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
          <p className="text-sm text-blue-300 text-center">
            🚀 Welcome to the OmniFusion Music Beta! 
            <br />
            Experience the future of music streaming.
          </p>
        </div>
      </div>
    </div>
  )
} 