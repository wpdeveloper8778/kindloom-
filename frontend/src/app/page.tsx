'use client';

import { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import HeroSection from '@/components/HeroSection';
import TrustBadges from '@/components/TrustBadges';
import FeaturedProducts from '@/components/FeaturedProducts';
import CategoryGrid from '@/components/CategoryGrid';
import HowItWorks from '@/components/HowItWorks';
import Testimonials from '@/components/Testimonials';
import NewsletterSection from '@/components/NewsletterSection';

export default function Home() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const data = await api.products.featured();
        setProducts(data);
      } catch (e) {
        console.error('Failed to load products', e);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  return (
    <>
      <HeroSection />
      <TrustBadges />
      <FeaturedProducts products={products} loading={loading} />
      <CategoryGrid />
      <HowItWorks />
      <Testimonials />
      <NewsletterSection />
    </>
  );
}
