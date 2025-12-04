"use client";

import { useState } from "react";

export default function TrainingPage() {
  const [file, setFile] = useState<File | null>(null);
  const [description, setDescription] = useState("");
  const [notes, setNotes] = useState("");
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const uploadTrainingSample = async () => {
    if (!file && !description && !url) {
      alert("Please provide an image or text or URL.");
      return;
    }

    setLoading(true);

    const formData = new FormData();
    if (file) formData.append("file", file);
    formData.append("description", description);
    formData.append("notes", notes);
    formData.append("url", url);

    const res = await fetch("/api/admin/training", {
      method: "POST",
      body: formData
    });

    const data = await res.json();
    setMessage(data.message || "Uploaded successfully!");
    setLoading(false);
  };

  return (
    <div style={{ padding: 30 }}>
      <h1>AI Training Center</h1>

      <p>Upload marble references, images, detailed descriptions, or URLs to teach the AI.</p>

      <div style={{ marginTop: 20, display: "grid", gap: 20, maxWidth: 500 }}>

        <div>
          <label>Training Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files?.[0] ?? null)}
          />
        </div>

        <div>
          <label>Full Description / Metadata</label>
          <textarea
            placeholder="Example: Handmade German onionskin, 1890, mica inclusions, strong color bands, pontil mark..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            style={{ width: "100%", height: 120 }}
          />
        </div>

        <div>
          <label>Training Notes</label>
          <textarea
            placeholder="Extra training comments…"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            style={{ width: "100%", height: 80 }}
          />
        </div>

        <div>
          <label>Reference URL (optional)</label>
          <input
            type="text"
            placeholder="https://marblecollecting.com/..."
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            style={{ width: "100%" }}
          />
        </div>

        <button
          onClick={uploadTrainingSample}
          disabled={loading}
          style={{
            padding: 12,
            borderRadius: 8,
            background: "linear-gradient(90deg,#8ab4ff,#7bdcb5)",
            border: "none",
            color: "#000",
            fontWeight: "bold"
          }}
        >
          {loading ? "Uploading..." : "Add Training Sample"}
        </button>

        {message && (
          <div
            style={{
              marginTop: 10,
              padding: 10,
              background: "rgba(255,255,255,0.1)",
              borderRadius: 8
            }}
          >
            {message}
          </div>
        )}
      </div>
    </div>
  );
}
