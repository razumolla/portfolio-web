// src/app/api/auth/logout/route.js
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST() {
  try {
    const cookieStore = await cookies();

    // Delete the JWT cookie
    cookieStore.delete("jwt");

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Error clearing cookie:", error);
    return NextResponse.json(
      { error: "Failed to clear cookie" },
      { status: 500 }
    );
  }
}
