// src/components/experience/ExperienceSection.jsx

import { getExperiences } from "@/lib/strapi/experiences";

function formatDate(dateString) {
  if (!dateString) return null;
  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) return null;

  return date.toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });
}

function formatPeriod(startDate, endDate) {
  const start = formatDate(startDate);
  let end = formatDate(endDate);

  // treat null / invalid or obviously earlier endDate as “Present”
  if (!end) {
    end = "Present";
  } else if (startDate && endDate) {
    const s = new Date(startDate);
    const e = new Date(endDate);
    if (e < s) {
      end = "Present";
    }
  }

  if (start && end) return `${start} – ${end}`;
  if (end) return end;
  if (start) return `${start} – Present`;
  return null;
}

export default async function ExperienceSection() {
  const { data } = await getExperiences();
  const experiences = data || [];

  if (!experiences.length) return null;

  // ensure order by startDate desc (JoulesLabs on top)
  const sorted = [...experiences].sort((a, b) => {
    const aStart = a.startDate || "";
    const bStart = b.startDate || "";
    return (bStart || "").localeCompare(aStart || "");
  });

  return (
    <section id="experience" className="py-16 bg-background">
      <div className="container mx-auto">
        <div className="mb-10 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-3">Experience</h2>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="relative border-l border-border/60 pl-6 space-y-8">
            {sorted.map((exp, idx) => {
              const period = formatPeriod(exp.startDate, exp.endDate);
              const isCurrent = !exp.endDate;

              return (
                <div key={exp.id} className="relative">
                  {/* timeline dot */}
                  <span className="absolute -left-8 mt-1 h-4 w-4 rounded-full border-2 border-primary bg-background" />

                  <div className="rounded-xl border border-border/60 bg-muted/40 px-4 py-4 md:px-5 md:py-5 shadow-sm">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                      <div>
                        <h3 className="text-base md:text-lg font-semibold">
                          {exp.role}
                        </h3>
                        <p className="text-sm md:text-base text-muted-foreground">
                          {exp.company}
                        </p>
                      </div>

                      <div className="flex flex-col items-start md:items-end gap-1">
                        {period && (
                          <p className="text-xs md:text-sm text-muted-foreground">
                            {period}
                          </p>
                        )}
                        {isCurrent && (
                          <span className="inline-flex items-center rounded-full border border-primary/40 bg-primary/10 px-2 py-0.5 text-[11px] font-medium uppercase tracking-wide text-primary">
                            Current
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {idx !== sorted.length - 1 && (
                    <div className="absolute left-px top-5 h-full border-l border-dashed border-border/40" />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
