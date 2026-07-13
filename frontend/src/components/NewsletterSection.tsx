'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export default function NewsletterSection() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-brand-900/10 via-zinc-950 to-zinc-950" />
      <div className="relative max-w-2xl mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Stay in the Loop
          </h2>
          <p className="text-zinc-400 mb-8">
            Get early access to new designs, exclusive drops, and 10% off your first order.
          </p>
          <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto" onSubmit={e => e.preventDefault()}>
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-5 py-3.5 rounded-xl glass text-white placeholder-zinc-500 focus:outline-none focus:border-brand-500/50 transition-colors"
            />
            <button
              type="submit"
              className="px-6 py-3.5 rounded-xl bg-linear-to-r from-brand-500 to-brand-600 text-white font-semibold hover:from-brand-600 hover:to-brand-700 transition-all flex items-center justify-center gap-2"
            >
              Subscribe <ArrowRight size={16} />
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
