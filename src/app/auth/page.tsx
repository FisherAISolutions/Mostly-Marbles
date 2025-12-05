"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";

export default function AuthPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [error, setError] = useState("");

  async function handleSubmit(e: any) {
    e.preventDefault();
    setError("");

    if (mode === "signup") {
      const { data, error } = await supabase.auth.signUp({
        email,
        password
      });

      if (error) return setError(error.message);

      // Create user role automatically
      await fetch("/api/auth/create-role", {
        method: "POST",
        body: JSON.stringify({ user_id: data.user?.id, email }),
        headers: { "Content-Type": "application/json" }
      });

      router.push("/");
      return;
    }

    if (mode === "signin") {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) return setError(error.message);

      router.push("/");
      return;
    }
  }

  return (
    <div style={{ maxWidth: 400, margin: "40px auto", color: "white" }}>
      <h1>{mode === "signin" ? "Sign In" : "Create Account"}</h1>

      <form onSubmit={handleSubmit} style={{ display: "grid", gap: 12 }}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ padding: 12, borderRadius: 8 }}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ padding: 12, borderRadius: 8 }}
        />

        <button
          type="submit"
          style={{
            padding: 12,
            borderRadius: 8,
            background: "linear-gradient(135deg,#8ab4ff,#7bdcb5)",
            border: "none",
            fontWeight: 700
          }}
        >
          {mode === "signin" ? "Sign In" : "Sign Up"}
        </button>

        {error && (
          <div style={{ color: "tomato", fontSize: 14 }}>{error}</div>
        )}

        <button
          type="button"
          onClick={() =>
            setMode(mode === "signin" ? "signup" : "signin")
          }
          style={{
            marginTop: 10,
            background: "none",
            color: "#8ab4ff",
            border: "none",
            cursor: "pointer"
          }}
        >
          {mode === "signin"
            ? "Need an account? Sign Up"
            : "Already have an account? Sign In"}
        </button>
      </form>
    </div>
  );
}
