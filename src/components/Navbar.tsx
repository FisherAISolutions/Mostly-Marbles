"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const links = [
  { href: "/", label: "Home" },
  { href: "/marketplace", label: "Marketplace" },
  { href: "/identify", label: "AI Identifier" },
  { href: "/admin/training", label: "Training" },
  { href: "/admin", label: "Admin Dashboard" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <nav
      style={{
        width: "100%",
        borderBottom: "1px solid rgba(255,255,255,0.15)",
        background: "rgba(10,10,20,0.9)",
        backdropFilter: "blur(20px)",
        position: "sticky",
        top: 0,
        zIndex: 50,
      }}
    >
      {/* TOP BAR */}
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "10px 16px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* LOGO */}
        <Link
          href="/"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            color: "white",
            fontWeight: 700,
            fontSize: 20,
          }}
        >
          <div
            style={{
              width: 30,
              height: 30,
              borderRadius: "50%",
              background:
                "radial-gradient(circle at 30% 30%, #ffffff, #8ab4ff 40%, #1c2333 80%)",
            }}
          ></div>
          Mostly Marbles
        </Link>

        {/* MOBILE MENU BUTTON */}
        <button
          onClick={() => setOpen(!open)}
          style={{
            background: "none",
            border: "none",
            fontSize: 28,
            color: "white",
            cursor: "pointer",
            display: "block",
          }}
          className="mobile-toggle"
        >
          ☰
        </button>

        {/* DESKTOP MENU */}
        <div
          className="desktop-menu"
          style={{
            display: "none",
            gap: 20,
            alignItems: "center",
          }}
        >
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              style={{
                color: pathname === l.href ? "#8ab4ff" : "#fff",
                fontWeight: pathname === l.href ? 700 : 400,
              }}
            >
              {l.label}
            </Link>
          ))}

          {/* SIGN IN */}
          <Link
            href="/auth"
            style={{
              color: "#8ab4ff",
              padding: "8px 14px",
              borderRadius: 8,
              border: "1px solid #8ab4ff",
              fontWeight: 600,
            }}
          >
            Sign In
          </Link>
        </div>
      </div>

      {/* MOBILE MENU */}
      {open && (
        <div
          className="mobile-menu"
          style={{
            display: "flex",
            flexDirection: "column",
            padding: "10px 16px",
            background: "rgba(0,0,0,0.5)",
            gap: 12,
          }}
        >
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              style={{
                padding: "10px 0",
                borderBottom: "1px solid rgba(255,255,255,0.1)",
                color: pathname === l.href ? "#8ab4ff" : "#fff",
                fontWeight: pathname === l.href ? 700 : 400,
              }}
              onClick={() => setOpen(false)}
            >
              {l.label}
            </Link>
          ))}

          <Link
            href="/auth"
            onClick={() => setOpen(false)}
            style={{
              padding: "10px 0",
              color: "#8ab4ff",
              fontWeight: 700,
            }}
          >
            Sign In
          </Link>
        </div>
      )}

      {/* CSS FOR BREAKPOINT */}
      <style>{`
        @media (min-width: 768px) {
          .mobile-toggle { display: none; }
          .mobile-menu { display: none !important; }
          .desktop-menu { display: flex !important; }
        }
      `}</style>
    </nav>
  );
}
