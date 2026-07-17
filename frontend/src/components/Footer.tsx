import Link from 'next/link';

const footerLinks = {
  socials: ['Facebook', 'Twitter', 'Dribbble', 'Instagram'],
  menu: [
    { label: 'Home', href: '/' },
    { label: 'Services', href: '/products' },
    { label: 'About Us', href: '/about' },
    { label: 'Shop', href: '/products' },
    { label: 'Contacts', href: '/contact' },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-dark text-white">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div>
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-brand-500 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                K
              </div>
              <span className="text-lg font-bold">Kindloom</span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed">
              Custom print-on-demand store. Design your own t-shirts, hoodies, and more.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-sm tracking-widest uppercase text-gray-300">Socials</h4>
            <ul className="space-y-2.5 text-sm text-gray-400">
              {footerLinks.socials.map((s) => (
                <li key={s}>
                  <span className="hover:text-brand-500 transition-colors cursor-pointer">{s}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-sm tracking-widest uppercase text-gray-300">Menu</h4>
            <ul className="space-y-2.5 text-sm text-gray-400">
              {footerLinks.menu.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="hover:text-brand-500 transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-sm tracking-widest uppercase text-gray-300">Say Hello</h4>
            <ul className="space-y-2.5 text-sm text-gray-400">
              <li>
                <a href="mailto:info@kindloom.com" className="hover:text-brand-500 transition-colors">
                  info@kindloom.com
                </a>
              </li>
              <li>
                <a href="tel:+18408412569" className="hover:text-brand-500 transition-colors">
                  +1 840 841 25 69
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-500">
            ThemeREX &copy; {new Date().getFullYear()}. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <span className="hover:text-gray-300 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-gray-300 cursor-pointer">Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
