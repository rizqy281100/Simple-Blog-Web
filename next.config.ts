import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.pexels.com",
      },
      {
        protocol: "https",
        hostname: "picsum.photos",
      },
      {
        protocol: "https",
        hostname: "via.placeholder.com",
      },
      {
        protocol: "https",
        hostname: "**.com",
      },
      {
        protocol: "https",
        hostname: "**.org",
      },
      {
        protocol: "https",
        hostname: "**.net",
      },
    ],
    unoptimized: false,
  },
};

export default nextConfig;
