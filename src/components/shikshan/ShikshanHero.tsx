"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import {
  FaBookOpen,
  FaCalendarDays,
  FaChevronDown,
  FaCopyright,
  FaGraduationCap,
  FaRegFileLines,
  FaUsers,
} from "react-icons/fa6";

const stats = [
  { value: "1000+", label: "Happy Academicians", icon: FaGraduationCap },
  { value: "500+", label: "Designs Registered", icon: FaRegFileLines },
  { value: "300+", label: "Copyrights Secured", icon: FaCopyright },
  { value: "100+", label: "Books Published", icon: FaBookOpen },
  { value: "20+", label: "Conferences Organised", icon: FaUsers },
];

const navItems = [
  { label: "Home", href: "#" },
  { label: "About Us", href: "#about-us" },
  { label: "Services", href: "#services" },
  { label: "Process", href: "#process" },
  { label: "Testimonial", href: "#testimonials" },
  { label: "Contact Us", href: "#contact-us" },
];

const heroSlides = [
  {
    src: "/brand/approved-hero-right-visual-rtl-order.jpeg",
    alt: "Shikshan Mandal academic profile support",
    kind: "profile",
  },
  {
    src: "/brand/cadsari-2026-conference.png",
    alt: "CADSARI 2026 conference announcement",
    kind: "conference",
  },
] as const;

export function ShikshanHero() {
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % heroSlides.length);
    }, 4500);

    return () => window.clearInterval(interval);
  }, []);

  const isConferenceSlide = heroSlides[activeSlide].kind === "conference";

  return (
    <section className="approved-landing" aria-labelledby="hero-title">
      <header className="approved-nav">
        <a className="approved-brand" href="#" aria-label="Shikshan Mandal home">
          <Image
            src="/brand/shikshan-mandal-logo-official-2026.jpeg"
            alt="Shikshan Mandal official logo"
            width={70}
            height={70}
            priority
          />
          <span>
            <strong>SHIKSHAN MANDAL</strong>
            <em>EMPOWERING ACADEMIA</em>
            <small>MSME REGISTERED</small>
          </span>
        </a>
        <nav className="approved-nav__links" aria-label="Primary navigation">
          {navItems.map((item) => (
            <a key={item.label} className={item.label === "Home" ? "is-active" : ""} href={item.href}>
              {item.label}
              {item.label === "Services" ? <FaChevronDown aria-hidden="true" /> : null}
            </a>
          ))}
        </nav>
        <a className="approved-nav__cta" href="https://wa.me/919557332408" target="_blank" rel="noreferrer">
          Free Consultation <FaCalendarDays aria-hidden="true" />
        </a>
      </header>

      <div className={`approved-hero${isConferenceSlide ? " is-conference-slide" : ""}`}>
        <div className="approved-hero__backdrop" aria-hidden="true">
          {heroSlides.map((slide, index) => (
            <div
              key={slide.src}
              className={`approved-hero__slide${index === activeSlide ? " is-active" : ""} approved-hero__slide--${slide.kind}`}
            >
              <Image
                src={slide.src}
                alt=""
                fill
                sizes="100vw"
                priority={index === 0}
                className="approved-hero__background-image"
              />
            </div>
          ))}
        </div>
        <div className="approved-hero__overlay" />
        <div className="approved-hero__content">
          <p>For Professors | Researchers | Academicians</p>
          <h1 id="hero-title">
            Strengthen Your <span>Academic Profile</span> with Global IPR &amp; Publication Support
          </h1>
          <p>
            From Design Registration to Patents, Copyrights, Books and Conferences,
            we help you strengthen your academic profile and professional credibility.
          </p>
        </div>
        <div className="approved-stats" aria-label="Shikshan Mandal impact statistics">
          {stats.map((stat) => (
            <div key={stat.label} className="approved-stat">
              <stat.icon aria-hidden="true" />
              <span>
                <strong>{stat.value}</strong>
                <small>{stat.label}</small>
              </span>
            </div>
          ))}
        </div>
        <div className="approved-hero__pagination" aria-label="Hero slides">
          {heroSlides.map((slide, index) => (
            <button
              key={slide.src}
              type="button"
              className={index === activeSlide ? "is-active" : ""}
              onClick={() => setActiveSlide(index)}
              aria-label={`Show ${slide.kind === "conference" ? "CADSARI 2026 conference" : "Shikshan Mandal"} slide`}
              aria-current={index === activeSlide ? "true" : undefined}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
