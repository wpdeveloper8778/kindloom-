'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import ProductCard from './ProductCard';

interface FeaturedProductsProps {
  products: any[];
  loading: boolean;
}

export default function FeaturedProducts({ products, loading }: FeaturedProductsProps) {
  return (
    <section className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-end justify-between mb-12"
        >
          <div>
            <span className="text-brand-400 text-sm font-medium tracking-widest uppercase">Collection</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mt-2">Featured Products</h2>
            <p className="text-zinc-400 mt-2 max-w-xl">Our most popular designs, ready for your personal touch.</p>
          </div>
          <Link
            href="/products"
            className="hidden sm:flex items-center gap-2 text-sm text-zinc-400 hover:text-brand-400 transition-colors group"
          >
            View All
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>

        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="aspect-square rounded-2xl bg-zinc-900 animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {products.map((product, i) => (
              <ProductCard key={product._id} product={product} index={i} />
            ))}
          </div>
        )}

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-12 text-center sm:hidden"
        >
          <Link
            href="/products"
            className="inline-flex items-center gap-2 text-sm text-brand-400"
          >
            View All Products
            <ArrowRight size={16} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
