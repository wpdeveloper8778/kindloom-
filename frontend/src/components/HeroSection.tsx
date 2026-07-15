'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, ChevronLeft, ChevronRight, Palette, Truck, ShieldCheck, Sparkles } from 'lucide-react';

const slides = [
  {
    title: 'Your Design. Our Quality.',
    subtitle: 'Premium custom apparel and accessories. Upload your artwork or add text — we print on demand with eco-friendly inks.',
    badge: { icon: Palette, text: 'Print on Demand' },
    cta: { label: 'Start Designing', href: '/products', variant: 'primary' },
    cta2: { label: 'Shop Hoodies', href: '/products?category=hoodies', variant: 'secondary' },
    image: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=1200&q=80',
    gradient: 'from-brand-600/90 to-brand-800/90',
  },
  {
    title: 'Custom Wall Art\nfor Your Space',
    subtitle: 'Gallery-quality canvas prints. Upload your photo or design and turn it into stunning wall decor.',
    badge: { icon: Sparkles, text: 'New Collection' },
    cta: { label: 'Explore Wall Art', href: '/products?category=wall-art', variant: 'primary' },
    cta2: { label: 'See All Products', href: '/products', variant: 'secondary' },
    image: 'https://images.unsplash.com/photo-1513519245088-0e12902e35ca?w=1200&q=80',
    gradient: 'from-violet-600/90 to-brand-700/90',
  },
  {
    title: 'Fresh Styles,\nZero Effort',
    subtitle: 'Premium hoodies, tees, and caps — all customizable with your unique design. Free shipping over $50.',
    badge: { icon: Truck, text: 'Free Shipping $50+' },
    cta: { label: 'Shop Now', href: '/products', variant: 'primary' },
    cta2: { label: 'T-Shirts', href: '/products?category=t-shirts', variant: 'secondary' },
    image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=1200&q=80',
    gradient: 'from-amber-600/90 to-brand-700/90',
  },
];

function SlideContent({ slide, direction }: { slide: typeof slides[0]; direction: number }) {
  return (
    <motion.div
      key={slide.title}
      custom={direction}
      variants={{
        enter: (d: number) => ({ x: d > 0 ? 300 : -300, opacity: 0 }),
        center: { x: 0, opacity: 1 },
        exit: (d: number) => ({ x: d < 0 ? 300 : -300, opacity: 0 }),
      }}
      initial="enter"
      animate="center"
      exit="exit"
      transition={{ type: 'spring', stiffness: 260, damping: 30 }}
      className="absolute inset-0 flex items-center"
    >
      <div className="relative z-10 w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid lg:grid-cols-5 gap-6">
          {/* Slider - 3/5 width */}
          <div className="lg:col-span-3 relative overflow-hidden rounded-2xl bg-zinc-900 h-[400px] sm:h-[460px] lg:h-[500px]">
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
            </div>

            <AnimatePresence initial={false} custom={direction} mode="wait">
              <SlideContent slide={slides[current]} direction={direction} />
            </AnimatePresence>

            {/* Nav arrows */}
            {loaded && (
              <>
                <button
                  onClick={prev}
                  className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-white/15 text-white hover:bg-white/30 backdrop-blur-sm flex items-center justify-center transition-all opacity-0 group-hover:opacity-100 hover:scale-110"
                >
                  <ChevronLeft size={18} />
                </button>
                <button
                  onClick={next}
                  className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-white/15 text-white hover:bg-white/30 backdrop-blur-sm flex items-center justify-center transition-all opacity-0 group-hover:opacity-100 hover:scale-110"
                >
                  <ChevronRight size={18} />
                </button>
              </>
            )}

            {/* Dots */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2">
              {slides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  className={`rounded-full transition-all ${
                    i === current ? 'w-6 h-2 bg-white' : 'w-2 h-2 bg-white/40 hover:bg-white/60'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Sidebar cards - 2/5 width */}
          <div className="lg:col-span-2 grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-1 gap-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Link href="/products?category=t-shirts" className="group relative block overflow-hidden rounded-2xl bg-zinc-50 p-6 border border-zinc-200 hover:bg-zinc-100 transition-all hover:shadow-md min-h-[140px]">
                <div className="absolute top-3 right-3 text-2xl opacity-10 group-hover:scale-110 transition-transform">👕</div>
                <p className="text-xs text-zinc-500 font-medium uppercase tracking-wider">🔥 Extra Sale</p>
                <p className="text-xl font-bold text-zinc-800 mt-1">30% off</p>
                <p className="text-xs text-zinc-500 mt-1">T-Shirts & Hoodies</p>
                <span className="inline-flex items-center gap-1 text-xs text-brand-500 font-medium mt-3 group-hover:gap-2 transition-all">
                  Shop now <ArrowRight size={12} />
                </span>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Link href="/products?category=caps" className="group relative block overflow-hidden rounded-2xl bg-zinc-50 p-6 border border-zinc-200 hover:bg-zinc-100 transition-all hover:shadow-md min-h-[140px]">
                <div className="absolute top-3 right-3 text-2xl opacity-10 group-hover:scale-110 transition-transform">🧢</div>
                <p className="text-xs text-zinc-500 font-medium uppercase tracking-wider">🚚 Free</p>
                <p className="text-xl font-bold text-zinc-800 mt-1">Delivery</p>
                <p className="text-xs text-zinc-500 mt-1">On orders over $50</p>
                <span className="inline-flex items-center gap-1 text-xs text-brand-500 font-medium mt-3 group-hover:gap-2 transition-all">
                  Shop now <ArrowRight size={12} />
                </span>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Link href="/products?category=wall-art" className="group relative block overflow-hidden rounded-2xl bg-zinc-50 p-6 border border-zinc-200 hover:bg-zinc-100 transition-all hover:shadow-md min-h-[140px]">
                <div className="absolute top-3 right-3 text-2xl opacity-10 group-hover:scale-110 transition-transform">🖼️</div>
                <p className="text-xs text-zinc-500 font-medium uppercase tracking-wider">🛡️ Custom</p>
                <p className="text-xl font-bold text-zinc-800 mt-1">Wall Art</p>
                <p className="text-xs text-zinc-500 mt-1">Upload your design</p>
                <span className="inline-flex items-center gap-1 text-xs text-brand-500 font-medium mt-3 group-hover:gap-2 transition-all">
                  Get it now <ArrowRight size={12} />
                </span>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.35 }}
            >
              <Link href="/products?category=mugs" className="group relative block overflow-hidden rounded-2xl bg-zinc-50 p-6 border border-zinc-200 hover:bg-zinc-100 transition-all hover:shadow-md min-h-[140px]">
                <div className="absolute top-3 right-3 text-2xl opacity-10 group-hover:scale-110 transition-transform">☕</div>
                <p className="text-xs text-zinc-500 font-medium uppercase tracking-wider">✨ New</p>
                <p className="text-xl font-bold text-zinc-800 mt-1">Mugs</p>
                <p className="text-xs text-zinc-500 mt-1">Custom ceramic mugs</p>
                <span className="inline-flex items-center gap-1 text-xs text-brand-500 font-medium mt-3 group-hover:gap-2 transition-all">
                  Shop now <ArrowRight size={12} />
                </span>
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Trust badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3"
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