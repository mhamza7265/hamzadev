import Architecture from "@/components/Architecture";
import Contact from "@/components/Contact";
import Experience from "@/components/Experience";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <Navbar />
      <main>
        <Hero />
        <Skills />
        <Projects />
        <Architecture />
        <Experience />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
