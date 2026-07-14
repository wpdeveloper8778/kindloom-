'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

const categories = [
  { name: 'T-Shirts', slug: 't-shirts', count: 15, img: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400' },
  { name: 'Caps', slug: 'caps', count: 18, img: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=400' },
  { name: 'Hoodies', slug: 'hoodies', count: 9, img: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400' },
  { name: 'Wall Art', slug: 'wall-art', count: 6, img: 'https://images.unsplash.com/photo-1513519245088-0e12902e35ca?w=400' },
  { name: 'Mugs', slug: 'mugs', count: 8, img: 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=400' },
  { name: 'Phone Cases', slug: 'phone-cases', count: 12, img: 'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=400' },
  { name: 'Bags', slug: 'bags', count: 8, img: 'https://images.unsplash.com/photo-1597484661643-2f5fef640dd1?w=400' },
  { name: 'Posters', slug: 'posters', count: 6, img: 'https://images.unsplash.com/photo-1564934422807-3a2df1a4afa5?w=400' },
];

export default function CategoryGrid() {
  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10"
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-zinc-800">Shopping by Categories</h2>
          <p className="text-zinc-500 mt-1">Find exactly what you&apos;re looking for.</p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-4">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
            >
              <Link
                href={`/products?category=${cat.slug}`}
                className="group block relative overflow-hidden rounded-2xl bg-zinc-50 border border-zinc-200 hover:border-brand-200 hover:shadow-md transition-all"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={cat.img}
                    alt={cat.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3">
                    <h3 className="text-white font-semibold text-sm">{cat.name}</h3>
                    <p className="text-white/70 text-xs">{cat.count} items</p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
