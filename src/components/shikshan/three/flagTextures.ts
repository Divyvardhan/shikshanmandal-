"use client";

import * as THREE from "three";

export type FlagCountry = "uk" | "canada" | "india" | "usa" | "south-africa";

const textureCache = new Map<string, THREE.CanvasTexture>();

function canvasTexture(key: string, draw: (ctx: CanvasRenderingContext2D, w: number, h: number) => void) {
  const cached = textureCache.get(key);
  if (cached) {
    return cached;
  }

  const canvas = document.createElement("canvas");
  canvas.width = 1024;
  canvas.height = 640;
  const ctx = canvas.getContext("2d");
  if (!ctx) {
    throw new Error("Canvas 2D context unavailable");
  }

  draw(ctx, canvas.width, canvas.height);
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 8;
  texture.needsUpdate = true;
  textureCache.set(key, texture);
  return texture;
}

export function createFabricNormalTexture() {
  return canvasTexture("fabric-normal", (ctx, w, h) => {
    ctx.fillStyle = "rgb(128,128,255)";
    ctx.fillRect(0, 0, w, h);
    for (let y = 0; y < h; y += 4) {
      ctx.fillStyle = y % 8 === 0 ? "rgb(135,132,255)" : "rgb(121,126,248)";
      ctx.fillRect(0, y, w, 1);
    }
    for (let x = 0; x < w; x += 9) {
      ctx.fillStyle = "rgba(152,152,255,.22)";
      ctx.fillRect(x, 0, 1, h);
    }
  });
}

function drawUnionJack(ctx: CanvasRenderingContext2D, w: number, h: number) {
  ctx.fillStyle = "#012169";
  ctx.fillRect(0, 0, w, h);
  ctx.lineCap = "butt";
  ctx.strokeStyle = "#fff";
  ctx.lineWidth = h * 0.22;
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(w, h);
  ctx.moveTo(w, 0);
  ctx.lineTo(0, h);
  ctx.stroke();
  ctx.strokeStyle = "#c8102e";
  ctx.lineWidth = h * 0.09;
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(w, h);
  ctx.moveTo(w, 0);
  ctx.lineTo(0, h);
  ctx.stroke();
  ctx.fillStyle = "#fff";
  ctx.fillRect(0, h * 0.39, w, h * 0.22);
  ctx.fillRect(w * 0.39, 0, w * 0.22, h);
  ctx.fillStyle = "#c8102e";
  ctx.fillRect(0, h * 0.435, w, h * 0.13);
  ctx.fillRect(w * 0.435, 0, w * 0.13, h);
}

function drawMapleLeaf(ctx: CanvasRenderingContext2D, cx: number, cy: number, size: number) {
  const points = [
    [0, -1], [0.13, -0.48], [0.38, -0.64], [0.27, -0.25], [0.62, -0.3],
    [0.36, -0.03], [0.72, 0.08], [0.3, 0.16], [0.38, 0.47], [0.08, 0.3],
    [0.08, 0.82], [-0.08, 0.82], [-0.08, 0.3], [-0.38, 0.47], [-0.3, 0.16],
    [-0.72, 0.08], [-0.36, -0.03], [-0.62, -0.3], [-0.27, -0.25],
    [-0.38, -0.64], [-0.13, -0.48],
  ];
  ctx.beginPath();
  points.forEach(([x, y], index) => {
    const px = cx + x * size;
    const py = cy + y * size;
    if (index === 0) ctx.moveTo(px, py);
    else ctx.lineTo(px, py);
  });
  ctx.closePath();
  ctx.fill();
}

