'use client';

import { motion } from 'framer-motion';
import { ShieldCheck, Truck, Palette, Leaf } from 'lucide-react';

const badges = [
  { icon: Palette, title: 'Custom Designs', desc: 'Upload your artwork or add text' },
  { icon: Truck, title: 'Free Shipping', desc: 'On orders over $50' },
  { icon: ShieldCheck, title: 'Quality Guarantee', desc: '30-day satisfaction guarantee' },
  { icon: Leaf, title: 'Eco-Friendly', desc: 'Water-based inks & sustainable materials' },
];

export default function TrustBadges() {
  return (
    <section className="py-16 border-y border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {badges.map((badge, i) => {
            const Icon = badge.icon;
            return (
              <motion.div
                key={badge.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <div className="w-14 h-14 rounded-2xl bg-brand-500/10 flex items-center justify-center mx-auto mb-4">
                  <Icon size={24} className="text-brand-400" />
                </div>
                <h4 className="text-sm font-semibold text-white mb-1">{badge.title}</h4>
                <p className="text-xs text-zinc-500">{badge.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
