import ProductDetailClient from './ProductDetailClient';

const ALL_SLUGS = [
  'classic-fit-tshirt', 'premium-hoodie', 'structured-cap',
  'canvas-wall-art', 'ceramic-mug', 'tough-phone-case',
  'tote-bag', 'premium-poster-print', 'performance-tee', 'heavyweight-hoodie',
];

export async function generateStaticParams() {
  try {
    const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
    const res = await fetch(`${API_BASE}/products`);
    if (res.ok) {
      const products = await res.json();
      if (products.length > 0) return products.map((p: any) => ({ slug: p.slug }));
    }
  } catch {}
  return ALL_SLUGS.map(slug => ({ slug }));
}

export default function ProductPage() {
  return <ProductDetailClient />;
}
