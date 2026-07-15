import { Mail, Phone, MapPin } from 'lucide-react';
import Link from 'next/link';
import { BASE_PATH } from '@/lib/base';

const footerLinks = {
  shop: [
    { label: 'T-Shirts', href: '/products?category=t-shirts' },
    { label: 'Hoodies', href: '/products?category=hoodies' },
    { label: 'Caps', href: '/products?category=caps' },
    { label: 'Wall Art', href: '/products?category=wall-art' },
    { label: 'Mugs', href: '/products?category=mugs' },
    { label: 'Phone Cases', href: '/products?category=phone-cases' },
  ],
  support: [
    { label: 'Contact Us', href: '#' },
    { label: 'Shipping Info', href: '#' },
    { label: 'Returns & Exchanges', href: '#' },
    { label: 'Size Guide', href: '#' },
    { label: 'FAQ', href: '#' },
  ],
  company: [
    { label: 'About Us', href: '#' },
    { label: 'Careers', href: '#' },
    { label: 'Privacy Policy', href: '#' },
    { label: 'Terms of Service', href: '#' },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-zinc-900 text-zinc-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-2">
            <img src={`${BASE_PATH}/kindloom_logo.svg`} alt="Kindloom" className="h-6 w-auto mb-4 brightness-0 invert" />
            <p className="text-sm text-zinc-400 leading-relaxed mb-4">
              Premium print-on-demand custom apparel and accessories. Your design, our quality — made just for you.
            </p>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <Mail size={14} className="text-zinc-500" />
                <span>hello@kindloom.com</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone size={14} className="text-zinc-500" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin size={14} className="text-zinc-500" />
                <span>New York, NY</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-white font-semibold text-sm mb-3">Shop</h4>
            <ul className="space-y-2">
              {footerLinks.shop.map(link => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-zinc-400 hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold text-sm mb-3">Support</h4>
            <ul className="space-y-2">
              {footerLinks.support.map(link => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-zinc-400 hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold text-sm mb-3">Company</h4>
            <ul className="space-y-2">
              {footerLinks.company.map(link => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-zinc-400 hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-8 border-t border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-zinc-500">
            &copy; {new Date().getFullYear()} Kindloom. All rights reserved.
          </p>
          <div className="flex items-center gap-3">
            <span className="text-xs text-zinc-500">We accept</span>
            {['visa', 'mastercard', 'amex', 'paypal'].map(pm => (
              <span key={pm} className="px-2.5 py-1 rounded bg-zinc-800 text-[10px] font-semibold text-zinc-400 uppercase tracking-wider">
                {pm}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
