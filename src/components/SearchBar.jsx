import { useState } from "react";

function SearchBar({ onSearch }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    onSearch(value, category);
  };

  const handleCategoryChange = (e) => {
    const value = e.target.value;
    setCategory(value);
    onSearch(query, value);
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search snacks or drinks..."
        value={query}
        onChange={handleChange}
      />
      <select value={category} onChange={handleCategoryChange}>
        <option value="all">All</option>
        <option value="Kenyan">Kenyan</option>
        <option value="American">American</option>
      </select>
    </div>
  );
}

export default SearchBar;