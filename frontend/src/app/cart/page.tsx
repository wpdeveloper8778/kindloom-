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
        <div className="w-20 h-20 rounded-2xl bg-zinc-100 border border-zinc-200 flex items-center justify-center">
          <ShoppingBag size={32} className="text-zinc-400" />
        </div>
        <h1 className="text-2xl font-bold text-zinc-800">Your cart is empty</h1>
        <p className="text-zinc-500">Looks like you haven&apos;t added anything yet.</p>
        <Link
          href="/products"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-brand-500 text-white font-semibold hover:bg-brand-600 transition-all"
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
          <h1 className="text-3xl font-bold text-zinc-800">Shopping Cart</h1>
          <p className="text-zinc-500 mt-1">{items.length} {items.length === 1 ? 'item' : 'items'}</p>
        </motion.div>

        <div className="space-y-4 mb-8">
          {items.map((item) => (
            <motion.div
              key={item._id}
              layout
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="border border-zinc-200 rounded-2xl p-4 bg-white flex gap-4"
            >
              <div className="w-24 h-24 rounded-xl overflow-hidden bg-zinc-100 shrink-0">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between mb-1">
                  <div>
                    <h3 className="text-sm font-medium text-zinc-800">{item.name}</h3>
                    <p className="text-xs text-zinc-500">
                      {item.color} / {item.size}
                    </p>
                    {item.customization?.text && (
                      <p className="text-xs text-brand-500 mt-0.5">Text: &ldquo;{item.customization.text}&rdquo;</p>
                    )}
                  </div>
                  <span className="text-sm font-semibold text-zinc-800">${(item.price * item.quantity).toFixed(2)}</span>
                </div>
                <div className="flex items-center justify-between mt-3">
                  <div className="flex items-center border border-zinc-200 rounded-lg">
                    <button
                      onClick={() => updateQuantity(item._id, item.quantity - 1)}
                      className="p-1.5 text-zinc-400 hover:text-zinc-600 transition-colors"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="w-8 text-center text-xs text-zinc-800 font-medium">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item._id, item.quantity + 1)}
                      className="p-1.5 text-zinc-400 hover:text-zinc-600 transition-colors"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                  <button
                    onClick={() => removeItem(item._id)}
                    className="p-2 text-zinc-400 hover:text-red-500 transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="border border-zinc-200 rounded-2xl p-6 bg-white">
          <div className="space-y-3 mb-6">
            <div className="flex justify-between text-sm">
              <span className="text-zinc-500">Subtotal</span>
              <span className="text-zinc-800">${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-zinc-500">Shipping</span>
              <span className="text-green-600">{subtotal >= 50 ? 'Free' : '$5.99'}</span>
            </div>
            <div className="border-t border-zinc-200 pt-3 flex justify-between">
              <span className="text-zinc-800 font-semibold">Total</span>
              <span className="text-zinc-800 font-bold text-lg">
                ${(subtotal + (subtotal >= 50 ? 0 : 5.99)).toFixed(2)}
              </span>
            </div>
          </div>
          <Link
            href="/checkout"
            className="block w-full text-center py-3.5 rounded-xl bg-brand-500 text-white font-semibold hover:bg-brand-600 transition-all"
          >
            Proceed to Checkout
          </Link>
          <Link
            href="/products"
            className="block text-center text-sm text-zinc-500 hover:text-zinc-700 mt-4 transition-colors"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}
