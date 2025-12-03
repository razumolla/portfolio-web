const STRAPI_URL = process.env.STRAPI_URL;

export async function strapiFetch(path, query = {}, init = {}) {
  const url = new URL(path, STRAPI_URL); // path must include /api

  Object.entries(query).forEach(([key, value]) => {
    url.searchParams.set(key, value);
  });

  console.log("Strapi request URL:", url.toString());

  const res = await fetch(url.toString(), {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(init.headers || {}),
    },
  });

  if (!res.ok) {
    const errorBody = await res.text();
    console.error("Strapi error:", res.status, res.statusText, errorBody);
    throw new Error(
      `Strapi request failed: ${res.status} ${res.statusText} - ${errorBody}`
    );
  }

  return res.json();
}
