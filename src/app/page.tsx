import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import TechStack from "@/components/TechStack";
import Experience from "@/components/Experience";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="flex flex-col items-center min-h-screen">
      <Hero />
      <Projects />
      <TechStack />
      <Experience />
      <Contact />
      <Footer />
    </main>
  );
}
