import { strapiFetch } from "./client";

export async function getExperiences() {
  const res = await strapiFetch(
    "/api/experiences",
    {
      sort: "startDate:desc", // newest job first
      // populate: "*" // add if you later attach relations
    },
    { next: { revalidate: 3600 } }
  );

  return res; // { data, meta }
}
