"use client";

import { motion, useReducedMotion } from "framer-motion";

const services = [
  "Patent Registration",
  "Trademark Registration",
  "Copyright",
  "Industrial Design",
  "IP Strategy",
  "Technology Transfer",
  "Research Commercialization",
  "Global Patent Filing",
];

export function InnovationAboutSection() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="shikshan-about" aria-labelledby="about-title">
      <div className="shikshan-about__line" aria-hidden="true" />
      <div className="shikshan-about__content">
        <p className="shikshan-about__eyebrow">Intellectual Property Consultancy</p>
        <h2 id="about-title">From idea protection to international filing strategy.</h2>
        <p>
          Shikshan Mandal works at the intersection of invention, brand ownership,
          creative rights, design protection, research commercialization and
          cross-border IP filing. The international flags above become the
          jurisdiction network below.
        </p>
      </div>
      <div className="shikshan-about__services" aria-label="Core intellectual property services">
        {services.map((service, index) => (
          <motion.div
            key={service}
            className="shikshan-about__service"
            initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
            whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-12% 0px" }}
            transition={{ duration: 0.52, delay: index * 0.035, ease: [0.22, 1, 0.36, 1] }}
          >
            <span>{String(index + 1).padStart(2, "0")}</span>
            {service}
          </motion.div>
        ))}
      </div>
    </section>
  );
}
