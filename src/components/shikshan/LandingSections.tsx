"use client";

import {
  FaArrowRight,
  FaCheck,
  FaCopyright,
  FaEnvelope,
  FaFacebookF,
  FaFileSignature,
  FaInstagram,
  FaLightbulb,
  FaLinkedinIn,
  FaPeopleArrows,
  FaPhone,
  FaRegGem,
  FaShieldHalved,
  FaWhatsapp,
} from "react-icons/fa6";
import { EarthContinuitySection } from "./EarthContinuitySection";

const services = [
  {
    code: "UK",
    title: "UK Design Registration",
    description: "Blueprint-grade documentation and CAD-ready filings for design protection in the United Kingdom.",
    icon: FaFileSignature,
  },
  {
    code: "IN",
    title: "Indian Patent",
    description: "Full drafting, prior-art search, and prosecution support for utility patents filed in India.",
    icon: FaLightbulb,
  },
  {
    code: "CA",
    title: "Canadian Copyright",
    description: "Certified copyright registration with seal verification, recognised across Canadian jurisdictions.",
    icon: FaCopyright,
  },
  {
    code: "BK",
    title: "Book Writing & Publication",
    description: "From manuscript to ISBN, editorial support, formatting, and publisher coordination.",
    icon: FaRegGem,
  },
  {
    code: "CF",
    title: "Conference Organising",
    description: "End-to-end academic conference planning, from call for papers to proceedings publication.",
    icon: FaPeopleArrows,
  },
  {
    code: "API",
    title: "API Score Enhancement",
    description: "Strategic guidance on publications, patents, and citations to strengthen academic credibility.",
    icon: FaShieldHalved,
  },
];

const benefits = [
  "End-to-end services with complete responsibility from idea generation to the official government registration certificate",
  "100% service guarantee with full refund if the official registration certificate is not received, subject to applicable terms and conditions",
  "Professional documentation for researchers and academicians",
  "Faculty-centric guidance across IPR and publication milestones",
  "International patent filing network aligned with global jurisdictions",
  "Clear process, reliable communication and premium execution",
];

const process = [
  "Free Consultation",
  "Novel Title Finalization",
  "Design Preparation",
  "Official Filing with the Government IPO",
  "Government Registration Certificate",
];

const testimonials = [
  {
    name: "Dr. Dharmendra",
    service: "UK Design Registration",
    quote:
      "I had a great experience working with Shikshan Mandal. The team guided me from title finalization to filing with complete professionalism. Their knowledge of intellectual property and prompt communication made the entire process hassle-free. Highly recommended for UK Design Registration services.",
  },
  {
    name: "Dr. Rajesh Sharma",
    service: "Customer Support",
    quote:
      "Outstanding service and excellent customer support. The experts explained every step clearly and completed the process within the promised timeline. I appreciate their dedication and professionalism.",
  },
  {
    name: "Prof. Amit Kumar",
    service: "Design Registration",
    quote:
      "Shikshan Mandal has a highly experienced team. Their end-to-end support, quick response, and transparent process gave me complete confidence throughout my design registration journey. Thank you for the excellent service.",
  },
  {
    name: "Dr. Neha Singh",
    service: "IP Services",
    quote:
      "Excellent experience from consultation to filing. The team was knowledgeable, supportive, and always available whenever I needed assistance. I would definitely recommend Shikshan Mandal to anyone looking for professional IP services.",
  },
];

