'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { api } from '@/lib/api';


export default function CheckoutPage() {
  const { items, subtotal, clearCart } = useCart();
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', phone: '', street: '', city: '', zip: '' });

  const shipping = subtotal >= 50 ? 0 : 5;
  const total = subtotal + shipping;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await api.orders.create({
        items: items.map((i) => ({
          product: i.productId,
          title: i.title,
          price: i.price,
          quantity: i.quantity,
          image: i.image,
          color: i.color,
          size: i.size,
        })),
        shippingAddress: {
          name: form.name,
          email: form.email,
          phone: form.phone,
          street: form.street,
          city: form.city,
          zip: form.zip,
          country: 'US',
        },
        paymentMethod: 'cod',
        subtotal,
        shipping,
        tax: 0,
        total,
      });
      clearCart();
      setDone(true);
    } catch (e) {
      console.error(e);
    } finally {
      setSubmitting(false);
    }
  };

  if (items.length === 0 && !done) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center">
        <p className="text-gray-500">Your cart is empty.</p>
      </div>
    );
  }

  if (done) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg width={32} height={32} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-600"><polyline points="20 6 9 17 4 12"/></svg>
        </div>
        <h1 className="text-2xl font-bold text-dark mb-2">Order Placed!</h1>
        <p className="text-gray-500 mb-6">Thank you for your order. We will confirm via email shortly.</p>
        <button onClick={() => router.push('/products')} className="bg-brand-500 text-white px-6 py-3 rounded-full font-semibold hover:bg-brand-600 transition-colors">
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-dark mb-8">Checkout</h1>

      <div className="grid md:grid-cols-5 gap-8">
        <form onSubmit={handleSubmit} className="md:col-span-3 space-y-4">
          <h2 className="font-semibold text-lg text-dark">Shipping Information</h2>
          {[
            { name: 'name', label: 'Full Name', type: 'text' },
            { name: 'email', label: 'Email', type: 'email' },
            { name: 'phone', label: 'Phone', type: 'tel' },
            { name: 'street', label: 'Street Address', type: 'text' },
            { name: 'city', label: 'City', type: 'text' },
            { name: 'zip', label: 'ZIP Code', type: 'text' },
          ].map((field) => (
            <div key={field.name}>
              <label className="text-sm font-medium text-gray-600 block mb-1">{field.label}</label>
              <input
                type={field.type}
                name={field.name}
                required
                value={(form as any)[field.name]}
                onChange={handleChange}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:border-brand-500 focus:outline-none text-sm transition-colors"
              />
            </div>
          ))}

          <div className="pt-4">
            <p className="text-sm text-gray-500 mb-2">Payment Method</p>
            <div className="bg-brand-50 p-3 rounded-xl text-sm text-gray-600 flex items-center gap-2">
              <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-brand-500"><polyline points="20 6 9 17 4 12"/></svg>
              Cash on Delivery (COD) &mdash; Pay when you receive.
            </div>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-brand-500 text-white py-3.5 rounded-full font-semibold hover:bg-brand-600 disabled:opacity-50 flex items-center justify-center gap-2 transition-all shadow-lg shadow-brand-500/25"
          >
            {submitting && <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="animate-spin"><path d="M21 12a9 9 0 11-6.219-8.56"/></svg>}
            Place Order &mdash; ${total.toFixed(2)}
          </button>
        </form>

        <div className="md:col-span-2">
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
            <h3 className="font-semibold text-dark mb-4">Order Summary</h3>
            <div className="space-y-3 mb-4">
              {items.map((item) => (
                <div key={item.slug} className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gray-50 rounded-lg overflow-hidden shrink-0">
                    <img src={item.image || '/placeholder.svg'} alt={item.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-dark truncate">{item.title}</p>
                    <p className="text-xs text-gray-400">x{item.quantity}</p>
                  </div>
                  <p className="text-sm font-semibold text-dark">${(item.price * item.quantity).toFixed(2)}</p>
                </div>
              ))}
            </div>
            <div className="border-t pt-3 space-y-1 text-sm">
              <div className="flex justify-between text-gray-500">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-500">
                <span>Shipping</span>
                <span>{shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}</span>
              </div>
              <div className="flex justify-between font-bold text-dark text-base border-t pt-2">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
