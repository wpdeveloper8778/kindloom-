'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';


const slides = [
  {
    title: 'Custom T-Shirt Printing',
    subtitle: 'Design your own unique style',
    cta: 'Shop Online',
    link: '/products',
    bg: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=1400&q=80',
  },
  {
    title: 'Premium Quality Prints',
    subtitle: 'Vibrant colors that last',
    cta: 'Start Designing',
    link: '/products',
    bg: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=1400&q=80',
  },
  {
    title: 'Express Your Creativity',
    subtitle: 'Upload your design or choose from our gallery',
    cta: 'Explore Designs',
    link: '/products',
    bg: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=1400&q=80',
  },
];

export default function HeroSection() {
  const [current, setCurrent] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const goTo = useCallback((index: number) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrent(index);
    setTimeout(() => setIsTransitioning(false), 700);
  }, [isTransitioning]);

  const next = useCallback(() => {
    goTo((current + 1) % slides.length);
  }, [current, goTo]);

  const prev = useCallback(() => {
    goTo((current - 1 + slides.length) % slides.length);
  }, [current, goTo]);

  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next]);

  return (
    <section className="relative h-[600px] md:h-[700px] overflow-hidden bg-dark">
      {slides.map((slide, i) => (
        <div
          key={i}
          className={`absolute inset-0 transition-all duration-700 ease-in-out ${i === current ? 'opacity-100 scale-100' : 'opacity-0 scale-105'}`}
        >
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${slide.bg})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-dark/80 via-dark/50 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
        </div>
      ))}

      <div className="relative h-full max-w-7xl mx-auto px-4 flex items-center">
        <div className="max-w-xl">
          <div className="inline-block bg-brand-500/20 backdrop-blur-sm text-brand-500 text-sm font-medium px-4 py-1.5 rounded-full mb-6 border border-brand-500/30">
            Premium Print-on-Demand
          </div>
          <h2 className="text-5xl md:text-7xl font-bold text-white leading-[1.1] mb-4">
            {slides[current].title}
          </h2>
          <p className="text-lg md:text-xl text-gray-300 mb-8">
            {slides[current].subtitle}
          </p>
          <Link
            href={slides[current].link}
            className="inline-flex items-center gap-2 bg-brand-500 text-white px-8 py-3.5 rounded-full font-semibold hover:bg-brand-600 transition-all hover:shadow-lg hover:shadow-brand-500/25"
          >
            {slides[current].cta}
          </Link>
        </div>
      </div>

      <button
        onClick={prev}
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/20 transition-all border border-white/20"
      >
        <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
      </button>
      <button
        onClick={next}
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/20 transition-all border border-white/20"
      >
        <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>
      </button>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={`h-2 rounded-full transition-all duration-300 ${i === current ? 'w-8 bg-brand-500' : 'w-2 bg-white/40 hover:bg-white/60'}`}
          />
        ))}
      </div>
    </section>
  );
}
