"use client";

import * as THREE from "three";

function createTexture(width: number, height: number, draw: (ctx: CanvasRenderingContext2D, width: number, height: number) => void) {
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas unavailable");
  draw(ctx, width, height);
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 8;
  texture.needsUpdate = true;
  return texture;
}

function pseudo(seed: number) {
  const value = Math.sin(seed * 12.9898) * 43758.5453;
  return value - Math.floor(value);
}

function drawLandMass(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  rotation: number,
  tone: string,
) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(rotation);
  ctx.fillStyle = tone;
  ctx.beginPath();
  ctx.ellipse(0, 0, width, height, 0, 0, Math.PI * 2);
  ctx.fill();

  for (let i = 0; i < 16; i += 1) {
    const angle = pseudo(i + x * 0.03) * Math.PI * 2;
    const distance = 0.28 + pseudo(i * 2.8 + y * 0.02) * 0.72;
    const px = Math.cos(angle) * width * distance;
    const py = Math.sin(angle) * height * distance;
    ctx.beginPath();
    ctx.ellipse(
      px,
      py,
      width * (0.18 + pseudo(i * 7.2) * 0.36),
      height * (0.16 + pseudo(i * 5.8) * 0.34),
      pseudo(i * 11.9) * Math.PI,
      0,
      Math.PI * 2,
    );
    ctx.fill();
  }

  ctx.strokeStyle = "rgba(241, 213, 150, 0.11)";
  ctx.lineWidth = 2.2;
  for (let i = 0; i < 4; i += 1) {
    ctx.beginPath();
    ctx.ellipse(0, 0, width * (0.92 + i * 0.035), height * (0.92 + i * 0.03), 0, 0, Math.PI * 2);
    ctx.stroke();
  }

  for (let i = 0; i < 9; i += 1) {
    ctx.fillStyle = i % 2 === 0 ? "rgba(181, 156, 92, 0.16)" : "rgba(58, 93, 62, 0.2)";
    ctx.beginPath();
    ctx.ellipse(
      (pseudo(i + x) - 0.5) * width * 1.3,
      (pseudo(i + y) - 0.5) * height * 1.1,
      width * (0.12 + pseudo(i * 3.1) * 0.18),
      height * (0.08 + pseudo(i * 6.2) * 0.16),
      pseudo(i * 2.7) * Math.PI,
      0,
      Math.PI * 2,
    );
    ctx.fill();
  }
  ctx.restore();
}

export function createEarthColorMap() {
  return createTexture(2048, 1024, (ctx, width, height) => {
    const ocean = ctx.createLinearGradient(0, 0, width, height);
    ocean.addColorStop(0, "#06192a");
    ocean.addColorStop(0.4, "#0e4559");
    ocean.addColorStop(0.72, "#07243d");
    ocean.addColorStop(1, "#03111f");
    ctx.fillStyle = ocean;
    ctx.fillRect(0, 0, width, height);

    for (let i = 0; i < 220; i += 1) {
      ctx.fillStyle = i % 2 === 0 ? "rgba(255,255,255,0.018)" : "rgba(43,128,153,0.038)";
      ctx.beginPath();
      ctx.ellipse(
        pseudo(i * 5.1) * width,
        pseudo(i * 9.7) * height,
        18 + pseudo(i * 2.2) * 90,
        3 + pseudo(i * 3.7) * 14,
        pseudo(i * 11.3) * Math.PI,
        0,
        Math.PI * 2,
      );
      ctx.fill();
    }

    const land = [
      [0.2, 0.33, 210, 110, -0.2],
      [0.28, 0.58, 150, 86, 0.42],
      [0.49, 0.38, 210, 95, 0.1],
      [0.56, 0.58, 130, 78, -0.36],
      [0.66, 0.45, 230, 108, 0.28],
      [0.74, 0.68, 90, 54, 0.62],
      [0.87, 0.56, 150, 78, -0.12],
      [0.05, 0.5, 95, 66, 0.16],
    ];

    land.forEach(([x, y, w, h, rotation], index) => {
      drawLandMass(
        ctx,
        Number(x) * width,
        Number(y) * height,
        Number(w),
        Number(h),
        Number(rotation),
        index % 2 === 0 ? "rgba(89, 117, 70, 0.95)" : "rgba(112, 122, 74, 0.94)",
      );
    });

    const polar = ctx.createLinearGradient(0, 0, 0, height);
    polar.addColorStop(0, "rgba(240,248,255,0.52)");
    polar.addColorStop(0.12, "rgba(240,248,255,0)");
    polar.addColorStop(0.88, "rgba(240,248,255,0)");
    polar.addColorStop(1, "rgba(240,248,255,0.36)");
    ctx.fillStyle = polar;
    ctx.fillRect(0, 0, width, height);

    for (let i = 0; i < 420; i += 1) {
      const shade = pseudo(i) > 0.5 ? "rgba(7,31,48,0.11)" : "rgba(255,255,255,0.035)";
      ctx.fillStyle = shade;
      ctx.fillRect(pseudo(i * 4.4) * width, pseudo(i * 8.8) * height, 1, 1);
    }
  });
}

