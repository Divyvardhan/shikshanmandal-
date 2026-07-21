"use client";

import { useFrame } from "@react-three/fiber";
import { ReactNode } from "react";
import { useRef } from "react";
import * as THREE from "three";
import { Atmosphere } from "./Atmosphere";
import { CloudLayer } from "./CloudLayer";
import { OceanLayer } from "./OceanLayer";

export function EarthModel({
  scrollProgress,
  children,
  onEarthClick,
  compact,
}: {
  scrollProgress: number;
  interactionActive: boolean;
  children?: ReactNode;
  onEarthClick?: () => void;
  compact: boolean;
}) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(() => {
    const reveal = THREE.MathUtils.smoothstep(scrollProgress, 0.08, 0.62);

    if (groupRef.current) {
      groupRef.current.position.y = THREE.MathUtils.lerp(0.66, 0.02, reveal);
      groupRef.current.rotation.x = THREE.MathUtils.lerp(0.24, 0.075, reveal);
      groupRef.current.scale.setScalar(THREE.MathUtils.lerp(0.78, 0.96, reveal));
    }
  });

  return (
    <group
      ref={groupRef}
      rotation={[0.08, 0, -0.1]}
      onClick={(event) => {
        event.stopPropagation();
        onEarthClick?.();
      }}
    >
      <mesh>
        <sphereGeometry args={[2.28, compact ? 96 : 160, compact ? 96 : 160]} />
        <OceanLayer />
      </mesh>
      <CloudLayer compact={compact} />
      <Atmosphere scrollProgress={scrollProgress} compact={compact} />
      {children}
    </group>
  );
}
