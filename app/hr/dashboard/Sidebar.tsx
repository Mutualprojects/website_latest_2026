"use client";

import React, { useState, useEffect, ReactElement, cloneElement } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import {
  LayoutDashboard, Users, Briefcase, Settings,
  LogOut, ChevronLeft, ChevronRight
} from "lucide-react";

const BRAND_COLOR = "#07518a";

interface NavItemProps {
  icon: ReactElement;
  label: string;
  active: boolean;
  collapsed: boolean;
  badge?: number | string;
  onClick: () => void;
}

function NavItem({ icon, label, active, collapsed, badge, onClick }: NavItemProps) {
  const [hover, setHover] = useState(false);
  const bg = active ? "rgba(7,81,138,0.06)" : hover ? "#F8FAFC" : "transparent";
  const c = active ? BRAND_COLOR : hover ? "#1E293B" : "#64748B";

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        display: "flex",
        alignItems: "center",
        gap: collapsed ? 0 : 12,
        width: "100%",
        padding: collapsed ? "12px 0" : "11px 14px",
        borderRadius: 12,
        border: "none",
        cursor: "pointer",
        justifyContent: collapsed ? "center" : "flex-start",
        background: bg,
        color: c,
        transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
        position: "relative",
        fontFamily: "'DM Sans', sans-serif",
        fontWeight: active ? 700 : 500,
        fontSize: 13.5
      }}
    >
      {active && (
        <div style={{
          position: "absolute",
          right: 0,
          top: "50%",
          transform: "translateY(-50%)",
          width: 4,
          height: 20,
          background: BRAND_COLOR,
          borderRadius: "4px 0 0 4px"
        }} />
      )}
      <span style={{ flexShrink: 0, opacity: active ? 1 : 0.7, transition: "transform 0.2s" }}>
        {cloneElement(icon, { size: 18 } as any)}
      </span>
      {!collapsed && <span style={{ whiteSpace: "nowrap", flex: 1, textAlign: "left", letterSpacing: "-0.2px" }}>{label}</span>}
      {!collapsed && badge && (
        <span style={{
          background: active ? BRAND_COLOR : "#F1F5F9",
          color: active ? "#FFFFFF" : "#64748B",
          borderRadius: 8,
          padding: "2px 8px",
          fontSize: 10,
          fontWeight: 800,
          marginLeft: "auto"
        }}>{badge}</span>
      )}
    </button>
  );
}

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  collapsed: boolean;
  setCollapsed: (val: boolean) => void;
  mobileOpen: boolean;
  setMobileOpen: (val: boolean) => void;
  vacanciesCount: number;
}

