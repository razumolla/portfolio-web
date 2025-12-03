import { strapiFetch } from "./client";

export async function getSkills() {
  const res = await strapiFetch(
    "/api/skills",
    {
      populate: "*",
      sort: "createdAt:desc",
    },
    { next: { revalidate: 60 } }
  );

  return res; // { data, meta }
}
