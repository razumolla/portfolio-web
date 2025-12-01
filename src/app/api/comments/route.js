// app/api/comments/route.js
import { NextResponse } from "next/server";
import { getCommentsForArticle, createComment } from "@/lib/strapi/comments";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const articleId = searchParams.get("articleId"); // this is article.documentId

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
    const body = await request.json();
    const { title, article, author } = body;

    if (!title || !article) {
      return NextResponse.json(
        { error: "Missing title or article" },
        { status: 400 }
      );
    }

    const created = await createComment({
      title,
      articleDocumentId: article, // documentId
      authorDocumentId: author || null,
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
