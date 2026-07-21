"use client";

import { Stars as DreiStars } from "@react-three/drei";

export function PremiumStars({ compact }: { compact: boolean }) {
  return <DreiStars radius={24} depth={30} count={compact ? 420 : 1250} factor={compact ? 1.1 : 1.45} fade speed={0.08} />;
}
