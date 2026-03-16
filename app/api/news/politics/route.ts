import { NextResponse } from "next/server";
import { fetchRSS } from "@/lib/news";
import { getCache, setCache } from "@/lib/cache";

export async function GET() {
  const cached = getCache("news_politics");
  if (cached) return NextResponse.json({ news: cached, cached: true });

  try {
    const items = await fetchRSS("https://www3.nhk.or.jp/rss/news/cat4.xml", "NHK");
    if (items.length === 0) throw new Error("No politics news found");
    setCache("news_politics", items);
    return NextResponse.json({ news: items, cached: false });
  } catch (error) {
    console.error("Politics news error:", error);
    return NextResponse.json({ error: "Failed to fetch politics news", news: [] }, { status: 500 });
  }
}
