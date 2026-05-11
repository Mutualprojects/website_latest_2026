"use client";

import React, { useEffect, useRef, useState } from "react";
import type { OrgGroup, OrgPerson } from "./org-groups";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface GsapScrollShowcaseProps {
  group: OrgGroup;
  titleText: string; // Example: "FAFFA"
}

const GsapScrollShowcase: React.FC<GsapScrollShowcaseProps> = ({
  group,
  titleText,
}) => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const textRef = useRef<HTMLHeadingElement | null>(null);
  const imagesRef = useRef<HTMLDivElement[]>([]);
  const [hoveredPerson, setHoveredPerson] = useState<OrgPerson | null>(null);

  // Store image refs safely
  const setImageRef = (el: HTMLDivElement | null, index: number) => {
    if (el) imagesRef.current[index] = el;
  };

  useEffect(() => {
    if (!sectionRef.current) return;

    /* ================= IMAGE REVEAL ON SCROLL ================= */
    gsap.fromTo(
      imagesRef.current,
      {
        opacity: 0,
        y: 60,
        scale: 0.9,
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top center",
          end: "top top",
          scrub: true,
        },
      }
    );

    /* ================= BIG TEXT SCROLL ================= */
    if (textRef.current) {
      gsap.fromTo(
        textRef.current,
        { y: 300 },
        {
          y: -200,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );
    }
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[240vh] bg-white overflow-hidden"
    >
      {/* ================= IMAGE ROW ================= */}
      <div className="sticky top-24 z-30 flex justify-center">
        <div className="flex gap-6">
          {group.people.map((person, index) => (
            <div
              key={person.id}
              ref={(el) => setImageRef(el, index)}
              onMouseEnter={() => setHoveredPerson(person)}
              onMouseLeave={() => setHoveredPerson(null)}
              className="w-24 h-24 md:w-28 md:h-28 rounded-2xl overflow-hidden bg-gray-200 cursor-pointer transition-transform duration-300 hover:scale-110"
            >
              <img
                src={person.photo}
                alt={person.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src =
                    "https://via.placeholder.com/200x200/07518a/ffffff?text=" +
                    person.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("");
                }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* ================= NAME DISPLAY ================= */}
      <div className="sticky top-56 z-20 h-16 flex items-center justify-center">
        {hoveredPerson && (
          <span className="text-[#07518a] text-3xl font-semibold tracking-wide">
            {hoveredPerson.name}
          </span>
        )}
      </div>

      {/* ================= BIG SCROLL TEXT ================= */}
      <div className="relative h-[150vh] flex items-end justify-center">
        <h1
          ref={textRef}     
          className="font-black select-none leading-none text-[#07518a]"
          style={{
            fontSize: "22rem",
          }}
        >
          {titleText}
        </h1>
      </div>
    </section>
  );
};

export default GsapScrollShowcase;
