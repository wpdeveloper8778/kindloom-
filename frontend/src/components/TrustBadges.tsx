'use client';

const badges = [
  { icon: <svg width={28} height={28} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>, en: 'Fast Delivery Across UAE', ar: 'توصيل سريع في جميع أنحاء الإمارات', desc: { en: '1-3 business days', ar: '1-3 أيام عمل' } },
  { icon: <svg width={28} height={28} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/></svg>, en: '100% Authentic Products', ar: 'منتجات أصلية 100%', desc: { en: 'Sourced from trusted brands', ar: 'موردة من علامات تجارية موثوقة' } },
  { icon: <svg width={28} height={28} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15"/></svg>, en: 'Easy Returns', ar: 'إرجاع سهل', desc: { en: '14-day return policy', ar: 'سياسة إرجاع لمدة 14 يوماً' } },
  { icon: <svg width={28} height={28} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 18v-6a9 9 0 0118 0v6"/><path d="M21 19a2 2 0 01-2 2h-1a2 2 0 01-2-2v-3a2 2 0 012-2h3zM3 19a2 2 0 002 2h1a2 2 0 002-2v-3a2 2 0 00-2-2H3z"/></svg>, en: '24/7 Customer Support', ar: 'دعم عملاء على مدار الساعة', desc: { en: 'Via WhatsApp & email', ar: 'عبر واتساب والبريد الإلكتروني' } },
];

export default function TrustBadges() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-16">
      <h2 className="text-3xl font-bold text-center mb-2">Why PawLuxe</h2>
      <p className="text-gray-500 text-center mb-10">
        We make pet parenting easy
      </p>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {badges.map((badge, i) => (
          <div key={i} className="text-center p-6 rounded-xl bg-white shadow-sm">
            <div className="text-[#9CAF88] mb-3 flex justify-center">{badge.icon}</div>
            <h3 className="font-semibold mb-1">{badge.en}</h3>
            <p className="text-sm text-gray-500">{badge.desc.en}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
