

"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";

const API_BASE = "/cms-api/api";

export default function ItemDetailPage() {
  const { itemSlug } = useParams();
  const [item, setItem] = useState<any>(null);

  useEffect(() => {
    axios
      .get(`${API_BASE}/items`, {
        params: {
          "filters[slug][$eq]": itemSlug,
          "populate[0]": "image",
          "populate[1]": "category",
        },
      })
      .then((res) => setItem(res.data.data?.[0] || null))
      .catch((err) => console.error("Error:", err));
  }, [itemSlug]);

  if (!item) return <p style={{ padding: 20 }}>Loading...</p>;

  const img = item.image?.[0]?.url;

  return (
    <div style={{ padding: 20 }}>
      <h1>{item.title}</h1>

      {img && (
        <img
          src={`/cms-api${img}`}
          width="350"
          style={{ marginTop: 10, borderRadius: 6 }}
          alt={item.title}
        />
      )}

      <p style={{ marginTop: 15 }}>{item.description}</p>
      <p style={{ marginTop: 10 }}>
        Category: {item.category?.title}
      </p>
    </div>
  );
}
