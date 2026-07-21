"use client";

import { useFrame, useThree } from "@react-three/fiber";
import { useLayoutEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { createFabricNormalTexture, createFlagTexture, FlagCountry } from "./flagTextures";

type HeroFlagConfig = {
  country: FlagCountry;
  left: number;
  top: number;
  width: number;
  height: number;
  amplitude: number;
  frequency: number;
  phase: number;
  tilt?: number;
};

const HERO_FLAGS: HeroFlagConfig[] = [
  { country: "uk", left: 0.49, top: 0.16, width: 0.095, height: 0.082, amplitude: 0.026, frequency: 1.1, phase: 2.1, tilt: -0.02 },
  { country: "india", left: 0.58, top: 0.11, width: 0.118, height: 0.09, amplitude: 0.028, frequency: 1.18, phase: 2.7, tilt: 0.006 },
  { country: "canada", left: 0.68, top: 0.09, width: 0.095, height: 0.086, amplitude: 0.026, frequency: 1.08, phase: 0.6, tilt: -0.008 },
  { country: "usa", left: 0.77, top: 0.055, width: 0.125, height: 0.098, amplitude: 0.027, frequency: 1.0, phase: 1.4, tilt: -0.012 },
  { country: "south-africa", left: 0.875, top: 0.055, width: 0.13, height: 0.102, amplitude: 0.028, frequency: 1.14, phase: 3.5, tilt: 0.018 },
];

function ClothFlag({ config, scrollProgress }: { config: HeroFlagConfig; scrollProgress: number }) {
  const meshRef = useRef<THREE.Mesh<THREE.PlaneGeometry, THREE.MeshStandardMaterial>>(null);
  const materialRef = useRef<THREE.MeshStandardMaterial>(null);
  const basePositions = useRef<Float32Array | null>(null);
  const texture = useMemo(() => createFlagTexture(config.country), [config.country]);
  const normalMap = useMemo(() => createFabricNormalTexture(), []);
  const { viewport } = useThree();

  useLayoutEffect(() => {
    const geometry = meshRef.current?.geometry;
    if (!geometry) return;
    basePositions.current = new Float32Array(geometry.attributes.position.array as Float32Array);
  }, []);

  useFrame(({ clock }) => {
    const mesh = meshRef.current;
    const base = basePositions.current;
    if (!mesh || !base) return;

    const time = clock.elapsedTime;
    const positions = mesh.geometry.attributes.position.array as Float32Array;
    const flagWidth = config.width * viewport.width;
    const flagHeight = config.height * viewport.height;
    const dissolve = THREE.MathUtils.smoothstep(scrollProgress, 0.18, 0.86);
    const wind = THREE.MathUtils.lerp(1, 0.18, THREE.MathUtils.smoothstep(scrollProgress, 0.08, 0.72));

    for (let i = 0; i < positions.length; i += 3) {
      const x = base[i];
      const y = base[i + 1];
      const progress = THREE.MathUtils.clamp((x + flagWidth / 2) / flagWidth, 0, 1);
      const pinned = THREE.MathUtils.smoothstep(progress, 0.04, 0.22);
      const edge = THREE.MathUtils.smoothstep(Math.abs(y) / (flagHeight / 2), 0.42, 1);
      const primary = Math.sin(time * config.frequency * 3.25 + progress * 8.3 + config.phase);
      const secondary = Math.sin(time * (config.frequency + 0.42) * 4.1 + progress * 14.2 + y * 0.85);
      const flutter = Math.sin(time * 7.4 + progress * 24 + config.phase) * 0.28 * edge;

      positions[i + 2] = base[i + 2] + (primary + secondary * 0.36 + flutter) * config.amplitude * viewport.width * pinned * wind;
      positions[i + 1] = base[i + 1] + Math.sin(time * 2.2 + progress * 4.5 + config.phase) * config.amplitude * viewport.height * 0.18 * pinned * wind;
    }

    mesh.geometry.attributes.position.needsUpdate = true;
    mesh.geometry.computeVertexNormals();

    if (materialRef.current) {
      materialRef.current.normalScale.setScalar(0.16 + Math.sin(time * 1.2 + config.phase) * 0.015);
      materialRef.current.opacity = THREE.MathUtils.lerp(0.9, 0.04, dissolve);
    }
  });

  const flagWidth = config.width * viewport.width;
  const flagHeight = config.height * viewport.height;
  const x = (config.left - 0.5) * viewport.width + flagWidth / 2;
  const y = (0.5 - config.top) * viewport.height - flagHeight / 2;

  return (
    <mesh ref={meshRef} position={[x, y, 0]} rotation-z={config.tilt ?? 0} renderOrder={4}>
      <planeGeometry args={[flagWidth, flagHeight, 64, 28]} />
      <meshStandardMaterial
        ref={materialRef}
        map={texture}
        normalMap={normalMap}
        roughness={0.78}
        metalness={0.01}
        side={THREE.DoubleSide}
        transparent
        opacity={0.9}
      />
    </mesh>
  );
}

export function HeroClothFlags({ scrollProgress }: { scrollProgress: number }) {
  return (
    <group>
      {HERO_FLAGS.map((flag) => (
        <ClothFlag key={flag.country} config={flag} scrollProgress={scrollProgress} />
      ))}
    </group>
  );
}
