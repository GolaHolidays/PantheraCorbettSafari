import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // ─── Pure Static Export ──────────────────────────────────────────────────
  // Outputs plain HTML/CSS/JS to the `out/` directory.
  // No Node.js server needed — deploy to Nginx, Cloudflare Pages, GitHub Pages, etc.
  output: "export",


  // ─── Image handling ──────────────────────────────────────────────────────
  // Static export cannot run server-side image optimization.
  // `unoptimized: true` passes all image src values through as-is.
  // Local images in /public are served as-is; Unsplash URLs render directly.
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
