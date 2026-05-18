"use client";

import Link from "next/link";
import { NAV_LINKS } from "@/lib/constants";
import { useEffect, useState } from "react";

interface NavbarProps {
  activeSection: string;
}

export default function Navbar({ activeSection }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    setMobileOpen(false);
    const lenis = (window as any).lenis;
    if (lenis) {
      lenis.scrollTo(href, {
        offset: -80,
        duration: 1.5,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });
    } else {
      document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-background border-b-4 border-on-surface neu-shadow w-full">
      <div className="flex justify-between items-center w-full px-gutter py-sm max-w-[1440px] mx-auto">
        {/* Logo */}
        <Link
          href="#hero"
          onClick={(e) => handleNavClick(e, "#hero")}
          className="font-display text-headline-sm font-black uppercase text-on-surface tracking-tighter hover:text-tertiary transition-colors"
        >
          [ADP-DEV]
        </Link>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-md">
          {NAV_LINKS.map((link) => {
            const id = link.href.replace("#", "");
            const isActive = activeSection === id;

            return (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`uppercase font-display text-label-xl transition-all hover:text-tertiary hover:translate-x-[2px] hover:translate-y-[2px] ${isActive
                  ? "text-tertiary underline decoration-4 underline-offset-4 font-bold"
                  : "text-on-surface"
                  }`}
              >
                {link.label}
              </a>
            );
          })}
        </div>

        {/* Hire Me Button (Desktop) */}
        <a
          href="#contact"
          onClick={(e) => handleNavClick(e, "#contact")}
          className="hidden md:block neu-btn bg-primary-container text-on-primary-container px-sm py-xs font-display text-label-xl uppercase"
        >
          Contact Me
        </a>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden neu-btn bg-surface px-sm py-xs"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          <span className="material-symbols-outlined block">
            {mobileOpen ? "close" : "menu"}
          </span>
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden border-t-4 border-on-surface bg-background px-gutter py-md flex flex-col gap-sm">
          {NAV_LINKS.map((link) => {
            const id = link.href.replace("#", "");
            const isActive = activeSection === id;
            return (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`uppercase font-display text-label-xl py-xs border-b-2 border-on-surface transition-all ${isActive ? "text-tertiary font-bold" : "text-on-surface"
                  }`}
              >
                {link.label}
              </a>
            );
          })}
          <a
            href="#contact"
            onClick={(e) => handleNavClick(e, "#contact")}
            className="neu-btn bg-primary-container text-on-primary-container px-sm py-xs font-display text-label-xl uppercase text-center mt-sm"
          >
            Contact Me
          </a>
        </div>
      )}
    </nav>
  );
}
