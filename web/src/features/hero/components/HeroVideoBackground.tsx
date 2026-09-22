"use client";

/**
 * HeroVideoBackground — Premium directional overlay system
 *
 * Design philosophy (informed by Singita, andBeyond, National Geographic):
 *
 *  OVERLAY STRATEGY — 3-layer system, not a single dark blanket:
 *   Layer 1 (horizontal): bg-gradient-to-r — Ink at 85% on the LEFT where text
 *     lives, fades to fully transparent at ~50% across. Right half of video is
 *     completely unobscured, letting the wildlife footage breathe.
 *   Layer 2 (bottom anchor): thin bg-gradient-to-t from Ink/70 to transparent
 *     — grounds the composition, adds cinematic letterbox feel at the base.
 *   Layer 3 (edge vignette): very subtle radial darkening at the extreme corners
 *     only — no center darkening that kills the video mid-frame.
 *
 *  VIDEO BRIGHTNESS: No CSS filter on the <video> element. Let the footage
 *    speak. Any darkening is handled exclusively through the overlay layers above.
 *
 *  TECHNICAL:
 *   - autoPlay + muted + loop + playsInline (Safari requires both for autoplay)
 *   - poster = existing hero image: zero-flash fallback while webm loads
 *   - preload="auto": hero is above fold, worth the bandwidth for instant play
 *   - will-change: transform on Ken-Burns animation for GPU compositing
 */

import React, { useRef, useEffect } from "react";

export const HeroVideoBackground: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.play().catch(() => {
      /* Silently swallow — poster image covers any autoplay failure */
    });
  }, []);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      {/* ── Full-bleed cinematic clip ────────────────────────────────────── */}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover hero-video-scale"
        src="/hero_clip/panthera-corbett-safari_OHSLtYWq.webm"
        poster="/image/photo-1561731216-c3a4d99437d5.jpg"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-hidden="true"
      />

      {/*
       * ── Layer 1: Horizontal left-to-right gradient ───────────────────────
       * Dark Ink zone on left (where text content lives) →
       * transparent on right (video breathes completely)
       * The gradient stops are tuned so text zone = ~42% of viewport width.
       */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to right, rgba(23,33,26,0.92) 0%, rgba(23,33,26,0.78) 25%, rgba(23,33,26,0.40) 45%, rgba(23,33,26,0.08) 62%, transparent 75%)",
        }}
      />

      {/*
       * ── Layer 2: Bottom anchor gradient ─────────────────────────────────
       * Thin letterbox-style darkening at the very bottom.
       * Grounds the CTA buttons and prevents them floating on bright frames.
       */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to top, rgba(23,33,26,0.80) 0%, rgba(23,33,26,0.30) 18%, transparent 38%)",
        }}
      />

      {/*
       * ── Layer 3: Corner-only vignette ───────────────────────────────────
       * Darkens the 4 edges/corners only — no center darkening.
       * Creates the impression that the wildlife is lit from within.
       */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 90% 85% at 65% 50%, transparent 40%, rgba(23,33,26,0.30) 100%)",
        }}
      />
    </div>
  );
};
