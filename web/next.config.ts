import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  // ─── Pure Static Export ──────────────────────────────────────────────────
  // Outputs plain HTML/CSS/JS to the `out/` directory.
  // No Node.js server needed — deploy to Nginx, Cloudflare Pages, GitHub Pages, etc.
  output: "export",

  // ─── Turbopack root ──────────────────────────────────────────────────────
  // Extends Turbopack's filesystem boundary to the workspace root so it can
  // follow the web/data_source → ../data_source symlink.
  turbopack: {
    root: path.resolve(__dirname, ".."),
  },

  // ─── Image handling ──────────────────────────────────────────────────────
  // Static export cannot run server-side image optimization.
  // `unoptimized: true` passes all image src values through as-is.
  // Local images in /public are served as-is; Unsplash URLs render directly.
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
