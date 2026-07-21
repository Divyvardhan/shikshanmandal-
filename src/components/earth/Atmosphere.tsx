"use client";

import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

export function Atmosphere({ scrollProgress, compact }: { scrollProgress: number; compact: boolean }) {
  const materialRef = useRef<THREE.MeshBasicMaterial>(null);

  useFrame(() => {
    if (materialRef.current) {
      materialRef.current.opacity = THREE.MathUtils.lerp(0.08, 0.22, THREE.MathUtils.smoothstep(scrollProgress, 0.08, 0.62));
    }
  });

  return (
    <mesh>
      <sphereGeometry args={[2.54, compact ? 72 : 128, compact ? 72 : 128]} />
      <meshBasicMaterial ref={materialRef} color="#8fc8ff" transparent opacity={0.08} side={THREE.BackSide} />
    </mesh>
  );
}
