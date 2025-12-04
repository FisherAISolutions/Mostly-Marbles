import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";

export type User = {
  id: string;
  email: string;
  role: "owner" | "admin" | "user";
};

// SERVER-SIDE AUTH — used inside Server Components
export async function getCurrentUser(): Promise<User | null> {
  const cookieStore = cookies();

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
        set() {},
        remove() {},
      },
    }
  );

  // 1️⃣ Get the Supabase session
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session?.user) return null;

  const authUser = session.user;

  // 2️⃣ Pull the user role from your 'user_roles' table
  const { data: userRole } = await supabase
    .from("user_roles")
    .select("role")
    .eq("user_id", authUser.id)
    .maybeSingle();

  return {
    id: authUser.id,
    email: authUser.email!,
    role: (userRole?.role as User["role"]) ?? "user",
  };
}
