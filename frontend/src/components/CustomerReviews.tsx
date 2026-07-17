'use client';



export default function CustomerReviews({ reviews, loading }: { reviews: any[]; loading: boolean }) {
  return (
    <section className="bg-[#1B2A4A] py-16 text-white">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-2">What Our Customers Say</h2>
        <p className="text-[#F5F0EB]/70 text-center mb-10">
          Real reviews from happy pet parents
        </p>
        {loading ? (
          <div className="grid md:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-white/10 rounded-xl p-6 animate-pulse h-40" />
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-6">
            {reviews.map((r, i) => (
              <div key={i} className="bg-white/10 backdrop-blur-sm rounded-xl p-6 relative">
                <svg width={24} height={24} viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" className="text-[#9CAF88]/30 absolute top-4 right-4"><path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"/><path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z"/></svg>
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(5)].map((_, s) => (
                    <svg key={s} width={14} height={14} viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={s < r.rating ? 'fill-[#C9A96E] text-[#C9A96E]' : 'text-gray-500'}><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                  ))}
                </div>
                <p className="text-sm text-[#F5F0EB]/80 mb-4 leading-relaxed">{r.review}</p>
                <p className="font-semibold text-sm text-[#9CAF88]">{r.name}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
