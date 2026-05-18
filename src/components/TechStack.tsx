"use client";

import { TECH_STACK } from "@/lib/constants";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Color assignments per category for the neubrutalist feel
const CATEGORY_STYLES: Record<
  string,
  { bg: string; barColor: string; icon: string }
> = {
  frontend: {
    bg: "bg-surface",
    barColor: "bg-primary-container",
    icon: "web",
  },
  backend: {
    bg: "bg-surface",
    barColor: "bg-tertiary-container",
    icon: "dns",
  },
  database: {
    bg: "bg-surface",
    barColor: "bg-secondary-fixed",
    icon: "database",
  },
  ai: {
    bg: "bg-surface",
    barColor: "bg-tertiary-fixed",
    icon: "smart_toy",
  },
  tools: {
    bg: "bg-surface",
    barColor: "bg-on-surface",
    icon: "handyman",
  },
};

export default function TechStack() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      // Header — drops in with playful bounce
      gsap.from(".skills-header", {
        opacity: 0,
        y: -60,
        rotate: 3,
        duration: 1,
        ease: "elastic.out(1, 0.6)",
        scrollTrigger: {
          trigger: ".skills-header",
          start: "top 88%",
        },
      });

      // Columns slam in from different angles
      const columns = sectionRef.current?.querySelectorAll(".skill-column");
      columns?.forEach((col, i) => {
        const directions = [
          { x: -100, rotate: -5 },
          { y: 80, rotate: 2 },
          { x: 100, rotate: 5 },
          { x: -60, rotate: -3 },
          { y: 60, rotate: 3 },
        ];
        const dir = directions[i % directions.length];
        gsap.from(col, {
          opacity: 0,
          ...dir,
          scale: 0.85,
          duration: 0.9,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: col,
            start: "top 88%",
          },
        });
      });

      // Skill items bounce in
      gsap.from(".skill-item", {
        opacity: 0,
        x: -20,
        scale: 0.8,
        stagger: 0.03,
        duration: 0.5,
        ease: "back.out(2.5)",
        scrollTrigger: {
          trigger: ".skills-grid",
          start: "top 75%",
        },
      });

      // Progress bar fill — elastic ease for playful feel
      const bars = sectionRef.current?.querySelectorAll(".progress-fill");
      bars?.forEach((bar, i) => {
        const targetWidth = (bar as HTMLElement).dataset.proficiency;
        gsap.to(bar, {
          width: targetWidth + "%",
          duration: 1.8,
          ease: "elastic.out(1, 0.5)",
          delay: i * 0.04,
          scrollTrigger: {
            trigger: bar,
            start: "top 92%",
          },
        });
      });

      // Category icons pulse continuously
      gsap.to(".category-icon", {
        scale: 1.15,
        duration: 1.5,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        stagger: 0.3,
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="w-full px-gutter max-w-[1440px] mx-auto py-xl"
    >
      {/* Header */}
      <div className="skills-header mb-xl">
        <div className="neu-border bg-tertiary-container neu-shadow-lg p-md inline-block">
          <h2 className="font-display text-headline-lg-mobile md:text-headline-lg uppercase text-on-surface mb-sm">
            Arsenal
          </h2>
          <p className="font-body text-body-lg max-w-2xl border-l-4 border-on-surface pl-sm bg-surface-container p-sm neu-shadow">
            The tools, languages, and frameworks I use to bend the digital world
            to my will. Constantly evolving. Always building.
          </p>
        </div>
      </div>

      {/* Skills Grid */}
      <div className="skills-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-gutter">
        {Object.entries(TECH_STACK).map(([category, items]) => {
          const style = CATEGORY_STYLES[category] || CATEGORY_STYLES.tools;
          return (
            <div key={category} className="skill-column">
              <div className={`${style.bg} neu-border neu-shadow-lg p-md neu-card-hover`}>
                {/* Category Header */}
                <div className="border-b-4 border-on-surface pb-sm mb-md flex items-center justify-between">
                  <h3 className="font-display text-headline-sm uppercase text-on-surface capitalize">
                    {category}
                  </h3>
                  <span
                    className="category-icon material-symbols-outlined text-3xl"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    {style.icon}
                  </span>
                </div>

                {/* Skill Items with Progress Bars */}
                <div className="space-y-md">
                  {items.map((tech) => (
                    <div key={tech.name} className="skill-item group cursor-default">
                      <div className="mb-xs">
                        <span className="font-display text-label-xl uppercase text-on-surface group-hover:text-tertiary group-hover:translate-x-1 transition-all duration-200 inline-block">
                          {tech.name}
                        </span>
                      </div>
                      <div className="h-3 bg-surface-container-highest neu-border-thin w-full overflow-hidden">
                        <div
                          className={`progress-fill h-full ${style.barColor} relative transition-shadow group-hover:shadow-[0_0_8px_rgba(0,0,0,0.3)]`}
                          data-proficiency={tech.proficiency}
                          style={{ width: "0%" }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
