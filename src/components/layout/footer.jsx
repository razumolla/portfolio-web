import Link from "next/link";
import { Github, Linkedin, Mail } from "lucide-react";

export default function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto flex flex-col items-center gap-3 py-6 text-sm text-muted-foreground md:flex-row md:justify-between">
        <div className="flex flex-col items-center gap-1 md:items-start">
          <span>© {year} Razu Molla. All rights reserved.</span>
          <span className="text-xs">
            Built with Next.js, Strapi & Tailwind CSS.
          </span>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="mailto:your.email@example.com"
            className="inline-flex h-8 w-8 items-center justify-center rounded-full border hover:bg-accent hover:text-accent-foreground transition-colors"
            aria-label="Email"
          >
            <Mail className="h-4 w-4" />
          </Link>
          <Link
            href="https://github.com/your-github"
            target="_blank"
            className="inline-flex h-8 w-8 items-center justify-center rounded-full border hover:bg-accent hover:text-accent-foreground transition-colors"
            aria-label="GitHub"
          >
            <Github className="h-4 w-4" />
          </Link>
          <Link
            href="https://www.linkedin.com/in/your-linkedin"
            target="_blank"
            className="inline-flex h-8 w-8 items-center justify-center rounded-full border hover:bg-accent hover:text-accent-foreground transition-colors"
            aria-label="LinkedIn"
          >
            <Linkedin className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </footer>
  );
}
