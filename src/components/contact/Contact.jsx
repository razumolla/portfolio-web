"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Mail,
  Phone,
  MapPin,
  Github,
  Linkedin,
  Facebook,
  Code2,
  FileText,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { useAbout } from "@/hooks/useAbout";
import { toast } from "sonner";

const STRAPI_URL = process.env.STRAPI_URL || "http://localhost:1337/api";

const Contact = () => {
  const { about, loading: aboutLoading } = useAbout();

  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState({ type: "", message: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus({ type: "", message: "" });

    if (!form.name || !form.email || !form.message) {
      toast.error("Please fill in all fields.");
      return;
    }

    try {
      setSubmitting(true);

      const res = await fetch(`${STRAPI_URL}/contacts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          data: {
            name: form.name,
            email: form.email,
            message: form.message,
          },
        }),
      });

      if (!res.ok) {
        const text = await res.text();
        console.error("Contact submit error:", text);
        toast.error("Failed to send message. Please try again.");
        return;
      }

      toast.success("Message sent!", {
        description: "Thank you! I'll get back to you soon.",
      });

      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      console.error("Contact submit error:", err);
      toast.error("Something went wrong.", {
        description: "Please try again later.",
      });
    } finally {
      setSubmitting(false);
    }
  }

  const email = about?.email;
  const phone = about?.phone;
  const address = about?.address;
  const socials = {
    github: about?.github,
    linkedIn: about?.linkedIn,
    facebook: about?.facebook,
    hackerrank: about?.hackerrank,
  };
  const resumeUrl = about?.resume?.url
    ? `${STRAPI_URL}${about.resume.url}`
    : null;

  return (
    <section className="min-h-[calc(100vh-80px)] bg-background py-16">
      <div className="container mx-auto">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,2fr)_minmax(0,1.3fr)] items-start">
          {/* LEFT: CONTACT FORM */}
          <Card className="bg-muted/40 border-border/60">
            <CardHeader>
              <p className="text-xs uppercase tracking-[0.2em] text-primary mb-1">
                Contact with me
              </p>
              <CardTitle className="text-2xl md:text-3xl font-bold">
                Let&apos;s build something together
              </CardTitle>
              <CardDescription className="text-sm md:text-base">
                If you have any questions or want to discuss a project or job
                opportunity, just drop a message. I usually reply within 24–48
                hours.
              </CardDescription>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Your Name
                  </label>
                  <Input
                    name="name"
                    placeholder="Enter your name"
                    value={form.name}
                    onChange={handleChange}
                    disabled={submitting}
                    className="bg-background/60"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Your Email
                  </label>
                  <Input
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    value={form.email}
                    onChange={handleChange}
                    disabled={submitting}
                    className="bg-background/60"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Your Message
                  </label>
                  <Textarea
                    name="message"
                    rows={5}
                    placeholder="Write your message here..."
                    value={form.message}
                    onChange={handleChange}
                    disabled={submitting}
                    className="bg-background/60 resize-none"
                  />
                </div>

                {status.message && (
                  <p
                    className={`text-sm ${
                      status.type === "success"
                        ? "text-emerald-400"
                        : "text-red-400"
                    }`}
                  >
                    {status.message}
                  </p>
                )}

                <Button
                  type="submit"
                  disabled={submitting}
                  className="w-full sm:w-auto px-8 py-2 font-semibold tracking-wide"
                >
                  {submitting ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* RIGHT: ABOUT / CONTACT INFO */}
          <div className="space-y-6">
            <Card className="bg-muted/40 border-border/60">
              <CardHeader>
                <CardTitle>Contact details</CardTitle>
                <CardDescription>
                  {aboutLoading
                    ? "Loading your contact info..."
                    : "You can also reach me directly using the details below."}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {email && (
                  <InfoRow
                    icon={<Mail className="h-5 w-5 text-primary" />}
                    label={
                      <a
                        href={`mailto:${email}`}
                        className="hover:text-primary transition-colors"
                      >
                        {email}
                      </a>
                    }
                  />
                )}

                {phone && (
                  <InfoRow
                    icon={<Phone className="h-5 w-5 text-primary" />}
                    label={
                      <a
                        href={`tel:+88${phone}`}
                        className="hover:text-primary transition-colors"
                      >
                        +88{phone}
                      </a>
                    }
                  />
                )}

                {address && (
                  <InfoRow
                    icon={<MapPin className="h-5 w-5 text-primary" />}
                    label={address}
                  />
                )}

                {resumeUrl && (
                  <InfoRow
                    icon={<FileText className="h-5 w-5 text-primary" />}
                    label={
                      <Link
                        href={resumeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-primary transition-colors"
                      >
                        Download Resume
                      </Link>
                    }
                  />
                )}
              </CardContent>
            </Card>

            <Card className="bg-muted/40 border-border/60">
              <CardHeader>
                <CardTitle>Find me online</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-4">
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
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

function InfoRow({ icon, label }) {
  return (
    <div className="flex items-center gap-3">
      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
        {icon}
      </span>
      <p className="text-sm md:text-base">{label}</p>
    </div>
  );
}

function SocialIcon({ href, label, children }) {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="flex h-11 w-11 items-center justify-center rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
    >
      {children}
    </Link>
  );
}

export default Contact;
