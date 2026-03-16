"use client";

import { useState, useEffect } from "react";
import TrendItem from "./TrendItem";

interface TrendData {
  rank: number;
  word: string;
  url: string;
  count?: string;
}

interface PlatformConfig {
  id: string;
  label: string;
  icon: string;
  gradient: string;
  accentColor: string;
  glowColor: string;
  borderGlow: string;
  apiPath: string;
  note?: string;
}

interface TrendCardProps {
  platform: PlatformConfig;
  delay: number;
}

export default function TrendCard({ platform, delay }: TrendCardProps) {
  const [trends, setTrends] = useState<TrendData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const fetchTrends = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(platform.apiPath);
      const data = await res.json();
      if (data.trends && data.trends.length > 0) {
        setTrends(data.trends);
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
    fetchTrends();
    const interval = setInterval(fetchTrends, 60 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="animate-fade-in-up rounded-2xl overflow-hidden flex flex-col"
      style={{
        animationDelay: `${delay}ms`,
        opacity: 0,
        background: "rgba(255,255,255,0.03)",
        border: `1px solid ${platform.borderGlow}`,
        boxShadow: `0 0 40px ${platform.glowColor}15`,
      }}
    >
      {/* Card Header */}
      <div
        className="px-5 py-4 flex items-center justify-between"
        style={{
          background: `linear-gradient(135deg, ${platform.glowColor}20, transparent)`,
          borderBottom: `1px solid ${platform.borderGlow}`,
        }}
      >
        <div className="flex items-center gap-3">
          {/* Platform Icon */}
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center text-xl font-bold shrink-0"
            style={{
              background: platform.gradient,
              boxShadow: `0 0 20px ${platform.glowColor}50`,
            }}
          >
            {platform.icon}
          </div>
          <div>
            <h2
              className={`text-lg font-black gradient-text-${platform.id}`}
            >
              {platform.label}
            </h2>
            {platform.note && (
              <p className="text-xs" style={{ color: "rgba(255,255,255,0.35)" }}>
                {platform.note}
              </p>
            )}
          </div>
        </div>

        {/* Refresh button */}
        <button
          onClick={fetchTrends}
          disabled={loading}
          className="w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200 hover:scale-110 disabled:opacity-40"
          style={{
            background: `${platform.glowColor}20`,
            border: `1px solid ${platform.glowColor}40`,
            color: platform.accentColor,
          }}
          title="更新"
        >
          <span className={loading ? "animate-spin" : ""} style={{ display: "inline-block" }}>
            ↻
          </span>
        </button>
      </div>

      {/* Trend List */}
      <div className="flex-1 p-3 flex flex-col gap-1">
        {loading && (
          <div className="flex flex-col gap-2 py-2">
            {[...Array(10)].map((_, i) => (
              <div
                key={i}
                className="h-11 rounded-xl animate-pulse"
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
              onClick={fetchTrends}
              className="text-xs px-3 py-1.5 rounded-lg transition-colors"
              style={{
                background: `${platform.glowColor}20`,
                color: platform.accentColor,
                border: `1px solid ${platform.glowColor}40`,
              }}
            >
              再試行
            </button>
          </div>
        )}

        {!loading &&
          !error &&
          trends.map((trend, i) => (
            <TrendItem
              key={trend.rank}
              {...trend}
              accentColor={platform.accentColor}
              glowColor={platform.glowColor}
              delay={i * 50}
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
