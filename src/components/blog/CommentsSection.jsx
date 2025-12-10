/* eslint-disable react-hooks/exhaustive-deps */
"use client";

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_BASE_URL;
import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "../ui/button";

export default function CommentsSection({ articleId, initialComments = [] }) {
  const [comments, setComments] = useState(initialComments);
  const [loading, setLoading] = useState(!initialComments.length);
  const [body, setBody] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const [user, setUser] = useState(null);
  const [checkingUser, setCheckingUser] = useState(true);

  // 🔹 load logged-in user
  async function loadUser() {
    try {
      const res = await fetch("/api/me", { cache: "no-store" });
      if (!res.ok) {
        setUser(null);
        return;
      }
      const json = await res.json();
      setUser(json.user || null);
    } catch (err) {
      console.error("GET /api/me error", err);
      setUser(null);
    } finally {
      setCheckingUser(false);
    }
  }

  console.log("user", user);

  async function loadComments() {
    try {
      setLoading(true);

      const res = await fetch(
        `${STRAPI_URL}/api/comments?filters[article][documentId][$eq]=${articleId}&populate=*`,
        {
          cache: "no-store",
        }
      );

      if (!res.ok) {
        setComments([]);
        setLoading(false);
        return;
      }

      const json = await res.json();
      setComments(json.data || []);
      setLoading(false);
    } catch (err) {
      console.error("Comments GET error", err);
      setComments([]);
      setLoading(false);
    }
  }

  useEffect(() => {
    loadUser();
  }, []);

  useEffect(() => {
    loadComments();
  }, [articleId]);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!body.trim()) return;

    if (!user) {
      // optionally redirect to login
      return;
    }

    const userDocumentId = user.documentId ?? user.id;

    setSubmitting(true);

    const res = await fetch("/api/comments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: body.trim(),
        article: articleId, // article.documentId
        userDocumentId, // our own name; backend maps to users_permissions_user
      }),
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      console.error("Create comment failed", res.status, err);
    }

    setBody("");
    setSubmitting(false);
    loadComments();
  }

  return (
    <section className="mt-12 max-w-5xl mx-auto border-t pt-8">
      <h2 className="text-xl font-semibold mb-4">Comments</h2>

      {loading ? (
        <p>Loading comments...</p>
      ) : comments.length === 0 ? (
        <p className="text-sm text-muted-foreground">No comments yet.</p>
      ) : (
        <div className="space-y-4 mb-8">
          {comments.map((comment) => {
            // from Strapi response you pasted
            const author =
              comment.users_permissions_user ||
              comment.users_permissions_user_id;
            const authorName =
              author?.username || author?.email || "AnonymousUser";

            return (
              <div
                key={comment.id}
                className="flex gap-3 rounded-xl border bg-card/60 p-4 shadow-sm transition hover:shadow-md"
              >
                {/* Avatar */}
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
                  {authorName?.[0]?.toUpperCase() ?? "U"}
                </div>

                {/* Content */}
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex flex-row items-center gap-2">
                      <span className="text-sm font-semibold leading-tight">
                        {authorName}
                      </span>
                      <span className="text-[10px] text-muted-foreground">
                        {new Date(comment.createdAt).toLocaleString()}
                      </span>
                    </div>
                  </div>

                  <p className="text-sm leading-relaxed text-foreground/90">
                    {comment.title}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {checkingUser ? null : user ? (
        <form onSubmit={handleSubmit} className="space-y-3">
          <label className="block text-sm font-medium">
            Add a comment
            <textarea
              placeholder="Write something nice..."
              className="mt-1 w-full rounded border bg-background px-3 py-2 text-sm min-h-[100px]"
              value={body}
              onChange={(e) => setBody(e.target.value)}
              required
            />
          </label>

          <Button
            type="submit"
            disabled={submitting}
            className="inline-flex items-center rounded bg-primary px-4 py-2 text-sm font-medium text-primary-foreground disabled:opacity-60 cursor-pointer"
          >
            {submitting ? "Posting..." : "Post comment"}
          </Button>
        </form>
      ) : (
        <p className="text-sm text-muted-foreground">
          You need to{" "}
          <Link href="/login" className="underline">
            sign in
          </Link>{" "}
          to add a comment.
        </p>
      )}
    </section>
  );
}
