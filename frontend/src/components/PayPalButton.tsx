'use client';

import { useState } from 'react';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import { api } from '@/lib/api';
import { useCart } from '@/context/CartContext';

interface PayPalButtonProps {
  form: {
    name: string;
    email: string;
    phone: string;
    street: string;
    city: string;
    state: string;
    zip: string;
    country: string;
  };
  subtotal: number;
  shipping: number;
  total: number;
  onSuccess: () => void;
  onError: (msg: string) => void;
}

export default function PayPalCheckoutButton({
  form, subtotal, shipping, total, onSuccess, onError,
}: PayPalButtonProps) {
  const { items, clearCart } = useCart();
  const [loading, setLoading] = useState(false);

  const orderData = {
    items: items.map(i => ({
      product: i.productId,
      name: i.name,
      price: i.price,
      quantity: i.quantity,
      size: i.size,
      color: i.color,
      image: i.image,
      customization: i.customization,
    })),
    shippingAddress: form,
    subtotal,
    shipping,
    total,
  };

  return (
    <PayPalScriptProvider
      options={{
        clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID!,
        currency: 'USD',
        intent: 'capture',
      }}
    >
      <PayPalButtons
        disabled={loading}
        style={{ layout: 'vertical', color: 'gold', shape: 'rect', label: 'paypal' }}
        createOrder={async () => {
          setLoading(true);
          const { orderID } = await api.payments.createPayPalOrder(total);
          return orderID;
        }}
        onApprove={async (data) => {
          try {
            await api.payments.capturePayPalOrder(data.orderID, orderData);
            clearCart();
            onSuccess();
          } catch (err: any) {
            onError(err.message);
          } finally {
            setLoading(false);
          }
        }}
        onCancel={() => {
          setLoading(false);
          onError('Payment was cancelled.');
        }}
        onError={(err) => {
          setLoading(false);
          onError(typeof err === 'string' ? err : 'PayPal error occurred');
        }}
      />
    </PayPalScriptProvider>
  );
}
