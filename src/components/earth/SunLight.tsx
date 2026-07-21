"use client";

export function SunLight({ scrollProgress }: { scrollProgress: number }) {
  return (
    <>
      <ambientLight intensity={0.38 + scrollProgress * 0.24} />
      <hemisphereLight args={["#f4f9ff", "#11100c", 0.62 + scrollProgress * 0.2]} />
      <directionalLight
        position={[5.8, 3.2 - scrollProgress * 0.8, 4.6]}
        intensity={2.75 + scrollProgress * 0.5}
        color="#ffe0aa"
      />
      <pointLight position={[-3.2, -2.2, 2.2]} intensity={0.58} color="#8fc6ff" />
      <pointLight position={[0.2, 2.8, 3.6]} intensity={0.28} color="#f5d99a" />
    </>
  );
}
