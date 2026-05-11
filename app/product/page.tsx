
"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

const API_BASE = "/cms-api/api";

export default function ProductsPage() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${API_BASE}/items`, {
        params: {
          "populate[0]": "image",
          "populate[1]": "category",
        },
      })
      .then((res) => setItems(res.data?.data || []))
      .catch((err) => console.error("Error fetching items:", err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p style={{ padding: "20px" }}>Loading...</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h1>Product List</h1>
      <div style={{ display: "grid", gap: 10 }}>
        {items.map((item) => (
          <Link
            key={item.id}
            href={`/product/${item.category.slug}/${item.slug}`} // ✔ FIXED HERE
            style={{
              padding: "10px",
              border: "1px solid #ddd",
              borderRadius: 6,
              textDecoration: "none",
              display: "block",
            }}
          >
            {item.title}
          </Link>
        ))}
      </div>
    </div>
  );
}
