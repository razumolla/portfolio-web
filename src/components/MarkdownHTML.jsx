// src/components/MarkdownHTML.tsx
import React from "react";
import ReactMarkdown from "react-markdown";

const MarkdownHTML = ({ markdown }) => {
  if (!markdown) return null;

  return (
    <div className="prose dark:prose-invert max-w-none">
      <ReactMarkdown>{markdown}</ReactMarkdown>
    </div>
  );
};

export default MarkdownHTML;
