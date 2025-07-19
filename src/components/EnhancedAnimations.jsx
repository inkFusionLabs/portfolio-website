import React, { useEffect, useState } from 'react'

const EnhancedAnimations = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [scrollY, setScrollY] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Mouse follower
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    // Parallax scrolling
    const handleScroll = () => {
      setScrollY(window.scrollY)
      document.documentElement.style.setProperty('--scroll', window.scrollY)
    }

    // Loading animation
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000)

    // Intersection Observer for fade-in effects
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible')
        }
      })
    }, observerOptions)

    // Observe all fade-in elements
    const fadeElements = document.querySelectorAll('.fade-in')
    fadeElements.forEach(el => observer.observe(el))

    // Event listeners
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('scroll', handleScroll)
      clearTimeout(timer)
      observer.disconnect()
    }
  }, [])

  return (
    <>
      {/* Mouse Follower */}
      <div 
        className="mouse-follower"
        style={{
          left: mousePosition.x,
          top: mousePosition.y,
          transform: 'translate(-50%, -50%)'
        }}
      >
        <div className="mouse-follower-dot"></div>
        <div className="mouse-follower-ring"></div>
      </div>

      {/* Loading Screen */}
      {isLoading && (
        <div className="page-transition active">
          <div className="music-loader">
            <span className="music-note">♪</span>
            <span className="music-note">♫</span>
            <span className="music-note">♬</span>
          </div>
        </div>
      )}

      {/* Floating Music Notes */}
      <div className="floating-note" style={{ top: '10%', left: '5%', animationDelay: '0s' }}>♪</div>
      <div className="floating-note" style={{ top: '20%', right: '10%', animationDelay: '2s' }}>♫</div>
      <div className="floating-note" style={{ top: '60%', left: '15%', animationDelay: '4s' }}>♬</div>
      <div className="floating-note" style={{ top: '80%', right: '5%', animationDelay: '6s' }}>♪</div>
    </>
  )
}

export default EnhancedAnimations 