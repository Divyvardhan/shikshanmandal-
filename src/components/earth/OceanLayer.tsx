"use client";

import { useTexture } from "@react-three/drei";
import { useEffect, useMemo } from "react";
import * as THREE from "three";

export function OceanLayer() {
  const [colorMap, normalMap, specularMap, nightLightsMap] = useTexture([
    "/earth/earth_day_2048.jpg",
    "/earth/earth_normal_2048.jpg",
    "/earth/earth_specular_2048.jpg",
    "/earth/earth_lights_2048.png",
  ]) as THREE.Texture[];
  const normalScale = useMemo(() => new THREE.Vector2(0.28, 0.28), []);

  useEffect(() => {
    colorMap.colorSpace = THREE.SRGBColorSpace;
    nightLightsMap.colorSpace = THREE.SRGBColorSpace;
    [colorMap, normalMap, specularMap, nightLightsMap].forEach((texture) => {
      texture.anisotropy = 12;
      texture.needsUpdate = true;
    });
  }, [colorMap, nightLightsMap, normalMap, specularMap]);

  return (
    <meshPhongMaterial
      map={colorMap}
      normalMap={normalMap}
      specularMap={specularMap}
      specular="#9fb8d8"
      shininess={28}
      emissiveMap={nightLightsMap}
      emissive="#ffd782"
      emissiveIntensity={0.24}
      normalScale={normalScale}
    />
  );
}
