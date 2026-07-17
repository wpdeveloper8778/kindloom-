import { Suspense } from 'react';
import ProductsContent from './ProductsContent';

export default function ProductsPage() {
  return (
    <Suspense fallback={<div className="max-w-7xl mx-auto px-4 py-8"><div className="grid grid-cols-2 md:grid-cols-4 gap-4">{[...Array(8)].map((_, i) => (<div key={i} className="bg-gray-100 rounded-xl aspect-square animate-pulse" />))}</div></div>}>
      <ProductsContent />
    </Suspense>
  );
}
