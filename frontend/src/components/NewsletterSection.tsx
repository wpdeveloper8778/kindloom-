'use client';

import { useState } from 'react';


export default function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  return (
    <section className="py-20 bg-dark relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute -top-20 -left-20 w-80 h-80 bg-brand-500 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-brand-500 rounded-full blur-3xl" />
      </div>
      <div className="max-w-2xl mx-auto px-4 text-center relative">
        <p className="text-brand-500 font-semibold text-sm tracking-widest uppercase mb-2">Newsletter</p>
        <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">Subscribe for the updates!</h3>
        <p className="text-gray-400 mb-8">Stay in the loop with exclusive deals, new designs, and printing tips.</p>
        <form onSubmit={handleSubmit} className="flex max-w-md mx-auto gap-3">
          <input
            type="email"
            required
            placeholder="Your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 px-5 py-3.5 rounded-full bg-white/10 border border-white/20 text-white placeholder-gray-400 outline-none focus:border-brand-500/50 transition-colors"
          />
          <button
            type="submit"
            className="bg-brand-500 text-white px-6 py-3.5 rounded-full font-semibold hover:bg-brand-600 transition-all flex items-center gap-2 shrink-0"
          >
            <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
            {subscribed ? 'Subscribed!' : 'Subscribe'}
          </button>
        </form>
      </div>
    </section>
  );
}
