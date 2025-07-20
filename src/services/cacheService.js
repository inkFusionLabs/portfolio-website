// Cache Service for Performance Optimization
class CacheService {
  constructor() {
    this.cache = new Map();
    this.storagePrefix = 'omnifusion_cache_';
    this.maxAge = 24 * 60 * 60 * 1000; // 24 hours default
  }

  // Set cache item with expiration
  set(key, value, maxAge = this.maxAge) {
    const item = {
      value,
      timestamp: Date.now(),
      maxAge
    };
    
    this.cache.set(key, item);
    
    // Also store in localStorage for persistence
    try {
      localStorage.setItem(
        this.storagePrefix + key,
        JSON.stringify(item)
      );
    } catch (error) {
      console.warn('Failed to store cache in localStorage:', error);
    }
  }

  // Get cache item
  get(key) {
    // Check memory cache first
    const memoryItem = this.cache.get(key);
    if (memoryItem && !this.isExpired(memoryItem)) {
      return memoryItem.value;
    }

    // Check localStorage
    try {
      const storedItem = localStorage.getItem(this.storagePrefix + key);
      if (storedItem) {
        const item = JSON.parse(storedItem);
        if (!this.isExpired(item)) {
          // Restore to memory cache
          this.cache.set(key, item);
          return item.value;
        } else {
          // Remove expired item
          localStorage.removeItem(this.storagePrefix + key);
        }
      }
    } catch (error) {
      console.warn('Failed to retrieve cache from localStorage:', error);
    }

    return null;
  }

  // Check if cache item is expired
  isExpired(item) {
    return Date.now() - item.timestamp > item.maxAge;
  }

  // Remove cache item
  remove(key) {
    this.cache.delete(key);
    try {
      localStorage.removeItem(this.storagePrefix + key);
    } catch (error) {
      console.warn('Failed to remove cache from localStorage:', error);
    }
  }

  // Clear all cache
  clear() {
    this.cache.clear();
    
    // Clear localStorage cache
    try {
      const keys = Object.keys(localStorage);
      keys.forEach(key => {
        if (key.startsWith(this.storagePrefix)) {
          localStorage.removeItem(key);
        }
      });
    } catch (error) {
      console.warn('Failed to clear localStorage cache:', error);
    }
  }

  // Get cache statistics
  getStats() {
    const memorySize = this.cache.size;
    let storageSize = 0;
    
    try {
      const keys = Object.keys(localStorage);
      storageSize = keys.filter(key => key.startsWith(this.storagePrefix)).length;
    } catch (error) {
      console.warn('Failed to get storage cache stats:', error);
    }

    return {
      memoryItems: memorySize,
      storageItems: storageSize,
      totalItems: memorySize + storageSize
    };
  }

  // Preload critical resources
  async preloadResources(resources) {
    const promises = resources.map(async (resource) => {
      try {
        if (resource.type === 'image') {
          return this.preloadImage(resource.url);
        } else if (resource.type === 'script') {
          return this.preloadScript(resource.url);
        } else if (resource.type === 'style') {
          return this.preloadStyle(resource.url);
        }
      } catch (error) {
        console.warn(`Failed to preload ${resource.url}:`, error);
      }
    });

    await Promise.allSettled(promises);
  }

  // Preload image
  preloadImage(url) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(url);
      img.onerror = () => reject(new Error(`Failed to load image: ${url}`));
      img.src = url;
    });
  }

  // Preload script
  preloadScript(url) {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.onload = () => resolve(url);
      script.onerror = () => reject(new Error(`Failed to load script: ${url}`));
      script.src = url;
      document.head.appendChild(script);
    });
  }

  // Preload style
  preloadStyle(url) {
    return new Promise((resolve, reject) => {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.onload = () => resolve(url);
      link.onerror = () => reject(new Error(`Failed to load style: ${url}`));
      link.href = url;
      document.head.appendChild(link);
    });
  }

  // Cache API responses
  async cacheApiResponse(key, apiCall, maxAge = this.maxAge) {
    const cached = this.get(key);
    if (cached) {
      return cached;
    }

    try {
      const response = await apiCall();
      this.set(key, response, maxAge);
      return response;
    } catch (error) {
      console.error('API call failed:', error);
      throw error;
    }
  }

  // Cache with background refresh
  async cacheWithRefresh(key, apiCall, maxAge = this.maxAge) {
    const cached = this.get(key);
    
    if (cached) {
      // Refresh in background if cache is older than half the max age
      const item = this.cache.get(key);
      if (item && Date.now() - item.timestamp > maxAge / 2) {
        this.refreshInBackground(key, apiCall, maxAge);
      }
      return cached;
    }

    return this.cacheApiResponse(key, apiCall, maxAge);
  }

  // Refresh cache in background
  async refreshInBackground(key, apiCall, maxAge) {
    try {
      const response = await apiCall();
      this.set(key, response, maxAge);
    } catch (error) {
      console.warn('Background refresh failed:', error);
    }
  }

  // Service Worker cache management
  async registerServiceWorker() {
    if ('serviceWorker' in navigator) {
      try {
        const registration = await navigator.serviceWorker.register('/sw.js');
        console.log('Service Worker registered:', registration);
        return registration;
      } catch (error) {
        console.warn('Service Worker registration failed:', error);
      }
    }
  }

  // Initialize cache service
  async init() {
    // Register service worker
    await this.registerServiceWorker();
    
    // Preload critical resources
    const criticalResources = [
      { type: 'image', url: '/favicon.svg' },
      { type: 'image', url: '/og-image.svg' }
    ];
    
    await this.preloadResources(criticalResources);
    
    // Clean up expired cache items
    this.cleanup();
    
    console.log('Cache service initialized');
  }

  // Cleanup expired cache items
  cleanup() {
    const now = Date.now();
    
    // Clean memory cache
    for (const [key, item] of this.cache.entries()) {
      if (this.isExpired(item)) {
        this.cache.delete(key);
      }
    }
    
    // Clean localStorage cache
    try {
      const keys = Object.keys(localStorage);
      keys.forEach(key => {
        if (key.startsWith(this.storagePrefix)) {
          const storedItem = localStorage.getItem(key);
          if (storedItem) {
            const item = JSON.parse(storedItem);
            if (this.isExpired(item)) {
              localStorage.removeItem(key);
            }
          }
        }
      });
    } catch (error) {
      console.warn('Failed to cleanup localStorage cache:', error);
    }
  }
}

// Create singleton instance
const cacheService = new CacheService();

export default cacheService; 