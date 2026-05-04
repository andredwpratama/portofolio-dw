"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    setIsTouchDevice(window.matchMedia("(hover: none)").matches);
  }, []);

  useGSAP(() => {
    if (typeof window === "undefined" || !cursorRef.current || !followerRef.current || isTouchDevice) return;

    // Quick setters for performance
    const xCursor = gsap.quickTo(cursorRef.current, "x", { duration: 0, ease: "none" });
    const yCursor = gsap.quickTo(cursorRef.current, "y", { duration: 0, ease: "none" });
    const xFollower = gsap.quickTo(followerRef.current, "x", { duration: 0.4, ease: "power3" });
    const yFollower = gsap.quickTo(followerRef.current, "y", { duration: 0.4, ease: "power3" });

    const moveCursor = (e: MouseEvent) => {
      xCursor(e.clientX);
      yCursor(e.clientY);
      xFollower(e.clientX);
      yFollower(e.clientY);
    };

    const handleHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isLink = !!target.closest("a, button, [role='button']");
      
      gsap.to(followerRef.current, {
        scale: isLink ? 2 : 1,
        backgroundColor: isLink ? "rgba(125, 211, 252, 0.1)" : "transparent",
        duration: 0.3,
      });
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", handleHover);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleHover);
    };
  }, [isTouchDevice]);

  if (isTouchDevice) return null;

  return (
    <>
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-2 h-2 bg-accent rounded-full pointer-events-none z-[100] -translate-x-1/2 -translate-y-1/2 hidden md:block"
      />
      <div
        ref={followerRef}
        className="fixed top-0 left-0 w-10 h-10 border border-accent/30 rounded-full pointer-events-none z-[99] -translate-x-1/2 -translate-y-1/2 hidden md:block"
      />
      <style jsx global>{`
        @media (hover: hover) {
          body {
            cursor: none;
          }
          a, button {
            cursor: none;
          }
        }
      `}</style>
    </>
  );
}
