"use client";

import { useState, useEffect } from "react";
import { createBrowserClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";

export default function AuthPage() {
  const supabase = createBrowserClient();
  const router = useRouter();

  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function check() {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (session) router.push("/");
    }
    check();
  }, [supabase, router]);

  async function handleSignup() {
    setLoading(true);

    const { data, error } = await supabase.auth.signUp({ email, password });

    if (error) {
      alert(error.message);
      setLoading(false);
      return;
    }

    if (data.user) {
      await supabase.from("user_roles").insert({
        user_id: data.user.id,
        email: data.user.email,
        role: "user",
      });
    }

    setLoading(false);
    alert("Account created. Check your email to verify.");
  }

  async function handleSignin() {
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      alert(error.message);
      return;
    }

    router.push("/");
  }

  return (
    <div
      style={{
        maxWidth: 420,
        margin: "80px auto",
        padding: 24,
        borderRadius: 12,
        background: "rgba(0,0,0,0.6)",
        color: "#fff",
      }}
    >
      <h1>{mode === "signin" ? "Sign In" : "Create Account"}</h1>

      <label>Email</label>
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{
          width: "100%",
          marginTop: 8,
          marginBottom: 16,
          padding: 10,
          borderRadius: 8,
          border: "1px solid rgba(255,255,255,0.3)",
        }}
      />

      <label>Password</label>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{
          width: "100%",
          marginTop: 8,
          marginBottom: 24,
          padding: 10,
          borderRadius: 8,
          border: "1px solid rgba(255,255,255,0.3)",
        }}
      />

      <button
        disabled={loading}
        onClick={mode === "signin" ? handleSignin : handleSignup}
        style={{
          width: "100%",
          padding: 12,
          borderRadius: 10,
          background: "linear-gradient(135deg, #7bdcb5, #8ab4ff)",
          border: "none",
          fontWeight: "bold",
          cursor: "pointer",
          marginBottom: 12,
        }}
      >
        {loading
          ? "Loading..."
          : mode === "signin"
          ? "Sign In"
          : "Create Account"}
      </button>

      <p style={{ textAlign: "center" }}>
        {mode === "signin" ? (
          <>
            Need an account?{" "}
            <span
              style={{ color: "#8ab4ff", cursor: "pointer" }}
              onClick={() => setMode("signup")}
            >
              Sign up
            </span>
          </>
        ) : (
          <>
            Already have an account?{" "}
            <span
              style={{ color: "#8ab4ff", cursor: "pointer" }}
              onClick={() => setMode("signin")}
            >
              Sign in
            </span>
          </>
        )}
      </p>
    </div>
  );
}
