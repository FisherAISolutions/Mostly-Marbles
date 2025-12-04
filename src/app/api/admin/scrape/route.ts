import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";
import { scrapePage } from "@/lib/scrapeSource";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { url } = body;

    const scraped = await scrapePage(url);
    if (!scraped) {
      return NextResponse.json({ error: "Failed to scrape" }, { status: 500 });
    }

    const { text, images } = scraped;

    // Insert text into training table
    await supabase.from("training_samples").insert({
      description: text,
      notes: "Auto-imported via scraper",
      url,
      image_url: null
    });

    // Insert images
    for (const img of images) {
      await supabase.from("training_samples").insert({
        description: "Image reference from scraper",
        notes: "Auto-imported marble-related image",
        url,
        image_url: img
      });
    }

    return NextResponse.json({
      message: "Scrape complete",
      imagesFound: images.length,
      textLength: text.length
    });

  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server failure" }, { status: 500 });
  }
}
