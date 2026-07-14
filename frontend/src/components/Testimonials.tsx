'use client';

import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const testimonials = [
  { name: 'Sarah M.', role: 'Small Business Owner', text: 'The print quality is outstanding. I ordered hoodies with my logo and they exceeded expectations. Fast shipping too!', rating: 5 },
  { name: 'James K.', role: 'Artist', text: 'I love that I can upload my artwork and see a preview before ordering. The wall art prints are gallery-quality.', rating: 5 },
  { name: 'Emily R.', role: 'Team Manager', text: 'Ordered custom t-shirts for our team event. Easy customization, great prices, and everyone loved them!', rating: 5 },
];

export default function Testimonials() {
  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-zinc-800">What Our Customers Say</h2>
          <p className="text-zinc-500 mt-1">Join thousands of happy customers.</p>
        </motion.div>

        <div className="grid sm:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-6 rounded-2xl border border-zinc-200 bg-white"
            >
              <div className="flex gap-0.5 mb-3">
                {[...Array(t.rating)].map((_, j) => (
                  <Star key={j} size={14} className="fill-brand-500 text-brand-500" />
                ))}
              </div>
              <p className="text-sm text-zinc-600 leading-relaxed mb-4">&ldquo;{t.text}&rdquo;</p>
              <div>
                <p className="text-sm font-semibold text-zinc-800">{t.name}</p>
                <p className="text-xs text-zinc-500">{t.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
