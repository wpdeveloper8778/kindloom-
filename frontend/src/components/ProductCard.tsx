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
  const onSale = product.compareAtPrice > product.basePrice;
  if (onSale) badges.push({ label: 'Sale', className: 'badge-sale' });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
    >
      <Link href={`/products/${product.slug}`} className="group block">
        <div className="relative aspect-square rounded-xl overflow-hidden bg-zinc-100 border border-zinc-200 mb-3">
          <img
            src={product.images?.[0]}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors" />

          <div className="absolute top-2 left-2 flex flex-wrap gap-1.5">
            {badges.map(b => (
              <span key={b.label} className={b.className}>{b.label}</span>
            ))}
          </div>

          <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <button className="p-2 rounded-full bg-white/90 text-zinc-600 hover:text-brand-500 hover:bg-white shadow-sm">
              <Heart size={15} />
            </button>
          </div>

          <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-white/90 via-white/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
            <span className="inline-flex items-center text-xs font-semibold text-brand-600 gap-1">
              Personalize <Star size={12} />
            </span>
          </div>
        </div>
        <div>
          <p className="text-[11px] text-zinc-500 uppercase tracking-wider">{product.category?.replace('-', ' ')}</p>
          <h3 className="text-sm font-semibold text-zinc-800 group-hover:text-brand-500 transition-colors mt-0.5">
            {product.name}
          </h3>
          <div className="flex items-center gap-1.5 mt-1">
            <Star size={11} className="text-brand-500 fill-brand-500" />
            <span className="text-xs text-zinc-600">{product.rating || '4.5'}</span>
            <span className="text-xs text-zinc-400">({product.reviewCount || '0'})</span>
          </div>
          <div className="flex items-center gap-2 mt-2">
            <span className="text-sm font-bold text-zinc-800">${product.basePrice}</span>
            {onSale && (
              <span className="text-xs text-zinc-400 line-through">${product.compareAtPrice}</span>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
