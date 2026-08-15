import { useState } from "react";

function AddSnackForm({ onAddSnack }) {
  const [formData, setFormData] = useState({
    name: "",
    category: "Kenyan",
    type: "snack",
    price: "",
    image: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.price) return;

    const newSnack = {
      id: Date.now(),
      name: formData.name,
      category: formData.category,
      type: formData.type,
      price: parseFloat(formData.price),
      image: formData.image,
    };

    onAddSnack(newSnack);

    setFormData({
      name: "",
      category: "Kenyan",
      type: "snack",
      price: "",
      image: "",
    });
  };

  return (
    <form onSubmit={handleSubmit} className="add-snack-form">
      <input
        type="text"
        name="name"
        placeholder="Snack/Drink name"
        value={formData.name}
        onChange={handleChange}
      />

      <select name="category" value={formData.category} onChange={handleChange}>
        <option value="Kenyan">Kenyan</option>
        <option value="American">American</option>
      </select>

      <select name="type" value={formData.type} onChange={handleChange}>
        <option value="snack">Snack</option>
        <option value="drink">Drink</option>
      </select>

      <input
        type="number"
        name="price"
        placeholder="Price"
        value={formData.price}
        onChange={handleChange}
        step="0.01"
      />

      <input
        type="text"
        name="image"
        placeholder="Image URL"
        value={formData.image}
        onChange={handleChange}
      />

      <button type="submit">Add Snack</button>
    </form>
  );
}

export default AddSnackForm;