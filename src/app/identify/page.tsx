"use client";

import { useState } from "react";

export default function IdentifyPage() {
  const [file, setFile] = useState<File | null>(null);
  const [email, setEmail] = useState("");
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  function onFileChange(e: any) {
    setFile(e.target.files?.[0] ?? null);
  }

  async function identify() {
    if (!file) {
      alert("Please select an image first.");
      return;
    }

    setLoading(true);
    setResult(null);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("email", email || "unknown");

    const res = await fetch("/api/identify", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    setResult(data);
    setLoading(false);
  }

  return (
    <div style={{ display: "grid", gap: 20 }}>
      <h1>AI Marble Identifier</h1>
      <p>Upload a marble image and let the AI identify type, origin, age, and more.</p>

      <div style={{ display: "grid", gap: 10 }}>
        <label>Your Email (optional)</label>
        <input
          type="email"
          value={email}
          placeholder="example@email.com"
          onChange={(e) => setEmail(e.target.value)}
          style={{
            padding: "10px",
            borderRadius: 8,
            border: "1px solid rgba(255,255,255,0.2)",
            background: "rgba(255,255,255,0.05)",
          }}
        />
      </div>

      <input type="file" accept="image/*" onChange={onFileChange} />

      {file && (
        <img
          src={URL.createObjectURL(file)}
          style={{
            width: 200,
            height: 200,
            objectFit: "cover",
            borderRadius: 12,
            marginTop: 10,
          }}
        />
      )}

      <button
        onClick={identify}
        disabled={loading}
        style={{
          marginTop: 20,
          padding: "12px 20px",
          borderRadius: 8,
          background: loading
            ? "gray"
            : "linear-gradient(135deg, #8ab4ff, #7bdcb5)",
          border: "none",
          fontWeight: 600,
          color: "#000",
        }}
      >
        {loading ? "Analyzing..." : "Identify Marble"}
      </button>

      {loading && (
        <p style={{ opacity: 0.7 }}>The AI is analyzing your image...</p>
      )}

      {result && (
        <div
          style={{
            marginTop: 20,
            padding: 20,
            background: "rgba(255,255,255,0.05)",
            borderRadius: 12,
            whiteSpace: "pre-wrap",
          }}
        >
          <h2>Result:</h2>
          <pre>{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}
