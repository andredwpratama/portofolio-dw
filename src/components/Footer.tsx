"use client";

import { SOCIAL_LINKS } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="w-full border-t-4 border-on-surface bg-on-surface mt-auto">
      <div className="flex flex-col md:flex-row justify-between items-center px-gutter py-lg gap-md w-full max-w-[1440px] mx-auto">
        <div className="font-display text-headline-sm text-secondary-fixed-dim">
          © 2026 [ADP-DEV] // BUILT WITH NEXT.JS
        </div>
        <div className="flex gap-gutter flex-wrap justify-center">
          {SOCIAL_LINKS.map((link) => (
            <a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-surface-variant hover:text-primary-fixed-dim hover:scale-105 transition-all duration-200 uppercase font-display text-label-xl"
            >
              {link.name}
            </a>
          ))}
          <a
            href="mailto:andredwpratama@gmail.com"
            className="text-surface-variant hover:text-primary-fixed-dim hover:scale-105 transition-all duration-200 uppercase font-display text-label-xl"
          >
            Email
          </a>
        </div>
      </div>
    </footer>
  );
}