export default function Sidebar({
  activeTab,
  onTabChange,
  collapsed,
  setCollapsed,
  mobileOpen,
  setMobileOpen,
  vacanciesCount
}: SidebarProps) {
  const router = useRouter();
  const [userData, setUserData] = useState<any>(null);
  const [userImage, setUserImage] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("hr_token");
      if (!token) return;

      try {
        const res = await axios.get("/strapi/api/users/me?populate=*", {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUserData(res.data);

        // Strapi Screenshot shows the field is named 'profile'
        let imageUrl = "";
        if (res.data.profile) imageUrl = res.data.profile.url;
        else if (res.data.image) imageUrl = res.data.image.url;
        else if (res.data.avatar) imageUrl = res.data.avatar.url;

        if (imageUrl) {
          const proxyUrl = imageUrl.startsWith("http")
            ? imageUrl.replace("http://183.82.117.36:2334", "/strapi")
            : `/strapi${imageUrl}`;
          setUserImage(proxyUrl);
        }
      } catch (err) {
        console.error("Failed to fetch user profile:", err);
        const localUser = localStorage.getItem("hr_user");
        if (localUser) setUserData(JSON.parse(localUser));
      }
    };

    fetchUser();
  }, []);

  const NAV = [
    { icon: <LayoutDashboard />, label: "Overview" },
    { icon: <Users />, label: "Registry" },
    { icon: <Briefcase />, label: "Vacancies", badge: vacanciesCount },
    { icon: <Users />, label: "Board of Directors" },
    { icon: <Users />, label: "Advisors" },
    { icon: <Settings />, label: "Systems" },
  ];

  const handleLogout = () => {
    localStorage.removeItem("hr_token");
    localStorage.removeItem("hr_user");
    router.push("/hr/login");
  };

  const SW = collapsed ? 68 : 248;

  return (
    <aside
      className={`sidebar${mobileOpen ? " open" : ""}`}
      style={{
        width: SW,
        height: "100vh",
        background: "#FFFFFF",
        display: "flex",
        flexDirection: "column",
        position: "fixed",
        top: 0,
        left: 0,
        bottom: 0,
        zIndex: 999,
        transition: "width 0.28s cubic-bezier(0.4, 0, 0.2, 1), transform 0.28s ease",
        overflow: "hidden",
        borderRight: "1px solid #F1F5F9",
        boxShadow: "4px 0 20px rgba(0,0,0,0.02)"
      }}
    >
      {/* Logo Section */}
      <div style={{
        padding: collapsed ? "20px 0" : "24px 20px",
        display: "flex",
        alignItems: "center",
        justifyContent: collapsed ? "center" : "flex-start",
        borderBottom: "1px solid #F8FAFC",
        flexShrink: 0,
        minHeight: 80,
        transition: "padding 0.28s ease"
      }}>
        {collapsed ? (
          <img
            src="/cricle%20b%20blue.png"
            alt="BTL"
            style={{ width: 32, height: 32, objectFit: "contain", animation: "fadeIn 0.3s ease" }}
          />
        ) : (
          <img
            src="/highbtlogo-tm-1.png"
            alt="Brihaspathi Technologies"
            style={{ height: 34, maxWidth: "180px", objectFit: "contain", animation: "fadeIn 0.3s ease" }}
          />
        )}
      </div>

      {/* Nav */}
      <nav style={{ padding: "12px", display: "flex", flexDirection: "column", gap: 4, flex: 1, overflowY: "auto" }}>
        {NAV.map(n => (
          <NavItem
            key={n.label}
            icon={n.icon}
            label={n.label}
            active={activeTab === n.label}
            collapsed={collapsed}
            badge={n.badge}
            onClick={() => {
              if (n.label === "Registry") router.push("/hr/team-management");
              else if (n.label === "Vacancies") router.push("/hr/vacancies");
              else if (n.label === "Board of Directors") router.push("/hr/board-management");
              else if (n.label === "Advisors") router.push("/hr/advisor-management");
              else {
                onTabChange(n.label);
                setMobileOpen(false);
              }
            }}
          />
        ))}
      </nav>

      {/* User Section */}
      <div style={{ padding: collapsed ? "14px 10px" : "14px 16px", borderTop: "1px solid #F8FAFC", flexShrink: 0, background: "#FCFDFF" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, justifyContent: collapsed ? "center" : "flex-start" }}>
          <div style={{ width: 36, height: 36, borderRadius: 10, background: "#F1F5F9", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, overflow: "hidden", border: "1px solid #E2E8F0" }}>
            {userImage ? (
              <img src={userImage} alt="User" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            ) : (
              <span style={{ fontFamily: "DM Sans", fontWeight: 700, fontSize: 12, color: "#64748B" }}>
                {userData?.username?.charAt(0).toUpperCase() || "HR"}
              </span>
            )}
          </div>
          {!collapsed && (
            <>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontFamily: "DM Sans", fontWeight: 700, fontSize: 13, color: "#1E293B", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  {userData?.username || "HR Manager"}
                </div>
                <div style={{ fontFamily: "DM Sans", fontSize: 10, color: "#94A3B8", marginTop: 1, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", fontWeight: 500 }}>
                  {userData?.email || "Administrator"}
                </div>
              </div>
              <button onClick={handleLogout} style={{ width: 32, height: 32, borderRadius: 8, background: "#FFF1F2", border: "none", color: "#F43F5E", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.2s" }}>
                <LogOut size={14} />
              </button>
            </>
          )}
        </div>
      </div>
    </aside>
  );
}
