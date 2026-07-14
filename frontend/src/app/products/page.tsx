'use client';

import { Suspense, useEffect, useState, useCallback } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import { api } from '@/lib/api';
import ProductCard from '@/components/ProductCard';

const categories = [
  { value: '', label: 'All Products' },
  { value: 't-shirts', label: 'T-Shirts' },
  { value: 'hoodies', label: 'Hoodies' },
  { value: 'caps', label: 'Caps' },
  { value: 'wall-art', label: 'Wall Art' },
  { value: 'mugs', label: 'Mugs' },
  { value: 'phone-cases', label: 'Phone Cases' },
  { value: 'bags', label: 'Bags' },
  { value: 'posters', label: 'Posters' },
];

const sortOptions = [
  { value: '', label: 'Newest' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'rating', label: 'Best Rated' },
  { value: 'name', label: 'Alphabetical' },
];

export default function ProductsPage() {
  return (
    <Suspense fallback={<div className="pt-24 min-h-screen flex items-center justify-center"><div className="w-10 h-10 rounded-full border-2 border-brand-500 border-t-transparent animate-spin" /></div>}>
      <ProductsContent />
    </Suspense>
  );
}

function ProductsContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [products, setProducts] = useState<any[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [showFilters, setShowFilters] = useState(false);

  const category = searchParams.get('category') || '';
  const sort = searchParams.get('sort') || '';
  const page = Number(searchParams.get('page')) || 1;

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (category) params.set('category', category);
      if (sort) params.set('sort', sort);
      if (search) params.set('search', search);
      params.set('page', String(page));
      params.set('limit', '20');
      const data = await api.products.list(params.toString());
      setProducts(data.products);
      setTotal(data.total);
    } catch (e) {
      console.error('Failed to load products', e);
    } finally {
      setLoading(false);
    }
  }, [category, sort, search, page]);

  useEffect(() => { fetchProducts(); }, [fetchProducts]);

  const updateParams = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) params.set(key, value);
    else params.delete(key);
    if (key !== 'page') params.delete('page');
    router.push(`/products?${params.toString()}`);
  };

  return (
    <div className="pt-24 pb-16 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-zinc-800">
            {category ? categories.find(c => c.value === category)?.label : 'All Products'}
          </h1>
          <p className="text-zinc-500 mt-1">{total} designs waiting for your touch</p>
        </motion.div>

        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && updateParams('search', search)}
              placeholder="Search products..."
              className="w-full pl-11 pr-4 py-3 rounded-xl border border-zinc-200 bg-white text-zinc-800 placeholder-zinc-400 focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-50 transition-all text-sm"
            />
            {search && (
              <button onClick={() => { setSearch(''); updateParams('search', ''); }} className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600">
                <X size={16} />
              </button>
            )}
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-5 py-3 rounded-xl border border-zinc-200 bg-white text-zinc-600 hover:bg-zinc-50 transition-colors sm:hidden text-sm"
          >
            <SlidersHorizontal size={18} />
            Filters
          </button>
        </div>

        <div className="flex gap-8">
          <aside className={`${showFilters ? 'block' : 'hidden'} sm:block w-full sm:w-56 shrink-0`}>
            <div className="border border-zinc-200 rounded-2xl p-5 bg-white space-y-6 sticky top-24">
              <div>
                <h4 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-3">Category</h4>
                <div className="space-y-1.5">
                  {categories.map(cat => (
                    <button
                      key={cat.value}
                      onClick={() => updateParams('category', cat.value)}
                      className={`block w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                        category === cat.value
                          ? 'bg-brand-50 text-brand-600 font-medium'
                          : 'text-zinc-500 hover:text-zinc-800 hover:bg-zinc-50'
                      }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-3">Sort By</h4>
                <div className="space-y-1.5">
                  {sortOptions.map(opt => (
                    <button
                      key={opt.value}
                      onClick={() => updateParams('sort', opt.value)}
                      className={`block w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                        sort === opt.value
                          ? 'bg-brand-50 text-brand-600 font-medium'
                          : 'text-zinc-500 hover:text-zinc-800 hover:bg-zinc-50'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          <div className="flex-1">
            {loading ? (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="aspect-square rounded-2xl bg-zinc-100 animate-pulse" />
                ))}
              </div>
            ) : products.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-zinc-500">No products found. Try a different search.</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
                {products.map((product, i) => (
                  <ProductCard key={product._id} product={product} index={i} />
                ))}
              </div>
            )}

            {total > 20 && (
              <div className="flex justify-center gap-2 mt-12">
                {page > 1 && (
                  <button
                    onClick={() => updateParams('page', String(page - 1))}
                    className="px-4 py-2 rounded-lg border border-zinc-200 text-sm text-zinc-600 hover:bg-zinc-50 transition-colors"
                  >
                    Previous
                  </button>
                )}
                {Array.from({ length: Math.ceil(total / 20) }, (_, i) => i + 1).map(p => (
                  <button
                    key={p}
                    onClick={() => updateParams('page', String(p))}
                    className={`w-9 h-9 rounded-lg text-sm transition-colors ${
                      p === page ? 'bg-brand-500 text-white' : 'border border-zinc-200 text-zinc-500 hover:bg-zinc-50'
                    }`}
                  >
                    {p}
                  </button>
                ))}
                {page < Math.ceil(total / 20) && (
                  <button
                    onClick={() => updateParams('page', String(page + 1))}
                    className="px-4 py-2 rounded-lg border border-zinc-200 text-sm text-zinc-600 hover:bg-zinc-50 transition-colors"
                  >
                    Next
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
