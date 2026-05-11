"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import {
  Menu, Search, ChevronLeft, ChevronRight, Loader2, Users
} from "lucide-react";
import TeamManager from "../dashboard/TeamManager";
import Sidebar from "../dashboard/Sidebar";

// ── FONT LOADER ──
function useFonts() {
  useEffect(() => {
    if (document.getElementById("hr-fonts")) return;
    const l = document.createElement("link");
    l.id = "hr-fonts";
    l.rel = "stylesheet";
    l.href = "https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,400&family=JetBrains+Mono:wght@400;500&display=swap";
    document.head.appendChild(l);
  }, []);
}

export default function TeamManagementPage() {
  useFonts();
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [vacanciesCount, setVacanciesCount] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("hr_token");
    if (!token) {
      router.push("/hr/login");
      return;
    }
    fetchMeta(token);
    setMounted(true);
  }, [router]);

  const fetchMeta = async (tk: string) => {
    try {
      const headers = { Authorization: `Bearer ${tk}` };
      const jRes = await axios.get("/strapi/api/job-openings", { headers });
      setVacanciesCount(jRes.data.data.length);
    } catch (err) {
      console.error("Meta Error:", err);
    } finally {
      setLoading(false);
    }
  };

  if (!mounted) return null;

  const SW = collapsed ? 68 : 248;

  return (
    <>
      <style>{`
        * { box-sizing: border-box; }
        ::-webkit-scrollbar{width:6px;height:6px}
        ::-webkit-scrollbar-thumb{background:#CBD5E1;border-radius:10px}
        body { margin: 0; overflow: hidden; }
        
        @media(max-width:900px){
          .sidebar{transform:translateX(-100%)!important}
          .sidebar.open{transform:translateX(0)!important}
          .main-content-area{margin-left:0!important}
        }
      `}</style>

      <div style={{ display: "flex", height: "100vh", width: "100vw", background: "#F8FAFC", fontFamily: "DM Sans, sans-serif", position: "relative", overflow: "hidden" }}>

        {/* SIDEBAR */}
        <Sidebar
          activeTab="Registry"
          onTabChange={() => router.push("/hr/dashboard")}
          collapsed={collapsed}
          setCollapsed={setCollapsed}
          mobileOpen={mobileOpen}
          setMobileOpen={setMobileOpen}
          vacanciesCount={vacanciesCount}
        />

        {/* MAIN */}
        <main style={{ marginLeft: SW, flex: 1, display: "flex", flexDirection: "column", height: "100vh", transition: "margin-left 0.28s ease", position: "relative" }}>

          <header style={{ height: 72, background: "rgba(255,255,255,0.85)", backdropFilter: "blur(25px)", borderBottom: "1px solid #E2E8F0", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 32px", flexShrink: 0, position: "sticky", top: 0, zIndex: 900 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <h1 style={{ fontFamily: "DM Sans", fontWeight: 800, fontSize: 20, color: "#0F172A", letterSpacing: "-0.5px" }}>Team Management</h1>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ position: "relative" }}>
                <Search style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "#94A3B8" }} size={16} />
                <input
                  type="text"
                  placeholder="Search registry..."
                  style={{ padding: "10px 12px 10px 40px", borderRadius: 12, border: "1px solid #E2E8F0", fontSize: 13, outline: "none", width: 220, background: "#F1F5F9" }}
                />
              </div>
              <button
                onClick={() => router.push("/hr/dashboard")}
                style={{ height: 42, padding: "0 20px", borderRadius: 12, border: "none", background: "#07518a", color: "#fff", fontSize: 12, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", gap: 8, boxShadow: "0 4px 12px rgba(7,81,138,0.2)" }}
              >
                Return to Overview
              </button>
            </div>
          </header>

          <div style={{ flex: 1, overflowY: "auto", position: "relative" }}>
            {loading ? (
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "400px" }}>
                <Loader2 className="animate-spin text-blue-600" size={32} />
              </div>
            ) : (
              <TeamManager />
            )}
          </div>
        </main>

        {/* Sidebar Toggle */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          style={{ position: "fixed", top: 82, left: SW - 14, width: 28, height: 28, background: "#fff", border: "1px solid #E2E8F0", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", color: "#64748B", cursor: "pointer", boxShadow: "0 4px 12px rgba(0,0,0,0.08)", zIndex: 1001, transition: "left 0.28s ease" }}
        >
          {collapsed ? <ChevronRight size={13} /> : <ChevronLeft size={13} />}
        </button>
      </div>
    </>
  );
}
