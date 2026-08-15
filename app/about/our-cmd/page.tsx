"use client";

import React from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { Globe2 } from "lucide-react";
import MDLeadershipCard from "@/components/MDLeadershipCard";
import ForumsMembershipSection from "@/components/ui/ForumsMembershipSection";
import AwardsSection from "@/components/AwardsSection";

/* =========================================
  Brand & Assets
========================================= */
const BRAND = "#07518a";
import HERO_IMAGE from "../../src/md-corporate-head-shot-removebg-preview.png";
import Achivements from "./components/Achivements";
import AwardsCarousel from "./components/scroll";
import image_from from "./components/ET Industry Achievers - Post Event 26-03-2026-12.png";
import PremiumButton from "./components/button";
import ScrollBook from "../components/book";

/* =========================================
  Types & Data
========================================= */
type Contact = {
  phones: string[];
  emails: string[];
  website: string;
  location: string;
};

type Education = {
  degree: string;
  institution: string;
  year?: string | number;
};

type Experience = {
  title: string;
  org: string;
  start?: string | number;
  end?: string;
};

type PageOneProfile = {
  name: string;
  title: string;
  company: string;
  contact: Contact;
  summary: string;
  experience: Experience[];
  education: Education[];
};

const page1Data: PageOneProfile = {
  name: "Rajasekhar Papolu",
  title: "Chairman & Managing Director | Technology Innovator | Business Leader",
  company: "Brihaspathi Technologies Limited",
  contact: {
    phones: ["+91 9676012345", "+91 9032699999"],
    emails: ["md@brihaspathi.com", "rajas2121@gmail.com"],
    website: "https://www.brihaspathi.com",
    location: "Hyderabad, India",
  },
  summary:
    "He envisions technology not just as innovation, but as governance in motion — transforming cities, securing nations, and empowering enterprises through the intelligence of AI and IoT.",
  experience: [
    {
      title: "Managing Director",
      org: "Brihaspathi Technologies Limited",
      start: 2011,
      end: "Present",
    },
  ],
  education: [
    {
      degree: "MBA, Master of Business Administration",
      institution: "Osmania University",
      year: 2012,
    },
    {
      degree: "B.Tech, Computer Science Engineering",
      institution: "JNTU Hyderabad",
      year: 2009,
    },
  ],
};

/* =========================================
  Motion Helpers
========================================= */
const ease = [0.16, 1, 0.3, 1] as const;
const sectionReveal = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.15 },
  transition: { duration: 0.6, ease },
};

