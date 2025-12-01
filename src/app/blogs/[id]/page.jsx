// app/blog/[id]/page.jsx
import { getArticles, getArticleByDocumentId } from "@/lib/strapi/articles";
import BlogContent from "@/components/blog/blog-content";
import CommentsSection from "@/components/blog/comments-section";
import { notFound } from "next/navigation";

const BlogDetailPage = async ({ params }) => {
  const { id } = await params;

  const article = await getArticleByDocumentId(id);

  if (!article) {
    return notFound();
  }

  // pass numeric id for comments filter
  return (
    <main className="container mx-auto py-10">
      <BlogContent article={article} />
      <CommentsSection
        articleId={article.documentId}
        initialComments={article.comments || []}
      />
    </main>
  );
};

export default BlogDetailPage;
