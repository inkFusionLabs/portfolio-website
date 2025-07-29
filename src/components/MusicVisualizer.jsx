import React, { useState, useEffect, useRef } from 'react';

const MusicVisualizer = ({ isPlaying = false, audioData = null }) => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const [visualizerType, setVisualizerType] = useState('bars');
  const [colorScheme, setColorScheme] = useState('purple');

  const visualizerTypes = [
    { id: 'bars', name: 'Bars', icon: '📊' },
    { id: 'circles', name: 'Circles', icon: '⭕' },
    { id: 'waves', name: 'Waves', icon: '🌊' },
    { id: 'particles', name: 'Particles', icon: '✨' }
  ];

  const colorSchemes = [
    { id: 'purple', name: 'Purple', colors: ['#8B5CF6', '#A855F7', '#C084FC'] },
    { id: 'blue', name: 'Blue', colors: ['#3B82F6', '#60A5FA', '#93C5FD'] },
    { id: 'green', name: 'Green', colors: ['#10B981', '#34D399', '#6EE7B7'] },
    { id: 'rainbow', name: 'Rainbow', colors: ['#EF4444', '#F59E0B', '#10B981', '#3B82F6', '#8B5CF6'] }
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    // Set canvas size
    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * window.devicePixelRatio;
      canvas.height = rect.height * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!isPlaying) {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      return;
    }

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const width = canvas.width / window.devicePixelRatio;
    const height = canvas.height / window.devicePixelRatio;

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      
      // Generate mock audio data if none provided
      const data = audioData || generateMockAudioData();
      
      switch (visualizerType) {
        case 'bars':
          drawBars(ctx, data, width, height);
          break;
        case 'circles':
          drawCircles(ctx, data, width, height);
          break;
        case 'waves':
          drawWaves(ctx, data, width, height);
          break;
        case 'particles':
          drawParticles(ctx, data, width, height);
          break;
      }
      
      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isPlaying, visualizerType, colorScheme, audioData]);

  const generateMockAudioData = () => {
    const data = [];
    for (let i = 0; i < 64; i++) {
      data.push(Math.random() * 0.8 + 0.2);
    }
    return data;
  };

  const getCurrentColors = () => {
    return colorSchemes.find(scheme => scheme.id === colorScheme)?.colors || colorSchemes[0].colors;
  };

  const drawBars = (ctx, data, width, height) => {
    const barWidth = width / data.length;
    const colors = getCurrentColors();
    
    data.forEach((value, index) => {
      const barHeight = value * height * 0.8;
      const x = index * barWidth;
      const y = height - barHeight;
      
      const colorIndex = Math.floor((index / data.length) * colors.length);
      const color = colors[colorIndex % colors.length];
      
      ctx.fillStyle = color;
      ctx.fillRect(x, y, barWidth - 2, barHeight);
    });
  };

  const drawCircles = (ctx, data, width, height) => {
    const centerX = width / 2;
    const centerY = height / 2;
    const maxRadius = Math.min(width, height) / 3;
    const colors = getCurrentColors();
    
    data.forEach((value, index) => {
      const angle = (index / data.length) * Math.PI * 2;
      const radius = value * maxRadius;
      const x = centerX + Math.cos(angle) * radius;
      const y = centerY + Math.sin(angle) * radius;
      
      const colorIndex = Math.floor((index / data.length) * colors.length);
      const color = colors[colorIndex % colors.length];
      
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.arc(x, y, 3, 0, Math.PI * 2);
      ctx.fill();
    });
  };

  const drawWaves = (ctx, data, width, height) => {
    const colors = getCurrentColors();
    
    colors.forEach((color, colorIndex) => {
      ctx.strokeStyle = color;
      ctx.lineWidth = 2;
      ctx.beginPath();
      
      for (let x = 0; x < width; x++) {
        const index = Math.floor((x / width) * data.length);
        const value = data[index] || 0;
        const y = height / 2 + Math.sin(x * 0.02 + Date.now() * 0.001) * value * height * 0.3;
        
        if (x === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
      
      ctx.stroke();
    });
  };

  const drawParticles = (ctx, data, width, height) => {
    const colors = getCurrentColors();
    
    data.forEach((value, index) => {
      const x = (index / data.length) * width;
      const y = height / 2 + Math.sin(Date.now() * 0.001 + index * 0.1) * value * height * 0.3;
      
      const colorIndex = Math.floor((index / data.length) * colors.length);
      const color = colors[colorIndex % colors.length];
      
      ctx.fillStyle = color;
      ctx.globalAlpha = value;
      ctx.beginPath();
      ctx.arc(x, y, value * 8, 0, Math.PI * 2);
      ctx.fill();
    });
    
    ctx.globalAlpha = 1;
  };

  return (
    <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-white flex items-center">
          <span className="text-2xl mr-3">🎵</span>
          Music Visualizer
        </h3>
        
        <div className="flex items-center space-x-2">
          <div className={`w-3 h-3 rounded-full ${isPlaying ? 'bg-green-500 animate-pulse' : 'bg-gray-500'}`}></div>
          <span className="text-white/60 text-sm">
            {isPlaying ? 'Live' : 'Paused'}
          </span>
        </div>
      </div>

      {/* Visualizer Canvas */}
      <div className="relative mb-6">
        <canvas
          ref={canvasRef}
          className="w-full h-64 rounded-lg bg-black/20 border border-white/10"
          style={{ minHeight: '256px' }}
        />
        
        {!isPlaying && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-lg">
            <div className="text-center">
              <div className="text-4xl mb-2">🎵</div>
              <p className="text-white/70">Start playing to see visualization</p>
            </div>
          </div>
        )}
      </div>

      {/* Controls */}
      <div className="space-y-4">
        {/* Visualizer Type */}
        <div>
          <label className="block text-white/70 text-sm mb-2">Visualizer Type</label>
          <div className="flex space-x-2">
            {visualizerTypes.map((type) => (
              <button
                key={type.id}
                onClick={() => setVisualizerType(type.id)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                  visualizerType === type.id
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                    : 'bg-white/10 text-white/70 hover:bg-white/20'
                }`}
              >
                <span className="mr-1">{type.icon}</span>
                {type.name}
              </button>
            ))}
          </div>
        </div>

        {/* Color Scheme */}
        <div>
          <label className="block text-white/70 text-sm mb-2">Color Scheme</label>
          <div className="flex space-x-2">
            {colorSchemes.map((scheme) => (
              <button
                key={scheme.id}
                onClick={() => setColorScheme(scheme.id)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                  colorScheme === scheme.id
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                    : 'bg-white/10 text-white/70 hover:bg-white/20'
                }`}
              >
                {scheme.name}
              </button>
            ))}
          </div>
        </div>

        {/* Demo Controls */}
        <div className="flex space-x-2">
          <button
            onClick={() => {/* Toggle demo mode */}}
            className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:scale-105 transition-all duration-300"
          >
            🎮 Demo Mode
          </button>
          
          <button
            onClick={() => {/* Take screenshot */}}
            className="px-4 py-2 bg-white/10 text-white rounded-lg border border-white/20 hover:bg-white/20 transition-colors"
          >
            📸 Screenshot
          </button>
        </div>
      </div>
    </div>
  );
};

export default MusicVisualizer; 