import Contact from "@/components/contact/Contact";
import EducationSection from "@/components/education/EducationSection";
import ExperienceSection from "@/components/experience/ExperienceSection";
import ProjectsSection from "@/components/project/ProjectsSection";
import AboutSection from "@/components/sections/AboutSection";
import HeroSection from "@/components/sections/Hero";
import SkillsSection from "@/components/skills/SkillsSection";
import { getAbout } from "@/lib/strapi/about";

export default async function Home() {
  const { data: about } = await getAbout();

  return (
    <div>
      <main>
        <HeroSection about={about} />
        <AboutSection about={about} />
        <SkillsSection />
        <ProjectsSection />
        <ExperienceSection />
        <EducationSection />
        <Contact about={about} />
      </main>
    </div>
  );
}
