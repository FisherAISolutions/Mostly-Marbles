"use client";

import { createBrowserClient } from "@supabase/supabase-js";
import { useState } from "react";

export default function SupabaseProvider({ children }: { children: React.ReactNode }) {
  const [supabase] = useState(() =>
    createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )
  );

  // Provide supabase to children via simple context
  return <>{children}</>;
}
