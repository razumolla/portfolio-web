import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Github,
  Linkedin,
  Facebook,
  Code2,
  Download,
  Mail,
} from "lucide-react";

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL;

export default function HeroSection({ about }) {
  const name = about?.name ?? "Md. Razu Molla";
  const designation = about?.designation ?? "Software Engineer";
  const intro =
    about?.IntroMessage ??
    `Hello, I'm ${name}, passionate about crafting Software Solutions.`;

  const socials = {
    github: about?.github,
    linkedIn: about?.linkedIn,
    facebook: about?.facebook,
    hackerrank: about?.hackerrank,
  };

  const heroImage = about?.heroImage;
  const heroImageUrl = heroImage
    ? `${STRAPI_URL}${
        heroImage.formats?.large?.url ||
        heroImage.formats?.medium?.url ||
        heroImage.url
      }`
    : null;

  const resumeUrl = about?.resume?.url
    ? `${STRAPI_URL}${about.resume.url}`
    : null;

  return (
    <section className="relative overflow-hidden bg-linear-to-b from-background via-background to-background/95 py-16 md:py-20">
      <div className="container mx-auto px-4">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1.1fr)] items-center">
          {/* LEFT: Intro */}
          <div className="space-y-4">
            <p className="uppercase tracking-[0.25em] text-primary text-2xl font-bold">
              Hello,
            </p>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              I&apos;m <span className="text-primary">{name}</span>,{" "}
              <span className="text-orange-400">
                passionate about crafting Software Solutions.
              </span>
            </h1>
            {/* Social icons */}
            <div className="flex flex-wrap gap-3 pt-2">
              {socials.github && (
                <SocialIcon href={socials.github} label="GitHub">
                  <Github className="h-5 w-5" />
                </SocialIcon>
              )}
              {socials.linkedIn && (
                <SocialIcon href={socials.linkedIn} label="LinkedIn">
                  <Linkedin className="h-5 w-5" />
                </SocialIcon>
              )}
              {socials.facebook && (
                <SocialIcon href={socials.facebook} label="Facebook">
                  <Facebook className="h-5 w-5" />
                </SocialIcon>
              )}
              {socials.hackerrank && (
                <SocialIcon href={socials.hackerrank} label="HackerRank">
                  <Code2 className="h-5 w-5" />
                </SocialIcon>
              )}
            </div>

            {/* CTA buttons */}
            <div className="flex flex-wrap gap-4 pt-4">
              <Button variant="outline" asChild className="px-6 py-2">
                <Link href="/contact">
                  <Mail className="mr-2 h-4 w-4" />
                  Contact Me
                </Link>
              </Button>

              {resumeUrl && (
                <Button
                  asChild
                  variant="outline"
                  className="border-pink-500/70 bg-linear-to-r from-pink-500/20 to-purple-500/20 px-6 py-2"
                >
                  <Link
                    href={resumeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Download className="mr-2 h-4 w-4" />
                    Get Resume
                  </Link>
                </Button>
              )}
            </div>
          </div>

          {/* RIGHT: Code-style card / hero image */}
          <Card className="relative bg-linear-to-br from-slate-900/70 to-slate-900/90 border-slate-700 shadow-xl">
            <CardHeader className="border-b border-slate-700/60 pb-3">
              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-red-400" />
                <span className="h-3 w-3 rounded-full bg-yellow-400" />
                <span className="h-3 w-3 rounded-full bg-green-400" />
              </div>
              <CardTitle className="mt-2 text-xs font-mono text-slate-400">
                coder.js
              </CardTitle>
            </CardHeader>

            <CardContent className="pt-4">
              <div className="grid gap-4 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] items-center">
                {/* fake code */}
                <pre className="font-mono text-xs md:text-sm text-slate-200/90 whitespace-pre-wrap">
                  {`const coder = {
  name: '${name}',
  role: '${designation}',
  skills: {
    core: ['JavaScript', 'TypeScript'],
    frontend: ['React', 'Next.js'], 
    backend: ['Node.js', 'Express'],
    database: ['PostgreSQL', 'MongoDB', 'MySQL'],
  },
  hardWorker: true,
  quickLearner: true,
  problemSolver: true,
}; 

`}
                </pre>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}

function SocialIcon({ href, label, children }) {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
    >
      {children}
    </Link>
  );
}
