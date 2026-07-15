'use client';

import { motion } from 'framer-motion';
import { ShieldCheck, Truck, RotateCcw, Headphones } from 'lucide-react';

const badges = [
  { icon: ShieldCheck, label: 'Secure Checkout', desc: 'SSL encrypted payment' },
  { icon: Truck, label: 'Free Shipping', desc: 'On orders over $50' },
  { icon: RotateCcw, label: 'Easy Returns', desc: '30-day satisfaction' },
  { icon: Headphones, label: '24/7 Support', desc: 'We are here to help' },
];

export default function TrustBadges() {
  return (
    <section className="py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {badges.map((badge, i) => (
            <motion.div
              key={badge.label}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="flex items-center gap-4 p-4 rounded-2xl bg-zinc-50/70 border border-zinc-200/60"
            >
              <div className="w-11 h-11 rounded-xl bg-brand-50 flex items-center justify-center shrink-0">
                <badge.icon size={20} className="text-brand-500" />
              </div>
              <div>
                <p className="text-sm font-semibold text-zinc-800">{badge.label}</p>
                <p className="text-xs text-zinc-500">{badge.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}