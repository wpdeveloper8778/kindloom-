'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Trash2, Minus, Plus, ShoppingBag, ArrowLeft } from 'lucide-react';
import { useCart } from '@/context/CartContext';

export default function CartPage() {
  const { items, removeItem, updateQuantity, subtotal } = useCart();

  if (items.length === 0) {
    return (
      <div className="pt-24 min-h-screen flex flex-col items-center justify-center gap-6">
        <div className="w-20 h-20 rounded-2xl glass flex items-center justify-center">
          <ShoppingBag size={32} className="text-zinc-500" />
        </div>
        <h1 className="text-2xl font-bold text-white">Your cart is empty</h1>
        <p className="text-zinc-400">Looks like you haven&apos;t added anything yet.</p>
        <Link
          href="/products"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-linear-to-r from-brand-500 to-brand-600 text-white font-semibold hover:from-brand-600 hover:to-brand-700 transition-all"
        >
          <ArrowLeft size={16} />
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-16 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="text-3xl font-bold text-white">Shopping Cart</h1>
          <p className="text-zinc-400 mt-1">{items.length} {items.length === 1 ? 'item' : 'items'}</p>
        </motion.div>

        <div className="space-y-4 mb-8">
          {items.map((item) => (
            <motion.div
              key={item._id}
              layout
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="glass rounded-2xl p-4 flex gap-4"
            >
              <div className="w-24 h-24 rounded-xl overflow-hidden bg-zinc-900 shrink-0">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between mb-1">
                  <div>
                    <h3 className="text-sm font-medium text-white">{item.name}</h3>
                    <p className="text-xs text-zinc-500">
                      {item.color} / {item.size}
                    </p>
                    {item.customization?.text && (
                      <p className="text-xs text-brand-400 mt-0.5">Text: &ldquo;{item.customization.text}&rdquo;</p>
                    )}
                  </div>
                  <span className="text-sm font-semibold text-white">${(item.price * item.quantity).toFixed(2)}</span>
                </div>
                <div className="flex items-center justify-between mt-3">
                  <div className="flex items-center glass rounded-lg">
                    <button
                      onClick={() => updateQuantity(item._id, item.quantity - 1)}
                      className="p-1.5 text-zinc-400 hover:text-white transition-colors"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="w-8 text-center text-xs text-white font-medium">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item._id, item.quantity + 1)}
                      className="p-1.5 text-zinc-400 hover:text-white transition-colors"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                  <button
                    onClick={() => removeItem(item._id)}
                    className="p-2 text-zinc-500 hover:text-red-400 transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="glass rounded-2xl p-6">
          <div className="space-y-3 mb-6">
            <div className="flex justify-between text-sm">
              <span className="text-zinc-400">Subtotal</span>
              <span className="text-white">${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-zinc-400">Shipping</span>
              <span className="text-green-400">{subtotal >= 50 ? 'Free' : '$5.99'}</span>
            </div>
            <div className="border-t border-white/5 pt-3 flex justify-between">
              <span className="text-white font-semibold">Total</span>
              <span className="text-white font-bold text-lg">
                ${(subtotal + (subtotal >= 50 ? 0 : 5.99)).toFixed(2)}
              </span>
            </div>
          </div>
          <Link
            href="/checkout"
            className="block w-full text-center py-3.5 rounded-xl bg-linear-to-r from-brand-500 to-brand-600 text-white font-semibold hover:from-brand-600 hover:to-brand-700 transition-all glow hover:glow-lg"
          >
            Proceed to Checkout
          </Link>
          <Link
            href="/products"
            className="block text-center text-sm text-zinc-500 hover:text-zinc-300 mt-4 transition-colors"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}
