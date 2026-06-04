"use client";

import { useState, useRef, useEffect } from "react";
import { useParams } from "next/navigation";
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

import challengeImg from "../../casestudyimages/c1-01.png";
import solutionImg from "../../casestudyimages/c2-01.png";

/* ================= GSAP ================= */

gsap.registerPlugin(ScrollTrigger);

/* ================= BACKGROUND ================= */

const bgcase = "/futuristic-hexagon-mobile-phone-wallpaper-story.png";
const API_BASE = "/strapi";
const getCaseStudyUrl = (slug: string) =>
  `${API_BASE}/api/case-studies?filters[slug][$eq]=${encodeURIComponent(
    slug
  )}&populate[detail]=true&populate[image]=true&populate[sector]=true`;

interface CaseStudy {
  id: number;
  name: string;
  role: string;
  city: string;
  company: string;
  avatar: string;
  rating: number;
  quote: string;
  project_objective: string;
  challenges: string[];
  solutions: string[];
  results: string[];
  slug: string;
  sector: string;
  sectorSlug: string;
}

function normalizeStringArray(value?: string) {
  if (!value) return [];
  return value
    .split(/\r?\n/)
    .map((item) => item.trim())
    .filter(Boolean);
}

function resolveImageUrl(image: any) {
  if (!image) return "";
  const url = image.url ?? image.attributes?.url;
  if (!url) return "";
  if (typeof url !== "string") return "";
  if (url.startsWith("http")) {
    if (url.startsWith("http://183.82.117.36:2334")) {
      return url.replace("http://183.82.117.36:2334", "/strapi");
    }
    if (url.startsWith("http://172.30.0.200:1334")) {
      return url.replace("http://172.30.0.200:1334", "/strapi");
    }
    return url;
  }
  if (url.startsWith("/")) {
    return `/strapi${url}`;
  }
  return url;
}

function normalizeStudy(item: any) {
  const record = item.attributes ?? item;
  const detail = record.detail ?? {};
  const imageData = record.image?.data ?? record.image;
  const firstImage = Array.isArray(imageData) ? imageData[0] : imageData;
  const sectorData = record.sector?.data ?? record.sector;

  const sectorSlug = String(
    sectorData?.attributes?.slug ?? sectorData?.slug ?? ""
  ).toLowerCase();
  const sectorName =
    sectorData?.attributes?.title ?? sectorData?.title ?? "";

  return {
    id: item.id ?? record.id,
    name: record.name ?? "",
    role: record.role ?? "",
    city: record.city ?? "",
    company: record.company ?? "",
    avatar: resolveImageUrl(firstImage),
    rating: Number(record.rating ?? 0),
    quote: record.quote ?? "",
    project_objective:
      record.projectobjective ?? record.project_objective ?? "",
    challenges:
      normalizeStringArray(detail.challanges ?? detail.challenges ?? ""),
    solutions: normalizeStringArray(detail.solutions ?? ""),
    results: normalizeStringArray(detail.result ?? detail.results ?? ""),
    slug: record.slug ?? "",
    sector: sectorName,
    sectorSlug,
  };
}

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

export default function CaseStudyPage() {
  const params = useParams();
  const sectorSlug = Array.isArray(params?.sectorSlug)
    ? params?.sectorSlug[0]
    : params?.sectorSlug ?? "";
  const caseSlug = Array.isArray(params?.caseSlug)
    ? params?.caseSlug[0]
    : params?.caseSlug ?? "";

  const [study, setStudy] = useState<CaseStudy | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!caseSlug) return;

    const fetchStudy = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(getCaseStudyUrl(caseSlug));
        if (!response.ok) {
          throw new Error(`Failed to load case study: ${response.status}`);
        }

        const data = await response.json();
        const item = Array.isArray(data?.data) ? data.data[0] : null;
        if (!item) {
          throw new Error("Case study not found");
        }

        const normalized = normalizeStudy(item);
        if (
          sectorSlug &&
          normalized.sectorSlug !== sectorSlug.toLowerCase()
        ) {
          throw new Error("Case study not found");
        }

        setStudy(normalized);
      } catch (fetchError) {
        setError(
          fetchError instanceof Error
            ? fetchError.message
            : "Unable to load case study"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchStudy();
  }, [caseSlug, sectorSlug]);

  /* ================= SCROLL REFS ================= */

  const challengeRef = useRef<HTMLDivElement>(null);
  const solutionRef = useRef<HTMLDivElement>(null);

  const objectiveSectionRef = useRef<HTMLElement>(null);
  const objectiveTextRef = useRef<HTMLHeadingElement>(null);

  /* ================= SCROLL PROGRESS ================= */

  const hasStudyContent = Boolean(study && !loading && !error);

  const { scrollYProgress: challengeScroll } = useScroll({
    target: hasStudyContent ? challengeRef : undefined,
    offset: ["start end", "end center"],
  });

  const { scrollYProgress: solutionScroll } = useScroll({
    target: hasStudyContent ? solutionRef : undefined,
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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6 py-24">
        <div className="text-center">
          <p className="text-xl font-semibold text-[#07518a]">
            Loading case study...
          </p>
        </div>
      </div>
    );
  }

  if (error || !study) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6 py-24">
        <div className="text-center max-w-lg">
          <p className="text-2xl font-semibold text-[#07518a] mb-4">
            Unable to load case study
          </p>
          <p className="text-gray-600 mb-6">{error ?? "Please check the URL and try again."}</p>
          <Link
            href="/case-studies"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#07518a] text-white hover:bg-[#064a7d]"
          >
            <ChevronLeft size={18} /> Back to case studies
          </Link>
        </div>
      </div>
    );
  }

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
          <img
            src={study.avatar}
            alt={study.name}
            className="w-full h-full object-contain"
            loading="eager"
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
            {study.challenges.map((item: string, idx: number) => (
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
            {study.solutions.map((item: string, idx: number) => (
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
          {study.results.map((item: string, idx: number) => (
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
