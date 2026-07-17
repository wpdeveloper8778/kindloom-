const offers = [
  {
    icon: <svg width={28} height={28} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="13.5" cy="6.5" r=".5"/><circle cx="17.5" cy="10.5" r=".5"/><circle cx="8.5" cy="7.5" r=".5"/><circle cx="6.5" cy="12.5" r=".5"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 011.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"/></svg>,
    title: 'Variety of colors',
    description: 'Consectetur adipiscing elit, sed do eiusm od tempor incididunt ut labore.',
  },
  {
    icon: <svg width={28} height={28} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3l1.912 5.813a2 2 0 001.9 1.374H21l-4.921 3.573a2 2 0 00-.722 2.236l1.874 5.812-4.9-3.572a2 2 0 00-2.35 0l-4.9 3.572 1.873-5.812a2 2 0 00-.722-2.236L3 10.187h5.188a2 2 0 001.9-1.374L12 3z"/></svg>,
    title: 'Unique designs',
    description: 'Consectetur adipiscing elit, sed do eiusm od tempor incididunt ut labore.',
  },
  {
    icon: <svg width={28} height={28} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 01-2-2v-5a2 2 0 012-2h16a2 2 0 012 2v5a2 2 0 01-2 2h-2"/><rect x="6" y="14" width="12" height="8"/></svg>,
    title: 'High quality printing',
    description: 'Consectetur adipiscing elit, sed do eiusm od tempor incididunt ut labore.',
  },
];

export default function OffersSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <p className="text-brand-500 font-semibold text-sm tracking-widest uppercase mb-2">What we offer</p>
          <h3 className="text-3xl md:text-4xl font-bold text-dark">Personalization with Kindloom</h3>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {offers.map((offer, i) => (
            <div key={i} className="group p-8 rounded-2xl border border-gray-100 hover:border-brand-500/20 hover:bg-brand-50/50 transition-all">
              <div className="w-14 h-14 rounded-xl bg-brand-50 flex items-center justify-center mb-5 group-hover:bg-brand-500 transition-colors">
                <div className="text-brand-500 group-hover:text-white transition-colors">{offer.icon}</div>
              </div>
              <h4 className="text-xl font-bold text-dark mb-3">{offer.title}</h4>
              <p className="text-gray-500 leading-relaxed">{offer.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
