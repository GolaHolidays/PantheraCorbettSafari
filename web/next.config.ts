import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  // Extend Turbopack's filesystem root to the workspace root so it can
  // follow the web/data_source → ../data_source symlink without error.
  turbopack: {
    root: path.resolve(__dirname, ".."),
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;
