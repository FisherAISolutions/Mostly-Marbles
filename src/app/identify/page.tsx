"use client";

import { useState } from "react";

type Result = {
  handmade?: string;
  originGuess?: string;
  ageGuess?: string;
  rarityGuess?: string;
  notes?: string;
};

export default function IdentifyPage() {
  const [file, setFile] = useState<File | null>(null);
  const [result, setResult] = useState<Result | null>(null);
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    if (!file) return;
    setLoading(true);
    setResult(null);
    const form = new FormData();
    form.append("image", file);

    try {
      const res = await fetch("/api/identify", {
        method: "POST",
        body: form
      });
      const data = await res.json();
      setResult(data.result ?? null);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: "grid", gap: 24, maxWidth: 640 }}>
      <header>
        <h1>AI Marble Identifier</h1>
        <p style={{ opacity: 0.8, fontSize: 14 }}>
          Upload a clear photo of a single marble. The AI will analyze texture, color, and pattern to suggest whether it
          is handmade or machine-made, its likely origin, approximate age, and rarity band.
        </p>
      </header>

      <div
        style={{
          background: "rgba(10,12,20,0.95)",
          borderRadius: 16,
          padding: 16,
          border: "1px solid rgba(120,120,150,0.4)"
        }}
      >
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setFile(e.target.files?.[0] ?? null)}
          style={{ marginBottom: 12 }}
        />
        <button
          onClick={submit}
          disabled={!file || loading}
          style={{
            borderRadius: 999,
            border: "none",
            padding: "8px 18px",
            background: "linear-gradient(135deg, #8ab4ff, #7bdcb5)",
            color: "#050509",
            fontWeight: 600,
            fontSize: 13,
            opacity: !file || loading ? 0.6 : 1
          }}
        >
          {loading ? "Analyzing…" : "Identify Marble"}
        </button>
      </div>

      {result && (
        <div
          style={{
            background: "rgba(10,12,20,0.95)",
            borderRadius: 16,
            padding: 16,
            border: "1px solid rgba(120,120,150,0.4)",
            fontSize: 14
          }}
        >
          <h2 style={{ fontSize: 18, marginTop: 0 }}>Preliminary Result</h2>
          <ul style={{ paddingLeft: 18 }}>
            {result.handmade && (
              <li>
                <strong>Construction:</strong> {result.handmade}
              </li>
            )}
            {result.originGuess && (
              <li>
                <strong>Likely origin:</strong> {result.originGuess}
              </li>
            )}
            {result.ageGuess && (
              <li>
                <strong>Approximate age:</strong> {result.ageGuess}
              </li>
            )}
            {result.rarityGuess && (
              <li>
                <strong>Rarity band:</strong> {result.rarityGuess}
              </li>
            )}
            {result.notes && (
              <li>
                <strong>Notes:</strong> {result.notes}
              </li>
            )}
          </ul>
          <p style={{ opacity: 0.7, marginTop: 8 }}>
            This is an AI-assisted guess. Always cross-check with expert references, auction records, and physical
            inspection.
          </p>
        </div>
      )}
    </div>
  );
}
