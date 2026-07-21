"use client";

import { useFrame } from "@react-three/fiber";
import { useLayoutEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { createFabricNormalTexture, createFlagTexture, FlagCountry } from "./flagTextures";

type FlagConfig = {
  country: FlagCountry;
  label: string;
  position: [number, number, number];
  width: number;
  height: number;
  poleHeight: number;
  amplitude: number;
  frequency: number;
  phase: number;
};

const FLAGS: FlagConfig[] = [
  { country: "uk", label: "United Kingdom", position: [-2.55, 0.0, 0.14], width: 1.34, height: 0.84, poleHeight: 2.64, amplitude: 0.07, frequency: 1.18, phase: 0 },
  { country: "india", label: "India", position: [-1.28, 0.1, 0.04], width: 1.4, height: 0.88, poleHeight: 2.88, amplitude: 0.068, frequency: 1.26, phase: 1.7 },
  { country: "canada", label: "Canada", position: [-0.02, 0.19, -0.04], width: 1.42, height: 0.9, poleHeight: 3.08, amplitude: 0.07, frequency: 1.04, phase: 0.9 },
  { country: "usa", label: "United States", position: [1.26, 0.29, -0.12], width: 1.52, height: 0.94, poleHeight: 3.28, amplitude: 0.066, frequency: 0.94, phase: 2.6 },
  { country: "south-africa", label: "South Africa", position: [2.66, 0.37, -0.18], width: 1.58, height: 0.98, poleHeight: 3.44, amplitude: 0.064, frequency: 1.12, phase: 3.2 },
];

function ClothFlag({ config, scrollProgress }: { config: FlagConfig; scrollProgress: number }) {
  const meshRef = useRef<THREE.Mesh<THREE.PlaneGeometry, THREE.MeshStandardMaterial>>(null);
  const materialRef = useRef<THREE.MeshStandardMaterial>(null);
  const texture = useMemo(() => createFlagTexture(config.country), [config.country]);
  const normalMap = useMemo(() => createFabricNormalTexture(), []);
  const basePositions = useRef<Float32Array | null>(null);

  useLayoutEffect(() => {
    const geometry = meshRef.current?.geometry;
    if (!geometry) return;
    basePositions.current = new Float32Array(geometry.attributes.position.array as Float32Array);
  }, []);

  useFrame(({ clock }) => {
    const mesh = meshRef.current;
    const base = basePositions.current;
    if (!mesh || !base) return;

    const time = Math.max(0, clock.elapsedTime - 2.05);
    const awake = Math.min(1, time / 0.75);
    const dissolve = THREE.MathUtils.smoothstep(scrollProgress, 0.08, 0.82);
    const windStrength = 1 - THREE.MathUtils.smoothstep(scrollProgress, 0.05, 0.58) * 0.88;
    const positions = mesh.geometry.attributes.position.array as Float32Array;

    for (let i = 0; i < positions.length; i += 3) {
      const x = base[i];
      const y = base[i + 1];
      const pinned = THREE.MathUtils.smoothstep((x + config.width / 2) / config.width, 0.0, 0.2);
      const edge = THREE.MathUtils.smoothstep(Math.abs(y) / (config.height / 2), 0.54, 1);
      const wave =
        Math.sin(time * config.frequency * 2.2 + x * 4.2 + config.phase) * config.amplitude +
        Math.sin(time * (config.frequency + 0.38) * 3.1 + x * 7.4 + y * 2.1) * config.amplitude * 0.3 * edge;

      positions[i + 2] = base[i + 2] + wave * pinned * awake * windStrength * (1 - dissolve * 0.55);
      positions[i + 1] = base[i + 1] + Math.sin(time * 1.5 + x * 2.2 + config.phase) * 0.035 * pinned * awake * windStrength;
    }

    mesh.geometry.attributes.position.needsUpdate = true;
    mesh.geometry.computeVertexNormals();

    if (materialRef.current) {
      materialRef.current.opacity = 1 - dissolve * 0.96;
      materialRef.current.normalScale.setScalar(0.22 + awake * 0.12);
    }
  });

  return (
    <group position={config.position}>
      <mesh castShadow receiveShadow position={[0, config.poleHeight / 2 - 0.12, -0.02]}>
        <cylinderGeometry args={[0.035, 0.045, config.poleHeight, 32]} />
        <meshPhysicalMaterial color="#d3d6d3" roughness={0.18} metalness={0.86} clearcoat={0.5} />
      </mesh>
      <mesh castShadow position={[0, config.poleHeight - 0.02, -0.02]}>
        <sphereGeometry args={[0.08, 24, 12]} />
        <meshPhysicalMaterial color="#f1d27c" roughness={0.22} metalness={0.75} clearcoat={0.45} />
      </mesh>
      <mesh
        ref={meshRef}
        castShadow
        receiveShadow
        position={[config.width / 2 + 0.02, config.poleHeight - config.height / 2 - 0.2, 0]}
        rotation-y={-0.025}
        aria-label={`${config.label} cloth flag`}
      >
        <planeGeometry args={[config.width, config.height, 58, 28]} />
        <meshStandardMaterial
          ref={materialRef}
          map={texture}
          normalMap={normalMap}
          emissive="#ffffff"
          emissiveIntensity={0.045}
          roughness={0.72}
          metalness={0.01}
          side={THREE.DoubleSide}
          transparent
          alphaTest={0.02}
        />
      </mesh>
      <mesh castShadow position={[config.width * 0.52, config.poleHeight - 0.24, 0.014]} scale={[config.width, 0.018, 0.012]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="#efe1bf" roughness={0.86} />
      </mesh>
      <mesh castShadow position={[config.width * 0.52, config.poleHeight - config.height - 0.24, 0.014]} scale={[config.width, 0.014, 0.012]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="#ddcfad" roughness={0.86} />
      </mesh>
    </group>
  );
}

export function FlagField({ scrollProgress }: { scrollProgress: number }) {
  return (
    <group rotation-y={0.015} rotation-x={0.005} scale={1.24} position={[-0.28, -1.06, 0]}>
      {FLAGS.map((flag) => (
        <ClothFlag key={flag.country} config={flag} scrollProgress={scrollProgress} />
      ))}
    </group>
  );
}
