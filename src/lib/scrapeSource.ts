export async function scrapePage(url: string) {
  try {
    const res = await fetch(url);
    const html = await res.text();

    // Extract text content (strips scripts/styles/tags)
    const text = html
      .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, "")
      .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, "")
      .replace(/<\/?[^>]+(>|$)/g, " ")
      .replace(/\s+/g, " ")
      .trim();

    // Simple image extraction
    const imgRegex = /<img[^>]+src="([^">]+)"/gi;
    let match;
    const images: string[] = [];

    while ((match = imgRegex.exec(html))) {
      const src = match[1];

      // Ignore very small images (icons, logos)
      if (src.includes("logo") || src.includes("icon") || src.endsWith(".svg")) continue;

      // Require the image path to have marble-related hints
      if (
        src.toLowerCase().includes("marble") ||
        src.toLowerCase().includes("pontil") ||
        src.toLowerCase().includes("swirl") ||
        src.toLowerCase().includes("glass")
      ) {
        images.push(src.startsWith("http") ? src : new URL(src, url).toString());
      }
    }

    return { text, images };

  } catch (err) {
    console.error("Scrape failed:", err);
    return null;
  }
}
