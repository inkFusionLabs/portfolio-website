import React, { useState, useEffect } from 'react'
import { Download, Mail, Users, Star, Bug, MessageSquare, CheckCircle, AlertCircle, Zap } from 'lucide-react'

const BetaTesting = () => {
  const [email, setEmail] = useState('')
  const [platform, setPlatform] = useState('')
  const [isSubscribed, setIsSubscribed] = useState(false)
  const [feedback, setFeedback] = useState('')
  const [feedbackType, setFeedbackType] = useState('bug')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [betaStats, setBetaStats] = useState({
    testers: 0,
    downloads: 0,
    feedbackCount: 0,
    latestVersion: 'v0.1.0-beta'
  })

  const platforms = [
    { id: 'windows', name: 'Windows', icon: '🪟', color: 'from-blue-500 to-cyan-500' },
    { id: 'macos', name: 'macOS', icon: '🍎', color: 'from-gray-500 to-gray-700' },
    { id: 'linux', name: 'Linux', icon: '🐧', color: 'from-orange-500 to-red-500' }
  ]

  const feedbackTypes = [
    { id: 'bug', name: 'Bug Report', icon: <Bug className="w-4 h-4" /> },
    { id: 'feature', name: 'Feature Request', icon: <Star className="w-4 h-4" /> },
    { id: 'general', name: 'General Feedback', icon: <MessageSquare className="w-4 h-4" /> }
  ]

  const handleBetaSignup = async (e) => {
    e.preventDefault()
    if (!email || !platform) return

    setIsSubmitting(true)
    try {
      // Simulate API call - replace with actual endpoint
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Store in localStorage for demo
      const betaUsers = JSON.parse(localStorage.getItem('betaUsers') || '[]')
      betaUsers.push({ email, platform, date: new Date().toISOString() })
      localStorage.setItem('betaUsers', JSON.stringify(betaUsers))
      
      setIsSubscribed(true)
      setBetaStats(prev => ({ ...prev, testers: prev.testers + 1 }))
    } catch (error) {
      console.error('Beta signup failed:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleFeedbackSubmit = async (e) => {
    e.preventDefault()
    if (!feedback.trim()) return

    setIsSubmitting(true)
    try {
      // Simulate API call - replace with actual endpoint
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Store in localStorage for demo
      const feedbacks = JSON.parse(localStorage.getItem('betaFeedback') || '[]')
      feedbacks.push({ 
        type: feedbackType, 
        message: feedback, 
        date: new Date().toISOString() 
      })
      localStorage.setItem('betaFeedback', JSON.stringify(feedbacks))
      
      setFeedback('')
      setBetaStats(prev => ({ ...prev, feedbackCount: prev.feedbackCount + 1 }))
    } catch (error) {
      console.error('Feedback submission failed:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const getDownloadUrl = (platform) => {
    // Replace with actual beta download URLs
    const baseUrl = 'https://github.com/your-username/omnifusion-music/releases/download'
    return `${baseUrl}/beta/OmniFusion-Music-${platform}-beta.zip`
  }

  useEffect(() => {
    // Load stats from localStorage for demo
    const betaUsers = JSON.parse(localStorage.getItem('betaUsers') || '[]')
    const feedbacks = JSON.parse(localStorage.getItem('betaFeedback') || '[]')
    setBetaStats(prev => ({
      ...prev,
      testers: betaUsers.length,
      feedbackCount: feedbacks.length
    }))
  }, [])

  return (
    <section id="beta-testing" className="py-20 bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 glass rounded-full mb-6">
            <Zap className="w-4 h-4 text-yellow-400 mr-2" />
            <span className="text-sm font-medium">Beta Testing Program</span>
          </div>
          <h2 className="text-5xl md:text-6xl font-black text-white mb-8">
            Join the
            <span className="gradient-text"> Beta</span>
          </h2>
          <p className="text-xl md:text-2xl text-gray-200 max-w-4xl mx-auto leading-relaxed">
            Be among the first to experience OmniFusion Music. Help shape the future of universal music streaming.
          </p>
        </div>

        {/* Beta Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-4">
              <Users className="w-6 h-6" />
            </div>
            <div className="text-2xl font-bold text-white">{betaStats.testers}</div>
            <div className="text-gray-400">Beta Testers</div>
          </div>
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full mb-4">
              <Download className="w-6 h-6" />
            </div>
            <div className="text-2xl font-bold text-white">{betaStats.downloads}</div>
            <div className="text-gray-400">Downloads</div>
          </div>
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-full mb-4">
              <MessageSquare className="w-6 h-6" />
            </div>
            <div className="text-2xl font-bold text-white">{betaStats.feedbackCount}</div>
            <div className="text-gray-400">Feedback</div>
          </div>
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full mb-4">
              <Star className="w-6 h-6" />
            </div>
            <div className="text-2xl font-bold text-white">{betaStats.latestVersion}</div>
            <div className="text-gray-400">Latest Version</div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Beta Signup */}
          <div className="glass p-8 rounded-3xl">
            <h3 className="text-3xl font-bold text-white mb-6">Join Beta Testing</h3>
            
            {!isSubscribed ? (
              <form onSubmit={handleBetaSignup} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="your@email.com"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Preferred Platform
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {platforms.map((p) => (
                      <button
                        key={p.id}
                        type="button"
                        onClick={() => setPlatform(p.id)}
                        className={`p-4 rounded-lg border-2 transition-all ${
                          platform === p.id
                            ? 'border-blue-500 bg-blue-500/20'
                            : 'border-gray-600 bg-gray-800 hover:border-gray-500'
                        }`}
                      >
                        <div className="text-2xl mb-2">{p.icon}</div>
                        <div className="text-sm font-medium text-white">{p.name}</div>
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting || !email || !platform}
                  className="w-full btn-primary flex items-center justify-center space-x-2 py-4 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      <span>Joining...</span>
                    </>
                  ) : (
                    <>
                      <Mail className="w-5 h-5" />
                      <span>Join Beta Program</span>
                    </>
                  )}
                </button>
              </form>
            ) : (
              <div className="text-center">
                <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
                <h4 className="text-xl font-bold text-white mb-2">Welcome to Beta!</h4>
                <p className="text-gray-300 mb-6">
                  You'll receive download links and updates via email.
                </p>
                <a
                  href={getDownloadUrl(platform)}
                  className="btn-primary flex items-center justify-center space-x-2 px-8 py-4 mx-auto w-fit"
                >
                  <Download className="w-5 h-5" />
                  <span>Download Beta</span>
                </a>
              </div>
            )}
          </div>

          {/* Feedback Form */}
          <div className="glass p-8 rounded-3xl">
            <h3 className="text-3xl font-bold text-white mb-6">Send Feedback</h3>
            
            <form onSubmit={handleFeedbackSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Feedback Type
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {feedbackTypes.map((type) => (
                    <button
                      key={type.id}
                      type="button"
                      onClick={() => setFeedbackType(type.id)}
                      className={`p-3 rounded-lg border-2 transition-all flex items-center space-x-2 ${
                        feedbackType === type.id
                          ? 'border-blue-500 bg-blue-500/20'
                          : 'border-gray-600 bg-gray-800 hover:border-gray-500'
                      }`}
                    >
                      {type.icon}
                      <span className="text-sm font-medium text-white">{type.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Your Feedback
                </label>
                <textarea
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  rows={4}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Tell us about your experience, bugs you found, or features you'd like to see..."
                  required
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting || !feedback.trim()}
                className="w-full btn-secondary flex items-center justify-center space-x-2 py-4 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <MessageSquare className="w-5 h-5" />
                    <span>Send Feedback</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Beta Benefits */}
        <div className="mt-16">
          <h3 className="text-3xl font-bold text-white text-center mb-12">Beta Tester Benefits</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="glass p-6 rounded-2xl text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="w-6 h-6" />
              </div>
              <h4 className="text-xl font-bold text-white mb-2">Early Access</h4>
              <p className="text-gray-300">
                Be the first to try new features and improvements before they're released to the public.
              </p>
            </div>
            <div className="glass p-6 rounded-2xl text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageSquare className="w-6 h-6" />
              </div>
              <h4 className="text-xl font-bold text-white mb-2">Direct Feedback</h4>
              <p className="text-gray-300">
                Your feedback directly influences the development roadmap and feature priorities.
              </p>
            </div>
            <div className="glass p-6 rounded-2xl text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-6 h-6" />
              </div>
              <h4 className="text-xl font-bold text-white mb-2">Exclusive Updates</h4>
              <p className="text-gray-300">
                Get exclusive insights into upcoming features and development progress.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default BetaTesting 