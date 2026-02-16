"use client";

import React, { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, MapPin, Calendar } from "lucide-react";
import {
  cctvAndRelatedProjects,
  type Project,
  type YearlyProjects,
} from "./projects";

const BRAND = "#07518a";

function yearToId(year: string): string {
  return `year-${year.replace(/\s+/g, "-")}`;
}

/* Accent colors for cards: blue, teal, purple, orange, pink */
const CARD_ACCENTS = [
  { bar: "#2563eb", tagBg: "#dbeafe", tagText: "#1d4ed8" },   // blue
  { bar: "#0d9488", tagBg: "#ccfbf1", tagText: "#0f766e" },   // teal
  { bar: "#7c3aed", tagBg: "#ede9fe", tagText: "#5b21b6" },   // purple
  { bar: "#ea580c", tagBg: "#ffedd5", tagText: "#c2410c" },   // orange
  { bar: "#db2777", tagBg: "#fce7f3", tagText: "#be185d" },   // pink
] as const;

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.15 },
  transition: { duration: 0.55, delay, ease: [0.25, 1, 0.5, 1] as const },
});

/* ─── Horizontal timeline: scroll links + gradient for year in view ─── */
function HorizontalTimelineBar({
  years,
  selectedYear,
}: {
  years: string[];
  selectedYear: string;
}) {
  return (
    <div className="relative w-full overflow-x-auto pb-2 scrollbar-thin">
      <div className="flex min-w-max items-center gap-0 px-2">
        {years.map((year, i) => {
          const isSelected = year === selectedYear;
          const id = yearToId(year);
          return (
            <React.Fragment key={year}>
              {i > 0 && (
                <div
                  className="h-0.5 flex-1 min-w-[24px] max-w-[80px] shrink-0 rounded-full bg-gray-200"
                />
              )}
              <a
                href={`#${id}`}
                className={`relative group flex flex-col items-center shrink-0 rounded-xl px-3 py-2 transition-all duration-200 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#07518a]/40 focus:ring-offset-2 ${
                  isSelected ? "pb-3" : ""
                }`}
              >
                <div
                  className={`h-3.5 w-3.5 rounded-full shrink-0 transition-all duration-200 ${
                    isSelected
                      ? "shadow-[0_0_0_3px_rgba(255,255,255,1),0_0_0_4px_rgba(37,99,235,.3)]"
                      : "border-2 border-gray-300 bg-white group-hover:border-gray-400"
                  }`}
                  style={
                    isSelected
                      ? {
                          background: "linear-gradient(135deg, #3b82f6 0%, #7c3aed 100%)",
                        }
                      : undefined
                  }
                />
                <span
                  className={`mt-2 text-xs sm:text-sm font-bold whitespace-nowrap transition-colors ${
                    isSelected ? "text-[#2563eb]" : "text-gray-500"
                  }`}
                >
                  {year}
                </span>
                {isSelected && (
                  <div
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 rounded-full bg-[#2563eb]"
                    style={{ width: "calc(100% - 8px)", minWidth: 20 }}
                  />
                )}
              </a>
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}

/* ─── Colorful project card with rotating accent ─── */
function ProjectCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const accent = CARD_ACCENTS[index % CARD_ACCENTS.length];
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{
        duration: 0.45,
        delay: index * 0.05,
        ease: [0.22, 1, 0.36, 1] as const,
      }}
      className="group relative flex rounded-2xl overflow-hidden bg-white border border-gray-200/90 shadow-sm hover:shadow-xl transition-all duration-300 text-left"
    >
      {/* Left accent bar */}
      <div
        className="absolute left-0 top-0 bottom-0 w-1.5 shrink-0 group-hover:w-2 transition-all duration-300"
        style={{ backgroundColor: accent.bar }}
      />

      <div className="flex-1 min-w-0 pl-5 pr-5 py-5 sm:pl-6 sm:pr-6 sm:py-6">
        {/* Tags row: location (pill with accent), year (grey pill) */}
        <div className="flex flex-wrap items-center gap-2 mb-3">
          {project.location && (
            <span
              className="inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full"
              style={{
                backgroundColor: accent.tagBg,
                color: accent.tagText,
              }}
            >
              <MapPin size={12} />
              <span className="line-clamp-1 max-w-[140px] sm:max-w-[200px]">
                {project.location}
              </span>
            </span>
          )}
          <span className="inline-flex items-center gap-1 text-xs font-medium text-gray-500 bg-gray-100 px-2.5 py-1 rounded-full">
            <Calendar size={12} />
            {project.year}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-base sm:text-lg font-bold text-gray-900 leading-snug line-clamp-2">
          {project.customer}
        </h3>

        {/* Description */}
        <p className="mt-2.5 text-sm text-gray-600 leading-relaxed line-clamp-3">
          {project.scope}
        </p>
      </div>
    </motion.article>
  );
}

function YearSectionContent({ yearGroup }: { yearGroup: YearlyProjects }) {
  const { year, projects } = yearGroup;
  const id = yearToId(year);
  return (
    <section id={id} className="scroll-mt-28">
      <motion.div
        initial={{ opacity: 0, x: -12 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] as const }}
        className="flex items-baseline gap-4 mb-8"
      >
        <div className="h-10 w-1 rounded-full shrink-0 bg-[#2563eb]" />
        <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#2563eb]">
          {year}
        </h2>
        <span className="text-sm font-medium text-gray-500">
          {projects.length} project{projects.length !== 1 ? "s" : ""}
        </span>
      </motion.div>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {projects.map((project, i) => (
          <ProjectCard
            key={`${year}-${i}-${project.customer}`}
            project={project}
            index={i}
          />
        ))}
      </div>
      {projects.length === 0 && (
        <p className="text-gray-500 text-sm py-6">No projects listed yet for this year.</p>
      )}
    </section>
  );
}

export default function OurProjectsPage() {
  const yearlyGroups = useMemo(
    () => [...cctvAndRelatedProjects].reverse(),
    []
  );
  const years = useMemo(() => yearlyGroups.map((g) => g.year), [yearlyGroups]);
  const [selectedYear, setSelectedYear] = useState<string>(years[0] ?? "");
  const firstYear = cctvAndRelatedProjects[0]?.year ?? "—";
  const lastYear = cctvAndRelatedProjects[cctvAndRelatedProjects.length - 1]?.year ?? "—";

  // Scroll spy: highlight timeline year for the section in view
  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    const options: IntersectionObserverInit = {
      root: null,
      rootMargin: "-20% 0px -60% 0px",
      threshold: 0,
    };
    yearlyGroups.forEach(({ year }) => {
      const el = document.getElementById(yearToId(year));
      if (!el) return;
      const observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) setSelectedYear(year);
      }, options);
      observer.observe(el);
      observers.push(observer);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, [yearlyGroups]);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#07518a] via-[#064e82] to-[#043662] pt-32 pb-20 sm:pt-36 sm:pb-28 text-white">
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
        <div className="relative z-10 max-w-4xl mx-auto px-5 sm:px-8 text-center">
          <motion.p
            {...fade(0)}
            className="text-xs sm:text-sm font-semibold uppercase tracking-[0.25em] text-blue-200 mb-4"
          >
            Portfolio
          </motion.p>
          <motion.h1
            {...fade(0.06)}
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-[1.1] tracking-tight"
          >
            Our Projects
          </motion.h1>
          <motion.p
            {...fade(0.12)}
            className="mt-5 text-base sm:text-lg text-blue-100 max-w-2xl mx-auto leading-relaxed"
          >
            CCTV, surveillance, webcasting, solar, and system integration
            projects — delivered year by year across India.
          </motion.p>
        </div>
      </section>

      {/* Intro */}
      <section className="border-b border-gray-200 bg-gradient-to-b from-gray-50/90 to-white py-10 sm:py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
          <span
            className="inline-flex items-center rounded-full border px-3 py-1.5 text-xs font-semibold tracking-wider"
            style={{
              borderColor: `${BRAND}40`,
              color: BRAND,
              background: "rgba(255,255,255,0.9)",
            }}
          >
            YEAR WISE
          </span>
          <h2 className="mt-4 text-2xl sm:text-3xl font-bold text-neutral-900">
            Projects as Milestones
          </h2>
          <p className="mt-3 text-neutral-600 max-w-xl mx-auto">
            From <strong>{firstYear}</strong> to <strong>{lastYear}</strong> —
            explore our delivered projects by year.
          </p>
        </div>
      </section>

      {/* Sticky timeline bar */}
      <section className="sticky top-0 z-20 border-b border-gray-200 bg-white/95 backdrop-blur-sm py-5 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <HorizontalTimelineBar years={years} selectedYear={selectedYear} />
        </div>
      </section>

      {/* All year sections */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 pb-24 space-y-16">
        {yearlyGroups.map((yearGroup) => (
          <YearSectionContent key={yearGroup.year} yearGroup={yearGroup} />
        ))}
      </div>

      {/* CTA */}
      <section
        className="py-20"
        style={{
          background: "linear-gradient(135deg, #07518a 0%, #043662 100%)",
        }}
      >
        <div className="max-w-3xl mx-auto px-5 sm:px-8 text-center">
          <motion.h2
            {...fade(0)}
            className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white leading-tight"
          >
            Have a project in mind?
          </motion.h2>
          <motion.p
            {...fade(0.08)}
            className="mt-4 text-base sm:text-lg text-blue-100 leading-relaxed"
          >
            From advisory and design to deployment and long-term operations —
            we deliver end-to-end across India.
          </motion.p>
          <motion.div
            {...fade(0.16)}
            className="mt-8 flex flex-wrap justify-center gap-3"
          >
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full px-7 py-3 text-sm font-semibold bg-white text-[#07518a] shadow-lg hover:shadow-xl hover:bg-gray-50 transition-all"
            >
              Get in Touch
              <ArrowRight size={15} />
            </Link>
            <Link
              href="/casestudy"
              className="inline-flex items-center gap-2 rounded-full px-7 py-3 text-sm font-semibold text-white border border-white/30 hover:bg-white/10 transition-colors"
            >
              Case studies
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
