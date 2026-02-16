"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

const API_BASE = "http://172.30.0.200:1334/api";

export default function ServicesPage() {
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${API_BASE}/items`, {
        params: {
          "filters[category][type][$eq]": "service",
          "populate[0]": "image",
          "populate[1]": "category",
        },
      })
      .then((res) => setServices(res.data?.data || []))
      .catch((err) => console.error("Error fetching services:", err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p style={{ padding: 20 }}>Loading...</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h1>Service List</h1>
      <div style={{ display: "grid", gap: 10 }}>
        {services.map((service) => (
          <Link
            key={service.id}
            href={`/service/${service.category.slug}/${service.slug}`}
            style={{
              padding: "10px",
              border: "1px solid #ddd",
              borderRadius: 6,
              textDecoration: "none",
            }}
          >
            {service.title}
          </Link>
        ))}
      </div>
    </div>
  );
}
