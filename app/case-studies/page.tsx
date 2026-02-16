"use client";

import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import Link from "next/link";
import { motion } from "framer-motion";
import { Users } from "lucide-react";

const API = "http://172.30.0.200:1334/api";
const BRAND = "#07518a";

const getAuthHeaders = () => {
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export default function CaseStudiesPage() {
  const [caseStudies, setCaseStudies] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${API}/case-studies?populate[0]=image&populate[1]=sector`, {
        headers: getAuthHeaders(),
      })
      .then((res) => setCaseStudies(res.data?.data || []))
      .finally(() => setLoading(false));
  }, []);

  const sectors = useMemo(() => {
    const groups: Record<string, any[]> = {};
    caseStudies.forEach((cs) => {
      const sector = cs.sector?.title || "other";
      if (!groups[sector]) groups[sector] = [];
      groups[sector].push(cs);
    });
    return Object.keys(groups).map((name) => ({
      name,
      count: groups[name].length,
    }));
  }, [caseStudies]);

  if (loading) return <p className="text-center py-10">Loading...</p>;

  return (
    <div className="max-w-7xl mx-auto py-10 px-4" style={{ "--brand": BRAND } as any}>
      <h1 className="text-2xl font-bold text-[var(--brand)] mb-6">📂 Case Studies</h1>

      {sectors.map((s) => (
        <Link
          key={s.name}
          href={`/case-studies/${s.name.toLowerCase()}`}
          className="block p-4 mb-2 bg-white shadow rounded flex justify-between items-center hover:bg-gray-50"
        >
          <div className="flex items-center gap-2">
            <Users className="h-5 w-5 text-[var(--brand)]" />
            <span className="font-medium capitalize">{s.name}</span>
          </div>
          <span className="text-sm text-gray-600">{s.count}</span>
        </Link>
      ))}
    </div>
  );
}
