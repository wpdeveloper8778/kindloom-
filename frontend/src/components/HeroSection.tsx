'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, ChevronLeft, ChevronRight, Palette, Truck, ShieldCheck, Sparkles } from 'lucide-react';

const slides = [
  {
    title: 'Your Design.\nOur Quality.',
    subtitle: 'Premium custom apparel and accessories. Upload your artwork or add text — we print on demand with eco-friendly inks.',
    badge: { icon: Palette, text: 'Print on Demand' },
    cta: { label: 'Start Designing', href: '/products', variant: 'primary' },
    cta2: { label: 'Shop Hoodies', href: '/products?category=hoodies', variant: 'secondary' },
    image: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=1400&q=80',
    gradient: 'from-brand-600/85 to-brand-900/85',
  },
  {
    title: 'Custom Wall Art\nfor Your Space',
    subtitle: 'Gallery-quality canvas prints. Turn your favorite photos into stunning wall decor.',
    badge: { icon: Sparkles, text: 'New Collection' },
    cta: { label: 'Explore Wall Art', href: '/products?category=wall-art', variant: 'primary' },
    cta2: { label: 'See All Products', href: '/products', variant: 'secondary' },
    image: 'https://images.unsplash.com/photo-1513519245088-0e12902e35ca?w=1400&q=80',
    gradient: 'from-violet-600/85 to-brand-700/85',
  },
  {
    title: 'Fresh Styles,\nZero Effort',
    subtitle: 'Premium hoodies, tees, and caps — all customizable with your unique design. Free shipping over $50.',
    badge: { icon: Truck, text: 'Free Shipping $50+' },
    cta: { label: 'Shop Now', href: '/products', variant: 'primary' },
    cta2: { label: 'T-Shirts', href: '/products?category=t-shirts', variant: 'secondary' },
    image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=1400&q=80',
    gradient: 'from-amber-600/85 to-brand-700/85',
  },
];

const cards = [
  { icon: '👕', label: 'Extra Sale', title: '30% off', desc: 'T-Shirts & Hoodies', href: '/products?category=t-shirts', delay: 0.1 },
  { icon: '🧢', label: 'Free Delivery', title: 'Free Shipping', desc: 'On orders over $50', href: '/products?category=caps', delay: 0.15 },
  { icon: '🖼️', label: 'Custom Art', title: 'Wall Art', desc: 'Upload your design', href: '/products?category=wall-art', delay: 0.2 },
  { icon: '☕', label: 'New', title: 'Mugs', desc: 'Custom ceramic mugs', href: '/products?category=mugs', delay: 0.25 },
];

function SlideContent({ slide, direction }: { slide: typeof slides[0]; direction: number }) {
  return (
    <motion.div
      key={slide.title}
      custom={direction}
      variants={{
        enter: (d: number) => ({ x: d > 0 ? 400 : -400, opacity: 0 }),
        center: { x: 0, opacity: 1 },
        exit: (d: number) => ({ x: d < 0 ? 400 : -400, opacity: 0 }),
      }}
      initial="enter"
      animate="center"
      exit="exit"
      transition={{ type: 'spring', stiffness: 200, damping: 28 }}
      className="absolute inset-0 flex items-center"
    >
      <div className="relative z-10 w-full px-4 sm:px-8 lg:px-16">
        <div className="max-w-xl">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-white text-xs font-semibold mb-4 backdrop-blur-sm">
            <slide.badge.icon size={12} /> {slide.badge.text}
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight mb-4 text-white whitespace-pre-line">
            {slide.title}
          </h1>
          <p className="text-white/80 text-base sm:text-lg mb-6 leading-relaxed max-w-lg">
            {slide.subtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              href={slide.cta.href}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white text-brand-600 font-semibold hover:bg-zinc-100 transition-all shadow-lg shadow-black/10"
            >
              {slide.cta.label} <ArrowRight size={16} />
            </Link>
            <Link
              href={slide.cta2.href}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white/10 text-white font-semibold hover:bg-white/20 transition-all backdrop-blur-sm border border-white/20"
            >
              {slide.cta2.label}
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function HeroSection() {
  const [[current, direction], setSlide] = useState([0, 0]);
  const [loaded, setLoaded] = useState(false);

  const goTo = useCallback((index: number) => {
    const d = index > current ? 1 : -1;
    setSlide([index, d]);
  }, [current]);

  const next = useCallback(() => goTo((current + 1) % slides.length), [current, goTo]);
  const prev = useCallback(() => goTo((current - 1 + slides.length) % slides.length), [current, goTo]);

  useEffect(() => {
    setLoaded(true);
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next]);

  return (
    <section className="pt-16">
      {/* Full-width slider */}
      <div className="relative w-full h-[420px] sm:h-[500px] lg:h-[560px] overflow-hidden bg-zinc-900">
        <div className="absolute inset-0">
          {slides.map((slide, i) => (
            <img
              key={slide.title}
              src={slide.image}
              alt=""
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${i === current ? 'opacity-100' : 'opacity-0'}`}
            />
          ))}
          <div className={`absolute inset-0 bg-linear-to-br ${slides[current].gradient} transition-all duration-700`} />
          <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent" />
        </div>

        <AnimatePresence initial={false} custom={direction} mode="wait">
          <SlideContent slide={slides[current]} direction={direction} />
        </AnimatePresence>

        {/* Nav arrows - always visible */}
        {loaded && (
          <>
            <button
              onClick={prev}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/15 text-white hover:bg-white/30 backdrop-blur-sm flex items-center justify-center transition-all hover:scale-110"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={next}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/15 text-white hover:bg-white/30 backdrop-blur-sm flex items-center justify-center transition-all hover:scale-110"
            >
              <ChevronRight size={20} />
            </button>
          </>
        )}

        {/* Dots */}
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-20 flex gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`rounded-full transition-all ${
                i === current ? 'w-8 h-2.5 bg-white' : 'w-2.5 h-2.5 bg-white/40 hover:bg-white/60'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Cards + Trust badges inside container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 -mt-8 relative z-30 mb-8">
          {cards.map((card) => (
            <motion.div
              key={card.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: card.delay }}
            >
              <Link
                href={card.href}
                className="group block rounded-2xl bg-white p-5 border border-zinc-200 hover:border-brand-200 hover:shadow-lg hover:shadow-brand-500/5 transition-all shadow-sm"
              >
                <div className="text-2xl mb-2">{card.icon}</div>
                <p className="text-[11px] text-zinc-400 font-medium uppercase tracking-wider">{card.label}</p>
                <p className="text-lg font-bold text-zinc-800 mt-0.5">{card.title}</p>
                <p className="text-xs text-zinc-500 mt-0.5">{card.desc}</p>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Trust badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-12"
        >
          {[
            { icon: Palette, label: 'Custom Designs', desc: 'Upload your artwork' },
            { icon: Truck, label: 'Free Shipping', desc: 'On orders over $50' },
            { icon: ShieldCheck, label: 'Quality Guarantee', desc: '30-day guarantee' },
            { icon: ShieldCheck, label: 'Eco-Friendly', desc: 'Sustainable materials' },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-zinc-50 border border-zinc-200 hover:bg-brand-50 hover:border-brand-200 transition-all">
              <div className="w-9 h-9 rounded-lg bg-brand-50 flex items-center justify-center shrink-0">
                <item.icon size={16} className="text-brand-500" />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-semibold text-zinc-700">{item.label}</p>
                <p className="text-[10px] text-zinc-500">{item.desc}</p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}