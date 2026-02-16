// app/about/Board_of_directors/page.tsx
"use client";

import React, { useRef, useState } from "react";
import Image, { StaticImageData } from "next/image";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
} from "framer-motion";
import { Linkedin, ArrowUpRight } from "lucide-react";

// Image Imports
import hyma from "../../../components/Board_of_directors/HYMAVATHI.jpg";
import murali from "../../../components/Board_of_directors/Murali.jpg";

/* =========================
   Brand / Types / Helpers
========================= */
const BRAND = "#07518a";

type Person = {
  id: number;
  name: string;
  designation: string;
  bio?: string;
  photo?: string | StaticImageData;
  linkedin?: string;
};

type OrgGroup = {
  id: string;
  title: string;
  people: Person[];
};

const initialsAvatar = (name: string): string =>
  `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(
    name
  )}&backgroundType=gradientLinear&fontFamily=Arial&fontWeight=700`;

/* =========================
   Data (Board of Directors)
========================= */
const BOARD: OrgGroup = {
  id: "top-management",
  title: "Board of Directors",
  people: [
    {
      id: 1,
      name: "Rajasekhar Papolu",
      designation: "Chairman & Managing Director",
      bio: "With a Computer Science Engineering background, Chairman & Managing Director Rajasekhar Papolu drives vision and growth. He integrates AI, advances software development, strengthening presence in India. His sales-and-services expands opportunities in software and security systems. Skilled in sales, business development, and project management, he champions innovation and excellence.",
      linkedin: "https://www.linkedin.com/in/rajas2121/",
      photo: "/teams/cmd.png",
    },
    {
      id: 2,
      name: "Hymavathi Papolu",
      designation: "Director – Administration",
      bio: "Hymavathi Papolu, Director of Administration, is a seasoned leader in organizational management. She blends expertise in accounting, finance, and operations to streamline processes and boost efficiency. By applying strategic financial practices and disciplined resource management, she ensures smooth Finance and Accounts performance, driving operational excellence, accountability, and sustainable, ongoing growth.",
      linkedin: "https://www.linkedin.com/in/hymavathi-papolu-464b65145/",
      photo: hyma,
    },
    {
      id: 3,
      name: "Murali Krishna Arasala",
      designation: "Executive Director",
      bio: "Since 2009, Murali Krishna has leveraged his MCA to excel as Chief Administration Officer, orchestrating daily operations and cross-department coordination. He oversees facilities, resources, and compliance, and leads tendering, documentation, and bid management across e-procurement platforms. Meticulous with Tender/RFP/EOI norms and tools like Tender Tiger, he drives reliable, efficient execution.",
      linkedin: "https://www.linkedin.com/in/murali-krishna-8603a3395/",
      photo: murali,
    },
  ],
};

/* =========================
   Motion helpers
========================= */
const ease = [0.16, 1, 0.3, 1] as const;
const staggerParent = { visible: { staggerChildren: 0.12, delayChildren: 0.08 }, hidden: {} };
const staggerItem = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } };

