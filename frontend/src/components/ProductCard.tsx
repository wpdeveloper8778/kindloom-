'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Star, Heart } from 'lucide-react';

interface ProductCardProps {
  product: any;
  index: number;
}

export default function ProductCard({ product, index }: ProductCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Link href={`/products/${product.slug}`} className="group block">
        <div className="relative aspect-square rounded-2xl overflow-hidden bg-zinc-900 mb-4">
          <img
            src={product.images?.[0]}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
          {product.bestseller && (
            <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-brand-500 text-white text-xs font-semibold">
              Bestseller
            </span>
          )}
          <button className="absolute top-3 right-3 p-2 rounded-full bg-black/50 text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-brand-500">
            <Heart size={16} />
          </button>
          <div className="absolute bottom-3 left-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <span className="px-3 py-1.5 rounded-lg bg-white/10 backdrop-blur-md text-white text-xs font-medium">
              Quick View
            </span>
          </div>
        </div>
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-sm font-medium text-white group-hover:text-brand-400 transition-colors">
              {product.name}
            </h3>
            <p className="text-xs text-zinc-500 mt-0.5 capitalize">{product.category?.replace('-', ' ')}</p>
          </div>
          <div className="text-right">
            <span className="text-sm font-semibold text-white">${product.basePrice}</span>
            {product.colors && (
              <div className="flex gap-1 mt-1 justify-end">
                {product.colors.slice(0, 4).map((c: any) => (
                  <span
                    key={c.hex}
                    className="w-3 h-3 rounded-full border border-white/10"
                    style={{ backgroundColor: c.hex }}
                  />
                ))}
                {product.colors.length > 4 && (
                  <span className="text-[10px] text-zinc-500">+{product.colors.length - 4}</span>
                )}
              </div>
            )}
          </div>
        </div>
        {product.rating > 0 && (
          <div className="flex items-center gap-1.5 mt-2">
            <Star size={12} className="text-brand-500 fill-brand-500" />
            <span className="text-xs text-zinc-400">{product.rating}</span>
            <span className="text-xs text-zinc-600">({product.reviewCount})</span>
          </div>
        )}
      </Link>
    </motion.div>
  );
}