export function LandingSections() {
  return (
    <>
      <section id="services" className="approved-section approved-section--services">
        <div className="approved-section__heading">
          <p>WHAT WE FILE</p>
          <h2>Every certificate, handled end to end.</h2>
        </div>
        <div className="approved-service-grid">
          {services.map((service) => {
            const Icon = service.icon;

            return (
            <article key={service.title} className="approved-card">
              <div className="approved-card__top">
                <Icon aria-hidden="true" />
                <span>{service.code}</span>
              </div>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
            </article>
            );
          })}
        </div>
      </section>

      <section id="about-us" className="approved-section approved-section--benefits">
        <div className="approved-split">
          <div>
            <p className="approved-eyebrow">Why Shikshan Mandal</p>
            <h2>Built for innovation, IPR trust and measurable academic growth.</h2>
          </div>
          <div className="approved-benefits">
            {benefits.map((benefit) => (
              <div key={benefit}>
                <FaCheck aria-hidden="true" />
                <span>{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="process" className="approved-section approved-section--process">
        <div className="approved-section__heading">
          <p>PROCESS</p>
          <h2>A clear path from consultation to protected intellectual property.</h2>
        </div>
        <div className="approved-process">
          {process.map((step, index) => (
            <div key={step} className="approved-process__step">
              <strong>{String(index + 1).padStart(2, "0")}</strong>
              <span>{step}</span>
            </div>
          ))}
        </div>
      </section>

      <section id="testimonials" className="approved-section approved-section--testimonials">
        <div className="approved-section__heading approved-section__heading--testimonials">
          <p>TESTIMONIALS</p>
          <h2>Customer feedback from our registration journey.</h2>
          <span>Professional support, transparent communication and dependable filing execution.</span>
        </div>
        <div className="approved-testimonial-slider" aria-label="Customer feedback carousel">
          <div className="approved-testimonial-track">
            {[...testimonials, ...testimonials].map((testimonial, index) => (
              <article className="approved-testimonial-card" key={`${testimonial.name}-${index}`}>
                <div className="approved-testimonial-card__top">
                  <FaRegGem aria-hidden="true" />
                  <span>{testimonial.service}</span>
                </div>
                <blockquote>{testimonial.quote}</blockquote>
                <footer>{testimonial.name}</footer>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="consultation" className="approved-cta">
        <div>
          <div className="approved-cta__icons" aria-hidden="true">
            <FaShieldHalved />
            <FaCopyright />
            <FaLightbulb />
            <FaPeopleArrows />
          </div>
          <h2>Ready to strengthen your profile with trusted IPR support?</h2>
          <a href="#services">
            Explore Services <FaArrowRight aria-hidden="true" />
          </a>
        </div>
      </section>

      <EarthContinuitySection />

      <footer id="contact-us" className="approved-contact-footer" aria-label="Shikshan Mandal contact links">
        <div className="approved-contact-footer__copy">
          <p>Get in touch</p>
          <h2>Start with a free consultation.</h2>
          <span>Tell us about your invention, manuscript, or academic goal. We will respond with clear next steps.</span>
          <div className="approved-contact-footer__social" aria-label="Social links">
            <a href="https://www.facebook.com/ShikshanMandalcollege" target="_blank" rel="noreferrer" aria-label="Open Shikshan Mandal on Facebook">
              <FaFacebookF aria-hidden="true" />
            </a>
            <a href="https://www.linkedin.com/company/142901538/" target="_blank" rel="noreferrer" aria-label="Open Shikshan Mandal on LinkedIn">
              <FaLinkedinIn aria-hidden="true" />
            </a>
            <a href="https://www.instagram.com/shikshanmandalcollege?igsh=c2VyMmI2Z2M3cDlr" target="_blank" rel="noreferrer" aria-label="Open Shikshan Mandal on Instagram">
              <FaInstagram aria-hidden="true" />
            </a>
          </div>
        </div>
        <div className="approved-contact-footer__links">
          <a href="https://wa.me/919557332408" target="_blank" rel="noreferrer" aria-label="Open WhatsApp chat with Shikshan Mandal">
            <FaWhatsapp aria-hidden="true" />
            <span>WhatsApp - Chat now</span>
          </a>
          <a
            href="https://mail.google.com/mail/?view=cm&fs=1&to=shikshanmandaledu@gmail.com"
            target="_blank"
            rel="noreferrer"
            aria-label="Email Shikshan Mandal"
          >
            <FaEnvelope aria-hidden="true" />
            <span>Email - shikshanmandaledu@gmail.com</span>
          </a>
          <a href="tel:+919557332408" aria-label="Call Shikshan Mandal">
            <FaPhone aria-hidden="true" />
            <span>Call Now - +91 95573 32408</span>
          </a>
        </div>
      </footer>
    </>
  );
}
