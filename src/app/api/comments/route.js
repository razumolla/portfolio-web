// GET/POST -> Strapi comments
// We don’t want to expose Strapi tokens in the browser, so we use a Next route handler.
import { NextResponse } from "next/server";

const STRAPI_URL = process.env.STRAPI_URL || "http://localhost:1337";
const STRAPI_TOKEN = process.env.STRAPI_TOKEN; // create one in Strapi (API token with Comment create permission)

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const articleId = searchParams.get("articleId");

  if (!articleId) {
    return NextResponse.json({ data: [] });
  }

  const url = new URL("/api/comments", STRAPI_URL);
  url.searchParams.set("filters[article][id][$eq]", articleId);
  url.searchParams.set("filters[parent][id][$null]", "true");
  url.searchParams.set("populate", "children");
  url.searchParams.set("sort", "createdAt:asc");

  const res = await fetch(url.toString(), {
    headers: {
      Authorization: `Bearer ${STRAPI_TOKEN}`,
    },
  });

  const data = await res.json();
  return NextResponse.json(data);
}

export async function POST(req) {
  const body = await req.json();

  const res = await fetch(`${STRAPI_URL}/api/comments`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${STRAPI_TOKEN}`,
    },
    body: JSON.stringify({ data: body }),
  });

  if (!res.ok) {
    console.error("Failed to create comment", await res.text());
    return new NextResponse("Failed to create comment", { status: 500 });
  }

  const data = await res.json();
  return NextResponse.json(data);
}
