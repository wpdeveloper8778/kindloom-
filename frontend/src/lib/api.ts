const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

async function fetchAPI(endpoint: string, options?: RequestInit) {
  const res = await fetch(`${API_BASE}${endpoint}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });
  if (!res.ok) throw new Error(`API error: ${res.status}`);
  return res.json();
}

export const api = {
  products: {
    list: (params?: string) => fetchAPI(`/products${params ? `?${params}` : ''}`),
    get: (slug: string) => fetchAPI(`/products/${slug}`),
    featured: () => fetchAPI('/products/featured'),
    review: (id: string, data: { name: string; email: string; rating: number; title: string; review: string }) =>
      fetchAPI(`/products/${id}/reviews`, { method: 'POST', body: JSON.stringify(data) }),
  },
  orders: {
    create: (data: any) => fetchAPI('/orders', { method: 'POST', body: JSON.stringify(data) }),
    list: () => fetchAPI('/orders'),
    get: (id: string) => fetchAPI(`/orders/${id}`),
  },
  blog: {
    list: (params?: string) => fetchAPI(`/blog${params ? `?${params}` : ''}`),
    get: (slug: string) => fetchAPI(`/blog/${slug}`),
  },
  contact: {
    send: (data: { name: string; email: string; phone?: string; subject: string; message: string }) =>
      fetchAPI('/contact', { method: 'POST', body: JSON.stringify(data) }),
  },
  reviews: {
    list: (featured?: boolean) => fetchAPI(`/reviews${featured ? '?featured=true' : ''}`),
  },
  payments: {
    createPayPalOrder: (amount: number) => fetchAPI('/payments/create-paypal-order', { method: 'POST', body: JSON.stringify({ amount }) }),
    capturePayPalOrder: (orderID: string, data?: any) => fetchAPI(`/payments/capture-paypal-order/${orderID}`, { method: 'POST', body: data ? JSON.stringify(data) : undefined }),
  },
};
