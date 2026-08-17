import { useState } from 'react';
import { useSnacks } from '../hooks/useSnacks';

export default function SnackCard({ snack, isAdmin = false }) {
  const { updatePrice } = useSnacks();
  const [isEditing, setIsEditing] = useState(false);
  const [priceInput, setPriceInput] = useState(snack.price);

  const handleUpdate = async (e) => {
    e.preventDefault();
    await updatePrice(snack.id, priceInput);
    setIsEditing(false);
  };

  return (
    <div className="snack-card">
      <h3>{snack.name}</h3>
      <p>{snack.description}</p>
      <p><strong>Origin:</strong> {snack.origin}</p>
      <p className="price">${Number(snack.price).toFixed(2)}</p>

      {isAdmin && (
        <div className="admin-controls">
          {isEditing ? (
            <form onSubmit={handleUpdate}>
              <input
                type="number"
                step="0.01"
                value={priceInput}
                onChange={(e) => setPriceInput(e.target.value)}
                required
              />
              <button type="submit">Save</button>
              <button type="button" onClick={() => setIsEditing(false)}>
                Cancel
              </button>
            </form>
          ) : (
            <button onClick={() => setIsEditing(true)}>Edit Price</button>
          )}
        </div>
      )}
    </div>
  );
}