

"use client";

import React, {
  useEffect,
  useMemo,
  useRef,
  useState,
  useCallback,
} from "react";
import axios from "axios";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

import {
  ConfigProvider,
  Button,
  Collapse,
  Spin,
  Carousel,
  Tag,
} from "antd";

import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  useInView,
} from "framer-motion";

import {
  ChevronLeft,
  ChevronRight,
  TrendingUp,
  Target,
  Award,
  MapPin,
  Building,
  User,
  BarChart3,
  Globe,
  ArrowLeft,
  ArrowRight,
  Star,
} from "lucide-react";

// ===== CONFIG =====
const API = "http://172.30.0.200:1334/api";
const BRAND = "#07518a";
const BRAND_TINT = "#0a6ab8";
const CHALLENGE_IMG = "/c1-01.png";
const SOLUTION_IMG = "/c2-01.png";

// ===== UTILS =====
const slugify = (text: string) =>
  text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");

const calculateReadTime = (content: string[]) =>
  Math.ceil(content.join(" ").split(/\s+/).filter(Boolean).length / 200);

const riseIn = (delay = 0) => ({
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.3 },
  transition: { duration: 0.6, delay },
});

const slideFromLeft = {
  initial: { x: "-20vw", opacity: 0 },
  whileInView: { x: 0, opacity: 1 },
  transition: { duration: 0.8 },
};

const slideFromRight = {
  initial: { x: "20vw", opacity: 0 },
  whileInView: { x: 0, opacity: 1 },
  transition: { duration: 0.8 },
};

const bridgeReveal = {
  initial: { opacity: 0, scale: 0.96 },
  whileInView: { opacity: 1, scale: 1 },
  transition: { duration: 0.6 },
};

