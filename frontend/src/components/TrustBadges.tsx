'use client';

import { motion } from 'framer-motion';
import { ShieldCheck, Truck, RotateCcw, Headphones } from 'lucide-react';

const badges = [
  { icon: ShieldCheck, label: 'Secure Checkout', desc: 'SSL encrypted' },
  { icon: Truck, label: 'Free Shipping', desc: 'Over $50' },
  { icon: RotateCcw, label: 'Easy Returns', desc: '30-day guarantee' },
  { icon: Headphones, label: '24/7 Support', desc: 'Email & chat' },
];

export default function TrustBadges() {
  return (
    <section className="py-10 border-t border-zinc-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {badges.map((badge, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex items-center gap-3 justify-center sm:justify-start p-3"
            >
              <div className="w-10 h-10 rounded-xl bg-brand-50 flex items-center justify-center shrink-0">
                <badge.icon size={18} className="text-brand-500" />
              </div>
              <div>
                <p className="text-sm font-semibold text-zinc-700">{badge.label}</p>
                <p className="text-xs text-zinc-500">{badge.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
