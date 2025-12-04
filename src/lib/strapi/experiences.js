import { strapiFetch } from "./client";

export async function getExperiences() {
  const res = await strapiFetch(
    "/api/experiences",
    {
      sort: "startDate:desc",
    },
    { next: { revalidate: 3600 } }
  );

  return res;
}
