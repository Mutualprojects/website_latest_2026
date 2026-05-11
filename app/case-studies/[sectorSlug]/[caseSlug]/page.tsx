"use client";

import { use, useRef, useEffect } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  motion,
  useScroll,
  useTransform,
  Variants,
} from "framer-motion";
import {
  ChevronLeft,
  AlertTriangle,
  CheckCircle,
} from "lucide-react";

import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

import { getCaseStudy } from "../../data";

import challengeImg from "../../casestudyimages/c1-01.png";
import solutionImg from "../../casestudyimages/c2-01.png";

/* ================= GSAP ================= */

gsap.registerPlugin(ScrollTrigger);

/* ================= BACKGROUND ================= */

const bgcase = "/futuristic-hexagon-mobile-phone-wallpaper-story.png";

/* ================= VARIANTS ================= */

const container: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 },
  },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const itemVariant: Variants = {
  hidden: { opacity: 0, x: -20, y: 10 },
  visible: {
    opacity: 1,
    x: 0,
    y: 0,
    transition: { duration: 0.45, ease: "easeOut" },
  },
};

/* ================= PAGE ================= */

export default function CaseStudyPage({
  params,
}: {
  params: Promise<{ sectorSlug: string; caseSlug: string }>;
}) {
  const { sectorSlug, caseSlug } = use(params);

  const study = getCaseStudy(sectorSlug, caseSlug);
  if (!study) notFound();

  /* ================= SCROLL REFS ================= */

  const challengeRef = useRef<HTMLDivElement>(null);
  const solutionRef = useRef<HTMLDivElement>(null);

  const objectiveSectionRef = useRef<HTMLElement>(null);
  const objectiveTextRef = useRef<HTMLHeadingElement>(null);

  /* ================= SCROLL PROGRESS ================= */

  const { scrollYProgress: challengeScroll } = useScroll({
    target: challengeRef,
    offset: ["start end", "end center"],
  });

  const { scrollYProgress: solutionScroll } = useScroll({
    target: solutionRef,
    offset: ["start end", "end center"],
  });

  /* ================= TRANSFORMS ================= */

  const challengeX = useTransform(challengeScroll, [0, 1], ["0%", "-40%"]);
  const challengeY = useTransform(challengeScroll, [0, 1], ["24px", "0px"]);

  const solutionX = useTransform(solutionScroll, [0, 1], ["0%", "40%"]);
  const solutionY = useTransform(solutionScroll, [0, 1], ["24px", "0px"]);

  /* ================= GSAP PROJECT OBJECTIVE ================= */

  useEffect(() => {
    if (!objectiveSectionRef.current || !objectiveTextRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        objectiveTextRef.current,
        {
          opacity: 0,
          y: 80,
          scale: 0.96,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: objectiveSectionRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, objectiveSectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      className="min-h-screen overflow-y-scroll no-scrollbar bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${bgcase})` }}
    >
      {/* ================= HERO ================= */}
      <motion.section
        variants={container}
        initial="hidden"
        animate="visible"
        className="max-w-7xl mx-auto px-6 py-24 grid lg:grid-cols-2 gap-16 items-center"
      >
        <motion.div variants={fadeUp}>
          <Link
            href="/case-studies"
            className="inline-flex items-center gap-2 text-[#07518a] font-medium mb-8"
          >
            <ChevronLeft size={18} />
            Go back
          </Link>

          <motion.h1
            variants={fadeUp}
            className="text-4xl md:text-5xl font-bold text-gray-900"
          >
            {study.name}
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mt-4 text-gray-600 text-lg"
          >
            {study.company} • {study.role} • {study.city}
          </motion.p>

          <motion.blockquote
            variants={fadeUp}
            className="mt-8 border-l-4 border-[#07518a] pl-6 text-xl italic text-gray-700"
          >
            “{study.quote}”
          </motion.blockquote>
        </motion.div>

        <div className="relative w-full h-[420px]">
          <Image
            src={study.avatar}
            alt={study.name}
            fill
            priority
            className="object-contain"
          />
        </div>
      </motion.section>

      {/* ================= PROJECT OBJECTIVE ================= */}
      <section
        ref={objectiveSectionRef}
        className="text-center py-24 px-6"
      >
        <h1
          ref={objectiveTextRef}
          className="
            text-2xl sm:text-3xl md:text-4xl lg:text-5xl
            font-semibold
            leading-tight
            text-[#07518a]
            max-w-5xl mx-auto
          "
        >
          {study.project_objective}
        </h1>
      </section>

      {/* ================= CHALLENGES ================= */}
      <section ref={challengeRef} className="py-28 overflow-hidden">
        <motion.div
          style={{ x: challengeX, y: challengeY }}
          className="relative mx-auto max-w-[720px]"
        >
          <div className="relative h-[240px] sm:h-[320px] md:h-[380px]">
            <Image
              src={challengeImg}
              alt="Challenges"
              fill
              className="object-cover"
            />
          </div>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="max-w-5xl mx-auto px-6 mt-16"
        >
          <h3 className="text-3xl font-bold text-[#07518a] mb-8">
            Challenges
          </h3>

          <ul className="space-y-6">
            {study.challenges.map((item, idx) => (
              <motion.li
                key={idx}
                variants={itemVariant}
                className="flex gap-4 items-start text-gray-700"
              >
                <AlertTriangle
                  className="text-[#07518a] mt-1"
                  size={20}
                />
                <span>{item}</span>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </section>

      {/* ================= SOLUTIONS ================= */}
      <section ref={solutionRef} className="py-28 overflow-hidden">
        <motion.div
          style={{ x: solutionX, y: solutionY }}
          className="relative mx-auto max-w-[720px]"
        >
          <div className="relative h-[240px] sm:h-[320px] md:h-[380px]">
            <Image
              src={solutionImg}
              alt="Solutions"
              fill
              className="object-cover"
            />
          </div>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="max-w-5xl mx-auto px-6 mt-16"
        >
          <h3 className="text-3xl font-bold text-[#07518a] mb-8">
            Solutions
          </h3>

          <ul className="space-y-6">
            {study.solutions.map((item, idx) => (
              <motion.li
                key={idx}
                variants={itemVariant}
                className="flex gap-4 items-start text-gray-700"
              >
                <CheckCircle
                  className="text-green-600 mt-1"
                  size={20}
                />
                <span>{item}</span>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </section>

      {/* ================= RESULTS ================= */}
      <motion.section
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="max-w-5xl mx-auto px-6 py-32"
      >
        <h3 className="text-3xl font-bold text-center text-[#07518a] mb-14">
          Results
        </h3>

        <div className="grid gap-6 max-w-3xl mx-auto">
          {study.results.map((item, idx) => (
            <motion.div
              key={idx}
              variants={fadeUp}
              className="p-6 bg-white/80 backdrop-blur border-l-4 border-[#07518a]"
            >
              <p className="text-gray-700 font-medium">{item}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>
    </div>
  );
}
