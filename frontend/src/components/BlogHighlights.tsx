'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

import { api } from '@/lib/api';

export default function BlogHighlights() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const data = await api.blog.list('limit=4');
        setPosts(data.posts || []);
      } catch {
        setPosts([]);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-brand-500 font-semibold text-sm tracking-widest uppercase mb-2">From the blog</p>
            <h3 className="text-3xl md:text-4xl font-bold text-dark">Latest news articles</h3>
          </div>
          <Link href="/blog" className="hidden md:inline-flex text-sm font-semibold text-brand-500 hover:text-brand-600">
            View All &rarr;
          </Link>
        </div>
        <div className="grid md:grid-cols-4 gap-6">
          {loading
            ? [...Array(4)].map((_, i) => (
                <div key={i} className="rounded-2xl bg-gray-100 animate-pulse h-[320px]" />
              ))
            : posts.slice(0, 4).map((post, i) => (
                <Link key={i} href={`/blog/${post.slug}`} className="group">
                  <div className="rounded-2xl overflow-hidden bg-gray-50 mb-4">
                    <img
                      src={post.image || 'https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=400&q=80'}
                      alt={post.title?.en || 'Blog post'}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-400 mb-2">
                    <svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                    {post.createdAt ? new Date(post.createdAt).toLocaleDateString() : 'Latest'}
                  </div>
                  <h4 className="font-bold text-dark group-hover:text-brand-500 transition-colors leading-snug">
                    {post.title?.en || 'Cool t-shirts for kids and teens with logos'}
                  </h4>
                </Link>
              ))}
        </div>
      </div>
    </section>
  );
}
