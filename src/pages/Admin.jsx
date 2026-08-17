import { useState } from "react";
import useSnacks from "../hooks/useSnacks";

function Admin() {
  const {
    snacks,
    loading,
    error,
    addSnack,
    updateSnack,
    deleteSnack,
  } = useSnacks();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    price: "",
    stock: "",
    image: "",
  });

  const [editingId, setEditingId] = useState(null);

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const snackData = {
      ...formData,
      price: Number(formData.price),
      stock: Number(formData.stock),
    };

    try {
      if (editingId) {
        await updateSnack(editingId, snackData);
        setEditingId(null);
      } else {
        await addSnack(snackData);
      }

      setFormData({
        name: "",
        description: "",
        category: "",
        price: "",
        stock: "",
        image: "",
      });
    } catch (err) {
      console.error("Failed to save snack:", err);
    }
  }

  function handleEdit(snack) {
    setEditingId(snack.id);

    setFormData({
      name: snack.name || "",
      description: snack.description || "",
      category: snack.category || "",
      price: snack.price || "",
      stock: snack.stock || "",
      image: snack.image || "",
    });
  }

  async function handleDelete(id) {
    try {
      await deleteSnack(id);
    } catch (err) {
      console.error("Failed to delete snack:", err);
    }
  }

  function handleCancel() {
    setEditingId(null);

    setFormData({
      name: "",
      description: "",
      category: "",
      price: "",
      stock: "",
      image: "",
    });
  }

  return (
    <main className="admin-page">
      <h1>Admin Dashboard</h1>

      <section className="admin-form-section">
        <h2>{editingId ? "Edit Snack" : "Add Snack"}</h2>

        <form className="add-snack-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Snack name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <textarea
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="category"
            placeholder="Category"
            value={formData.category}
            onChange={handleChange}
            required
          />

          <input
            type="number"
            name="price"
            placeholder="Price"
            value={formData.price}
            onChange={handleChange}
            min="0"
            required
          />

          <input
            type="number"
            name="stock"
            placeholder="Stock"
            value={formData.stock}
            onChange={handleChange}
            min="0"
            required
          />

          <input
            type="text"
            name="image"
            placeholder="Image URL"
            value={formData.image}
            onChange={handleChange}
          />

          <button type="submit">
            {editingId ? "Update Snack" : "Add Snack"}
          </button>

          {editingId && (
            <button type="button" onClick={handleCancel}>
              Cancel
            </button>
          )}
        </form>
      </section>

      <section className="admin-snacks-section">
        <h2>Manage Snacks</h2>

        {loading && <p>Loading snacks...</p>}

        {error && <p>{error}</p>}

        {!loading && snacks.length === 0 && (
          <p>No snacks found.</p>
        )}

        {!loading && snacks.length > 0 && (
          <div className="admin-snack-list">
            {snacks.map((snack) => (
              <div className="admin-snack-card" key={snack.id}>
                <h3>{snack.name}</h3>

                <p>{snack.description}</p>

                <p>Category: {snack.category}</p>

                <p>Price: {snack.price}</p>

                <p>Stock: {snack.stock}</p>

                <div className="admin-actions">
                  <button
                    type="button"
                    onClick={() => handleEdit(snack)}
                  >
                    Edit
                  </button>

                  <button
                    type="button"
                    onClick={() => handleDelete(snack.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

export default Admin;