"use client";

import { useState, useEffect } from "react";
import NewsItem from "./NewsItem";

interface NewsData {
  rank: number;
  title: string;
  url: string;
  source: string;
  relativeTime: string;
}

interface NewsCategoryConfig {
  id: string;
  label: string;
  icon: string;
  gradient: string;
  accentColor: string;
  glowColor: string;
  borderGlow: string;
  apiPath: string;
}

interface NewsCardProps {
  category: NewsCategoryConfig;
  delay: number;
}

export default function NewsCard({ category, delay }: NewsCardProps) {
  const [news, setNews] = useState<NewsData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const fetchNews = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(category.apiPath);
      const data = await res.json();
      if (data.news && data.news.length > 0) {
        setNews(data.news);
        setLastUpdated(new Date());
      } else {
        setError(data.error || "データを取得できませんでした");
      }
    } catch {
      setError("ネットワークエラーが発生しました");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
    const interval = setInterval(fetchNews, 60 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="animate-fade-in-up rounded-2xl overflow-hidden flex flex-col"
      style={{
        animationDelay: `${delay}ms`,
        opacity: 0,
        background: "rgba(255,255,255,0.03)",
        border: `1px solid ${category.borderGlow}`,
        boxShadow: `0 0 40px ${category.glowColor}10`,
      }}
    >
      {/* Header */}
      <div
        className="px-5 py-4 flex items-center justify-between"
        style={{
          background: `linear-gradient(135deg, ${category.glowColor}18, transparent)`,
          borderBottom: `1px solid ${category.borderGlow}`,
        }}
      >
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center text-xl shrink-0"
            style={{
              background: category.gradient,
              boxShadow: `0 0 20px ${category.glowColor}40`,
            }}
          >
            {category.icon}
          </div>
          <h2
            className="text-lg font-black"
            style={{
              background: category.gradient,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            {category.label}
          </h2>
        </div>

        <button
          onClick={fetchNews}
          disabled={loading}
          className="w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200 hover:scale-110 disabled:opacity-40"
          style={{
            background: `${category.glowColor}20`,
            border: `1px solid ${category.glowColor}40`,
            color: category.accentColor,
          }}
          title="更新"
        >
          <span className={loading ? "animate-spin" : ""} style={{ display: "inline-block" }}>
            ↻
          </span>
        </button>
      </div>

      {/* News list */}
      <div className="flex-1 p-3 flex flex-col gap-1">
        {loading && (
          <div className="flex flex-col gap-2 py-2">
            {[...Array(10)].map((_, i) => (
              <div
                key={i}
                className="h-14 rounded-xl animate-pulse"
                style={{
                  backgroundColor: "rgba(255,255,255,0.05)",
                  animationDelay: `${i * 50}ms`,
                }}
              />
            ))}
          </div>
        )}

        {error && !loading && (
          <div
            className="flex flex-col items-center justify-center py-10 gap-3"
            style={{ color: "rgba(255,255,255,0.4)" }}
          >
            <span className="text-3xl">⚠️</span>
            <p className="text-sm text-center">{error}</p>
            <button
              onClick={fetchNews}
              className="text-xs px-3 py-1.5 rounded-lg transition-colors"
              style={{
                background: `${category.glowColor}20`,
                color: category.accentColor,
                border: `1px solid ${category.glowColor}40`,
              }}
            >
              再試行
            </button>
          </div>
        )}

        {!loading &&
          !error &&
          news.map((item) => (
            <NewsItem
              key={item.rank}
              {...item}
              accentColor={category.accentColor}
              glowColor={category.glowColor}
              delay={item.rank * 40}
            />
          ))}
      </div>

      {/* Footer */}
      {lastUpdated && (
        <div
          className="px-5 py-2 text-xs text-right"
          style={{
            color: "rgba(255,255,255,0.2)",
            borderTop: "1px solid rgba(255,255,255,0.05)",
          }}
        >
          更新: {lastUpdated.toLocaleTimeString("ja-JP", { hour: "2-digit", minute: "2-digit" })}
        </div>
      )}
    </div>
  );
}
