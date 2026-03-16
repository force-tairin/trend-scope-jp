import { NextResponse } from "next/server";
import { fetchRSSWithCustomFallback, fetchYahooCommentRanking } from "@/lib/news";
import { getCache, setCache } from "@/lib/cache";

export async function GET() {
  const cached = getCache("news_trending");
  if (cached) return NextResponse.json({ news: cached, cached: true });

  try {
    const items = await fetchRSSWithCustomFallback(
      "https://news.yahoo.co.jp/rss/topics/domestic.xml",
      "Yahoo!ニュース",
      () => fetchYahooCommentRanking(2)
    );
    if (items.length === 0) throw new Error("No trending news found");
    setCache("news_trending", items);
    return NextResponse.json({ news: items, cached: false });
  } catch (error) {
    console.error("Trending news error:", error);
    return NextResponse.json({ error: "Failed to fetch trending news", news: [] }, { status: 500 });
  }
}
