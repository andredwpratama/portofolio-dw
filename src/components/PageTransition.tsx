"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function PageTransition() {
  const overlayRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);

  useGSAP(() => {
    if (!overlayRef.current) return;

    const tl = gsap.timeline();

    // Text bounces in first
    if (textRef.current) {
      tl.from(textRef.current, {
        scale: 0,
        rotate: -20,
        duration: 0.4,
        ease: "back.out(3)",
      });
    }

    // Then the overlay wipes away
    tl.to(overlayRef.current, {
      scaleY: 0,
      duration: 0.8,
      ease: "expo.inOut",
      transformOrigin: "top",
      delay: 0.3,
    });
  }, []);

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 bg-primary-container z-[9999] pointer-events-none flex items-center justify-center"
      style={{ transform: "scaleY(1)" }}
    >
      <span
        ref={textRef}
        className="font-display text-headline-lg uppercase text-on-surface opacity-30 select-none"
      >
        ⚡
      </span>
    </div>
  );
}
