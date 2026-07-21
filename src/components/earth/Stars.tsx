"use client";

import { Stars as DreiStars } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

const starVertexShader = `
  attribute float size;
  varying vec3 vColor;

  void main() {
    vColor = color;
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    gl_PointSize = size * (320.0 / max(1.0, -mvPosition.z));
    gl_Position = projectionMatrix * mvPosition;
  }
`;

const starFragmentShader = `
  uniform float opacity;
  varying vec3 vColor;

  void main() {
    vec2 uv = gl_PointCoord - vec2(0.5);
    float distanceFromCenter = length(uv);
    float core = smoothstep(0.5, 0.0, distanceFromCenter);
    float glow = smoothstep(0.5, 0.12, distanceFromCenter);
    float alpha = (core * 0.72 + glow * 0.28) * opacity;

    if (alpha < 0.02) {
      discard;
    }

    gl_FragColor = vec4(vColor, alpha);
  }
`;

export function PremiumStars({ compact }: { compact: boolean }) {
  return (
    <>
      <DreiStars radius={28} depth={34} count={compact ? 360 : 950} factor={compact ? 0.72 : 0.9} saturation={0.02} fade speed={0.05} />
      <GalaxyBand compact={compact} />
      <GlowingStarField compact={compact} />
    </>
  );
}

function GlowingStarField({ compact }: { compact: boolean }) {
  const pointsRef = useRef<THREE.Points>(null);
  const haloRef = useRef<THREE.Points>(null);
  const pointMaterialRef = useRef<THREE.ShaderMaterial>(null);
  const haloMaterialRef = useRef<THREE.ShaderMaterial>(null);
  const starCount = compact ? 90 : 240;

  const { positions, colors, sizes } = useMemo(() => {
    const positions = new Float32Array(starCount * 3);
    const colors = new Float32Array(starCount * 3);
    const sizes = new Float32Array(starCount);
    const warm = new THREE.Color("#f8dfaa");
    const cool = new THREE.Color("#9cc8ff");
    const white = new THREE.Color("#fff9ed");

    for (let i = 0; i < starCount; i += 1) {
      const angle = Math.random() * Math.PI * 2;
      const radius = THREE.MathUtils.lerp(8.2, 21.5, Math.pow(Math.random(), 0.42));
      const band = Math.sin(angle * 2.1 + i * 0.017) * 0.55;
      const y = THREE.MathUtils.lerp(-5.6, 6.2, Math.random()) * 0.82 + band;

      positions[i * 3] = Math.cos(angle) * radius;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = Math.sin(angle) * radius - 3.2;

      const mix = Math.random();
      const color = mix > 0.72 ? warm : mix > 0.42 ? white : cool;
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;

      sizes[i] = THREE.MathUtils.lerp(compact ? 0.01 : 0.012, compact ? 0.026 : 0.034, Math.random());
    }

    return { positions, colors, sizes };
  }, [compact, starCount]);

  useFrame(({ clock }) => {
    const time = clock.elapsedTime;
    if (pointsRef.current) {
      pointsRef.current.rotation.y = time * 0.006;
      pointsRef.current.rotation.z = Math.sin(time * 0.08) * 0.012;
    }
    if (pointMaterialRef.current) {
      pointMaterialRef.current.uniforms.opacity.value = compact ? 0.2 : 0.26 + Math.sin(time * 0.75) * 0.02;
    }
    if (haloRef.current) {
      haloRef.current.rotation.y = time * 0.004;
    }
    if (haloMaterialRef.current) {
      haloMaterialRef.current.uniforms.opacity.value = compact ? 0.03 : 0.045 + Math.sin(time * 0.5) * 0.01;
    }
  });

  return (
    <>
      <points ref={haloRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions.slice(), 3]} />
          <bufferAttribute attach="attributes-color" args={[colors, 3]} />
          <bufferAttribute attach="attributes-size" args={[sizes.map((size) => size * (compact ? 150 : 170)), 1]} />
        </bufferGeometry>
        <shaderMaterial
          ref={haloMaterialRef}
          vertexShader={starVertexShader}
          fragmentShader={starFragmentShader}
          uniforms={{ opacity: { value: 0.045 } }}
          vertexColors
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
          <bufferAttribute attach="attributes-color" args={[colors, 3]} />
          <bufferAttribute attach="attributes-size" args={[sizes.map((size) => size * (compact ? 58 : 68)), 1]} />
        </bufferGeometry>
        <shaderMaterial
          ref={pointMaterialRef}
          vertexShader={starVertexShader}
          fragmentShader={starFragmentShader}
          uniforms={{ opacity: { value: 0.26 } }}
          vertexColors
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </>
  );
}

