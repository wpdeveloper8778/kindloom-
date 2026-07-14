'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Truck, Palette, ShieldCheck } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <div className="grid lg:grid-cols-3 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2 relative overflow-hidden rounded-2xl bg-linear-to-br from-brand-500 to-brand-700 p-8 sm:p-12 lg:p-16 text-white"
          >
            <div className="relative z-10 max-w-xl">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-white text-xs font-semibold mb-4">
                <Palette size={12} /> Print on Demand
              </span>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-4">
                Your Design.<br />Our Quality.
              </h1>
              <p className="text-white/80 text-base sm:text-lg mb-6 leading-relaxed">
                Premium custom apparel and accessories. Upload your artwork or add text — we print on demand with eco-friendly inks.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  href="/products"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white text-brand-600 font-semibold hover:bg-zinc-100 transition-all"
                >
                  Start Designing <ArrowRight size={16} />
                </Link>
                <Link
                  href="/products?category=hoodies"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white/10 text-white font-semibold hover:bg-white/20 transition-all"
                >
                  Shop Hoodies
                </Link>
              </div>
            </div>
            <div className="absolute -bottom-6 -right-6 w-48 h-48 sm:w-64 sm:h-64 rounded-full bg-white/5" />
            <div className="absolute -bottom-12 -right-12 w-32 h-32 rounded-full bg-white/5" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-1 gap-4"
          >
            <Link href="/products?category=t-shirts" className="group relative overflow-hidden rounded-2xl bg-zinc-50 p-6 hover:bg-zinc-100 transition-colors border border-zinc-200">
              <p className="text-xs text-zinc-500 font-medium uppercase tracking-wider">🔥 Extra Sale</p>
              <p className="text-lg font-bold text-zinc-800 mt-1">30% off</p>
              <p className="text-xs text-zinc-500 mt-1">T-Shirts & Hoodies</p>
              <span className="inline-flex items-center gap-1 text-xs text-brand-500 font-medium mt-3 group-hover:gap-2 transition-all">
                Shop now <ArrowRight size={12} />
              </span>
            </Link>
            <Link href="/products?category=caps" className="group relative overflow-hidden rounded-2xl bg-zinc-50 p-6 hover:bg-zinc-100 transition-colors border border-zinc-200">
              <p className="text-xs text-zinc-500 font-medium uppercase tracking-wider">🚚 Free</p>
              <p className="text-lg font-bold text-zinc-800 mt-1">Delivery</p>
              <p className="text-xs text-zinc-500 mt-1">On orders over $50</p>
              <span className="inline-flex items-center gap-1 text-xs text-brand-500 font-medium mt-3 group-hover:gap-2 transition-all">
                Shop now <ArrowRight size={12} />
              </span>
            </Link>
            <Link href="/products?category=wall-art" className="group relative overflow-hidden rounded-2xl bg-zinc-50 p-6 hover:bg-zinc-100 transition-colors border border-zinc-200">
              <p className="text-xs text-zinc-500 font-medium uppercase tracking-wider">🛡️ Custom</p>
              <p className="text-lg font-bold text-zinc-800 mt-1">Wall Art</p>
              <p className="text-xs text-zinc-500 mt-1">Upload your design</p>
              <span className="inline-flex items-center gap-1 text-xs text-brand-500 font-medium mt-3 group-hover:gap-2 transition-all">
                Get it now <ArrowRight size={12} />
              </span>
            </Link>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4"
        >
          {[
            { icon: Palette, label: 'Custom Designs', desc: 'Upload your artwork' },
            { icon: Truck, label: 'Free Shipping', desc: 'On orders over $50' },
            { icon: ShieldCheck, label: 'Quality Guarantee', desc: '30-day guarantee' },
            { icon: ShieldCheck, label: 'Eco-Friendly', desc: 'Sustainable materials' },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-zinc-50 border border-zinc-200">
              <div className="w-9 h-9 rounded-lg bg-brand-50 flex items-center justify-center shrink-0">
                <item.icon size={16} className="text-brand-500" />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-semibold text-zinc-700">{item.label}</p>
                <p className="text-[10px] text-zinc-500">{item.desc}</p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
