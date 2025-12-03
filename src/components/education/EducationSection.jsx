import { getEducations } from "@/lib/strapi/education";

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

  // If endDate is missing or clearly before startDate, treat as "Present"
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

export default async function EducationSection() {
  const { data } = await getEducations();
  const educations = data || [];

  if (!educations.length) return null;

  // optional: ensure newest (by endDate) shown first
  const sorted = [...educations].sort((a, b) => {
    const aEnd = a.endDate || a.startDate || "";
    const bEnd = b.endDate || b.startDate || "";
    return (bEnd || "").localeCompare(aEnd || "");
  });

  return (
    <section id="education" className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="mb-10 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-3">
            Academic background
          </h2>
          <p className="text-sm md:text-base text-muted-foreground max-w-2xl mx-auto">
            A quick overview of my formal education and academic milestones.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="relative border-l border-border/60 pl-6 space-y-8">
            {sorted.map((edu, idx) => {
              const period = formatPeriod(edu.startDate, edu.endDate);

              return (
                <div key={edu.id} className="relative">
                  {/* timeline dot */}
                  <span className="absolute -left-8 mt-1 h-4 w-4 rounded-full border-2 border-primary bg-background" />

                  <div className="rounded-xl border border-border/60 bg-muted/40 px-4 py-4 md:px-5 md:py-5 shadow-sm">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                      <h3 className="text-base md:text-lg font-semibold">
                        {edu.fieldOfStudy}
                      </h3>
                      {period && (
                        <p className="text-xs md:text-sm text-muted-foreground">
                          {period}
                        </p>
                      )}
                    </div>
                    <p className="mt-1 text-sm md:text-base text-muted-foreground">
                      {edu.school}
                    </p>
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
