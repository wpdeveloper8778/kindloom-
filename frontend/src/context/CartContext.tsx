'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

interface CartItem {
  productId: string;
  slug: string;
  title: string;
  price: number;
  quantity: number;
  image: string;
  color?: string;
  size?: string;
  designImage?: string;
}

interface CartContextType {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (slug: string, color?: string, size?: string) => void;
  updateQuantity: (slug: string, qty: number, color?: string, size?: string) => void;
  clearCart: () => void;
  totalItems: number;
  subtotal: number;
}

const CartContext = createContext<CartContextType>({
  items: [],
  addItem: () => {},
  removeItem: () => {},
  updateQuantity: () => {},
  clearCart: () => {},
  totalItems: 0,
  subtotal: 0,
});

function itemKey(item: { slug: string; color?: string; size?: string }): string {
  return `${item.slug}_${item.color || ''}_${item.size || ''}`;
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  const addItem = (item: CartItem) => {
    setItems((prev) => {
      const key = itemKey(item);
      const existing = prev.find((i) => itemKey(i) === key);
      if (existing) {
        return prev.map((i) =>
          itemKey(i) === key ? { ...i, quantity: i.quantity + item.quantity } : i
        );
      }
      return [...prev, item];
    });
  };

  const removeItem = (slug: string, color?: string, size?: string) => {
    const key = `${slug}_${color || ''}_${size || ''}`;
    setItems((prev) => prev.filter((i) => itemKey(i) !== key));
  };

  const updateQuantity = (slug: string, qty: number, color?: string, size?: string) => {
    const key = `${slug}_${color || ''}_${size || ''}`;
    if (qty <= 0) { removeItem(slug, color, size); return; }
    setItems((prev) => prev.map((i) => (itemKey(i) === key ? { ...i, quantity: qty } : i)));
  };

  const clearCart = () => setItems([]);

  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);
  const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, updateQuantity, clearCart, totalItems, subtotal }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
