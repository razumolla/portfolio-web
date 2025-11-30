import BlogCard from "./blog-card";

export default function BlogList({ articles }) {
  if (!articles || articles.length === 0) {
    return <p>No articles yet.</p>;
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {articles.map((article) => (
        <BlogCard key={article.id} article={article} />
      ))}
    </div>
  );
}
