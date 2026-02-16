"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Linkedin, X } from "lucide-react";
import type { OrgGroup, OrgPerson } from "./org-groups";

/* ================= MAIN COMPONENT ================= */

export const TeamHoverGrid = ({ group }: { group: OrgGroup }) => {
  const [activePerson, setActivePerson] = useState<OrgPerson | null>(null);

  return (
    <>
      {/* SECTION */}
      <section className="space-y-10">
        {/* HEADER */}
        <div>
          <h2 className="text-3xl font-bold text-slate-900">
            {group.title}
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-slate-500">
            Leadership team driving strategy, innovation, and operational excellence.
          </p>
        </div>

        {/* GRID */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {group.people.map((person) => (
            <TeamCard
              key={person.id}
              person={person}
              onClick={() => setActivePerson(person)}
            />
          ))}
        </div>
      </section>

      {/* MODAL */}
      <AnimatePresence>
        {activePerson && (
          <ProfileModal
            person={activePerson}
            onClose={() => setActivePerson(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
};

/* ================= CARD (PHOTO ONLY) ================= */

const TeamCard = ({
  person,
  onClick,
}: {
  person: OrgPerson;
  onClick: () => void;
}) => {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 200, damping: 18 }}
      className="group cursor-pointer rounded-2xl border border-slate-200 bg-white shadow-sm hover:shadow-lg"
      onClick={onClick}
    >
      {/* IMAGE ONLY */}
      <div className="p-6">
        <img
          src={person.photo}
          alt={person.name}
          className="mx-auto h-48 w-48 rounded-full object-cover transition group-hover:scale-105"
        />
      </div>

      {/* CTA */}
      <div className="pb-6 text-center">
        <span className="text-sm font-semibold text-[#07518a] group-hover:underline">
          Know more
        </span>
      </div>
    </motion.div>
  );
};

/* ================= MODAL ================= */

const ProfileModal = ({
  person,
  onClose,
}: {
  person: OrgPerson;
  onClose: () => void;
}) => {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className="relative w-full max-w-5xl overflow-hidden rounded-2xl bg-white shadow-2xl"
      >
        {/* CLOSE BUTTON */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-10 rounded-full p-2 hover:bg-slate-100"
        >
          <X className="h-5 w-5 text-slate-600" />
        </button>

        {/* CONTENT */}
        <div className="grid md:grid-cols-2">
          {/* LEFT */}
          <div className="bg-slate-50 p-8">
            <img
              src={person.photo}
              alt={person.name}
              className="mx-auto h-[420px] w-full max-w-sm rounded-xl object-cover"
            />

            <div className="mt-6 text-center">
              <h3 className="text-2xl font-bold text-slate-900">
                {person.name}
              </h3>
              <p className="mt-1 text-sm text-slate-500">
                {person.designation}
              </p>

              {person.linkedin && (
                <a
                  href={person.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center justify-center rounded-full bg-[#0a66c2] p-3 text-white hover:opacity-90"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
              )}
            </div>
          </div>

          {/* RIGHT */}
          <div className="p-8">
            <p className="whitespace-pre-line text-sm leading-relaxed text-slate-700">
              {person.bio}
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};
