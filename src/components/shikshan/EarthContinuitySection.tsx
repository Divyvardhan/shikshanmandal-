"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { EarthScene, useEarthTransition } from "@/components/earth";
import { CountryMarker } from "@/components/earth/config/countries";
import { PatentPanel } from "@/components/earth/PatentPanel";

export function EarthContinuitySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const panelDelayRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [selectedCountry, setSelectedCountry] = useState<CountryMarker | null>(null);
  const [panelCountry, setPanelCountry] = useState<CountryMarker | null>(null);
  const handleProgress = useCallback((progress: number) => setScrollProgress(progress), []);
  const handleCountrySelect = useCallback((country: CountryMarker) => {
    setSelectedCountry(country);
    setPanelCountry(null);
    if (panelDelayRef.current) clearTimeout(panelDelayRef.current);
    panelDelayRef.current = setTimeout(() => setPanelCountry(country), 920);
  }, []);
  const handleCountryClear = useCallback(() => {
    setSelectedCountry(null);
    setPanelCountry(null);
    if (panelDelayRef.current) clearTimeout(panelDelayRef.current);
  }, []);

  useEarthTransition(sectionRef, handleProgress);

  useEffect(() => () => {
    if (panelDelayRef.current) clearTimeout(panelDelayRef.current);
  }, []);

  return (
    <section ref={sectionRef} id="about-earth" className="shikshan-earth" aria-labelledby="earth-title">
      <div className="shikshan-earth__copy">
        <p>Global IP Protection Network</p>
        <h2 id="earth-title">Secure your patents, designs and copyrights with official government registration across multiple jurisdictions.</h2>
      </div>
      <div className="shikshan-earth__experience">
        <div className="shikshan-earth__canvas" aria-label="Realistic Earth with glowing intellectual property jurisdiction markers">
          <EarthScene
            scrollProgress={scrollProgress}
            selectedCountry={selectedCountry}
            onCountrySelect={handleCountrySelect}
            onCountryClear={handleCountryClear}
          />
        </div>
        <PatentPanel country={panelCountry} />
      </div>
    </section>
  );
}
