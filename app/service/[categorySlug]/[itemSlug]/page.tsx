

"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";

const API_BASE = "http://172.30.0.200:1334/api";

export default function ServiceDetailsPage() {
  const { categorySlug, itemSlug } = useParams();
  const [item, setItem] = useState<any>(null);

  useEffect(() => {
    axios
      .get(`${API_BASE}/items`, {
        params: {
          "filters[slug][$eq]": itemSlug,
          "filters[category][slug][$eq]": categorySlug,
          "populate[0]": "image",
          "populate[1]": "category",
        },
      })
      .then((res) => setItem(res.data?.data?.[0] || null))
      .catch((err) => console.error("Error fetching service:", err));
  }, [categorySlug, itemSlug]);

  if (!item) return <p>Service not found</p>;

  const img =
    item.image?.[0]?.formats?.medium?.url ||
    item.image?.[0]?.url ||
    "";

  return (
    <div style={{ padding: "20px" }}>
      <h1>{item.title}</h1>
      {img && (
        <img
          src={`http://172.30.0.200:1334${img}`}
          alt={item.title}
          width="300"
          style={{ borderRadius: 8 }}
        />
      )}
      <p style={{ marginTop: 10 }}>{item.description}</p>
    </div>
  );
}
