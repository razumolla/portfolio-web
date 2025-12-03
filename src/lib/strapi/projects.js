import { strapiFetch } from "./client";

export async function getProjects() {
  const res = await strapiFetch(
    "/api/projects",
    {
      populate: "*",
      sort: "createdAt:desc",
    },
    { next: { revalidate: 3600 } }
  );

  return res; // { data, meta }
}
