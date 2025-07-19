import React, { useState, useEffect } from 'react'
import { Music, Heart, Share2, MessageCircle, Star, Trophy, Award, CheckCircle, XCircle, ArrowRight, RefreshCw } from 'lucide-react'

const InteractiveElements = () => {
  const [currentQuiz, setCurrentQuiz] = useState(0)
  const [quizAnswers, setQuizAnswers] = useState({})
  const [quizCompleted, setQuizCompleted] = useState(false)
  const [quizScore, setQuizScore] = useState(0)
  const [activeTab, setActiveTab] = useState('quiz')
  const [feedback, setFeedback] = useState({
    rating: 0,
    category: '',
    message: ''
  })
  const [showFeedback, setShowFeedback] = useState(false)

  const quizQuestions = [
    {
      question: "Which streaming service has the largest music library?",
      options: [
        "Spotify",
        "Apple Music", 
        "YouTube Music",
        "Tidal"
      ],
      correct: 1,
      explanation: "Apple Music boasts over 100 million songs, making it the largest music library among major streaming services."
    },
    {
      question: "What feature is unique to OmniFusion Music?",
      options: [
        "Universal search across all platforms",
        "Offline listening",
        "Playlist creation",
        "Music recommendations"
      ],
      correct: 0,
      explanation: "OmniFusion Music is the only app that allows you to search across all your connected streaming services simultaneously."
    },
    {
      question: "Which platform offers the highest audio quality?",
      options: [
        "Spotify",
        "Apple Music",
        "Tidal",
        "YouTube Music"
      ],
      correct: 2,
      explanation: "Tidal offers HiFi and Master quality audio, providing the highest audio quality among streaming services."
    },
    {
      question: "How many streaming services can OmniFusion Music connect to?",
      options: [
        "3 services",
        "5 services", 
        "6+ services",
        "Unlimited services"
      ],
      correct: 2,
      explanation: "OmniFusion Music supports 6+ major streaming services including Spotify, Apple Music, YouTube Music, Tidal, Deezer, and Amazon Music."
    },
    {
      question: "What's the main benefit of cross-platform playlist sync?",
      options: [
        "Faster loading times",
        "Unified music organization",
        "Better audio quality",
        "More storage space"
      ],
      correct: 1,
      explanation: "Cross-platform playlist sync allows you to organize your music consistently across all your streaming services."
    }
  ]

  const featureVotes = [
    {
      id: 1,
      title: "Voice Control",
      description: "Control playback with voice commands",
      votes: 234,
      status: "planned",
      category: "Accessibility"
    },
    {
      id: 2,
      title: "AI Music Recommendations",
      description: "Smart suggestions based on your taste",
      votes: 189,
      status: "in-progress",
      category: "AI/ML"
    },
    {
      id: 3,
      title: "Collaborative Playlists",
      description: "Create playlists with friends in real-time",
      votes: 156,
      status: "planned",
      category: "Social"
    },
    {
      id: 4,
      title: "Podcast Integration",
      description: "Manage podcasts alongside music",
      votes: 98,
      status: "under-review",
      category: "Content"
    },
    {
      id: 5,
      title: "Advanced Analytics",
      description: "Detailed listening insights and trends",
      votes: 145,
      status: "planned",
      category: "Analytics"
    },
    {
      id: 6,
      title: "Custom Themes",
      description: "Personalize the app appearance",
      votes: 123,
      status: "completed",
      category: "UI/UX"
    }
  ]

  const handleQuizAnswer = (answerIndex) => {
    setQuizAnswers({
      ...quizAnswers,
      [currentQuiz]: answerIndex
    })
  }

  const nextQuizQuestion = () => {
    if (currentQuiz < quizQuestions.length - 1) {
      setCurrentQuiz(currentQuiz + 1)
    } else {
      calculateQuizScore()
      setQuizCompleted(true)
    }
  }

  const calculateQuizScore = () => {
    let score = 0
    Object.keys(quizAnswers).forEach(questionIndex => {
      if (quizAnswers[questionIndex] === quizQuestions[questionIndex].correct) {
        score++
      }
    })
    setQuizScore(score)
  }

  const resetQuiz = () => {
    setCurrentQuiz(0)
    setQuizAnswers({})
    setQuizCompleted(false)
    setQuizScore(0)
  }

  const handleVote = (featureId) => {
    // Here you would typically send the vote to your backend
    console.log('Vote for feature:', featureId)
  }

  const handleFeedbackSubmit = (e) => {
    e.preventDefault()
    // Here you would typically send the feedback to your backend
    console.log('Feedback submitted:', feedback)
    setFeedback({ rating: 0, category: '', message: '' })
    setShowFeedback(false)
  }

  const shareOptions = [
    {
      platform: "Twitter",
      icon: "🐦",
      color: "from-blue-400 to-blue-600",
      url: "https://twitter.com/intent/tweet?text=Check%20out%20OmniFusion%20Music%20-%20the%20ultimate%20music%20management%20app!"
    },
    {
      platform: "Facebook",
      icon: "📘",
      color: "from-blue-600 to-blue-800",
      url: "https://www.facebook.com/sharer/sharer.php?u=https://omnifusionmusic.com"
    },
    {
      platform: "LinkedIn",
      icon: "💼",
      color: "from-blue-700 to-blue-900",
      url: "https://www.linkedin.com/sharing/share-offsite/?url=https://omnifusionmusic.com"
    },
    {
      platform: "Reddit",
      icon: "🤖",
      color: "from-orange-500 to-red-500",
      url: "https://reddit.com/submit?url=https://omnifusionmusic.com&title=OmniFusion%20Music%20-%20Universal%20Music%20Management"
    }
  ]

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'text-green-400'
      case 'in-progress':
        return 'text-yellow-400'
      case 'planned':
        return 'text-blue-400'
      case 'under-review':
        return 'text-purple-400'
      default:
        return 'text-gray-400'
    }
  }

  const getScoreMessage = (score) => {
    if (score === quizQuestions.length) return "Perfect! You're a music streaming expert!"
    if (score >= quizQuestions.length * 0.8) return "Excellent! You know your music platforms well!"
    if (score >= quizQuestions.length * 0.6) return "Good job! You have solid knowledge of music streaming."
    return "Keep learning! There's always more to discover about music streaming."
  }

  return (
    <section id="interactive" className="py-20 bg-gray-900 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl floating-element"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl floating-element-delayed"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 fade-in">
          <div className="inline-flex items-center px-4 py-2 glass rounded-full mb-6">
            <Music className="w-4 h-4 text-green-400 mr-2" />
            <span className="text-sm font-medium">Interactive</span>
          </div>
          <h2 className="text-5xl md:text-6xl font-black text-white mb-8">
            Get
            <span className="gradient-text"> Involved</span>
          </h2>
          <p className="text-xl md:text-2xl text-gray-200 max-w-4xl mx-auto leading-relaxed">
            Test your knowledge, vote on features, share feedback, and help shape the future of OmniFusion Music
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <button
            onClick={() => setActiveTab('quiz')}
            className={`flex items-center space-x-2 px-6 py-3 rounded-full transition-all duration-300 ${
              activeTab === 'quiz' ? 'btn-primary' : 'btn-secondary'
            }`}
          >
            <Trophy className="w-4 h-4" />
            <span>Music Quiz</span>
          </button>
          <button
            onClick={() => setActiveTab('voting')}
            className={`flex items-center space-x-2 px-6 py-3 rounded-full transition-all duration-300 ${
              activeTab === 'voting' ? 'btn-primary' : 'btn-secondary'
            }`}
          >
            <Heart className="w-4 h-4" />
            <span>Feature Voting</span>
          </button>
          <button
            onClick={() => setActiveTab('feedback')}
            className={`flex items-center space-x-2 px-6 py-3 rounded-full transition-all duration-300 ${
              activeTab === 'feedback' ? 'btn-primary' : 'btn-secondary'
            }`}
          >
            <MessageCircle className="w-4 h-4" />
            <span>Feedback</span>
          </button>
          <button
            onClick={() => setActiveTab('share')}
            className={`flex items-center space-x-2 px-6 py-3 rounded-full transition-all duration-300 ${
              activeTab === 'share' ? 'btn-primary' : 'btn-secondary'
            }`}
          >
            <Share2 className="w-4 h-4" />
            <span>Share</span>
          </button>
        </div>

        {/* Content Sections */}
        {activeTab === 'quiz' && (
          <div className="fade-in">
            <div className="glass p-8 rounded-3xl max-w-4xl mx-auto">
              {!quizCompleted ? (
                <div>
                  <div className="text-center mb-8">
                    <h3 className="text-3xl font-bold text-white mb-4">Music Streaming Quiz</h3>
                    <p className="text-xl text-gray-200 mb-4">
                      Test your knowledge about music streaming services and OmniFusion Music
                    </p>
                    <div className="flex justify-center items-center space-x-4">
                      <span className="text-white">Question {currentQuiz + 1} of {quizQuestions.length}</span>
                      <div className="w-32 bg-white/10 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${((currentQuiz + 1) / quizQuestions.length) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>

                  <div className="mb-8">
                    <h4 className="text-2xl font-bold text-white mb-6">
                      {quizQuestions[currentQuiz].question}
                    </h4>
                    
                    <div className="space-y-4">
                      {quizQuestions[currentQuiz].options.map((option, index) => (
                        <button
                          key={index}
                          onClick={() => handleQuizAnswer(index)}
                          className={`w-full p-4 text-left rounded-2xl transition-all duration-300 ${
                            quizAnswers[currentQuiz] === index
                              ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
                              : 'glass hover:bg-white/10 text-gray-200'
                          }`}
                        >
                          <div className="flex items-center space-x-3">
                            <span className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center font-bold">
                              {String.fromCharCode(65 + index)}
                            </span>
                            <span className="text-lg">{option}</span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-between">
                    <button
                      onClick={resetQuiz}
                      className="btn-secondary px-6 py-3 rounded-full flex items-center space-x-2"
                    >
                      <RefreshCw className="w-4 h-4" />
                      <span>Reset</span>
                    </button>
                    
                    <button
                      onClick={nextQuizQuestion}
                      disabled={quizAnswers[currentQuiz] === undefined}
                      className={`px-6 py-3 rounded-full flex items-center space-x-2 ${
                        quizAnswers[currentQuiz] !== undefined
                          ? 'btn-primary'
                          : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                      }`}
                    >
                      <span>{currentQuiz === quizQuestions.length - 1 ? 'Finish' : 'Next'}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ) : (
                <div className="text-center">
                  <div className="mb-8">
                    <Trophy className="w-20 h-20 text-yellow-400 mx-auto mb-4" />
                    <h3 className="text-3xl font-bold text-white mb-4">Quiz Completed!</h3>
                    <div className="text-6xl font-bold text-white mb-4">
                      {quizScore}/{quizQuestions.length}
                    </div>
                    <p className="text-xl text-gray-200 mb-6">{getScoreMessage(quizScore)}</p>
                  </div>

                  <div className="space-y-4 mb-8">
                    {quizQuestions.map((question, index) => (
                      <div key={index} className="glass p-4 rounded-2xl">
                        <div className="flex items-center space-x-3 mb-2">
                          {quizAnswers[index] === question.correct ? (
                            <CheckCircle className="w-5 h-5 text-green-400" />
                          ) : (
                            <XCircle className="w-5 h-5 text-red-400" />
                          )}
                          <span className="text-white font-medium">Question {index + 1}</span>
                        </div>
                        <p className="text-gray-300 text-sm">{question.explanation}</p>
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={resetQuiz}
                    className="btn-primary px-8 py-4 rounded-full"
                  >
                    Take Quiz Again
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'voting' && (
          <div className="fade-in">
            <div className="glass p-8 rounded-3xl mb-8">
              <div className="text-center mb-8">
                <h3 className="text-3xl font-bold text-white mb-4">Feature Voting</h3>
                <p className="text-xl text-gray-200">
                  Vote on upcoming features and help us prioritize what to build next
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {featureVotes.map((feature) => (
                  <div key={feature.id} className="glass p-6 rounded-2xl hover:bg-white/5 transition-colors">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h4 className="text-lg font-semibold text-white">{feature.title}</h4>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(feature.status)}`}>
                            {feature.status.replace('-', ' ')}
                          </span>
                        </div>
                        <p className="text-gray-300 mb-3">{feature.description}</p>
                        <span className="px-2 py-1 bg-blue-500/20 text-blue-400 text-xs rounded-full">
                          {feature.category}
                        </span>
                      </div>
                      <div className="flex flex-col items-center space-y-2">
                        <button 
                          onClick={() => handleVote(feature.id)}
                          className="flex items-center space-x-2 px-4 py-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
                        >
                          <Heart className="w-4 h-4" />
                          <span>{feature.votes}</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'feedback' && (
          <div className="fade-in">
            <div className="glass p-8 rounded-3xl max-w-2xl mx-auto">
              <div className="text-center mb-8">
                <h3 className="text-3xl font-bold text-white mb-4">Share Your Feedback</h3>
                <p className="text-xl text-gray-200">
                  Help us improve OmniFusion Music by sharing your thoughts and suggestions
                </p>
              </div>

              <form onSubmit={handleFeedbackSubmit} className="space-y-6">
                <div>
                  <label className="block text-white font-medium mb-2">How would you rate OmniFusion Music?</label>
                  <div className="flex justify-center space-x-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setFeedback({...feedback, rating: star})}
                        className="text-3xl hover:scale-110 transition-transform"
                      >
                        <Star className={`w-8 h-8 ${star <= feedback.rating ? 'text-yellow-400 fill-current' : 'text-gray-400'}`} />
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-white font-medium mb-2">Feedback Category</label>
                  <select
                    value={feedback.category}
                    onChange={(e) => setFeedback({...feedback, category: e.target.value})}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="">Select a category</option>
                    <option value="bug">Bug Report</option>
                    <option value="feature">Feature Request</option>
                    <option value="ui">User Interface</option>
                    <option value="performance">Performance</option>
                    <option value="general">General Feedback</option>
                  </select>
                </div>

                <div>
                  <label className="block text-white font-medium mb-2">Your Message</label>
                  <textarea
                    value={feedback.message}
                    onChange={(e) => setFeedback({...feedback, message: e.target.value})}
                    rows={6}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Tell us what you think about OmniFusion Music..."
                    required
                  />
                </div>

                <button type="submit" className="w-full btn-primary py-4 rounded-full">
                  Submit Feedback
                </button>
              </form>
            </div>
          </div>
        )}

        {activeTab === 'share' && (
          <div className="fade-in">
            <div className="glass p-8 rounded-3xl max-w-4xl mx-auto">
              <div className="text-center mb-8">
                <h3 className="text-3xl font-bold text-white mb-4">Share OmniFusion Music</h3>
                <p className="text-xl text-gray-200">
                  Help spread the word about the ultimate music management app
                </p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                {shareOptions.map((option, index) => (
                  <a
                    key={index}
                    href={option.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`glass p-6 rounded-2xl text-center hover:scale-105 transition-all duration-300 bg-gradient-to-r ${option.color}`}
                  >
                    <div className="text-4xl mb-4">{option.icon}</div>
                    <div className="text-white font-semibold">{option.platform}</div>
                  </a>
                ))}
              </div>

              <div className="text-center">
                <h4 className="text-xl font-bold text-white mb-4">Or copy the link</h4>
                <div className="flex items-center space-x-4 max-w-md mx-auto">
                  <input
                    type="text"
                    value="https://omnifusionmusic.com"
                    readOnly
                    className="flex-1 px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white"
                  />
                  <button className="btn-secondary px-6 py-3 rounded-full">
                    Copy
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

export default InteractiveElements 