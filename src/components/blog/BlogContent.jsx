/* eslint-disable @next/next/no-img-element */

import MarkdownHTML from "../MarkdownHTML";

export default function BlogContent({ article }) {
  const { title, description, cover, author, category, blocks, createdAt } =
    article;

  const STRAPI_URL = process.env.STRAPI_URL;
  const coverUrl =
    cover && cover.url ? `${STRAPI_URL}${cover.formats?.small?.url}` : null;

  const formattedDate = createdAt
    ? new Date(createdAt).toLocaleDateString()
    : null;

  return (
    <article className="max-w-5xl mx-auto">
      {coverUrl && (
        <img
          src={coverUrl}
          alt={title}
          className="w-full h-80 rounded-lg mb-6 object-cover"
        />
      )}

      <h1 className="text-3xl font-bold mb-3">{title}</h1>

      <div className="text-xs text-muted-foreground mb-6 flex flex-wrap gap-2">
        {author?.name && <span>By {author.name}</span>}
        {category?.name && <span>• {category.name}</span>}
        {formattedDate && <span>• {formattedDate}</span>}
      </div>

      {description && <p className="mb-6 text-lg">{description}</p>}

      {/* Render Strapi blocks */}
      {blocks && blocks.length > 0 && (
        <div className="prose dark:prose-invert max-w-none space-y-6">
          {blocks.map((block, idx) => {
            switch (block.__component) {
              case "shared.rich-text":
                // markdown content from Strapi (usually in `body`)
                return (
                  <MarkdownHTML key={block.id ?? idx} markdown={block.body} />
                );

              case "shared.quote":
                return (
                  <blockquote
                    key={block.id ?? idx}
                    className="border-l-4 pl-4 italic text-muted-foreground"
                  >
                    <p>{block.body}</p>
                    {block.title && (
                      <cite className="block mt-2 text-xs not-italic">
                        — {block.title}
                      </cite>
                    )}
                  </blockquote>
                );

              // you can extend this later for sliders, images, etc.
              default:
                return null;
            }
          })}
        </div>
      )}
    </article>
  );
}
