/* eslint-disable @next/next/no-img-element */
export default function BlogContent({ article }) {
  const { title, description, cover, author, category, blocks } = article;

  const coverUrl =
    cover && cover.url ? `http://localhost:1337${cover.url}` : null;

  return (
    <article className="max-w-3xl mx-auto">
      {coverUrl && (
        <img
          src={coverUrl}
          alt={title}
          className="w-full h-auto rounded-lg mb-6"
        />
      )}

      <h1 className="text-3xl font-bold mb-2">{title}</h1>

      <div className="text-sm text-muted-foreground mb-6 flex gap-2">
        {author?.name && <span>By {author.name}</span>}
        {category?.name && <span>• {category.name}</span>}
      </div>

      <p className="mb-6 text-lg">{description}</p>

      {/* You can later render blocks (rich text, quotes, etc.) properly */}
      {blocks && blocks.length > 0 && (
        <div className="prose dark:prose-invert max-w-none">
          {blocks.map((block) => (
            <pre key={block.id} className="text-xs bg-muted p-2 rounded">
              {block.__component}
            </pre>
          ))}
        </div>
      )}
    </article>
  );
}
