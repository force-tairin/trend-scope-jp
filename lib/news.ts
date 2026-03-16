import * as cheerio from "cheerio";

export interface NewsItem {
  rank: number;
  title: string;
  url: string;
  source: string;
  publishedAt: string;
  relativeTime: string;
}

// Exported version for use as custom fetcher
export async function fetchOneFeedPublic(feedUrl: string, sourceName: string, limit: number): Promise<Omit<NewsItem, "rank">[]> {
  return fetchOneFeed(feedUrl, sourceName, limit);
}

async function fetchOneFeed(feedUrl: string, sourceName: string, limit: number): Promise<Omit<NewsItem, "rank">[]> {
  const res = await fetch(feedUrl, {
    headers: {
      "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36",
      Accept: "application/rss+xml, application/xml, text/xml, */*",
    },
  });

  if (!res.ok) throw new Error(`RSS fetch error: ${res.status} ${feedUrl}`);

  const xml = await res.text();
  const $ = cheerio.load(xml, { xmlMode: true });

  const items: Omit<NewsItem, "rank">[] = [];

  $("item").each((_, el) => {
    const title = $(el).find("title").text().trim();
    const link = $(el).find("link").text().trim() || $(el).find("link").attr("href") || "";
    const pubDate = $(el).find("pubDate").text().trim();

    if (title && link && items.length < limit) {
      const date = pubDate ? new Date(pubDate) : new Date();
      items.push({
        title,
        url: link,
        source: sourceName,
        publishedAt: date.toISOString(),
        relativeTime: toRelativeTime(date),
      });
    }
  });

  return items;
}

export async function fetchRSS(feedUrl: string, sourceName: string): Promise<NewsItem[]> {
  const items = await fetchOneFeed(feedUrl, sourceName, 10);
  return items.map((item, i) => ({ ...item, rank: i + 1 }));
}

// Fetch primary feed (up to 10), fill remaining slots with fallback
export async function fetchRSSWithFallback(
  primaryUrl: string,
  primarySource: string,
  fallbackUrl: string,
  fallbackSource: string
): Promise<NewsItem[]> {
  const primary = await fetchOneFeed(primaryUrl, primarySource, 10);
  const needed = 10 - primary.length;

  let combined = [...primary];
  if (needed > 0) {
    try {
      const fallback = await fetchOneFeed(fallbackUrl, fallbackSource, needed);
      combined = [...primary, ...fallback];
    } catch {
      // fallback failed, use what we have
    }
  }

  return combined.slice(0, 10).map((item, i) => ({ ...item, rank: i + 1 }));
}

// Fetch primary feed (up to 8), then append custom items for positions 9-10
export async function fetchRSSWithCustomFallback(
  primaryUrl: string,
  primarySource: string,
  customFetcher: () => Promise<Omit<NewsItem, "rank">[]>
): Promise<NewsItem[]> {
  const primary = await fetchOneFeed(primaryUrl, primarySource, 8);
  const needed = 10 - primary.length;

  let combined = [...primary];
  if (needed > 0) {
    try {
      const custom = await customFetcher();
      combined = [...primary, ...custom.slice(0, needed)];
    } catch {
      // custom fetcher failed, use what we have
    }
  }

  return combined.slice(0, 10).map((item, i) => ({ ...item, rank: i + 1 }));
}

// Fetch eiga.com top news (for entertainment 9-10)
export async function fetchEigaNews(limit: number): Promise<Omit<NewsItem, "rank">[]> {
  const res = await fetch("https://feeds.eiga.com/eiga_news.xml", {
    headers: {
      "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36",
      Accept: "application/rss+xml, application/xml, text/xml, */*",
    },
  });

  if (!res.ok) throw new Error(`eiga.com RSS error: ${res.status}`);

  const xml = await res.text();
  const $ = cheerio.load(xml, { xmlMode: true });
  const items: Omit<NewsItem, "rank">[] = [];

  $("item").each((_, el) => {
    const title = $(el).find("title").text().trim();
    const link = $(el).find("link").text().trim() || $(el).find("link").attr("href") || "";
    const pubDate = $(el).find("pubDate").text().trim();

    if (title && link && items.length < limit) {
      const date = pubDate ? new Date(pubDate) : new Date();
      items.push({
        title,
        url: link,
        source: "映画.com",
        publishedAt: date.toISOString(),
        relativeTime: toRelativeTime(date),
      });
    }
  });

  return items;
}

// Fetch Yahoo comment ranking top articles (for 話題 9-10)
export async function fetchYahooCommentRanking(limit: number): Promise<Omit<NewsItem, "rank">[]> {
  const res = await fetch("https://news.yahoo.co.jp/ranking/comment", {
    headers: {
      "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36",
      Accept: "text/html,application/xhtml+xml",
      "Accept-Language": "ja,en;q=0.9",
    },
  });

  if (!res.ok) throw new Error(`Yahoo comment ranking error: ${res.status}`);

  const html = await res.text();
  const match = html.match(/window\.__PRELOADED_STATE__\s*=\s*(\{.*?\})\s*;?\s*<\/script>/s);
  if (!match) throw new Error("PRELOADED_STATE not found");

  const data = JSON.parse(match[1]);
  const list: Array<{ headline: string; newsLink: string; mediaName: string }> =
    data?.rankingFeed?.list ?? [];

  return list.slice(0, limit).map((item) => ({
    title: item.headline,
    url: item.newsLink,
    source: item.mediaName || "Yahoo!ニュース",
    publishedAt: new Date().toISOString(),
    relativeTime: "ヤフコメ人気",
  }));
}

function toRelativeTime(date: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMin = Math.floor(diffMs / 60000);

  if (diffMin < 1) return "たった今";
  if (diffMin < 60) return `${diffMin}分前`;
  const diffHour = Math.floor(diffMin / 60);
  if (diffHour < 24) return `${diffHour}時間前`;
  const diffDay = Math.floor(diffHour / 24);
  return `${diffDay}日前`;
}
