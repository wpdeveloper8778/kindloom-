import { products } from '@/lib/products';
import ProductDetailClient from './ProductDetailClient';

export async function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export default function ProductDetailPage() {
  return <ProductDetailClient />;
}
