// Simple placeholder helpers to integrate with your auth of choice (Supabase, NextAuth, etc.)

export type User = {
  id: string;
  email: string;
  role: "owner" | "admin" | "user";
};

export async function getCurrentUser(): Promise<User | null> {
  // TODO: Replace with real auth lookup
  return null;
}
