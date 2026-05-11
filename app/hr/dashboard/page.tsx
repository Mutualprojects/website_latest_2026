"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import {
  Menu, Search, ChevronLeft, ChevronRight, Loader2
} from "lucide-react";
import TeamManager from "./TeamManager";
import DashboardOverview from "./DashboardOverview";
import Sidebar from "./Sidebar";

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

export default function HRDashboard() {
  useFonts();
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [tab, setTab] = useState("Overview");
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState("");
  const [mounted, setMounted] = useState(false);
  const [vacanciesCount, setVacanciesCount] = useState(0);

  useEffect(() => {
    const storedToken = localStorage.getItem("hr_token");
    if (!storedToken) {
      router.push("/hr/login");
      return;
    }
    setToken(storedToken);
    fetchMeta(storedToken);
    setMounted(true);
  }, [router]);

  const fetchMeta = async (tk: string) => {
    try {
      const headers = { Authorization: `Bearer ${tk}` };
      const jRes = await axios.get("/strapi/api/job-openings", { headers });
      setVacanciesCount(jRes.data.data.length);
    } catch (err) {
      console.error("Meta Fetch Error:", err);
    } finally {
      setLoading(false);
    }
  };

  if (!mounted) return null;

  const SW = collapsed ? 68 : 248;

  return (
    <>
      <style>{`
        @keyframes pulse{0%{box-shadow:0 0 0 0 rgba(59,130,246,0.3)}70%{box-shadow:0 0 0 10px rgba(59,130,246,0)}100%{box-shadow:0 0 0 0 rgba(59,130,246,0)}}
        * { box-sizing: border-box; }
        ::-webkit-scrollbar{width:6px;height:6px}
        ::-webkit-scrollbar-thumb{background:#CBD5E1;border-radius:10px}
        ::-webkit-scrollbar-track{background:transparent}
        body { margin: 0; overflow: hidden; }
        
        @media(max-width:900px){
          .sidebar{transform:translateX(-100%)!important}
          .sidebar.open{transform:translateX(0)!important}
          .main-content-area{margin-left:0!important}
          .desktop-hide-only{display:none!important}
          .mobile-menu-btn{display:flex!important}
          .header-search{display:none!important}
        }
      `}</style>

      <div style={{ display: "flex", height: "100vh", width: "100vw", background: "#F8FAFC", fontFamily: "DM Sans, system-ui, sans-serif", position: "relative", overflow: "hidden" }}>

        {/* OVERLAY */}
        {mobileOpen && <div onClick={() => setMobileOpen(false)} style={{ position: "fixed", inset: 0, background: "rgba(15,23,42,0.4)", backdropFilter: "blur(4px)", zIndex: 998 }} />}

        {/* ══ SIDEBAR ══ */}
        <Sidebar
          activeTab={tab}
          onTabChange={setTab}
          collapsed={collapsed}
          setCollapsed={setCollapsed}
          mobileOpen={mobileOpen}
          setMobileOpen={setMobileOpen}
          vacanciesCount={vacanciesCount}
        />

        {/* ══ MAIN ══ */}
        <main className="main-content-area" style={{ marginLeft: SW, flex: 1, display: "flex", flexDirection: "column", height: "100vh", transition: "margin-left 0.28s cubic-bezier(0.4,0,0.2,1)", position: "relative", zIndex: 1 }}>

          {/* FIXED HEADER */}
          <header style={{ height: 72, background: "rgba(255,255,255,0.85)", backdropFilter: "blur(25px)", borderBottom: "1px solid #E2E8F0", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 clamp(16px, 4vw, 28px)", flexShrink: 0, position: "sticky", top: 0, zIndex: 900, gap: 12 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <button onClick={() => setMobileOpen(true)} className="mobile-menu-btn" style={{ width: 40, height: 40, borderRadius: 12, background: "#fff", border: "1px solid #E2E8F0", display: "none", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "#475569", padding: 0, boxShadow: "0 2px 6px rgba(0,0,0,0.03)" }}>
                <Menu size={18} />
              </button>
              <button onClick={() => setCollapsed(!collapsed)} className="desktop-hide-only" style={{ width: 40, height: 40, borderRadius: 12, background: "#fff", border: "1px solid #E2E8F0", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "#475569", padding: 0, boxShadow: "0 2px 6px rgba(0,0,0,0.03)" }}>
                {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
              </button>
              <div>
                <div style={{ fontFamily: "DM Sans", fontWeight: 800, fontSize: 18, color: "#0F172A", letterSpacing: "-0.5px" }}>{tab}</div>
                <div className="header-title-sub" style={{ fontFamily: "DM Sans", fontSize: 11, color: "#94A3B8", display: "flex", alignItems: "center", gap: 6, marginTop: 2 }}>
                  <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#3B82F6", animation: "pulse 2s infinite" }} />
                  BTL.OS · Brihaspathi Technologies
                </div>
              </div>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div className="header-search" style={{ display: "flex", alignItems: "center", gap: 10, background: "#F1F5F9", borderRadius: 12, padding: "10px 16px" }}>
                <Search size={14} color="#94A3B8" />
                <input type="text" placeholder="Search team..." style={{ background: "none", border: "none", fontFamily: "DM Sans", fontSize: 13, color: "#334155", width: 180 }} />
              </div>
              <div style={{ width: 38, height: 38, borderRadius: 10, background: "linear-gradient(135deg,#3B82F6,#1D4ED8)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", boxShadow: "0 4px 12px rgba(59,130,246,0.2)", overflow: "hidden" }}>
                <span style={{ fontFamily: "DM Sans", fontWeight: 700, fontSize: 12, color: "#fff" }}>HR</span>
              </div>
            </div>
          </header>

          {/* SCROLLABLE CONTENT */}
          <div style={{ flex: 1, overflowY: "auto", position: "relative" }}>
            {loading ? (
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "400px", flexDirection: "column", gap: 16 }}>
                <Loader2 className="animate-spin text-blue-600" size={40} />
                <span style={{ fontFamily: "DM Sans", color: "#94A3B8", fontWeight: 500 }}>Initializing Command Center...</span>
              </div>
            ) : (
              <>
                {tab === "Overview" && <DashboardOverview token={token} />}
                {tab === "Registry" && <TeamManager />}
                {tab === "Vacancies" && <div className="p-10 text-center"><p className="text-slate-400">Redirecting to Vacancies Module...</p></div>}
                {tab === "Systems" && <div className="p-10 text-center"><p className="text-slate-400">System Configuration Locked</p></div>}
              </>
            )}

            {/* FOOTER */}
            <footer style={{ borderTop: "1px solid #E2E8F0", padding: "24px 32px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, flexWrap: "wrap", background: "rgba(255,255,255,0.5)" }}>
              <span style={{ fontFamily: "DM Sans", fontSize: 11, color: "#94A3B8" }}>© {new Date().getFullYear()} Brihaspathi Technologies · Secure HR Portal</span>
            </footer>
          </div>
        </main>

        {/* Sidebar collapse button (floating) */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="desktop-hide-only"
          style={{
            position: "fixed",
            top: 82,
            left: SW - 14,
            width: 28,
            height: 28,
            background: "#fff",
            border: "1px solid #E2E8F0",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#64748B",
            cursor: "pointer",
            boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
            zIndex: 1000,
            transition: "left 0.28s cubic-bezier(0.4,0,0.2,1), all 0.15s",
            padding: 0
          }}
          onMouseEnter={e => { e.currentTarget.style.background = "#3B82F6"; e.currentTarget.style.color = "#fff"; }}
          onMouseLeave={e => { e.currentTarget.style.background = "#fff"; e.currentTarget.style.color = "#64748B"; }}
        >
          {collapsed ? <ChevronRight size={13} /> : <ChevronLeft size={13} />}
        </button>
      </div>
    </>
  );
}