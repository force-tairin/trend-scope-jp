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
  const cached = getCache<TrendItem[]>("tiktok");
  if (cached) {
    return NextResponse.json({ trends: cached, cached: true });
  }

  try {
    // Google Trends RSS feed for Japan - link to TikTok search
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

    const allItems: { title: string; traffic: string }[] = [];
    $("item").each((_, el) => {
      const title = $(el).find("title").text().trim();
      const traffic = $(el).find("ht\\:approx_traffic").text().trim();
      if (title) allItems.push({ title, traffic });
    });

    // Use items 10-19 so TikTok and Instagram show different results
    const slice = allItems.length >= 20 ? allItems.slice(10, 20) : allItems;

    const trends: TrendItem[] = slice.slice(0, 10).map((item, i) => ({
      rank: i + 1,
      word: item.title,
      url: `https://www.tiktok.com/search?q=${encodeURIComponent(item.title)}`,
      count: item.traffic || undefined,
    }));

    if (trends.length === 0) throw new Error("No TikTok trends found");

    setCache("tiktok", trends);
    return NextResponse.json({ trends, cached: false });
  } catch (error) {
    console.error("TikTok trends error:", error);
    return NextResponse.json(
      { error: "Failed to fetch TikTok trends", trends: [] },
      { status: 500 }
    );
  }
}
