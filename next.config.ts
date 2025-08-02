import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "limitless-ant-955.convex.cloud",
      },
    ],
  },
};

export default nextConfig;
