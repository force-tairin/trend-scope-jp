import type { Metadata, Viewport } from "next";
import { Noto_Sans_JP } from "next/font/google";
import { delaGothic, dotGothic } from "@/lib/fonts";
import "./globals.css";

const notoSansJP = Noto_Sans_JP({
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "TrendScope JP | SNSトレンドランキング",
  description: "YouTube・X・TikTok・Instagramの日本トレンドワードをリアルタイムで確認",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "TrendScope JP",
  },
  openGraph: {
    title: "TrendScope JP",
    description: "SNSトレンドランキング - 日本版",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#08080f",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <head>
        <link rel="apple-touch-icon" href="/icons/icon-192.png" />
      </head>
      <body
        className={`${notoSansJP.className} ${delaGothic.variable} ${dotGothic.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
