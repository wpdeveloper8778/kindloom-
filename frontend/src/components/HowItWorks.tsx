'use client';

import { motion } from 'framer-motion';
const steps = [
  { icon: <svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>, title: 'Choose a Product', desc: 'Browse our catalog of premium blanks — tees, hoodies, caps, and more.' },
  { icon: <svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 3a2.828 2.828 0 114 4L7.5 20.5 2 22l1.5-5.5L17 3z"/></svg>, title: 'Add Your Design', desc: 'Upload artwork or add text. Preview in real-time before you order.' },
  { icon: <svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg>, title: 'Place Your Order', desc: 'We print on demand using eco-friendly inks and premium materials.' },
  { icon: <svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>, title: 'Get It Delivered', desc: 'Free shipping on orders over $50. Delivered to your doorstep in 5-7 days.' },
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
                  <div className="text-brand-500">{step.icon}</div>
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