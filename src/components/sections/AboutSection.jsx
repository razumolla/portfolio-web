/* eslint-disable @next/next/no-img-element */

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const STRAPI_URL = "http://localhost:1337";

export default function AboutSection({ about }) {
  const description = about?.description;
  const name = about?.name ?? "Md. Razu Molla";
  const designation = about?.designation ?? "Software Engineer";

  const image = about?.image;
  const imageUrl = image ? `${STRAPI_URL}${image.formats?.medium?.url}` : null;

  return (
    <section id="about" className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid gap-8 md:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)] items-start">
          {/* LEFT: description */}
          <Card className=" ">
            <CardHeader>
              <CardTitle className="text-lg md:text-xl">About Me</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm md:text-base leading-relaxed text-muted-foreground">
                {description}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3 text-sm md:text-base">
                <InfoRow label="Name" value={name} />
                <InfoRow label="Role" value={designation} />
                {about?.email && <InfoRow label="Email" value={about.email} />}
                {about?.address && (
                  <InfoRow label="Location" value={about.address} />
                )}
              </div>
            </CardContent>
          </Card>

          {/* RIGHT: profile image */}
          <div className="flex justify-center md:justify-end">
            <Card className="overflow-hidden bg-muted/40 border-border/60 rounded-2xl max-w-xs">
              {imageUrl && (
                <img
                  src={imageUrl}
                  alt={image?.alternativeText || name}
                  className="object-cover"
                />
              )}
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}

function InfoRow({ label, value }) {
  if (!value) return null;
  return (
    <div>
      <p className="text-xs uppercase tracking-wide text-muted-foreground mb-0.5">
        {label}
      </p>
      <p className="font-medium">{value}</p>
    </div>
  );
}
