import { NextResponse } from "next/server";
import { fetchRSSWithCustomFallback, fetchEigaNews } from "@/lib/news";
import { getCache, setCache } from "@/lib/cache";

export async function GET() {
  const cached = getCache("news_entertainment");
  if (cached) return NextResponse.json({ news: cached, cached: true });

  try {
    const items = await fetchRSSWithCustomFallback(
      "https://news.yahoo.co.jp/rss/topics/entertainment.xml",
      "Yahoo!ニュース",
      () => fetchEigaNews(2)
    );
    if (items.length === 0) throw new Error("No entertainment news found");
    setCache("news_entertainment", items);
    return NextResponse.json({ news: items, cached: false });
  } catch (error) {
    console.error("Entertainment news error:", error);
    return NextResponse.json({ error: "Failed to fetch entertainment news", news: [] }, { status: 500 });
  }
}
