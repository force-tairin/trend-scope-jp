import { NextResponse } from "next/server";
import { fetchRDFFeed } from "@/lib/news";
import { getCache, setCache } from "@/lib/cache";

export async function GET() {
  const cached = getCache("news_politics");
  if (cached) return NextResponse.json({ news: cached, cached: true });

  try {
    // 毎日新聞ニュース速報 (RSS 1.0/RDF形式, 無料, 20件)
    const items = await fetchRDFFeed(
      "https://mainichi.jp/rss/etc/mainichi-flash.rss",
      "毎日新聞"
    );
    if (items.length === 0) throw new Error("No politics news found");
    setCache("news_politics", items);
    return NextResponse.json({ news: items, cached: false });
  } catch (error) {
    console.error("Politics news error:", error);
    return NextResponse.json({ error: "Failed to fetch politics news", news: [] }, { status: 500 });
  }
}
