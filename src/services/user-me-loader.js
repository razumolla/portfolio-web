// src/services/user-me-loader.js

import { cookies } from "next/headers";

export async function getAuthToken() {
  const cookieStore = await cookies(); // await here
  const authToken = cookieStore.get("jwt")?.value;
  return authToken;
}

export async function getUserMeLoader() {
  const baseUrl =
    process.env.NEXT_PUBLIC_STRAPI_BASE_URL ?? "http://localhost:1337";

  const path = "/api/users/me";
  const url = new URL(path, baseUrl);

  const authToken = await getAuthToken();
  if (!authToken) return { ok: false, data: null, error: null };

  try {
    const response = await fetch(url.href, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
      cache: "no-cache",
    });

    const data = await response.json();
    if (data.error) return { ok: false, data: null, error: data.error };

    return { ok: true, data, error: null };
  } catch (error) {
    console.log(error);
    return { ok: false, data: null, error };
  }
}
