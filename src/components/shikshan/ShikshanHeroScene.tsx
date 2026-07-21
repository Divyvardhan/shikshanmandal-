"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, PerspectiveCamera, Preload } from "@react-three/drei";
import { Suspense, useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { FlagField } from "./three/FlagField";
import { HeroLighting } from "./three/HeroLighting";

function useScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const update = () => {
      const height = Math.max(1, window.innerHeight);
      setProgress(Math.min(1, Math.max(0, window.scrollY / height)));
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return progress;
}

function CameraRig({ scrollProgress }: { scrollProgress: number }) {
  const pointer = useRef(new THREE.Vector2());
  const { camera, gl } = useThree();

  useEffect(() => {
    const element = gl.domElement;
    const move = (event: PointerEvent) => {
      const rect = element.getBoundingClientRect();
      pointer.current.set(
        ((event.clientX - rect.left) / rect.width - 0.5) * 2,
        -((event.clientY - rect.top) / rect.height - 0.5) * 2,
      );
    };
    element.addEventListener("pointermove", move);
    return () => element.removeEventListener("pointermove", move);
  }, [gl]);

  useFrame(({ clock }) => {
    const time = clock.elapsedTime;
    const target = new THREE.Vector3(
      pointer.current.x * 0.06,
      1.12 + pointer.current.y * 0.035 + Math.sin(time * 0.42) * 0.012,
      7.35 - scrollProgress * 0.34,
    );
    camera.position.lerp(target, 0.035);
    camera.lookAt(0.2, 1.08, -0.15);
  });

  return null;
}

function SceneContent() {
  const scrollProgress = useScrollProgress();

  return (
    <>
      <PerspectiveCamera makeDefault fov={42} position={[0, 1.12, 7.35]} near={0.1} far={90} />
      <CameraRig scrollProgress={scrollProgress} />
      <HeroLighting />
      <Float speed={0.28} rotationIntensity={0.02} floatIntensity={0.04}>
        <FlagField scrollProgress={scrollProgress} />
      </Float>
    </>
  );
}

export function ShikshanHeroScene() {
  return (
    <Canvas
      dpr={[1, 1.75]}
      shadows="percentage"
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      camera={{ position: [0, 1.2, 9.4], fov: 32 }}
    >
      <Suspense fallback={null}>
        <SceneContent />
        <Preload all />
      </Suspense>
    </Canvas>
  );
}
