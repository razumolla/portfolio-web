// app/connect/[provider]/redirect/route.js

import { NextResponse } from "next/server";
import { cookies } from "next/headers";

const cookieConfig = {
  maxAge: 60 * 60 * 24 * 7, // 1 week
  path: "/",
  // domain is optional in dev; if it causes issues, remove this line
  domain: process.env.HOST ?? "localhost",
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
};

export const dynamic = "force-dynamic";

export async function GET(request, { params }) {
  // 🔹 unwrap dynamic params (Next.js 16)
  const { provider } = await params;

  const { searchParams } = new URL(request.url);
  const token = searchParams.get("access_token");

  if (!token) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  const backendUrl =
    process.env.NEXT_PUBLIC_STRAPI_BASE_URL ?? "http://localhost:1337";

  const path = `/api/auth/${provider}/callback`;
  const url = new URL(path, backendUrl);
  url.searchParams.set("access_token", token);

  const res = await fetch(url.href, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  if (!res.ok) {
    const body = await res.text();
    console.error("Strapi auth callback failed:", res.status, body);
    return NextResponse.redirect(new URL("/", request.url));
  }

  const data = await res.json();

  // 🔹 cookies() is also async in Next 16
  const cookieStore = await cookies();
  cookieStore.set("jwt", data.jwt, cookieConfig);

  // go to private route
  return NextResponse.redirect(new URL("/dashboard", request.url));
}
