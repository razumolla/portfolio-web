import { strapiFetch } from "./client";

export async function getEducations() {
  const res = await strapiFetch(
    "/api/educations",
    {
      sort: "createdAt:desc",
    },
    { next: { revalidate: 3600 } }
  );

  return res;
}
