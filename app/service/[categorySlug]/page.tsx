
"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import Link from "next/link";

const API_BASE = "/cms-api/api";

export default function ServiceCategoryPage() {
  const { categorySlug } = useParams();
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${API_BASE}/items`, {
        params: {
          "filters[category][slug][$eq]": categorySlug,
          "filters[category][type][$eq]": "service",
          "populate[0]": "image",
          "populate[1]": "category",
        },
      })
      .then((res) => setItems(res.data?.data || []))
      .catch((err) => console.error("Error fetching service items:", err))
      .finally(() => setLoading(false));
  }, [categorySlug]);

  if (loading) return <p>Loading services...</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h1>{categorySlug} Services</h1>
      <div style={{ display: "grid", gap: 10 }}>
        {items.map((item) => (
          <Link
            key={item.id}
            href={`/service/${categorySlug}/${item.slug}`}
            style={{
              border: "1px solid #ddd",
              padding: 10,
              borderRadius: 6,
              display: "block",
              textDecoration: "none",
            }}
          >
            {item.title}
          </Link>
        ))}
      </div>
    </div>
  );
}
