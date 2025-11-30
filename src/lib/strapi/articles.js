// lib/strapi/articles.js
import { strapiFetch } from "./client";

// Blog list
export async function getArticles() {
  const res = await strapiFetch(
    "/api/articles",
    {
      // ✅ ask to populate these relations (no "*")
      "populate[0]": "cover",
      "populate[1]": "author",
      "populate[2]": "category",
      sort: "createdAt:desc",
    },
    { next: { revalidate: 60 } }
  );

  return res;
}

// Single article by slug
export async function getArticleBySlug(slug) {
  const res = await strapiFetch(
    "/api/articles",
    {
      "filters[slug][$eq]": slug,

      // ✅ only these relations; no "deep,3", no "*"
      "populate[0]": "cover",
      "populate[1]": "author",
      "populate[2]": "category",
      "populate[3]": "blocks",
    },
    { next: { revalidate: 60 } }
  );

  return res.data?.[0] || null;
}
