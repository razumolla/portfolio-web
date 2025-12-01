/* eslint-disable @next/next/no-img-element */

export default function BlogContent({ article }) {
  const { title, description, cover, author, category, blocks, createdAt } =
    article;

  const coverUrl =
    cover && cover.url ? `http://localhost:1337${cover.url}` : null;

  const formattedDate = createdAt
    ? new Date(createdAt).toLocaleDateString()
    : null;

  return (
    <article className="max-w-5xl mx-auto">
      {coverUrl && (
        <img
          src={coverUrl}
          alt={title}
          className="w-full h-80 rounded-lg mb-6"
        />
      )}

      <h1 className="text-3xl font-bold mb-3">{title}</h1>

      <div className="text-xs text-muted-foreground mb-6 flex flex-wrap gap-2">
        {author?.name && <span>By {author.name}</span>}
        {category?.name && <span>• {category.name}</span>}
        {formattedDate && <span>• {formattedDate}</span>}
      </div>

      {description && <p className="mb-6 text-lg">{description}</p>}

      {/* basic blocks preview – you can replace with real renderers later */}
      {blocks && blocks.length > 0 && (
        <div className="prose dark:prose-invert max-w-none space-y-6">
          {blocks.map((block, idx) => (
            <div key={idx}>
              <code className="text-[11px] rounded bg-muted px-2 py-1">
                {block.__component}
              </code>
            </div>
          ))}
        </div>
      )}
    </article>
  );
}
