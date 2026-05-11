"use client";

import React, { useState } from "react";
import type { OrgGroup, OrgPerson } from "./org-groups";

interface TeamShowcaseProps {
  group: OrgGroup;
}

const BRAND_COLOR = "#07518a";

const TeamShowcase: React.FC<TeamShowcaseProps> = ({ group }) => {
  const [activePerson, setActivePerson] = useState<OrgPerson | null>(null);

  return (
    <section className="relative min-h-screen overflow-hidden bg-white">
      {/* ================= BACKGROUND BRAND TEXT ================= */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <span
          className="select-none font-black opacity-10"
          style={{
            fontSize: "clamp(8rem, 25vw, 18rem)",
            color: BRAND_COLOR,
            lineHeight: 1,
          }}
        >
          ATT
        </span>
      </div>

      {/* ================= IMAGE ROW ================= */}
      <div className="relative z-10 pt-24">
        <div className="mx-auto flex max-w-7xl flex-wrap justify-center gap-5 px-6">
          {group.people.map((person) => {
            const isActive = activePerson?.id === person.id;

            return (
              <button
                key={person.id}
                type="button"
                aria-label={person.name}
                onMouseEnter={() => setActivePerson(person)}
                onMouseLeave={() => setActivePerson(null)}
                onClick={() =>
                  setActivePerson(isActive ? null : person)
                }
                className="group focus:outline-none"
              >
                <div
                  className={`h-24 w-24 overflow-hidden rounded-xl border bg-white transition-all duration-300
                    md:h-28 md:w-28
                    ${
                      isActive
                        ? "scale-110 shadow-lg"
                        : "hover:scale-110 hover:shadow-md"
                    }`}
                  style={{ borderColor: BRAND_COLOR }}
                >
                  <img
                    src={person.photo}
                    alt={person.name}
                    className="h-full w-full object-cover"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src =
                        "https://via.placeholder.com/200x200/f1f5f9/07518a?text=" +
                        person.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("");
                    }}
                  />
                </div>
              </button>
            );
          })}
        </div>

        {/* ================= NAME DISPLAY ================= */}
        <div className="mt-12 flex h-[90px] items-center justify-center">
          {activePerson && (
            <h2
              key={activePerson.id}
              className="animate-fadeIn font-bold tracking-wide text-center"
              style={{
                color: BRAND_COLOR,
                fontSize: "clamp(1.5rem, 4vw, 2.25rem)",
              }}
            >
              {activePerson.name}
            </h2>
          )}
        </div>
      </div>

      {/* ================= ANIMATIONS ================= */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.35s ease-out;
        }
      `}</style>
    </section>
  );
};

export default TeamShowcase;
