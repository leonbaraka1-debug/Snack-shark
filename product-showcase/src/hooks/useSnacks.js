import { useState, useEffect, useCallback } from 'react';

const API_URL = 'http://localhost:3001/products';

export function useSnacks() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(API_URL);
      if (!res.ok) throw new Error(`Failed to fetch products: ${res.status}`);
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const addProduct = useCallback(async (newProduct) => {
    setError(null);
    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newProduct),
      });
      if (!res.ok) throw new Error(`Failed to add product: ${res.status}`);
      const created = await res.json();
      setProducts((prev) => [...prev, created]);
      return created;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }, []);

  const updateProduct = useCallback(async (id, updates) => {
    setError(null);
    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates),
      });
      if (!res.ok) throw new Error(`Failed to update product: ${res.status}`);
      const updated = await res.json();
      setProducts((prev) =>
        prev.map((p) => (String(p.id) === String(id) ? updated : p))
      );
      return updated;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }, []);

  const deleteProduct = useCallback(async (id) => {
    setError(null);
    try {
      const res = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error(`Failed to delete product: ${res.status}`);
      setProducts((prev) => prev.filter((p) => String(p.id) !== String(id)));
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }, []);

  return { products, loading, error, addProduct, updateProduct, deleteProduct, refetch: fetchProducts };
}

export default useSnacks;
