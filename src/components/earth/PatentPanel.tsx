"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { CountryMarker } from "./config/countries";

export function PatentPanel({ country }: { country: CountryMarker | null }) {
  const panelRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!country || !panelRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".shikshan-earth__panel span, .shikshan-earth__panel strong, .shikshan-earth__service-detail, .shikshan-earth__panel dl div, .shikshan-earth__panel-actions a",
        { opacity: 0, x: 18 },
        { opacity: 1, x: 0, duration: 0.48, stagger: 0.045, ease: "power3.out" },
      );
    }, panelRef);

    return () => ctx.revert();
  }, [country]);

  return (
    <aside ref={panelRef} className={`shikshan-earth__panel${country ? " is-active" : ""}`} aria-label="Global IP services">
      {country ? (
        <>
          <span>{country.flag} {country.name}</span>
          <strong>{country.name} registration services</strong>
          <div className="shikshan-earth__service-details">
            {country.serviceDetails.map((service) => (
              <article key={service.title} className="shikshan-earth__service-detail">
                <h3>{service.title}</h3>
                <p>{service.description}</p>
              </article>
            ))}
          </div>
          <div className="shikshan-earth__panel-actions">
            <a href="https://wa.me/919557332408" target="_blank" rel="noreferrer">Talk to Expert</a>
          </div>
        </>
      ) : (
        <>
          <span>IP Registration Network</span>
          <strong>Choose a country to begin your patent, design and copyright registration journey with official government authorities.</strong>
        </>
      )}
    </aside>
  );
}
