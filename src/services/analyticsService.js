// Analytics Service for User Behavior and Performance Tracking
class AnalyticsService {
  constructor() {
    this.events = [];
    this.sessionId = this.generateSessionId();
    this.userId = this.getUserId();
    this.isEnabled = this.checkAnalyticsEnabled();
    
    // Initialize tracking
    this.init();
  }

  // Generate unique session ID
  generateSessionId() {
    return 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  }

  // Get or create user ID
  getUserId() {
    let userId = localStorage.getItem('analytics_user_id');
    if (!userId) {
      userId = 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
      localStorage.setItem('analytics_user_id', userId);
    }
    return userId;
  }

  // Check if analytics is enabled
  checkAnalyticsEnabled() {
    return localStorage.getItem('analytics_enabled') !== 'false';
  }

  // Initialize analytics
  init() {
    if (!this.isEnabled) return;

    // Track page view
    this.trackPageView();
    
    // Track session start
    this.trackEvent('session_start', {
      session_id: this.sessionId,
      user_id: this.userId,
      timestamp: Date.now()
    });

    // Set up event listeners
    this.setupEventListeners();
    
    // Performance monitoring
    this.trackPerformance();
  }

  // Track page view
  trackPageView() {
    const pageData = {
      url: window.location.href,
      title: document.title,
      referrer: document.referrer,
      user_agent: navigator.userAgent,
      screen_resolution: `${screen.width}x${screen.height}`,
      viewport: `${window.innerWidth}x${window.innerHeight}`,
      timestamp: Date.now()
    };

    this.trackEvent('page_view', pageData);
  }

  // Track custom event
  trackEvent(eventName, properties = {}) {
    if (!this.isEnabled) return;

    const event = {
      event_name: eventName,
      properties: {
        ...properties,
        session_id: this.sessionId,
        user_id: this.userId,
        timestamp: Date.now(),
        url: window.location.href
      }
    };

    this.events.push(event);
    this.sendEvent(event);
  }

  // Track user interaction
  trackInteraction(element, action, properties = {}) {
    this.trackEvent('user_interaction', {
      element: element,
      action: action,
      ...properties
    });
  }

  // Track feature usage
  trackFeatureUsage(feature, properties = {}) {
    this.trackEvent('feature_usage', {
      feature: feature,
      ...properties
    });
  }

  // Track error
  trackError(error, context = {}) {
    this.trackEvent('error', {
      error_message: error.message,
      error_stack: error.stack,
      error_type: error.name,
      context: context
    });
  }

  // Track performance metrics
  trackPerformance() {
    if ('performance' in window) {
      // Track page load performance
      window.addEventListener('load', () => {
        setTimeout(() => {
          const perfData = performance.getEntriesByType('navigation')[0];
          if (perfData) {
            this.trackEvent('performance', {
              load_time: perfData.loadEventEnd - perfData.loadEventStart,
              dom_content_loaded: perfData.domContentLoadedEventEnd - perfData.domContentLoadedEventStart,
              first_paint: this.getFirstPaint(),
              first_contentful_paint: this.getFirstContentfulPaint(),
              largest_contentful_paint: this.getLargestContentfulPaint()
            });
          }
        }, 0);
      });

      // Track Core Web Vitals
      this.trackCoreWebVitals();
    }
  }

