import Contact from "@/components/contact/Contact";
import EducationSection from "@/components/education/EducationSection";
import ExperienceSection from "@/components/experience/ExperienceSection";
import Hero from "@/components/sections/Hero";
import SkillsSection from "@/components/skills/SkillsSection";

export default function Home() {
  return (
    <div>
      <main>
        <Hero />
        <SkillsSection />
        <ExperienceSection />
        <EducationSection />
        <Contact />
      </main>
    </div>
  );
}
