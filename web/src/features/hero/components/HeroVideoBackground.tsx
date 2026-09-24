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

import React, { useRef, useEffect, useSyncExternalStore } from "react";
import Image from "next/image";

const subscribe = () => () => {};

export const HeroVideoBackground: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const mounted = useSyncExternalStore(
    subscribe,
    () => true,
    () => false
  );

  useEffect(() => {
    if (!mounted) return;
    const video = videoRef.current;
    if (!video) return;
    video.muted = true;
    video.defaultMuted = true;
    video.play().catch(() => {
      /* Silently swallow — poster image covers any autoplay failure */
    });
  }, [mounted]);

  return (
    <div className="relative w-full aspect-video sm:aspect-auto sm:absolute sm:inset-0 sm:h-full z-0 overflow-hidden" suppressHydrationWarning>
      {/* ── High-resolution poster fallback for SSR & initial paint ── */}
      <Image
        src="/hero_clip/hero_poster.jpg"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
        aria-hidden="true"
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
          className="absolute inset-0 w-full h-full object-cover object-center"
          poster="/hero_clip/hero_poster.jpg"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          tabIndex={-1}
          aria-hidden="true"
        >
          <source src="/hero_clip/panthera_corbett_safari.webm?v=3" type="video/webm" />
          <source src="/hero_clip/panthera-corbett-safari.mp4?v=3" type="video/mp4" />
        </video>
      )}

      {/*
       * ── MOBILE: Seamless multi-step bottom fade into dark section ─────
       * Uses 112px height + bottom-[-2px] subpixel overlap to completely
       * eliminate any video edge artifacts or hard cut lines.
       */}
      <div
        className="absolute -bottom-1 inset-x-0 h-28 sm:hidden pointer-events-none"
        style={{
          background:
            "linear-gradient(to top, #17211A 0%, rgba(23,33,26,0.98) 35%, rgba(23,33,26,0.65) 65%, transparent 100%)",
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