  // Track Core Web Vitals
  trackCoreWebVitals() {
    // Largest Contentful Paint
    if ('PerformanceObserver' in window) {
      const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];
        this.trackEvent('core_web_vitals', {
          metric: 'lcp',
          value: lastEntry.startTime,
          element: lastEntry.element?.tagName || 'unknown'
        });
      });
      lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });

      // First Input Delay
      const fidObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach(entry => {
          this.trackEvent('core_web_vitals', {
            metric: 'fid',
            value: entry.processingStart - entry.startTime,
            element: entry.target?.tagName || 'unknown'
          });
        });
      });
      fidObserver.observe({ entryTypes: ['first-input'] });

      // Cumulative Layout Shift
      const clsObserver = new PerformanceObserver((list) => {
        let clsValue = 0;
        const entries = list.getEntries();
        entries.forEach(entry => {
          if (!entry.hadRecentInput) {
            clsValue += entry.value;
          }
        });
        this.trackEvent('core_web_vitals', {
          metric: 'cls',
          value: clsValue
        });
      });
      clsObserver.observe({ entryTypes: ['layout-shift'] });
    }
  }

  // Get First Paint time
  getFirstPaint() {
    const paintEntries = performance.getEntriesByType('paint');
    const firstPaint = paintEntries.find(entry => entry.name === 'first-paint');
    return firstPaint ? firstPaint.startTime : null;
  }

  // Get First Contentful Paint time
  getFirstContentfulPaint() {
    const paintEntries = performance.getEntriesByType('paint');
    const firstContentfulPaint = paintEntries.find(entry => entry.name === 'first-contentful-paint');
    return firstContentfulPaint ? firstContentfulPaint.startTime : null;
  }

  // Get Largest Contentful Paint time
  getLargestContentfulPaint() {
    const lcpEntries = performance.getEntriesByType('largest-contentful-paint');
    const lastLcpEntry = lcpEntries[lcpEntries.length - 1];
    return lastLcpEntry ? lastLcpEntry.startTime : null;
  }

  // Set up event listeners for automatic tracking
  setupEventListeners() {
    // Track button clicks
    document.addEventListener('click', (e) => {
      if (e.target.tagName === 'BUTTON' || e.target.closest('button')) {
        const button = e.target.tagName === 'BUTTON' ? e.target : e.target.closest('button');
        this.trackInteraction(button.textContent || button.getAttribute('aria-label') || 'button', 'click', {
          button_id: button.id,
          button_class: button.className
        });
      }
    });

    // Track form submissions
    document.addEventListener('submit', (e) => {
      this.trackInteraction('form', 'submit', {
        form_id: e.target.id,
        form_action: e.target.action
      });
    });

    // Track link clicks
    document.addEventListener('click', (e) => {
      if (e.target.tagName === 'A' || e.target.closest('a')) {
        const link = e.target.tagName === 'A' ? e.target : e.target.closest('a');
        this.trackInteraction('link', 'click', {
          link_href: link.href,
          link_text: link.textContent
        });
      }
    });

    // Track scroll depth
    let maxScrollDepth = 0;
    window.addEventListener('scroll', () => {
      const scrollDepth = Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100);
      if (scrollDepth > maxScrollDepth) {
        maxScrollDepth = scrollDepth;
        if (scrollDepth % 25 === 0) { // Track at 25%, 50%, 75%, 100%
          this.trackEvent('scroll_depth', {
            depth: scrollDepth
          });
        }
      }
    });

    // Track time on page
    let startTime = Date.now();
    window.addEventListener('beforeunload', () => {
      const timeOnPage = Date.now() - startTime;
      this.trackEvent('time_on_page', {
        duration: timeOnPage
      });
    });
  }

  // Send event to analytics endpoint
  async sendEvent(event) {
    try {
      // In production, send to your analytics endpoint
      const endpoint = process.env.VITE_ANALYTICS_ENDPOINT || '/api/analytics';
      
      await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(event)
      });
    } catch (error) {
      console.warn('Failed to send analytics event:', error);
      // Store failed events for retry
      this.storeFailedEvent(event);
    }
  }

  // Store failed events for retry
  storeFailedEvent(event) {
    const failedEvents = JSON.parse(localStorage.getItem('analytics_failed_events') || '[]');
    failedEvents.push(event);
    localStorage.setItem('analytics_failed_events', JSON.stringify(failedEvents.slice(-50))); // Keep last 50
  }

  // Retry failed events
  async retryFailedEvents() {
    const failedEvents = JSON.parse(localStorage.getItem('analytics_failed_events') || '[]');
    if (failedEvents.length === 0) return;

    for (const event of failedEvents) {
      try {
        await this.sendEvent(event);
      } catch (error) {
        console.warn('Failed to retry analytics event:', error);
      }
    }

    localStorage.removeItem('analytics_failed_events');
  }

  // Get analytics data
  getAnalyticsData() {
    return {
      session_id: this.sessionId,
      user_id: this.userId,
      events: this.events,
      stats: this.getStats()
    };
  }

  // Get analytics statistics
  getStats() {
    const eventCounts = {};
    this.events.forEach(event => {
      eventCounts[event.event_name] = (eventCounts[event.event_name] || 0) + 1;
    });

    return {
      total_events: this.events.length,
      event_counts: eventCounts,
      session_duration: Date.now() - this.sessionStartTime
    };
  }

  // Enable/disable analytics
  setEnabled(enabled) {
    this.isEnabled = enabled;
    localStorage.setItem('analytics_enabled', enabled.toString());
  }

  // Clear analytics data
  clearData() {
    this.events = [];
    localStorage.removeItem('analytics_user_id');
    localStorage.removeItem('analytics_failed_events');
  }

  // Track specific app events
  trackAppEvent(eventName, properties = {}) {
    this.trackEvent(`app_${eventName}`, {
      app_version: process.env.VITE_APP_VERSION || '1.0.0',
      ...properties
    });
  }

  // Track download events
  trackDownload(platform, version) {
    this.trackAppEvent('download', {
      platform: platform,
      version: version
    });
  }

  // Track authentication events
  trackAuth(provider, action) {
    this.trackAppEvent('auth', {
      provider: provider,
      action: action
    });
  }

  // Track feature discovery
  trackFeatureDiscovery(feature) {
    this.trackAppEvent('feature_discovery', {
      feature: feature
    });
  }
}

// Create singleton instance
const analyticsService = new AnalyticsService();

export default analyticsService; 