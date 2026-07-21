"use client";

import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { countryMarkers } from "./config/countries";
import { latLonToVector3 } from "./utilities/geo";

export function ParticleSystem({ scrollProgress, compact }: { scrollProgress: number; compact: boolean }) {
  const pointsRef = useRef<THREE.Points<THREE.BufferGeometry, THREE.PointsMaterial>>(null);
  const particleCount = compact ? 220 : 520;
  const markerPositions = useMemo(() => countryMarkers.map((marker) => latLonToVector3(marker.latitude, marker.longitude, 2.5)), []);
  const { base, targets, colors } = useMemo(() => {
    const basePositions = new Float32Array(particleCount * 3);
    const targetPositions = new Float32Array(particleCount * 3);
    const colorArray = new Float32Array(particleCount * 3);
    const gold = new THREE.Color("#f4c96a");
    const cream = new THREE.Color("#fff1cf");
    const blue = new THREE.Color("#7aa6c8");

    for (let i = 0; i < particleCount; i += 1) {
      const markerIndex = i % markerPositions.length;
      const target = markerPositions[markerIndex];
      const orbit = i / particleCount;
      basePositions[i * 3] = -3.8 + markerIndex * 1.6 + Math.sin(i * 9.7) * 0.7;
      basePositions[i * 3 + 1] = 2.8 + Math.cos(i * 6.1) * 0.82 + orbit * 0.8;
      basePositions[i * 3 + 2] = -1.4 + Math.sin(i * 3.4) * 0.55;
      targetPositions[i * 3] = target.x + Math.sin(i) * 0.045;
      targetPositions[i * 3 + 1] = target.y + Math.cos(i * 0.8) * 0.045;
      targetPositions[i * 3 + 2] = target.z + Math.sin(i * 0.6) * 0.045;

      const color = i % 5 === 0 ? blue : i % 3 === 0 ? cream : gold;
      colorArray[i * 3] = color.r;
      colorArray[i * 3 + 1] = color.g;
      colorArray[i * 3 + 2] = color.b;
    }

    return { base: basePositions, targets: targetPositions, colors: colorArray };
  }, [markerPositions]);

  useFrame(({ clock }) => {
    const points = pointsRef.current;
    if (!points) return;

    const positions = points.geometry.attributes.position.array as Float32Array;
    const travel = THREE.MathUtils.smoothstep(scrollProgress, 0.2, 0.78);
    const settle = THREE.MathUtils.smoothstep(scrollProgress, 0.68, 0.96);
    const time = clock.elapsedTime;

    for (let i = 0; i < particleCount; i += 1) {
      const swirl = (1 - settle) * Math.sin(time * 1.2 + i * 0.17) * 0.08;
      positions[i * 3] = THREE.MathUtils.lerp(base[i * 3], targets[i * 3], travel) + swirl;
      positions[i * 3 + 1] = THREE.MathUtils.lerp(base[i * 3 + 1], targets[i * 3 + 1], travel) + Math.cos(time + i) * 0.025 * (1 - settle);
      positions[i * 3 + 2] = THREE.MathUtils.lerp(base[i * 3 + 2], targets[i * 3 + 2], travel);
    }

    points.geometry.attributes.position.needsUpdate = true;
    points.material.opacity = THREE.MathUtils.smoothstep(scrollProgress, 0.12, 0.36) * (1 - settle * 0.82) * 0.58;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[base.slice(), 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial size={compact ? 0.022 : 0.018} vertexColors transparent opacity={0} depthWrite={false} blending={THREE.AdditiveBlending} />
    </points>
  );
}
