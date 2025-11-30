import BlogList from "@/components/blog/blog-list";
import { getArticles } from "@/lib/strapi/articles";

export const metadata = {
  title: "Blog | Razu's Portfolio",
};

export default async function BlogPage() {
  const { data: articles } = await getArticles();

  console.log("articles", articles);
  return (
    <main className="container mx-auto py-10">
      <h1 className="text-3xl font-semibold mb-6">Blog</h1>
      <BlogList articles={articles} />
    </main>
  );
}
