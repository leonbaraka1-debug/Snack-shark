import { useState, useEffect, useCallback } from "react";

const API_URL = "http://localhost:3001/snacks";

export function useSnacks() {
  const [snacks, setSnacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // GET - Fetch all snacks
  const fetchSnacks = useCallback(async () => {
    try {
      setError(null);

      const res = await fetch(API_URL);

      if (!res.ok) {
        throw new Error(`Failed to fetch snacks: ${res.status}`);
      }

      const data = await res.json();
      setSnacks(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSnacks();
  }, [fetchSnacks]);

  // POST - Add snack
  const addSnack = useCallback(async (newSnack) => {
    setError(null);

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newSnack),
      });

      if (!res.ok) {
        throw new Error(`Failed to add snack: ${res.status}`);
      }

      const createdSnack = await res.json();

      setSnacks((prev) => [...prev, createdSnack]);

      return createdSnack;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }, []);

  // PATCH - Update snack
  const updateSnack = useCallback(async (id, updates) => {
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

      const updatedSnack = await res.json();

      setSnacks((prev) =>
        prev.map((snack) =>
          String(snack.id) === String(id)
            ? updatedSnack
            : snack
        )
      );

      return updatedSnack;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }, []);

  // PATCH - Update price
  const updatePrice = useCallback(async (id, price) => {
    return updateSnack(id, {
      price: Number(price),
    });
  }, [updateSnack]);

  // DELETE - Delete snack
  const deleteSnack = useCallback(async (id) => {
    setError(null);

    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error(`Failed to delete snack: ${res.status}`);
      }

      setSnacks((prev) =>
        prev.filter(
          (snack) => String(snack.id) !== String(id)
        )
      );
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }, []);

  // Refetch snacks
  const refetch = useCallback(async () => {
    setLoading(true);
    await fetchSnacks();
  }, [fetchSnacks]);

  return {
    snacks,
    products: snacks,

    loading,
    error,

    addSnack,
    updateSnack,
    updatePrice,
    deleteSnack,

    // Keep these aliases so existing code doesn't break
    addProduct: addSnack,
    updateProduct: updateSnack,
    deleteProduct: deleteSnack,

    refetch,
  };
}

export default useSnacks;