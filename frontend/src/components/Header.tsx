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
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-lg border-b border-zinc-200/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <img src={`${BASE_PATH}/kindloom_logo.svg`} alt="Kindloom" className="h-7 w-auto" />
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map(link => (
              <Link key={link.href} href={link.href}
                className="text-sm text-zinc-600 hover:text-zinc-900 transition-colors font-medium"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Link href="/search" className="hidden sm:flex p-2 text-zinc-500 hover:text-zinc-800 transition-colors">
              <Search size={19} />
            </Link>
            <Link href="/cart" className="relative p-2 text-zinc-500 hover:text-zinc-800 transition-colors">
              <ShoppingBag size={19} />
              {totalItems > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4.5 h-4.5 rounded-full bg-brand-500 text-white text-[9px] font-bold flex items-center justify-center">
                  {totalItems > 9 ? '9+' : totalItems}
                </span>
              )}
            </Link>
            <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden p-2 text-zinc-500 hover:text-zinc-800">
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="md:hidden border-t border-zinc-200/50 py-4 space-y-1">
            {navLinks.map(link => (
              <Link key={link.href} href={link.href} onClick={() => setMenuOpen(false)}
                className="block px-3 py-2.5 rounded-xl text-sm text-zinc-600 hover:text-zinc-900 hover:bg-zinc-50 font-medium transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <Link href="/search" onClick={() => setMenuOpen(false)}
              className="block px-3 py-2.5 rounded-xl text-sm text-zinc-600 hover:text-zinc-900 hover:bg-zinc-50 font-medium transition-colors"
            >
              Search
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}