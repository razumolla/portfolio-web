/* eslint-disable @next/next/no-img-element */

import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { getProjects } from "@/lib/strapi/projects";

const STRAPI_URL = process.env.STRAPI_URL;

export default async function ProjectsSection() {
  const { data } = await getProjects();
  const projects = data || [];

  console.log("projects:", projects);

  if (!projects.length) return null;

  return (
    <section id="projects" className="py-16 bg-background">
      <div className="container mx-auto">
        <div className="mb-10 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-3">Latest work</h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => {
            const firstImage = project.image?.[0];
            const imageUrl = firstImage
              ? `${STRAPI_URL}${
                  firstImage.formats?.medium?.url ||
                  firstImage.formats?.small?.url ||
                  firstImage.url
                }`
              : null;

            const toolsArray = project.tools
              ? project.tools.split(",").map((t) => t.trim())
              : [];

            return (
              <article
                key={project.id}
                className="group flex flex-col overflow-hidden rounded-xl border border-border/60 bg-muted/40 shadow-sm hover:shadow-md hover:border-primary/60 transition-all"
              >
                {imageUrl && (
                  <div className="relative h-44 md:h-52 w-full overflow-hidden">
                    <img
                      src={imageUrl}
                      alt={project.projectName}
                      className="h-full w-full object-cover group-hover:scale-105 transition-transform"
                    />
                  </div>
                )}

                <div className="flex flex-1 flex-col p-4 md:p-5 gap-3">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="text-lg font-semibold">
                        {project.projectName}
                      </h3>
                      {project.myRole && (
                        <p className="text-xs uppercase tracking-wide text-primary mt-1">
                          {project.myRole}
                        </p>
                      )}
                    </div>

                    {project.liveDemo && (
                      <Link
                        href={project.liveDemo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 rounded-full border border-primary/40 bg-primary/10 px-3 py-1 text-xs font-medium text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
                      >
                        <span>Live demo</span>
                        <ExternalLink className="h-3 w-3" />
                      </Link>
                    )}
                  </div>

                  {project.description && (
                    <p className="text-sm text-muted-foreground line-clamp-3">
                      {project.description}
                    </p>
                  )}

                  {toolsArray.length > 0 && (
                    <div className="mt-1 flex flex-wrap gap-2">
                      {toolsArray.map((tool) => (
                        <span
                          key={tool}
                          className="inline-flex items-center rounded-full bg-background/60 px-2.5 py-0.5 text-[11px] font-medium text-muted-foreground border border-border/60"
                        >
                          {tool}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
