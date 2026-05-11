'use client';

import React from "react";
import Image, { StaticImageData } from "next/image";
import { CASE_STUDIES_BY_SECTOR, PRESTIGIOUS_LOGO_KAZIRANGA, PRESTIGIOUS_LOGO_TGBIE } from "../../app/case-studies/data";

/* ------------------ Types ------------------ */

interface Project {
  id: number;
  name: string;
  avatar: StaticImageData | string;
  sector: string;
}

/* ------------------ Prestigious cards (top row, same card style as others) ------------------ */

const PRESTIGIOUS_CARDS: Project[] = [
  { id: -1, name: "Kaziranga National Park & Tiger Reserve", avatar: PRESTIGIOUS_LOGO_KAZIRANGA, sector: "Government" },
  { id: -2, name: "Telangana Board of Intermediate Education, Hyderabad", avatar: PRESTIGIOUS_LOGO_TGBIE, sector: "Government" },
];

/* ------------------ Component ------------------ */

const GovernmentCaseStudyCards = () => {
  const governmentProjects: Project[] =
    CASE_STUDIES_BY_SECTOR["Government"] || [];
  const allCards: Project[] = [...PRESTIGIOUS_CARDS, ...governmentProjects];

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6">
            Prestigious Government Projects
          </h2>
          <p className="text-lg text-gray-600">
            Landmark government surveillance and security implementations
            delivered across India.
          </p>
        </div>

        {/* Single grid: Kaziranga + TGBIE first (top row), then rest in second row and below */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-14">
          {allCards.map((project) => (
            <div
              key={project.id}
              className="relative flex justify-center"
            >
              {/* Blob Background */}
              <div
                className="
                  absolute -top-8
                  w-44 h-44
                  bg-[#07518a]/10
                  rounded-full
                  blur-3xl
                "
              />

              {/* Card */}
              <div
                className="
                  relative
                  w-[260px]
                  h-[300px]
                  bg-white
                  rounded-3xl
                  shadow-xl
                  overflow-hidden
                  flex
                  flex-col
                  items-center
                  transition-all
                  duration-500
                  hover:-translate-y-3
                  hover:shadow-[0_30px_50px_rgba(0,0,0,0.18)]
                "
              >
                {/* Image */}
                <div className="relative w-full h-[180px] p-4">
                  {typeof project.avatar === "string" ? (
                    <Image
                      src={project.avatar}
                      alt={project.name}
                      fill
                      className="object-contain"
                      sizes="260px"
                    />
                  ) : (
                    <Image
                      src={project.avatar}
                      alt={project.name}
                      fill
                      className="object-contain"
                    />
                  )}
                </div>

                {/* Divider */}
                <div className="w-12 h-[3px] bg-[#07518a] rounded-full my-5" />

                {/* Title */}
                <div className="px-4 text-center">
                  <h3 className="text-lg font-bold text-[#07518a] leading-snug">
                    {project.name}
                  </h3>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {allCards.length === 0 && (
          <div className="text-center text-gray-500 mt-20">
            No government case studies available.
          </div>
        )}
      </div>
    </section>
  );
};

export default GovernmentCaseStudyCards;
