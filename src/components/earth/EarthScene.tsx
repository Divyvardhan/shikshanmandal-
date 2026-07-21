"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense, useCallback, useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { CameraController } from "./CameraController";
import { CountryMarkers } from "./CountryMarkers";
import { EarthControls } from "./EarthControls";
import { EarthModel } from "./EarthModel";
import { ParticleSystem } from "./ParticleSystem";
import { PremiumStars } from "./Stars";
import { SunLight } from "./SunLight";
import { CountryMarker } from "./config/countries";

function useCompactEarthQuality() {
  const [compact, setCompact] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(max-width: 720px), (pointer: coarse)");
    const update = () => setCompact(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  return compact;
}

function EarthSceneContent({
  scrollProgress,
  selectedCountry,
  onCountrySelect,
  onCountryClear,
  compact,
}: {
  scrollProgress: number;
  selectedCountry: CountryMarker | null;
  onCountrySelect: (country: CountryMarker) => void;
  onCountryClear: () => void;
  compact: boolean;
}) {
  const [interactionActive, setInteractionActive] = useState(false);
  const [manualViewActive, setManualViewActive] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const markInteraction = useCallback(() => {
    setInteractionActive(true);
    setManualViewActive(true);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setInteractionActive(false), 1800);
  }, []);

  useEffect(() => {
    if (selectedCountry) setManualViewActive(false);
  }, [selectedCountry]);

  useEffect(() => () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  }, []);

  return (
    <>
      <CameraController scrollProgress={scrollProgress} selectedCountry={selectedCountry} manualViewActive={manualViewActive} />
      <SunLight scrollProgress={scrollProgress} />
      <PremiumStars compact={compact} />
      <ParticleSystem scrollProgress={scrollProgress} compact={compact} />
      <EarthModel scrollProgress={scrollProgress} interactionActive={interactionActive} onEarthClick={onCountryClear} compact={compact}>
        <CountryMarkers scrollProgress={scrollProgress} selectedCountry={selectedCountry} onCountrySelect={onCountrySelect} />
      </EarthModel>
      <EarthControls onInteraction={markInteraction} focusActive={Boolean(selectedCountry)} />
    </>
  );
}

export function EarthScene({
  scrollProgress,
  selectedCountry,
  onCountrySelect,
  onCountryClear,
}: {
  scrollProgress: number;
  selectedCountry: CountryMarker | null;
  onCountrySelect: (country: CountryMarker) => void;
  onCountryClear: () => void;
}) {
  const compact = useCompactEarthQuality();

  return (
    <Canvas
      dpr={compact ? [1, 1.15] : [1, 1.75]}
      camera={{ position: [0.15, 0.24, 7.25], fov: 38 }}
      gl={{
        antialias: !compact,
        alpha: true,
        toneMapping: THREE.ACESFilmicToneMapping,
        outputColorSpace: THREE.SRGBColorSpace,
        powerPreference: "high-performance",
      }}
    >
      <Suspense fallback={null}>
        <EarthSceneContent
          scrollProgress={scrollProgress}
          selectedCountry={selectedCountry}
          onCountrySelect={onCountrySelect}
          onCountryClear={onCountryClear}
          compact={compact}
        />
      </Suspense>
    </Canvas>
  );
}
