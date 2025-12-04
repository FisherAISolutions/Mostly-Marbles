"use client";

import { ReactNode, useEffect, useState } from "react";

type Props = {
  children: ReactNode;
  role?: "admin" | "owner";
};

export default function AuthGuard({ children, role }: Props) {
  const [allowed, setAllowed] = useState<boolean | null>(null);

  useEffect(() => {
    // TODO: Replace with real client-side role check or call an API route.
    // For now this just blocks by default.
    setAllowed(false);
  }, [role]);

  if (allowed === null) {
    return <div>Checking permissions…</div>;
  }

  if (!allowed) {
    return <div>You do not have permission to view this page.</div>;
  }

  return <>{children}</>;
}
