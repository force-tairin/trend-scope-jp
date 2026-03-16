import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow fetching from external domains in API routes
  async headers() {
    return [
      {
        source: "/api/:path*",
        headers: [
          { key: "Cache-Control", value: "s-maxage=3600, stale-while-revalidate=600" },
        ],
      },
    ];
  },
};

export default nextConfig;
