"use client";

import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { CountryMarker } from "./config/countries";
import { latLonToVector3 } from "./utilities/geo";

export function CameraController({
  scrollProgress,
  selectedCountry,
  manualViewActive,
}: {
  scrollProgress: number;
  selectedCountry: CountryMarker | null;
  manualViewActive: boolean;
}) {
  const { camera } = useThree();

  useFrame(() => {
    if (manualViewActive) return;

    const reveal = THREE.MathUtils.smoothstep(scrollProgress, 0.08, 0.72);
    const defaultTarget = new THREE.Vector3(0.15, THREE.MathUtils.lerp(0.5, 0.2, reveal), THREE.MathUtils.lerp(7.75, 7.15, reveal));

    if (!selectedCountry) {
      camera.position.lerp(defaultTarget, 0.035);
      camera.lookAt(0, 0.08, 0);
      return;
    }

    const surfaceTarget = latLonToVector3(selectedCountry.latitude, selectedCountry.longitude, 2.38);
    const flyTarget = surfaceTarget.clone().normalize().multiplyScalar(6.7);
    flyTarget.y += 0.24;
    camera.position.lerp(flyTarget, 0.055);
    camera.lookAt(surfaceTarget.clone().multiplyScalar(0.58));
  });

  return null;
}
