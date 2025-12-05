import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";

export async function POST(req: Request) {
  const { user_id, email } = await req.json();

  if (!user_id || !email)
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });

  await supabase.from("user_roles").insert({
    user_id,
    email,
    role: "user"
  });

  return NextResponse.json({ ok: true });
}
