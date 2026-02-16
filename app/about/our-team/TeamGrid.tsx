"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X, Linkedin } from "lucide-react";

const ease = [0.16, 1, 0.3, 1] as const;

/* ================= TYPES ================= */

export interface OrgPerson {
  id: number;
  name: string;
  designation: string;
  photo: string;
  bio: string;
  linkedin?: string;
}

export interface OrgGroup {
  title: string;
  people: OrgPerson[];
}

interface TeamGridProps {
  group: OrgGroup;
}

/* ================= COMPONENT ================= */

export default function TeamGrid({ group }: TeamGridProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const activePerson =
    activeIndex !== null ? group.people[activeIndex] : null;

  /* ================= Keyboard Support ================= */

  useEffect(() => {
    if (activeIndex === null) return;

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveIndex(null);
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [activeIndex]);

  const next = () =>
    setActiveIndex((i) =>
      i === null ? 0 : (i + 1) % group.people.length
    );

  const prev = () =>
    setActiveIndex((i) =>
      i === null ? 0 : (i - 1 + group.people.length) % group.people.length
    );

  /* ================= RENDER ================= */

  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 py-12 sm:py-16">
      {/* Header */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={{
          visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
          hidden: {},
        }}
        className="mb-12 max-w-4xl"
      >
        <motion.span
          variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0 } }}
          transition={{ duration: 0.5, ease }}
          className="inline-block text-sm font-semibold tracking-wide text-[#07518a] uppercase"
        >
          Company
        </motion.span>

        <motion.h2
          variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } }}
          transition={{ duration: 0.6, ease }}
          className="mt-2 text-3xl sm:text-4xl font-bold tracking-tight text-slate-900"
        >
          Our Amazing Team
        </motion.h2>

        <motion.div
          variants={{ hidden: { scaleX: 0 }, visible: { scaleX: 1 } }}
          transition={{ duration: 0.5, ease }}
          className="mt-3 h-1 w-16 rounded-full bg-[#07518a] origin-left"
        />

        <motion.p
          variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0 } }}
          transition={{ duration: 0.5, ease }}
          className="mt-5 text-base leading-relaxed text-slate-600"
        >
          A diverse group of professionals united by purpose, expertise, and a shared
          commitment to excellence. Our team brings together strategic vision, deep
          domain knowledge, and hands-on experience to deliver impactful solutions and
          drive sustainable growth.
        </motion.p>
      </motion.div>

      {/* Grid */}
      <motion.div
        className="grid gap-4 sm:gap-6 md:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={{
          visible: { transition: { staggerChildren: 0.04, delayChildren: 0.08 } },
          hidden: {},
        }}
      >
        {group.people.map((person, index) => (
          <motion.button
            key={person.id}
            variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0 } }}
            transition={{ duration: 0.45, ease }}
            onClick={() => setActiveIndex(index)}
            className="group relative overflow-hidden rounded-xl border border-slate-200 bg-white text-left shadow-sm hover:shadow-lg transition-shadow duration-300"
            whileHover={{ y: -4 }}
          >
            <div className="flex sm:block">
              <div className="w-28 sm:w-full aspect-square sm:aspect-[3/4] overflow-hidden bg-slate-100">
                <img
                  src={person.photo}
                  alt={person.name}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              <div className="p-4 flex-1 flex flex-col justify-center">
                <h3 className="text-sm font-semibold text-slate-900">
                  {person.name}
                </h3>
                <p className="mt-1 text-xs text-slate-500">
                  {person.designation}
                </p>
              </div>
            </div>
          </motion.button>
        ))}
      </motion.div>

      {/* ================= MODAL ================= */}
      <AnimatePresence>
        {activePerson && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease }}
            onClick={() => setActiveIndex(null)}
          >
            <motion.div
              className="relative w-full max-w-6xl max-h-[90vh] rounded-2xl bg-white shadow-2xl flex flex-col overflow-hidden"
              initial={{ scale: 0.96, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.96, opacity: 0, y: 12 }}
              transition={{ duration: 0.3, ease }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close */}
              <button
                onClick={() => setActiveIndex(null)}
                className="absolute right-4 top-4 z-10 rounded-full bg-white p-2 shadow hover:bg-slate-100"
              >
                <X size={18} />
              </button>

              {/* Content */}
              <div className="flex flex-1 overflow-hidden">
                {/* Image */}
                <div className="hidden md:flex md:w-2/5 items-center justify-center bg-slate-50 p-8">
                  <div className="aspect-[3/4] w-full max-w-sm overflow-hidden rounded-2xl shadow-lg">
                    <img
                      src={activePerson.photo}
                      alt={activePerson.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                </div>

                {/* Text (Scrollable only) */}
                <div className="flex-1 overflow-y-auto p-6 sm:p-8 md:p-10">
                  <h3 className="text-2xl sm:text-3xl font-bold text-slate-900">
                    {activePerson.name}
                  </h3>
                  <p className="mt-1 text-base font-medium text-slate-600">
                    {activePerson.designation}
                  </p>

                  <p className="mt-6 text-sm sm:text-base leading-relaxed text-slate-700">
                    {activePerson.bio}
                  </p>
                </div>
              </div>

              {/* ================= FIXED FOOTER (NO JUMP) ================= */}
              <div className="border-t bg-white px-6 py-4">
                <div className="mx-auto flex max-w-6xl items-center justify-between">
                  {/* LinkedIn – FIXED POSITION */}
                  {activePerson.linkedin ? (
                    <a
                      href={activePerson.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="LinkedIn profile"
                      className="inline-flex items-center justify-center rounded-full bg-[#0077b5] p-3 text-white hover:bg-[#006399] transition shadow-sm"
                    >
                      <Linkedin size={18} />
                    </a>
                  ) : (
                    <span />
                  )}

                  {/* Navigation */}
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-slate-500">
                      {activeIndex! + 1} / {group.people.length}
                    </span>

                    <button
                      onClick={prev}
                      className="rounded-full bg-slate-900 p-2 text-white hover:bg-slate-700"
                    >
                      <ChevronLeft size={20} />
                    </button>

                    <button
                      onClick={next}
                      className="rounded-full bg-slate-900 p-2 text-white hover:bg-slate-700"
                    >
                      <ChevronRight size={20} />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
