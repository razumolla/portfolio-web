"use client";

import { useEffect, useState } from "react";
const STRAPI_URL = process.env.STRAPI_URL || "http://localhost:1337/api";

console.log("STRAPI_URL:", STRAPI_URL);

export function useAbout() {
  const [about, setAbout] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchAbout() {
      try {
        setLoading(true);
        const res = await fetch(`${STRAPI_URL}/about?populate=*`);

        if (!res.ok) {
          throw new Error("Failed to load about data");
        }

        const json = await res.json();
        setAbout(json.data);
      } catch (err) {
        console.error("Error loading about:", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    }

    fetchAbout();
  }, []);

  return { about, loading, error };
}
