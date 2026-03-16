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
  const cached = getCache<TrendItem[]>("instagram");
  if (cached) {
    return NextResponse.json({ trends: cached, cached: true });
  }

  try {
    // Google Trends RSS feed for Japan (daily trending searches)
    const res = await fetch("https://trends.google.com/trending/rss?geo=JP", {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36",
        Accept: "application/rss+xml, application/xml, text/xml",
      },
    });

    if (!res.ok) throw new Error(`Google Trends RSS error: ${res.status}`);

    const xml = await res.text();
    const $ = cheerio.load(xml, { xmlMode: true });

    const trends: TrendItem[] = [];

    $("item").each((_, el) => {
      const title = $(el).find("title").text().trim();
      const traffic = $(el).find("ht\\:approx_traffic").text().trim();
      if (title && trends.length < 10) {
        trends.push({
          rank: trends.length + 1,
          word: title,
          url: `https://www.instagram.com/explore/search/keyword/?q=${encodeURIComponent(title)}`,
          count: traffic || undefined,
        });
      }
    });

    if (trends.length === 0) throw new Error("No trends found");

    setCache("instagram", trends);
    return NextResponse.json({ trends, cached: false, source: "google_trends" });
  } catch (error) {
    console.error("Instagram/Google Trends error:", error);
    return NextResponse.json(
      { error: "Failed to fetch trends", trends: [] },
      { status: 500 }
    );
  }
}
