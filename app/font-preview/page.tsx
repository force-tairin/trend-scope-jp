import {
  Dela_Gothic_One,
  DotGothic16,
  Rampart_One,
  Hachi_Maru_Pop,
  Zen_Dots,
} from "next/font/google";

const delaGothic = Dela_Gothic_One({ subsets: ["latin"], weight: "400" });
const dotGothic = DotGothic16({ subsets: ["latin"], weight: "400" });
const rampartOne = Rampart_One({ subsets: ["latin"], weight: "400" });
const hachiMaruPop = Hachi_Maru_Pop({ subsets: ["latin"], weight: "400" });
const zenDots = Zen_Dots({ subsets: ["latin"], weight: "400" });

const SAMPLES = [
  { rank: 1, word: "ホロライブ", count: 42 },
  { rank: 2, word: "WBC日本代表", count: 38 },
  { rank: 3, word: "#春アニメ2026", count: 29 },
  { rank: 4, word: "新型iPhone", count: 21 },
  { rank: 5, word: "大谷翔平", count: 18 },
];

const NEWS_SAMPLES = [
  { rank: 1, title: "日米外相が電話会談　ホルムズ海峡の安全へ外交努力", source: "NHK", time: "32分前" },
  { rank: 2, title: "アップル、第2世代AirPods Max発表　549ドルで販売", source: "Investing.com", time: "1時間前" },
  { rank: 3, title: "「魔女の宅急便」IMAX版、全米興収トップ10入り", source: "映画.com", time: "2時間前" },
];

const FONTS = [
  {
    id: "A",
    name: "Dela Gothic One",
    label: "A — デラゴシック",
    desc: "ストリート系・太くてモダン。SNS・都市感覚のフォント",
    tag: "おすすめ",
    tagColor: "#FF0050",
    font: delaGothic,
    accentGlow: "#FF0050",
  },
  {
    id: "B",
    name: "DotGothic16",
    label: "B — ドットゴシック",
    desc: "ピクセル/レトロデジタル。サイバー・ゲームっぽいポップ感",
    tag: "テック系",
    tagColor: "#00F2EA",
    font: dotGothic,
    accentGlow: "#00F2EA",
  },
  {
    id: "C",
    name: "Rampart One",
    label: "C — ランパート",
    desc: "3D立体感のある文字。インパクト大でユニーク",
    tag: "個性的",
    tagColor: "#F59E0B",
    font: rampartOne,
    accentGlow: "#F59E0B",
  },
  {
    id: "D",
    name: "Hachi Maru Pop",
    label: "D — ハチマルポップ",
    desc: "丸くてかわいい。明るくポップで親しみやすい",
    tag: "かわいい系",
    tagColor: "#EC4899",
    font: hachiMaruPop,
    accentGlow: "#EC4899",
  },
  {
    id: "E",
    name: "Zen Dots",
    label: "E — ゼンドッツ",
    desc: "近未来・SF感のあるドット系。スタイリッシュ",
    tag: "フューチャー",
    tagColor: "#818CF8",
    font: zenDots,
    accentGlow: "#818CF8",
  },
];

