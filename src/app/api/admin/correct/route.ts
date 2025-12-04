import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      identification_id,
      type,
      origin,
      age,
      maker,
      rarity,
      notes,
      explanation
    } = body;

    // Fetch the original AI identification record
    const { data: original, error: originalError } = await supabase
      .from("ai_identifications")
      .select("*")
      .eq("id", identification_id)
      .single();

    if (originalError) {
      console.error("AI identification fetch error:", originalError);
      return NextResponse.json(
        { error: "Identification not found" },
        { status: 404 }
      );
    }

    // Insert correction
    const { data, error } = await supabase.from("ai_corrections").insert([
      {
        email: original.email,
        marble_image_url: original.image_url,
        ai_prediction: original.ai_result,
        correct_label: {
          type,
          origin,
          age,
          maker,
          rarity,
          notes
        },
        explanation
      }
    ]);

    if (error) {
      console.error("Correction insert error:", error);
      return NextResponse.json(
        { error: "Failed to save correction" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Server error:", err);
    return NextResponse.json(
      { error: "Server failure" },
      { status: 500 }
    );
  }
}
