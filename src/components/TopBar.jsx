import React from "react";
import "../App.css";

export default function TopBar({
  searchTerm,
  setSearchTerm,
  onSearch,
  dark,
  setDark,
  searchResult,
}) {
  function handleKeyDown(e) {
    if (e.key === "Enter") {
      onSearch(searchTerm);
    }
  }

  return (
    <div className="topbar">
      <h2 className="text-2xl font-bold">JSON Tree Viewer</h2>

      <div className="topbar-right">
        {/* Theme toggle switch */}
        <div className="theme-toggle" onClick={() => setDark(!dark)}>
          <div className={`toggle-slider ${dark ? "dark" : "light"}`}>
            <span className="icon">{dark ? "🌙" : "☀️"}</span>
          </div>
        </div>

        <div className="topbar-search-wrapper">
          <input
            type="text"
            className="topbar-input"
            placeholder="Search JSON path (press Enter to search)"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleKeyDown}
          />

          {/* Search Result */}
          <div className="topbar-result">
            {searchTerm ? (
              searchResult.found ? (
                <div className="text-green-400 text-xs mt-0.5">
                  ✅ Match found: {searchResult.node?.data?.path}
                </div>
              ) : (
                <div className="text-red-400 text-xs mt-0.5 ">
                  No match found
                </div>
              )
            ) : (
              <div className="text-xs pt-0.5 pl-2">
                Tip: Use paths like
                <span className="font-semibold"> user.address.city</span> in
                search
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
