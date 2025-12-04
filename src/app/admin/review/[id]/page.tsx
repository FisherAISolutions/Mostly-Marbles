"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function CorrectionPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const [item, setItem] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [correctData, setCorrectData] = useState({
    type: "",
    origin: "",
    age: "",
    maker: "",
    rarity: "",
    notes: "",
    explanation: ""
  });

  // Load the AI identification
  useEffect(() => {
    async function load() {
      const res = await fetch(`/api/admin/review/${id}`);
      const data = await res.json();
      setItem(data.item);
      setLoading(false);
    }
    load();
  }, [id]);

  async function submitCorrection() {
    const res = await fetch(`/api/admin/correct`, {
      method: "POST",
      body: JSON.stringify({
        identification_id: id,
        ...correctData,
      }),
    });

    if (res.ok) {
      alert("Correction saved!");
      router.push("/admin/review");
    } else {
      alert("Error saving correction.");
    }
  }

  if (loading) return <p>Loading...</p>;

  if (!item) return <p>Not found.</p>;

  return (
    <div style={{ display: "grid", gap: 20 }}>
      <h1>Correct AI Identification</h1>

      <img
        src={item.image_url}
        alt="marble"
        style={{ width: 200, borderRadius: 12 }}
      />

      <div>
        <h2>AI Result:</h2>
        <pre style={{ background: "rgba(255,255,255,0.05)", padding: 16, borderRadius: 8 }}>
          {JSON.stringify(item.ai_result, null, 2)}
        </pre>
      </div>

      <h2>Your Correction</h2>

      <div style={{ display: "grid", gap: 12 }}>
        {Object.keys(correctData).map((key) => (
          <div key={key} style={{ display: "grid", gap: 4 }}>
            <label>{key.toUpperCase()}</label>
            <input
              type="text"
              value={(correctData as any)[key]}
              onChange={(e) =>
                setCorrectData({ ...correctData, [key]: e.target.value })
              }
              style={{
                padding: 10,
                borderRadius: 6,
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.2)"
              }}
            />
          </div>
        ))}

        <button
          onClick={submitCorrection}
          style={{
            padding: "12px 20px",
            borderRadius: 8,
            background: "linear-gradient(135deg, #8ab4ff, #7bdcb5)",
            border: "none",
            fontWeight: 600,
            color: "#000",
            marginTop: 12
          }}
        >
          Submit Correction
        </button>
      </div>
    </div>
  );
}
