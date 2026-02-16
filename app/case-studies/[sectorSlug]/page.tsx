"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";

const API = "http://172.30.0.200:1334/api";
const BRAND = "#07518a";

export default function SectorCaseStudiesPage() {
  const pathname = usePathname();
  const sectorSlug = pathname?.split("/").pop();
  const [caseStudies, setCaseStudies] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${API}/case-studies?populate=*`, {
        headers: getAuthHeaders(),
      })
      .then((res) => {
        const filtered = res.data?.data?.filter(
          (c: any) => c.sector?.title?.toLowerCase() === sectorSlug
        );
        setCaseStudies(filtered || []);
      })
      .finally(() => setLoading(false));
  }, [sectorSlug]);

  if (loading) return <p className="text-center py-10">Loading...</p>;

  return (
    <div className="max-w-7xl mx-auto py-10 px-4">
      <h2 className="text-xl font-bold text-[var(--brand)] capitalize">
        Sector: {sectorSlug}
      </h2>

      {caseStudies.length === 0
        ? "No case studies found."
        : caseStudies.map((cs: any) => (
          <Link
            key={cs.id}
            href={`/case-studies/${sectorSlug}/${cs.name
              .toLowerCase()
              .replace(/[^a-z0-9]+/g, "-")}`}
            className="block p-4 mt-4 bg-white shadow rounded hover:bg-gray-50 flex justify-between items-center"
          >
            <span>{cs.name}</span>
            <ChevronRight className="h-5 w-5" />
          </Link>
        ))}
    </div>
  );
}

function getAuthHeaders() {
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
  return token ? { Authorization: `Bearer ${token}` } : {};
}
