"use client";

import { useState, useEffect } from "react";

export default function Header() {
  const [time, setTime] = useState<string>("");

  useEffect(() => {
    const update = () => {
      setTime(
        new Date().toLocaleString("ja-JP", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
        })
      );
    };
    update();
    const interval = setInterval(update, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="sticky top-0 z-50 px-4 py-3 sm:px-6 sm:py-4">
      <div
        className="max-w-7xl mx-auto flex items-center justify-between rounded-2xl px-5 py-3"
        style={{
          background: "rgba(8,8,15,0.85)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          border: "1px solid rgba(255,255,255,0.08)",
          boxShadow: "0 4px 30px rgba(0,0,0,0.5)",
        }}
      >
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center text-lg font-black"
            style={{
              background: "linear-gradient(135deg, #FF6B6B, #FF0050, #833AB4, #1DA1F2)",
              boxShadow: "0 0 20px rgba(255,0,80,0.4)",
            }}
          >
            📡
          </div>
          <div>
            <h1
              className="text-base sm:text-lg font-black"
              style={{
                background: "linear-gradient(90deg, #FF6B6B, #FF0050, #833AB4, #1DA1F2, #00F2EA)",
                backgroundSize: "200% auto",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                animation: "shimmer 4s linear infinite",
              }}
            >
              TrendScope JP
            </h1>
            <p className="text-xs hidden sm:block" style={{ color: "rgba(255,255,255,0.35)" }}>
              日本のSNSトレンドをリアルタイムで
            </p>
          </div>
        </div>

        {/* Right: time + badge */}
        <div className="flex items-center gap-3">
          <div
            className="hidden sm:flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full"
            style={{
              background: "rgba(0,242,234,0.1)",
              border: "1px solid rgba(0,242,234,0.2)",
              color: "rgba(0,242,234,0.8)",
            }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full"
              style={{
                backgroundColor: "#00F2EA",
                boxShadow: "0 0 6px #00F2EA",
                animation: "pulse-glow 2s ease-in-out infinite",
              }}
            />
            LIVE
          </div>
          {time && (
            <span className="text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>
              {time}
            </span>
          )}
        </div>
      </div>
    </header>
  );
}
