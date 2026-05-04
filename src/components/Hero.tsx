"use client";

import Link from "next/link";
import { ArrowRight, Mail } from "lucide-react";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const magneticBtnRef = useRef<HTMLAnchorElement>(null);

  const splitText = (text: string) => {
    return text.split("").map((char, i) => (
      <span key={i} className="inline-block whitespace-pre char">
        {char}
      </span>
    ));
  };

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const tl = gsap.timeline();

      // Masking reveal effect
      tl.from(".name .char", {
        opacity: 0,
        y: 80,
        rotateX: -90,
        stagger: 0.04,
        duration: 1.2,
        ease: "power4.out",
      })
      .from(".tagline .char", {
        opacity: 0,
        y: 20,
        stagger: 0.02,
        duration: 0.8,
        ease: "power3.out",
      }, "-=0.8")
      .from(".fade-in-item", {
        opacity: 0,
        y: 30,
        stagger: 0.2,
        duration: 1,
        ease: "power3.out",
      }, "-=0.6");

      // Smooth Parallax for bg and content
      gsap.to(".hero-parallax", {
        y: 100,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
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
        offset: 0,
        duration: 1.5,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
      });
    } else {
      document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleMagneticMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (window.matchMedia("(hover: none)").matches) return;

    const btn = magneticBtnRef.current;
    if (!btn) return;

    const { clientX, clientY } = e;
    const { left, top, width, height } = btn.getBoundingClientRect();
    
    const x = clientX - (left + width / 2);
    const y = clientY - (top + height / 2);

    gsap.to(btn, {
      x: x * 0.35,
      y: y * 0.35,
      duration: 0.4,
      ease: "power2.out",
    });
    
    const arrow = btn.querySelector(".arrow-icon");
    if (arrow) {
      gsap.to(arrow, {
        x: x * 0.1,
        y: y * 0.1,
        duration: 0.4,
        ease: "power2.out",
      });
    }
  };

  const handleMagneticLeave = () => {
    gsap.to(magneticBtnRef.current, {
      x: 0,
      y: 0,
      duration: 0.8,
      ease: "elastic.out(1, 0.3)",
    });
    const arrow = magneticBtnRef.current?.querySelector(".arrow-icon");
    if (arrow) {
      gsap.to(arrow, { x: 0, y: 0, duration: 0.8, ease: "elastic.out(1, 0.3)" });
    }
  };

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative w-full h-screen flex flex-col items-center justify-center px-6 md:px-12 text-center overflow-hidden"
    >
      <div className="hero-parallax z-10 max-w-5xl">
        <h2 className="tagline text-accent font-medium mb-4 tracking-[0.3em] uppercase text-xs md:text-sm overflow-hidden py-2">
          {splitText("Fullstack Developer")}
        </h2>
        
        <div className="overflow-hidden py-4">
          <h1 className="name text-6xl md:text-[clamp(4.5rem,10vw,9rem)] font-bold font-display leading-[0.85] mb-8">
            {splitText("[ANDRE]")}
          </h1>
        </div>
        
        <div className="max-w-3xl mx-auto">
          <p className="fade-in-item text-text-secondary text-lg md:text-xl mb-12 leading-relaxed">
            Crafting high-performance digital architectures with precise aesthetics. 
            Focused on scalability and user-centric interaction.
          </p>
          
          <div className="fade-in-item flex flex-col sm:flex-row gap-6 justify-center items-center">
            <a
              href="#projects"
              ref={magneticBtnRef}
              onClick={handleScrollToProjects}
              onMouseMove={handleMagneticMove}
              onMouseLeave={handleMagneticLeave}
              className="group flex items-center gap-3 bg-text-primary text-background px-10 py-5 rounded-full font-bold transition-shadow hover:shadow-[0_0_30px_rgba(241,245,249,0.3)]"
            >
              Selected Work
              <ArrowRight className="arrow-icon w-5 h-5 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="mailto:[EMAIL]"
              className="group flex items-center gap-3 bg-surface border border-border px-10 py-5 rounded-full font-bold text-text-primary transition-all hover:bg-border hover:border-accent/30"
            >
              <Mail className="w-5 h-5 group-hover:scale-110 transition-transform" />
              Get in Touch
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
