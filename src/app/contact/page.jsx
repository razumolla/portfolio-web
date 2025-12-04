import Contact from "@/components/contact/Contact";
import { getAbout } from "@/lib/strapi/about";

export const metadata = {
  title: "Contact | Md. Razu Molla",
  description: "Get in touch with Md. Razu Molla",
};

export default async function ContactPage() {
  const { data: about } = await getAbout();

  return (
    <div className="bg-background text-foreground">
      <Contact about={about} />
    </div>
  );
}