/* =========================
   Interactive Card Component
========================= */
function InteractiveCard({ person, index }: { person: Person; index: number }) {
  const isEven = index % 2 === 0;
  const photoSrc = person.photo || initialsAvatar(person.name);
  const [isHovered, setIsHovered] = useState(false);

  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Smooth spring physics
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Parallax transforms
  const yImg = useTransform(smoothProgress, [0, 1], isEven ? [-40, 40] : [40, -40]);
  const scale = useTransform(smoothProgress, [0, 0.5, 1], [0.95, 1, 0.95]);
  const opacity = useTransform(smoothProgress, [0, 0.2, 0.8, 1], [0.4, 1, 1, 0.4]);

  // Mouse position for tilt effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useTransform(mouseY, [-0.5, 0.5], [5, -5]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], [-5, 5]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setIsHovered(false);
  };

  return (
    <motion.div
      ref={ref}
      style={{ opacity }}
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ amount: 0.25, once: true }}
      transition={{ duration: 0.7, ease }}
      className="grid items-center gap-6 py-8 md:grid-cols-2 md:gap-12 lg:gap-16"
    >
      {/* Image Section */}
      <motion.div
        style={{ scale }}
        initial={{ opacity: 0, x: isEven ? -40 : 40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ amount: 0.3, once: true }}
        transition={{ duration: 0.6, ease, delay: 0.1 }}
        className={`${isEven ? "" : "md:order-last"} w-full`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
      >
        <motion.div
          style={{ 
            y: yImg,
            rotateX: isHovered ? rotateX : 0,
            rotateY: isHovered ? rotateY : 0,
          }}
          onMouseMove={handleMouseMove}
          className="group relative mx-auto aspect-[4/5] w-full max-w-[400px] overflow-hidden rounded-3xl shadow-2xl transition-shadow duration-500 hover:shadow-[0_25px_50px_-12px_rgba(7,81,138,0.4)]"
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
        >
          <Image
            src={photoSrc}
            alt={person.name}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, 400px"
            priority={index === 0}
          />
          
          {/* Gradient overlay */}
          <div
            className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            style={{
              background: `linear-gradient(180deg, transparent 0%, ${BRAND}40 100%)`,
            }}
          />

          {/* Shine effect */}
          <motion.div
            className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100"
            style={{
              background:
                "linear-gradient(135deg, transparent 0%, rgba(255,255,255,0.1) 50%, transparent 100%)",
            }}
            animate={isHovered ? { x: ["-100%", "100%"] } : {}}
            transition={{ duration: 1, ease: "easeInOut" }}
          />

          {/* Border glow */}
          <div className="absolute inset-0 rounded-3xl ring-1 ring-black/5 transition-all duration-500 group-hover:ring-2 group-hover:ring-white/20" />
        </motion.div>
      </motion.div>

      {/* Content Section */}
      <motion.div
        initial={{ opacity: 0, x: isEven ? 48 : -48 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ amount: 0.3, once: true }}
        transition={{ duration: 0.65, ease, delay: 0.15 }}
        className="w-full"
      >
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ amount: 0.2, once: true }}
          transition={{ duration: 0.6, ease, delay: 0.2 }}
          whileHover={{ y: -4 }}
          className="group relative overflow-hidden rounded-2xl border border-neutral-200/60 bg-white/90 p-6 shadow-lg backdrop-blur-sm transition-all duration-500 hover:shadow-2xl lg:p-8"
        >
          {/* Animated gradient background */}
          <motion.div
            className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            style={{
              background: `radial-gradient(800px circle at 50% 50%, ${BRAND}08, transparent 40%)`,
            }}
          />

          <motion.div
            className="relative z-10"
            initial="hidden"
            whileInView="visible"
            viewport={{ amount: 0.3, once: true }}
            variants={staggerParent}
            transition={{ duration: 0.5, ease }}
          >
            {/* Header */}
            <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
              <div className="flex-1 min-w-0">
                <motion.h3
                  variants={staggerItem}
                  transition={{ duration: 0.5, ease }}
                  className="text-2xl font-bold leading-tight transition-colors duration-300 lg:text-3xl"
                  style={{ color: BRAND }}
                >
                  {person.name}
                </motion.h3>
                <motion.div
                  variants={staggerItem}
                  transition={{ duration: 0.5, ease }}
                  className="mt-2 h-1 w-16 rounded-full origin-left"
                  style={{ backgroundColor: BRAND }}
                />
              </div>

              {person.linkedin && (
                <motion.a
                  href={person.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  variants={staggerItem}
                  transition={{ duration: 0.5, ease }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold text-white shadow-md transition-all duration-300 hover:shadow-lg hover:brightness-110"
                  style={{ backgroundColor: BRAND }}
                >
                  <Linkedin size={18} />
                  <span className="hidden sm:inline">LinkedIn</span>
                  <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </motion.a>
              )}
            </div>

            {/* Designation badge */}
            <motion.span
              variants={staggerItem}
              transition={{ duration: 0.5, ease }}
              className="inline-block rounded-full px-3 py-1.5 text-xs font-semibold transition-all duration-300 hover:scale-105"
              style={{
                color: BRAND,
                backgroundColor: "rgba(7,81,138,0.08)",
                border: "1px solid rgba(7,81,138,0.22)",
              }}
            >
              {person.designation}
            </motion.span>

            {/* Bio */}
            <motion.p
              variants={staggerItem}
              transition={{ duration: 0.5, ease }}
              className="mt-4 text-base leading-7 text-neutral-700 lg:text-lg lg:leading-8"
            >
              {person.bio || "Bio coming soon."}
            </motion.p>
          </motion.div>

          {/* Corner decoration */}
          <motion.div
            className="absolute -right-8 -top-8 h-32 w-32 rounded-full opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-20"
            style={{ backgroundColor: BRAND }}
          />
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

/* =========================
   Floating Shapes Background
========================= */
function FloatingShapes() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: 300 + i * 100,
            height: 300 + i * 100,
            backgroundColor: `${BRAND}${i === 0 ? "08" : i === 1 ? "05" : "03"}`,
            left: `${10 + i * 30}%`,
            top: `${20 + i * 25}%`,
            filter: "blur(60px)",
          }}
          animate={{
            x: [0, 20, 0],
            y: [0, -20, 0],
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 12 + i * 4,
            repeat: Infinity,
            ease: [0.45, 0, 0.55, 1] as const,
          }}
        />
      ))}
    </div>
  );
}

