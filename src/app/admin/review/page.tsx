"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Identification = {
  id: string;
  image_url: string;
  ai_result: any;
  created_at: string;
};

export default function ReviewPage() {
  const [items, setItems] = useState<Identification[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/admin/review");
        const data = await res.json();
        setItems(data.items || []);
      } catch (err) {
        console.error(err);
      }
      setLoading(false);
    }
    load();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div style={{ display: "grid", gap: 20 }}>
      <h1>AI Identification Review</h1>
      <p>These are all the marble identifications made by the AI. Admins can correct them if needed.</p>

      <div style={{ display: "grid", gap: 16 }}>
        {items.map((item) => (
          <div
            key={item.id}
            style={{
              border: "1px solid rgba(255,255,255,0.2)",
              borderRadius: 12,
              padding: 16,
              background: "rgba(255,255,255,0.05)",
              display: "flex",
              gap: 20,
              alignItems: "center"
            }}
          >
            <img
              src={item.image_url}
              alt="marble"
              style={{ width: 120, height: 120, borderRadius: 8, objectFit: "cover" }}
            />

            <div style={{ flex: 1 }}>
              <strong>AI Result:</strong>
              <pre style={{ whiteSpace: "pre-wrap", fontSize: 14 }}>
                {JSON.stringify(item.ai_result, null, 2)}
              </pre>

              <p style={{ opacity: 0.7, fontSize: 12 }}>
                Identified on {new Date(item.created_at).toLocaleString()}
              </p>
            </div>

            <Link
              href={`/admin/review/${item.id}`}
              style={{
                padding: "10px 16px",
                background: "linear-gradient(135deg, #8ab4ff, #7bdcb5)",
                borderRadius: 8,
                color: "#000",
                fontWeight: 600
              }}
            >
              Correct
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
