

export default function WelcomeSection() {
  return (
    <>
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-brand-500 font-semibold text-sm tracking-widest uppercase mb-2">Welcome to Kindloom!</p>
              <h3 className="text-3xl md:text-4xl font-bold text-dark mb-6 leading-tight">
                T-shirt designer<br />extraordinaire
              </h3>
              <p className="text-gray-500 leading-relaxed mb-8">
                Dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit.
              </p>
              <div className="grid grid-cols-3 gap-6">
                {[
                  { number: '12K+', label: 'Happy Clients' },
                  { number: '8K+', label: 'Designs Created' },
                  { number: '4', label: 'Years Experience' },
                ].map((stat, i) => (
                  <div key={i}>
                    <div className="text-3xl font-bold text-brand-500">{stat.number}</div>
                    <div className="text-sm text-gray-500 mt-1">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="rounded-2xl overflow-hidden shadow-xl">
                <img
                  src="https://images.unsplash.com/photo-1562157873-818bc0726f68?w=600&q=80"
                  alt="T-shirt printing"
                  className="w-full h-[400px] object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-dark relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-brand-500 rounded-full blur-3xl" />
        </div>
        <div className="max-w-4xl mx-auto px-4 text-center relative">
          <svg width={48} height={48} viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" className="text-brand-500/30 mx-auto mb-6"><path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"/><path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z"/></svg>
          <blockquote className="text-2xl md:text-3xl text-white font-light leading-relaxed mb-8">
            &ldquo;We are what we wear, so let the world know what you are all about! And do it with style&rdquo;
          </blockquote>
          <div className="w-16 h-0.5 bg-brand-500 mx-auto mb-4" />
          <p className="text-brand-500 font-semibold">Peter Bowman</p>
          <p className="text-gray-400 text-sm">Creative Director</p>
        </div>
      </section>
    </>
  );
}
