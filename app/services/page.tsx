"use client";

import React from "react";
import { motion } from "framer-motion";
import { Cctv, Cloud, Shield, Wifi, Cpu, Zap } from "lucide-react";
import ServicesGrid from "./ServicesGrid";

const BRAND = "#07518a";
const BANNER_IMAGE = "/355737.jpg";

const servicePillars = [
  { icon: Cctv, label: "E-Security & Surveillance" },
  { icon: Cloud, label: "Cloud & Analytics" },
  { icon: Shield, label: "Access Control" },
  { icon: Wifi, label: "IoT & Connectivity" },
  { icon: Cpu, label: "AI & Software" },
  { icon: Zap, label: "Smart Infrastructure" },
];

export default function Page() {
  return (
    <div className="relative w-full overflow-x-hidden bg-gradient-to-b from-neutral-50 to-white">
      {/* ================= HERO (same structure as About page) ================= */}
      <section
        className="relative min-h-[88vh] flex items-center bg-cover bg-center"
        style={{ backgroundImage: `url(${BANNER_IMAGE})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-white/95 via-white/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#07518a]/90 via-[#07518a]/70 to-transparent" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-20 lg:py-24 w-full">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            {/* LEFT */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as const }}
              className="text-white"
            >
              <div className="text-xs tracking-[0.3em] uppercase mb-4 text-blue-100">
                What We Offer
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight">
                Our{" "}
                <span className="bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                  Services
                </span>
              </h1>
              <p className="mt-6 max-w-xl text-blue-100 text-base sm:text-lg leading-relaxed">
                Secure, scalable, and future-ready solutions—from E-Security and AI to IoT and smart infrastructure—engineered for enterprises, governments, and institutions.
              </p>
            </motion.div>

            {/* RIGHT — service pillars (like About tech cards) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] as const }}
              className="hidden md:block"
            >
              <div className="grid grid-cols-2 gap-4">
                {servicePillars.map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.45, delay: 0.1 + i * 0.06, ease: [0.16, 1, 0.3, 1] as const }}
                      className="p-4 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20"
                    >
                      <div
                        className="w-9 h-9 rounded-lg flex items-center justify-center mb-3"
                        style={{
                          background: "linear-gradient(135deg, rgba(255,255,255,0.25), rgba(255,255,255,0.1))",
                        }}
                      >
                        <Icon size={18} className="text-white" />
                      </div>
                      <div className="text-sm font-semibold text-white">
                        {item.label}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ================= STATS BAR (like About page) ================= */}
      <section className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 mt-10 sm:-mt-10 lg:-mt-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] as const }}
          className="bg-white rounded-2xl shadow-2xl grid grid-cols-2 md:grid-cols-4 overflow-hidden"
        >
          {[
            { value: "20+", label: "Years of Excellence" },
            { value: "15K+", label: "Satisfied Clients" },
            { value: "300+", label: "Tech Experts" },
            { value: "Pan India", label: "Service Reach" },
          ].map((stat, i) => (
            <div
              key={i}
              className="p-6 md:p-8 text-center border-b md:border-b-0 md:border-r border-slate-100 last:border-r-0"
            >
              <div
                className="text-2xl md:text-3xl font-extrabold"
                style={{ color: BRAND }}
              >
                {stat.value}
              </div>
              <div className="mt-2 text-xs uppercase tracking-widest text-slate-500">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </section>

      <div className="h-16" />

      <ServicesGrid />
    </div>
  );
}

// Note: this page is a client component; canonical is provided via app/services/head.tsx