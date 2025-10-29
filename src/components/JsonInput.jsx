import React, { useState } from "react";

export default function JsonInput({ onVisualize, initialSample }) {
  const [text, setText] = useState(JSON.stringify(initialSample, null, 2));
  const [error, setError] = useState(null);

  function handleVisualize() {
    try {
      const parsed = JSON.parse(text);
      setError(null);
      onVisualize(parsed);
    } catch (e) {
      setError(e.message);
    }
  }

  function handleClear() {
    setText("");
    setError(null);
    onVisualize(null, { clear: true });
  }

  return (
    <div>
      <div className="section-header">
        <h3 className="InputTitle">JSON Input</h3>
        <div style={{ fontSize: 13, color: "var(--muted)" }}>
          Paste JSON & press Visualize
        </div>
      </div>

      <textarea
        className="json-input"
        placeholder='{"user": {"name": "Alice"}}'
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <div className="footer-actions">
        <button className="btn primary" onClick={handleVisualize}>
          Visualize
        </button>
        <button
          className="btn ghost"
          onClick={() => {
            setText(JSON.stringify(initialSample, null, 2));
            setError(null);
          }}
        >
          Load Sample
        </button>
        <button className="btn ghost" onClick={handleClear}>
          Clear
        </button>
      </div>

      {error && (
        <div style={{ color: "crimson", marginTop: 8 }}>
          Invalid JSON: {error}
        </div>
      )}
    </div>
  );
}
