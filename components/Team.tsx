"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Linkedin } from "lucide-react";
import type { OrgGroup, OrgPerson } from "@/app/our-team/org-groups";

interface TeamHoverGridProps {
  group: OrgGroup;
}

export const TeamHoverGrid: React.FC<TeamHoverGridProps> = ({ group }) => {
  return (
    <section className="space-y-10 py-10">
      <div className="space-y-2 px-4 md:px-0">
        <h2 className="text-3xl font-bold tracking-tight text-slate-900">
          {group.title}
        </h2>
        <p className="max-w-2xl text-sm text-slate-500">
          Leadership team driving strategy, innovation, and operational excellence.
        </p>
      </div>

      {/* Responsive Grid: 1 col on mobile, 2 on sm, 3 on lg, 4 on xl */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {group.people.map((person) => (
          <FlipCard key={person.id} person={person} />
        ))}
      </div>
    </section>
  );
};

/* ---------------------------------------------------------------- */

interface FlipCardProps {
  person: OrgPerson;
}

const FlipCard: React.FC<FlipCardProps> = ({ person }) => {
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      className="relative h-[480px] w-full perspective"
      onMouseEnter={() => setFlipped(true)}
      onMouseLeave={() => setFlipped(false)}
      onClick={() => setFlipped(!flipped)} // Mobile tap support
    >
      <motion.div
        className="relative h-full w-full cursor-pointer"
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] as const }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* FRONT SIDE */}
        <div
          className="absolute inset-0 overflow-hidden rounded-2xl shadow-lg ring-1 ring-slate-200"
          style={{ backfaceVisibility: "hidden" }}
        >
          <img
            src={person.photo}
            alt={person.name}
            className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/20 to-transparent" />
          <div className="absolute bottom-0 p-6 text-white">
            <h3 className="text-xl font-bold leading-tight">{person.name}</h3>
            <p className="mt-1 text-sm font-medium uppercase tracking-wider text-slate-300">
              {person.designation}
            </p>
          </div>
        </div>

        {/* BACK SIDE */}
        <div
          className="absolute inset-0 flex flex-col rounded-2xl bg-slate-900 p-6 text-white shadow-2xl"
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
        >
          {/* Header (Fixed) */}
          <div className="mb-4 shrink-0 border-b border-white/10 pb-4">
            <span className="inline-block rounded-full bg-blue-500/10 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-blue-400 ring-1 ring-inset ring-blue-500/20">
              Leadership Profile
            </span>
            <h3 className="mt-3 text-xl font-bold">{person.name}</h3>
            <p className="text-xs uppercase tracking-wide text-slate-400">
              {person.designation}
            </p>
          </div>

          {/* Bio Area (Scrollable - Scrollbar hidden) */}
          <div 
            className="flex-1 overflow-y-auto pr-1 text-slate-300 scrollbar-hide"
            style={{ 
              msOverflowStyle: 'none', 
              scrollbarWidth: 'none',
              WebkitOverflowScrolling: 'touch' 
            }}
          >
            {/* Inline CSS to ensure scrollbar is hidden across browsers */}
            <style dangerouslySetInnerHTML={{__html: `
              .scrollbar-hide::-webkit-scrollbar { display: none; }
            `}} />
            
            <p className="text-sm leading-relaxed">
              {person.bio}
            </p>
          </div>

          {/* Footer/LinkedIn (Fixed at bottom) */}
          {person.linkedin && (
            <div className="mt-6 shrink-0 pt-2">
              <a
                href={person.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()} // Prevents flipping when clicking link
                className="group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-white px-4 py-3 text-sm font-bold text-slate-900 transition-all hover:bg-slate-100 active:scale-[0.98]"
              >
                <Linkedin className="h-4 w-4 transition-colors group-hover:text-blue-600" />
                Connect on LinkedIn
              </a>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};