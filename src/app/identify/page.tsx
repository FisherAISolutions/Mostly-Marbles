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
    <div style={{ padding: 20, maxWidth: 600, margin: "0 auto" }}>
      <h1 style={{ fontSize: 26, fontWeight: 700, marginBottom: 10 }}>
        AI Marble Identifier
      </h1>

      <p style={{ opacity: 0.7, marginBottom: 20 }}>
        Upload a marble image and let the AI identify type, origin, age, and more.
      </p>

      <input
        type="email"
        placeholder="Your email (optional)"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{
          width: "100%",
          padding: 12,
          marginBottom: 12,
          borderRadius: 8,
          border: "1px solid rgba(255,255,255,0.2)"
        }}
      />

      <input
        type="file"
        accept="image/*"
        onChange={onFileChange}
        style={{ width: "100%", marginBottom: 12 }}
      />

      {file && (
        <img
          src={URL.createObjectURL(file)}
          style={{
            width: "100%",
            borderRadius: 12,
            marginTop: 10
          }}
        />
      )}

      <button
        onClick={identify}
        disabled={loading}
        style={{
          width: "100%",
          marginTop: 20,
          padding: 14,
          borderRadius: 8,
          background: loading ? "gray" : "linear-gradient(135deg,#8ab4ff,#7bdcb5)",
          border: "none",
          fontWeight: 600
        }}
      >
        {loading ? "Analyzing..." : "Identify Marble"}
      </button>

      {result && (
        <div
          style={{
            marginTop: 20,
            padding: 20,
            background: "rgba(255,255,255,0.05)",
            borderRadius: 12,
            whiteSpace: "pre-line",
            overflowWrap: "break-word"
          }}
        >
          <h2>Result:</h2>
          <pre style={{ whiteSpace: "pre-wrap" }}>
            {JSON.stringify(result, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}
