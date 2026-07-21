"use client";

import { Html } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { CountryMarker, countryMarkers } from "./config/countries";
import { latLonToVector3 } from "./utilities/geo";

function CountryPin({
  country,
  index,
  scrollProgress,
  selected,
  onSelect,
}: {
  country: CountryMarker;
  index: number;
  scrollProgress: number;
  selected: boolean;
  onSelect: (country: CountryMarker) => void;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const pulseRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.MeshBasicMaterial>(null);
  const pulseMaterialRef = useRef<THREE.MeshBasicMaterial>(null);
  const [hovered, setHovered] = useState(false);
  const position = useMemo(() => latLonToVector3(country.latitude, country.longitude, 2.42), [country.latitude, country.longitude]);

  useFrame(({ clock }) => {
    const markerReveal = THREE.MathUtils.smoothstep(scrollProgress, 0.58, 0.94);
    const pulseWave = (Math.sin(clock.elapsedTime * 2.8 + index) + 1) / 2;
    if (meshRef.current) {
      const pulse = 1 + Math.sin(clock.elapsedTime * 2.6 + index) * 0.16;
      meshRef.current.scale.setScalar(pulse * THREE.MathUtils.lerp(0.42, selected ? 1.42 : hovered ? 1.08 : 0.72, markerReveal));
    }
    if (pulseRef.current) {
      pulseRef.current.scale.setScalar(THREE.MathUtils.lerp(0.58, selected ? 2.2 : 1.42 + pulseWave * 0.55, markerReveal));
    }
    if (materialRef.current) {
      materialRef.current.opacity = selected ? 1 : hovered ? 0.96 : markerReveal * 0.9;
    }
    if (pulseMaterialRef.current) {
      pulseMaterialRef.current.opacity = markerReveal * (selected ? 0.62 : 0.32 * (1 - pulseWave));
    }
  });

  const selectCountry = () => onSelect(country);

  return (
    <group position={position}>
      <mesh
        onPointerEnter={(event) => {
          event.stopPropagation();
          setHovered(true);
        }}
        onPointerLeave={(event) => {
          event.stopPropagation();
          setHovered(false);
        }}
        onClick={(event) => {
          event.stopPropagation();
          selectCountry();
        }}
        aria-label={`${country.name} marker hit area`}
      >
        <sphereGeometry args={[0.13, 18, 12]} />
        <meshBasicMaterial transparent opacity={0} depthWrite={false} />
      </mesh>
      <mesh ref={pulseRef} renderOrder={2}>
        <ringGeometry args={[0.055, 0.079, 28]} />
        <meshBasicMaterial ref={pulseMaterialRef} color="#ffd782" transparent opacity={0} side={THREE.DoubleSide} depthWrite={false} />
      </mesh>
      <mesh
        ref={meshRef}
        onPointerEnter={(event) => {
          event.stopPropagation();
          setHovered(true);
        }}
        onPointerLeave={(event) => {
          event.stopPropagation();
          setHovered(false);
        }}
        onClick={(event) => {
          event.stopPropagation();
          selectCountry();
        }}
        aria-label={`${country.name} intellectual property services marker`}
      >
        <sphereGeometry args={[0.026, 18, 10]} />
        <meshBasicMaterial ref={materialRef} color="#ffd782" transparent opacity={0} />
        <pointLight color="#ffd782" intensity={0.74} distance={1.55} />
      </mesh>
      <Html center distanceFactor={11} className="earth-marker-flag">
        <button
          type="button"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          onClick={(event) => {
            event.stopPropagation();
            selectCountry();
          }}
          aria-label={`Show ${country.name} registration services`}
        >
          {country.shortName}
        </button>
      </Html>
      {hovered ? (
        <Html center distanceFactor={7.6} className="earth-marker-tooltip">
          <strong>{country.shortName} {country.name}</strong>
          <span>Click to explore</span>
        </Html>
      ) : null}
    </group>
  );
}

export function CountryMarkers({
  scrollProgress,
  selectedCountry,
  onCountrySelect,
}: {
  scrollProgress: number;
  selectedCountry: CountryMarker | null;
  onCountrySelect: (country: CountryMarker) => void;
}) {
  return (
    <>
      {countryMarkers.map((country, index) => (
        <CountryPin
          key={country.id}
          country={country}
          index={index}
          scrollProgress={scrollProgress}
          selected={selectedCountry?.id === country.id}
          onSelect={onCountrySelect}
        />
      ))}
    </>
  );
}
