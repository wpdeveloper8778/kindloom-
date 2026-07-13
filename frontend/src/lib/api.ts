const isBrowser = typeof window !== 'undefined';
const API_BASE = isBrowser && window.location.hostname !== 'localhost'
  ? '/api'
  : (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api');

async function fetchAPI(endpoint: string, options?: RequestInit) {
  const res = await fetch(`${API_BASE}${endpoint}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ message: `HTTP ${res.status}` }));
    throw new Error(err.message || `API error: ${res.status}`);
  }
  return res.json();
}

export const api = {
  products: {
    list: (params?: string) => fetchAPI(`/products${params ? `?${params}` : ''}`),
    get: (slug: string) => fetchAPI(`/products/${slug}`),
    featured: () => fetchAPI('/products/featured'),
    categories: () => fetchAPI('/products/categories'),
  },
  orders: {
    create: (data: any) => fetchAPI('/orders', { method: 'POST', body: JSON.stringify(data) }),
  },
  contact: {
    send: (data: { name: string; email: string; phone?: string; subject: string; message: string }) =>
      fetchAPI('/contact', { method: 'POST', body: JSON.stringify(data) }),
  },
  payments: {
    createPayPalOrder: (amount: number) =>
      fetchAPI('/payments/create-paypal-order', { method: 'POST', body: JSON.stringify({ amount }) }),
    capturePayPalOrder: (orderID: string, orderData: any) =>
      fetchAPI('/payments/capture-paypal-order', { method: 'POST', body: JSON.stringify({ orderID, orderData }) }),
  },
  upload: {
    file: async (file: File): Promise<{ url: string }> => {
      const formData = new FormData();
      formData.append('file', file);
      const res = await fetch(`${API_BASE}/upload`, { method: 'POST', body: formData });
      if (!res.ok) throw new Error('Upload failed');
      return res.json();
    },
  },
};
