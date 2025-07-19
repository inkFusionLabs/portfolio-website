import React, { useState, useEffect } from 'react'
import { Code, Clock, CheckCircle, AlertCircle, Zap, Users, Star, Download, RefreshCw } from 'lucide-react'
import useStatistics from '../hooks/useStatistics.js'

const DevelopmentStatus = () => {
  const { formattedStats, loading, error, refresh } = useStatistics()
  const [currentProgress, setCurrentProgress] = useState(0)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Animate progress bar on component mount
    const timer = setTimeout(() => {
      setCurrentProgress(85) // Updated development progress
    }, 500)

    // Intersection Observer for animations
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    const element = document.getElementById('development-status')
    if (element) {
      observer.observe(element)
    }

    return () => {
      clearTimeout(timer)
      observer.disconnect()
    }
  }, [])

  const developmentPhases = [
    {
      phase: "Core Development",
      status: "completed",
      progress: 100,
      description: "Basic app functionality and multi-service integration",
      icon: <CheckCircle className="w-5 h-5" />,
      color: "from-green-500 to-emerald-500"
    },
    {
      phase: "Advanced Features",
      status: "completed",
      progress: 100,
      description: "Universal search, cross-platform playlists, smart recommendations",
      icon: <CheckCircle className="w-5 h-5" />,
      color: "from-green-500 to-emerald-500"
    },
    {
      phase: "Website & Marketing",
      status: "completed",
      progress: 100,
      description: "Professional website with interactive demos and deployment",
      icon: <CheckCircle className="w-5 h-5" />,
      color: "from-green-500 to-emerald-500"
    },
    {
      phase: "Community Features",
      status: "in-progress",
      progress: 75,
      description: "User profiles, social sharing, collaborative playlists",
      icon: <Clock className="w-5 h-5" />,
      color: "from-orange-500 to-red-500"
    },
    {
      phase: "Mobile Apps",
      status: "in-progress",
      progress: 45,
      description: "iOS and Android companion applications",
      icon: <Clock className="w-5 h-5" />,
      color: "from-orange-500 to-red-500"
    },
    {
      phase: "AI Features",
      status: "planned",
      progress: 0,
      description: "AI playlist generation, smart mood detection",
      icon: <AlertCircle className="w-5 h-5" />,
      color: "from-gray-500 to-slate-500"
    },
    {
      phase: "Enterprise Features",
      status: "planned",
      progress: 0,
      description: "Team collaboration, advanced analytics",
      icon: <AlertCircle className="w-5 h-5" />,
      color: "from-gray-500 to-slate-500"
    }
  ]

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'text-green-400'
      case 'in-progress': return 'text-orange-400'
      case 'planned': return 'text-gray-400'
      default: return 'text-gray-400'
    }
  }

  const getStatusText = (status) => {
    switch (status) {
      case 'completed': return 'Completed'
      case 'in-progress': return 'In Progress'
      case 'planned': return 'Planned'
      default: return 'Unknown'
    }
  }

  const estimatedCompletion = "Q4 2024"
  const currentVersion = "v1.2.0"

  return (
    <section id="development-status" className="py-20 bg-gray-900 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl floating-element"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl floating-element-delayed"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 fade-in">
          <div className="inline-flex items-center px-4 py-2 glass rounded-full mb-6">
            <Code className="w-4 h-4 text-blue-400 mr-2" />
            <span className="text-sm font-medium">Development Status</span>
          </div>
          <h2 className="text-5xl md:text-6xl font-black text-white mb-8">
            Currently in
            <span className="gradient-text"> Development</span>
          </h2>
          <p className="text-xl md:text-2xl text-gray-200 max-w-4xl mx-auto leading-relaxed">
            OmniFusion Music is actively being developed by our passionate team. Join us on this journey and be among the first to experience the future of music streaming.
          </p>
        </div>

        {/* Overall Progress */}
        <div className="glass p-8 rounded-3xl mb-16 fade-in">
          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold text-white mb-4">Overall Progress</h3>
            <div className="flex items-center justify-center space-x-4 mb-6">
              <div className="text-4xl font-bold text-white">{currentProgress}%</div>
              <div className="text-gray-400">Complete</div>
            </div>
            <div className="w-full max-w-2xl mx-auto">
              <div className="w-full h-4 bg-white/10 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full transition-all duration-2000 ease-out"
                  style={{ width: `${currentProgress}%` }}
                ></div>
              </div>
            </div>
            <p className="text-gray-300 mt-4">Estimated completion: <span className="text-white font-semibold">{estimatedCompletion}</span></p>
          </div>

          {/* Current Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mx-auto mb-3">
                <Code className="w-6 h-6 text-white" />
              </div>
              <div className="text-2xl font-bold text-white">{currentVersion}</div>
              <div className="text-gray-400 text-sm">Current Version</div>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mx-auto mb-3">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div className="text-2xl font-bold text-white">{loading ? "..." : formattedStats.contributors}</div>
              <div className="text-gray-400 text-sm">Active Contributors</div>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center mx-auto mb-3">
                <Star className="w-6 h-6 text-white" />
              </div>
              <div className="text-2xl font-bold text-white">{loading ? "..." : formattedStats.stars}</div>
              <div className="text-gray-400 text-sm">GitHub Stars</div>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mx-auto mb-3">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <div className="text-2xl font-bold text-white">Beta</div>
              <div className="text-gray-400 text-sm">Release Status</div>
            </div>
          </div>
        </div>

        {/* Development Phases */}
        <div className="space-y-6 mb-16">
          {developmentPhases.map((phase, index) => (
            <div 
              key={index} 
              className="glass p-6 rounded-2xl fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-4">
                  <div className={`w-12 h-12 bg-gradient-to-r ${phase.color} rounded-xl flex items-center justify-center text-white`}>
                    {phase.icon}
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-white">{phase.phase}</h4>
                    <p className="text-gray-300 text-sm">{phase.description}</p>
                  </div>
                </div>
                <div className={`text-right ${getStatusColor(phase.status)}`}>
                  <div className="font-semibold">{getStatusText(phase.status)}</div>
                  <div className="text-sm">{phase.progress}%</div>
                </div>
              </div>
              
              <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden">
                <div 
                  className={`h-full rounded-full transition-all duration-1000 ${
                    phase.status === 'completed' ? 'bg-gradient-to-r from-green-500 to-emerald-500' :
                    phase.status === 'in-progress' ? 'bg-gradient-to-r from-orange-500 to-red-500' :
                    'bg-gradient-to-r from-gray-500 to-slate-500'
                  }`}
                  style={{ width: `${phase.progress}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center fade-in">
          <div className="glass p-8 rounded-3xl">
            <h3 className="text-2xl font-bold text-white mb-6">Join the Development Journey</h3>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
              Be part of the development process! Download the beta version, provide feedback, and help shape the future of OmniFusion Music. Early adopters get special recognition and exclusive features.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="btn-primary flex items-center space-x-3">
                <Download className="w-5 h-5" />
                <span>Download Beta</span>
              </button>
              <button className="btn-secondary flex items-center space-x-3">
                <Users className="w-5 h-5" />
                <span>Join Beta Program</span>
              </button>
              <button className="btn-secondary flex items-center space-x-3">
                <Code className="w-5 h-5" />
                <span>Contribute Code</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default DevelopmentStatus 