import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    const description = formData.get("description") as string;
    const notes = formData.get("notes") as string;
    const url = formData.get("url") as string;

    let image_url = null;

    if (file) {
      const buffer = Buffer.from(await file.arrayBuffer());
      const filename = `training-${Date.now()}.jpg`;

      const upload = await supabase.storage
        .from("marble-images")
        .upload(filename, buffer, { contentType: "image/jpeg" });

      if (upload.error) {
        console.error(upload.error);
        return NextResponse.json({ error: "Upload failed" }, { status: 500 });
      }

      image_url = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/marble-images/${filename}`;
    }

    const insert = await supabase.from("training_samples").insert([
      {
        image_url,
        description,
        notes,
        url
      }
    ]);

    if (insert.error) {
      console.error(insert.error);
      return NextResponse.json({ error: "Database insert failed" }, { status: 500 });
    }

    return NextResponse.json({
      message: "Training sample uploaded successfully!"
    });

  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Training upload failed" },
      { status: 500 }
    );
  }
}
