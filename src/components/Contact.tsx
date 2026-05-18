"use client";

import { SOCIAL_LINKS } from "@/lib/constants";
import { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Contact() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleExecute = () => {
    const { name, email, message } = formData;
    const subject = "ping portofolio dw";
    const body = `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`;
    
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=andredwpratama@gmail.com&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
    window.open(gmailUrl, "_blank");
  };

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      // Header — drops in with wobble
      gsap.from(".contact-header", {
        opacity: 0,
        y: -80,
        rotate: 8,
        scale: 0.8,
        duration: 1.2,
        ease: "elastic.out(1, 0.4)",
        scrollTrigger: {
          trigger: ".contact-header",
          start: "top 88%",
        },
      });

      // Terminal form — slides in from below with bounce
      gsap.from(".contact-form", {
        opacity: 0,
        y: 80,
        rotate: -2,
        scale: 0.95,
        duration: 1,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: ".contact-form",
          start: "top 88%",
        },
      });

      // Terminal dots blink in
      gsap.from(".terminal-dot", {
        opacity: 0,
        scale: 0,
        stagger: 0.1,
        duration: 0.4,
        ease: "back.out(3)",
        scrollTrigger: {
          trigger: ".contact-form",
          start: "top 85%",
        },
      });

      // Form fields stagger in
      gsap.from(".form-field", {
        opacity: 0,
        x: -30,
        stagger: 0.12,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".contact-form",
          start: "top 80%",
        },
      });

      // Execute button pops
      gsap.from(".execute-btn", {
        opacity: 0,
        scale: 0.5,
        duration: 0.6,
        ease: "back.out(3)",
        scrollTrigger: {
          trigger: ".execute-btn",
          start: "top 92%",
        },
      });

      // Social cards — bounce in from right with rotation
      const socials = sectionRef.current?.querySelectorAll(".social-card");
      socials?.forEach((card, i) => {
        gsap.from(card, {
          opacity: 0,
          x: 100,
          rotate: i % 2 === 0 ? 6 : -6,
          scale: 0.8,
          duration: 0.9,
          ease: "elastic.out(1, 0.5)",
          delay: i * 0.15,
          scrollTrigger: {
            trigger: ".social-cards",
            start: "top 88%",
          },
        });
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="w-full px-gutter max-w-[1440px] mx-auto py-xl flex flex-col items-center gap-lg"
    >
      {/* Header */}
      <div className="contact-header text-center w-full max-w-4xl neu-border bg-tertiary-container p-md neu-shadow-lg -rotate-1 transform mb-md">
        <h2 className="font-display text-headline-lg-mobile md:text-headline-lg uppercase text-on-surface mb-sm">
          Ping Me
        </h2>
        <p className="font-body text-body-lg text-on-surface">
          Got a project? A question? A wild idea? Drop it in the terminal below.
        </p>
      </div>

      {/* Layout Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter w-full">
        {/* Contact Form */}
        <div className="contact-form md:col-span-8 bg-surface neu-border p-md md:p-lg neu-shadow-lg flex flex-col gap-md z-10 relative">
          {/* Decorative top bar */}
          <div className="absolute top-0 left-0 w-full h-8 border-b-2 border-on-surface flex items-center px-sm gap-xs bg-surface-container-high">
            <div className="terminal-dot w-3 h-3 rounded-full bg-error neu-border-thin" />
            <div className="terminal-dot w-3 h-3 rounded-full bg-primary-container neu-border-thin" />
            <div className="terminal-dot w-3 h-3 rounded-full bg-tertiary-container neu-border-thin" />
            <span className="ml-auto font-body text-[12px] opacity-70 uppercase">
              terminal_contact.sh
            </span>
          </div>

          <div className="form-field pt-sm">
            <label className="block font-display text-label-xl uppercase mb-xs text-on-surface">
              Your Identity
            </label>
            <input
              type="text"
              placeholder="name or alias"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full bg-surface neu-border-thin p-sm font-body text-body-lg text-on-surface placeholder:text-outline neu-focus transition-shadow"
            />
          </div>

          <div className="form-field">
            <label className="block font-display text-label-xl uppercase mb-xs text-on-surface">
              Comms Protocol
            </label>
            <input
              type="email"
              placeholder="email@address.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full bg-surface neu-border-thin p-sm font-body text-body-lg text-on-surface placeholder:text-outline neu-focus transition-shadow"
            />
          </div>

          <div className="form-field">
            <label className="block font-display text-label-xl uppercase mb-xs text-on-surface">
              The Payload
            </label>
            <textarea
              rows={5}
              placeholder="echo 'Hello World'"
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="w-full bg-surface neu-border-thin p-sm font-body text-body-lg text-on-surface placeholder:text-outline neu-focus transition-shadow resize-none"
            />
          </div>

          <button
            type="button"
            onClick={handleExecute}
            className="execute-btn neu-btn bg-secondary-container text-on-secondary-container py-sm px-md font-display text-headline-sm uppercase w-full mt-sm"
          >
            Execute{" "}
            <span className="material-symbols-outlined align-middle ml-xs">
              send
            </span>
          </button>
        </div>

        {/* Social Blocks */}
        <div className="social-cards md:col-span-4 flex flex-col justify-center gap-lg h-full">
          {SOCIAL_LINKS.map((link, idx) => {
            const offsets = [
              "translate-x-2 md:translate-x-0",
              "-translate-x-2 md:translate-x-4",
              "translate-x-4 md:translate-x-2",
            ];
            return (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`social-card neu-card-hover block ${link.color} neu-border p-md neu-shadow group ${link.hoverColor} ${offsets[idx] || ""}`}
              >
                <div className="flex items-center justify-between mb-sm border-b-2 border-on-surface pb-xs">
                  <span className="font-display text-headline-sm uppercase text-on-surface">
                    {link.name}
                  </span>
                  <span className="material-symbols-outlined text-[32px] text-on-surface group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform">
                    {link.icon}
                  </span>
                </div>
                <p className="font-body text-body-md text-on-surface-variant">
                  {link.description}
                </p>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
