const logos = [
  'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=120&q=80',
  'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=120&q=80',
  'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=120&q=80',
  'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=120&q=80',
  'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=120&q=80',
  'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=120&q=80',
];

export default function BrandLogos() {
  return (
    <section className="py-12 bg-white border-y border-gray-100">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-center gap-8 md:gap-16 flex-wrap opacity-30">
          {logos.map((src, i) => (
            <img key={i} src={src} alt={`Brand ${i + 1}`} className="h-8 md:h-10 grayscale" />
          ))}
        </div>
      </div>
    </section>
  );
}
