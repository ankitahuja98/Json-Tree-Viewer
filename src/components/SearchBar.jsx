import React, { useState } from "react";

export default function SearchBar({ onSearch }) {
  const [term, setTerm] = useState("");

  function handleSearch() {
    onSearch(term);
  }

  return (
    <div className="searchbar">
      <input
        placeholder="Search JSON path (e.g. $.user.address.city or items[0].name)"
        value={term}
        onChange={(e) => setTerm(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") handleSearch();
        }}
      />
      <button className="btn primary" onClick={handleSearch}>
        Search
      </button>
    </div>
  );
}
