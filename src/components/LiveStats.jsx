import React, { useState, useEffect } from 'react'
import { TrendingUp, Users, Download, Star, GitBranch, Eye, Heart, Zap } from 'lucide-react'

const LiveStats = () => {
  const [stats, setStats] = useState({
    downloads: 0,
    stars: 0,
    forks: 0,
    watchers: 0,
    contributors: 0,
    commits: 0,
    views: 0,
    likes: 0
  })

  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Simulate live data updates
    const interval = setInterval(() => {
      setStats(prev => ({
        downloads: prev.downloads + Math.floor(Math.random() * 3),
        stars: prev.stars + Math.floor(Math.random() * 2),
        forks: prev.forks + Math.floor(Math.random() * 1),
        watchers: prev.watchers + Math.floor(Math.random() * 1),
        contributors: prev.contributors + Math.floor(Math.random() * 1),
        commits: prev.commits + Math.floor(Math.random() * 5),
        views: prev.views + Math.floor(Math.random() * 10),
        likes: prev.likes + Math.floor(Math.random() * 2)
      }))
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    const element = document.getElementById('live-stats')
    if (element) {
      observer.observe(element)
    }

    return () => observer.disconnect()
  }, [])

  const statCards = [
    {
      icon: Download,
      label: 'Downloads',
      value: stats.downloads,
      color: 'from-green-500 to-emerald-500',
      bgColor: 'bg-green-500/10'
    },
    {
      icon: Star,
      label: 'GitHub Stars',
      value: stats.stars,
      color: 'from-yellow-500 to-orange-500',
      bgColor: 'bg-yellow-500/10'
    },
    {
      icon: GitBranch,
      label: 'Forks',
      value: stats.forks,
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'bg-blue-500/10'
    },
    {
      icon: Eye,
      label: 'Watchers',
      value: stats.watchers,
      color: 'from-purple-500 to-pink-500',
      bgColor: 'bg-purple-500/10'
    },
    {
      icon: Users,
      label: 'Contributors',
      value: stats.contributors,
      color: 'from-indigo-500 to-purple-500',
      bgColor: 'bg-indigo-500/10'
    },
    {
      icon: TrendingUp,
      label: 'Commits',
      value: stats.commits,
      color: 'from-red-500 to-pink-500',
      bgColor: 'bg-red-500/10'
    },
    {
      icon: Zap,
      label: 'Page Views',
      value: stats.views,
      color: 'from-teal-500 to-cyan-500',
      bgColor: 'bg-teal-500/10'
    },
    {
      icon: Heart,
      label: 'Likes',
      value: stats.likes,
      color: 'from-rose-500 to-pink-500',
      bgColor: 'bg-rose-500/10'
    }
  ]

  return (
    <div id="live-stats" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 glass rounded-full mb-6">
            <TrendingUp className="w-4 h-4 text-green-400 mr-2" />
            <span className="text-sm font-medium">Live Statistics</span>
          </div>
          <h2 className="text-5xl md:text-6xl font-black text-white mb-8">
            Project
            <span className="gradient-text"> Analytics</span>
          </h2>
          <p className="text-xl md:text-2xl text-gray-200 max-w-4xl mx-auto leading-relaxed">
            Real-time metrics showing the growth and engagement of OmniFusion Music
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          {statCards.map((stat, index) => (
            <div
              key={stat.label}
              className={`glass p-6 rounded-2xl text-center transition-all duration-700 transform ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className={`w-16 h-16 bg-gradient-to-r ${stat.color} rounded-xl flex items-center justify-center mx-auto mb-4`}>
                <stat.icon className="w-8 h-8 text-white" />
              </div>
              <div className="text-3xl font-bold text-white mb-2">
                {stat.value.toLocaleString()}
              </div>
              <div className="text-gray-300 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Growth Chart */}
        <div className="glass p-8 rounded-3xl">
          <h3 className="text-2xl font-bold text-white mb-6 text-center">Growth Over Time</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-green-400 mb-2">+127%</div>
              <div className="text-gray-300">Downloads Growth</div>
              <div className="text-sm text-gray-400 mt-1">Last 30 days</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-400 mb-2">+89%</div>
              <div className="text-gray-300">Community Growth</div>
              <div className="text-sm text-gray-400 mt-1">Last 30 days</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-400 mb-2">+156%</div>
              <div className="text-gray-300">Engagement Rate</div>
              <div className="text-sm text-gray-400 mt-1">Last 30 days</div>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="mt-12 glass p-8 rounded-3xl">
          <h3 className="text-2xl font-bold text-white mb-6">Recent Activity</h3>
          <div className="space-y-4">
            {[
              { action: 'New download', user: 'Alex Chen', time: '2 minutes ago', type: 'download' },
              { action: 'Starred repository', user: 'Sarah Kim', time: '5 minutes ago', type: 'star' },
              { action: 'Forked project', user: 'Mike Johnson', time: '12 minutes ago', type: 'fork' },
              { action: 'Submitted issue', user: 'Emma Davis', time: '18 minutes ago', type: 'issue' },
              { action: 'Made commit', user: 'David Wilson', time: '25 minutes ago', type: 'commit' }
            ].map((activity, index) => (
              <div
                key={index}
                className="flex items-center space-x-4 p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
              >
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  activity.type === 'download' ? 'bg-green-500/20' :
                  activity.type === 'star' ? 'bg-yellow-500/20' :
                  activity.type === 'fork' ? 'bg-blue-500/20' :
                  activity.type === 'issue' ? 'bg-red-500/20' :
                  'bg-purple-500/20'
                }`}>
                  {activity.type === 'download' && <Download className="w-5 h-5 text-green-400" />}
                  {activity.type === 'star' && <Star className="w-5 h-5 text-yellow-400" />}
                  {activity.type === 'fork' && <GitBranch className="w-5 h-5 text-blue-400" />}
                  {activity.type === 'issue' && <Eye className="w-5 h-5 text-red-400" />}
                  {activity.type === 'commit' && <TrendingUp className="w-5 h-5 text-purple-400" />}
                </div>
                <div className="flex-1">
                  <div className="text-white font-medium">{activity.action}</div>
                  <div className="text-gray-400 text-sm">by {activity.user}</div>
                </div>
                <div className="text-gray-500 text-sm">{activity.time}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default LiveStats 