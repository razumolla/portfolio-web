// proxy.js
import { NextResponse } from "next/server";
import { getUserMeLoader } from "@/services/user-me-loader";

export async function proxy(request) {
  const user = await getUserMeLoader();
  const currentPath = request.nextUrl.pathname;

  if (currentPath.startsWith("/dashboard") && user.ok === false) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

// Apply proxy only to /dashboard routes
export const config = {
  matcher: ["/dashboard", "/dashboard/:path*"],
};
