"use client";

import { EXPERIENCE, BIO } from "@/lib/constants";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Experience() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      // Header — slam down with bounce
      gsap.from(".exp-header", {
        opacity: 0,
        y: -50,
        scale: 1.1,
        duration: 1,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: ".exp-header",
          start: "top 85%",
        },
      });

      // Timeline line draws in (grow from top)
      gsap.from(".timeline-line", {
        scaleY: 0,
        transformOrigin: "top",
        duration: 1.5,
        ease: "power4.out",
        scrollTrigger: {
          trigger: ".timeline-container",
          start: "top 80%",
        },
      });

      // Timeline items — spring in from left with rotation
      const items = sectionRef.current?.querySelectorAll(".timeline-item");
      items?.forEach((item, i) => {
        gsap.from(item, {
          opacity: 0,
          x: -100,
          rotate: -3,
          scale: 0.9,
          duration: 1,
          ease: "elastic.out(1, 0.6)",
          scrollTrigger: {
            trigger: item,
            start: "top 88%",
          },
        });
      });

      // Diamond nodes — pop and spin in
      gsap.from(".timeline-node", {
        opacity: 0,
        scale: 0,
        rotation: 180,
        stagger: 0.2,
        duration: 0.8,
        ease: "back.out(3)",
        scrollTrigger: {
          trigger: ".timeline-container",
          start: "top 80%",
        },
      });

      // Diamond nodes pulse continuously
      gsap.to(".timeline-node", {
        scale: 1.15,
        duration: 1.2,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        stagger: 0.4,
      });

      // Sidebar cards — stagger bounce from right
      const sideCards = sectionRef.current?.querySelectorAll(".sidebar-card");
      sideCards?.forEach((card, i) => {
        gsap.from(card, {
          opacity: 0,
          x: 80,
          rotate: i % 2 === 0 ? 3 : -3,
          scale: 0.85,
          duration: 0.9,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: card,
            start: "top 88%",
          },
        });
      });

      // Description bullet points stagger in
      gsap.from(".exp-bullet", {
        opacity: 0,
        x: -20,
        stagger: 0.05,
        duration: 0.5,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".timeline-container",
          start: "top 70%",
        },
      });

      // Tech tags pop
      gsap.from(".exp-tech-tag", {
        opacity: 0,
        scale: 0,
        stagger: 0.03,
        duration: 0.4,
        ease: "back.out(3)",
        scrollTrigger: {
          trigger: ".timeline-container",
          start: "top 65%",
        },
      });
    },
    { scope: sectionRef }
  );

  const handleScrollToContact = (e: React.MouseEvent) => {
    e.preventDefault();
    const lenis = (window as any).lenis;
    if (lenis) {
      lenis.scrollTo("#contact", {
        offset: -80,
        duration: 1.5,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });
    } else {
      document
        .querySelector("#contact")
        ?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="w-full px-gutter max-w-[1440px] mx-auto py-xl"
    >
      <div className="flex flex-col lg:flex-row gap-lg">
        {/* Main Timeline Column */}
        <div className="lg:w-2/3 flex flex-col gap-lg">
          <header className="exp-header mb-md">
            <h2 className="font-display text-headline-lg-mobile md:text-headline-lg text-on-surface uppercase drop-shadow-[4px_4px_0px_rgba(0,0,0,1)]">
              The Grid.
            </h2>
            <p className="font-body text-body-lg text-on-surface-variant mt-sm max-w-2xl border-l-4 border-primary pl-sm">
              A raw feed of my professional cycles. Building, breaking, and
              deploying across the full stack. No fluff, just commits.
            </p>
          </header>

          {/* Timeline */}
          <div className="timeline-container relative pl-sm md:pl-lg ml-sm md:ml-0 flex flex-col gap-xl">
            {/* Animated timeline line */}
            <div className="timeline-line absolute left-0 top-0 bottom-0 w-[4px] bg-on-surface" />

            {EXPERIENCE.map((exp, idx) => (
              <div key={idx} className="timeline-item relative pl-sm md:pl-md">
                {/* Timeline Node (diamond) */}
                <div
                  className={`timeline-node absolute -left-[14px] md:-left-[14px] top-2 w-8 h-8 ${exp.nodeColor} border-4 border-on-surface neu-shadow rotate-45`}
                />

                {/* Card */}
                <div
                  className={`${exp.cardColor} neu-border neu-shadow-lg p-md neu-card-hover`}
                >
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-sm border-b-2 border-on-surface pb-sm gap-sm">
                    <div>
                      <h3 className="font-display text-headline-sm md:text-headline-md text-on-surface uppercase">
                        {exp.role}
                      </h3>
                      <p className="font-display text-label-xl text-secondary uppercase mt-xs">
                        {exp.company}
                      </p>
                    </div>
                    <div className="bg-on-surface text-surface-container-lowest font-body px-sm py-xs neu-border-thin text-body-md whitespace-nowrap">
                      {exp.period}
                    </div>
                  </div>

                  <ul className="font-body text-body-md text-on-surface-variant list-none space-y-sm">
                    {exp.description.map((desc, i) => (
                      <li key={i} className="exp-bullet flex items-start gap-xs">
                        <span className="material-symbols-outlined text-primary mt-[2px] shrink-0">
                          terminal
                        </span>
                        <span>{desc}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-md flex flex-wrap gap-xs">
                    {exp.tech.map((t) => (
                      <span
                        key={t}
                        className="exp-tech-tag tag-hover bg-tertiary-container border-2 border-on-surface px-xs py-[2px] font-display text-label-md uppercase"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <aside className="sidebar-container lg:w-1/3 flex flex-col gap-lg">
          {/* Bio Card */}
          <div className="sidebar-card neu-card-hover neu-border neu-shadow-lg bg-surface-container-lowest relative overflow-hidden">
            {/* Decorative top bar */}
            <div className="h-6 bg-secondary border-b-4 border-on-surface w-full flex items-center px-xs gap-xs">
              <div className="w-3 h-3 bg-on-surface rounded-full" />
              <div className="w-3 h-3 bg-on-surface rounded-full" />
              <div className="w-3 h-3 bg-on-surface rounded-full" />
            </div>
            <div className="p-md">
              <h3 className="font-display text-headline-sm text-on-surface uppercase mb-sm">
                Whoami
              </h3>
              <p className="font-body text-body-md text-on-surface-variant mb-sm">
                {BIO.intro}
              </p>
              <p className="font-body text-body-md text-on-surface-variant">
                {BIO.funFact}
              </p>
            </div>
          </div>

          {/* Facts Code Block */}
          <div className="sidebar-card neu-card-hover bg-on-surface neu-border neu-shadow-pink p-md font-body text-body-md text-tertiary-fixed">
            <div className="flex justify-between items-center mb-sm border-b-2 border-outline pb-xs">
              <span className="text-outline uppercase font-display text-label-md">
                facts.json
              </span>
              <span className="material-symbols-outlined text-outline">
                data_object
              </span>
            </div>
            <pre className="whitespace-pre-wrap text-tertiary-fixed-dim">
              <code>{JSON.stringify(BIO.facts, null, 2)}</code>
            </pre>
          </div>

          {/* CTA Banner */}
          <div className="sidebar-card neu-card-hover bg-primary-container neu-border neu-shadow-lg p-md flex flex-col items-center text-center">
            <span className="material-symbols-outlined text-headline-md text-on-surface mb-xs cta-bolt">
              bolt
            </span>
            <h3 className="font-display text-headline-sm text-on-surface uppercase mb-xs">
              Ready to build?
            </h3>
            <p className="font-body text-body-md text-on-surface mb-sm">
              Let&apos;s construct something that doesn&apos;t suck.
            </p>
            <button
              onClick={handleScrollToContact}
              className="neu-btn bg-secondary text-on-secondary font-display text-label-xl uppercase px-lg py-sm w-full border-4"
            >
              Ping Me
            </button>
          </div>
        </aside>
      </div>
    </section>
  );
}
