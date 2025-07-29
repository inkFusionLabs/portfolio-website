import React, { useState } from 'react';

const DemoLogin = () => {
  const [isConnecting, setIsConnecting] = useState(false);
  const [connectedServices, setConnectedServices] = useState([]);

  const services = [
    { name: 'Spotify', icon: '🎵', color: '#1DB954' },
    { name: 'Apple Music', icon: '🍎', color: '#FA243C' },
    { name: 'YouTube Music', icon: '📺', color: '#FF0000' },
    { name: 'Tidal', icon: '🌊', color: '#000000' }
  ];

  const handleConnect = (service) => {
    setIsConnecting(true);
    
    // Simulate connection process
    setTimeout(() => {
      setConnectedServices(prev => [...prev, service.name]);
      setIsConnecting(false);
    }, 2000);
  };

  return (
    <div className="tech-stack mb-12">
      <div className="text-center mb-8">
        <h3 className="text-3xl font-bold mb-4 text-teal-400">
          🔗 Connect Your Music Services
        </h3>
        <p className="text-lg opacity-80">
          See how easy it is to connect your favorite streaming services
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {services.map((service) => {
          const isConnected = connectedServices.includes(service.name);
          const isConnecting = isConnecting && !isConnected;
          
          return (
            <div
              key={service.name}
              className={`feature-card text-center transition-all duration-300 ${
                isConnected ? 'ring-2 ring-green-400 bg-green-400/10' : 
                isConnecting ? 'ring-2 ring-yellow-400 bg-yellow-400/10' : ''
              }`}
            >
              <div className="text-4xl mb-4">{service.icon}</div>
              <h4 className="text-xl font-semibold mb-2">{service.name}</h4>
              
              {isConnected ? (
                <div className="text-green-400 text-sm">✅ Connected</div>
              ) : isConnecting ? (
                <div className="text-yellow-400 text-sm">⏳ Connecting...</div>
              ) : (
                <button
                  onClick={() => handleConnect(service)}
                  disabled={isConnecting}
                  className="btn btn-secondary text-sm px-4 py-2 disabled:opacity-50"
                  style={{ borderColor: service.color }}
                >
                  Connect
                </button>
              )}
            </div>
          );
        })}
      </div>

      {connectedServices.length > 0 && (
        <div className="text-center">
          <div className="bg-green-400/10 border border-green-400/30 rounded-2xl p-6 backdrop-blur-md">
            <h4 className="text-xl font-semibold text-green-400 mb-2">
              🎉 Connected Services
            </h4>
            <p className="opacity-80 mb-4">
              You've successfully connected {connectedServices.length} service{connectedServices.length > 1 ? 's' : ''}!
            </p>
            <div className="flex gap-2 justify-center flex-wrap">
              {connectedServices.map((service) => (
                <span key={service} className="bg-green-400/20 px-3 py-1 rounded-full text-sm">
                  {service}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="text-center mt-6">
        <p className="text-sm opacity-60">
          💡 This is a demo. In the actual desktop app, you'll be redirected to each service's login page.
        </p>
      </div>
    </div>
  );
};

export default DemoLogin; 