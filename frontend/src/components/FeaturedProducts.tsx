'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

import ProductCard from './ProductCard';

interface FeaturedProductsProps {
  products: any[];
  loading: boolean;
}

export default function FeaturedProducts({ products, loading }: FeaturedProductsProps) {
  return (
    <section className="py-16 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-end justify-between mb-10"
        >
          <div>
            <h2 className="section-title">Featured Products</h2>
            <p className="section-subtitle">Our most popular designs, ready for your personal touch.</p>
          </div>
          <Link href="/products"
            className="hidden sm:flex items-center gap-2 text-sm text-brand-500 hover:text-brand-600 transition-colors font-medium"
          >
            View All <svg width={15} height={15} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
          </Link>
        </motion.div>

        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="aspect-square rounded-2xl bg-zinc-100 animate-pulse" />
            ))}
          </div>
        ) : products.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {products.map((product, i) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-zinc-400">No featured products available yet.</p>
          </div>
        )}

        <div className="mt-10 text-center sm:hidden">
          <Link href="/products" className="btn-primary text-sm">
            View All Products <svg width={15} height={15} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
          </Link>
        </div>
      </div>
    </section>
  );
}