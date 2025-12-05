"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function UnlockKeyListener() {
  const SECRET = "marblealpha";
  const [buffer, setBuffer] = useState("");
  const [unlocked, setUnlocked] = useState(false);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const char = e.key.toLowerCase();

      setBuffer((prev) => {
        const next = (prev + char).slice(-SECRET.length);
        if (next === SECRET) setUnlocked(true);
        return next;
      });
    }

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  if (!unlocked) return null;

  return (
    <div
      style={{
        position: "fixed",
        bottom: 20,
        right: 20,
        padding: "12px 18px",
        background: "rgba(0,0,0,0.75)",
        borderRadius: 8,
        border: "1px solid rgba(255,255,255,0.15)",
        zIndex: 9999,
      }}
    >
      <Link href="/training" className="text-green-300 font-bold">
        🔓 Training Unlocked — Go to Training Page
      </Link>
    </div>
  );
}
