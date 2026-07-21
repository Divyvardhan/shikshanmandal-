"use client";

import Image from "next/image";
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

export function ShikshanHero() {
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

      <div className="approved-hero">
        <div className="approved-hero__backdrop" aria-hidden="true">
          <Image
            src="/brand/approved-hero-right-visual-rtl-order.jpeg"
            alt=""
            fill
            sizes="100vw"
            priority
            className="approved-hero__background-image"
          />
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
      </div>
    </section>
  );
}
