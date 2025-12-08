// proxy.js

import { NextResponse } from "next/server";

export async function proxy(request) {
  const currentPath = request.nextUrl.pathname;

  // Only protect /dashboard routes
  if (!currentPath.startsWith("/dashboard")) {
    return NextResponse.next();
  }

  const token = request.cookies.get("jwt")?.value;

  // No token → send to login
  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Verify token with Strapi
  const backendUrl =
    process.env.NEXT_PUBLIC_STRAPI_BASE_URL ?? "http://localhost:1337";

  const url = new URL("/api/users/me", backendUrl);

  try {
    const res = await fetch(url.href, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    const data = await res.json();

    if (!res.ok || data.error) {
      console.error("Invalid JWT in proxy, redirecting to login:", data.error);
      const response = NextResponse.redirect(new URL("/login", request.url));
      response.cookies.delete("jwt"); // clear bad token
      return response;
    }

    // All good → allow request
    return NextResponse.next();
  } catch (err) {
    console.error("Error verifying JWT in proxy:", err);
    const response = NextResponse.redirect(new URL("/login", request.url));
    response.cookies.delete("jwt");
    return response;
  }
}

// Apply proxy only to /dashboard routes
export const config = {
  matcher: ["/dashboard", "/dashboard/:path*"],
};
