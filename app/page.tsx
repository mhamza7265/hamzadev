import { getHomepageData } from "@/actions/homepage";
import Architecture from "@/components/main/Architecture";
import Contact from "@/components/main/Contact";
import Experience from "@/components/main/Experience";
import Footer from "@/components/main/Footer";
import Hero from "@/components/main/Hero";
import Navbar from "@/components/main/Navbar";
import Projects from "@/components/main/Projects";
import Skills from "@/components/main/Skills";

export default async function Home() {
  const pageData = await getHomepageData();

  console.log("page:pageData", pageData);
  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <Navbar />
      <main>
        <Hero />
        <Skills data={pageData?.skills ?? []} />
        <Projects data={pageData?.projectsWithCode ?? []} />
        <Architecture />
        <Experience />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
