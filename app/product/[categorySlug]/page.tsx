
"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import Link from "next/link";

const API_BASE = "/cms-api/api";

export default function CategoryPage() {
  const { categorySlug } = useParams();
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${API_BASE}/items`, {
        params: {
          "filters[category][slug][$eq]": categorySlug,
          "populate[0]": "image",
          "populate[1]": "category",
        },
      })
      .then((res) => setItems(res.data.data || []))
      .catch((err) => console.error("Error fetching items:", err))
      .finally(() => setLoading(false));
  }, [categorySlug]);

  if (loading) return <p style={{ padding: 20 }}>Loading items...</p>;

  if (items.length === 0) {
    return <p style={{ padding: 20 }}>No items found under this category.</p>;
  }

  return (
    <div style={{ padding: 20 }}>
      <h1 style={{ textTransform: "capitalize" }}>{categorySlug}</h1>
      <div style={{ display: "grid", gap: 15 }}>
        {items.map((item) => {
          const img =
            item.image?.[0]?.formats?.thumbnail?.url || item.image?.[0]?.url;
          return (
            <Link
              key={item.id}
              href={`/product/${categorySlug}/${item.slug}`} // ✔ FIXED correctly
              style={{
                border: "1px solid #ddd",
                padding: 12,
                borderRadius: 6,
                textDecoration: "none",
                display: "block",
              }}
            >
              {img && (
                <img
                  src={`/cms-api${img}`}
                  width={100}
                  style={{ borderRadius: 6 }}
                  alt={item.title}
                />
              )}
              <p style={{ marginTop: 8 }}>{item.title}</p> {/* ✔ FIXED */}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
