"use client";

import { useState } from "react";

export default function TrainingPage() {
  const [input, setInput] = useState("");
  const [status, setStatus] = useState("");

  async function submitTraining() {
    const allowed = [
      "marble", "agate", "swirl", "pontil", "glass", "ribbon",
      "handmade", "machine", "vintage", "collector", "opaque",
      "translucent", "latticino", "banded", "onionskin"
    ];

    const text = input.toLowerCase();
    const isAllowed = allowed.some((w) => text.includes(w));

    if (!isAllowed) {
      setStatus("❌ Please enter marble-related information only.");
      return;
    }

    setStatus("Saving…");

    const res = await fetch("/api/training/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: input }),
    });

    const data = await res.json();

    if (data.success) {
      setStatus("✅ Training saved!");
      setInput("");
    } else {
      setStatus("❌ " + data.error);
    }
  }

  return (
    <div className="max-w-2xl mx-auto pt-20 text-white">
      <h1 className="text-3xl font-bold mb-6">AI Training</h1>

      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Describe a marble here…"
        className="w-full h-40 p-3 rounded bg-white/5 border border-white/20 text-white"
      />

      <button
        onClick={submitTraining}
        className="mt-4 w-full bg-blue-600 p-3 rounded hover:bg-blue-700"
      >
        Submit
      </button>

      <p className="mt-4">{status}</p>
    </div>
  );
}
