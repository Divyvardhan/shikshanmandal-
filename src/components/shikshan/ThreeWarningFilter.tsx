"use client";

import { useEffect } from "react";

const ignoredThreeWarnings = [
  "THREE.Clock: This module has been deprecated",
  "THREE.WebGLShadowMap: PCFSoftShadowMap has been deprecated",
  "THREE.WebGLProgram: Program Info Log",
];

let originalWarn: typeof console.warn | null = null;

function installThreeWarningFilter() {
  if (typeof window === "undefined" || originalWarn) return;
  originalWarn = console.warn;
  console.warn = (...args) => {
    const message = args.map((arg) => String(arg)).join(" ");
    if (ignoredThreeWarnings.some((warning) => message.includes(warning))) {
      return;
    }
    originalWarn?.(...args);
  };
}

installThreeWarningFilter();

export function ThreeWarningFilter() {
  useEffect(() => {
    return () => {
      if (originalWarn) {
        console.warn = originalWarn;
        originalWarn = null;
      }
    };
  }, []);

  return null;
}
