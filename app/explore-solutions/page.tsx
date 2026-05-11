"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ShieldCheck,
  Zap,
  Building2,
  Network,
  Cpu,
  Sun,
  Bus,
  ScanFace,
  MonitorPlay,
  Settings,
  FileCode,
  Cctv,
  Server,
  ClipboardList,
} from "lucide-react";
import { servicesData } from "@/app/services/servicesdata";

/* ─── brand ─── */
const B = "#07518a";

/* ─── fade helper ─── */
const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.15 },
  transition: { duration: 0.55, delay, ease: [0.25, 1, 0.5, 1] as const },
});

/* ─── solution spotlight data ─── */
const SPOTLIGHTS = [
  {
    title: "AI Video Management System",
    desc: "Intelligent surveillance platform with real-time threat detection, facial recognition, ANPR, and centralized monitoring across thousands of cameras.",
    href: "/solutions/ai-vms-video-management-system",
    icon: MonitorPlay,
    color: "#0ea5e9",
  },
  {
    title: "Smart Bus Solution",
    desc: "Next-gen public transit technology — AI CCTV, GPS tracking, driver monitoring, Wi-Fi, breath analyzers, and big data analytics for safer travel.",
    href: "/solutions/smart-bus-solution",
    icon: Bus,
    color: "#10b981",
  },
  {
    title: "Solar EPC",
    desc: "End-to-end solar engineering, procurement, and construction for rooftop, ground-mount, and utility-scale installations across India.",
    href: "/solutions/solar-epc",
    icon: Sun,
    color: "#f59e0b",
  },
  {
    title: "Smart Biometric & Facial Recognition",
    desc: "Touchless, AI-driven identity verification with Aadhaar authentication, liveness detection, and enterprise-grade access control.",
    href: "/solutions/smart-biometric-facial-recognition",
    icon: ScanFace,
    color: "#8b5cf6",
  },
  {
    title: "ERP Software System",
    desc: "Cloud-native enterprise resource planning with finance, HR, supply chain, CRM, and AI-driven analytics modules.",
    href: "/solutions/erp-software-system",
    icon: Settings,
    color: "#ec4899",
  },
];

/* ─── service icon map ─── */
const SERVICE_ICONS: Record<string, React.ElementType> = {
  "system-integration-turnkey-delivery": Network,
  "solution-engineering-consulting": FileCode,
  "command-control-centre-engineering": MonitorPlay,
  "it-network-digital-infrastructure": Server,
  "ai-video-analytics-platform-integration": Cpu,
  "program-management-operations-om": ClipboardList,
  "software-products-services": Settings,
  "renewable-energy-solutions": Sun,
  "smart-bus-solutions": Bus,
  "law-enforcement-in-car-surveillance": Cctv,
  "ai-biometric-aadhaar-authentication": ScanFace,
};

/* ═════════════════════════════════════════════════════════════════
   PAGE
   ═════════════════════════════════════════════════════════════════ */
