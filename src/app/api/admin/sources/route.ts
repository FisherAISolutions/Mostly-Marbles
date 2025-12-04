import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";

// GET all sources
export async function GET() {
  const { data, error } = await supabase
    .from("training_sources")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) return NextResponse.json({ error }, { status: 500 });

  return NextResponse.json(data);
}

// POST new training source
export async function POST(req: Request) {
  const body = await req.json();
  const { url, notes } = body;

  const { error } = await supabase.from("training_sources").insert({
    url,
    notes
  });

  if (error) {
    return NextResponse.json({ error }, { status: 500 });
  }

  return NextResponse.json({ message: "Source added!" });
}
