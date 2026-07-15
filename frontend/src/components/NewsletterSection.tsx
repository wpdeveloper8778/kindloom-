'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Sparkles } from 'lucide-react';

export default function NewsletterSection() {
  const [email, setEmail] = useState('');

  return (
    <section className="py-16 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-500 to-brand-700 p-8 sm:p-12 text-center"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />
          
          <div className="relative z-10 max-w-lg mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/15 text-white text-xs font-medium mb-5 backdrop-blur-sm">
              <Sparkles size={12} /> Stay Inspired
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">Get Design Inspiration</h2>
            <p className="text-white/70 text-sm sm:text-base mb-6">
              Subscribe to our newsletter for exclusive deals, design tips, and new product drops.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-1 px-5 py-3 rounded-xl bg-white/15 text-white placeholder-white/40 border border-white/20 focus:outline-none focus:ring-2 focus:ring-white/30 backdrop-blur-sm text-sm"
              />
              <button className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white text-brand-600 font-semibold hover:bg-zinc-100 transition-all text-sm whitespace-nowrap">
                Subscribe <Send size={15} />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}