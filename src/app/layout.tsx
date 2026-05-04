import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import CustomCursor from "@/components/CustomCursor";
import PageTransition from "@/components/PageTransition";
import LayoutWrapper from "@/components/LayoutWrapper";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });

export const metadata: Metadata = {
  title: "[ANDRE] | Fullstack Developer Portfolio",
  description: "Senior Fullstack Developer specializing in high-performance web applications using Next.js, TypeScript, and Tailwind CSS.",
};

import Scene3D from "@/components/Scene3D";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} ${outfit.variable} font-body bg-background text-text-primary`}>
        <Scene3D />
        <PageTransition />
        <CustomCursor />
        <LayoutWrapper>
          {children}
        </LayoutWrapper>
      </body>
    </html>
  );
}
