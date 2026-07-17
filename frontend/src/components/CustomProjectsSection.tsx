'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function CustomProjectsSection() {
  const [tab, setTab] = useState<'personal' | 'business'>('personal');

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="rounded-2xl overflow-hidden shadow-xl">
              <img
                src="https://images.unsplash.com/photo-1620799139507-2a76f79a2f4d?w=600&q=80"
                alt="Custom printing"
                className="w-full h-[450px] object-cover"
              />
            </div>
          </div>
          <div>
            <p className="text-brand-500 font-semibold text-sm tracking-widest uppercase mb-2">Custom projects</p>
            <h3 className="text-3xl md:text-4xl font-bold text-dark mb-4 leading-tight">
              Printing unique prints on t-shirts
            </h3>
            <p className="text-gray-500 leading-relaxed mb-8">
              Dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia.
            </p>

            <div className="flex gap-4 mb-8">
              <button
                onClick={() => setTab('personal')}
                className={`px-6 py-3 rounded-full font-semibold text-sm transition-all ${
                  tab === 'personal'
                    ? 'bg-brand-500 text-white shadow-lg shadow-brand-500/25'
                    : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                }`}
              >
                01. For myself
              </button>
              <button
                onClick={() => setTab('business')}
                className={`px-6 py-3 rounded-full font-semibold text-sm transition-all ${
                  tab === 'business'
                    ? 'bg-brand-500 text-white shadow-lg shadow-brand-500/25'
                    : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                }`}
              >
                02. Companies
              </button>
            </div>

            <div className="min-h-[100px]">
              {tab === 'personal' ? (
                <div className="animate-fade-in-up">
                  <p className="text-gray-600 leading-relaxed mb-6">
                    Perfect for individuals who want unique custom apparel. Upload your design, choose your product, and get it printed with premium quality.
                  </p>
                  <Link
                    href="/products"
                    className="inline-flex items-center gap-2 bg-brand-500 text-white px-6 py-3 rounded-full font-semibold hover:bg-brand-600 transition-all"
                  >
                    Start Designing
                  </Link>
                </div>
              ) : (
                <div className="animate-fade-in-up">
                  <p className="text-gray-600 leading-relaxed mb-6">
                    Bulk orders for teams, events, and businesses. Get branded merchandise with logo placement, consistent colors, and volume discounts.
                  </p>
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 bg-dark text-white px-6 py-3 rounded-full font-semibold hover:bg-dark/90 transition-all"
                  >
                    Get a Quote
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
