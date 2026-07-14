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
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-end justify-between mb-8"
        >
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-zinc-800">Featured Products</h2>
            <p className="text-zinc-500 mt-1">Our most popular designs, ready for your personal touch.</p>
          </div>
          <Link
            href="/products"
            className="hidden sm:flex items-center gap-2 text-sm text-brand-500 hover:text-brand-600 transition-colors font-medium"
          >
            View All <ArrowRight size={15} />
          </Link>
        </motion.div>

        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="aspect-square rounded-xl bg-zinc-100 animate-pulse" />
            ))}
          </div>
        ) : products.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {products.map((product, i) => (
              <ProductCard key={product._id} product={product} index={i} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-zinc-400">No featured products available yet.</p>
          </div>
        )}

        <div className="mt-10 text-center sm:hidden">
          <Link href="/products" className="inline-flex items-center gap-2 text-sm font-medium text-brand-500">
            View All Products <ArrowRight size={15} />
          </Link>
        </div>
      </div>
    </section>
  );
}