export default function FontPreview() {
  return (
    <div
      style={{
        background: "radial-gradient(ellipse 80% 50% at 50% -10%, rgba(120,40,200,0.15), transparent), #08080f",
        minHeight: "100vh",
        padding: "2rem 1rem 4rem",
      }}
    >
      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
        <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.8rem", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "0.5rem" }}>
          Font Candidates
        </p>
        <h1 style={{
          fontSize: "clamp(1.8rem, 4vw, 3rem)",
          fontWeight: 900,
          background: "linear-gradient(135deg, #FF6B6B, #833AB4, #1DA1F2)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          marginBottom: "0.5rem",
        }}>
          フォント候補 A〜E
        </h1>
        <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.9rem" }}>
          トレンドワードとニュース見出しの表示サンプルです。気に入ったものを選んでください。
        </p>
      </div>

      {/* Font options */}
      <div style={{ maxWidth: "900px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "2.5rem" }}>
        {FONTS.map((f) => (
          <div
            key={f.id}
            style={{
              background: "rgba(255,255,255,0.03)",
              border: `1px solid ${f.accentGlow}30`,
              borderRadius: "1.25rem",
              overflow: "hidden",
              boxShadow: `0 0 40px ${f.accentGlow}12`,
            }}
          >
            {/* Font header */}
            <div style={{
              padding: "1rem 1.5rem",
              background: `linear-gradient(135deg, ${f.accentGlow}15, transparent)`,
              borderBottom: `1px solid ${f.accentGlow}20`,
              display: "flex",
              alignItems: "center",
              gap: "1rem",
              flexWrap: "wrap",
            }}>
              <div
                style={{
                  width: "2.5rem",
                  height: "2.5rem",
                  borderRadius: "0.75rem",
                  background: `linear-gradient(135deg, ${f.accentGlow}, ${f.accentGlow}80)`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "1.1rem",
                  fontWeight: 900,
                  color: "#fff",
                  boxShadow: `0 0 16px ${f.accentGlow}60`,
                }}
              >
                {f.id}
              </div>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <span style={{ color: "#fff", fontWeight: 700, fontSize: "1rem" }}>{f.label}</span>
                  <span style={{
                    fontSize: "0.65rem",
                    padding: "0.15rem 0.5rem",
                    borderRadius: "9999px",
                    background: `${f.accentGlow}22`,
                    color: f.accentGlow,
                    border: `1px solid ${f.accentGlow}40`,
                    fontWeight: 600,
                  }}>
                    {f.tag}
                  </span>
                </div>
                <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.8rem", marginTop: "0.1rem" }}>{f.desc}</p>
              </div>
            </div>

            <div style={{ padding: "1.25rem", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
              {/* Trend word sample */}
              <div>
                <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.7rem", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "0.6rem" }}>
                  SNS トレンドワード
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
                  {SAMPLES.map((s) => (
                    <div
                      key={s.rank}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.6rem",
                        background: "rgba(255,255,255,0.04)",
                        borderRadius: "0.6rem",
                        padding: "0.45rem 0.75rem",
                        border: "1px solid rgba(255,255,255,0.06)",
                      }}
                    >
                      <span style={{
                        fontSize: "0.8rem",
                        fontWeight: 900,
                        width: "1.2rem",
                        textAlign: "center",
                        color: s.rank <= 3
                          ? ["#FFD700","#C0C0C0","#CD7F32"][s.rank-1]
                          : "rgba(255,255,255,0.25)",
                      }}>
                        {s.rank}
                      </span>
                      <span
                        className={f.font.className}
                        style={{
                          fontSize: "0.95rem",
                          color: "rgba(255,255,255,0.9)",
                          flex: 1,
                        }}
                      >
                        {s.word}
                      </span>
                      <span style={{
                        fontSize: "0.65rem",
                        padding: "0.1rem 0.4rem",
                        borderRadius: "9999px",
                        background: `${f.accentGlow}20`,
                        color: f.accentGlow,
                        border: `1px solid ${f.accentGlow}35`,
                      }}>
                        {s.count}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* News sample */}
              <div>
                <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.7rem", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "0.6rem" }}>
                  ニュース見出し
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
                  {NEWS_SAMPLES.map((n) => (
                    <div
                      key={n.rank}
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: "0.6rem",
                        background: "rgba(255,255,255,0.04)",
                        borderRadius: "0.6rem",
                        padding: "0.5rem 0.75rem",
                        border: "1px solid rgba(255,255,255,0.06)",
                      }}
                    >
                      <span style={{
                        fontSize: "0.75rem",
                        fontWeight: 900,
                        width: "1rem",
                        color: n.rank <= 3
                          ? ["#FFD700","#C0C0C0","#CD7F32"][n.rank-1]
                          : "rgba(255,255,255,0.25)",
                        marginTop: "0.1rem",
                        flexShrink: 0,
                      }}>
                        {n.rank}
                      </span>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <p
                          className={f.font.className}
                          style={{
                            fontSize: "0.82rem",
                            color: "rgba(255,255,255,0.88)",
                            lineHeight: 1.45,
                            overflow: "hidden",
                            display: "-webkit-box",
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: "vertical",
                          } as React.CSSProperties}
                        >
                          {n.title}
                        </p>
                        <div style={{ display: "flex", gap: "0.4rem", marginTop: "0.3rem" }}>
                          <span style={{
                            fontSize: "0.6rem",
                            padding: "0.1rem 0.35rem",
                            borderRadius: "0.25rem",
                            background: `${f.accentGlow}18`,
                            color: f.accentGlow,
                          }}>
                            {n.source}
                          </span>
                          <span style={{ fontSize: "0.6rem", color: "rgba(255,255,255,0.3)" }}>{n.time}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <p style={{ textAlign: "center", marginTop: "2.5rem", color: "rgba(255,255,255,0.25)", fontSize: "0.8rem" }}>
        A〜E の中から選んで教えてください。複数組み合わせも可能です。
      </p>
    </div>
  );
}
