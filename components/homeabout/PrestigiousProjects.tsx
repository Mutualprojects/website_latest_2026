'use client';

import React from "react";
import Image, { StaticImageData } from "next/image";
import { motion, Variants } from "framer-motion";
import { CASE_STUDIES_BY_SECTOR } from "../../app/case-studies/data";

/* ------------------ Types ------------------ */

interface Project {
  id: number;
  name: string;
  project_objective: string;
  quote: string;
  company: string;
  city?: string;
  avatar: StaticImageData | string;
  sector: string;
}

/* ------------------ Animation Variants ------------------ */

const textReveal: Variants = {
  hidden: {
    opacity: 0,
    y: 40,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1] as const, // ✅ type-safe easing
    },
  },
};

const imageReveal: Variants = {
  hidden: {
    opacity: 0,
    y: 60,
    scale: 0.96,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 1,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  },
};

const BRAND = "#07518a";
const staggerContainer: Variants = {
  visible: {
    transition: { staggerChildren: 0.15, delayChildren: 0.1 },
  },
  hidden: {},
};
const staggerItem: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
  },
};

/* ------------------ Component ------------------ */

const PrestigiousProjects = () => {
  const governmentProjects: Project[] =
    CASE_STUDIES_BY_SECTOR["Government"] || [];

  return (
    <section className="py-28 bg-white overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header — staggered */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={staggerContainer}
          className="max-w-4xl mx-auto text-center mb-28"
        >
          <motion.span
            variants={staggerItem}
            className="inline-block text-xs font-semibold uppercase tracking-wider mb-4"
            style={{ color: BRAND }}
          >
            Our Work
          </motion.span>
          <motion.h2
            variants={staggerItem}
            className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6"
          >
            Prestigious Government Case Studies
          </motion.h2>
          <motion.div
            variants={{
              hidden: { scaleX: 0, opacity: 0 },
              visible: { scaleX: 1, opacity: 1, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const } },
            }}
            className="mx-auto mb-6 h-1 w-20 rounded-full origin-center"
            style={{ backgroundColor: BRAND }}
          />
          <motion.p
            variants={staggerItem}
            className="text-lg text-gray-600"
          >
            Large-scale, mission-critical surveillance and security projects
            delivered for central and state government institutions across India.
          </motion.p>
        </motion.div>

        {/* Projects — staggered list */}
        <motion.div
          className="space-y-36"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.08 }}
          variants={staggerContainer}
        >
          {governmentProjects.map((project, index) => {
            const isEven = index % 2 === 0;

            return (
              <motion.div
                key={project.id}
                variants={staggerItem}
                className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center"
              >
                {/* LEFT CONTENT */}
                <motion.div
                  variants={textReveal}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-80px" }}
                  className={isEven ? "" : "lg:order-2"}
                >
                  {/* Badges */}
                  <div className="flex flex-wrap gap-3 mb-5">
                    <span className="px-4 py-1 text-sm font-medium text-blue-700 bg-blue-100 rounded-full">
                      Government Project
                    </span>
                    {project.city && (
                      <span className="px-4 py-1 text-sm font-medium text-gray-700 bg-gray-100 rounded-full">
                        {project.city}
                      </span>
                    )}
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 leading-tight">
                    {project.name}
                  </h3>

                  {/* Objective */}
                  <p className="text-gray-700 text-lg leading-relaxed mb-8 max-w-xl">
                    {project.project_objective}
                  </p>

                  {/* Quote */}
                  {project.quote && (
                    <blockquote className="border-l-4 border-blue-600 pl-6">
                      <p className="italic text-gray-800 text-lg">
                        “{project.quote}”
                      </p>
                      <footer className="mt-3 text-sm font-semibold text-gray-600">
                        — {project.company}
                        {project.city ? `, ${project.city}` : ""}
                      </footer>
                    </blockquote>
                  )}
                </motion.div>

                {/* RIGHT IMAGE */}
                <motion.div
                  variants={imageReveal}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-80px" }}
                  className={`relative h-[360px] md:h-[440px] ${isEven ? "" : "lg:order-1"
                    }`}
                >
                  {typeof project.avatar === "string" ? (
                    <Image
                      src={project.avatar}
                      alt={project.name}
                      fill
                      className="object-contain"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  ) : (
                    <Image
                      src={project.avatar}
                      alt={project.name}
                      fill
                      className="object-contain"
                    />
                  )}
                </motion.div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Empty State */}
        {governmentProjects.length === 0 && (
          <div className="text-center text-gray-500 mt-24">
            No government case studies available.
          </div>
        )}
      </div>
    </section>
  );
};

export default PrestigiousProjects;