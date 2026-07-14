'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send } from 'lucide-react';

export default function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  };

  if (subscribed) {
    return (
      <section className="py-16 bg-brand-500">
        <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-white text-xl font-semibold">Thanks for subscribing! 🎉</p>
          <p className="text-white/80 mt-1">Stay tuned for exclusive deals.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-brand-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-xl mx-auto text-center"
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-white">Join the Kindloom Club</h2>
          <p className="text-white/80 mt-2 mb-6">
            Subscribe for exclusive deals, new arrivals, and 15% off your first order!
          </p>
          <form onSubmit={handleSubmit} className="flex gap-2 sm:gap-3">
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="flex-1 px-4 py-3 rounded-xl border-0 text-sm text-zinc-800 bg-white placeholder-zinc-400 focus:ring-2 focus:ring-white/50 outline-none"
            />
            <button
              type="submit"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-zinc-900 text-white text-sm font-semibold hover:bg-zinc-800 transition-colors"
            >
              Subscribe <Send size={14} />
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