export default function ExploreSolutionsPage() {
  return (
    <div className="bg-white">
      {/* ───────────── HERO ───────────── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#07518a] via-[#064e82] to-[#043662] pt-32 pb-20 sm:pt-36 sm:pb-28 text-white">
        {/* subtle grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
            backgroundSize: "32px 32px",
          }}
        />

        <div className="relative z-10 max-w-5xl mx-auto px-5 sm:px-8 text-center">
          <motion.p
            {...fade(0)}
            className="text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-blue-200 mb-4"
          >
            Solutions &amp; Services
          </motion.p>
          <motion.h1
            {...fade(0.06)}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.4rem] font-extrabold leading-[1.1] tracking-tight"
          >
            Everything We Build,
            <br className="hidden sm:block" /> Deploy &amp; Manage
          </motion.h1>
          <motion.p
            {...fade(0.12)}
            className="mt-5 text-base sm:text-lg text-blue-100 max-w-2xl mx-auto leading-relaxed"
          >
            From AI-powered surveillance and smart energy infrastructure to
            enterprise platforms and nationwide system integration — explore the
            full spectrum of our technology capabilities.
          </motion.p>

          {/* quick category pills */}
          <motion.div
            {...fade(0.18)}
            className="mt-8 flex flex-wrap justify-center gap-2"
          >
            {["AI & Surveillance", "Smart Energy", "Enterprise Systems", "System Integration", "IoT & Connectivity"].map(
              (tag) => (
                <span
                  key={tag}
                  className="px-4 py-1.5 rounded-full text-[13px] font-medium text-white/90 border border-white/20 bg-white/10 backdrop-blur-sm"
                >
                  {tag}
                </span>
              )
            )}
          </motion.div>
        </div>
      </section>

      {/* ───────────── SOLUTION SPOTLIGHTS ───────────── */}
      <section className="max-w-7xl mx-auto px-5 sm:px-8 py-20">
        <motion.div {...fade(0)} className="max-w-3xl mb-12">
          <p
            className="text-xs font-bold uppercase tracking-[0.2em] mb-2"
            style={{ color: B }}
          >
            Product Solutions
          </p>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-950">
            Flagship platforms built for scale
          </h2>
          <p className="mt-3 text-gray-600 leading-relaxed">
            Purpose-built technology products deployed across government,
            defence, transportation, and enterprise environments.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {SPOTLIGHTS.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.div key={s.title} {...fade(0.06 * i)}>
                <Link
                  href={s.href}
                  className="group flex flex-col h-full rounded-2xl border border-gray-200 bg-white p-6 transition-all hover:-translate-y-1 hover:shadow-xl hover:border-gray-300"
                >
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center mb-4"
                    style={{ backgroundColor: `${s.color}14` }}
                  >
                    <Icon size={22} style={{ color: s.color }} />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 group-hover:text-[#07518a] transition-colors">
                    {s.title}
                  </h3>
                  <p className="mt-2 text-sm text-gray-600 leading-relaxed flex-1">
                    {s.desc}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-[#07518a] group-hover:gap-2.5 transition-all">
                    Learn more
                    <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
                  </span>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* ───────────── SERVICES GRID ───────────── */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <motion.div {...fade(0)} className="max-w-3xl mb-12">
            <p
              className="text-xs font-bold uppercase tracking-[0.2em] mb-2"
              style={{ color: B }}
            >
              Professional Services
            </p>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-950">
              End-to-end technology services
            </h2>
            <p className="mt-3 text-gray-600 leading-relaxed">
              From consulting and engineering to deployment and managed
              operations — our services cover the complete project lifecycle.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {servicesData.map((service, i) => {
              const Icon = SERVICE_ICONS[service.slug] || ShieldCheck;
              return (
                <motion.div key={service.slug} {...fade(0.04 * i)}>
                  <Link
                    href={`/our-services/${service.slug}`}
                    className="group relative flex flex-col h-full rounded-2xl overflow-hidden border border-gray-200 bg-white transition-all hover:-translate-y-1 hover:shadow-xl hover:border-gray-300"
                  >
                    {/* image */}
                    {service.mainimage && (
                      <div className="relative h-44 w-full overflow-hidden">
                        <Image
                          src={service.mainimage}
                          alt={service.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                        <div className="absolute bottom-3 left-4 right-4">
                          <h3 className="text-base font-bold text-white leading-snug">
                            {service.title}
                          </h3>
                        </div>
                      </div>
                    )}

                    {/* body */}
                    <div className="flex flex-1 flex-col p-5">
                      <p className="text-sm text-gray-600 leading-relaxed line-clamp-3 flex-1">
                        {service.description}
                      </p>
                      <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-[#07518a] group-hover:gap-2.5 transition-all">
                        Explore service
                        <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
                      </span>
                    </div>

                    {/* bottom accent */}
                    <span className="absolute inset-x-0 bottom-0 h-[3px] bg-gradient-to-r from-[#07518a] to-cyan-400 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500" />
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ───────────── CTA BANNER ───────────── */}
      <section className="bg-gradient-to-br from-[#07518a] to-[#043662] py-20">
        <div className="max-w-3xl mx-auto px-5 sm:px-8 text-center">
          <motion.h2
            {...fade(0)}
            className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white leading-tight"
          >
            Ready to transform your infrastructure?
          </motion.h2>
          <motion.p
            {...fade(0.08)}
            className="mt-4 text-base sm:text-lg text-blue-100 leading-relaxed"
          >
            Get in touch with our team to discuss how we can help you achieve
            your goals — from initial planning to nationwide deployment.
          </motion.p>
          <motion.div
            {...fade(0.16)}
            className="mt-8 flex flex-wrap justify-center gap-3"
          >
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full px-7 py-3 text-sm font-semibold bg-white text-[#07518a] shadow-lg hover:shadow-xl hover:bg-gray-50 transition-all"
            >
              Get in Touch
              <ArrowRight size={15} />
            </Link>
            <Link
              href="/our-projects"
              className="inline-flex items-center gap-2 rounded-full px-7 py-3 text-sm font-semibold text-white border border-white/30 hover:bg-white/10 transition-colors"
            >
              View Our Projects
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
