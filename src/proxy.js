// src/middleware.js
import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function proxy(request) {
  const currentPath = request.nextUrl.pathname;

  // Skip middleware for public routes
  if (
    currentPath.startsWith("/login") ||
    currentPath.startsWith("/api/auth") ||
    currentPath.startsWith("/_next") ||
    currentPath.startsWith("/static")
  ) {
    return NextResponse.next();
  }

  // Check for NextAuth token
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  // Check for JWT cookie
  const jwtCookie = request.cookies.get("jwt")?.value;

  // If no token and trying to access protected route
  if (!token && !jwtCookie && currentPath.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
