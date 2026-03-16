"use client";
import { DotGothic16 } from "next/font/google";
const dotGothic = DotGothic16({ subsets: ["latin"], weight: "400", display: "swap" });

interface NewsItemProps {
  rank: number;
  title: string;
  url: string;
  source: string;
  relativeTime: string;
  accentColor: string;
  glowColor: string;
  delay: number;
}

export default function NewsItem({
  rank,
  title,
  url,
  source,
  relativeTime,
  accentColor,
  glowColor,
  delay,
}: NewsItemProps) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="animate-fade-in-up group flex items-start gap-3 px-4 py-3 rounded-xl transition-all duration-200 hover:scale-[1.01] cursor-pointer"
      style={{
        animationDelay: `${delay}ms`,
        opacity: 0,
        backgroundColor: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(255,255,255,0.06)",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.backgroundColor = `${glowColor}12`;
        (e.currentTarget as HTMLElement).style.borderColor = `${glowColor}35`;
        (e.currentTarget as HTMLElement).style.boxShadow = `0 0 16px ${glowColor}15`;
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.backgroundColor = "rgba(255,255,255,0.03)";
        (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.06)";
        (e.currentTarget as HTMLElement).style.boxShadow = "none";
      }}
    >
      {/* Rank */}
      <span
        className="text-sm font-black w-6 text-center shrink-0 mt-0.5"
        style={{ color: rank <= 3 ? accentColor : "rgba(255,255,255,0.25)" }}
      >
        {rank}
      </span>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <p
          className={`${dotGothic.className} text-sm leading-snug line-clamp-2 transition-colors duration-200 group-hover:text-white`}
          style={{ color: "rgba(255,255,255,0.85)" }}
        >
          {title}
        </p>
        <div className="flex items-center gap-2 mt-1">
          <span
            className="text-xs px-1.5 py-0.5 rounded font-medium"
            style={{
              backgroundColor: `${accentColor}18`,
              color: accentColor,
            }}
          >
            {source}
          </span>
          <span className="text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>
            {relativeTime}
          </span>
        </div>
      </div>
    </a>
  );
}
