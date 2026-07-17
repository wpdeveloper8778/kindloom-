'use client';

import Link from 'next/link';
import { products, designs } from '@/lib/products';

export default function ProductShowcase() {
  return (
    <>
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="text-brand-500 font-semibold text-sm tracking-widest uppercase mb-2">Our collection</p>
              <h3 className="text-3xl md:text-4xl font-bold text-dark">T-shirt models</h3>
            </div>
            <Link href="/products" className="hidden md:inline-flex text-sm font-semibold text-brand-500 hover:text-brand-600 transition-colors">
              View All &rarr;
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {products.slice(0, 8).map((item) => (
              <Link
                key={item.slug}
                href={`/products/${item.slug}`}
                className="group relative rounded-2xl overflow-hidden aspect-[3/4] bg-gray-100"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <h4 className="text-white font-bold text-lg">{item.name}</h4>
                  <p className="text-white/70 text-sm">Shop Now &rarr;</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="mb-10">
            <p className="text-brand-500 font-semibold text-sm tracking-widest uppercase mb-2">Design gallery</p>
            <h3 className="text-3xl md:text-4xl font-bold text-dark">Popular designs</h3>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {designs.map((item, i) => (
              <div key={i} className="group relative rounded-2xl overflow-hidden aspect-square bg-gray-100 cursor-pointer">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                  <span className="text-white font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                    {item.name}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
