'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Star, Heart } from 'lucide-react';

interface ProductCardProps {
  product: any;
  index: number;
}

export default function ProductCard({ product, index }: ProductCardProps) {
  const badges: { label: string; className: string }[] = [];
  if (product.bestseller) badges.push({ label: 'Best Seller', className: 'badge-best' });
  if (product.featured) badges.push({ label: 'New', className: 'badge-new' });
  if (product.compareAtPrice > product.basePrice) badges.push({ label: 'Sale', className: 'badge-sale' });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
    >
      <Link href={`/products/${product.slug}`} className="group block card-hover overflow-hidden">
        <div className="relative aspect-square bg-zinc-100 overflow-hidden">
          <img src={product.images?.[0]} alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors" />
          <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
            {badges.map(b => (
              <span key={b.label} className={b.className}>{b.label}</span>
            ))}
          </div>
          <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300">
            <button className="p-2 rounded-full bg-white/90 text-zinc-600 hover:text-brand-500 hover:bg-white shadow-sm">
              <Heart size={15} />
            </button>
          </div>
          <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-white/90 via-white/40 to-transparent translate-y-2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
            <span className="inline-flex items-center text-xs font-semibold text-brand-600 gap-1">
              <Star size={12} /> Personalize
            </span>
          </div>
        </div>
        <div className="p-4">
          <p className="text-[11px] text-zinc-400 uppercase tracking-wider font-medium">{product.category?.replace('-', ' ')}</p>
          <h3 className="text-sm font-semibold text-zinc-800 group-hover:text-brand-500 transition-colors mt-0.5 leading-snug">{product.name}</h3>
          <div className="flex items-center gap-1.5 mt-1.5">
            <Star size={11} className="text-amber-400 fill-amber-400" />
            <span className="text-xs text-zinc-600 font-medium">{product.rating || '4.5'}</span>
            <span className="text-xs text-zinc-400">({product.reviewCount || 0})</span>
          </div>
          <div className="flex items-center gap-2 mt-2.5">
            <span className="text-sm font-bold text-zinc-900">${product.basePrice}</span>
            {product.compareAtPrice > product.basePrice && (
              <span className="text-xs text-zinc-400 line-through">${product.compareAtPrice}</span>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}