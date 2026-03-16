import { NextResponse } from "next/server";
import { getCache, setCache } from "@/lib/cache";

export interface TrendItem {
  rank: number;
  word: string;
  url: string;
  count?: number;
}

// Stop words to filter out common Japanese particles and meaningless words
const STOP_WORDS = new Set([
  "の", "に", "は", "を", "た", "が", "で", "て", "と", "し", "れ", "さ",
  "ある", "いる", "も", "する", "から", "な", "こと", "として", "い", "や",
  "れる", "など", "なっ", "ない", "この", "ため", "その", "あっ", "よう",
  "また", "もの", "という", "あり", "まで", "られ", "なる", "へ", "か",
  "だ", "これ", "によって", "により", "おり", "より", "による", "ず",
  "なく", "しか", "でき", "その後", "以外", "れば", "a", "b", "c",
  "the", "of", "in", "and", "to", "is", "for", "on", "that", "with",
  "【", "】", "「", "」", "！", "？", "・", "＃",
]);

function extractKeywords(titles: string[]): TrendItem[] {
  const wordCount = new Map<string, number>();

  for (const title of titles) {
    // Split by common delimiters and spaces
    const words = title
      .replace(/[【】「」！？…｜\/\-_,\.]/g, " ")
      .replace(/[^\u3000-\u9fff\u30a0-\u30ff\uff65-\uff9f\w\s]/g, " ")
      .split(/\s+/)
      .filter((w) => {
        const cleaned = w.trim();
        return (
          cleaned.length >= 2 &&
          cleaned.length <= 20 &&
          !STOP_WORDS.has(cleaned) &&
          !/^\d+$/.test(cleaned) // skip pure numbers
        );
      });

    for (const word of words) {
      const trimmed = word.trim();
      if (trimmed) {
        wordCount.set(trimmed, (wordCount.get(trimmed) || 0) + 1);
      }
    }
  }

  return Array.from(wordCount.entries())
    .filter(([, count]) => count >= 1)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([word, count], i) => ({
      rank: i + 1,
      word,
      count,
      url: `https://www.youtube.com/results?search_query=${encodeURIComponent(word)}`,
    }));
}

export async function GET() {
  const cached = getCache<TrendItem[]>("youtube");
  if (cached) {
    return NextResponse.json({ trends: cached, cached: true });
  }

  const apiKey = process.env.YOUTUBE_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      { error: "YouTube API key not configured", trends: [] },
      { status: 503 }
    );
  }

  try {
    const url = new URL("https://www.googleapis.com/youtube/v3/videos");
    url.searchParams.set("part", "snippet,statistics");
    url.searchParams.set("chart", "mostPopular");
    url.searchParams.set("regionCode", "JP");
    url.searchParams.set("hl", "ja");
    url.searchParams.set("maxResults", "50");
    url.searchParams.set("key", apiKey);

    const res = await fetch(url.toString(), { next: { revalidate: 3600 } });
    if (!res.ok) throw new Error(`YouTube API error: ${res.status}`);

    const data = await res.json();
    const titles: string[] = data.items?.map(
      (item: { snippet: { title: string } }) => item.snippet.title
    ) ?? [];

    const trends = extractKeywords(titles);
    setCache("youtube", trends);

    return NextResponse.json({ trends, cached: false });
  } catch (error) {
    console.error("YouTube API error:", error);
    return NextResponse.json(
      { error: "Failed to fetch YouTube trends", trends: [] },
      { status: 500 }
    );
  }
}
