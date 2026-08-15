import { useCallback, useState } from "react";

const API_URL = "http://localhost:3001/snacks";

function useSnacks() {
  const [snacks, setSnacks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // GET - Fetch all snacks
  const fetchSnacks = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(API_URL);

      if (!response.ok) {
        throw new Error("Failed to fetch snacks");
      }

      const data = await response.json();
      setSnacks(data);

      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // POST - Add a new snack
  const addSnack = async (newSnack) => {
    try {
      setError("");

      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newSnack),
      });

      if (!response.ok) {
        throw new Error("Failed to add snack");
      }

      const createdSnack = await response.json();

      setSnacks((currentSnacks) => [
        ...currentSnacks,
        createdSnack,
      ]);

      return createdSnack;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  // PATCH - Update a snack
  const updateSnack = async (id, updates) => {
    try {
      setError("");

      const response = await fetch(`${API_URL}/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updates),
      });

      if (!response.ok) {
        throw new Error("Failed to update snack");
      }

      const updatedSnack = await response.json();

      setSnacks((currentSnacks) =>
        currentSnacks.map((snack) =>
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
  };

  // DELETE - Delete a snack
  const deleteSnack = async (id) => {
    try {
      setError("");

      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete snack");
      }

      setSnacks((currentSnacks) =>
        currentSnacks.filter(
          (snack) => String(snack.id) !== String(id)
        )
      );
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  return {
    snacks,
    loading,
    error,
    fetchSnacks,
    addSnack,
    updateSnack,
    deleteSnack,
  };
}

export default useSnacks;