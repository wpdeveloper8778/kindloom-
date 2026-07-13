'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Shirt, Home, Coffee, Smartphone, ShoppingBag, Image } from 'lucide-react';

const categories = [
  { name: 'T-Shirts', slug: 't-shirts', icon: Shirt, desc: 'Classic & performance tees' },
  { name: 'Hoodies', slug: 'hoodies', icon: Shirt, desc: 'Premium fleece & heavyweights' },
  { name: 'Caps', slug: 'caps', icon: ShoppingBag, desc: 'Structured & snapback' },
  { name: 'Wall Art', slug: 'wall-art', icon: Home, desc: 'Canvas prints & posters' },
  { name: 'Mugs', slug: 'mugs', icon: Coffee, desc: 'Ceramic & enamel' },
  { name: 'Phone Cases', slug: 'phone-cases', icon: Smartphone, desc: 'Impact-resistant' },
  { name: 'Bags', slug: 'bags', icon: ShoppingBag, desc: 'Canvas totes & backpacks' },
  { name: 'Posters', slug: 'posters', icon: Image, desc: 'Archival quality prints' },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.05 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export default function CategoryGrid() {
  return (
    <section className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-brand-400 text-sm font-medium tracking-widest uppercase">Categories</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mt-2">What Do You Want to Create?</h2>
          <p className="text-zinc-400 mt-2">Choose your product and make it yours.</p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-4"
        >
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <motion.div key={cat.slug} variants={item}>
                <Link
                  href={`/products?category=${cat.slug}`}
                  className="group block p-6 rounded-2xl glass hover:bg-white/[0.08] transition-all border border-white/[0.06] hover:border-brand-500/30"
                >
                  <div className="w-12 h-12 rounded-xl bg-brand-500/10 flex items-center justify-center mb-4 group-hover:bg-brand-500/20 transition-colors">
                    <Icon size={22} className="text-brand-400" />
                  </div>
                  <h3 className="text-white font-semibold group-hover:text-brand-400 transition-colors">{cat.name}</h3>
                  <p className="text-xs text-zinc-500 mt-1">{cat.desc}</p>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
