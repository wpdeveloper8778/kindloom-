'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, ChevronLeft, ChevronRight, Sparkles, ShieldCheck, Truck, Palette } from 'lucide-react';

const slides = [
  {
    title: 'Your Design.\nOur Quality.',
    subtitle: 'Premium custom apparel and accessories. Upload your artwork or add text — we print on demand with eco-friendly inks.',
    badge: 'Print on Demand',
    cta: { label: 'Start Designing', href: '/products' },
    cta2: { label: 'Shop Hoodies', href: '/products?category=hoodies' },
    image: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=1400&q=80',
  },
  {
    title: 'Custom Wall Art\nfor Your Space',
    subtitle: 'Gallery-quality canvas prints. Turn your favorite photos into stunning wall decor.',
    badge: 'New Collection',
    cta: { label: 'Explore Wall Art', href: '/products?category=wall-art' },
    cta2: { label: 'See All Products', href: '/products' },
    image: 'https://images.unsplash.com/photo-1513519245088-0e12902e35ca?w=1400&q=80',
  },
  {
    title: 'Fresh Styles,\nZero Effort',
    subtitle: 'Premium hoodies, tees, and caps — all customizable with your unique design. Free shipping over $50.',
    badge: 'Free Shipping $50+',
    cta: { label: 'Shop Now', href: '/products' },
    cta2: { label: 'T-Shirts', href: '/products?category=t-shirts' },
    image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=1400&q=80',
  },
];

const perks = [
  { icon: Palette, label: 'Custom Designs', desc: 'Upload any artwork' },
  { icon: Truck, label: 'Free Shipping', desc: 'Orders over $50' },
  { icon: ShieldCheck, label: 'Quality Guarantee', desc: '30-day returns' },
  { icon: Sparkles, label: 'Eco-Friendly', desc: 'Sustainable inks' },
];

export default function HeroSection() {
  const [[current, direction], setSlide] = useState([0, 0]);
  const [loaded, setLoaded] = useState(false);

  const goTo = useCallback((i: number) => setSlide([i, i > current ? 1 : -1]), [current]);
  const next = useCallback(() => goTo((current + 1) % slides.length), [current, goTo]);
  const prev = useCallback(() => goTo((current - 1 + slides.length) % slides.length), [current, goTo]);

  useEffect(() => { setLoaded(true); const t = setInterval(next, 5000); return () => clearInterval(t); }, [next]);

  return (
    <section className="pt-16">
      <div className="relative w-full h-[440px] sm:h-[520px] lg:h-[580px] overflow-hidden">
        {slides.map((slide, i) => (
          <img key={slide.title} src={slide.image} alt="" className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${i === current ? 'opacity-100' : 'opacity-0'}`} />
        ))}
        <div className="absolute inset-0 bg-gradient-to-r from-zinc-900/80 via-zinc-900/50 to-zinc-900/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />

        <div className="absolute inset-0 flex items-center">
          <div className="w-full px-4 sm:px-8 lg:px-16">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={current}
                custom={direction}
                variants={{
                  enter: (d: number) => ({ x: d > 0 ? 200 : -200, opacity: 0 }),
                  center: { x: 0, opacity: 1 },
                  exit: (d: number) => ({ x: d < 0 ? 200 : -200, opacity: 0 }),
                }}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ type: 'spring', stiffness: 200, damping: 28 }}
                className="max-w-2xl"
              >
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 text-white/90 text-xs font-medium mb-5 backdrop-blur-sm border border-white/10">
                  <Sparkles size={12} /> {slides[current].badge}
                </span>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight text-white mb-4 whitespace-pre-line">
                  {slides[current].title}
                </h1>
                <p className="text-white/70 text-base sm:text-lg mb-7 leading-relaxed max-w-lg">
                  {slides[current].subtitle}
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Link href={slides[current].cta.href} className="btn-white text-sm px-7 py-3.5">
                    {slides[current].cta.label} <ArrowRight size={16} />
                  </Link>
                  <Link href={slides[current].cta2.href} className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-white/10 text-white font-medium hover:bg-white/20 transition-all backdrop-blur-sm border border-white/20 text-sm">
                    {slides[current].cta2.label}
                  </Link>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {loaded && (
          <>
            <button onClick={prev} className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/10 text-white hover:bg-white/25 backdrop-blur-sm flex items-center justify-center transition-all hover:scale-110">
              <ChevronLeft size={20} />
            </button>
            <button onClick={next} className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/10 text-white hover:bg-white/25 backdrop-blur-sm flex items-center justify-center transition-all hover:scale-110">
              <ChevronRight size={20} />
            </button>
          </>
        )}

        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-20 flex gap-2">
          {slides.map((_, i) => (
            <button key={i} onClick={() => goTo(i)}
              className={`rounded-full transition-all ${i === current ? 'w-8 h-2.5 bg-white' : 'w-2.5 h-2.5 bg-white/35 hover:bg-white/55'}`}
            />
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 -mt-6 relative z-30 mb-10">
          {[
            { icon: 'M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z', title: 'Premium Tees', desc: 'Shop T-Shirts', href: '/products?category=t-shirts' },
            { icon: 'M12 6V2M8 18l4 4 4-4M8 6l-4 4 4 4M16 6l4 4-4 4', title: 'Warm Hoodies', desc: 'Shop Hoodies', href: '/products?category=hoodies' },
            { icon: 'M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82zM7 7h.01', title: 'Custom Caps', desc: 'Shop Caps', href: '/products?category=caps' },
            { icon: 'M3 3h18v18H3V3zM9 9h6v6H9V9z', title: 'Wall Art', desc: 'Shop Now', href: '/products?category=wall-art' },
          ].map((item, i) => (
            <motion.div key={item.title} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.08 * i }}>
              <Link href={item.href} className="card-hover block p-5">
                <div className="w-10 h-10 rounded-xl bg-brand-50 flex items-center justify-center mb-3">
                  <svg className="w-5 h-5 text-brand-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
                  </svg>
                </div>
                <h3 className="text-sm font-semibold text-zinc-800">{item.title}</h3>
                <p className="text-xs text-zinc-500 mt-0.5">{item.desc}</p>
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.4 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-12"
        >
          {perks.map((item, i) => (
            <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-zinc-50/80 border border-zinc-200/60 hover:bg-brand-50/60 hover:border-brand-200/60 transition-all">
              <div className="w-9 h-9 rounded-lg bg-brand-50 flex items-center justify-center shrink-0">
                <item.icon size={16} className="text-brand-500" />
              </div>
              <div>
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