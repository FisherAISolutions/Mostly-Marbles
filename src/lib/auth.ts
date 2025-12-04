"use server";

import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export async function getCurrentUser() {
  const supabase = createServerSupabaseClient({ cookies });

  // 1. Get session from Supabase Auth
  const {
    data: { session }
  } = await supabase.auth.getSession();

  if (!session) return null;

  const user = session.user;

  // 2. Load role from your `user_roles` table
  const { data: roleRow } = await supabase
    .from("user_roles")
    .select("role")
    .eq("user_id", user.id)
    .single();

  const role = roleRow?.role ?? "user";

  return {
    id: user.id,
    email: user.email ?? "",
    role
  };
}
