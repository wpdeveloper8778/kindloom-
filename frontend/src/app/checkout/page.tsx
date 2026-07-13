'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Check, CreditCard, ArrowLeft, Wallet } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { api } from '@/lib/api';
import PayPalCheckoutButton from '@/components/PayPalButton';
import Link from 'next/link';

type PaymentMethod = 'cod' | 'paypal';

export default function CheckoutPage() {
  const router = useRouter();
  const { items, subtotal, clearCart } = useCart();
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('cod');
  const [paypalError, setPaypalError] = useState('');
  const [form, setForm] = useState({
    name: '', email: '', phone: '', street: '', city: '', state: '', zip: '', country: 'US',
  });

  const shipping = subtotal >= 50 ? 0 : 5.99;
  const total = subtotal + shipping;

  const handleCODSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await api.orders.create({
        items: items.map(i => ({
          product: i.productId,
          name: i.name,
          price: i.price,
          quantity: i.quantity,
          size: i.size,
          color: i.color,
          image: i.image,
          customization: i.customization,
        })),
        shippingAddress: form,
        subtotal,
        shipping,
        total,
        paymentMethod: 'cod',
      });
      clearCart();
      setDone(true);
    } catch (err) {
      console.error('Order failed', err);
    } finally {
      setSubmitting(false);
    }
  };

  const handlePayPalSuccess = () => setDone(true);
  const handlePayPalError = (msg: string) => setPaypalError(msg);

  if (items.length === 0 && !done) {
    return (
      <div className="pt-24 min-h-screen flex flex-col items-center justify-center gap-4">
        <p className="text-zinc-400">Your cart is empty.</p>
        <Link href="/products" className="text-brand-400 hover:underline">Start Shopping</Link>
      </div>
    );
  }

  if (done) {
    return (
      <div className="pt-24 min-h-screen flex flex-col items-center justify-center gap-6">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="w-20 h-20 rounded-full bg-green-500 flex items-center justify-center"
        >
          <Check size={32} className="text-white" />
        </motion.div>
        <h1 className="text-3xl font-bold text-white">Order Placed!</h1>
        <p className="text-zinc-400">Your custom products are being printed. You&apos;ll receive a confirmation shortly.</p>
        <Link
          href="/products"
          className="px-6 py-3 rounded-xl bg-linear-to-r from-brand-500 to-brand-600 text-white font-semibold hover:from-brand-600 hover:to-brand-700 transition-all"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  const paypalClientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;

  return (
    <div className="pt-24 pb-16 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="text-3xl font-bold text-white">Checkout</h1>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          <form onSubmit={handleCODSubmit} className="md:col-span-2 space-y-6">
            <div className="glass rounded-2xl p-6 space-y-4">
              <h2 className="text-lg font-semibold text-white">Shipping Information</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-xs text-zinc-500 mb-1.5">Full Name</label>
                  <input
                    required
                    value={form.name}
                    onChange={e => setForm({ ...form, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl glass text-white placeholder-zinc-500 focus:outline-none focus:border-brand-500/50"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className="block text-xs text-zinc-500 mb-1.5">Email</label>
                  <input
                    required
                    type="email"
                    value={form.email}
                    onChange={e => setForm({ ...form, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl glass text-white placeholder-zinc-500 focus:outline-none focus:border-brand-500/50"
                    placeholder="john@example.com"
                  />
                </div>
                <div>
                  <label className="block text-xs text-zinc-500 mb-1.5">Phone</label>
                  <input
                    required
                    type="tel"
                    value={form.phone}
                    onChange={e => setForm({ ...form, phone: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl glass text-white placeholder-zinc-500 focus:outline-none focus:border-brand-500/50"
                    placeholder="+1 234 567 890"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-xs text-zinc-500 mb-1.5">Street Address</label>
                  <input
                    required
                    value={form.street}
                    onChange={e => setForm({ ...form, street: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl glass text-white placeholder-zinc-500 focus:outline-none focus:border-brand-500/50"
                    placeholder="123 Main St"
                  />
                </div>
                <div>
                  <label className="block text-xs text-zinc-500 mb-1.5">City</label>
                  <input
                    required
                    value={form.city}
                    onChange={e => setForm({ ...form, city: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl glass text-white placeholder-zinc-500 focus:outline-none focus:border-brand-500/50"
                    placeholder="New York"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-zinc-500 mb-1.5">State</label>
                    <input
                      value={form.state}
                      onChange={e => setForm({ ...form, state: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl glass text-white placeholder-zinc-500 focus:outline-none focus:border-brand-500/50"
                      placeholder="NY"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-zinc-500 mb-1.5">ZIP</label>
                    <input
                      required
                      value={form.zip}
                      onChange={e => setForm({ ...form, zip: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl glass text-white placeholder-zinc-500 focus:outline-none focus:border-brand-500/50"
                      placeholder="10001"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="glass rounded-2xl p-6">
              <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <CreditCard size={18} className="text-brand-400" />
                Payment Method
              </h2>
              <div className="space-y-3">
                <label className={`flex items-center gap-3 p-4 rounded-xl cursor-pointer transition-colors ${
                  paymentMethod === 'cod' ? 'bg-brand-500/10 border border-brand-500/30' : 'glass hover:bg-white/[0.06]'
                }`}>
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === 'cod'}
                    onChange={() => setPaymentMethod('cod')}
                    className="text-brand-500"
                  />
                  <Wallet size={18} className="text-zinc-400" />
                  <span className="text-sm text-white">Cash on Delivery</span>
                </label>
                <label className={`flex items-center gap-3 p-4 rounded-xl cursor-pointer transition-colors ${
                  paymentMethod === 'paypal' ? 'bg-brand-500/10 border border-brand-500/30' : 'glass hover:bg-white/[0.06]'
                }`}>
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === 'paypal'}
                    onChange={() => setPaymentMethod('paypal')}
                    className="text-brand-500"
                  />
                  <span className="text-xl font-bold italic text-[#0070BA]" style={{ fontFamily: 'Arial' }}>PayPal</span>
                  <span className="text-xs text-zinc-500 ml-auto">Credit / Debit Card</span>
                </label>
              </div>

              {paymentMethod === 'paypal' && (
                <div className="mt-4">
                  {paypalError && (
                    <p className="text-red-400 text-sm mb-3">{paypalError}</p>
                  )}
                  {paypalClientId ? (
                    <PayPalCheckoutButton
                      form={form}
                      subtotal={subtotal}
                      shipping={shipping}
                      total={total}
                      onSuccess={handlePayPalSuccess}
                      onError={handlePayPalError}
                    />
                  ) : (
                    <div className="p-4 rounded-xl bg-yellow-500/10 border border-yellow-500/30 text-sm text-yellow-400">
                      PayPal is not configured. Set <code className="text-yellow-300">NEXT_PUBLIC_PAYPAL_CLIENT_ID</code> in your environment.
                    </div>
                  )}
                </div>
              )}
            </div>

            {paymentMethod === 'cod' && (
              <button
                type="submit"
                disabled={submitting}
                className="w-full py-3.5 rounded-xl bg-linear-to-r from-brand-500 to-brand-600 text-white font-semibold hover:from-brand-600 hover:to-brand-700 transition-all glow hover:glow-lg disabled:opacity-50"
              >
                {submitting ? 'Placing Order...' : `Place Order — $${total.toFixed(2)}`}
              </button>
            )}
          </form>

          <div className="glass rounded-2xl p-6 h-fit">
            <h3 className="text-sm font-semibold text-white mb-4">Order Summary</h3>
            <div className="space-y-3">
              {items.map(item => (
                <div key={item._id} className="flex gap-3">
                  <div className="w-14 h-14 rounded-lg overflow-hidden bg-zinc-900 shrink-0">
                    <img src={item.image} alt="" className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-white truncate">{item.name}</p>
                    <p className="text-xs text-zinc-500">{item.color} / {item.size} x{item.quantity}</p>
                  </div>
                  <span className="text-sm text-white font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
              <div className="border-t border-white/5 pt-3 space-y-1.5">
                <div className="flex justify-between text-sm text-zinc-400">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm text-zinc-400">
                  <span>Shipping</span>
                  <span className={shipping === 0 ? 'text-green-400' : ''}>
                    {shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between text-base font-semibold text-white pt-1">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
