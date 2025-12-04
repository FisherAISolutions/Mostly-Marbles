"use client";

import type { ReactNode } from "react";

export default function SupabaseProvider({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
