"use client";

import React from "react";
import { motion } from "framer-motion";
import { Calendar, ArrowUpRight } from "lucide-react";

const BRAND = "#07518a";

interface ProjectCardProps {
  title: string;
  description: string;
  imageUrl: string;
  startDate: string;
  endDate: string;
  status: "completed" | "recent";
  index?: number;
}

export default function ProjectCard({
  title,
  description,
  imageUrl,
  startDate,
  endDate,
  status,
  index = 0,
}: ProjectCardProps) {
  const isRecent = status === "recent";

  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: 0.5,
        delay: index * 0.08,
        ease: [0.22, 1, 0.36, 1] as const,
      }}
      className="group relative rounded-2xl overflow-hidden bg-white border border-gray-200/80 shadow-sm hover:shadow-xl hover:border-[#07518a]/20 transition-all duration-300"
    >
      {/* Image container with hover zoom */}
      <div className="relative aspect-[16/10] overflow-hidden bg-gray-100">
        <img
          src={imageUrl}
          alt={title}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {/* Gradient overlay on hover */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background: `linear-gradient(to top, ${BRAND}ee 0%, transparent 50%)`,
          }}
        />
        {/* Status badge - floating on image */}
        <span
          className="absolute top-4 right-4 px-3 py-1.5 rounded-full text-xs font-semibold text-white shadow-lg backdrop-blur-sm"
          style={{
            backgroundColor: isRecent
              ? "rgba(217, 119, 6, 0.95)"
              : "rgba(71, 85, 105, 0.95)",
          }}
        >
          {isRecent ? "Recent" : "Completed"}
        </span>
        {/* Subtle corner accent */}
        <div
          className="absolute bottom-4 right-4 w-10 h-10 rounded-full bg-white/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ color: BRAND }}
        >
          <ArrowUpRight size={18} strokeWidth={2.5} />
        </div>
      </div>

      {/* Content */}
      <div className="p-5 sm:p-6">
        <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-[#07518a] transition-colors duration-200">
          {title}
        </h3>
        <p className="text-gray-600 text-sm leading-relaxed line-clamp-3 mb-4">
          {description}
        </p>
        <div className="flex items-center gap-2 text-gray-500 text-sm">
          <Calendar size={16} className="flex-shrink-0 text-[#07518a]/80" />
          <span>
            {startDate} → {endDate}
          </span>
        </div>
      </div>

      {/* Bottom accent line */}
      <div
        className="absolute bottom-0 left-0 right-0 h-1 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300"
        style={{ backgroundColor: BRAND }}
      />
    </motion.article>
  );
}
