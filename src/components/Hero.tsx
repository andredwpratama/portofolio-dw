"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const tl = gsap.timeline({ delay: 0.8 });

      // Headline — bouncy entrance with scale
      tl.from(".hero-headline", {
        opacity: 0,
        y: 80,
        scale: 0.9,
        rotate: -2,
        duration: 1,
        ease: "elastic.out(1, 0.5)",
      });

      // Highlight box pops in
      tl.from(
        ".hero-highlight",
        {
          opacity: 0,
          scale: 0,
          rotate: 6,
          duration: 0.6,
          ease: "back.out(3)",
        },
        "-=0.5"
      );

      // Description slides in
      tl.from(
        ".hero-desc",
        {
          opacity: 0,
          x: -50,
          skewX: -3,
          duration: 0.8,
          ease: "power4.out",
        },
        "-=0.3"
      );

      // Buttons pop in with staggered bounce
      tl.from(
        ".hero-btn",
        {
          opacity: 0,
          scale: 0,
          rotation: -10,
          stagger: 0.12,
          duration: 0.6,
          ease: "back.out(3)",
        },
        "-=0.4"
      );

      // Image wrapper — playful entrance with bounce + rotation
      tl.from(
        ".hero-image-wrapper",
        {
          opacity: 0,
          scale: 0.6,
          rotate: -8,
          duration: 1.2,
          ease: "elastic.out(1, 0.5)",
        },
        "-=0.6"
      );

      // Badge bounces in
      tl.from(
        ".hero-badge",
        {
          opacity: 0,
          scale: 0,
          rotation: 20,
          duration: 0.8,
          ease: "elastic.out(1.2, 0.4)",
        },
        "-=0.4"
      );

      // Continuous floating bob on the image (idle animation)
      gsap.to(".hero-image-wrapper", {
        y: -12,
        rotate: 1.5,
        duration: 3,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        delay: 2,
      });

      // Text parallax (slower)
      gsap.to(".hero-text-col", {
        y: -30,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 2,
        },
      });
    },
    { scope: containerRef }
  );

  const handleScrollToProjects = (e: React.MouseEvent) => {
    e.preventDefault();
    const lenis = (window as any).lenis;
    if (lenis) {
      lenis.scrollTo("#projects", {
        offset: -80,
        duration: 1.5,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });
    } else {
      document
        .querySelector("#projects")
        ?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="hero"
      ref={containerRef}
      className="w-full px-gutter max-w-[1440px] mx-auto overflow-hidden"
    >
      <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter mt-lg mb-xl items-center">
        {/* Text Column */}
        <div className="hero-text-col col-span-1 md:col-span-7 flex flex-col gap-sm">
          <h1 className="hero-headline font-display text-headline-lg-mobile md:text-headline-lg uppercase text-on-surface">
            Crafting{" "}
            <span className="hero-highlight text-primary-container bg-on-surface px-2 neu-border inline-block hover:rotate-2 hover:scale-105 transition-transform duration-200 cursor-default">
              Digital Chaos
            </span>{" "}
            Into Order
          </h1>
          <p className="hero-desc font-body text-body-lg text-on-surface-variant max-w-2xl mt-sm border-l-4 border-on-surface pl-sm">
            Fullstack developer specializing in building robust, scalable
            applications. I don&apos;t just write code; I architect solutions
            that withstand the test of production.
          </p>
          <div className="flex flex-wrap gap-sm mt-md">
            <button
              onClick={handleScrollToProjects}
              className="hero-btn neu-btn bg-secondary text-on-secondary font-display text-label-xl uppercase px-md py-sm hover:rotate-1 transition-transform"
            >
              View Projects
            </button>
            <a
              href="https://github.com/andredwpratama"
              target="_blank"
              rel="noopener noreferrer"
              className="hero-btn neu-btn bg-surface text-on-surface font-display text-label-xl uppercase px-md py-sm flex items-center gap-xs hover:-rotate-1 transition-transform"
            >
              GitHub{" "}
              <span className="material-symbols-outlined align-middle">
                code
              </span>
            </a>
          </div>
        </div>

        {/* Image Column */}
        <div className="hero-parallax col-span-1 md:col-span-5 flex justify-center mt-lg md:mt-0 relative">
          {/* Decorative badge */}
          <div className="hero-badge absolute -top-4 -right-2 z-20 bg-secondary neu-border px-sm py-xs font-display text-label-xl uppercase rotate-6 neu-shadow hover:rotate-12 hover:scale-110 transition-transform duration-200 cursor-default">
            ⚡ Open to Work
          </div>
          <div className="hero-image-wrapper w-full aspect-square bg-surface neu-border neu-shadow-lg overflow-hidden relative">
            <Image
              src="/projects/hero.png"
              alt="Developer Setup"
              fill
              className="object-cover opacity-100 contrast-125"
              priority
            />
            <div className="absolute inset-0 neu-border pointer-events-none" />
          </div>
        </div>
      </div>
    </section>
  );
}
