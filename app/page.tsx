import { Dela_Gothic_One } from "next/font/google";
import Header from "@/components/Header";
import TrendCard from "@/components/TrendCard";
import NewsCard from "@/components/NewsCard";

const delaGothic = Dela_Gothic_One({ subsets: ["latin"], weight: "400", display: "swap" });

const PLATFORMS = [
  {
    id: "youtube",
    label: "YouTube",
    icon: "▶",
    gradient: "linear-gradient(135deg, #FF0000, #FF6B6B)",
    accentColor: "#FF4444",
    glowColor: "#FF0000",
    borderGlow: "rgba(255,0,0,0.2)",
    apiPath: "/api/trends/youtube",
  },
  {
    id: "twitter",
    label: "X (Twitter)",
    icon: "✕",
    gradient: "linear-gradient(135deg, #000000, #1DA1F2)",
    accentColor: "#1DA1F2",
    glowColor: "#1DA1F2",
    borderGlow: "rgba(29,161,242,0.2)",
    apiPath: "/api/trends/twitter",
  },
  {
    id: "tiktok",
    label: "TikTok",
    icon: "♪",
    gradient: "linear-gradient(135deg, #FF0050, #00F2EA)",
    accentColor: "#FF0050",
    glowColor: "#FF0050",
    borderGlow: "rgba(255,0,80,0.2)",
    apiPath: "/api/trends/tiktok",
  },
  {
    id: "instagram",
    label: "Instagram",
    icon: "◎",
    gradient: "linear-gradient(135deg, #F77737, #E1306C, #833AB4)",
    accentColor: "#E1306C",
    glowColor: "#833AB4",
    borderGlow: "rgba(131,58,180,0.2)",
    apiPath: "/api/trends/instagram",
    note: "Google Trendsデータ参照",
  },
];

const NEWS_CATEGORIES = [
  {
    id: "politics",
    label: "政治",
    icon: "🏛",
    gradient: "linear-gradient(135deg, #3B82F6, #1D4ED8)",
    accentColor: "#60A5FA",
    glowColor: "#3B82F6",
    borderGlow: "rgba(59,130,246,0.2)",
    apiPath: "/api/news/politics",
  },
  {
    id: "economy",
    label: "経済",
    icon: "📈",
    gradient: "linear-gradient(135deg, #10B981, #065F46)",
    accentColor: "#34D399",
    glowColor: "#10B981",
    borderGlow: "rgba(16,185,129,0.2)",
    apiPath: "/api/news/economy",
  },
  {
    id: "entertainment",
    label: "エンタメ",
    icon: "🎬",
    gradient: "linear-gradient(135deg, #EC4899, #8B5CF6)",
    accentColor: "#F472B6",
    glowColor: "#EC4899",
    borderGlow: "rgba(236,72,153,0.2)",
    apiPath: "/api/news/entertainment",
  },
  {
    id: "trending",
    label: "話題",
    icon: "🔥",
    gradient: "linear-gradient(135deg, #F59E0B, #EF4444)",
    accentColor: "#FCD34D",
    glowColor: "#F59E0B",
    borderGlow: "rgba(245,158,11,0.2)",
    apiPath: "/api/news/trending",
  },
];

