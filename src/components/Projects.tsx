"use client";

import { PROJECTS } from "@/lib/constants";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Image from "next/image";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Projects() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      // Header — playful slide up with bounce
      gsap.from(".projects-header > *", {
        opacity: 0,
        y: 60,
        rotate: -2,
        stagger: 0.15,
        duration: 1,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: ".projects-header",
          start: "top 85%",
        },
      });

      // Cards — alternating entrance directions with bounce
      const cards = containerRef.current?.querySelectorAll(".project-card");
      cards?.forEach((card, i) => {
        const isEven = i % 2 === 0;
        gsap.from(card, {
          opacity: 0,
          x: isEven ? -80 : 80,
          y: 40,
          rotate: isEven ? -4 : 4,
          scale: 0.9,
          duration: 1,
          ease: "back.out(1.4)",
          scrollTrigger: {
            trigger: card,
            start: "top 88%",
          },
        });
      });

      // Tech tags pop in per card
      gsap.from(".tech-tag", {
        opacity: 0,
        scale: 0,
        stagger: 0.02,
        duration: 0.4,
        ease: "back.out(3)",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 70%",
        },
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="w-full px-gutter max-w-[1440px] mx-auto py-xl"
    >
      {/* Header */}
      <div className="projects-header mb-xl">
        <div className="md:max-w-[66%]">
          <h2 className="font-display text-headline-lg-mobile md:text-headline-lg uppercase text-on-surface mb-sm">
            PROJECT{" "}
            <span className="bg-primary-container px-base inline-block">
              GALLERY
            </span>
          </h2>
          <p className="font-body text-body-lg text-on-surface max-w-2xl bg-surface-container-highest p-sm neu-border-thin neu-shadow inline-block">
            A collection of high-impact technical solutions. Built with raw
            power, structural integrity, and uncompromising logic.
          </p>
        </div>
      </div>

      {/* Projects Grid */}
      <div
        ref={containerRef}
        className="grid grid-cols-1 md:grid-cols-2 gap-lg md:gap-gutter items-start"
      >
        {PROJECTS.map((project, idx) => (
          <article
            key={idx}
            className={`project-card neu-card-hover ${project.color} neu-border neu-shadow-lg flex flex-col h-full relative group ${
              idx === 1 ? "md:mt-lg" : ""
            }`}
          >
            {/* Decorative top bar */}
            <div className="h-sm border-b-4 border-on-surface bg-surface-container-highest flex items-center px-base gap-xs">
              <div className="w-3 h-3 bg-on-surface rounded-full" />
              <div className="w-3 h-3 bg-on-surface rounded-full" />
            </div>

            {/* Image */}
            {project.image && (
              <div className="relative w-full aspect-[16/10] border-b-4 border-on-surface overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
            )}

            {/* Content */}
            <div className="p-md flex-grow flex flex-col z-10">
              <h3 className="font-display text-headline-md text-on-surface mb-sm border-b-4 border-on-surface pb-xs uppercase">
                {project.title}
              </h3>
              <p className="font-body text-body-md text-on-surface mb-md flex-grow">
                {project.description}
              </p>

              {/* Tech Tags */}
              <div className="flex flex-wrap gap-xs mb-lg">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className="tech-tag tag-hover bg-primary-container text-on-primary-container neu-border-thin px-base py-xs font-display text-label-md uppercase"
                  >
                    {t}
                  </span>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-sm">
                {project.demo && (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 neu-btn bg-surface text-on-surface px-sm py-base font-display text-label-xl uppercase text-center flex justify-center items-center gap-xs"
                  >
                    Launch{" "}
                    <span className="material-symbols-outlined">
                      arrow_forward
                    </span>
                  </a>
                )}
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="neu-btn bg-surface-container-highest text-on-surface px-sm py-base font-display text-label-md uppercase text-center flex justify-center items-center gap-xs"
                >
                  <span className="material-symbols-outlined">code</span>
                </a>
              </div>
            </div>

            {/* Large background number */}
            <div className="absolute bottom-4 right-4 font-display text-[120px] leading-none opacity-10 text-on-surface pointer-events-none font-black select-none z-0">
              {String(idx + 1).padStart(2, "0")}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
