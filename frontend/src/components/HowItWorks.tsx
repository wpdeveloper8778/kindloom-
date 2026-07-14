'use client';

import { motion } from 'framer-motion';
import { Upload, Edit, ShoppingBag, Truck } from 'lucide-react';

const steps = [
  { icon: Upload, title: 'Choose a Product', desc: 'Browse our catalog of tees, hoodies, caps, and more premium blank products.' },
  { icon: Edit, title: 'Customize It', desc: 'Add your own text, upload artwork, or let our team help create your design.' },
  { icon: ShoppingBag, title: 'Order & Approve', desc: 'Review your mockup, approve the preview, and place your order securely.' },
  { icon: Truck, title: 'We Print & Ship', desc: 'We print your order on demand with eco-friendly inks and ship it to your door.' },
];

export default function HowItWorks() {
  return (
    <section className="py-16 bg-zinc-50 border-t border-zinc-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-zinc-800">How It Works</h2>
          <p className="text-zinc-500 mt-2 max-w-lg mx-auto">
            From idea to doorstep in just a few steps. No minimums, no hassle.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center"
            >
              <div className="w-14 h-14 rounded-2xl bg-brand-50 text-brand-500 flex items-center justify-center mx-auto mb-4">
                <step.icon size={24} />
              </div>
              <h3 className="font-semibold text-zinc-800 mb-1">{step.title}</h3>
              <p className="text-sm text-zinc-500 leading-relaxed">{step.desc}</p>
              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute top-8 left-[60%] w-[40%] h-px border-t border-dashed border-zinc-300" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
