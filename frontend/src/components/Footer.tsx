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
    <footer className="bg-zinc-900 text-zinc-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">
          <div className="lg:col-span-2">
            <img src={`${BASE_PATH}/kindloom_logo.svg`} alt="Kindloom" className="h-7 w-auto mb-5 brightness-0 invert" />
            <p className="text-sm text-zinc-500 leading-relaxed mb-6 max-w-sm">
              Premium print-on-demand custom apparel and accessories. Your design, our quality — made just for you.
            </p>
            <div className="space-y-2.5 text-sm">
              <div className="flex items-center gap-2.5">
                <Mail size={14} className="text-zinc-600 shrink-0" />
                <span>hello@kindloom.com</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone size={14} className="text-zinc-600 shrink-0" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-2.5">
                <MapPin size={14} className="text-zinc-600 shrink-0" />
                <span>San Francisco, CA</span>
              </div>
            </div>
          </div>

          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-white text-sm font-semibold mb-4 capitalize">{title}</h4>
              <ul className="space-y-2.5">
                {links.map(link => (
                  <li key={link.label}>
                    <Link href={link.href} className="text-sm text-zinc-500 hover:text-zinc-300 transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-zinc-800 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-zinc-600">&copy; 2026 Kindloom. All rights reserved.</p>
          <div className="flex items-center gap-3">
            {['visa', 'mastercard', 'paypal', 'amex'].map(pm => (
              <div key={pm} className="px-3 py-1.5 rounded-lg bg-zinc-800 text-zinc-500 text-[10px] font-semibold uppercase tracking-wider">
                {pm}
              </div>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}