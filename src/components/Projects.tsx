"use client";

import { PROJECTS } from "@/lib/constants";
import { ExternalLink, Github } from "lucide-react";
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

      // Header Reveal
      gsap.from(".projects-header > *", {
        opacity: 0,
        y: 40,
        stagger: 0.2,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".projects-header",
          start: "top 85%",
        },
      });

      // Cards Stagger Reveal with Scale
      gsap.from(".project-card", {
        opacity: 0,
        y: 100,
        scale: 0.95,
        stagger: 0.1,
        duration: 1.2,
        ease: "power4.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        },
      });

      // Tilt-like effect on scroll for cards
      gsap.utils.toArray(".project-card").forEach((card: any, i) => {
        gsap.to(card, {
          y: i % 2 === 0 ? -40 : -80,
          ease: "none",
          scrollTrigger: {
            trigger: card,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="w-full py-40 px-6 md:px-12 bg-background relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        <div className="projects-header mb-24 space-y-6 text-right flex flex-col items-end">
          <h2 className="text-5xl md:text-8xl font-bold font-display tracking-tighter leading-none">
            Selected <span className="text-accent italic">Projects</span>
          </h2>
          <p className="text-text-secondary max-w-xl text-lg md:text-xl font-medium">
            Merging technical performance with intuitive design. 
            Each project is a deep dive into scalable architecture.
          </p>
        </div>

        <div 
          ref={containerRef}
          className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20"
        >
          {PROJECTS.map((project, idx) => (
            <div
              key={idx}
              className="project-card group bg-surface/50 backdrop-blur-sm border border-border/50 rounded-2xl overflow-hidden flex flex-col h-full transition-colors hover:border-accent/40"
            >
              <div className="aspect-[16/10] bg-[#1a1a24] relative overflow-hidden">
                {project.image ? (
                  <div className="project-image w-full h-full relative transition-transform duration-700 ease-out group-hover:scale-110">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <div className="project-image absolute inset-0 flex items-center justify-center text-border font-display text-7xl font-bold uppercase tracking-tighter opacity-10">
                    {project.title.split(" ")[0]}
                  </div>
                )}
                
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>

              <div className="p-10 flex flex-col flex-grow">
                <div className="flex flex-wrap gap-3 mb-8">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="text-[10px] uppercase tracking-[0.2em] font-black text-accent bg-accent/10 px-3 py-1.5 rounded-full"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <h3 className="text-3xl font-bold mb-4 group-hover:text-accent transition-colors duration-300">
                  {project.title}
                </h3>
                <p className="text-text-secondary mb-12 text-lg leading-relaxed flex-grow">
                  {project.description}
                </p>

                <div className="flex gap-10 items-center mt-auto">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2.5 text-sm font-black uppercase tracking-widest hover:text-accent transition-all group/link"
                  >
                    <Github className="w-5 h-5 transition-transform group-hover/link:-translate-y-1" />
                    <span className="relative">
                      Repo
                      <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-accent transition-all duration-300 group-hover/link:w-full" />
                    </span>
                  </a>
                  {project.demo && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2.5 text-sm font-black uppercase tracking-widest hover:text-accent transition-all group/link"
                    >
                      <ExternalLink className="w-5 h-5 transition-transform group-hover/link:-translate-y-1" />
                      <span className="relative">
                        Launch
                        <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-accent transition-all duration-300 group-hover/link:w-full" />
                      </span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
