import { useState } from "react";

function SearchTask({ onSearch }) {
  const [search, setSearch] = useState("");

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearch(value);
    onSearch(value);
  };

  return (
    <input
      className="search-input"
      type="text"
      placeholder="Поиск задач..."
      value={search}
      onChange={handleSearch}
    />
  );
}

export default SearchTask;
