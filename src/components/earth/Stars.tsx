"use client";

import { Stars as DreiStars } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

export function PremiumStars({ compact }: { compact: boolean }) {
  return (
    <>
      <DreiStars radius={24} depth={30} count={compact ? 520 : 1550} factor={compact ? 1.18 : 1.7} saturation={0.12} fade speed={0.08} />
      <GlowingStarField compact={compact} />
    </>
  );
}

function GlowingStarField({ compact }: { compact: boolean }) {
  const pointsRef = useRef<THREE.Points>(null);
  const haloRef = useRef<THREE.Points>(null);
  const starCount = compact ? 180 : 460;

  const { positions, colors, sizes } = useMemo(() => {
    const positions = new Float32Array(starCount * 3);
    const colors = new Float32Array(starCount * 3);
    const sizes = new Float32Array(starCount);
    const warm = new THREE.Color("#f8dfaa");
    const cool = new THREE.Color("#9cc8ff");
    const white = new THREE.Color("#fff9ed");

    for (let i = 0; i < starCount; i += 1) {
      const angle = Math.random() * Math.PI * 2;
      const radius = THREE.MathUtils.lerp(8.2, 18.5, Math.pow(Math.random(), 0.42));
      const band = Math.sin(angle * 2.1 + i * 0.017) * 0.55;
      const y = THREE.MathUtils.lerp(-5.6, 6.2, Math.random()) * 0.82 + band;

      positions[i * 3] = Math.cos(angle) * radius;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = Math.sin(angle) * radius - 3.2;

      const mix = Math.random();
      const color = mix > 0.72 ? warm : mix > 0.42 ? white : cool;
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;

      sizes[i] = THREE.MathUtils.lerp(compact ? 0.018 : 0.022, compact ? 0.058 : 0.076, Math.random());
    }

    return { positions, colors, sizes };
  }, [compact, starCount]);

  useFrame(({ clock }) => {
    const time = clock.elapsedTime;
    if (pointsRef.current) {
      pointsRef.current.rotation.y = time * 0.006;
      pointsRef.current.rotation.z = Math.sin(time * 0.08) * 0.012;
      const material = pointsRef.current.material as THREE.PointsMaterial;
      material.opacity = compact ? 0.72 : 0.82 + Math.sin(time * 0.75) * 0.08;
    }
    if (haloRef.current) {
      haloRef.current.rotation.y = time * 0.004;
      const material = haloRef.current.material as THREE.PointsMaterial;
      material.opacity = compact ? 0.18 : 0.24 + Math.sin(time * 0.5) * 0.04;
    }
  });

  return (
    <>
      <points ref={haloRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions.slice(), 3]} />
          <bufferAttribute attach="attributes-color" args={[colors, 3]} />
          <bufferAttribute attach="attributes-size" args={[sizes, 1]} />
        </bufferGeometry>
        <pointsMaterial size={compact ? 0.095 : 0.13} vertexColors transparent opacity={0.22} depthWrite={false} blending={THREE.AdditiveBlending} />
      </points>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
          <bufferAttribute attach="attributes-color" args={[colors, 3]} />
          <bufferAttribute attach="attributes-size" args={[sizes, 1]} />
        </bufferGeometry>
        <pointsMaterial size={compact ? 0.036 : 0.052} vertexColors transparent opacity={0.82} depthWrite={false} blending={THREE.AdditiveBlending} />
      </points>
    </>
  );
}
