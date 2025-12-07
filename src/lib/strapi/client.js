const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_BASE_URL;
const STRAPI_TOKEN = process.env.NEXT_PUBLIC_STRAPI_TOKEN;

export async function strapiFetch(path, query = {}, init = {}) {
  const url = new URL(path, STRAPI_URL);

  Object.entries(query).forEach(([k, v]) => url.searchParams.set(k, String(v)));

  const res = await fetch(url.toString(), {
    ...init,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${STRAPI_TOKEN}`,
      ...(init.headers || {}),
    },
  });

  if (!res.ok) {
    const body = await res.text();
    console.error("Strapi error:", res.status, res.statusText, body);
    throw new Error(
      `Strapi request failed: ${res.status} ${res.statusText} - ${body}`
    );
  }

  return res.json();
}
