'use client';

import Link from 'next/link';
import { useCart } from '@/context/CartContext';


export default function CartPage() {
  const { items, removeItem, updateQuantity, subtotal } = useCart();

  if (items.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center">
        <svg width={48} height={48} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mx-auto mb-4 text-gray-300"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg>
        <h1 className="text-2xl font-bold mb-2 text-dark">Your Cart is Empty</h1>
        <p className="text-gray-500 mb-6">Add some products to get started!</p>
        <Link href="/products" className="bg-brand-500 text-white px-6 py-3 rounded-full font-semibold hover:bg-brand-600 inline-flex items-center gap-2 transition-colors">
          <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg> Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-dark mb-8">Shopping Cart</h1>

      <div className="space-y-4 mb-8">
        {items.map((item) => (
          <div key={item.slug} className="flex items-center gap-4 bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
            <div className="w-20 h-20 bg-gray-50 rounded-xl overflow-hidden shrink-0">
              <img src={item.image || '/placeholder.svg'} alt={item.title} className="w-full h-full object-cover" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-sm text-dark truncate">{item.title}</h3>
              {item.color && <p className="text-xs text-gray-400">Color: {item.color}</p>}
              {item.size && <p className="text-xs text-gray-400">Size: {item.size}</p>}
              <p className="text-brand-500 font-bold mt-1">${item.price.toFixed(2)}</p>
            </div>
            <div className="flex items-center border border-gray-200 rounded-full">
              <button onClick={() => updateQuantity(item.slug, item.quantity - 1)} className="p-2 hover:bg-gray-50 rounded-l-full transition-colors">
                <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/></svg>
              </button>
              <span className="px-3 text-sm font-semibold text-dark">{item.quantity}</span>
              <button onClick={() => updateQuantity(item.slug, item.quantity + 1)} className="p-2 hover:bg-gray-50 rounded-r-full transition-colors">
                <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
              </button>
            </div>
            <p className="font-bold text-dark w-24 text-right">${(item.price * item.quantity).toFixed(2)}</p>
            <button onClick={() => removeItem(item.slug)} className="p-2 text-red-400 hover:text-red-600 transition-colors">
              <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2"/></svg>
            </button>
          </div>
        ))}
      </div>

      <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
        <div className="flex justify-between items-center mb-2 text-sm text-gray-500">
          <span>Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between items-center mb-4 text-sm text-gray-500">
          <span>Shipping</span>
          <span>{subtotal >= 50 ? 'FREE' : '$5.00'}</span>
        </div>
        <div className="flex justify-between items-center text-lg font-bold text-dark border-t pt-4 mb-6">
          <span>Total</span>
          <span>${(subtotal >= 50 ? subtotal : subtotal + 5).toFixed(2)}</span>
        </div>
        <Link
          href="/checkout"
          className="block w-full bg-brand-500 text-white py-3.5 rounded-full font-semibold text-center hover:bg-brand-600 transition-all shadow-lg shadow-brand-500/25"
        >
          Proceed to Checkout
        </Link>
      </div>
    </div>
  );
}