function GalaxyBand({ compact }: { compact: boolean }) {
  const bandRef = useRef<THREE.Points>(null);
  const coreRef = useRef<THREE.Points>(null);
  const bandMaterialRef = useRef<THREE.ShaderMaterial>(null);
  const coreMaterialRef = useRef<THREE.ShaderMaterial>(null);
  const dustCount = compact ? 70 : 220;
  const coreCount = compact ? 22 : 70;

  const dust = useMemo(() => {
    const positions = new Float32Array(dustCount * 3);
    const colors = new Float32Array(dustCount * 3);
    const sizes = new Float32Array(dustCount);
    const gold = new THREE.Color("#f3d491");
    const blue = new THREE.Color("#8fc8ff");
    const pearl = new THREE.Color("#fff6df");

    for (let i = 0; i < dustCount; i += 1) {
      const spread = (Math.random() - 0.5) * 22;
      const depth = THREE.MathUtils.lerp(-13, 7, Math.random());
      const drift = Math.sin(spread * 0.45) * 0.8;
      positions[i * 3] = spread;
      positions[i * 3 + 1] = drift + (Math.random() - 0.5) * 2.4;
      positions[i * 3 + 2] = depth;

      const color = Math.random() > 0.72 ? gold : Math.random() > 0.42 ? pearl : blue;
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
      sizes[i] = THREE.MathUtils.lerp(compact ? 2.8 : 3.5, compact ? 7 : 10, Math.random());
    }

    return { positions, colors, sizes };
  }, [compact, dustCount]);

  const core = useMemo(() => {
    const positions = new Float32Array(coreCount * 3);
    const colors = new Float32Array(coreCount * 3);
    const sizes = new Float32Array(coreCount);
    const gold = new THREE.Color("#f8dc9c");
    const ice = new THREE.Color("#cfe6ff");

    for (let i = 0; i < coreCount; i += 1) {
      const angle = Math.random() * Math.PI * 2;
      const radius = Math.pow(Math.random(), 1.9) * 3.4;
      positions[i * 3] = Math.cos(angle) * radius + 2.3;
      positions[i * 3 + 1] = Math.sin(angle) * radius * 0.34 + 0.45;
      positions[i * 3 + 2] = THREE.MathUtils.lerp(-9.5, -3.8, Math.random());

      const color = Math.random() > 0.44 ? gold : ice;
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
      sizes[i] = THREE.MathUtils.lerp(compact ? 5 : 7, compact ? 12 : 16, Math.random());
    }

    return { positions, colors, sizes };
  }, [compact, coreCount]);

  useFrame(({ clock }) => {
    const time = clock.elapsedTime;
    if (bandRef.current) {
      bandRef.current.rotation.z = -0.24 + Math.sin(time * 0.06) * 0.018;
      bandRef.current.rotation.y = time * 0.003;
    }
    if (bandMaterialRef.current) {
      bandMaterialRef.current.uniforms.opacity.value = compact ? 0.055 : 0.075 + Math.sin(time * 0.35) * 0.01;
    }
    if (coreRef.current) {
      coreRef.current.rotation.z = -0.24;
      coreRef.current.rotation.y = time * 0.005;
    }
    if (coreMaterialRef.current) {
      coreMaterialRef.current.uniforms.opacity.value = compact ? 0.07 : 0.1 + Math.sin(time * 0.42) * 0.012;
    }
  });

  return (
    <>
      <points ref={bandRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[dust.positions, 3]} />
          <bufferAttribute attach="attributes-color" args={[dust.colors, 3]} />
          <bufferAttribute attach="attributes-size" args={[dust.sizes, 1]} />
        </bufferGeometry>
        <shaderMaterial
          ref={bandMaterialRef}
          vertexShader={starVertexShader}
          fragmentShader={starFragmentShader}
          uniforms={{ opacity: { value: 0.075 } }}
          vertexColors
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
      <points ref={coreRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[core.positions, 3]} />
          <bufferAttribute attach="attributes-color" args={[core.colors, 3]} />
          <bufferAttribute attach="attributes-size" args={[core.sizes, 1]} />
        </bufferGeometry>
        <shaderMaterial
          ref={coreMaterialRef}
          vertexShader={starVertexShader}
          fragmentShader={starFragmentShader}
          uniforms={{ opacity: { value: 0.1 } }}
          vertexColors
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </>
  );
}
