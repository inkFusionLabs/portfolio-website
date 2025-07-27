import React, { useState, useEffect } from 'react';
import appIntegrationService from '../services/appIntegrationService';

const AppConnectionStatus = () => {
  const [appStatus, setAppStatus] = useState(null);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const checkAppStatus = async () => {
      setIsChecking(true);
      
      // Get current app status
      const status = appIntegrationService.getAppStatus();
      setAppStatus(status);
      
      // Try to detect app if not already detected
      if (!status.installed) {
        await appIntegrationService.detectApp();
        setAppStatus(appIntegrationService.getAppStatus());
      }
      
      setIsChecking(false);
    };

    checkAppStatus();
    
    // Check periodically
    const interval = setInterval(checkAppStatus, 30000); // Check every 30 seconds
    
    return () => clearInterval(interval);
  }, []);

  if (isChecking) {
    return (
      <div className="fixed bottom-4 right-4 bg-white/10 backdrop-blur-md rounded-lg p-3 border border-white/20">
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></div>
          <span className="text-white/70 text-sm">Checking app...</span>
        </div>
      </div>
    );
  }

  if (!appStatus) {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 bg-white/10 backdrop-blur-md rounded-lg p-3 border border-white/20">
      <div className="flex items-center space-x-2">
        <div className={`w-2 h-2 rounded-full ${appStatus.installed ? 'bg-green-500' : 'bg-gray-500'}`}></div>
        <span className="text-white/70 text-sm">
          {appStatus.installed ? 'App Connected' : 'App Not Found'}
        </span>
        
        {appStatus.installed && (
          <button
            onClick={() => appIntegrationService.openApp('open')}
            className="ml-2 px-2 py-1 bg-purple-600 text-white text-xs rounded hover:bg-purple-700 transition-colors"
          >
            Open
          </button>
        )}
        
        {!appStatus.installed && (
          <button
            onClick={() => appIntegrationService.redirectToDownload()}
            className="ml-2 px-2 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700 transition-colors"
          >
            Download
          </button>
        )}
      </div>
      
      {appStatus.installed && appStatus.version && (
        <div className="text-white/40 text-xs mt-1">
          v{appStatus.version}
        </div>
      )}
    </div>
  );
};

export default AppConnectionStatus; 