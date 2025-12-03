/* eslint-disable @next/next/no-img-element */

import { getSkills } from "@/lib/strapi/skills";

const STRAPI_URL = process.env.STRAPI_URL;

export default async function SkillsSection() {
  const { data } = await getSkills();
  const skills = data || [];

  if (!skills.length) return null;

  return (
    <section id="skills" className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="mb-10 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-3">
            Technologies I work with
          </h2>
          <p className="text-sm md:text-base text-muted-foreground mx-auto">
            A quick snapshot of the tools and technologies I use day-to-day to
            build modern, performant web applications.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5 md:gap-6">
          {skills.map((skill) => {
            const image = skill.image; // from your API example
            const imageUrl = image
              ? `${STRAPI_URL}${image.formats?.small?.url || image.url}`
              : null;

            return (
              <article
                key={skill.id}
                className="group flex flex-col items-center gap-3 rounded-xl border border-border/60 bg-muted/40 px-4 py-5 shadow-sm hover:shadow-md hover:border-primary/60 transition-all"
              >
                {imageUrl && (
                  <div className="relative h-16 w-16 md:h-20 md:w-20 mb-1 rounded-lg overflow-hidden bg-background/60">
                    <img
                      src={imageUrl}
                      alt={skill.title}
                      className="h-full w-full object-contain group-hover:scale-105 transition-transform"
                    />
                  </div>
                )}
                <h3 className="text-sm md:text-base font-medium text-center">
                  {skill.title}
                </h3>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
