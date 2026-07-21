"use client";

import { Canvas } from "@react-three/fiber";
import { Preload } from "@react-three/drei";
import { Suspense, useEffect, useState } from "react";
import { HeroClothFlags } from "./three/HeroClothFlags";

function useHeroScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const update = () => {
      const height = Math.max(1, window.innerHeight);
      setProgress(Math.min(1, Math.max(0, window.scrollY / (height * 1.15))));
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

export function ShikshanHeroClothScene() {
  const scrollProgress = useHeroScrollProgress();

  return (
    <Canvas
      orthographic
      dpr={[1, 1.5]}
      gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
      camera={{ position: [0, 0, 10], zoom: 100, near: 0.1, far: 40 }}
    >
      <Suspense fallback={null}>
        <ambientLight intensity={1.5} color="#ffffff" />
        <directionalLight position={[2, 3, 5]} intensity={1.65} color="#fff3dd" />
        <directionalLight position={[-3, 1.5, 2]} intensity={0.45} color="#d8e8ff" />
        <HeroClothFlags scrollProgress={scrollProgress} />
        <Preload all />
      </Suspense>
    </Canvas>
  );
}
