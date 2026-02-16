"use client";

import React from "react";
import {
  Cctv,
  Home,
  BrainCircuit,
  Cpu,
  Network,
  Briefcase,
  LucideIcon,
} from "lucide-react";

/* ================= TYPES ================= */
type WhatWeDoItem = {
  title: string;
  paragraphOne: string;
  paragraphTwo: string;
  Icon: LucideIcon;
};

/* ================= DATA ================= */
const WHAT_WE_DO: WhatWeDoItem[] = [
  {
    title: "E-Security & Surveillance",
    Icon: Cctv,
    paragraphOne:
      "CCTV, video analytics, access control, and fire safety integrations.",
    paragraphTwo:
      "Designed for enterprise and city-scale deployments with high reliability, uptime, and centralized monitoring.",
  },
  {
    title: "Home & Building Automation",
    Icon: Home,
    paragraphOne:
      "Smart lighting, HVAC, voice/app control, and energy optimization.",
    paragraphTwo:
      "Comfort, savings, and control across residential, commercial, and campus environments — unified through automation.",
  },
  {
    title: "AI-Driven Software",
    Icon: BrainCircuit,
    paragraphOne:
      "Analytics dashboards, workflow automation, and intelligent alerting.",
    paragraphTwo:
      "We convert operational data into decisions — with real-time insights, reporting, and automated response workflows.",
  },
  {
    title: "IoT & ELV Systems",
    Icon: Cpu,
    paragraphOne:
      "Controllers, structured cabling, PA/BGM, and sensor-based systems.",
    paragraphTwo:
      "A robust foundation for smart infrastructure using standardized ELV systems and scalable IoT integration.",
  },
  {
    title: "IT & Telecom Infrastructure",
    Icon: Network,
    paragraphOne:
      "Networking, IP telephony, cloud connectivity, and datacenter setups.",
    paragraphTwo:
      "Secure connectivity, resilient networks, and enterprise-grade infrastructure built for performance and growth.",
  },
  {
    title: "Professional Services",
    Icon: Briefcase,
    paragraphOne:
      "Consulting, deployment, monitoring, and complete AMC solutions.",
    paragraphTwo:
      "From planning to long-term operations — our teams ensure successful rollout, health monitoring, and support.",
  },
];

/* ================= COMPONENT ================= */
export default function WhatWeDoSection() {
  return (
    <section className="w-full bg-white py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {/* HEADER */}
        <div className="mb-16 max-w-3xl">
          <p className="mb-3 text-xs uppercase tracking-[0.3em] text-[#07518a]">
            What We Do
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-black leading-tight">
            Secure, Automate, and{" "}
            <span className="text-[#07518a]">Connect</span> — End to End
          </h2>
          <p className="mt-4 text-base sm:text-lg text-gray-600">
            End-to-end solutions spanning security, automation, AI software, IoT,
            infrastructure, and services — built for reliability at scale.
          </p>
        </div>

        {/* ITEMS */}
        <div className="space-y-12">
          {WHAT_WE_DO.map((item) => (
            <div
              key={item.title}
              className="
                grid grid-cols-1 md:grid-cols-12 gap-8
                rounded-2xl border border-gray-200
                p-6 sm:p-8
                hover:shadow-lg transition-shadow
              "
            >
              {/* LEFT */}
              <div className="md:col-span-4 flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#07518a]/10">
                    <item.Icon className="h-6 w-6 text-[#07518a]" />
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold text-black">
                    {item.title}
                  </h3>
                </div>
              </div>

              {/* RIGHT */}
              <div className="md:col-span-8">
                <p className="mb-4 text-sm sm:text-base md:text-lg text-neutral-600 leading-relaxed">
                  {item.paragraphOne}
                </p>
                <p className="text-sm sm:text-base md:text-lg text-neutral-600 leading-relaxed">
                  {item.paragraphTwo}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
