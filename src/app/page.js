import Contact from "@/components/contact/Contact";
import EducationSection from "@/components/education/EducationSection";
import ExperienceSection from "@/components/experience/ExperienceSection";
import ProjectsSection from "@/components/project/ProjectsSection";
import Hero from "@/components/sections/Hero";
import SkillsSection from "@/components/skills/SkillsSection";

export default function Home() {
  return (
    <div>
      <main>
        {/* <Hero /> */}
        <ProjectsSection />
        <ExperienceSection />
        <EducationSection />
        <SkillsSection />
        <Contact />
      </main>
    </div>
  );
}
