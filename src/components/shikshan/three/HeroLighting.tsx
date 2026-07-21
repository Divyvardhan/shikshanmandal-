"use client";

import { Environment, Lightformer, SoftShadows } from "@react-three/drei";

export function HeroLighting() {
  return (
    <>
      <SoftShadows size={18} samples={16} focus={0.35} />
      <ambientLight intensity={0.52} color="#fff3dc" />
      <hemisphereLight args={["#f7efe2", "#566b64", 1.05]} />
      <directionalLight
        castShadow
        color="#ffe2aa"
        intensity={3.1}
        position={[-4.5, 6.2, 3.4]}
        shadow-mapSize={[2048, 2048]}
        shadow-camera-left={-7}
        shadow-camera-right={7}
        shadow-camera-top={7}
        shadow-camera-bottom={-5}
      />
      <directionalLight color="#9ec8ff" intensity={0.62} position={[4, 2.4, 4]} />
      <Environment resolution={256}>
        <Lightformer form="rect" intensity={2.2} position={[-4, 4, 2]} scale={[6, 3, 1]} color="#fff4dd" />
        <Lightformer form="rect" intensity={0.8} position={[5, 3, -4]} scale={[5, 4, 1]} color="#bed5ff" />
      </Environment>
    </>
  );
}
