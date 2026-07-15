'use client';

import { motion } from 'framer-motion';
import { Upload, Edit, ShoppingBag, Truck } from 'lucide-react';

const steps = [
  { icon: Upload, title: 'Choose a Product', desc: 'Browse our catalog of premium blanks — tees, hoodies, caps, and more.' },
  { icon: Edit, title: 'Add Your Design', desc: 'Upload artwork or add text. Preview in real-time before you order.' },
  { icon: ShoppingBag, title: 'Place Your Order', desc: 'We print on demand using eco-friendly inks and premium materials.' },
  { icon: Truck, title: 'Get It Delivered', desc: 'Free shipping on orders over $50. Delivered to your doorstep in 5-7 days.' },
];

export default function HowItWorks() {
  return (
    <section className="py-16 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2 className="section-title">How It Works</h2>
          <p className="section-subtitle mx-auto">From idea to doorstep in four simple steps.</p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6 relative">
          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="relative text-center lg:text-left"
            >
              <div className="flex flex-col items-center lg:items-start">
                <div className="w-14 h-14 rounded-2xl bg-brand-50 flex items-center justify-center mb-4">
                  <step.icon size={24} className="text-brand-500" />
                </div>
                {i < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-7 left-14 w-[calc(100%-3.5rem)] h-px bg-zinc-200 border-t-2 border-dashed border-zinc-300" />
                )}
                <span className="text-xs font-bold text-brand-500 bg-brand-50 px-2.5 py-0.5 rounded-full mb-2">Step {i + 1}</span>
                <h3 className="text-base font-semibold text-zinc-800 mb-1.5">{step.title}</h3>
                <p className="text-sm text-zinc-500 leading-relaxed max-w-xs">{step.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}