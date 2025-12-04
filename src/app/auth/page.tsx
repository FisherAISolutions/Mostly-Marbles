"use client";

import { useState, useEffect } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";

export default function AuthPage() {
  const supabase = createClientComponentClient();
  const router = useRouter();

  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // Redirect if already logged in
  useEffect(() => {
    async function checkSession() {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (session) router.push("/");
    }
    checkSession();
  }, [supabase, router]);

  // SIGN UP FUNCTION
  async function handleSignUp() {
    setLoading(true);

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      alert(error.message);
      setLoading(false);
      return;
    }

    // Auto-create user role row
    if (data.user) {
      const { error: roleError } = await supabase.from("user_roles").insert({
        user_id: data.user.id,
        email: data.user.email,
        role: "user",
      });

      if (roleError) console.error("Role insert failed:", roleError);
    }

    setLoading(false);
    alert("Account created! Check your email to confirm your account.");
  }

  // SIGN IN FUNCTION
  async function handleSignIn() {
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
        borderRadius: 16,
        background: "rgba(0,0,0,0.6)",
        border: "1px solid rgba(255,255,255,0.2)",
        color: "#fff",
      }}
    >
      <h1 style={{ marginBottom: 20 }}>
        {mode === "signin" ? "Sign In" : "Create Account"}
      </h1>

      {/* EMAIL FIELD */}
      <label style={{ display: "block", marginBottom: 6 }}>Email</label>
      <input
        type="email"
        value={email}
        placeholder="you@example.com"
        onChange={(e) => setEmail(e.target.value)}
        style={{
          width: "100%",
          padding: 10,
          borderRadius: 8,
          marginBottom: 16,
          background: "rgba(255,255,255,0.1)",
          border: "1px solid rgba(255,255,255,0.2)",
          color: "#fff",
        }}
      />

      {/* PASSWORD FIELD */}
      <label style={{ display: "block", marginBottom: 6 }}>Password</label>
      <input
        type="password"
        value={password}
        placeholder="••••••••"
        onChange={(e) => setPassword(e.target.value)}
        style={{
          width: "100%",
          padding: 10,
          borderRadius: 8,
          marginBottom: 24,
          background: "rgba(255,255,255,0.1)",
          border: "1px solid rgba(255,255,255,0.2)",
          color: "#fff",
        }}
      />

      {/* SUBMIT BUTTON */}
      <button
        disabled={loading}
        onClick={mode === "signin" ? handleSignIn : handleSignUp}
        style={{
          width: "100%",
          padding: 12,
          borderRadius: 10,
          background: "linear-gradient(135deg, #8ab4ff, #7bdcb5)",
          border: "none",
          fontWeight: "bold",
          color: "#000",
          cursor: "pointer",
          marginBottom: 12,
        }}
      >
        {loading
          ? "Loading..."
          : mode === "signin"
          ? "Sign In"
          : "Sign Up"}
      </button>

      {/* SWITCH MODE */}
      <p style={{ textAlign: "center", marginTop: 10 }}>
        {mode === "signin" ? (
          <>
            Don’t have an account?{" "}
            <span
              style={{ color: "#7bdcb5", cursor: "pointer" }}
              onClick={() => setMode("signup")}
            >
              Create one
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
