import { getArticles, getArticleBySlug } from "@/lib/strapi/articles";
import BlogContent from "@/components/blog/blog-content";
import CommentsSection from "@/components/blog/comments-section";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  const { data: articles } = await getArticles();
  return articles.map((article) => ({ slug: article.slug }));
}

export default async function BlogDetailPage({ params }) {
  const { slug } = params;
  const article = await getArticleBySlug(slug);

  console.log("article details", article);

  if (!article) {
    return notFound();
  }

  return (
    <main className="container mx-auto py-10">
      <BlogContent article={article} />
      <CommentsSection articleId={article.id} />
    </main>
  );
}
