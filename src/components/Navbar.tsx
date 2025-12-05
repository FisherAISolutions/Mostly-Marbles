"use client";

import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="w-full flex justify-between items-center px-6 py-4 bg-black/40 backdrop-blur-lg text-white border-b border-white/10">
      <Link href="/" className="text-xl font-semibold">
        Marble Market
      </Link>

      <button className="md:hidden text-2xl" onClick={() => setOpen(!open)}>
        ☰
      </button>

      <div
        className={`${open ? "flex" : "hidden"} md:flex gap-8 items-center`}
      >
        <Link href="/">Home</Link>
        <Link href="/marketplace">Marketplace</Link>
        <Link href="/identifier">AI Identifier</Link>

        {/* Training link removed — unlocked via secret code */}
      </div>
    </nav>
  );
}