export function createEarthNormalMap() {
  return createTexture(1024, 512, (ctx, width, height) => {
    ctx.fillStyle = "rgb(128,128,255)";
    ctx.fillRect(0, 0, width, height);
    for (let i = 0; i < 110; i += 1) {
      const x = Math.abs(Math.sin(i * 21.17)) * width;
      const y = Math.abs(Math.cos(i * 9.41)) * height;
      ctx.fillStyle = i % 2 === 0 ? "rgba(116,126,246,.55)" : "rgba(142,138,255,.45)";
      ctx.beginPath();
      ctx.ellipse(x, y, 70 + (i % 6) * 18, 18 + (i % 4) * 9, i * 0.2, 0, Math.PI * 2);
      ctx.fill();
    }
  });
}

export function createEarthRoughnessMap() {
  return createTexture(1024, 512, (ctx, width, height) => {
    ctx.fillStyle = "#4f4f4f";
    ctx.fillRect(0, 0, width, height);
    ctx.fillStyle = "rgba(210,210,210,.5)";
    for (let i = 0; i < 48; i += 1) {
      const x = Math.abs(Math.sin(i * 43.13)) * width;
      const y = Math.abs(Math.cos(i * 18.93)) * height;
      ctx.beginPath();
      ctx.ellipse(x, y, 88 + (i % 6) * 22, 24 + (i % 5) * 12, i * 0.31, 0, Math.PI * 2);
      ctx.fill();
    }
  });
}

export function createNightLightsMap() {
  return createTexture(2048, 1024, (ctx, width, height) => {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, width, height);
    for (let i = 0; i < 620; i += 1) {
      ctx.fillStyle = i % 5 === 0 ? "rgba(255, 235, 170, 0.95)" : "rgba(244, 201, 106, 0.72)";
      const x = pseudo(i * 43.21) * width;
      const y = pseudo(i * 17.97) * height;
      const radius = i % 13 === 0 ? 1.9 : 0.85;
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fill();
    }
  });
}

export function createCloudMap() {
  return createTexture(1024, 512, (ctx, width, height) => {
    ctx.clearRect(0, 0, width, height);
    for (let i = 0; i < 140; i += 1) {
      ctx.fillStyle = i % 3 === 0 ? "rgba(255,255,255,.32)" : "rgba(255,255,255,.2)";
      const x = pseudo(i * 31.7) * width;
      const y = pseudo(i * 19.3) * height;
      ctx.beginPath();
      ctx.ellipse(x, y, 42 + (i % 6) * 14, 8 + (i % 5) * 5, i * 0.7, 0, Math.PI * 2);
      ctx.fill();
    }
  });
}
