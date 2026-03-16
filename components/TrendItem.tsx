"use client";
import { DotGothic16 } from "next/font/google";
const dotGothic = DotGothic16({ subsets: ["latin"], weight: "400", display: "swap" });

interface TrendItemProps {
  rank: number;
  word: string;
  url: string;
  count?: string;
  accentColor: string;
  glowColor: string;
  delay: number;
}

export default function TrendItem({
  rank,
  word,
  url,
  count,
  accentColor,
  glowColor,
  delay,
}: TrendItemProps) {
  const rankClass =
    rank === 1 ? "rank-1" : rank === 2 ? "rank-2" : rank === 3 ? "rank-3" : "";

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="animate-fade-in-up group flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 hover:scale-[1.02] cursor-pointer"
      style={{
        animationDelay: `${delay}ms`,
        opacity: 0,
        backgroundColor: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(255,255,255,0.06)",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.backgroundColor =
          `${glowColor}15`;
        (e.currentTarget as HTMLElement).style.borderColor = `${glowColor}40`;
        (e.currentTarget as HTMLElement).style.boxShadow = `0 0 20px ${glowColor}20`;
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.backgroundColor =
          "rgba(255,255,255,0.03)";
        (e.currentTarget as HTMLElement).style.borderColor =
          "rgba(255,255,255,0.06)";
        (e.currentTarget as HTMLElement).style.boxShadow = "none";
      }}
    >
      {/* Rank */}
      <span
        className={`text-lg font-black w-8 text-center shrink-0 ${rankClass}`}
        style={
          rank > 3
            ? { color: "rgba(255,255,255,0.3)", fontSize: "0.85rem" }
            : {}
        }
      >
        {rank <= 3 ? rank : `${rank}`}
      </span>

      {/* Word */}
      <span
        className={`${dotGothic.className} flex-1 text-sm sm:text-base truncate transition-colors duration-200`}
        style={{ color: "rgba(255,255,255,0.9)" }}
      >
        {word}
      </span>

      {/* Count badge */}
      {count && (
        <span
          className="text-xs px-2 py-0.5 rounded-full shrink-0 font-medium"
          style={{
            backgroundColor: `${accentColor}20`,
            color: accentColor,
            border: `1px solid ${accentColor}40`,
          }}
        >
          {count}
        </span>
      )}

      {/* Arrow */}
      <span
        className="text-xs opacity-0 group-hover:opacity-60 transition-opacity duration-200 shrink-0"
        style={{ color: accentColor }}
      >
        →
      </span>
    </a>
  );
}
