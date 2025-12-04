export async function scrapeURL(url: string) {
  try {
    const res = await fetch(url);
    const html = await res.text();

    // Simple extractor: remove HTML tags & keep readable text
    const text = html
      .replace(/<script[^>]*>([\s\S]*?)<\/script>/gi, "")
      .replace(/<style[^>]*>([\s\S]*?)<\/style>/gi, "")
      .replace(/<\/?[^>]+(>|$)/g, "")
      .replace(/\s+/g, " ")
      .trim();

    return text;
  } catch (e) {
    console.error("Scrape failed:", e);
    return null;
  }
}
