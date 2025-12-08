// app/connect/[provider]/redirect/route.js

import { NextResponse } from "next/server";

const cookieConfig = {
  maxAge: 60 * 60 * 24 * 7, // 1 week
  path: "/",
  // Remove domain to avoid issues between localhost and production
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax",
};

export const dynamic = "force-dynamic";

export async function GET(request, { params }) {
  // In Next 16, params may be a Promise; await works either way
  const { provider } = await params;

  const { searchParams } = new URL(request.url);
  const token = searchParams.get("access_token");

  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
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
    return NextResponse.redirect(new URL("/login", request.url));
  }

  const data = await res.json();

  if (!data.jwt) {
    console.error("No JWT returned from Strapi auth callback:", data);
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // ✅ Create the redirect response and set the cookie ON THAT RESPONSE
  const response = NextResponse.redirect(new URL("/dashboard", request.url));
  response.cookies.set("jwt", data.jwt, cookieConfig);

  return response;
}
