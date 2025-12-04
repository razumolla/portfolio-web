import { strapiFetch } from "./client";

export async function getAbout() {
  const res = await strapiFetch(
    "/api/about",
    {
      populate: "*",
    },
    { next: { revalidate: 60 } }
  );

  // res = { data, meta }
  return res;
}
