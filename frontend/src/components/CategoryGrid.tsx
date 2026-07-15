'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

const categories = [
  { name: 'T-Shirts', slug: 't-shirts', count: '12+ designs', image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&q=80' },
  { name: 'Hoodies', slug: 'hoodies', count: '8+ designs', image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&q=80' },
  { name: 'Caps', slug: 'caps', count: '6+ designs', image: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=400&q=80' },
  { name: 'Wall Art', slug: 'wall-art', count: '10+ designs', image: 'https://images.unsplash.com/photo-1513519245088-0e12902e35ca?w=400&q=80' },
  { name: 'Mugs', slug: 'mugs', count: '5+ designs', image: 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=400&q=80' },
  { name: 'Phone Cases', slug: 'phone-cases', count: '4+ designs', image: 'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=400&q=80' },
  { name: 'Bags', slug: 'bags', count: '3+ designs', image: 'https://images.unsplash.com/photo-1597484661643-2f5fef640dd1?w=400&q=80' },
  { name: 'Posters', slug: 'posters', count: '7+ designs', image: 'https://images.unsplash.com/photo-1564934422807-3a2df1a4afa5?w=400&q=80' },
];

export default function CategoryGrid() {
  return (
    <section className="py-16 sm:py-20 bg-zinc-50/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h2 className="section-title">Shop by Category</h2>
          <p className="section-subtitle mx-auto">Find the perfect canvas for your creativity.</p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
            >
              <Link href={`/products?category=${cat.slug}`}
                className="group relative block rounded-2xl overflow-hidden aspect-[4/3] card-hover"
              >
                <img src={cat.image} alt={cat.name}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="text-white font-semibold text-base">{cat.name}</h3>
                  <p className="text-white/60 text-xs mt-0.5">{cat.count}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}