export interface Product {
  slug: string;
  name: string;
  image: string;
  price: number;
  category: string;
  description: string;
  sizes?: string[];
  colors?: string[];
}

export const products: Product[] = [
  { slug: 'sports-t-shirt', name: 'Sports t-shirt', image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=600&q=80', price: 29.99, category: 'T-Shirts', description: 'High-performance athletic tee designed for comfort and breathability. Perfect for showcasing your custom designs during workouts or casual wear.', sizes: ['S','M','L','XL','2XL','3XL'], colors: ['White','Black','Navy','Red','Charcoal'] },
  { slug: 'classic-t-shirt', name: 'Classic t-shirt', image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&q=80', price: 24.99, category: 'T-Shirts', description: 'Timeless everyday essential. Made from premium combed ring-spun cotton for a soft feel and durable print surface.', sizes: ['S','M','L','XL','2XL'], colors: ['White','Black','Navy','Sage','Charcoal'] },
  { slug: 'premium-hoodie', name: 'Premium hoodie', image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600&q=80', price: 54.99, category: 'Hoodies', description: 'Ultra-comfortable heavyweight hoodie with fleece lining. Your custom design printed with vibrant, long-lasting colors.', sizes: ['S','M','L','XL','2XL','3XL'], colors: ['Black','Navy','Charcoal','White'] },
  { slug: 'tote-bag', name: 'Tote bag', image: 'https://images.unsplash.com/photo-1597484661643-2f5fef640dd1?w=600&q=80', price: 19.99, category: 'Accessories', description: 'Eco-friendly canvas tote bag. Spacious and durable, perfect for everyday use with your unique printed design.', sizes: ['One Size'], colors: ['Natural','Black','Navy'] },
  { slug: 'phone-case', name: 'Phone case', image: 'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=600&q=80', price: 18.99, category: 'Accessories', description: 'Slim, protective phone case with full-color custom printing. Shock-absorbent and scratch-resistant.', sizes: ['iPhone','Samsung','Pixel','OnePlus'], colors: ['Clear','Black','White'] },
  { slug: 'ceramic-mug', name: 'Ceramic mug', image: 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=600&q=80', price: 14.99, category: 'Drinkware', description: 'Premium 11oz ceramic mug with vibrant full-color print. Dishwasher and microwave safe.', sizes: ['11oz','15oz'], colors: ['White','Black'] },
  { slug: 'poster-print', name: 'Poster print', image: 'https://images.unsplash.com/photo-1580130379624-3a069adbffc5?w=600&q=80', price: 12.99, category: 'Posters', description: 'High-resolution giclée print on premium archival paper. Your designs deserve museum-quality reproduction.', sizes: ['12x18','18x24','24x36'], colors: ['Matte','Glossy'] },
  { slug: 'structured-cap', name: 'Structured cap', image: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=600&q=80', price: 22.99, category: 'Hats', description: 'Premium structured cap with high-definition embroidered or printed design. Adjustable fit for all head sizes.', sizes: ['One Size'], colors: ['Black','Navy','White','Red'] },
  { slug: 'performance-tee', name: 'Performance tee', image: 'https://images.unsplash.com/photo-1618354691792-d1d42acfd860?w=600&q=80', price: 34.99, category: 'T-Shirts', description: 'Moisture-wicking performance fabric ideal for sports and active lifestyles. Your design stays vibrant wash after wash.', sizes: ['S','M','L','XL','2XL'], colors: ['White','Black','Navy','Red','Charcoal'] },
  { slug: 'heavyweight-hoodie', name: 'Heavyweight hoodie', image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600&q=80', price: 64.99, category: 'Hoodies', description: 'Extra-thick 500gsm fleece hoodie for maximum warmth. Built to last with reinforced seams and your custom print.', sizes: ['S','M','L','XL','2XL','3XL'], colors: ['Black','Charcoal','Navy'] },
];

export const designs = [
  { name: 'Rave party', image: 'https://images.unsplash.com/photo-1618354691792-d1d42acfd860?w=400&q=80' },
  { name: 'Kitty cat', image: 'https://images.unsplash.com/photo-1574158622682-e40e69881006?w=400&q=80' },
  { name: 'Noodle', image: 'https://images.unsplash.com/photo-1555126634-323283e090fa?w=400&q=80' },
  { name: 'Amigos', image: 'https://images.unsplash.com/photo-1604079628040-94301bb21b91?w=400&q=80' },
  { name: 'Skater', image: 'https://images.unsplash.com/photo-1544923246-77307dd270b8?w=400&q=80' },
  { name: 'Tiger', image: 'https://images.unsplash.com/photo-1561731216-c3a4d99437d5?w=400&q=80' },
  { name: 'Foodie', image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&q=80' },
  { name: 'Archer', image: 'https://images.unsplash.com/photo-1531251445707-1f000e1e87f0?w=400&q=80' },
  { name: 'Lion king', image: 'https://images.unsplash.com/photo-1561731216-c3a4d99437d5?w=400&q=80' },
  { name: 'Dragon', image: 'https://images.unsplash.com/photo-1531251445707-1f000e1e87f0?w=400&q=80' },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}
