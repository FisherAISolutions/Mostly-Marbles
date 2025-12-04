"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Home" },
  { href: "/marketplace", label: "Marketplace" },
  { href: "/identify", label: "AI Identifier" },
  { href: "/admin", label: "Admin" }
];

export default function Navbar() {
  const pathname = usePathname();
  return (
    <nav
      style={{
        position: "sticky",
        top: 0,
        zIndex: 40,
        borderBottom: "1px solid rgba(120,120,150,0.35)",
        padding: "10px 0",
        backdropFilter: "blur(18px)",
        background:
          "linear-gradient(to right, rgba(2,4,20,0.96), rgba(10,14,35,0.96))"
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 24,
          padding: "0 16px"
        }}
      >
        <Link href="/auth">Sign In</Link>
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: "999px",
              background:
                "radial-gradient(circle at 30% 30%, #ffffff, #8ab4ff 40%, #121827 75%)",
              boxShadow: "0 0 22px rgba(138,180,255,0.65)"
            }}
          />
          <div style={{ display: "flex", flexDirection: "column", lineHeight: 1.1 }}>
            <span style={{ fontWeight: 700, fontSize: 18 }}>Mostly Marbles</span>
            <span style={{ fontSize: 11, opacity: 0.7 }}>AI • Marketplace • Community</span>
          </div>
        </Link>

        <div style={{ display: "flex", alignItems: "center", gap: 18, fontSize: 14 }}>
          {links.map((l) => {
            const active = pathname === l.href;
            return (
              <Link
                key={l.href}
                href={l.href}
                style={{
                  position: "relative",
                  paddingBottom: 4,
                  fontWeight: active ? 600 : 400,
                  opacity: active ? 1 : 0.75
                }}
              >
                {l.label}
                {active && (
                  <span
                    style={{
                      position: "absolute",
                      left: 0,
                      bottom: 0,
                      height: 2,
                      width: "100%",
                      borderRadius: 999,
                      background:
                        "linear-gradient(90deg, #8ab4ff, #7bdcb5)"
                    }}
                  />
                )}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
