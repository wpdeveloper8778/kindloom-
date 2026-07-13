import ProductDetailClient from './ProductDetailClient';

export async function generateStaticParams() {
  try {
    const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
    const res = await fetch(`${API_BASE}/products`);
    if (res.ok) {
      const products = await res.json();
      if (products.length > 0) return products.map((p: any) => ({ slug: p.slug }));
    }
  } catch {}
  return [
    { slug: 'classic-fit-tshirt' },
    { slug: 'premium-hoodie' },
    { slug: 'structured-cap' },
  ];
}

export default function ProductPage() {
  return <ProductDetailClient />;
}
