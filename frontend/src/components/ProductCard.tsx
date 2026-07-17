'use client';

import Link from 'next/link';

import { useCart } from '@/context/CartContext';

interface Product {
  _id?: string;
  slug: string;
  title?: { en: string; ar: string };
  name?: string;
  price: number;
  comparePrice?: number;
  images: string[];
  image?: string;
  rating?: number;
  reviewCount?: number;
  inStock?: boolean;
}

export default function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();
  const title = product.title?.en || product.name || 'Product';
  const image = product.images?.[0] || product.image || '';
  const rating = product.rating || 0;
  const reviewCount = product.reviewCount || 0;

  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-brand-500/20 hover:shadow-lg transition-all hover:-translate-y-1 group">
      <Link href={`/products/${product.slug}`} className="block">
        <div className="aspect-square bg-gray-50 overflow-hidden">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>
      </Link>
      <div className="p-4">
        <Link href={`/products/${product.slug}`}>
          <h3 className="font-semibold text-sm text-dark mb-1 line-clamp-2 min-h-[2.5rem] group-hover:text-brand-500 transition-colors">
            {title}
          </h3>
        </Link>
        {rating > 0 && (
          <div className="flex items-center gap-1 mb-2">
            <svg width={14} height={14} viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="fill-brand-500 text-brand-500"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
            <span className="text-xs text-gray-500">{rating} ({reviewCount})</span>
          </div>
        )}
        <div className="flex items-center justify-between">
          <div>
            <span className="font-bold text-lg text-dark">${product.price.toFixed(2)}</span>
            {product.comparePrice && (
              <span className="text-gray-400 text-xs line-through ml-2">${product.comparePrice.toFixed(2)}</span>
            )}
          </div>
          <button
            onClick={() =>
              addItem({
                productId: product._id || product.slug,
                slug: product.slug,
                title,
                price: product.price,
                quantity: 1,
                image,
              })
            }
            className="bg-brand-500 text-white p-2.5 rounded-full hover:bg-brand-600 transition-colors shadow-sm"
          >
            <svg width={15} height={15} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg>
          </button>
        </div>
      </div>
    </div>
  );
}
