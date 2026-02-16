"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import ProjectCard from "./components/ProjectCard";
import { motion } from "framer-motion";
import dayjs from "dayjs";
import { FolderOpen, Clock, CheckCircle2, Loader2 } from "lucide-react";

const API = "http://172.30.0.200:1334/api";
const BRAND = "#07518a";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] as const },
});

export default function ProjectsPage() {
  const [recent, setRecent] = useState<any[]>([]);
  const [completed, setCompleted] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${API}/projects?populate=image`)
      .then((res) => {
        const today = dayjs();
        const projects = res.data.data ?? [];

        const recentProjects = projects.filter(
          (p: any) =>
            dayjs(p.endDate).isBefore(today) &&
            today.diff(dayjs(p.endDate), "day") <= 30
        );
        const completedProjects = projects.filter(
          (p: any) => today.diff(dayjs(p.endDate), "day") > 30
        );

        setRecent(recentProjects);
        setCompleted(completedProjects);
      })
      .catch(() => {
        setRecent([]);
        setCompleted([]);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-6">
        <Loader2
          size={40}
          className="animate-spin text-[#07518a]"
          strokeWidth={2}
        />
        <p className="text-gray-500 font-medium">Loading projects…</p>
      </div>
    );
  }

  const totalCount = recent.length + completed.length;

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#07518a] via-[#064e82] to-[#043662] pt-28 pb-20 sm:pt-32 sm:pb-24 text-white">
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.12) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.12) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
        <div className="relative z-10 max-w-4xl mx-auto px-5 sm:px-8 text-center">
          <motion.div
            {...fadeUp(0)}
            className="inline-flex items-center gap-2 text-blue-200 text-sm font-semibold uppercase tracking-[0.2em] mb-4"
          >
            <FolderOpen size={18} />
            Portfolio
          </motion.div>
          <motion.h1
            {...fadeUp(0.06)}
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight tracking-tight"
          >
            Projects Overview
          </motion.h1>
          <motion.p
            {...fadeUp(0.12)}
            className="mt-4 text-base sm:text-lg text-blue-100/90 max-w-2xl mx-auto leading-relaxed"
          >
            Recent deliveries and completed work — surveillance, webcasting,
            solar, and system integration across India.
          </motion.p>
          {totalCount > 0 && (
            <motion.div
              {...fadeUp(0.18)}
              className="mt-8 flex flex-wrap justify-center gap-6"
            >
              <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-medium">
                <Clock size={16} />
                {recent.length} recent
              </span>
              <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-medium">
                <CheckCircle2 size={16} />
                {completed.length} completed
              </span>
            </motion.div>
          )}
        </div>
      </section>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        {/* Recent Section */}
        {recent.length > 0 && (
          <section className="mb-16">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              className="flex items-center gap-3 mb-8"
            >
              <div
                className="h-1 w-12 rounded-full"
                style={{ backgroundColor: BRAND }}
              />
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
                Recent Projects
              </h2>
              <span className="text-sm text-amber-600 font-medium bg-amber-50 px-2.5 py-1 rounded-full">
                Last 30 days
              </span>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
              {recent.map((p: any, i: number) => (
                <ProjectCard
                  key={p.id}
                  title={p.title}
                  description={p.description}
                  imageUrl={`http://172.30.0.200:1334${p.image?.url}`}
                  startDate={p.startDate}
                  endDate={p.endDate}
                  status="recent"
                  index={i}
                />
              ))}
            </div>
          </section>
        )}

        {/* Completed Section */}
        <section>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            className="flex items-center gap-3 mb-8"
          >
            <div
              className="h-1 w-12 rounded-full bg-gray-400"
            />
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
              Completed Projects
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {completed.map((p: any, i: number) => (
              <ProjectCard
                key={p.id}
                title={p.title}
                description={p.description}
                imageUrl={`http://172.30.0.200:1334${p.image?.url}`}
                startDate={p.startDate}
                endDate={p.endDate}
                status="completed"
                index={recent.length + i}
              />
            ))}
          </div>
          {recent.length === 0 && completed.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16 px-6 rounded-2xl bg-gray-50 border border-gray-200"
            >
              <FolderOpen size={48} className="mx-auto text-gray-300 mb-4" />
              <p className="text-gray-600 font-medium">No projects to show yet.</p>
              <p className="text-gray-500 text-sm mt-1">
                Projects will appear here once they are added.
              </p>
            </motion.div>
          )}
        </section>
      </div>
    </div>
  );
}
