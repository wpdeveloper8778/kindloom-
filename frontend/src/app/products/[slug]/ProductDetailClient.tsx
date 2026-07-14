'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, Minus, Plus, ShoppingBag, Star, Check, Upload, Type, Loader } from 'lucide-react';
import { api } from '@/lib/api';
import { useCart } from '@/context/CartContext';
import Link from 'next/link';

export default function ProductDetailClient({ slug: propSlug }: { slug?: string }) {
  const params = useParams();
  const router = useRouter();
  const { addItem } = useCart();

  const slug = propSlug || (params.slug as string);

  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [customText, setCustomText] = useState('');
  const [designUrl, setDesignUrl] = useState('');
  const [selectedImage, setSelectedImage] = useState(0);
  const [addedToCart, setAddedToCart] = useState(false);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    async function load() {
      try {
        const data = await api.products.get(slug as string);
        setProduct(data);
        if (data.colors?.length) setSelectedColor(data.colors[0].name);
        if (data.sizes?.length) setSelectedSize(data.sizes[0]);
      } catch (e) {
        console.error('Failed to load product', e);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [slug]);

  if (loading) {
    return (
      <div className="pt-24 min-h-screen flex items-center justify-center">
        <div className="w-10 h-10 rounded-full border-2 border-brand-500 border-t-transparent animate-spin" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="pt-24 min-h-screen flex flex-col items-center justify-center gap-4">
        <p className="text-zinc-500">Product not found</p>
        <Link href="/products" className="text-brand-500 hover:underline">Back to products</Link>
      </div>
    );
  }

  const color = product.colors?.find((c: any) => c.name === selectedColor);
  const variant = product.variants?.find(
    (v: any) => v.color === selectedColor && v.size === selectedSize
  );
  const price = variant?.price || product.basePrice;

  const handleAddToCart = () => {
    const cartItem = {
      _id: `${product._id}-${selectedColor}-${selectedSize}${customText ? `-${customText}` : ''}`,
      productId: product._id,
      name: product.name,
      price,
      quantity,
      size: selectedSize,
      color: selectedColor,
      image: product.images?.[0] || '',
      customization: {
        ...(customText ? { text: customText, placement: 'front' as const } : {}),
        ...(designUrl ? { designUrl, placement: 'front' as const } : {}),
      },
    };
    addItem(cartItem);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  return (
    <div className="pt-24 pb-16 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-sm text-zinc-500 hover:text-zinc-800 transition-colors mb-8"
        >
          <ChevronLeft size={16} />
          Back
        </button>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-zinc-100 border border-zinc-200 mb-4">
              <img
                src={product.images?.[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              {color && (
                <div className="absolute bottom-4 left-4 px-3 py-1.5 rounded-lg bg-white/90 text-xs text-zinc-700 font-medium shadow-sm">
                  {color.name}
                </div>
              )}
            </div>
            {product.images?.length > 1 && (
              <div className="flex gap-3">
                {product.images.map((img: string, i: number) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition-colors ${
                      i === selectedImage ? 'border-brand-500' : 'border-zinc-200 hover:border-zinc-300'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <span className="text-xs text-brand-500 font-medium uppercase tracking-wider">
              {product.category?.replace('-', ' ')}
            </span>
            <h1 className="text-3xl font-bold text-zinc-800 mt-1 mb-2">{product.name}</h1>
            {product.tagline && (
              <p className="text-base text-zinc-500 italic mb-4">&ldquo;{product.tagline}&rdquo;</p>
            )}
            {product.rating > 0 && (
              <div className="flex items-center gap-2 mb-4">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className={i < Math.round(product.rating) ? 'text-brand-500 fill-brand-500' : 'text-zinc-200'}
                    />
                  ))}
                </div>
                <span className="text-sm text-zinc-500">{product.rating} ({product.reviewCount} reviews)</span>
              </div>
            )}

            <div className="text-3xl font-bold text-zinc-800 mb-6">${price.toFixed(2)}</div>

            <p className="text-zinc-600 leading-relaxed mb-8">{product.description}</p>

            <div className="space-y-6">
              {product.colors?.length > 0 && (
                <div>
                  <label className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-3 block">
                    Color: <span className="text-zinc-800">{selectedColor}</span>
                  </label>
                  <div className="flex flex-wrap gap-3">
                    {product.colors.map((c: any) => (
                      <button
                        key={c.name}
                        onClick={() => setSelectedColor(c.name)}
                        className={`group relative w-10 h-10 rounded-full transition-all ${
                          selectedColor === c.name ? 'scale-110 ring-2 ring-brand-500 ring-offset-2' : 'hover:scale-105'
                        }`}
                        style={{ backgroundColor: c.hex }}
                      >
                        {selectedColor === c.name && (
                          <span className="absolute inset-0 flex items-center justify-center">
                            <Check size={14} className={c.hex === '#FFFFFF' || c.hex === '#FFFDD0' ? 'text-black' : 'text-white'} />
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {product.sizes?.length > 0 && (
                <div>
                  <label className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-3 block">
                    Size: <span className="text-zinc-800">{selectedSize}</span>
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((s: string) => (
                      <button
                        key={s}
                        onClick={() => setSelectedSize(s)}
                        className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                          selectedSize === s
                            ? 'bg-brand-500 text-white'
                            : 'border border-zinc-200 text-zinc-600 hover:border-zinc-300 hover:bg-zinc-50'
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div className="border-t border-zinc-200 pt-6">
                <label className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-3 block">
                  Customize Your Design
                </label>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 border border-zinc-200 rounded-xl px-4 py-3">
                    <Type size={18} className="text-zinc-400 shrink-0" />
                    <input
                      type="text"
                      value={customText}
                      onChange={e => setCustomText(e.target.value)}
                      placeholder="Add your text here..."
                      maxLength={50}
                      className="flex-1 bg-transparent text-zinc-800 placeholder-zinc-400 focus:outline-none text-sm"
                    />
                    {customText && (
                      <button onClick={() => setCustomText('')} className="text-zinc-400 hover:text-zinc-600 text-xs">
                        Clear
                      </button>
                    )}
                  </div>
                  <label className="flex items-center gap-3 border border-zinc-200 rounded-xl px-4 py-3 cursor-pointer hover:bg-zinc-50 transition-colors">
                    {uploading ? (
                      <Loader size={18} className="text-brand-500 animate-spin shrink-0" />
                    ) : (
                      <Upload size={18} className="text-zinc-400 shrink-0" />
                    )}
                    <span className="text-sm text-zinc-500 flex-1">
                      {uploading ? 'Uploading...' : designUrl ? 'Design uploaded' : 'Upload your design'}
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      disabled={uploading}
                      onChange={async e => {
                        const file = e.target.files?.[0];
                        if (!file) return;
                        setUploading(true);
                        try {
                          const result = await api.upload.file(file);
                          setDesignUrl(result.url);
                        } catch {
                          setDesignUrl(URL.createObjectURL(file));
                        } finally {
                          setUploading(false);
                        }
                      }}
                    />
                  </label>
                </div>
              </div>

              <div className="flex items-center gap-4 pt-4">
                <div className="flex items-center border border-zinc-200 rounded-xl">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-3 text-zinc-400 hover:text-zinc-600 transition-colors"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="w-12 text-center text-zinc-800 font-medium">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-3 text-zinc-400 hover:text-zinc-600 transition-colors"
                  >
                    <Plus size={16} />
                  </button>
                </div>
                <motion.button
                  whileTap={{ scale: 0.97 }}
                  onClick={handleAddToCart}
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-brand-500 text-white font-semibold hover:bg-brand-600 transition-all"
                >
                  <AnimatePresence mode="wait">
                    {addedToCart ? (
                      <motion.span
                        key="check"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="flex items-center gap-2"
                      >
                        <Check size={18} /> Added to Cart
                      </motion.span>
                    ) : (
                      <motion.span
                        key="cart"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="flex items-center gap-2"
                      >
                        <ShoppingBag size={18} /> Add to Cart
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.button>
              </div>
            </div>

            {product.features?.length > 0 && (
              <div className="mt-8 pt-8 border-t border-zinc-200">
                <h4 className="text-sm font-semibold text-zinc-800 mb-4">Product Features</h4>
                <ul className="grid grid-cols-2 gap-2">
                  {product.features.map((f: string) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-zinc-600">
                      <Check size={14} className="text-brand-500 shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {product.tags?.length > 0 && (
              <div className="mt-6 flex flex-wrap gap-2">
                {product.tags.map((tag: string) => (
                  <Link
                    key={tag}
                    href={`/products?search=${tag}`}
                    className="px-3 py-1 rounded-full bg-zinc-100 text-xs text-zinc-600 hover:bg-zinc-200 transition-colors"
                  >
                    #{tag}
                  </Link>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
