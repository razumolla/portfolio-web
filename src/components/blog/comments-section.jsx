/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useEffect, useState } from "react";

export default function CommentsSection({ articleId }) {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    authorName: "",
    authorEmail: "",
    body: "",
  });
  const [submitting, setSubmitting] = useState(false);

  async function loadComments() {
    setLoading(true);
    const res = await fetch(`/api/comments?articleId=${articleId}`);
    const json = await res.json();
    setComments(json.data || []);
    setLoading(false);
  }

  useEffect(() => {
    loadComments();
  }, [articleId]);

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);

    await fetch("/api/comments", {
      method: "POST",
      body: JSON.stringify({
        ...form,
        article: articleId,
      }),
    });

    setForm({
      authorName: "",
      authorEmail: "",
      body: "",
    });

    setSubmitting(false);
    loadComments();
  }

  return (
    <section className="mt-10 max-w-3xl mx-auto">
      <h2 className="text-xl font-semibold mb-4">Comments</h2>

      {loading ? (
        <p>Loading comments...</p>
      ) : comments.length === 0 ? (
        <p className="text-sm text-muted-foreground">No comments yet.</p>
      ) : (
        <div className="space-y-4 mb-8">
          {comments.map((comment) => (
            <div
              key={comment.id}
              className="rounded border bg-card p-3 text-sm"
            >
              <div className="font-medium">{comment.authorName}</div>
              <div className="text-xs text-muted-foreground">
                {new Date(comment.createdAt).toLocaleString()}
              </div>
              <p className="mt-2">{comment.body}</p>

              {/* Simple replies list */}
              {comment.children && comment.children.length > 0 && (
                <div className="mt-3 border-l pl-3 space-y-2">
                  {comment.children.map((reply) => (
                    <div key={reply.id} className="text-xs">
                      <div className="font-medium">{reply.authorName}</div>
                      <p>{reply.body}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="grid gap-3 md:grid-cols-2">
          <input
            type="text"
            placeholder="Name"
            className="w-full rounded border bg-background px-3 py-2 text-sm"
            value={form.authorName}
            onChange={(e) =>
              setForm((f) => ({ ...f, authorName: e.target.value }))
            }
            required
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full rounded border bg-background px-3 py-2 text-sm"
            value={form.authorEmail}
            onChange={(e) =>
              setForm((f) => ({ ...f, authorEmail: e.target.value }))
            }
            required
          />
        </div>
        <textarea
          placeholder="Your comment..."
          className="w-full rounded border bg-background px-3 py-2 text-sm min-h-[120px]"
          value={form.body}
          onChange={(e) => setForm((f) => ({ ...f, body: e.target.value }))}
          required
        />
        <button
          type="submit"
          disabled={submitting}
          className="inline-flex items-center rounded bg-primary px-4 py-2 text-sm font-medium text-primary-foreground disabled:opacity-60"
        >
          {submitting ? "Submitting..." : "Post comment"}
        </button>
      </form>
    </section>
  );
}