/* =========================================
  HERO SECTION
========================================= */
function Hero({ data }: { data: PageOneProfile }) {
  const reduce = useReducedMotion();

  return (
    <section
      aria-label="Hero"
      className="relative overflow-hidden bg-[#07518a] isolate"
      style={{
        height: "90vh",
        minHeight: 520,
        backgroundImage: "url(/images/md-hero-bg.png)",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* === Atmosphere layers === */}
      {/* 1. Vertical dim — keeps text readable at the bottom */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(7,81,138,0.50) 0%, rgba(7,81,138,0.68) 55%, rgba(4,45,78,0.92) 100%)",
        }}
      />
      {/* 2. Right-side spotlight — lifts the portrait off the bg */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(55% 65% at 82% 62%, rgba(255,255,255,0.12), transparent 65%)",
        }}
      />
      {/* 3. Subtle dot grid for texture */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "radial-gradient(rgba(255,255,255,0.6) 1px, transparent 1px)",
          backgroundSize: "22px 22px",
        }}
      />

      {/* === Main content wrapper — fills full height, content bottom-aligned === */}
      <div
        className="relative z-10 mx-auto flex h-full w-full items-end px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16"
        style={{ maxWidth: "1400px", gap: "clamp(0.75rem, 2.5vw, 3rem)" }}
      >
        {/* ===== LEFT: text column ===== */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            visible: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
            hidden: {},
          }}
          className="flex-1 min-w-0 flex flex-col justify-end"
          style={{
            paddingTop: "clamp(1.25rem, 3vw, 3rem)",
            paddingBottom: "clamp(1.25rem, 3.5vw, 3.5rem)",
            paddingRight: "clamp(0.25rem, 1vw, 1rem)",
          }}
        >
          {/* Eyebrow: accent line + role */}
          <motion.div
            variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0 } }}
            transition={reduce ? { duration: 0.01 } : { duration: 0.5, ease }}
            className="flex items-center"
            style={{ gap: "clamp(0.5rem, 1vw, 0.85rem)", marginBottom: "clamp(0.5rem, 1vw, 0.9rem)" }}
          >
            <span
              aria-hidden
              className="block bg-white/75"
              style={{ height: 2, width: "clamp(20px, 4vw, 44px)" }}
            />
            <span
              className="font-bold uppercase text-white/90"
              style={{
                fontSize: "clamp(9.5px, 1vw, 12px)",
                letterSpacing: "0.28em",
              }}
            >
              Chairman &amp; Managing Director
            </span>
          </motion.div>

          {/* Name — fluid scaling across every screen */}
          <motion.h1
            variants={{ hidden: { opacity: 0, y: 22 }, visible: { opacity: 1, y: 0 } }}
            transition={reduce ? { duration: 0.01 } : { duration: 0.65, ease }}
            className="font-black text-white"
            style={{
              fontSize: "clamp(22px, 5.4vw, 60px)",
              lineHeight: 1.04,
              letterSpacing: "-0.025em",
              textShadow: "0 2px 24px rgba(0,0,0,0.18)",
            }}
          >
            {data.name}
          </motion.h1>

          {/* Quote */}
          <motion.blockquote
            variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } }}
            transition={reduce ? { duration: 0.01 } : { duration: 0.6, ease }}
            className="relative text-white"
            style={{
              marginTop: "clamp(0.75rem, 1.6vw, 1.35rem)",
              paddingLeft: "clamp(0.75rem, 1.1vw, 1.1rem)",
              borderLeft: "3px solid rgba(255,255,255,0.7)",
            }}
          >
            {/* Decorative oversized quote mark */}
            <span
              aria-hidden
              className="absolute font-serif text-white/15 select-none leading-none"
              style={{
                top: "-0.4em",
                left: "0.25rem",
                fontSize: "clamp(42px, 5vw, 72px)",
              }}
            >
              &ldquo;
            </span>
            <p
              className="relative text-white/95"
              style={{
                fontSize: "clamp(12.5px, 1.55vw, 17px)",
                lineHeight: 1.6,
                maxWidth: "52ch",
              }}
            >
              &ldquo;{data.summary}&rdquo;
            </p>
          </motion.blockquote>



          {/* Award badge with subtle connector */}
          <motion.div
            variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } }}
            transition={reduce ? { duration: 0.01 } : { duration: 0.6, ease, delay: 0.08 }}
            className="flex items-center"
            style={{ marginTop: "clamp(1rem, 2vw, 1.75rem)", gap: "clamp(0.5rem, 1.2vw, 0.9rem)" }}
          >
            <span
              aria-hidden
              className="hidden sm:block bg-white/35"
              style={{ height: 2, width: "clamp(16px, 2vw, 28px)" }}
            />
            <Image
              src={image_from}
              alt="ET Industry Achievers"
              className="object-contain h-auto"
              style={{
                width: "clamp(200px, 13vw, 190px)",
                filter: "drop-shadow(0 6px 14px rgba(0,0,0,0.30))",
              }}
            />
          </motion.div>
        </motion.div>

        {/* ===== RIGHT: portrait, flush bottom-right ===== */}
        <motion.div
          initial={{ opacity: 0, y: 32, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={reduce ? { duration: 0.01 } : { duration: 1.0, ease, delay: 0.18 }}
          className="relative flex-shrink-0 self-end"
          style={{ width: "clamp(140px, 30vw, 420px)" }}
        >
          {/* Soft halo behind the person */}
          <div
            aria-hidden
            className="absolute left-1/2 -translate-x-1/2 bottom-0 -z-10 rounded-full blur-3xl"
            style={{
              width: "120%",
              height: "70%",
              background:
                "radial-gradient(closest-side, rgba(255,255,255,0.32), transparent 70%)",
              opacity: 0.55,
            }}
          />
          <Image
            src={HERO_IMAGE}
            alt={data.name}
            width={420}
            height={525}
            priority
            className="relative block h-auto w-full object-contain object-bottom"
            style={{
              filter: "drop-shadow(0 28px 40px rgba(0,0,0,0.42))",
            }}
          />
        </motion.div>
      </div>

      {/* Bottom gradient hairline — a refined finishing edge */}
      <div
        aria-hidden
        className="absolute bottom-0 left-0 right-0 pointer-events-none"
        style={{
          height: 3,
          background:
            "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.45) 50%, transparent 100%)",
        }}
      />
    </section>
  );
}
/* =====================================
  Leadership Section
========================================= */
function LeadershipSection() {
  return (
    <motion.section
      aria-label="Leadership"
      className="w-full bg-white"
      {...sectionReveal}
    >
      <MDLeadershipCard />
    </motion.section>
  );
}

/* =========================================
  PAGE
========================================= */
export default function Page() {
  const data = page1Data;

  return (
    <div className="relative min-h-screen overflow-x-clip bg-gradient-to-b from-slate-50/80 via-white to-white">
      <main className="w-full selection:bg-[rgba(7,81,138,0.15)] selection:text-slate-900">
        <Hero data={data} />
        {/* Section intro above leadership card */}
        <motion.section
          aria-label="Leadership overview"
          className="mx-auto max-w-6xl px-4 pt-6 pb-2 sm:px-6 lg:px-8"
          {...sectionReveal}
        >
          <p className="text-center text-slate-600 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Leading Brihaspathi Technologies with a blend of technical excellence and strategic vision—driving innovation in AI, IoT, and digital governance across India and beyond.
          </p>
        </motion.section>
        {/* <Achivements/> */}
        <LeadershipSection />
        <motion.div {...sectionReveal}>
          <ForumsMembershipSection />
        </motion.div>
        <AwardsCarousel />



        <motion.div {...sectionReveal}>
          {/* <AwardsSection /> */}
        </motion.div>
        <ScrollBook />
      </main>
    </div>
  );
}
