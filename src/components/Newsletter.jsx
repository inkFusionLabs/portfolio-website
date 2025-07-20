import React, { useState } from 'react';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle, loading, success, error

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');

    // Simulate API call
    setTimeout(() => {
      if (email && email.includes('@')) {
        setStatus('success');
        setEmail('');
        setTimeout(() => setStatus('idle'), 3000);
      } else {
        setStatus('error');
        setTimeout(() => setStatus('idle'), 3000);
      }
    }, 1000);
  };

  return (
    <div className="tech-stack mb-12">
      <div className="text-center">
        <h3 className="text-3xl font-bold mb-4 text-teal-400">
          📧 Stay Updated
        </h3>
        <p className="text-lg opacity-80 mb-6">
          Get notified about new features, updates, and releases
        </p>

        <form onSubmit={handleSubmit} className="max-w-md mx-auto">
          <div className="flex gap-2 mb-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              className="flex-1 px-4 py-3 rounded-full bg-white/10 border border-white/30 backdrop-blur-md text-white placeholder-white/60 focus:outline-none focus:border-teal-400 transition-colors"
              required
            />
            <button
              type="submit"
              disabled={status === 'loading'}
              className="btn btn-primary px-6 py-3 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {status === 'loading' ? '⏳' : 'Subscribe'}
            </button>
          </div>

          {status === 'success' && (
            <p className="text-green-400 text-sm">✅ Thanks for subscribing! We'll keep you updated.</p>
          )}
          {status === 'error' && (
            <p className="text-red-400 text-sm">❌ Please enter a valid email address.</p>
          )}
        </form>

        <p className="text-xs opacity-60 mt-4">
          We respect your privacy. Unsubscribe at any time.
        </p>
      </div>
    </div>
  );
};

export default Newsletter; 