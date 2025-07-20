import React, { useState, useEffect, useRef } from 'react';

const VoiceControl = () => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [confidence, setConfidence] = useState(0);
  const [isSupported, setIsSupported] = useState(false);
  const [commands, setCommands] = useState([]);
  const recognitionRef = useRef(null);

  const availableCommands = [
    { phrase: 'play music', action: '🎵 Play music', icon: '▶️' },
    { phrase: 'pause', action: '⏸️ Pause playback', icon: '⏸️' },
    { phrase: 'next song', action: '⏭️ Next track', icon: '⏭️' },
    { phrase: 'previous song', action: '⏮️ Previous track', icon: '⏮️' },
    { phrase: 'volume up', action: '🔊 Increase volume', icon: '🔊' },
    { phrase: 'volume down', action: '🔉 Decrease volume', icon: '🔉' },
    { phrase: 'open spotify', action: '🎧 Open Spotify', icon: '🎧' },
    { phrase: 'open apple music', action: '🍎 Open Apple Music', icon: '🍎' },
    { phrase: 'search', action: '🔍 Search music', icon: '🔍' },
    { phrase: 'create playlist', action: '📝 Create playlist', icon: '📝' },
    { phrase: 'shuffle', action: '🔀 Shuffle mode', icon: '🔀' },
    { phrase: 'repeat', action: '🔁 Repeat mode', icon: '🔁' },
    { phrase: 'download app', action: '📱 Download app', icon: '📱' },
    { phrase: 'help', action: '❓ Show help', icon: '❓' },
    { phrase: 'stop listening', action: '🛑 Stop voice control', icon: '🛑' }
  ];

  useEffect(() => {
    // Check if speech recognition is supported
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      setIsSupported(true);
      initializeSpeechRecognition();
    } else {
      setIsSupported(false);
    }
  }, []);

  const initializeSpeechRecognition = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    recognitionRef.current = new SpeechRecognition();
    
    recognitionRef.current.continuous = true;
    recognitionRef.current.interimResults = true;
    recognitionRef.current.lang = 'en-US';

    recognitionRef.current.onstart = () => {
      setIsListening(true);
      setTranscript('');
      setCommands([]);
    };

    recognitionRef.current.onresult = (event) => {
      let finalTranscript = '';
      let interimTranscript = '';

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          finalTranscript += transcript;
        } else {
          interimTranscript += transcript;
        }
      }

      const fullTranscript = finalTranscript + interimTranscript;
      setTranscript(fullTranscript);
      
      if (finalTranscript) {
        processCommand(finalTranscript.toLowerCase());
      }
    };

    recognitionRef.current.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
      setIsListening(false);
    };

    recognitionRef.current.onend = () => {
      setIsListening(false);
    };
  };

  const processCommand = (command) => {
    const matchedCommand = availableCommands.find(cmd => 
      command.includes(cmd.phrase.toLowerCase())
    );

    if (matchedCommand) {
      const newCommand = {
        ...matchedCommand,
        timestamp: new Date().toLocaleTimeString(),
        confidence: Math.random() * 0.3 + 0.7 // Mock confidence
      };
      
      setCommands(prev => [newCommand, ...prev.slice(0, 4)]);
      executeCommand(matchedCommand.action);
    }
  };

  const executeCommand = (action) => {
    // Simulate command execution
    console.log('Executing command:', action);
    
    // Add visual feedback
    const feedback = document.createElement('div');
    feedback.className = 'fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg z-50 animate-fade-in';
    feedback.textContent = `✅ ${action}`;
    document.body.appendChild(feedback);
    
    setTimeout(() => {
      feedback.remove();
    }, 3000);
  };

  const startListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.start();
    }
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
  };

  const toggleListening = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  if (!isSupported) {
    return (
      <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10">
        <div className="text-center">
          <div className="text-4xl mb-4">🎤</div>
          <h3 className="text-xl font-bold text-white mb-2">Voice Control</h3>
          <p className="text-white/70 mb-4">
            Voice control is not supported in your browser. 
            Please use Chrome, Edge, or Safari for voice features.
          </p>
          <div className="bg-yellow-500/20 border border-yellow-500/30 rounded-lg p-3">
            <p className="text-yellow-300 text-sm">
              💡 Try using Chrome or Edge for the best voice control experience
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-white flex items-center">
          <span className="text-2xl mr-3">🎤</span>
          Voice Control
        </h3>
        
        <div className="flex items-center space-x-2">
          <div className={`w-3 h-3 rounded-full ${isListening ? 'bg-red-500 animate-pulse' : 'bg-gray-500'}`}></div>
          <span className="text-white/60 text-sm">
            {isListening ? 'Listening...' : 'Ready'}
          </span>
        </div>
      </div>

      {/* Main Control */}
      <div className="text-center mb-6">
        <button
          onClick={toggleListening}
          className={`w-20 h-20 rounded-full flex items-center justify-center text-2xl transition-all duration-300 ${
            isListening
              ? 'bg-red-500 hover:bg-red-600 animate-pulse shadow-glow-lg'
              : 'bg-gradient-to-r from-purple-600 to-pink-600 hover:scale-105 shadow-glow'
          }`}
        >
          {isListening ? '🛑' : '🎤'}
        </button>
        
        <p className="text-white/70 mt-3 text-sm">
          {isListening ? 'Click to stop listening' : 'Click to start listening'}
        </p>
      </div>

      {/* Live Transcript */}
      {isListening && (
        <div className="mb-6">
          <label className="block text-white/70 text-sm mb-2">Live Transcript</label>
          <div className="bg-black/20 rounded-lg p-4 border border-white/10 min-h-[60px]">
            <p className="text-white text-sm">
              {transcript || 'Listening for commands...'}
            </p>
          </div>
        </div>
      )}

      {/* Recent Commands */}
      {commands.length > 0 && (
        <div className="mb-6">
          <label className="block text-white/70 text-sm mb-2">Recent Commands</label>
          <div className="space-y-2">
            {commands.map((command, index) => (
              <div
                key={index}
                className="bg-white/5 rounded-lg p-3 border border-white/10 animate-slide-up"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <span className="text-lg mr-2">{command.icon}</span>
                    <span className="text-white text-sm">{command.action}</span>
                  </div>
                  <span className="text-white/50 text-xs">{command.timestamp}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Available Commands */}
      <div>
        <label className="block text-white/70 text-sm mb-2">Available Commands</label>
        <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto">
          {availableCommands.map((command, index) => (
            <div
              key={index}
              className="bg-white/5 rounded-lg p-2 border border-white/10 text-center hover:bg-white/10 transition-colors"
            >
              <div className="text-lg mb-1">{command.icon}</div>
              <p className="text-white text-xs">{command.phrase}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Tips */}
      <div className="mt-6 bg-blue-500/20 border border-blue-500/30 rounded-lg p-3">
        <p className="text-blue-300 text-sm">
          💡 <strong>Tip:</strong> Speak clearly and naturally. Try saying "play music" or "volume up" to get started.
        </p>
      </div>
    </div>
  );
};

export default VoiceControl; 