// src/app/api/auth/set-cookie/route.js
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(request) {
  try {
    const { jwt } = await request.json();

    if (!jwt) {
      return NextResponse.json(
        { error: "JWT token is required" },
        { status: 400 }
      );
    }

    const cookieStore = await cookies();

    // Set the JWT cookie
    cookieStore.set("jwt", jwt, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 30, // 30 days
      path: "/",
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Error setting cookie:", error);
    return NextResponse.json(
      { error: "Failed to set cookie" },
      { status: 500 }
    );
  }
}
