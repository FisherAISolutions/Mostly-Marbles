import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;
    const email = formData.get("email") as string;

    if (!file) {
      return NextResponse.json({ error: "Missing file" }, { status: 400 });
    }

    // Convert to buffer for OpenAI
    const buffer = Buffer.from(await file.arrayBuffer());

    // ---------------------------
    // 1. Send to OpenAI Vision
    // ---------------------------
    const openaiRes = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content:
              "You are an expert marble identifier. Analyze the image and describe type, origin, era, maker clues, and characteristics."
          },
          {
            role: "user",
            content: [
              {
                type: "input_image",
                image_url: `data:image/jpeg;base64,${buffer.toString("base64")}`,
              },
              { type: "text", text: "Identify this marble." }
            ]
          }
        ]
      })
    });

    const openaiData = await openaiRes.json();
    const ai_result = openaiData.choices?.[0]?.message?.content ?? "Unknown";

    // ---------------------------
    // 2. Save raw AI identification
    // ---------------------------

    // Upload image to Supabase storage
    const filename = `identify-${Date.now()}.jpg`;
    await supabase.storage
      .from("marble-images")
      .upload(filename, buffer, {
        contentType: "image/jpeg",
        upsert: true,
      });

    const image_url = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/marble-images/${filename}`;

    const { data: identificationData } = await supabase
      .from("ai_identifications")
      .insert([
        {
          email,
          image_url,
          ai_result,
        }
      ])
      .select("*")
      .single();

    const identification_id = identificationData.id;

    // ---------------------------
    // 3. Fetch admin corrections
    // ---------------------------
    const { data: corrections } = await supabase
      .from("ai_corrections")
      .select("*");

    // ---------------------------
    // 4. Fetch training samples
    // ---------------------------
    const { data: training } = await supabase
      .from("training_samples")
      .select("*");

    // ---------------------------
    // 5. Build a "smart" summary
    // ---------------------------
    const summaryPrompt = `
User image AI result: ${JSON.stringify(ai_result)}

Relevant corrections from admins:
${JSON.stringify(corrections)}

Relevant training samples (images, metadata, reference text):
${JSON.stringify(training)}

Blend all of the above and produce a final identification.
Only output: type, origin, maker (if known), age, rarity, and detailed explanation.
    `;

    const refineRes = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: "You refine marble identifications." },
          { role: "user", content: summaryPrompt }
        ]
      })
    });

    const refined = await refineRes.json();
    const final_result = refined.choices?.[0]?.message?.content ?? ai_result;

    return NextResponse.json({
      identification_id,
      image_url,
      result: final_result
    });

  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}
