'use client';

import Link from 'next/link';

const collections = [
  {
    key: 'dog',
    en: 'For Dogs', ar: 'للكلاب',
    desc: { en: 'Food, toys, beds & more', ar: 'طعام، ألعاب، أسرّة والمزيد' },
    emoji: '🐕',
    bg: 'bg-amber-50',
  },
  {
    key: 'cat',
    en: 'For Cats', ar: 'للقطط',
    desc: { en: 'Treats, litter, scratching posts', ar: 'مكافآت، فضلات، أعمدة خدش' },
    emoji: '🐈',
    bg: 'bg-emerald-50',
  },
  {
    key: 'bird',
    en: 'For Birds', ar: 'للطيور',
    desc: { en: 'Cages, feed, toys', ar: 'أقفاص، طعام، ألعاب' },
    emoji: '🐦',
    bg: 'bg-sky-50',
  },
  {
    key: 'small-pet',
    en: 'Small Pets', ar: 'للحيوانات الصغيرة',
    desc: { en: 'Habitats, hay, accessories', ar: 'مساكن، تبن، إكسسوارات' },
    emoji: '🐹',
    bg: 'bg-purple-50',
  },
];

export default function FeaturedCollections() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-16">
      <h2 className="text-3xl font-bold text-center mb-2">Shop by Pet</h2>
      <p className="text-gray-500 text-center mb-10">
        Find everything your pet needs
      </p>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {collections.map((col) => (
          <Link
            key={col.key}
            href={`/products?petType=${col.key}`}
            className={`${col.bg} rounded-2xl p-6 text-center hover:shadow-md transition-all hover:-translate-y-1`}
          >
            <span className="text-5xl block mb-3">{col.emoji}</span>
            <h3 className="font-semibold text-lg">{col.en}</h3>
            <p className="text-gray-500 text-sm">{col.desc.en}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
