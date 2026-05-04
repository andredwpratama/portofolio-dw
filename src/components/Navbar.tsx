"use client";

import Link from "next/link";
import { NAV_LINKS } from "@/lib/constants";
import { useEffect, useState } from "react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface NavbarProps {
  activeSection: string;
}

export default function Navbar({ activeSection }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Threshold 10px to avoid flickering at top
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 h-16 z-40 flex items-center px-6 md:px-12 justify-between transition-[background-color,backdrop-filter,border-color,box-shadow] duration-500",
        scrolled 
          ? "glass border-b border-border/50 shadow-lg" 
          : "bg-transparent border-b border-transparent"
      )}
    >
      <Link href="#hero" className="font-display font-bold text-xl tracking-tighter hover:text-accent transition-colors">
        [ANDRE]
      </Link>

      <div className="flex gap-4 md:gap-8 items-center">
        {NAV_LINKS.map((link) => {
          const id = link.href.replace("#", "");
          const isActive = activeSection === id;
          
          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-xs md:text-sm font-bold transition-all relative group",
                isActive ? "text-accent" : "text-text-secondary hover:text-text-primary"
              )}
            >
              {link.label}
              <span 
                className={cn(
                  "absolute -bottom-1 left-0 h-[2px] bg-accent transition-all duration-300",
                  isActive ? "w-full" : "w-0 group-hover:w-full"
                )} 
              />
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
