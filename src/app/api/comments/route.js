// src/app/api/comments/route.js
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createComment, getCommentsForArticle } from "@/lib/strapi/comments";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const articleId = searchParams.get("articleId"); // article.documentId

    if (!articleId) {
      return NextResponse.json({ data: [] });
    }

    const comments = await getCommentsForArticle(articleId);

    return NextResponse.json(comments);
  } catch (err) {
    console.error("Comments GET error:", err);
    return NextResponse.json(
      { error: "Failed to load comments" },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("jwt")?.value;

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { title, article, userDocumentId } = body;

    if (!title || !article || !userDocumentId) {
      return NextResponse.json(
        { error: "Missing title, article, or userDocumentId" },
        { status: 400 }
      );
    }

    const created = await createComment({
      title,
      articleDocumentId: article,
      userDocumentId, // will map to users_permissions_user
    });

    return NextResponse.json(created, { status: 201 });
  } catch (err) {
    console.error("Comments POST error:", err);
    return NextResponse.json(
      { error: "Failed to create comment" },
      { status: 500 }
    );
  }
}
