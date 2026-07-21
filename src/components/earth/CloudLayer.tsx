"use client";

import { useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import * as THREE from "three";

export function CloudLayer({ compact }: { compact: boolean }) {
  const cloudRef = useRef<THREE.Mesh>(null);
  const cloudTexture = useTexture("/earth/earth_clouds_1024.png") as THREE.Texture;

  useEffect(() => {
    cloudTexture.colorSpace = THREE.SRGBColorSpace;
    cloudTexture.anisotropy = 12;
    cloudTexture.needsUpdate = true;
  }, [cloudTexture]);

  useFrame(({ clock }) => {
    if (cloudRef.current) {
      cloudRef.current.rotation.y = clock.elapsedTime * 0.052 - 1.25;
    }
  });

  return (
    <mesh ref={cloudRef}>
      <sphereGeometry args={[2.335, compact ? 72 : 128, compact ? 72 : 128]} />
      <meshStandardMaterial map={cloudTexture} transparent opacity={0.36} depthWrite={false} roughness={0.9} />
    </mesh>
  );
}
