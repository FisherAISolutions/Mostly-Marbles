"use client";
import { supabase } from "@/lib/supabaseClient";

export default function LogoutButton() {
  return (
    <button
      onClick={() => supabase.auth.signOut()}
      style={{ marginLeft: 20 }}
    >
      Log Out
    </button>
  );
}
