"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createBrowserClient } from "@supabase/ssr";

export default function AuthPage() {
  // Create Supabase client (requires 2 arguments!)
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const router = useRouter();

  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (mode === "signin") {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) setError(error.message);
      else router.push("/");
    }

    if (mode === "signup") {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) setError(error.message);
      else alert("Check your email for a confirmation link!");
    }

    setLoading(false);
  }

  return (
    <div style={{ maxWidth: 400, margin: "40px auto" }}>
      <h1>{mode === "signin" ? "Sign In" : "Create Account"}</h1>

      <form onSubmit={handleSubmit} style={{ display: "grid", gap: 12 }}>
        <input
          type="email"
          placeholder="Email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ padding: 10, borderRadius: 8 }}
        />

        <input
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ padding: 10, borderRadius: 8 }}
        />

        {error && <p style={{ color: "red" }}>{error}</p>}

        <button
          type="submit"
          disabled={loading}
          style={{
            padding: "10px",
            borderRadius: 8,
            background: "#8ab4ff",
            border: "none",
            fontWeight: 600,
          }}
        >
          {loading ? "Working..." : mode === "signin" ? "Sign In" : "Sign Up"}
        </button>
      </form>

      <p style={{ marginTop: 20 }}>
        {mode === "signin" ? (
          <>
            Need an account?{" "}
            <button
              onClick={() => setMode("signup")}
              style={{ color: "#8ab4ff", background: "none", border: "none" }}
            >
              Sign up
            </button>
          </>
        ) : (
          <>
            Already have an account?{" "}
            <button
              onClick={() => setMode("signin")}
              style={{ color: "#8ab4ff", background: "none", border: "none" }}
            >
              Sign in
            </button>
          </>
        )}
      </p>
    </div>
  );
}
