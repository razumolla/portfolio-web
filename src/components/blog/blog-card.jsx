/* eslint-disable @next/next/no-img-element */
import Link from "next/link";

export default function BlogCard({ article }) {
  const { title, description, slug, cover } = article;

  const coverUrl =
    cover && cover.url
      ? `http://localhost:1337${cover.formats?.small?.url || cover.url}`
      : null;

  return (
    <Link
      href={`/blog/${slug}`}
      className="block rounded-lg border bg-card text-card-foreground shadow-sm hover:shadow-md transition-shadow"
    >
      {coverUrl && (
        <div className="relative h-48 w-full overflow-hidden rounded-t-lg">
          {/* you can switch to next/image later */}
          <img
            src={coverUrl}
            alt={title}
            className="h-full w-full object-cover"
          />
        </div>
      )}
      <div className="p-4">
        <h2 className="text-lg font-semibold mb-2">{title}</h2>
        <p className="text-sm text-muted-foreground line-clamp-3">
          {description}
        </p>
        <span className="inline-flex text-xs text-primary mt-3">
          Read more →
        </span>
      </div>
    </Link>
  );
}
