/* eslint-disable @next/next/no-img-element */
import { getEducations } from "@/lib/strapi/education";

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_BASE_URL;

// just the path part from your URL
const EDUCATION_IMAGE_PATH = "/uploads/education_693b76c631.avif";
const EDUCATION_IMAGE_URL = `${STRAPI_URL}${EDUCATION_IMAGE_PATH}`;

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

  // newest (by endDate) first
  const sorted = [...educations].sort((a, b) => {
    const aEnd = a.endDate || a.startDate || "";
    const bEnd = b.endDate || b.startDate || "";
    return (bEnd || "").localeCompare(aEnd || "");
  });

  return (
    <section id="education" className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="mb-8 text-center">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-2">
            Academic Background
          </h2>
        </div>

        <div className="grid gap-10 md:grid-cols-2 items-start">
          {/* LEFT: static education image */}
          <div className="flex justify-center md:justify-start">
            <div className="overflow-hidden bg-muted/40 border border-border/60 rounded-2xl shadow-sm  w-full">
              <img
                src={EDUCATION_IMAGE_URL}
                alt="Education illustration"
                className="w-full h-80 md:h-96 object-cover"
              />
            </div>
          </div>

          {/* RIGHT: timeline */}
          <div className="max-w-3xl md:max-w-none mx-auto md:mx-0">
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
      </div>
    </section>
  );
}
