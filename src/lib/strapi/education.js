import { strapiFetch } from "./client";

export async function getEducations() {
  const res = await strapiFetch(
    "/api/educations",
    {
      //   populate: "*",
      sort: "createdAt:desc",
    },
    { next: { revalidate: 3600 } }
  );

  return res; // { data, meta }
}
