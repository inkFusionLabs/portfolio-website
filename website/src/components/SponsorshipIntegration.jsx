import React, { useState, useEffect } from 'react'
import { Heart, Star, Crown, Gift, Users, Trophy, Award, Coffee, Zap, Shield, Check } from 'lucide-react'

const SponsorshipIntegration = () => {
  const [donationProgress, setDonationProgress] = useState(0)
  const [monthlyGoal, setMonthlyGoal] = useState(5000)
  const [currentAmount, setCurrentAmount] = useState(3200)

  useEffect(() => {
    // Simulate real-time donation updates
    const interval = setInterval(() => {
      setCurrentAmount(prev => {
        const newAmount = prev + Math.floor(Math.random() * 50) + 10
        setDonationProgress((newAmount / monthlyGoal) * 100)
        return newAmount
      })
    }, 10000)

    return () => clearInterval(interval)
  }, [monthlyGoal])

  const sponsorTiers = [
    {
      name: "Coffee Supporter",
      amount: 5,
      icon: <Coffee className="w-6 h-6" />,
      color: "from-orange-500 to-red-500",
      benefits: [
        "Name in contributors list",
        "Early access to beta features",
        "Exclusive Discord role"
      ],
      popular: false
    },
    {
      name: "Music Lover",
      amount: 15,
      icon: <Heart className="w-6 h-6" />,
      color: "from-pink-500 to-rose-500",
      benefits: [
        "All Coffee Supporter benefits",
        "Custom app themes",
        "Priority support",
        "Monthly community calls"
      ],
      popular: false
    },
    {
      name: "Power User",
      amount: 25,
      icon: <Zap className="w-6 h-6" />,
      color: "from-yellow-500 to-orange-500",
      benefits: [
        "All Music Lover benefits",
        "Exclusive features",
        "Direct developer access",
        "Custom feature requests"
      ],
      popular: true
    },
    {
      name: "Patron",
      amount: 50,
      icon: <Crown className="w-6 h-6" />,
      color: "from-purple-500 to-pink-500",
      benefits: [
        "All Power User benefits",
        "Dedicated support channel",
        "Private consultation calls",
        "Sponsor wall of fame"
      ],
      popular: false
    }
  ]

  const sponsorWall = [
    {
      name: "Sarah Chen",
      tier: "Patron",
      amount: 50,
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      joined: "3 months ago",
      message: "Love the app! Keep up the amazing work!"
    },
    {
      name: "Marcus Rodriguez",
      tier: "Power User",
      amount: 25,
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      joined: "1 month ago",
      message: "This app has completely changed how I manage my music."
    },
    {
      name: "Emma Thompson",
      tier: "Music Lover",
      amount: 15,
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      joined: "2 weeks ago",
      message: "Finally, a solution that works across all platforms!"
    },
    {
      name: "David Kim",
      tier: "Coffee Supporter",
      amount: 5,
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      joined: "1 week ago",
      message: "Great project, happy to support!"
    },
    {
      name: "Alex Johnson",
      tier: "Patron",
      amount: 50,
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
      joined: "2 months ago",
      message: "The best music management tool I've ever used."
    },
    {
      name: "Lisa Wang",
      tier: "Power User",
      amount: 25,
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
      joined: "3 weeks ago",
      message: "Amazing features and great community!"
    }
  ]

  const stats = [
    {
      label: "Total Sponsors",
      value: "247",
      icon: <Users className="w-6 h-6" />,
      color: "from-blue-500 to-cyan-500"
    },
    {
      label: "Monthly Goal",
      value: `$${monthlyGoal.toLocaleString()}`,
      icon: <Trophy className="w-6 h-6" />,
      color: "from-yellow-500 to-orange-500"
    },
    {
      label: "Current Amount",
      value: `$${currentAmount.toLocaleString()}`,
      icon: <Heart className="w-6 h-6" />,
      color: "from-pink-500 to-rose-500"
    },
    {
      label: "Days Left",
      value: "12",
      icon: <Award className="w-6 h-6" />,
      color: "from-green-500 to-emerald-500"
    }
  ]

  return (
    <section id="sponsorship" className="py-20 bg-gray-800 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl floating-element"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl floating-element-delayed"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 fade-in">
          <div className="inline-flex items-center px-4 py-2 glass rounded-full mb-6">
            <Heart className="w-4 h-4 text-red-400 mr-2" />
            <span className="text-sm font-medium">Support the Project</span>
          </div>
          <h2 className="text-5xl md:text-6xl font-black text-white mb-8">
            Support
            <span className="gradient-text"> OmniFusion Music</span>
          </h2>
          <p className="text-xl md:text-2xl text-gray-200 max-w-4xl mx-auto leading-relaxed">
            Help us keep OmniFusion Music free and open-source. Your support enables us to build amazing features and maintain the project.
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <div key={index} className="text-center fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
              <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${stat.color} rounded-2xl mb-4 shadow-lg`}>
                {stat.icon}
              </div>
              <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
              <div className="text-gray-400 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Donation Progress */}
        <div className="glass p-8 rounded-3xl mb-16 fade-in">
          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold text-white mb-4">Monthly Funding Goal</h3>
            <p className="text-xl text-gray-200">
              Help us reach our monthly goal to keep OmniFusion Music free and open-source
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="flex justify-between items-center mb-4">
              <span className="text-white font-medium">Progress</span>
              <span className="text-white font-bold">
                ${currentAmount.toLocaleString()} / ${monthlyGoal.toLocaleString()}
              </span>
            </div>
            
            <div className="w-full bg-white/10 rounded-full h-4 mb-6">
              <div 
                className="bg-gradient-to-r from-green-500 to-blue-500 h-4 rounded-full transition-all duration-1000 ease-out"
                style={{ width: `${Math.min(donationProgress, 100)}%` }}
              ></div>
            </div>

            <div className="text-center">
              <p className="text-gray-300 mb-6">
                {donationProgress >= 100 
                  ? "🎉 Goal reached! Thank you to all our sponsors!" 
                  : `${Math.round(100 - donationProgress)}% remaining to reach our goal`
                }
              </p>
              <button className="btn-primary px-8 py-4 text-lg rounded-full">
                Become a Sponsor
              </button>
            </div>
          </div>
        </div>

        {/* Sponsor Tiers */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-white text-center mb-12">Choose Your Support Tier</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {sponsorTiers.map((tier, index) => (
              <div 
                key={index} 
                className={`glass p-6 rounded-3xl relative fade-in hover:scale-105 transition-all duration-300 ${
                  tier.popular ? 'ring-2 ring-yellow-500' : ''
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {tier.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="px-4 py-1 bg-yellow-500 text-black text-sm font-bold rounded-full">
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="text-center mb-6">
                  <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${tier.color} rounded-2xl mb-4`}>
                    {tier.icon}
                  </div>
                  <h4 className="text-xl font-bold text-white mb-2">{tier.name}</h4>
                  <div className="text-3xl font-bold text-white">${tier.amount}<span className="text-lg text-gray-400">/month</span></div>
                </div>

                <div className="space-y-3 mb-6">
                  {tier.benefits.map((benefit, benefitIndex) => (
                    <div key={benefitIndex} className="flex items-center space-x-3">
                      <Check className="w-4 h-4 text-green-400 flex-shrink-0" />
                      <span className="text-gray-300 text-sm">{benefit}</span>
                    </div>
                  ))}
                </div>

                <button className={`w-full py-3 rounded-full font-medium transition-all duration-300 ${
                  tier.popular 
                    ? 'bg-gradient-to-r from-yellow-500 to-orange-500 text-black hover:from-yellow-400 hover:to-orange-400' 
                    : 'btn-secondary'
                }`}>
                  Select Tier
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Sponsor Wall of Fame */}
        <div className="fade-in">
          <h3 className="text-3xl font-bold text-white text-center mb-12">Sponsor Wall of Fame</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sponsorWall.map((sponsor, index) => (
              <div key={index} className="glass p-6 rounded-2xl hover:bg-white/5 transition-colors">
                <div className="flex items-center space-x-4 mb-4">
                  <img 
                    src={sponsor.avatar} 
                    alt={sponsor.name}
                    className="w-16 h-16 rounded-full object-cover border-2 border-white/20"
                  />
                  <div>
                    <h4 className="text-lg font-bold text-white">{sponsor.name}</h4>
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        sponsor.tier === 'Patron' ? 'bg-purple-500/20 text-purple-400' :
                        sponsor.tier === 'Power User' ? 'bg-yellow-500/20 text-yellow-400' :
                        sponsor.tier === 'Music Lover' ? 'bg-pink-500/20 text-pink-400' :
                        'bg-orange-500/20 text-orange-400'
                      }`}>
                        {sponsor.tier}
                      </span>
                      <span className="text-sm text-gray-400">${sponsor.amount}/month</span>
                    </div>
                  </div>
                </div>
                
                <p className="text-gray-300 text-sm mb-3 italic">"{sponsor.message}"</p>
                <p className="text-xs text-gray-400">Joined {sponsor.joined}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16 fade-in">
          <div className="glass p-8 rounded-3xl max-w-4xl mx-auto">
            <h3 className="text-3xl font-bold text-white mb-4">
              Ready to Support OmniFusion Music?
            </h3>
            <p className="text-xl text-gray-200 mb-8">
              Every contribution helps us build better features and keep the project free for everyone
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button className="btn-primary px-8 py-4 text-lg rounded-full flex items-center space-x-2">
                <Heart className="w-5 h-5" />
                <span>Become a Sponsor</span>
              </button>
              <button className="btn-secondary px-8 py-4 text-lg rounded-full">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default SponsorshipIntegration 