"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function PageTransition() {
  const overlayRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!overlayRef.current) return;

    // Initial scale is 1 (covering full screen)
    // Wipe to top by scaling Y to 0
    gsap.to(overlayRef.current, {
      scaleY: 0,
      duration: 1,
      ease: "expo.inOut",
      transformOrigin: "top",
      delay: 0.2, // Small delay for browser to settle
    });
  }, []);

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 bg-accent z-[9999] pointer-events-none"
      style={{ transform: "scaleY(1)" }}
    />
  );
}
