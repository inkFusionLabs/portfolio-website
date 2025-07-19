import React, { useState } from 'react'
import { Users, MessageCircle, Bug, GitBranch, Heart, ThumbsUp, Star, Download, Globe, Mail, Github } from 'lucide-react'

const CommunityFeatures = () => {
  const [activeTab, setActiveTab] = useState('forum')
  const [bugReport, setBugReport] = useState({
    title: '',
    description: '',
    severity: 'medium',
    platform: 'windows'
  })

  const forumTopics = [
    {
      id: 1,
      title: "Best practices for playlist organization",
      author: "MusicLover42",
      replies: 23,
      views: 156,
      lastActivity: "2 hours ago",
      category: "Tips & Tricks",
      isPinned: true
    },
    {
      id: 2,
      title: "Feature request: Advanced search filters",
      author: "DJ_Mike",
      replies: 45,
      views: 234,
      lastActivity: "1 day ago",
      category: "Feature Requests",
      isPinned: false
    },
    {
      id: 3,
      title: "How to sync playlists between services",
      author: "NewUser123",
      replies: 12,
      views: 89,
      lastActivity: "3 days ago",
      category: "Help & Support",
      isPinned: false
    },
    {
      id: 4,
      title: "Custom theme showcase",
      author: "DesignerPro",
      replies: 67,
      views: 445,
      lastActivity: "5 days ago",
      category: "Community",
      isPinned: true
    }
  ]

  const featureRequests = [
    {
      id: 1,
      title: "Voice control for playback",
      description: "Add voice commands to control music playback hands-free",
      votes: 234,
      status: "planned",
      author: "TechEnthusiast",
      comments: 45
    },
    {
      id: 2,
      title: "Collaborative playlists",
      description: "Allow multiple users to edit the same playlist in real-time",
      votes: 189,
      status: "in-progress",
      author: "SocialMusic",
      comments: 32
    },
    {
      id: 3,
      title: "Advanced analytics dashboard",
      description: "Detailed insights into listening habits and music preferences",
      votes: 156,
      status: "planned",
      author: "DataLover",
      comments: 28
    },
    {
      id: 4,
      title: "Podcast integration",
      description: "Manage and listen to podcasts alongside music",
      votes: 98,
      status: "under-review",
      author: "PodcastFan",
      comments: 15
    }
  ]

  const contributionAreas = [
    {
      title: "Frontend Development",
      description: "Help improve the user interface and user experience",
      skills: ["React", "TypeScript", "Tailwind CSS"],
      difficulty: "Intermediate",
      icon: <Globe className="w-6 h-6" />
    },
    {
      title: "Backend Development",
      description: "Work on the server-side logic and API development",
      skills: ["Node.js", "Python", "Database Design"],
      difficulty: "Advanced",
      icon: <GitBranch className="w-6 h-6" />
    },
    {
      title: "Mobile Development",
      description: "Help build iOS and Android mobile applications",
      skills: ["React Native", "Swift", "Kotlin"],
      difficulty: "Advanced",
      icon: <Download className="w-6 h-6" />
    },
    {
      title: "UI/UX Design",
      description: "Create beautiful and intuitive user interfaces",
      skills: ["Figma", "Adobe XD", "User Research"],
      difficulty: "Intermediate",
      icon: <Star className="w-6 h-6" />
    },
    {
      title: "Documentation",
      description: "Write and improve documentation for users and developers",
      skills: ["Technical Writing", "Markdown", "API Documentation"],
      difficulty: "Beginner",
      icon: <MessageCircle className="w-6 h-6" />
    },
    {
      title: "Testing & QA",
      description: "Help ensure the app works perfectly across all platforms",
      skills: ["Jest", "Cypress", "Manual Testing"],
      difficulty: "Beginner",
      icon: <Bug className="w-6 h-6" />
    }
  ]

  const handleBugReport = (e) => {
    e.preventDefault()
    // Here you would typically send the bug report to your backend
    console.log('Bug report submitted:', bugReport)
    setBugReport({
      title: '',
      description: '',
      severity: 'medium',
      platform: 'windows'
    })
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'planned':
        return 'text-blue-400'
      case 'in-progress':
        return 'text-yellow-400'
      case 'completed':
        return 'text-green-400'
      case 'under-review':
        return 'text-purple-400'
      default:
        return 'text-gray-400'
    }
  }

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'beginner':
        return 'text-green-400'
      case 'intermediate':
        return 'text-yellow-400'
      case 'advanced':
        return 'text-red-400'
      default:
        return 'text-gray-400'
    }
  }

  return (
    <section id="community" className="py-20 bg-gray-900 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl floating-element"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl floating-element-delayed"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 fade-in">
          <div className="inline-flex items-center px-4 py-2 glass rounded-full mb-6">
            <Users className="w-4 h-4 text-green-400 mr-2" />
            <span className="text-sm font-medium">Community</span>
          </div>
          <h2 className="text-5xl md:text-6xl font-black text-white mb-8">
            Join Our
            <span className="gradient-text"> Community</span>
          </h2>
          <p className="text-xl md:text-2xl text-gray-200 max-w-4xl mx-auto leading-relaxed">
            Connect with other music lovers, share ideas, and help shape the future of OmniFusion Music
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <button
            onClick={() => setActiveTab('forum')}
            className={`flex items-center space-x-2 px-6 py-3 rounded-full transition-all duration-300 ${
              activeTab === 'forum' ? 'btn-primary' : 'btn-secondary'
            }`}
          >
            <MessageCircle className="w-4 h-4" />
            <span>Community Forum</span>
          </button>
          <button
            onClick={() => setActiveTab('features')}
            className={`flex items-center space-x-2 px-6 py-3 rounded-full transition-all duration-300 ${
              activeTab === 'features' ? 'btn-primary' : 'btn-secondary'
            }`}
          >
            <ThumbsUp className="w-4 h-4" />
            <span>Feature Requests</span>
          </button>
          <button
            onClick={() => setActiveTab('bugs')}
            className={`flex items-center space-x-2 px-6 py-3 rounded-full transition-all duration-300 ${
              activeTab === 'bugs' ? 'btn-primary' : 'btn-secondary'
            }`}
          >
            <Bug className="w-4 h-4" />
            <span>Bug Reports</span>
          </button>
          <button
            onClick={() => setActiveTab('contribute')}
            className={`flex items-center space-x-2 px-6 py-3 rounded-full transition-all duration-300 ${
              activeTab === 'contribute' ? 'btn-primary' : 'btn-secondary'
            }`}
          >
            <GitBranch className="w-4 h-4" />
            <span>Contribute</span>
          </button>
        </div>

        {/* Content Sections */}
        {activeTab === 'forum' && (
          <div className="fade-in">
            <div className="glass p-8 rounded-3xl mb-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-white">Community Forum</h3>
                <div className="flex space-x-4">
                  <button className="btn-secondary px-4 py-2 rounded-full flex items-center space-x-2">
                                    <MessageCircle className="w-4 h-4" />
                <span>Join Discord</span>
                  </button>
                  <button className="btn-primary px-4 py-2 rounded-full">
                    New Topic
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                {forumTopics.map((topic) => (
                  <div key={topic.id} className="glass p-6 rounded-2xl hover:bg-white/5 transition-colors">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          {topic.isPinned && (
                            <span className="px-2 py-1 bg-yellow-500/20 text-yellow-400 text-xs rounded-full">
                              Pinned
                            </span>
                          )}
                          <span className="px-2 py-1 bg-blue-500/20 text-blue-400 text-xs rounded-full">
                            {topic.category}
                          </span>
                        </div>
                        <h4 className="text-lg font-semibold text-white mb-2">{topic.title}</h4>
                        <div className="flex items-center space-x-4 text-sm text-gray-400">
                          <span>by {topic.author}</span>
                          <span>{topic.replies} replies</span>
                          <span>{topic.views} views</span>
                          <span>{topic.lastActivity}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'features' && (
          <div className="fade-in">
            <div className="glass p-8 rounded-3xl mb-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-white">Feature Requests</h3>
                <button className="btn-primary px-4 py-2 rounded-full">
                  Submit Request
                </button>
              </div>

              <div className="space-y-6">
                {featureRequests.map((request) => (
                  <div key={request.id} className="glass p-6 rounded-2xl">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h4 className="text-lg font-semibold text-white">{request.title}</h4>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(request.status)}`}>
                            {request.status.replace('-', ' ')}
                          </span>
                        </div>
                        <p className="text-gray-300 mb-3">{request.description}</p>
                        <div className="flex items-center space-x-4 text-sm text-gray-400">
                          <span>by {request.author}</span>
                          <span>{request.comments} comments</span>
                        </div>
                      </div>
                      <div className="flex flex-col items-center space-y-2">
                        <button className="flex items-center space-x-2 px-4 py-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors">
                          <ThumbsUp className="w-4 h-4" />
                          <span>{request.votes}</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'bugs' && (
          <div className="fade-in">
            <div className="glass p-8 rounded-3xl">
              <h3 className="text-2xl font-bold text-white mb-6">Report a Bug</h3>
              
              <form onSubmit={handleBugReport} className="space-y-6">
                <div>
                  <label className="block text-white font-medium mb-2">Bug Title</label>
                  <input
                    type="text"
                    value={bugReport.title}
                    onChange={(e) => setBugReport({...bugReport, title: e.target.value})}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Brief description of the issue"
                    required
                  />
                </div>

                <div>
                  <label className="block text-white font-medium mb-2">Detailed Description</label>
                  <textarea
                    value={bugReport.description}
                    onChange={(e) => setBugReport({...bugReport, description: e.target.value})}
                    rows={6}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Please describe the issue in detail, including steps to reproduce..."
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-white font-medium mb-2">Severity</label>
                    <select
                      value={bugReport.severity}
                      onChange={(e) => setBugReport({...bugReport, severity: e.target.value})}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="low">Low - Minor issue</option>
                      <option value="medium">Medium - Moderate issue</option>
                      <option value="high">High - Major issue</option>
                      <option value="critical">Critical - App breaking</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-white font-medium mb-2">Platform</label>
                    <select
                      value={bugReport.platform}
                      onChange={(e) => setBugReport({...bugReport, platform: e.target.value})}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="windows">Windows</option>
                      <option value="macos">macOS</option>
                      <option value="linux">Linux</option>
                      <option value="web">Web Browser</option>
                    </select>
                  </div>
                </div>

                <button type="submit" className="btn-primary px-8 py-4 rounded-full">
                  Submit Bug Report
                </button>
              </form>
            </div>
          </div>
        )}

        {activeTab === 'contribute' && (
          <div className="fade-in">
            <div className="glass p-8 rounded-3xl mb-8">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-white mb-4">Contribute to OmniFusion Music</h3>
                <p className="text-gray-200">
                  Help us build the future of music management. Choose an area that matches your skills and interests.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {contributionAreas.map((area, index) => (
                  <div key={index} className="glass p-6 rounded-2xl hover:scale-105 transition-all duration-300">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-white">
                        {area.icon}
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold text-white">{area.title}</h4>
                        <span className={`text-sm font-medium ${getDifficultyColor(area.difficulty.toLowerCase())}`}>
                          {area.difficulty}
                        </span>
                      </div>
                    </div>
                    
                    <p className="text-gray-300 mb-4">{area.description}</p>
                    
                    <div className="mb-4">
                      <h5 className="text-sm font-medium text-white mb-2">Skills Needed:</h5>
                      <div className="flex flex-wrap gap-2">
                        {area.skills.map((skill, skillIndex) => (
                          <span key={skillIndex} className="px-2 py-1 bg-white/10 rounded-full text-xs text-gray-300">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    <button className="w-full btn-secondary py-2 rounded-full">
                      Get Started
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="glass p-8 rounded-3xl text-center">
              <h3 className="text-2xl font-bold text-white mb-4">Ready to Contribute?</h3>
              <p className="text-gray-200 mb-6">
                Join our open-source community and help make OmniFusion Music even better
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <button className="btn-primary px-6 py-3 rounded-full flex items-center space-x-2">
                  <Github className="w-5 h-5" />
                  <span>View on GitHub</span>
                </button>
                <button className="btn-secondary px-6 py-3 rounded-full flex items-center space-x-2">
                  <Mail className="w-5 h-5" />
                  <span>Contact Us</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

export default CommunityFeatures 