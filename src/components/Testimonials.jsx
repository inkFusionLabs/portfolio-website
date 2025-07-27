import React, { useState, useEffect } from 'react';

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const testimonials = [
    {
      id: 1,
      name: "Sarah Chen",
      role: "Music Producer",
      company: "Studio Beats",
      avatar: "👩‍🎤",
      rating: 5,
      content: "OmniFusion Music has completely transformed my workflow. Having all my music services in one place saves me hours every day. The interface is intuitive and the sound quality is exceptional.",
      platform: "Spotify + Apple Music",
      verified: true
    },
    {
      id: 2,
      name: "Marcus Rodriguez",
      role: "DJ & Event Organizer",
      company: "Rhythm Events",
      avatar: "👨‍🎧",
      rating: 5,
      content: "As a DJ, I need quick access to multiple platforms. OmniFusion Music makes it seamless to switch between Spotify, Apple Music, and YouTube Music during live performances.",
      platform: "Spotify + YouTube Music",
      verified: true
    },
    {
      id: 3,
      name: "Emma Thompson",
      role: "Music Teacher",
      company: "Harmony Academy",
      avatar: "👩‍🏫",
      rating: 5,
      content: "I use OmniFusion Music in my music classes. The ability to create playlists from multiple sources and the excellent organization features make lesson planning so much easier.",
      platform: "Apple Music + Tidal",
      verified: true
    },
    {
      id: 4,
      name: "David Kim",
      role: "Software Developer",
      company: "TechFlow",
      avatar: "👨‍💻",
      rating: 5,
      content: "The developer experience with OmniFusion Music is outstanding. Clean API, great documentation, and the app never crashes. It's become my go-to music player for coding sessions.",
      platform: "Spotify + SoundCloud",
      verified: true
    },
    {
      id: 5,
      name: "Lisa Park",
      role: "Fitness Instructor",
      company: "FitLife Studio",
      avatar: "👩‍🏃‍♀️",
      rating: 5,
      content: "Perfect for my fitness classes! I can seamlessly mix tracks from different platforms and the playlist management is incredible. My clients love the variety of music I can offer.",
      platform: "Apple Music + Spotify",
      verified: true
    },
    {
      id: 6,
      name: "Alex Johnson",
      role: "Podcast Host",
      company: "Audio Stories",
      avatar: "👨‍🎙️",
      rating: 4,
      content: "Great for managing my podcast music library. The cross-platform sync is a game-changer, and the audio quality is consistently excellent across all services.",
      platform: "Spotify + Tidal",
      verified: true
    }
  ];

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, testimonials.length]);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goToTestimonial = (index) => {
    setCurrentIndex(index);
  };

  const toggleAutoPlay = () => {
    setIsAutoPlaying(!isAutoPlaying);
  };

  const currentTestimonial = testimonials[currentIndex];

  return (
    <div className="bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/10">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-white mb-4 flex items-center justify-center">
          <span className="text-4xl mr-3">💬</span>
          What Users Say
        </h2>
        <p className="text-white/70 text-lg max-w-2xl mx-auto">
          Join thousands of satisfied users who have transformed their music experience with OmniFusion Music
        </p>
      </div>

      {/* Main Testimonial */}
      <div className="relative mb-8">
        <div className="bg-white/5 rounded-2xl p-8 border border-white/10 hover:bg-white/10 transition-all duration-300">
          {/* Rating */}
          <div className="flex items-center mb-4">
            <div className="flex space-x-1">
              {[...Array(currentTestimonial.rating)].map((_, i) => (
                <span key={i} className="text-yellow-400 text-xl">⭐</span>
              ))}
            </div>
            <span className="text-white/60 text-sm ml-2">
              {currentTestimonial.rating}/5
            </span>
            {currentTestimonial.verified && (
              <span className="ml-2 text-blue-400 text-sm">✓ Verified User</span>
            )}
          </div>

          {/* Content */}
          <blockquote className="text-white text-lg leading-relaxed mb-6 italic">
            "{currentTestimonial.content}"
          </blockquote>

          {/* Author */}
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="text-3xl mr-4">{currentTestimonial.avatar}</div>
              <div>
                <div className="text-white font-semibold">{currentTestimonial.name}</div>
                <div className="text-white/70 text-sm">{currentTestimonial.role}</div>
                <div className="text-white/50 text-xs">{currentTestimonial.company}</div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-white/60 text-sm">Uses</div>
              <div className="text-white font-medium">{currentTestimonial.platform}</div>
            </div>
          </div>
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={prevTestimonial}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/10 hover:bg-white/20 rounded-full p-3 transition-all duration-300 hover:scale-110"
        >
          ←
        </button>
        <button
          onClick={nextTestimonial}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/10 hover:bg-white/20 rounded-full p-3 transition-all duration-300 hover:scale-110"
        >
          →
        </button>
      </div>

      {/* Dots Navigation */}
      <div className="flex justify-center space-x-2 mb-6">
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => goToTestimonial(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? 'bg-gradient-to-r from-purple-500 to-pink-500'
                : 'bg-white/30 hover:bg-white/50'
            }`}
          />
        ))}
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center space-x-4">
        <button
          onClick={toggleAutoPlay}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
            isAutoPlaying
              ? 'bg-green-500/20 text-green-300 border border-green-500/30'
              : 'bg-white/10 text-white/70 border border-white/20 hover:bg-white/20'
          }`}
        >
          {isAutoPlaying ? '⏸️ Pause' : '▶️ Auto-play'}
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 pt-8 border-t border-white/10">
        <div className="text-center">
          <div className="text-3xl font-bold text-white mb-2">10K+</div>
          <div className="text-white/70 text-sm">Active Users</div>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold text-white mb-2">4.9/5</div>
          <div className="text-white/70 text-sm">Average Rating</div>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold text-white mb-2">50+</div>
          <div className="text-white/70 text-sm">Countries</div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="mt-8 text-center">
        <p className="text-white/70 mb-4">Ready to join them?</p>
        <button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-3 rounded-lg font-semibold hover:scale-105 transition-all duration-300">
          Download OmniFusion Music
        </button>
      </div>
    </div>
  );
};

export default Testimonials; 