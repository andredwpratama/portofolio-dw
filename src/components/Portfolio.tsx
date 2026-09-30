import Hero from "./Hero";
import Projects from "./Projects";
import TechStack from "./TechStack";
import Experience from "./Experience";
import Contact from "./Contact";
import Footer from "./Footer";
import PageTransition from "./PageTransition";
import LayoutWrapper from "./LayoutWrapper";

// One island preserves the shared Lenis/ScrollTrigger lifecycle.
export default function Portfolio() {
  return (
    <>
      <PageTransition />
      <LayoutWrapper>
        <main className="flex flex-col items-center min-h-screen">
          <Hero />
          <Projects />
          <TechStack />
          <Experience />
          <Contact />
          <Footer />
        </main>
      </LayoutWrapper>
    </>
  );
}