export default function Home() {
  return (
    <div
      className="min-h-screen"
      style={{
        background:
          "radial-gradient(ellipse 80% 50% at 50% -10%, rgba(120,40,200,0.15), transparent), #08080f",
      }}
    >
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 pb-16">

        {/* ── SNS TRENDS SECTION TITLE ── */}
        <section>
          <div className="relative flex flex-col items-center py-10 sm:py-12 select-none">
            {/* Background glow blob */}
            <div
              className="absolute inset-0 rounded-3xl pointer-events-none"
              style={{
                background: "radial-gradient(ellipse 60% 80% at 50% 50%, rgba(99,102,241,0.08), transparent)",
              }}
            />
            {/* Eyebrow label */}
            <div
              className="flex items-center gap-2 text-xs font-semibold tracking-widest uppercase mb-3 px-4 py-1.5 rounded-full"
              style={{
                background: "rgba(99,102,241,0.12)",
                border: "1px solid rgba(99,102,241,0.25)",
                color: "rgba(165,180,252,0.9)",
              }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full"
                style={{ background: "#818cf8", boxShadow: "0 0 8px #818cf8" }}
              />
              JAPAN · リアルタイム · 1時間更新
            </div>
            {/* Main title */}
            <h2
              className={`${delaGothic.className} text-3xl sm:text-5xl text-center leading-tight`}
              style={{
                background: "linear-gradient(135deg, #FF6B6B 0%, #FF0050 30%, #833AB4 60%, #1DA1F2 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                letterSpacing: "-0.02em",
              }}
            >
              SNS トレンドワード
            </h2>
            <p
              className="mt-2 text-sm sm:text-base font-medium"
              style={{ color: "rgba(255,255,255,0.35)" }}
            >
              YouTube · X · TikTok · Instagram の日本トップ10
            </p>
            {/* Decorative line */}
            <div className="flex items-center gap-3 mt-5 w-full max-w-md">
              <div className="h-px flex-1" style={{ background: "linear-gradient(90deg, transparent, rgba(99,102,241,0.4))" }} />
              <div className="flex gap-1">
                {["#FF6B6B","#FF0050","#833AB4","#1DA1F2"].map((c) => (
                  <span key={c} className="w-1.5 h-1.5 rounded-full" style={{ background: c, boxShadow: `0 0 6px ${c}` }} />
                ))}
              </div>
              <div className="h-px flex-1" style={{ background: "linear-gradient(90deg, rgba(99,102,241,0.4), transparent)" }} />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-5">
            {PLATFORMS.map((platform, i) => (
              <TrendCard key={platform.id} platform={platform} delay={i * 100} />
            ))}
          </div>
        </section>

        {/* ── NEWS SECTION TITLE ── */}
        <section className="mt-6">
          <div className="relative flex flex-col items-center py-10 sm:py-12 select-none">
            <div
              className="absolute inset-0 rounded-3xl pointer-events-none"
              style={{
                background: "radial-gradient(ellipse 60% 80% at 50% 50%, rgba(16,185,129,0.07), transparent)",
              }}
            />
            {/* Eyebrow label */}
            <div
              className="flex items-center gap-2 text-xs font-semibold tracking-widest uppercase mb-3 px-4 py-1.5 rounded-full"
              style={{
                background: "rgba(16,185,129,0.1)",
                border: "1px solid rgba(16,185,129,0.22)",
                color: "rgba(110,231,183,0.9)",
              }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full"
                style={{ background: "#34d399", boxShadow: "0 0 8px #34d399" }}
              />
              NHK · Yahoo!ニュース · 映画.com · Investing.com
            </div>
            {/* Main title */}
            <h2
              className={`${delaGothic.className} text-3xl sm:text-5xl text-center leading-tight`}
              style={{
                background: "linear-gradient(135deg, #34D399 0%, #3B82F6 50%, #F59E0B 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                letterSpacing: "-0.02em",
              }}
            >
              最新ニュース
            </h2>
            <p
              className="mt-2 text-sm sm:text-base font-medium"
              style={{ color: "rgba(255,255,255,0.35)" }}
            >
              政治 · 経済 · エンタメ · 話題 のカテゴリ別トップ10
            </p>
            {/* Decorative line */}
            <div className="flex items-center gap-3 mt-5 w-full max-w-md">
              <div className="h-px flex-1" style={{ background: "linear-gradient(90deg, transparent, rgba(16,185,129,0.4))" }} />
              <div className="flex gap-1">
                {["#3B82F6","#10B981","#EC4899","#F59E0B"].map((c) => (
                  <span key={c} className="w-1.5 h-1.5 rounded-full" style={{ background: c, boxShadow: `0 0 6px ${c}` }} />
                ))}
              </div>
              <div className="h-px flex-1" style={{ background: "linear-gradient(90deg, rgba(16,185,129,0.4), transparent)" }} />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-5">
            {NEWS_CATEGORIES.map((category, i) => (
              <NewsCard key={category.id} category={category} delay={i * 100} />
            ))}
          </div>
        </section>

        {/* Footer */}
        <div
          className="text-center mt-12 text-xs space-y-1"
          style={{ color: "rgba(255,255,255,0.2)" }}
        >
          <p>各ワード・見出しをクリックすると対象ページに移動します</p>
          <p>TikTok・Instagram欄はGoogleトレンド（日本）参照 ／ ニュース提供：Yahoo!ニュース・NHK・映画.com・Investing.com</p>
        </div>
      </main>
    </div>
  );
}
