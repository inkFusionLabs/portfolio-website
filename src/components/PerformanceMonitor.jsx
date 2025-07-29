import React, { useEffect } from 'react';

const PerformanceMonitor = () => {
  useEffect(() => {
    // Monitor Core Web Vitals
    if ('PerformanceObserver' in window) {
      // Largest Contentful Paint (LCP)
      const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];
        
        if (lastEntry) {
          const lcp = lastEntry.startTime;
          console.log('LCP:', lcp);
          
          // Track LCP in analytics
          if (typeof gtag !== 'undefined') {
            gtag('event', 'web_vitals', {
              event_category: 'Web Vitals',
              event_label: 'LCP',
              value: Math.round(lcp),
              non_interaction: true
            });
          }
          
          // Report to analytics service
          reportPerformanceMetric('LCP', lcp);
        }
      });
      
      try {
        lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
      } catch (e) {
        console.log('LCP observer failed:', e);
      }

      // First Input Delay (FID)
      const fidObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry) => {
          const fid = entry.processingStart - entry.startTime;
          console.log('FID:', fid);
          
          if (typeof gtag !== 'undefined') {
            gtag('event', 'web_vitals', {
              event_category: 'Web Vitals',
              event_label: 'FID',
              value: Math.round(fid),
              non_interaction: true
            });
          }
          
          reportPerformanceMetric('FID', fid);
        });
      });
      
      try {
        fidObserver.observe({ entryTypes: ['first-input'] });
      } catch (e) {
        console.log('FID observer failed:', e);
      }

      // Cumulative Layout Shift (CLS)
      let clsValue = 0;
      let clsEntries = [];
      
      const clsObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry) => {
          if (!entry.hadRecentInput) {
            clsValue += entry.value;
            clsEntries.push(entry);
          }
        });
        
        console.log('CLS:', clsValue);
        
        if (typeof gtag !== 'undefined') {
          gtag('event', 'web_vitals', {
            event_category: 'Web Vitals',
            event_label: 'CLS',
            value: Math.round(clsValue * 1000) / 1000,
            non_interaction: true
          });
        }
        
        reportPerformanceMetric('CLS', clsValue);
      });
      
      try {
        clsObserver.observe({ entryTypes: ['layout-shift'] });
      } catch (e) {
        console.log('CLS observer failed:', e);
      }

      // First Contentful Paint (FCP)
      const fcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const fcp = entries[0].startTime;
        console.log('FCP:', fcp);
        
        if (typeof gtag !== 'undefined') {
          gtag('event', 'web_vitals', {
            event_category: 'Web Vitals',
            event_label: 'FCP',
            value: Math.round(fcp),
            non_interaction: true
          });
        }
        
        reportPerformanceMetric('FCP', fcp);
      });
      
      try {
        fcpObserver.observe({ entryTypes: ['first-contentful-paint'] });
      } catch (e) {
        console.log('FCP observer failed:', e);
      }
    }

    // Monitor page load performance
    window.addEventListener('load', () => {
      setTimeout(() => {
        const navigation = performance.getEntriesByType('navigation')[0];
        if (navigation) {
          const loadTime = navigation.loadEventEnd - navigation.loadEventStart;
          const domContentLoaded = navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart;
          
          console.log('Page Load Time:', loadTime);
          console.log('DOM Content Loaded:', domContentLoaded);
          
          reportPerformanceMetric('PageLoad', loadTime);
          reportPerformanceMetric('DOMContentLoaded', domContentLoaded);
        }
      }, 0);
    });

    // Monitor resource loading
    const resourceObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach((entry) => {
        if (entry.initiatorType === 'img' || entry.initiatorType === 'script' || entry.initiatorType === 'css') {
          const loadTime = entry.responseEnd - entry.startTime;
          
          if (loadTime > 1000) { // Log slow resources
            console.warn('Slow resource:', entry.name, loadTime);
            reportPerformanceMetric('SlowResource', loadTime, entry.name);
          }
        }
      });
    });
    
    try {
      resourceObserver.observe({ entryTypes: ['resource'] });
    } catch (e) {
      console.log('Resource observer failed:', e);
    }

    // Monitor memory usage (if available)
    if ('memory' in performance) {
      setInterval(() => {
        const memory = performance.memory;
        const usedMB = Math.round(memory.usedJSHeapSize / 1048576);
        const totalMB = Math.round(memory.totalJSHeapSize / 1048576);
        
        if (usedMB > 100) { // Log high memory usage
          console.warn('High memory usage:', usedMB, 'MB');
          reportPerformanceMetric('MemoryUsage', usedMB);
        }
      }, 30000); // Check every 30 seconds
    }

    // Monitor errors
    window.addEventListener('error', (event) => {
      console.error('JavaScript error:', event.error);
      reportPerformanceMetric('JavaScriptError', 1, event.message);
    });

    window.addEventListener('unhandledrejection', (event) => {
      console.error('Unhandled promise rejection:', event.reason);
      reportPerformanceMetric('PromiseRejection', 1, event.reason);
    });

  }, []);

  const reportPerformanceMetric = (metric, value, details = '') => {
    // Send to analytics service
    if (typeof gtag !== 'undefined') {
      gtag('event', 'performance_metric', {
        event_category: 'Performance',
        event_label: metric,
        value: value,
        custom_parameter_1: details,
        non_interaction: true
      });
    }

    // Send to custom analytics endpoint
    fetch('/api/analytics/performance', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        metric,
        value,
        details,
        timestamp: Date.now(),
        url: window.location.href,
        userAgent: navigator.userAgent
      })
    }).catch(error => {
      console.log('Failed to send performance metric:', error);
    });
  };

  // This component doesn't render anything visible
  return null;
};

export default PerformanceMonitor; 