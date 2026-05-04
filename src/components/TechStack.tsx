"use client";

import { TECH_STACK } from "@/lib/constants";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function TechStack() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      // Title Reveal
      gsap.from(".stack-title", {
        opacity: 0,
        y: 30,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".stack-title",
          start: "top 90%",
        },
      });

      // Staggered reveal for columns
      gsap.from(".stack-column", {
        opacity: 0,
        y: 50,
        stagger: 0.1,
        duration: 1.2,
        ease: "power4.out",
        scrollTrigger: {
          trigger: ".stack-grid",
          start: "top 80%",
        },
      });

      // Individual items hover-like entrance
      gsap.from(".stack-item", {
        opacity: 0,
        scale: 0.9,
        x: -10,
        stagger: 0.02,
        duration: 0.8,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: ".stack-grid",
          start: "top 75%",
        },
      });

      // Progress bar fill
      const bars = sectionRef.current?.querySelectorAll(".progress-fill");
      bars?.forEach((bar) => {
        const targetWidth = (bar as HTMLElement).dataset.proficiency;
        gsap.to(bar, {
          width: targetWidth + "%",
          duration: 1.5,
          ease: "expo.out",
          scrollTrigger: {
            trigger: bar,
            start: "top 90%",
          },
        });
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      id="stack"
      ref={sectionRef}
      className="w-full py-40 px-6 md:px-12 bg-surface/30 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        <div className="stack-title mb-24 space-y-6 text-right flex flex-col items-end">
          <h2 className="text-5xl md:text-8xl font-bold font-display tracking-tighter leading-none">
            Technical <span className="text-accent italic">Arsenal</span>
          </h2>
          <p className="text-text-secondary max-w-xl text-lg md:text-xl font-medium">
            A curated list of technologies I leverage to build 
            future-proof digital solutions.
          </p>
        </div>

        <div className="stack-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-16 gap-y-24 md:gap-x-24">
          {Object.entries(TECH_STACK).map(([category, items]) => (
            <div key={category} className="stack-column space-y-12">
              <h3 className="text-xs font-black uppercase tracking-[0.4em] text-accent/50 flex items-center gap-4 capitalize">
                <span className="w-12 h-[1px] bg-accent/20" />
                {category}
              </h3>
              <div className="space-y-10">
                {items.map((tech) => (
                  <div key={tech.name} className="stack-item group cursor-default">
                    <div className="flex justify-between mb-4 text-sm font-black uppercase tracking-widest">
                      <span className="group-hover:text-accent transition-colors duration-300">{tech.name}</span>
                      <span className="text-text-secondary group-hover:text-accent transition-colors duration-300">
                        {tech.proficiency}%
                      </span>
                    </div>
                    <div className="h-[2px] bg-border/50 w-full overflow-hidden">
                      <div
                        className="progress-fill h-full bg-accent relative group-hover:shadow-[0_0_15px_rgba(125,211,252,0.8)] transition-shadow"
                        data-proficiency={tech.proficiency}
                        style={{ width: '0%' }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:animate-[shimmer_2s_infinite]" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx global>{`
        @keyframes shimmer {
          100% {
            transform: translateX(100%);
          }
        }
      `}</style>
    </section>
  );
}
