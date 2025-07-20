import React, { useEffect } from 'react';

const Analytics = () => {
  useEffect(() => {
    // Google Analytics initialization
    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID';
    document.head.appendChild(script);

    window.dataLayer = window.dataLayer || [];
    function gtag() {
      window.dataLayer.push(arguments);
    }
    gtag('js', new Date());
    gtag('config', 'GA_MEASUREMENT_ID');

    // Vercel Analytics (optional)
    const vercelScript = document.createElement('script');
    vercelScript.defer = true;
    vercelScript.src = '/_vercel/insights/script.js';
    document.head.appendChild(vercelScript);

    return () => {
      // Cleanup
      document.head.removeChild(script);
      document.head.removeChild(vercelScript);
    };
  }, []);

  return null; // This component doesn't render anything
};

export default Analytics; 