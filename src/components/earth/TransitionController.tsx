"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { RefObject, useEffect } from "react";

export function useEarthTransition(sectionRef: RefObject<HTMLElement | null>, onProgress: (progress: number) => void) {
  useEffect(() => {
    if (!sectionRef.current || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.set(sectionRef.current, { "--earth-space": 0, "--earth-copy": 0 });
      gsap
        .timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.1,
            onUpdate: (self) => onProgress(self.progress),
          },
        })
        .to(sectionRef.current, { "--earth-space": 1, duration: 0.48, ease: "none" }, 0)
        .to(sectionRef.current, { "--earth-copy": 1, duration: 0.36, ease: "power2.out" }, 0.18)
        .fromTo(".shikshan-earth__copy", { y: 32, opacity: 0.35 }, { y: 0, opacity: 1, duration: 0.42 }, 0.16)
        .fromTo(".shikshan-earth__canvas", { y: 78, opacity: 0.42 }, { y: 0, opacity: 1, duration: 0.68 }, 0.1);
    }, sectionRef);

    return () => ctx.revert();
  }, [onProgress, sectionRef]);
}
