import React, { useState, useEffect } from 'react'
import { Users, MessageSquare, Download, Star, Bug, TrendingUp, AlertCircle, CheckCircle } from 'lucide-react'
import betaService from '../services/betaService'

const BetaDashboard = () => {
  const [stats, setStats] = useState({
    totalTesters: 0,
    activeTesters: 0,
    totalFeedback: 0,
    totalDownloads: 0,
    latestVersion: 'v0.1.0-beta'
  })
  const [feedback, setFeedback] = useState([])
  const [testers, setTesters] = useState([])
  const [selectedTab, setSelectedTab] = useState('overview')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadDashboardData()
  }, [])

  const loadDashboardData = async () => {
    setLoading(true)
    try {
      // Load local data for demo
      const localTesters = betaService.getLocalBetaUsers()
      const localFeedback = betaService.getLocalFeedback()
      
      setTesters(localTesters)
      setFeedback(localFeedback)
      
      setStats({
        totalTesters: localTesters.length,
        activeTesters: localTesters.filter(t => new Date(t.date) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)).length,
        totalFeedback: localFeedback.length,
        totalDownloads: Math.floor(localTesters.length * 1.5), // Simulated
        latestVersion: 'v0.1.0-beta'
      })
    } catch (error) {
      console.error('Failed to load dashboard data:', error)
    } finally {
      setLoading(false)
    }
  }

  const getFeedbackTypeIcon = (type) => {
    switch (type) {
      case 'bug': return <Bug className="w-4 h-4 text-red-400" />
      case 'feature': return <Star className="w-4 h-4 text-yellow-400" />
      case 'general': return <MessageSquare className="w-4 h-4 text-blue-400" />
      default: return <MessageSquare className="w-4 h-4 text-gray-400" />
    }
  }

  const getFeedbackTypeLabel = (type) => {
    switch (type) {
      case 'bug': return 'Bug Report'
      case 'feature': return 'Feature Request'
      case 'general': return 'General Feedback'
      default: return 'Unknown'
    }
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Beta Testing Dashboard</h1>
          <p className="text-gray-400">Manage your beta testing program and monitor feedback</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="glass p-6 rounded-2xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Total Testers</p>
                <p className="text-3xl font-bold text-white">{stats.totalTesters}</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <Users className="w-6 h-6" />
              </div>
            </div>
          </div>

          <div className="glass p-6 rounded-2xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Active Testers</p>
                <p className="text-3xl font-bold text-white">{stats.activeTesters}</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center">
                <TrendingUp className="w-6 h-6" />
              </div>
            </div>
          </div>

          <div className="glass p-6 rounded-2xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Total Feedback</p>
                <p className="text-3xl font-bold text-white">{stats.totalFeedback}</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-full flex items-center justify-center">
                <MessageSquare className="w-6 h-6" />
              </div>
            </div>
          </div>

          <div className="glass p-6 rounded-2xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Total Downloads</p>
                <p className="text-3xl font-bold text-white">{stats.totalDownloads}</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center">
                <Download className="w-6 h-6" />
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-8">
          <div className="border-b border-gray-700">
            <nav className="-mb-px flex space-x-8">
              {[
                { id: 'overview', name: 'Overview', icon: <TrendingUp className="w-4 h-4" /> },
                { id: 'testers', name: 'Beta Testers', icon: <Users className="w-4 h-4" /> },
                { id: 'feedback', name: 'Feedback', icon: <MessageSquare className="w-4 h-4" /> }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setSelectedTab(tab.id)}
                  className={`flex items-center space-x-2 py-2 px-1 border-b-2 font-medium text-sm ${
                    selectedTab === tab.id
                      ? 'border-blue-500 text-blue-400'
                      : 'border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-300'
                  }`}
                >
                  {tab.icon}
                  <span>{tab.name}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        {selectedTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Recent Activity */}
            <div className="glass p-6 rounded-2xl">
              <h3 className="text-xl font-bold text-white mb-4">Recent Activity</h3>
              <div className="space-y-4">
                {testers.slice(-5).map((tester, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                      <Users className="w-4 h-4" />
                    </div>
                    <div className="flex-1">
                      <p className="text-white text-sm">{tester.email}</p>
                      <p className="text-gray-400 text-xs">Joined beta for {tester.platform}</p>
                    </div>
                    <span className="text-gray-500 text-xs">{formatDate(tester.date)}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Feedback Summary */}
            <div className="glass p-6 rounded-2xl">
              <h3 className="text-xl font-bold text-white mb-4">Feedback Summary</h3>
              <div className="space-y-4">
                {feedback.slice(-5).map((item, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    {getFeedbackTypeIcon(item.type)}
                    <div className="flex-1">
                      <p className="text-white text-sm">{item.message.substring(0, 100)}...</p>
                      <p className="text-gray-400 text-xs">{formatDate(item.date)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {selectedTab === 'testers' && (
          <div className="glass p-6 rounded-2xl">
            <h3 className="text-xl font-bold text-white mb-6">Beta Testers</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-700">
                    <th className="text-left py-3 px-4 text-gray-400 font-medium">Email</th>
                    <th className="text-left py-3 px-4 text-gray-400 font-medium">Platform</th>
                    <th className="text-left py-3 px-4 text-gray-400 font-medium">Joined</th>
                    <th className="text-left py-3 px-4 text-gray-400 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {testers.map((tester, index) => (
                    <tr key={index} className="border-b border-gray-800">
                      <td className="py-3 px-4 text-white">{tester.email}</td>
                      <td className="py-3 px-4 text-gray-300 capitalize">{tester.platform}</td>
                      <td className="py-3 px-4 text-gray-300">{formatDate(tester.date)}</td>
                      <td className="py-3 px-4">
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-900 text-green-300">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Active
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {selectedTab === 'feedback' && (
          <div className="glass p-6 rounded-2xl">
            <h3 className="text-xl font-bold text-white mb-6">Feedback</h3>
            <div className="space-y-4">
              {feedback.map((item, index) => (
                <div key={index} className="border border-gray-700 rounded-lg p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      {getFeedbackTypeIcon(item.type)}
                      <span className="text-sm font-medium text-gray-300">
                        {getFeedbackTypeLabel(item.type)}
                      </span>
                    </div>
                    <span className="text-xs text-gray-500">{formatDate(item.date)}</span>
                  </div>
                  <p className="text-white">{item.message}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default BetaDashboard 