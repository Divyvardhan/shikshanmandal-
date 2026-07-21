"use client";

import { OrbitControls } from "@react-three/drei";

export function EarthControls({ onInteraction, focusActive }: { onInteraction: () => void; focusActive: boolean }) {
  return (
    <OrbitControls
      enableZoom
      enablePan={false}
      autoRotate={!focusActive}
      autoRotateSpeed={0.18}
      minDistance={5.6}
      maxDistance={10.5}
      minPolarAngle={1.1}
      maxPolarAngle={2.1}
      onStart={onInteraction}
      onEnd={onInteraction}
    />
  );
}
