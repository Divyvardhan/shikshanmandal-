"use client";

import * as THREE from "three";

function GlassBlock({
  position,
  scale,
  rotation = 0,
}: {
  position: [number, number, number];
  scale: [number, number, number];
  rotation?: number;
}) {
  return (
    <mesh castShadow receiveShadow position={position} scale={scale} rotation-y={rotation}>
      <boxGeometry args={[1, 1, 1]} />
      <meshPhysicalMaterial
        color="#b7c8cf"
        roughness={0.18}
        metalness={0.02}
        transmission={0.2}
        thickness={0.55}
        transparent
        opacity={0.72}
        clearcoat={0.75}
        clearcoatRoughness={0.2}
      />
    </mesh>
  );
}

function Cypress({ position, scale = 1 }: { position: [number, number, number]; scale?: number }) {
  return (
    <group position={position} scale={scale}>
      <mesh castShadow position={[0, 0.28, 0]}>
        <cylinderGeometry args={[0.035, 0.05, 0.56, 8]} />
        <meshStandardMaterial color="#5d3c24" roughness={0.7} />
      </mesh>
      <mesh castShadow position={[0, 0.82, 0]}>
        <coneGeometry args={[0.2, 0.95, 14]} />
        <meshStandardMaterial color="#1d4b3f" roughness={0.86} />
      </mesh>
    </group>
  );
}

function IntellectualPropertyPanel({
  position,
  rotation = 0,
  scale = 1,
}: {
  position: [number, number, number];
  rotation?: number;
  scale?: number;
}) {
  return (
    <group position={position} rotation-y={rotation} scale={scale}>
      <mesh castShadow receiveShadow>
        <boxGeometry args={[0.72, 0.96, 0.025]} />
        <meshPhysicalMaterial
          color="#eef4f7"
          roughness={0.22}
          metalness={0.04}
          transparent
          opacity={0.76}
          transmission={0.12}
          clearcoat={0.8}
        />
      </mesh>
      {[0.28, 0.13, -0.02, -0.17].map((y, index) => (
        <mesh key={y} position={[index === 0 ? -0.05 : 0, y, 0.019]} scale={[0.43 - index * 0.045, 0.012, 0.006]}>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color={index === 0 ? "#7f2d28" : "#173a55"} roughness={0.42} metalness={0.1} />
        </mesh>
      ))}
      <mesh position={[0.24, -0.33, 0.025]}>
        <torusGeometry args={[0.1, 0.008, 10, 36]} />
        <meshStandardMaterial color="#c9a052" roughness={0.32} metalness={0.62} />
      </mesh>
    </group>
  );
}

function StrategyRing({ position, scale = 1 }: { position: [number, number, number]; scale?: number }) {
  return (
    <group position={position} scale={scale} rotation-x={Math.PI / 2}>
      <mesh castShadow>
        <torusGeometry args={[0.46, 0.012, 16, 96]} />
        <meshStandardMaterial color="#d5b060" roughness={0.28} metalness={0.76} emissive="#4a3310" emissiveIntensity={0.08} />
      </mesh>
      <mesh castShadow>
        <torusGeometry args={[0.28, 0.007, 16, 80]} />
        <meshStandardMaterial color="#e9dcc2" roughness={0.3} metalness={0.46} />
      </mesh>
      <mesh castShadow position={[0, 0, 0.015]}>
        <octahedronGeometry args={[0.08, 0]} />
        <meshStandardMaterial color="#173a55" roughness={0.36} metalness={0.28} />
      </mesh>
    </group>
  );
}

export function CampusEnvironment({ scrollProgress }: { scrollProgress: number }) {
  const hazeOpacity = THREE.MathUtils.lerp(0.18, 0.04, scrollProgress);

  return (
    <group>
      <mesh receiveShadow position={[0.35, -0.08, -0.25]} rotation-x={-Math.PI / 2}>
        <planeGeometry args={[16, 10]} />
        <meshStandardMaterial color="#c9c5b2" roughness={0.74} metalness={0.02} />
      </mesh>

      <mesh receiveShadow position={[0.35, -0.065, 0.62]} rotation-x={-Math.PI / 2}>
        <planeGeometry args={[4.8, 8.4]} />
        <meshStandardMaterial color="#d8d1bd" roughness={0.62} />
      </mesh>

      <mesh receiveShadow position={[0.35, -0.052, 0.62]} rotation-x={-Math.PI / 2}>
        <ringGeometry args={[1.15, 1.24, 80]} />
        <meshStandardMaterial color="#a99b77" roughness={0.55} />
      </mesh>

      <StrategyRing position={[0.35, 0.03, 0.62]} scale={1.12} />

      <GlassBlock position={[-2.95, 0.9, -2.1]} scale={[1.45, 1.9, 0.45]} rotation={0.12} />
      <GlassBlock position={[-1.62, 1.16, -2.45]} scale={[1.08, 2.42, 0.48]} rotation={-0.05} />
      <GlassBlock position={[2.62, 1.02, -2.18]} scale={[1.35, 2.05, 0.48]} rotation={-0.18} />
      <GlassBlock position={[3.75, 0.74, -2.34]} scale={[0.92, 1.5, 0.42]} rotation={-0.18} />

      <IntellectualPropertyPanel position={[-1.75, 0.75, -0.72]} rotation={0.16} scale={0.82} />
      <IntellectualPropertyPanel position={[2.82, 0.68, -0.82]} rotation={-0.24} scale={0.74} />
      <IntellectualPropertyPanel position={[0.45, 0.52, -0.18]} rotation={0.02} scale={0.62} />

      <mesh castShadow receiveShadow position={[0.56, 0.26, -2.18]} scale={[2.15, 0.52, 0.36]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="#ece3cf" roughness={0.36} metalness={0.04} />
      </mesh>

      <mesh castShadow position={[0.56, 0.64, -2.13]} scale={[2.25, 0.16, 0.5]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="#7f2d28" roughness={0.3} metalness={0.08} />
      </mesh>

      {[-4.5, -3.8, -3.0, 4.0, 4.7].map((x, index) => (
        <Cypress key={x} position={[x, -0.02, -0.45 - (index % 2) * 0.55]} scale={0.86 + (index % 2) * 0.12} />
      ))}

      <mesh position={[0, 2.15, -3.2]}>
        <planeGeometry args={[13, 4.8]} />
        <meshBasicMaterial color="#fff5df" transparent opacity={hazeOpacity} depthWrite={false} />
      </mesh>
    </group>
  );
}
