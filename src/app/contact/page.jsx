import Contact from "@/components/contact/Contact";

export const metadata = {
  title: "Contact | Md. Razu Molla",
  description: "Get in touch with Md. Razu Molla",
};

export default function ContactPage() {
  return (
    <div className="bg-background text-foreground">
      <Contact />
    </div>
  );
}
