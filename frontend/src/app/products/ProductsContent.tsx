'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { api } from '@/lib/api';
import { products as staticProducts } from '@/lib/products';
import ProductCard from '@/components/ProductCard';


export default function ProductsContent() {
  const searchParams = useSearchParams();
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const params = new URLSearchParams();
        const category = searchParams.get('category');
        if (category) params.set('category', category);
        if (search) params.set('search', search);
        const data = await api.products.list(params.toString());
        setProducts(data.products || []);
      } catch {
        const filtered = staticProducts.filter((p) =>
          !search || p.name.toLowerCase().includes(search.toLowerCase())
        );
        setProducts(filtered);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [searchParams, search]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-dark mb-6">All Products</h1>

      <div className="relative max-w-md mb-8">
        <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search products..."
          className="w-full pl-10 pr-4 py-2.5 rounded-full border border-gray-200 focus:border-brand-500 focus:outline-none text-sm transition-colors"
        />
      </div>

      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="bg-gray-100 rounded-xl aspect-square animate-pulse" />
          ))}
        </div>
      ) : products.length === 0 ? (
        <p className="text-gray-500 text-center py-12">No products found.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {products.map((p: any) => (
            <ProductCard key={p._id || p.slug} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}
