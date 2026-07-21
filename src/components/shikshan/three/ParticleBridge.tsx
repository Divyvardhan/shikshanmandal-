"use client";

import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

const MARKER_TARGETS = [
  [-1.45, 1.9, -1.6],
  [-0.74, 2.16, -1.75],
  [0.42, 1.72, -1.86],
  [1.22, 2.03, -1.74],
  [1.82, 1.63, -1.7],
] as const;

export function ParticleBridge({ scrollProgress }: { scrollProgress: number }) {
  const pointsRef = useRef<THREE.Points<THREE.BufferGeometry, THREE.PointsMaterial>>(null);
  const particleCount = 420;
  const { base, targets, colors } = useMemo(() => {
    const basePositions = new Float32Array(particleCount * 3);
    const targetPositions = new Float32Array(particleCount * 3);
    const colorArray = new Float32Array(particleCount * 3);
    const palette = [new THREE.Color("#f2c56f"), new THREE.Color("#f8f1dd"), new THREE.Color("#6f93b3")];

    for (let i = 0; i < particleCount; i += 1) {
      const flagIndex = i % 5;
      const local = i / particleCount;
      basePositions[i * 3] = -0.8 + flagIndex * 0.72 + Math.sin(i * 13.7) * 0.46;
      basePositions[i * 3 + 1] = 1.4 + Math.cos(i * 5.1) * 0.72 + local * 0.45;
      basePositions[i * 3 + 2] = -0.28 - flagIndex * 0.28 + Math.sin(i * 4.3) * 0.18;

      const target = MARKER_TARGETS[flagIndex];
      targetPositions[i * 3] = target[0] + Math.sin(i * 8.4) * 0.08;
      targetPositions[i * 3 + 1] = target[1] + Math.cos(i * 3.6) * 0.07;
      targetPositions[i * 3 + 2] = target[2] + Math.sin(i * 6.2) * 0.05;

      const color = palette[i % palette.length];
      colorArray[i * 3] = color.r;
      colorArray[i * 3 + 1] = color.g;
      colorArray[i * 3 + 2] = color.b;
    }

    return { base: basePositions, targets: targetPositions, colors: colorArray };
  }, []);

  useFrame(({ clock }) => {
    const points = pointsRef.current;
    if (!points) return;

    const positions = points.geometry.attributes.position.array as Float32Array;
    const t = THREE.MathUtils.smoothstep(scrollProgress, 0.1, 0.95);
    const drift = clock.elapsedTime;

    for (let i = 0; i < particleCount; i += 1) {
      const wobble = Math.sin(drift * 1.8 + i) * 0.025;
      positions[i * 3] = THREE.MathUtils.lerp(base[i * 3], targets[i * 3], t) + wobble;
      positions[i * 3 + 1] = THREE.MathUtils.lerp(base[i * 3 + 1], targets[i * 3 + 1], t) + Math.cos(drift + i * 0.2) * 0.02;
      positions[i * 3 + 2] = THREE.MathUtils.lerp(base[i * 3 + 2], targets[i * 3 + 2], t);
    }

    points.geometry.attributes.position.needsUpdate = true;
    points.material.opacity = THREE.MathUtils.smoothstep(scrollProgress, 0.04, 0.38) * (1 - THREE.MathUtils.smoothstep(scrollProgress, 0.82, 1));
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[base.slice(), 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.035} vertexColors transparent opacity={0} depthWrite={false} blending={THREE.AdditiveBlending} />
    </points>
  );
}
