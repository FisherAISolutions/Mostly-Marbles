export type User = {
  id: string;
  email: string;
  role: "owner" | "admin" | "user";
};

const OWNER_EMAIL = process.env.OWNER_EMAIL;
const ADMIN_EMAIL = process.env.ADMIN_EMAIL;

// TEMPORARY AUTH SIMULATION
// This will be replaced with Supabase Auth later
export async function getCurrentUser(): Promise<User | null> {
  const email = OWNER_EMAIL ?? ""; // Always supply a string

  let role: User["role"] = "user";

  if (email && OWNER_EMAIL && email === OWNER_EMAIL) {
    role = "owner";
  } else if (email && ADMIN_EMAIL && email === ADMIN_EMAIL) {
    role = "admin";
  }

  return {
    id: "local-user",
    email,
    role
  };
}