import { NextResponse } from "next/server";
import { fetchRSSWithCustomFallback, fetchOneFeedPublic } from "@/lib/news";
import { getCache, setCache } from "@/lib/cache";

export async function GET() {
  const cached = getCache("news_economy");
  if (cached) return NextResponse.json({ news: cached, cached: true });

  try {
    const items = await fetchRSSWithCustomFallback(
      "https://news.yahoo.co.jp/rss/topics/business.xml",
      "Yahoo!ニュース",
      () => fetchOneFeedPublic("https://jp.investing.com/rss/news_25.rss", "Investing.com", 2)
    );
    if (items.length === 0) throw new Error("No economy news found");
    setCache("news_economy", items);
    return NextResponse.json({ news: items, cached: false });
  } catch (error) {
    console.error("Economy news error:", error);
    return NextResponse.json({ error: "Failed to fetch economy news", news: [] }, { status: 500 });
  }
}
