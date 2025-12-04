import { strapiFetch } from "./client";

// GET all comments for one article (by documentId)
export async function getCommentsForArticle(articleDocumentId) {
  const res = await strapiFetch(
    "/api/comments",
    {
      "filters[article][documentId][$eq]": articleDocumentId,
      "populate[author]": "*",
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
  authorDocumentId,
}) {
  const body = {
    data: {
      title,
      article: articleDocumentId, // same as your Postman example
    },
  };

  if (authorDocumentId) {
    body.data.author = authorDocumentId;
  }

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
