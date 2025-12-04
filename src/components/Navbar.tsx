"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const links = [
  { href: "/", label: "Home" },
  { href: "/marketplace", label: "Marketplace" },
  { href: "/identify", label: "AI Identifier" },
  { href: "/admin", label: "Admin" }
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <nav
      style={{
        borderBottom: "1px solid rgba(120,120,150,0.35)",
        padding: "10px 0",
        backdropFilter: "blur(18px)",
        background: "linear-gradient(to right, rgba(2,4,20,.95), rgba(10,14,35,.95))"
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 16px"
        }}
      >
        {/* Mobile Toggle */}
        <button
          onClick={() => setOpen(!open)}
          style={{
            display: "block",
            background: "none",
            border: "none",
            fontSize: 24,
            color: "white"
          }}
          className="mobile-menu-button"
        >
          ☰
        </button>

        {/* Logo */}
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div
            style={{
              width: 30,
              height: 30,
              borderRadius: "999px",
              background: "radial-gradient(circle, #fff, #8ab4ff 45%, #121827 80%)"
            }}
          ></div>
          <span style={{ fontWeight: 700, fontSize: 18 }}>Mostly Marbles</span>
        </Link>
      </div>

      {/* MOBILE NAV */}
      {open && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            padding: 16,
            background: "rgba(0,0,0,0.6)"
          }}
          className="mobile-nav"
        >
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              style={{
                padding: "10px 0",
                borderBottom: "1px solid rgba(255,255,255,0.15)",
                color: pathname === l.href ? "#8ab4ff" : "white",
                fontWeight: pathname === l.href ? 700 : 400
              }}
            >
              {l.label}
            </Link>
          ))}
        </div>
      )}

      {/* DESKTOP LINKS */}
      <div
        className="desktop-links"
        style={{
          display: "none",
          maxWidth: 1200,
          margin: "0 auto",
          padding: "10px 16px",
          justifyContent: "flex-end",
          gap: 18
        }}
      >
        {links.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            style={{
              position: "relative",
              padding: "10px",
              fontWeight: pathname === l.href ? 700 : 400,
              opacity: pathname === l.href ? 1 : 0.7
            }}
          >
            {l.label}
          </Link>
        ))}
      </div>

      <style>{`
        @media (min-width: 768px) {
          .mobile-menu-button { display: none; }
          .mobile-nav { display: none !important; }
          .desktop-links { display: flex !important; }
        }
      `}</style>
    </nav>
  );
}