/* =========================
   Page Component
========================= */
export default function Page() {
  const group = BOARD;
  const headerRef = useRef<HTMLElement>(null);

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-gradient-to-b from-neutral-50 to-white">
      {/* Animated background */}
      <FloatingShapes />

      <main className="relative pt-20 pb-16">
        <section className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.header
            ref={headerRef}
            initial="hidden"
            animate="visible"
            variants={{
              visible: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
              hidden: {},
            }}
            className="mb-12 text-center md:mb-20"
          >
            <motion.div
              variants={{ hidden: { opacity: 0, scale: 0.9 }, visible: { opacity: 1, scale: 1 } }}
              transition={{ duration: 0.6, ease: [0.34, 1.56, 0.64, 1] as const }}
              className="mb-4 inline-block rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-wider"
              style={{
                color: BRAND,
                backgroundColor: "rgba(7,81,138,0.1)",
                border: "1px solid rgba(7,81,138,0.2)",
              }}
            >
              Leadership
            </motion.div>

            <motion.h1
              variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } }}
              transition={{ duration: 0.7, ease }}
              className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl"
              style={{ color: BRAND }}
            >
              {group.title}
            </motion.h1>

            <motion.div
              variants={{ hidden: { scaleX: 0 }, visible: { scaleX: 1 } }}
              transition={{ duration: 0.6, ease }}
              className="mx-auto mt-4 h-1 w-24 rounded-full origin-center"
              style={{ backgroundColor: BRAND }}
            />

            <motion.p
              variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0 } }}
              transition={{ duration: 0.6, ease }}
              className="mx-auto mt-6 max-w-2xl text-base text-neutral-600 sm:text-lg"
            >
              Meet the visionary leaders guiding our strategy, driving innovation, and
              executing excellence across every dimension of our organization.
            </motion.p>
          </motion.header>

          {/* Director Cards */}
          <div className="space-y-16 md:space-y-24 lg:space-y-32">
            {group.people.map((p, i) => (
              <InteractiveCard key={p.id} person={p} index={i} />
            ))}
          </div>

          {/* Divider */}
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            whileInView={{ scaleX: 1, opacity: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.7, ease }}
            className="mt-20 h-px w-full origin-center bg-gradient-to-r from-transparent via-neutral-300/60 to-transparent"
          />
        </section>
      </main>

      {/* Global styles to prevent horizontal scroll */}
      <style jsx global>{`
        html, body {
          overflow-x: hidden;
          max-width: 100vw;
        }
        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  );
}