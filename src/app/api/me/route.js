// src/app/api/me/route.js
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

const STRAPI_URL =
  process.env.NEXT_PUBLIC_STRAPI_BASE_URL ?? "http://localhost:1337";

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get("jwt")?.value;

  // Not logged in
  if (!token) {
    return NextResponse.json({ user: null }, { status: 200 });
  }

  try {
    const res = await fetch(`${STRAPI_URL}/api/users/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    if (!res.ok) {
      return NextResponse.json({ user: null }, { status: 200 });
    }

    const user = await res.json();
    return NextResponse.json({ user }, { status: 200 });
  } catch (err) {
    console.error("GET /api/me error", err);
    return NextResponse.json({ user: null }, { status: 200 });
  }
}
