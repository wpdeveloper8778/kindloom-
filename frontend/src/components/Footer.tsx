import Link from 'next/link';

const footerLinks = [
  { label: 'T-Shirts', href: '/products?category=t-shirts' },
  { label: 'Hoodies', href: '/products?category=hoodies' },
  { label: 'Caps', href: '/products?category=caps' },
  { label: 'Wall Art', href: '/products?category=wall-art' },
  { label: 'Mugs', href: '/products?category=mugs' },
  { label: 'All Products', href: '/products' },
];

const supportLinks = [
  { label: 'Shipping Info', href: '#' },
  { label: 'Returns', href: '#' },
  { label: 'Size Guide', href: '#' },
  { label: 'Contact Us', href: '#' },
  { label: 'FAQ', href: '#' },
];

export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-zinc-950/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="block mb-4">
              <img src="/kindloom_logo.svg" alt="Kindloom" className="h-8 w-auto" />
            </Link>
            <p className="text-sm text-zinc-500 leading-relaxed max-w-xs">
              Premium print-on-demand apparel and accessories. Wear your story, share your warmth.
            </p>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-white mb-4">Products</h4>
            <ul className="space-y-2">
              {footerLinks.map(link => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-zinc-500 hover:text-brand-400 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-white mb-4">Support</h4>
            <ul className="space-y-2">
              {supportLinks.map(link => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-zinc-500 hover:text-brand-400 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-white mb-4">Connect</h4>
            <ul className="space-y-2">
              {['Instagram', 'Twitter', 'Facebook', 'Pinterest'].map(social => (
                <li key={social}>
                  <Link href="#" className="text-sm text-zinc-500 hover:text-brand-400 transition-colors">
                    {social}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-zinc-600">&copy; {new Date().getFullYear()} Kindloom. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="#" className="text-xs text-zinc-600 hover:text-zinc-400">Privacy Policy</Link>
            <Link href="#" className="text-xs text-zinc-600 hover:text-zinc-400">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
