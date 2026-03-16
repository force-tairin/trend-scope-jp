import { NextResponse } from "next/server";
import * as cheerio from "cheerio";
import { getCache, setCache } from "@/lib/cache";

export interface TrendItem {
  rank: number;
  word: string;
  url: string;
  count?: string;
}

export async function GET() {
  const cached = getCache<TrendItem[]>("twitter");
  if (cached) {
    return NextResponse.json({ trends: cached, cached: true });
  }

  try {
    const res = await fetch("https://trends24.in/japan/", {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        "Accept-Language": "ja,en;q=0.9",
      },
    });

    if (!res.ok) throw new Error(`Trends24 error: ${res.status}`);

    const html = await res.text();
    const $ = cheerio.load(html);

    const trends: TrendItem[] = [];

    // Trends24 structure: .trend-name a.trend-link
    $(".trend-name a").each((_, el) => {
      const word = $(el).text().trim();
      const href = $(el).attr("href") || "";
      if (word && trends.length < 10) {
        // Use the original Twitter search URL from Trends24, but point to X
        const xUrl = href
          ? href.replace("https://twitter.com/", "https://x.com/")
          : `https://x.com/search?q=${encodeURIComponent(word)}&src=trend_click`;
        trends.push({
          rank: trends.length + 1,
          word,
          url: xUrl,
        });
      }
    });

    if (trends.length === 0) throw new Error("No trends found from Trends24");

    setCache("twitter", trends);
    return NextResponse.json({ trends, cached: false });
  } catch (error) {
    console.error("Twitter trends error:", error);
    return NextResponse.json(
      { error: "Failed to fetch X trends", trends: [] },
      { status: 500 }
    );
  }
}
