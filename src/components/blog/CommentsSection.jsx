/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useEffect, useState } from "react";
import { Button } from "../ui/button";

export default function CommentsSection({ articleId, initialComments = [] }) {
  const [comments, setComments] = useState(initialComments);
  const [loading, setLoading] = useState(!initialComments.length);
  const [body, setBody] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function loadComments() {
    try {
      setLoading(true);

      const res = await fetch(
        `http://localhost:1337/api/comments?filters[article][documentId][$eq]=${articleId}&populate=*`,
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
    loadComments();
  }, [articleId]);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!body.trim()) return;

    setSubmitting(true);

    await fetch("/comments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: body.trim(),
        article: articleId, // documentId
        // author: "<authorDocumentId>" // later if you want
      }),
    });

    setBody("");
    setSubmitting(false);
    loadComments();
  }

  return (
    <section className="mt-12 max-w-5xl mx-auto border-t pt-8">
      <h2 className="text-xl font-semibold mb-4">Comments</h2>

      {/* list */}
      {loading ? (
        <p>Loading comments...</p>
      ) : comments.length === 0 ? (
        <p className="text-sm text-muted-foreground">No comments yet.</p>
      ) : (
        <div className="space-y-4 mb-8">
          {comments.map((comment) => {
            const authorName = comment.author?.name || "AnonymousUser";

            return (
              <div
                key={comment.id}
                className="rounded border bg-card p-3 text-sm"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="font-medium">{authorName}</span>
                  <span className="text-[11px] text-muted-foreground">
                    {new Date(comment.createdAt).toLocaleString()}
                  </span>
                </div>
                <p className="mt-2">{comment.title}</p>
              </div>
            );
          })}
        </div>
      )}

      {/* form */}
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
    </section>
  );
}
