"use client";
import React, { useEffect, useState, useCallback, useMemo } from "react";
import {
  FaBuilding,
  FaCalendarAlt,
  FaFileImage,
  FaBox,
  FaCubes,
  FaUsers,
  FaBook,
  FaFolder,
  FaSpinner,
  FaCheckCircle,
  FaSyncAlt,
} from "react-icons/fa";

const API = "http://172.30.0.200:1334/api";

/* -------------------------------------------------
   AUTH HEADERS (TS FIXED)
-------------------------------------------------- */
const getAuthHeaders = (): HeadersInit => {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  if (!token) return {};
  return { Authorization: `Bearer ${token}` };
};

/* -------------------------------------------------
   FORMAT DATE (TS FIXED)
-------------------------------------------------- */
const formatDate = (dateString: string | null | undefined): string => {
  if (!dateString) return "N/A";
  try {
    const date = new Date(dateString);
    return date.toLocaleString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  } catch {
    return "Invalid Date";
  }
};

/* -------------------------------------------------
   ANIMATED COUNTER
-------------------------------------------------- */
const CountUp = ({
  end,
  duration = 1500,
}: {
  end: number;
  duration?: number;
}) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number | undefined;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  }, [end, duration]);

  return <>{count}</>;
};

/* -------------------------------------------------
   MAIN PAGE
-------------------------------------------------- */
export default function SuperAdminDashboard() {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    departments: 0,
    events: 0,
    items: 0,
    sectors: 0,
    members: 0,
    caseStudies: 0,
    categories: 0,
    mediaFiles: 0,
    ongoingProjects: 0,
    completedProjects: 0,
  });

  const [recentData, setRecentData] = useState<
    { type: string; title: string; createdAt: string }[]
  >([]);

  /* -------------------------------------------------
     FETCH DASHBOARD DATA
  -------------------------------------------------- */
  const fetchDashboardData = useCallback(async () => {
    try {
      setLoading(true);

      const urls = [
        "/departments",
        "/events",
        "/items",
        "/sectors",
        "/members",
        "/case-studies",
        "/categories",
      ];

      const fetchRequests = urls.map((url) =>
        fetch(`${API}${url}`, {
          headers: { ...getAuthHeaders() },
        }).then((res) => res.json())
      );

      const mediaFilesReq = fetch(`${API}/upload/files`, {
        headers: { ...getAuthHeaders() },
      }).then((res) => res.json());

      const projectsReq = fetch(`${API}/projects?populate=*`, {
        headers: { ...getAuthHeaders() },
      }).then((res) => res.json());

      const [
        dep,
        evt,
        itm,
        sec,
        mem,
        cs,
        cat,
        mediaRes,
        projectsRes,
      ] = await Promise.all([...fetchRequests, mediaFilesReq, projectsReq]);

      const projects = projectsRes?.data || [];

      const ongoingProjects = projects.filter(
        (p: any) => p.projectobjective?.toLowerCase() === "ongoing"
      ).length;

      const completedProjects = projects.filter(
        (p: any) => p.projectobjective?.toLowerCase() === "completed"
      ).length;

      setStats({
        departments: dep.data?.length || 0,
        events: evt.data?.length || 0,
        items: itm.data?.length || 0,
        sectors: sec.data?.length || 0,
        members: mem.data?.length || 0,
        caseStudies: cs.data?.length || 0,
        categories: cat.data?.length || 0,
        mediaFiles: mediaRes?.length || 0,
        ongoingProjects,
        completedProjects,
      });

      const mapItem = (item: any, type: string) => ({
        type,
        title:
          item.title ||
          item.name ||
          item.attributes?.title ||
          item.attributes?.name ||
          "Untitled",
        createdAt: item.createdAt || item.attributes?.createdAt || null,
      });

      setRecentData(
        [
          ...projects.map((p: any) => mapItem(p, "Project")),
          ...(evt.data || []).map((e: any) => mapItem(e, "Event")),
          ...(cs.data || []).map((c: any) => mapItem(c, "Case Study")),
          ...(itm.data || []).map((i: any) => mapItem(i, "Item")),
        ]
          .filter((i) => i.createdAt)
          .sort(
            (a, b) =>
              new Date(b.createdAt).getTime() -
              new Date(a.createdAt).getTime()
          )
          .slice(0, 5)
      );
    } catch (error) {
      console.error("Dashboard Error:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  /* -------------------------------------------------
     CARD CONFIG
  -------------------------------------------------- */
  const cards = useMemo(
    () => [
      {
        title: "Departments",
        count: stats.departments,
        icon: <FaBuilding />,
        link: "/super-admin/Add-departments",
        color: "from-purple-500 to-purple-600",
      },
      {
        title: "Events",
        count: stats.events,
        icon: <FaCalendarAlt />,
        link: "/super-admin/events",
        color: "from-yellow-500 to-orange-500",
      },
      {
        title: "Media Files",
        count: stats.mediaFiles,
        icon: <FaFileImage />,
        link: "/super-admin/media-files",
        color: "from-pink-500 to-red-500",
      },
      {
        title: "Items",
        count: stats.items,
        icon: <FaBox />,
        link: "/super-admin/items",
        color: "from-green-500 to-teal-500",
      },
      {
        title: "Sectors",
        count: stats.sectors,
        icon: <FaCubes />,
        link: "/super-admin/case-sector",
        color: "from-blue-500 to-indigo-500",
      },
      {
        title: "Members",
        count: stats.members,
        icon: <FaUsers />,
        link: "/super-admin/members",
        color: "from-cyan-500 to-blue-500",
      },
      {
        title: "Case Studies",
        count: stats.caseStudies,
        icon: <FaBook />,
        link: "/super-admin/case-studies",
        color: "from-red-500 to-red-600",
      },
      {
        title: "Categories",
        count: stats.categories,
        icon: <FaFolder />,
        link: "/super-admin/categories",
        color: "from-orange-500 to-amber-500",
      },
      {
        title: "Ongoing Projects",
        count: stats.ongoingProjects,
        icon: <FaSyncAlt />,
        link: "/super-admin/projects",
        color: "from-indigo-500 to-blue-500",
      },
      {
        title: "Completed Projects",
        count: stats.completedProjects,
        icon: <FaCheckCircle />,
        link: "/super-admin/projects",
        color: "from-green-500 to-emerald-500",
      },
    ],
    [stats]
  );

  /* -------------------------------------------------
     UI
  -------------------------------------------------- */
  return (
    <div className="p-6 min-h-screen bg-gradient-to-br from-slate-100 via-white to-slate-200 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      {loading ? (
        <div className="flex justify-center items-center h-[70vh]">
          <FaSpinner className="text-5xl text-blue-500 animate-spin" />
        </div>
      ) : (
        <>
          {/* CARDS */}
          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-10">
            {cards.map((card, i) => (
              <a
                href={card.link}
                key={i}
                className="group block rounded-xl shadow-lg p-5 bg-white dark:bg-slate-800 hover:shadow-2xl hover:-translate-y-1 transform transition-all duration-300 border border-transparent hover:border-blue-500 dark:hover:border-sky-400"
              >
                <div
                  className={`w-14 h-14 mb-4 flex items-center justify-center rounded-xl shadow bg-gradient-to-br ${card.color} text-white text-2xl`}
                >
                  {card.icon}
                </div>

                <p className="text-sm text-slate-500 dark:text-slate-400">
                  {card.title}
                </p>

                <h2 className="text-3xl font-bold dark:text-white">
                  <CountUp end={card.count} />
                </h2>

                <div className="text-xs text-blue-600 dark:text-sky-400 mt-4 group-hover:underline">
                  Manage →
                </div>
              </a>
            ))}
          </section>

          {/* RECENT ACTIVITY */}
          <section className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
            <h2 className="text-lg font-bold dark:text-white mb-4">
              Recent Activity
            </h2>

            {recentData.length > 0 ? (
              recentData.map((item, i) => (
                <div
                  key={i}
                  className="flex items-center py-3 border-b last:border-0 dark:border-slate-700"
                >
                  <div className="w-10 h-10 flex items-center justify-center bg-slate-200 dark:bg-slate-600 rounded-full text-xl font-bold">
                    {item.title[0]}
                  </div>
                  <div className="ml-4">
                    <p className="text-base font-semibold dark:text-white">
                      {item.title}
                    </p>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      {formatDate(item.createdAt)}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-slate-500 dark:text-slate-400">
                No recent data
              </p>
            )}
          </section>
        </>
      )}
    </div>
  );
}
