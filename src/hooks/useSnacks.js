import { useState, useEffect, useCallback } from "react";

const API_URL = "http://localhost:3001/snacks";

export function useSnacks() {
  const [snacks, setSnacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // GET - Fetch all snacks
  useEffect(() => {
    let cancelled = false;

    async function loadSnacks() {
      try {
        const res = await fetch(API_URL);

        if (!res.ok) {
          throw new Error(`Failed to fetch snacks: ${res.status}`);
        }

        const data = await res.json();

        if (!cancelled) {
          setSnacks(data);
          setLoading(false);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err.message);
          setLoading(false);
        }
      }
    }

    loadSnacks();

    return () => {
      cancelled = true;
    };
  }, []);

  // POST - Add snack
  const addProduct = useCallback(async (newProduct) => {
    setError(null);

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newProduct),
      });

      if (!res.ok) {
        throw new Error(`Failed to add snack: ${res.status}`);
      }

      const created = await res.json();

      setSnacks((prev) => [...prev, created]);

      return created;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }, []);

  // PATCH - Update snack
  const updateProduct = useCallback(async (id, updates) => {
    setError(null);

    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updates),
      });

      if (!res.ok) {
        throw new Error(`Failed to update snack: ${res.status}`);
      }

      const updated = await res.json();

      setSnacks((prev) =>
        prev.map((snack) =>
          String(snack.id) === String(id) ? updated : snack
        )
      );

      return updated;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }, []);

  // DELETE - Delete snack
  const deleteProduct = useCallback(async (id) => {
    setError(null);

    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error(`Failed to delete snack: ${res.status}`);
      }

      setSnacks((prev) =>
        prev.filter((snack) => String(snack.id) !== String(id))
      );
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }, []);

  // Refetch snacks manually if needed
  const refetch = useCallback(async () => {
    try {
      setError(null);
      setLoading(true);

      const res = await fetch(API_URL);

      if (!res.ok) {
        throw new Error(`Failed to fetch snacks: ${res.status}`);
      }

      const data = await res.json();
      setSnacks(data);
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    snacks,
    products: snacks, // Alias for backward compatibility
    loading,
    error,
    addProduct,
    updateProduct,
    deleteProduct,
    refetch,
  };
}

export default useSnacks;