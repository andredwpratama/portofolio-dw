import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import TechStack from "@/components/TechStack";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-between min-h-screen">
      <Hero />
      <Projects />
      <TechStack />
    </main>
  );
}
