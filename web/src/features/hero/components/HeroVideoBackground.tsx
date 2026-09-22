"use client";

/**
 * HeroVideoBackground — Mobile-first responsive overlay system
 *
 * MOBILE OVERLAY (default):
 *   Single bottom-to-top gradient: dark only at the bottom 45% where text
 *   lives, fully transparent from ~60% up so the footage breathes at the top.
 *   This is the correct pattern for portrait viewports — text at bottom,
 *   wildlife at top.
 *
 * DESKTOP OVERLAY (sm+):
 *   Horizontal left-to-right gradient: dark on the left (text zone),
 *   fully transparent on the right (video zone). Plus a thin bottom anchor
 *   and a corner-only vignette for cinematic depth.
 *
 * VIDEO: No CSS transforms. Plays at native 1:1 scale. No zoom.
 */

import React, { useRef, useEffect, useState } from "react";

export const HeroVideoBackground: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const video = videoRef.current;
    if (!video) return;
    video.play().catch(() => {
      /* Silently swallow — poster image covers any autoplay failure */
    });
  }, [mounted]);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden" suppressHydrationWarning>
      {/* ── High-resolution poster fallback for SSR & initial paint ── */}
      <img
        src="/image/photo-1561731216-c3a4d99437d5.jpg"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* ── Full-bleed cinematic clip (rendered post-mount to avoid extension hydration conflicts) ── */}
      {/*
       * Multi-format sources for maximum cross-browser support:
       *   1. .webm — Chrome, Firefox, Edge (smaller file, faster load)
       *   2. .mp4  — Safari, iOS, all other browsers
       * Browser picks the first format it supports and stops.
       */}
      {mounted && (
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover"
          poster="/image/photo-1561731216-c3a4d99437d5.jpg"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden="true"
        >
          <source src="/hero_clip/panthera_corbett_safari.webm" type="video/webm" />
          <source src="/hero_clip/panthera-corbett-safari.mp4" type="video/mp4" />
        </video>
      )}

      {/*
       * ── MOBILE: Bottom-to-top gradient ───────────────────────────────
       * Dark at base (text zone) → transparent at top (video zone).
       * Portrait screen: user sees wildlife at the top, reads text below.
       * Hidden on sm+ screens.
       */}
      <div
        className="absolute inset-0 sm:hidden"
        style={{
          background:
            "linear-gradient(to top, rgba(23,33,26,0.97) 0%, rgba(23,33,26,0.88) 25%, rgba(23,33,26,0.45) 48%, rgba(23,33,26,0.10) 65%, transparent 80%)",
        }}
      />

      {/*
       * ── DESKTOP: Horizontal left-to-right gradient ────────────────────
       * Dark on left (text zone) → transparent on right (video zone).
       * Landscape screen: wildlife visible on the right 55% of viewport.
       * Hidden on mobile.
       */}
      <div
        className="absolute inset-0 hidden sm:block"
        style={{
          background:
            "linear-gradient(to right, rgba(23,33,26,0.92) 0%, rgba(23,33,26,0.78) 25%, rgba(23,33,26,0.38) 45%, rgba(23,33,26,0.06) 62%, transparent 75%)",
        }}
      />

      {/*
       * ── DESKTOP: Bottom anchor ────────────────────────────────────────
       * Thin darkening at the base — grounds the composition.
       */}
      <div
        className="absolute inset-0 hidden sm:block"
        style={{
          background:
            "linear-gradient(to top, rgba(23,33,26,0.75) 0%, rgba(23,33,26,0.25) 16%, transparent 35%)",
        }}
      />

      {/*
       * ── DESKTOP: Corner vignette ──────────────────────────────────────
       * Darkens 4 corners only. No center darkening.
       */}
      <div
        className="absolute inset-0 hidden sm:block"
        style={{
          background:
            "radial-gradient(ellipse 88% 85% at 65% 50%, transparent 38%, rgba(23,33,26,0.28) 100%)",
        }}
      />
    </div>
  );
};
