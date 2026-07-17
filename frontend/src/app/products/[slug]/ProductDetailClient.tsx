'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { api } from '@/lib/api';
import { getProductBySlug } from '@/lib/products';
import { useCart } from '@/context/CartContext';
import TShirtCustomizer from '@/components/TShirtCustomizer';

function IconChevronLeft({ size = 16 }: { size?: number }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>;
}
function IconCheck({ size = 18, className }: { size?: number; className?: string }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><polyline points="20 6 9 17 4 12"/></svg>;
}
function IconX({ size = 18, className }: { size?: number; className?: string }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>;
}
function IconShoppingBag({ size = 18, className }: { size?: number; className?: string }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg>;
}
function IconPencil({ size = 18 }: { size?: number }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 3a2.828 2.828 0 114 4L7.5 20.5 2 22l1.5-5.5L17 3z"/></svg>;
}
function IconTruck({ size = 16, className }: { size?: number; className?: string }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>;
}
function IconShield({ size = 16, className }: { size?: number; className?: string }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>;
}
function IconRotateCcw({ size = 16, className }: { size?: number; className?: string }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 102.13-9.36L1 10"/></svg>;
}

export default function ProductDetailClient() {
  const { slug } = useParams();
  const { addItem } = useCart();

  const staticProduct = getProductBySlug(slug as string);
  const [product, setProduct] = useState<any>(staticProduct || null);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const [customizing, setCustomizing] = useState(false);
  const [customization, setCustomization] = useState({ color: 'White', size: 'M', designSnapshot: null as string | null });

  useEffect(() => {
    async function load() {
      try {
        const data = await api.products.get(slug as string);
        if (data) setProduct(data);
      } catch {}
    }
    load();
  }, [slug]);

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <p className="text-gray-500">Product not found.</p>
        <Link href="/products" className="text-brand-500 hover:underline mt-4 inline-block">Back to Shop</Link>
      </div>
    );
  }

  const productName = product.title?.en || product.name || 'Custom Product';
  const basePrice = product.price || 29.99;
  const productImage = product.images?.[0] || product.image || '';
  const description = product.description?.en || product.description || '';
  const sizes = product.sizes || undefined;
  const colors = product.colors || undefined;
  const category = product.category || '';

  const handleAdd = () => {
    addItem({
      productId: product._id || slug as string,
      slug: slug as string,
      title: productName,
      price: basePrice,
      quantity: qty,
      image: productImage,
      color: customization.color,
      size: customization.size,
      designSnapshot: customization.designSnapshot || undefined,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  if (customizing) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <button onClick={() => setCustomizing(false)}
          className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-brand-500 mb-6 transition-colors"
        >
          <IconChevronLeft size={16} /> Back to item
        </button>

        <TShirtCustomizer
          productName={productName}
          basePrice={basePrice}
          image={productImage}
          sizes={sizes}
          colors={colors}
          onCustomizationChange={(c) => setCustomization(c)}
        />

        <div className="mt-8 flex gap-4">
          <button onClick={() => setCustomizing(false)}
            className="flex-1 py-3.5 rounded-full font-semibold border-2 border-gray-200 text-gray-600 hover:border-gray-300 transition-all"
          >
            <IconX size={18} className="inline mr-2" /> Cancel
          </button>
          <button onClick={() => { setCustomizing(false); handleAdd(); }}
            className="flex-1 py-3.5 rounded-full font-semibold bg-brand-500 text-white hover:bg-brand-600 shadow-lg shadow-brand-500/25 transition-all"
          >
            <IconCheck size={18} className="inline mr-2" /> Save &amp; Add to Cart &mdash; ${(basePrice * qty).toFixed(2)}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <Link href="/products" className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-brand-500 mb-6 transition-colors">
        <IconChevronLeft size={16} /> Back to Shop
      </Link>

      <div className="grid md:grid-cols-2 gap-10">
        <div className="space-y-4">
          <div className="relative h-[500px] rounded-2xl overflow-hidden bg-gray-50 border border-gray-200">
            {productImage && (
              <img src={productImage} alt={productName} className="absolute inset-0 w-full h-full object-cover" />
            )}
          </div>
          {productImage && (
            <div className="flex gap-2">
              <div className="w-16 h-16 rounded-lg overflow-hidden border-2 border-brand-500">
                <img src={productImage} alt="" className="w-full h-full object-cover" />
              </div>
            </div>
          )}
        </div>

        <div className="space-y-5">
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-brand-500">{category}</span>
            <h1 className="text-3xl font-bold text-dark mt-1">{productName}</h1>
            <p className="text-2xl font-bold text-brand-500 mt-2">${basePrice.toFixed(2)}</p>
          </div>

          <div className="flex items-center gap-1 text-sm text-yellow-500">
            {'★'.repeat(5)} <span className="text-gray-400 ml-1">(3 reviews)</span>
          </div>

          {description && (
            <p className="text-gray-600 leading-relaxed text-sm">{description}</p>
          )}

          <div className="border-t border-gray-100 pt-5 space-y-5">
            {sizes && sizes.length > 0 && (
              <div>
                <p className="text-sm font-semibold text-dark mb-3">Size</p>
                <div className="flex flex-wrap gap-2">
                  {sizes.map((s: string) => (
                    <button key={s} onClick={() => setCustomization((c) => ({ ...c, size: s }))}
                      className={`px-4 py-2.5 rounded-lg text-sm font-medium border transition-all ${
                        customization.size === s
                          ? 'bg-brand-500 text-white border-brand-500 shadow-md'
                          : 'bg-white border-gray-200 text-gray-600 hover:border-brand-300'
                      }`}
                    >{s}</button>
                  ))}
                </div>
              </div>
            )}

            {colors && colors.length > 0 && (
              <div>
                <p className="text-sm font-semibold text-dark mb-3">Color: <span className="font-normal text-gray-500">{customization.color}</span></p>
                <div className="flex flex-wrap gap-2">
                  {colors.map((c: string) => (
                    <button key={c} onClick={() => setCustomization((prev) => ({ ...prev, color: c }))}
                      className={`px-4 py-2.5 rounded-lg text-sm font-medium border transition-all ${
                        customization.color === c
                          ? 'bg-brand-500 text-white border-brand-500 shadow-md'
                          : 'bg-white border-gray-200 text-gray-600 hover:border-brand-300'
                      }`}
                    >{c}</button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="border-t border-gray-100 pt-5">
            <p className="text-sm font-semibold text-dark mb-3">Quantity</p>
            <div className="flex items-center border border-gray-200 rounded-full w-fit">
              <button onClick={() => setQty(Math.max(1, qty - 1))} className="p-3 hover:bg-gray-50 rounded-l-full transition-colors">&minus;</button>
              <span className="px-4 font-semibold min-w-[2rem] text-center text-dark">{qty}</span>
              <button onClick={() => setQty(qty + 1)} className="p-3 hover:bg-gray-50 rounded-r-full transition-colors">+</button>
            </div>
          </div>

          <div className="flex flex-col gap-3 pt-2">
            <button onClick={handleAdd}
              className={`w-full py-3.5 rounded-full font-semibold flex items-center justify-center gap-2 transition-all ${
                added ? 'bg-green-500 text-white' : 'bg-brand-500 text-white hover:bg-brand-600 shadow-lg shadow-brand-500/25'
              }`}
            >
              {added ? <><IconCheck size={18} /> Added to Cart!</> : <><IconShoppingBag size={18} /> Add to Cart &mdash; ${(basePrice * qty).toFixed(2)}</>}
            </button>

            <button onClick={() => setCustomizing(true)}
              className="w-full py-3.5 rounded-full font-semibold flex items-center justify-center gap-2 border-2 border-brand-500 text-brand-500 hover:bg-brand-50 transition-all"
            >
              <IconPencil size={18} /> Customize
            </button>
          </div>

          <div className="grid grid-cols-3 gap-3 pt-4">
            <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-xl">
              <IconTruck size={16} className="text-brand-500 shrink-0" />
              <div className="text-xs">
                <p className="font-semibold text-dark">Free Shipping</p>
                <p className="text-gray-500">Over $50</p>
              </div>
            </div>
            <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-xl">
              <IconShield size={16} className="text-brand-500 shrink-0" />
              <div className="text-xs">
                <p className="font-semibold text-dark">Secure</p>
                <p className="text-gray-500">Checkout</p>
              </div>
            </div>
            <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-xl">
              <IconRotateCcw size={16} className="text-brand-500 shrink-0" />
              <div className="text-xs">
                <p className="font-semibold text-dark">Returns</p>
                <p className="text-gray-500">30 days</p>
              </div>
            </div>
          </div>

          <div className="bg-brand-50 rounded-2xl p-5">
            <h3 className="font-bold text-dark mb-2">Product Details</h3>
            <ul className="space-y-1.5 text-sm text-gray-600">
              <li>&bull; Premium quality materials</li>
              <li>&bull; High-resolution full-color printing</li>
              <li>&bull; Wash-resistant &mdash; eco-friendly inks</li>
              <li>&bull; Available in multiple colors and sizes</li>
              <li>&bull; Free shipping on orders over $50</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
