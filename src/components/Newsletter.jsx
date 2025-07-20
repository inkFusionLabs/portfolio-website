import React, { useState } from 'react';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, you'd send this to your backend
    console.log('Newsletter subscription:', email);
    setIsSubscribed(true);
    setEmail('');
  };

  return (
    <section className="py-12 bg-gradient-to-b from-black to-gray-900 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-pink-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
          Stay Updated
        </h2>
        <p className="text-white/70 mb-6 max-w-xl mx-auto">
          Get the latest updates about new features, releases, and music streaming tips delivered to your inbox.
        </p>

        {!isSubscribed ? (
          <form onSubmit={handleSubmit} className="max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                required
                className="flex-1 px-4 py-3 bg-white/10 backdrop-blur-md text-white placeholder-white/50 rounded-lg border border-white/20 focus:outline-none focus:border-white/40 transition-colors"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/25"
              >
                Subscribe
              </button>
            </div>
          </form>
        ) : (
          <div className="bg-green-500/20 backdrop-blur-md rounded-lg p-4 border border-green-500/30 max-w-md mx-auto">
            <p className="text-green-400 font-semibold">🎉 Thanks for subscribing!</p>
            <p className="text-green-300 text-sm mt-1">You'll receive updates about OmniFusion Music soon.</p>
          </div>
        )}

        <p className="text-white/50 text-xs mt-4">
          We respect your privacy. Unsubscribe at any time.
        </p>
      </div>
    </section>
  );
};

export default Newsletter; 