function drawAshokaChakra(ctx: CanvasRenderingContext2D, cx: number, cy: number, radius: number) {
  ctx.strokeStyle = "#06038d";
  ctx.lineWidth = radius * 0.08;
  ctx.beginPath();
  ctx.arc(cx, cy, radius, 0, Math.PI * 2);
  ctx.stroke();
  for (let i = 0; i < 24; i += 1) {
    const angle = (Math.PI * 2 * i) / 24;
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(cx + Math.cos(angle) * radius * 0.92, cy + Math.sin(angle) * radius * 0.92);
    ctx.stroke();
  }
  ctx.beginPath();
  ctx.arc(cx, cy, radius * 0.12, 0, Math.PI * 2);
  ctx.fillStyle = "#06038d";
  ctx.fill();
}

export function createFlagTexture(country: FlagCountry) {
  return canvasTexture(`flag-${country}`, (ctx, w, h) => {
    if (country === "uk") {
      drawUnionJack(ctx, w, h);
      return;
    }

    if (country === "canada") {
      ctx.fillStyle = "#d80621";
      ctx.fillRect(0, 0, w * 0.25, h);
      ctx.fillRect(w * 0.75, 0, w * 0.25, h);
      ctx.fillStyle = "#fff";
      ctx.fillRect(w * 0.25, 0, w * 0.5, h);
      ctx.fillStyle = "#d80621";
      drawMapleLeaf(ctx, w * 0.5, h * 0.52, h * 0.34);
      return;
    }

    if (country === "india") {
      ctx.fillStyle = "#ff9933";
      ctx.fillRect(0, 0, w, h / 3);
      ctx.fillStyle = "#fff";
      ctx.fillRect(0, h / 3, w, h / 3);
      ctx.fillStyle = "#138808";
      ctx.fillRect(0, (h * 2) / 3, w, h / 3);
      drawAshokaChakra(ctx, w / 2, h / 2, h * 0.12);
      return;
    }

    if (country === "usa") {
      for (let i = 0; i < 13; i += 1) {
        ctx.fillStyle = i % 2 === 0 ? "#b22234" : "#fff";
        ctx.fillRect(0, (h / 13) * i, w, h / 13);
      }
      ctx.fillStyle = "#3c3b6e";
      ctx.fillRect(0, 0, w * 0.42, (h / 13) * 7);
      ctx.fillStyle = "#fff";
      for (let row = 0; row < 9; row += 1) {
        const count = row % 2 === 0 ? 6 : 5;
        for (let col = 0; col < count; col += 1) {
          const x = w * 0.035 + col * w * 0.064 + (row % 2 ? w * 0.032 : 0);
          const y = h * 0.036 + row * h * 0.052;
          ctx.beginPath();
          ctx.arc(x, y, h * 0.008, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      return;
    }

    ctx.fillStyle = "#de3831";
    ctx.fillRect(0, 0, w, h / 3);
    ctx.fillStyle = "#002395";
    ctx.fillRect(0, (h * 2) / 3, w, h / 3);
    ctx.fillStyle = "#fff";
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(w * 0.46, h / 2);
    ctx.lineTo(0, h);
    ctx.lineTo(0, h * 0.76);
    ctx.lineTo(w * 0.28, h / 2);
    ctx.lineTo(0, h * 0.24);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = "#007a4d";
    ctx.beginPath();
    ctx.moveTo(0, h * 0.08);
    ctx.lineTo(w * 0.39, h / 2);
    ctx.lineTo(0, h * 0.92);
    ctx.lineTo(0, h * 0.7);
    ctx.lineTo(w * 0.21, h / 2);
    ctx.lineTo(0, h * 0.3);
    ctx.closePath();
    ctx.fill();
    ctx.strokeStyle = "#ffb612";
    ctx.lineWidth = h * 0.055;
    ctx.beginPath();
    ctx.moveTo(0, h * 0.2);
    ctx.lineTo(w * 0.3, h / 2);
    ctx.lineTo(0, h * 0.8);
    ctx.stroke();
    ctx.strokeStyle = "#000";
    ctx.lineWidth = h * 0.075;
    ctx.beginPath();
    ctx.moveTo(0, h * 0.18);
    ctx.lineTo(w * 0.23, h / 2);
    ctx.lineTo(0, h * 0.82);
    ctx.stroke();
  });
}
