import { strapiFetch } from "./client";

export async function getArticles() {
  const res = await strapiFetch(
    "/api/articles",
    {
      populate: "*",
      sort: "createdAt:desc",
    },
    { next: { revalidate: 60 } }
  );

  return res;
}

// single article by documentId
export async function getArticleByDocumentId(documentId) {
  const res = await strapiFetch(
    `/api/articles/${documentId}`,
    {
      populate: "*",
    },
    {
      cache: "no-store",
    }
  );

  return res.data || null;
}
