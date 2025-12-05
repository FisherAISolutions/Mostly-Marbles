"use client";

import { createBrowserClient } from "@supabase/ssr";
import { useState } from "react";

export default function SupabaseProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  // The browser Supabase client
  const [supabase] = useState(() =>
    createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )
  );

  // No wrapper provider needed — the client is passed via context below
  return <>{children}</>;
}
