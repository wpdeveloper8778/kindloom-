'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ShoppingBag, Menu, X, Search } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { BASE_PATH } from '@/lib/base';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/products', label: 'Shop' },
  { href: '/products?category=t-shirts', label: 'T-Shirts' },
  { href: '/products?category=hoodies', label: 'Hoodies' },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { totalItems } = useCart();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-zinc-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <img src={`${BASE_PATH}/kindloom_logo.svg`} alt="Kindloom" className="h-7 w-auto" />
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-zinc-600 hover:text-brand-500 transition-colors font-medium"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <button className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-lg bg-zinc-100 text-zinc-500 text-sm hover:bg-zinc-200 transition-colors">
              <Search size={16} />
              <span className="hidden lg:inline">Search...</span>
            </button>
            <Link href="/cart" className="relative p-2 text-zinc-600 hover:text-brand-500 transition-colors">
              <ShoppingBag size={20} />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-brand-500 text-white text-[10px] flex items-center justify-center font-bold">
                  {totalItems}
                </span>
              )}
            </Link>
            <button
              className="md:hidden p-2 text-zinc-600 hover:text-brand-500"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden border-t border-zinc-200 bg-white">
          <nav className="px-4 py-4 space-y-1">
            {navLinks.map(link => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="block px-4 py-2.5 rounded-lg text-sm text-zinc-700 hover:bg-zinc-100 hover:text-brand-500 transition-colors font-medium"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
