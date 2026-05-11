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
 <div>
     <section
      aria-label="Hero"
      className="relative overflow-hidden h-[92svh] min-h-[700px] bg-[#07518a]"
      style={{
        backgroundImage: "url(/images/md-hero-bg.png)",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Dark overlay for text readability */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[#07518a]/60"
      />

      {/* Subtle sheen */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(1200px 600px at -10% -20%, rgba(255,255,255,0.12), transparent 60%), radial-gradient(1200px 600px at 110% -10%, rgba(255,255,255,0.08), transparent 60%)",
        }}
      />

      {/* Animated background strip */}
      <motion.div
        aria-hidden
        initial={{ opacity: 0.2 }}
        animate={{ opacity: 0.45 }}
        transition={
          reduce
            ? { duration: 0.01 }
            : {
              duration: 2.2,
              repeat: Infinity,
              repeatType: "reverse",
            }
        }
        className="absolute -left-[10%] top-1/2 h-[120%] w-[70%] -translate-y-1/2 rotate-[12deg] bg-white/10 blur-3xl"
      />

      <div className="mx-auto grid h-full max-w-6xl grid-cols-1 items-center gap-8 px-4 py-8 sm:px-6 lg:grid-cols-2 lg:gap-14">
        {/* LEFT CONTENT — staggered */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            visible: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
            hidden: {},
          }}
          className="relative"
        >
          <motion.div
            variants={{
              hidden: { opacity: 0, x: -20 },
              visible: { opacity: 1, x: 0 },
            }}
            transition={reduce ? { duration: 0.01 } : { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const }}
            className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-[11px] font-semibold sm:text-xs"
            
          >
           
          </motion.div>

          <motion.h1
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={reduce ? { duration: 0.01 } : { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }}
            className="mt-3 font-black tracking-tight text-white"
            style={{ fontSize: "clamp(28px, 4.5vw, 56px)", lineHeight: 1.08 }}
          >
            {data.name}
          </motion.h1>

          <motion.p
            variants={{
              hidden: { opacity: 0, y: 12 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={reduce ? { duration: 0.01 } : { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const, delay: 0.08 }}
            className="mt-2 text-white/85 font-medium"
            style={{ fontSize: "clamp(14px, 1.8vw, 18px)" }}
          >
            Chairman & Managing Director
          </motion.p>

          <motion.blockquote
            variants={{
              hidden: { opacity: 0, y: 16 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={reduce ? { duration: 0.01 } : { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }}
            className="mt-5 border-l-4 pl-4 text-white/90 sm:mt-6"
            style={{ borderColor: "rgba(255,255,255,0.6)" }}
          >
            <p
              className="leading-relaxed"
              style={{ fontSize: "clamp(16px, 2.3vw, 20px)" }}
            >
              &ldquo;{data.summary}&rdquo;
            </p>
          </motion.blockquote>
        </motion.div>

        {/* RIGHT IMAGE */}
        <motion.div
          initial={{ y: 8, scale: 0.99, opacity: 0.95 }}
          animate={{ y: 0, scale: 1, opacity: 1 }}
          transition={
            reduce
              ? { duration: 0.01 }
              : {
                duration: 0.9,
                ease: [0.22, 1, 0.36, 1] as const,
                delay: 0.1,
              }
          }
          className="relative mx-auto w-full max-w-[520px] sm:max-w-[560px] mt-12"
        >
          <div className="relative w-full overflow-visible" style={{ aspectRatio: "4 / 5" }}>
            <Image
              src={HERO_IMAGE}
              alt={data.name}
              fill
              priority
              sizes="(max-width: 1024px) 90vw, 560px"
              className="object-contain will-change-transform"
            />
          </div>
        </motion.div>
      </div>
    </section>
 </div>
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
        <Achivements/>
        <LeadershipSection />
        <motion.div {...sectionReveal}>
          <ForumsMembershipSection />
        </motion.div>
        <motion.div {...sectionReveal}>
          <AwardsSection />
        </motion.div>
      </main>
    </div>
  );
}
