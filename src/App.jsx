import React, { useState, useEffect } from "react";
import JsonInput from "./components/JsonInput.jsx";
import TreeVisualizer from "./components/TreeVisualizer.jsx";
import TopBar from "./components/TopBar.jsx";
import "./App.css";

const sampleJSON = {
  user: {
    id: 1,
    name: "Alice",
    email: "alice@example.com",
    address: { city: "Mumbai", zip: "400001" },
  },
};

export default function App() {
  const [json, setJson] = useState(sampleJSON);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResult, setSearchResult] = useState(null);
  const [dark, setDark] = useState(false);

  console.log("searchResult", searchResult);

  function handleVisualize(parsed, opts = {}) {
    if (opts.clear) {
      setJson(null);
      return;
    }
    setJson(parsed);
  }

  function handleSearch(term) {
    setSearchTerm(term);
  }

  useEffect(() => {
    if (dark) document.documentElement.setAttribute("data-theme", "dark");
    else document.documentElement.removeAttribute("data-theme");
  }, [dark]);

  return (
    <div className="app-container">
      {/* Top Navigation Bar */}
      <TopBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        onSearch={handleSearch}
        dark={dark}
        setDark={setDark}
        searchResult={searchResult}
      />

      {/* Main Content Layout */}
      <div className="main-content">
        <div className="left-panel">
          <JsonInput onVisualize={handleVisualize} initialSample={sampleJSON} />
        </div>

        <div className="right-panel">
          <TreeVisualizer
            json={json}
            searchPath={searchTerm}
            onSearchResult={setSearchResult}
          />
        </div>
      </div>
    </div>
  );
}
