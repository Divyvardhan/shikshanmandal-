"use client";

export function markerRevealProgress(scrollProgress: number) {
  return Math.min(1, Math.max(0, (scrollProgress - 0.58) / 0.36));
}
