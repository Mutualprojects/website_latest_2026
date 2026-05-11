"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import PeopleCultureSection from "../../about/components/PeopleCultureSection";
import CertificationsSection from "../../about/components/CertificationsSection";

gsap.registerPlugin(ScrollTrigger);

/* ---------------- ASSETS ---------------- */
const logo = "/highbtlogo-white-tm.png";

/* ---------------- BRAND ---------------- */
const BRAND = "#07518a";

/* ---------------- COMPONENT ---------------- */
export default function Who() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // ✅ Disable pinning on mobile & tablet
    if (window.innerWidth < 1024) return;

    if (!sectionRef.current || !leftRef.current || !rightRef.current) return;

    const trigger = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top top",
      end: () =>
        `+=${rightRef.current!.offsetHeight - window.innerHeight}`,
      pin: leftRef.current,
      pinSpacing: true,
      scrub: 1,
    });

    return () => {
      trigger.kill();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-white overflow-hidden"
    >
      <div className="w-full bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 text-center">
          {/* Overline */}
          <p className="mb-3 text-xs uppercase tracking-[0.3em] text-[#07518a]">
            Who We Are
          </p>

          {/* Heading */}
          <h2 className="mb-6 text-2xl sm:text-3xl md:text-4xl font-extrabold text-black leading-tight">
            A solutions partner turning{" "}
            <span className="text-[#07518a]">Complex Technology</span>{" "}
            Into Powerful Outcomes
          </h2>

          {/* Description */}
          <p className="mx-auto max-w-3xl text-sm sm:text-base md:text-lg leading-relaxed text-gray-700">
            We focus on what matters most —{" "}
            <span className="font-medium text-black">Safety</span>,{" "}
            <span className="font-medium text-black">Uptime</span>, and{" "}
            <span className="font-medium text-black">Efficiency</span> — Delivering
            dependable solutions for enterprises, institutions, and city-scale
            projects across India.
          </p>
        </div>
      </div>

      {/* CONTENT */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* ================= LEFT — PINNED ================= */}
          <div
            ref={leftRef}
            className="
              lg:col-span-4
              pt-20 pb-20
              lg:pt-28 lg:pb-28
            "
          >
            {/* Label */}
            <div className="inline-flex items-center gap-2 mb-5">
              <span
                className="h-1 w-6 rounded-full"
                style={{ backgroundColor: BRAND }}
              />
              <span
                className="text-xs uppercase tracking-widest font-medium"
                style={{ color: BRAND }}
              >
                Who We Are
              </span>
            </div>

            {/* Heading */}
            <h2 className="text-3xl sm:text-4xl lg:text-4xl font-extrabold leading-tight text-black">
              The Guru of <br />
              <span style={{ color: BRAND }}>
                Tomorrow’s Technology
              </span>
            </h2>

            {/* Logo */}
            <img
              src={logo}
              alt="Brihaspathi Logo"
              className="mt-6 w-40 opacity-90"
            />
          </div>

          {/* ================= RIGHT — SCROLLING ================= */}
          <div
            ref={rightRef}
            className="
              lg:col-span-8
              pt-10 lg:pt-28
              pb-28
              space-y-10
            "
          >
            <p className="text-base sm:text-lg leading-relaxed text-black/70">
              <strong className="text-black">
                Brihaspathi Technologies Limited (BTL)
              </strong>{" "}
              is a premier digital transformation and sovereign security partner
              for industry-leading organizations and government entities. Since{" "}
              <span className="font-semibold" style={{ color: BRAND }}>
                2006
              </span>
              , we have pioneered the{" "}
              <span className="font-semibold text-black">
                Make in India
              </span>{" "}
              movement in high-tech surveillance, AI, and IoT systems.
            </p>

            <p className="text-base sm:text-lg leading-relaxed text-black/70">
              Rooted in a legacy of trust, we create long-term value for our{" "}
              <span className="font-semibold" style={{ color: BRAND }}>
                300+ specialists
              </span>
              , clients, and communities. Our infrastructure includes a
              state-of-the-art manufacturing facility in{" "}
              <span className="font-semibold text-black">
                Siddipet
              </span>
              , backed by operations across{" "}
              <span className="font-semibold text-black">
                India, USA, and Dubai
              </span>
              .
            </p>

            <p className="text-base sm:text-lg leading-relaxed text-black/70">
              Our partnerships endure across technology cycles — from early web
              engineering to today’s{" "}
              <span className="font-semibold" style={{ color: BRAND }}>
                Generative AI
              </span>{" "}
              and{" "}
              <span className="font-semibold" style={{ color: BRAND }}>
                Thermal IoT solutions
              </span>
              — enabling enterprises and nations to remain resilient, secure,
              and future-ready.
            </p>
          </div>
        </div>

        {/* ================= ADDITIONAL SECTIONS ================= */}
        <CertificationsSection />
        <PeopleCultureSection />

      </div>
    </section>
  );
}
