import { strapiFetch } from "./client";

// GET all comments for one article (by documentId)
export async function getCommentsForArticle(articleDocumentId) {
  const res = await strapiFetch(
    "/api/comments",
    {
      "filters[article][documentId][$eq]": articleDocumentId,
      "populate[users_permissions_user]": "*", // ⬅️ relation field
      "populate[article]": "*",
      sort: "createdAt:asc",
    },
    { cache: "no-store" }
  );

  return res; // { data, meta }
}

// CREATE a new comment
export async function createComment({
  title,
  articleDocumentId,
  userDocumentId,
}) {
  const body = {
    data: {
      title,
      article: articleDocumentId, // article.documentId
      users_permissions_user: userDocumentId, // Strapi relation field
    },
  };

  const res = await strapiFetch(
    "/api/comments",
    {},
    {
      method: "POST",
      body: JSON.stringify(body),
    }
  );

  return res;
}