// ===== API AUTH =====
const getAuthHeaders = () => {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export default function CaseStudyDetailPage() {
  const pathname = usePathname();
  const router = useRouter();

  const segments = pathname.split("/");
  const sectorSlug = segments.at(-2) || "";
  const itemSlug = segments.at(-1) || "";

  const [caseStudies, setCaseStudies] = useState<any[]>([]);
  const [currentCase, setCurrentCase] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // ===== FETCH DATA =====
  useEffect(() => {
    axios
      .get(`${API}/case-studies?populate=*`, { headers: getAuthHeaders() })
      .then((res) => {
        const list = res.data?.data || [];
        setCaseStudies(list);

        const match = list.find(
          (c: any) => slugify(c.name) === itemSlug
        );
        setCurrentCase(match || null);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [itemSlug]);

  if (loading) return <Spin className="flex justify-center mt-10" />;
  if (!currentCase) return <div className="text-center py-10">Case Study Not Found</div>;

  // ===== PROCESS DATA =====
  const image =
    currentCase.image?.[0]?.formats?.medium?.url ||
    currentCase.image?.[0]?.url ||
    "/default-case-study-image.jpg";

  const sameSectorCases = caseStudies.filter(
    (c) => slugify(c.sector?.title || "") === sectorSlug
  );
  const index = sameSectorCases.findIndex(
    (c) => slugify(c.name) === itemSlug
  );

  const goto = (offset: number) => {
    const target =
      sameSectorCases[(index + offset + sameSectorCases.length) % sameSectorCases.length];
    router.push(`/case-studies/${sectorSlug}/${slugify(target.name)}`);
  };

  const gotoSibling = (offset: number) => goto(offset);
  const goPrev = () => goto(-1);
  const goNext = () => goto(1);

  const badges = [
    currentCase.role,
    currentCase.city || "",
    currentCase.company || "",
  ].filter(Boolean);

  const readTime = calculateReadTime([
    ...(currentCase.challenges || []),
    ...(currentCase.solutions || []),
    ...(currentCase.results || []),
    currentCase.quote || "",
  ]);

  // ===== RELATED CAROUSEL =====
  const RelatedCaseStudiesCarousel = () => {
    const related = sameSectorCases.filter(
      (c) => slugify(c.name) !== itemSlug
    );

    if (!related.length) return null;

    return (
      <motion.section {...riseIn(0)} className="max-w-7xl mx-auto px-6 py-16">
        <h2 className="text-center text-3xl font-black mb-10">
          More {sectorSlug.replace("-", " ")} Success Stories
        </h2>

        <Carousel
          dots={false}
          slidesToShow={3}
          autoplay
          autoplaySpeed={3500}
          infinite={related.length > 3}
          responsive={[
            { breakpoint: 1024, settings: { slidesToShow: 2 } },
            { breakpoint: 640, settings: { slidesToShow: 1 } },
          ]}
          prevArrow={<CarouselArrow direction="prev" />}
          nextArrow={<CarouselArrow direction="next" />}
        >
          {related.map((cs, i) => (
            <div key={cs.id} className="px-3">
              <motion.button
                initial="hidden"
                whileInView="show"
                whileHover={{ scale: 1.02 }}
                onClick={() =>
                  router.push(`/case-studies/${sectorSlug}/${slugify(cs.name)}`)
                }
                className="rounded-xl overflow-hidden shadow hover:shadow-md"
              >
                <img
                  src={`http://172.30.0.200:1334${cs.image?.[0]?.url}`}
                  alt={cs.name}
                  className="h-56 w-full object-cover"
                />
                <p className="p-3 text-sm font-medium">{cs.name}</p>
              </motion.button>
            </div>
          ))}
        </Carousel>
      </motion.section>
    );
  };

  // ===== UI RETURN =====
  return (
    <ConfigProvider theme={{ token: { colorPrimary: BRAND } }}>
      <motion.main className="w-full bg-white">
        {/* HERO SECTION */}
        <motion.section className="max-w-7xl mx-auto px-6 py-10">
          {/* Breadcrumb */}
          <motion.div {...riseIn(0)} className="flex items-center gap-2 text-sm text-gray-500">
            <Globe className="h-4 w-4" />
            <span>Case Studies</span> /{" "}
            <span className="text-gray-900">{sectorSlug.replace("-", " ").toUpperCase()}</span>
          </motion.div>

          {/* Title */}
          <motion.h1 {...riseIn(0.05)} className="text-4xl font-black mt-2">
            {currentCase.name}
          </motion.h1>

          {/* Badges */}
          <motion.div {...riseIn(0.08)} className="flex flex-wrap gap-3 mt-5">
            {badges.map((badge, i) => (
              <Tag key={i} color="blue" className="rounded-full px-4 py-2">
                {badge}
              </Tag>
            ))}
          </motion.div>

          {/* Image */}
          <motion.div {...riseIn(0.1)} className="mt-6">
            <img
              src={`http://172.30.0.200:1334${image}`}
              alt={currentCase.name}
              className="rounded-2xl shadow-lg w-full max-h-[450px] object-cover"
            />
          </motion.div>

          {/* CTA + Prev/Next */}
          <motion.div {...riseIn(0.14)} className="mt-7 flex gap-4">
            <Button type="primary" onClick={() => goto(1)}>
              Next <ChevronRight />
            </Button>
            <Button onClick={() => goto(-1)}>
              <ChevronLeft /> Previous
            </Button>
          </motion.div>
        </motion.section>

        {/* CHALLENGE & SOLUTIONS */}
        <motion.section className="mt-16 bg-gray-50 py-14">
          <div className="max-w-7xl mx-auto px-6">
            <div className="relative flex justify-between items-center">
              <motion.img src={CHALLENGE_IMG} className="hidden lg:block w-72" {...slideFromLeft} />
              <motion.img src={SOLUTION_IMG} className="hidden lg:block w-72" {...slideFromRight} />
            </div>
            <div className="grid md:grid-cols-2 gap-8 mt-10">
              <DetailColumn title="Challenges" tone="red" icon={<Target />} items={currentCase.challenges || []} />
              <DetailColumn title="Solutions" tone="green" icon={<Award />} items={currentCase.solutions || []} />
            </div>
          </div>
        </motion.section>

        {/* RESULTS */}
        <motion.section className="max-w-7xl mx-auto px-6 mt-14">
          <motion.div className="rounded-2xl p-8 shadow-lg border bg-white">
            <h3 className="text-xl font-bold flex items-center gap-2">
              <TrendingUp /> Results
            </h3>
            <ul className="list-disc pl-6 mt-4">
              {currentCase.results?.map((res: string, i: number) => (
                <motion.li key={i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }}>
                  {res}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </motion.section>

        {/* RELATED */}
        <RelatedCaseStudiesCarousel />
      </motion.main>
    </ConfigProvider>
  );
}

// ===== Reusable Components =====
function CarouselArrow({ direction, onClick }: { direction: "prev" | "next"; onClick?: () => void }) {
  return (
    <Button
      type="text"
      className={`absolute top-1/2 -translate-y-1/2 z-10 ${direction === "prev" ? "-left-12" : "-right-12"
        } rounded-full shadow-lg bg-white`}
      onClick={onClick}
      icon={direction === "prev" ? <ArrowLeft /> : <ArrowRight />}
    />
  );
}

function DetailColumn({ title, tone, icon, items }: any) {
  const color = tone === "red" ? "text-red-600" : "text-green-600";
  return (
    <motion.div {...riseIn(0)}>
      <h4 className={`text-lg font-bold flex items-center gap-2 ${color}`}>
        {icon} {title}
      </h4>
      <ul className="mt-3 list-disc pl-5 space-y-2">
        {items.map((it: string, i: number) => (
          <li key={i}>{it}</li>
        ))}
      </ul>
    </motion.div>
  );
}
