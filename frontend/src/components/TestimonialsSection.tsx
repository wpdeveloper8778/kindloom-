'use client';

import { useState, useEffect } from 'react';


const testimonials = [
  {
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac nunc in orci bibendum dignissim quis in turpis. In id enim at lacus commodo mattis a a massa. Nam bibendum id magna vitae tristique.',
    name: 'Sally Brooks',
    location: 'Boulder, CO',
  },
  {
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac nunc in orci bibendum dignissim quis in turpis. In id enim at lacus commodo mattis a a massa. Nam bibendum id magna vitae tristique.',
    name: 'Kevin Bootman',
    location: 'Papillion, NE',
  },
  {
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac nunc in orci bibendum dignissim quis in turpis. In id enim at lacus commodo mattis a a massa. Nam bibendum id magna vitae tristique.',
    name: 'Bonnie Garrison',
    location: 'Chicago, IL',
  },
];

export default function TestimonialsSection() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((c) => (c + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <p className="text-brand-500 font-semibold text-sm tracking-widest uppercase mb-2">Testimonials</p>
        <h3 className="text-3xl md:text-4xl font-bold text-dark mb-12">What our customers say</h3>

        <div className="relative min-h-[220px]">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className={`absolute inset-0 transition-all duration-500 ${i === current ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}
            >
              <svg width={40} height={40} viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" className="text-brand-500/20 mx-auto mb-6"><path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"/><path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z"/></svg>
              <p className="text-gray-600 leading-relaxed text-lg mb-8 max-w-2xl mx-auto">
                &ldquo;{t.text}&rdquo;
              </p>
              <p className="font-bold text-dark">{t.name}</p>
              <p className="text-gray-400 text-sm">{t.location}</p>
            </div>
          ))}
        </div>

        <div className="flex justify-center gap-2 mt-8">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`h-2 rounded-full transition-all duration-300 ${i === current ? 'w-8 bg-brand-500' : 'w-2 bg-gray-300 hover:bg-gray-400'}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
