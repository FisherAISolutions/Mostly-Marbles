"use client";

import { useState } from "react";

export default function TrainingPage() {
  const [form, setForm] = useState({
    title: "",
    type: "",
    origin: "",
    age: "",
    rarity: "",
    notes: "",
    reference_text: "",
    reference_url: "",
    image_file: null as File | null,
  });

  const [status, setStatus] = useState("");

  function update(key: string, value: any) {
    setForm({ ...form, [key]: value });
  }

  async function uploadImage() {
    if (!form.image_file) return null;

    const ext = form.image_file.name.split(".").pop();
    const filename = `training-${Date.now()}.${ext}`;

    const res = await fetch(`/api/admin/upload`, {
      method: "POST",
      body: form.image_file,
      headers: { "x-file-name": filename },
    });

    const data = await res.json();
    return data.url;
  }

  async function submitTraining() {
    setStatus("Uploading image & saving...");

    let image_url = null;

    if (form.image_file) {
      image_url = await uploadImage();
    }

    const payload = {
      ...form,
      image_url,
    };

    const res = await fetch("/api/admin/train", {
      method: "POST",
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      setStatus("Training sample saved!");
      setForm({
        title: "",
        type: "",
        origin: "",
        age: "",
        rarity: "",
        notes: "",
        reference_text: "",
        reference_url: "",
        image_file: null,
      });
    } else {
      setStatus("Error saving training sample.");
    }
  }

  return (
    <div style={{ display: "grid", gap: 20 }}>
      <h1>AI Training Center</h1>

      <div style={{ display: "grid", gap: 12 }}>
        <div>
          <label>Upload Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) =>
              update("image_file", e.target.files ? e.target.files[0] : null)
            }
          />
        </div>

        {Object.keys(form)
          .filter((key) => key !== "image_file")
          .map((key) => (
            <div key={key} style={{ display: "grid", gap: 4 }}>
              <label>{key.toUpperCase()}</label>
              <textarea
                value={(form as any)[key]}
                onChange={(e) => update(key, e.target.value)}
                style={{
                  minHeight: key === "reference_text" ? 150 : 80,
                  padding: 10,
                  borderRadius: 6,
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.2)",
                }}
              />
            </div>
          ))}

        <button
          onClick={submitTraining}
          style={{
            padding: "12px 20px",
            borderRadius: 8,
            background: "linear-gradient(135deg, #8ab4ff, #7bdcb5)",
            border: "none",
            fontWeight: 600,
            color: "#000",
            marginTop: 12,
          }}
        >
          Save Training Sample
        </button>

        <p>{status}</p>
      </div>
    </div>
  );
}
