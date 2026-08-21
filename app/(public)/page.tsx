import { getExperienceData } from "@/actions/experience";
import { getHomepageData } from "@/actions/homepage";
import { getProfileData } from "@/actions/profile";
import Architecture from "@/components/main/Architecture";
import Contact from "@/components/main/Contact";
import Experience from "@/components/main/Experience";
import Footer from "@/components/main/Footer";
import Hero from "@/components/main/Hero";
import Navbar from "@/components/main/Navbar";
import Projects from "@/components/main/Projects";
import Skills from "@/components/main/Skills";

export default async function Home() {
  // const pageData = await getHomepageData();
  // const profile = await getProfileData();
  // const experiences = await getExperienceData();
  const [pageData, profile, experiences] = await Promise.all([
    await getHomepageData(),
    await getProfileData(),
    await getExperienceData(),
  ]);

  console.log("page:experience", experiences);

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <Navbar />
      <main>
        <Hero profile={profile} />
        <Skills data={pageData?.skills ?? []} />
        <Projects data={pageData?.projectsWithCode ?? []} />
        <Architecture />
        <Experience experiences={experiences.experiences || []} />
        <Contact profile={profile} />
      </main>
      <Footer profile={profile} />
    </div>
  );
}
