import { useState, useMemo } from 'react';
import { useSnacks } from '../hooks/useSnacks';

function Shop() {
  const { products, loading, error } = useSnacks();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredProducts = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    if (!term) return products;
    return products.filter((product) =>
      product.name.toLowerCase().includes(term) ||
      (product.category && product.category.toLowerCase().includes(term))
    );
  }, [products, searchTerm]);

  if (loading) {
    return <p>Loading products...</p>;
  }

  if (error) {
    return <p>Error loading products: {error}</p>;
  }

  return (
    <section id="shop-page">
      <h1>Shop</h1>

      <input
        type="text"
        placeholder="Search products by name or category..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        aria-label="Search products"
      />

      {filteredProducts.length === 0 ? (
        <p>No products match your search.</p>
      ) : (
        <div className="product-grid">
          {filteredProducts.map((product) => (
            <div className="product-card" key={product.id}>
              <h2>{product.name}</h2>
              <p>{product.description}</p>
              <p className="price">${Number(product.price).toFixed(2)}</p>
              <p className="category">{product.category}</p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default Shop;
