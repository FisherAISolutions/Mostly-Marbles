export type User = {
  id: string;
  email: string;
  role: "owner" | "admin" | "user";
};

const OWNER_EMAIL = process.env.OWNER_EMAIL;
const ADMIN_EMAIL = process.env.ADMIN_EMAIL;

// TEMP AUTH SIMULATION (will be replaced by real Supabase Auth later)
export async function getCurrentUser(): Promise<User | null> {
  // Always return a string, never undefined
  const email: string = OWNER_EMAIL ?? "";

  let role: User["role"] = "user";

  if (email && OWNER_EMAIL && email === OWNER_EMAIL) {
    role = "owner";
  } else if (email && ADMIN_EMAIL && email === ADMIN_EMAIL) {
    role = "admin";
  }

  return {
    id: "local-user",
    email: email,   // ← absolutely guaranteed string
    role: role
  };
}
