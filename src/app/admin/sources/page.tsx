"use client";

import { useEffect, useState } from "react";

export default function TrainingSourcesPage() {
  const [sources, setSources] = useState([]);
  const [url, setUrl] = useState("");
  const [notes, setNotes] = useState("");

  async function loadSources() {
    const res = await fetch("/api/admin/sources");
    const data = await res.json();
    setSources(data);
  }

  async function addSource(e: any) {
    e.preventDefault();
    await fetch("/api/admin/sources", {
      method: "POST",
      body: JSON.stringify({ url, notes }),
      headers: { "Content-Type": "application/json" }
    });

    setUrl("");
    setNotes("");
    loadSources();
  }

  useEffect(() => {
    loadSources();
  }, []);

  return (
    <div style={{ maxWidth: 800, margin: "40px auto", color: "white" }}>
      <h1 style={{ fontSize: 32, fontWeight: 700 }}>Training Sources</h1>
      <p style={{ opacity: 0.7, marginBottom: 20 }}>
        Add URLs containing marble information so the AI can learn from them.
      </p>

      {/* Add Source */}
      <form
        onSubmit={addSource}
        style={{
          background: "rgba(255,255,255,0.06)",
          padding: 20,
          borderRadius: 12,
          marginBottom: 30
        }}
      >
        <label>URL:</label>
        <input
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          style={{ width: "100%", padding: 10, marginTop: 6, marginBottom: 12 }}
        />

        <label>Notes:</label>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          style={{
            width: "100%",
            height: 80,
            padding: 10,
            marginTop: 6
          }}
        />

        <button
          type="submit"
          style={{
            marginTop: 16,
            padding: "10px 20px",
            borderRadius: 8,
            background: "linear-gradient(90deg,#8ab4ff,#7bdcb5)",
            border: "none",
            fontWeight: 600
          }}
        >
          Add Source
        </button>
      </form>

      {/* Existing Sources */}
      <h2 style={{ fontSize: 22, marginBottom: 10 }}>Saved Sources</h2>

      {sources.map((src: any) => (
        <div
          key={src.id}
          style={{
            padding: 16,
            background: "rgba(255,255,255,0.04)",
            borderRadius: 10,
            marginBottom: 12
          }}
        >
          <div style={{ fontWeight: 600 }}>{src.url}</div>
          <div style={{ opacity: 0.7 }}>{src.notes}</div>
          <div style={{ fontSize: 12, opacity: 0.5 }}>
            Added: {new Date(src.created_at).toLocaleString()}
          </div>
        </div>
      ))}
    </div>
  );
}
