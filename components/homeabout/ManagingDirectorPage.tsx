"use client";

import React, { useRef, useState, useEffect } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValueEvent,
  AnimatePresence
} from "framer-motion";
import {
  Globe2,
  Award,
  Users,
  Briefcase,
  ChevronRight,
  Quote,
  Sparkles,
  TrendingUp,
  Target,
  Shield,
  Brain,
  Network,
  MapPin,
  Calendar,
  Star,
  Medal,
  Trophy,
  ArrowUpRight,
  Linkedin,
  Twitter,
  Mail,
  Download,
  Building,
  GraduationCap,
  Clock,
  Ribbon,
  Lightbulb,
  Zap,
  Globe,
  BarChart3,
  Cpu
} from "lucide-react";
import Image from "next/image";

// ==================== TYPES & INTERFACES ====================
interface AwardItem {
  title: string;
  image: string;
  year: string;
  organization: string;
}

interface ForumItem {
  name: string;
  role: string;
  image: string;
  description: string;
}

interface TimelineItem {
  year: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

interface MetricItem {
  value: string;
  label: string;
  suffix?: string;
  icon: React.ReactNode;
}

interface QuoteItem {
  text: string;
  author: string;
  position: string;
}

// ==================== CONSTANTS ====================
const BRAND = "#07518a";
const BRAND_LIGHT = "#e8f2fa";
const BRAND_DARK = "#05416e";
const ACCENT = "#0ea5e9";

const HERO_IMAGE = "/md-corporate-head-shot-removebg-preview.png";

const LEADERSHIP_SECTIONS = {
  left: `Our Chairman and Managing Director is a visionary technology entrepreneur and strategic leader with over 15 years of profound expertise in Information Technology, Artificial Intelligence-driven security solutions, smart governance, and digital transformation. Holding a Bachelor of Technology in Computer Science Engineering from Jawaharlal Nehru Technological University, Hyderabad, and an MBA from Osmania University, he combines deep technical acumen with robust business management skills that drive sustainable growth and pioneering innovation.

Since the inception of Brihaspathi Technologies, he has remained at the helm, providing steadfast leadership that has shaped the company's trajectory as a leading system integrator in India. His forward-thinking vision has spearheaded transformative programs utilizing AI and IoT technologies, delivering scalable solutions that revolutionize governance, amplify security frameworks, and optimize operational efficiencies across government, banking, and enterprise sectors.`,

  right: `His tenure is marked by landmark initiatives, including the conceptualization and deployment of India's most advanced AI-powered surveillance infrastructure and the execution of cutting-edge digital governance projects. These initiatives have not only elevated institutional capabilities but also significantly enhanced public safety and service delivery, driving Brihaspathi's reputation as a trusted partner for complex, technology-intensive projects.

His commitment to innovation is reflected in the establishment of world-class manufacturing and development facilities, leveraging diverse technologies that underpin the company's robust portfolio. Under his leadership, Brihaspathi Technologies achieved exponential growth in operational capacity and sectoral footprint, setting industry benchmarks in quality, scalability, and execution excellence.`
};

const FORUMS: ForumItem[] = [
  {
    name: "Hyderabad Angels",
    role: "Member",
    image: "/1.png",
    description: "Premier angel investment network"
  },
  {
    name: "TiE Hyderabad",
    role: "Charter Member",
    image: "/2.png",
    description: "The Indus Entrepreneurs global network"
  },
  {
    name: "Hyderabad Management Association",
    role: "Executive Member",
    image: "/3.png",
    description: "Leadership and management excellence forum"
  }
];

const AWARDS: AwardItem[] = [
  {
    title: "Youngest Entrepreneur Award",
    year: "2025",
    organization: "APTA Katalyst",
    image: "/Awards/mdsu6200.jpg"
  },
  {
    title: "Business Titan Awards",
    year: "2024",
    organization: "Radio City Dubai",
    image: "/Awards/business-titan-awards-radio-city-dubai-1.jpg"
  },
  {
    title: "Economic Times Excellence Award",
    year: "2022",
    organization: "ET AP & Telangana",
    image: "/Awards/economic-times-award.jpg"
  },
  {
    title: "SKOCH Award",
    year: "2021",
    organization: "Wireless Radio Technology",
    image: "/Awards/received-skotch-award-wireless-radio-technology-cctv-surveillance.jpg"
  },
  {
    title: "Business Icon Award",
    year: "2022",
    organization: "Hyderabad Radio City",
    image: "/Awards/radio-city-icon-awards.jpg"
  },
  {
    title: "Partner Leadership Award",
    year: "2019",
    organization: "Industry Partners",
    image: "/Awards/partner-leadership-award-2019.jpg"
  }
];

const TIMELINE: TimelineItem[] = [
  {
    year: "2010",
    title: "Founded Brihaspathi Technologies",
    description: "Established as a technology solutions provider with focus on system integration",
    icon: <Building className="w-5 h-5" />
  },
  {
    year: "2014",
    title: "Expanded to AI & IoT Solutions",
    description: "Pioneered AI-driven surveillance and smart city solutions",
    icon: <Brain className="w-5 h-5" />
  },
  {
    year: "2018",
    title: "National Scale Operations",
    description: "Expanded operations across major Indian cities with government partnerships",
    icon: <Network className="w-5 h-5" />
  },
  {
    year: "2022",
    title: "International Recognition",
    description: "Received multiple awards including ET Excellence and Business Titan Awards",
    icon: <Trophy className="w-5 h-5" />
  },
  {
    year: "2025",
    title: "Global Leadership",
    description: "Leading innovation in AI governance and smart infrastructure solutions",
    icon: <Globe className="w-5 h-5" />
  }
];

const METRICS: MetricItem[] = [
  {
    value: "15+",
    label: "Years Experience",
    suffix: "",
    icon: <Clock className="w-6 h-6" />
  },
  {
    value: "500+",
    label: "Projects Delivered",
    suffix: "",
    icon: <Briefcase className="w-6 h-6" />
  },
  {
    value: "50+",
    label: "Team Members",
    suffix: "",
    icon: <Users className="w-6 h-6" />
  },
  {
    value: "100M+",
    label: "Impact Reach",
    suffix: "people",
    icon: <TrendingUp className="w-6 h-6" />
  }
];

const QUOTES: QuoteItem[] = [
  {
    text: "Technology is not just about innovation; it's about creating sustainable impact that transforms lives and builds resilient communities.",
    author: "MD's Vision",
    position: "Leadership Philosophy"
  },
  {
    text: "In the age of digital transformation, true leadership lies in bridging the gap between technological potential and human-centric solutions.",
    author: "Strategic Approach",
    position: "Business Transformation"
  }
];

// ==================== COMPONENTS ====================

// Floating Particles Background
const FloatingParticles: React.FC = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-white/5"
          initial={{
            x: Math.random() * 100,
            y: Math.random() * 100,
            scale: Math.random() * 0.5 + 0.5
          }}
          animate={{
            x: `calc(${Math.random() * 100}vw + ${Math.random() * 100}px)`,
            y: `calc(${Math.random() * 100}vh + ${Math.random() * 100}px)`,
            scale: [1, 1.2, 1]
          }}
          transition={{
            duration: Math.random() * 10 + 10,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "linear"
          }}
          style={{
            width: Math.random() * 100 + 50,
            height: Math.random() * 100 + 50
          }}
        />
      ))}
    </div>
  );
};

// Animated Counter
const AnimatedCounter: React.FC<{
  value: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
}> = ({ value, duration = 2, prefix = "", suffix = "" }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          let start = 0;
          const increment = value / (duration * 60);
          const timer = setInterval(() => {
            start += increment;
            if (start > value) {
              setCount(value);
              clearInterval(timer);
            } else {
              setCount(Math.floor(start));
            }
          }, 1000 / 60);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value, duration]);

  return (
    <span ref={ref}>
      {prefix}
      {count.toLocaleString()}
      {suffix}
    </span>
  );
};

// Interactive Award Card
const AwardCard: React.FC<{ award: AwardItem; index: number }> = ({
  award,
  index
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -10 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative group"
    >
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-white to-gray-50 shadow-lg border border-gray-100">
        {/* Glow effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-cyan-500/20"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />

        <div className="relative p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="p-3 rounded-xl bg-blue-50">
              <Trophy className="w-8 h-8 text-blue-600" />
            </div>
            <span className="text-sm font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
              {award.year}
            </span>
          </div>

          <h3 className="text-xl font-bold text-gray-900 mb-2">
            {award.title}
          </h3>
          <p className="text-gray-600 text-sm mb-4">{award.organization}</p>

          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "100%" }}
            transition={{ duration: 1, delay: 0.5 }}
            className="h-1 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full"
          />
        </div>
      </div>

      {/* Floating ribbon */}
      <motion.div
        className="absolute -top-2 -right-2"
        animate={{ rotate: isHovered ? [0, 10, -10, 0] : 0 }}
        transition={{ duration: 0.5 }}
      >
        <Ribbon className="w-8 h-8 text-yellow-500 fill-yellow-500" />
      </motion.div>
    </motion.div>
  );
};

// Forum Membership Card
const ForumCard: React.FC<{ forum: ForumItem; index: number }> = ({
  forum,
  index
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      whileHover={{ scale: 1.02 }}
      className="relative"
    >
      <div
        className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-lg border border-gray-100 overflow-hidden cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="p-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-gray-100">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-cyan-100" />
              <div className="relative w-full h-full flex items-center justify-center">
                <Building className="w-8 h-8 text-blue-600" />
              </div>
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900">{forum.name}</h3>
              <p className="text-sm text-blue-600 font-medium">{forum.role}</p>
            </div>
          </div>

          <AnimatePresence>
            {isExpanded && (
              <motion.p
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="text-gray-600 text-sm pt-4 border-t border-gray-100"
              >
                {forum.description}
              </motion.p>
            )}
          </AnimatePresence>

          <div className="flex justify-between items-center mt-4">
            <span className="text-xs text-gray-500">Click to {isExpanded ? "collapse" : "expand"}</span>
            <ChevronRight
              className={`w-5 h-5 text-blue-600 transition-transform ${
                isExpanded ? "rotate-90" : ""
              }`}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// Timeline Item Component
const TimelineItemComponent: React.FC<{ item: TimelineItem; index: number }> = ({
  item,
  index
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      whileHover={{ x: 10 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative pl-10 pb-8"
    >
      {/* Timeline line */}
      {index < TIMELINE.length - 1 && (
        <div className="absolute left-[18px] top-8 bottom-0 w-0.5 bg-gradient-to-b from-blue-400 to-blue-200" />
      )}

      {/* Timeline dot */}
      <motion.div
        className="absolute left-0 top-1 w-9 h-9 rounded-full border-4 border-white bg-gradient-to-r from-blue-500 to-cyan-500 shadow-lg"
        animate={{ scale: isHovered ? 1.2 : 1 }}
      />

      <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
        <div className="flex items-center gap-3 mb-3">
          <div className="p-2 rounded-lg bg-blue-50">
            {item.icon}
          </div>
          <span className="text-2xl font-bold text-blue-600">{item.year}</span>
        </div>
        <h4 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h4>
        <p className="text-gray-600">{item.description}</p>
      </div>
    </motion.div>
  );
};

// Metric Card Component
const MetricCard: React.FC<{ metric: MetricItem; index: number }> = ({
  metric,
  index
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ scale: 1.05 }}
      className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-8 shadow-lg border border-gray-100"
    >
      <div className="flex items-center gap-4 mb-4">
        <div className="p-3 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500">
          <div className="text-white">{metric.icon}</div>
        </div>
        <div>
          <div className="text-4xl font-bold text-gray-900">
            {metric.value}
            {metric.suffix && (
              <span className="text-2xl text-gray-600">{metric.suffix}</span>
            )}
          </div>
          <p className="text-gray-600 font-medium">{metric.label}</p>
        </div>
      </div>
      <motion.div
        className="h-1 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full"
        initial={{ width: 0 }}
        whileInView={{ width: "100%" }}
        transition={{ duration: 1, delay: 0.5 }}
      />
    </motion.div>
  );
};

// Quote Card Component
const QuoteCard: React.FC<{ quote: QuoteItem; index: number }> = ({
  quote,
  index
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.3 }}
      className="relative"
    >
      <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-8 shadow-lg border border-blue-100">
        <Quote className="w-12 h-12 text-blue-400/30 absolute top-4 right-4" />
        <p className="text-xl text-gray-800 italic mb-6 relative z-10">
          "{quote.text}"
        </p>
        <div className="border-t border-blue-200 pt-4">
          <p className="font-bold text-gray-900">{quote.author}</p>
          <p className="text-sm text-blue-600">{quote.position}</p>
        </div>
      </div>
    </motion.div>
  );
};

// ==================== MAIN COMPONENT ====================
const ManagingDirectorPage: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const [activeSection, setActiveSection] = useState("hero");
  const reduceMotion = useReducedMotion();

  // Scroll progress for hero section
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  // Parallax effects
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.05]);
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "5%"]);

  // Smooth scroll progress
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Track active section
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const sections = ["hero", "leadership", "timeline", "awards", "forums"];
    const index = Math.floor(latest * (sections.length - 1));
    setActiveSection(sections[index] || "hero");
  });

  return (
    <div ref={containerRef} className="relative">
      {/* Navigation Progress */}
      <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-gray-200">
        <motion.div
          className="h-full bg-gradient-to-r from-blue-500 to-cyan-500"
          style={{ scaleX: smoothProgress }}
        />
      </div>

      {/* Section Indicator */}
      <div className="fixed right-8 top-1/2 -translate-y-1/2 z-50 hidden lg:block">
        <div className="flex flex-col gap-4">
          {["hero", "leadership", "timeline", "awards", "forums"].map(
            (section) => (
              <button
                key={section}
                onClick={() => {
                  document
                    .getElementById(section)
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
                className="relative group"
              >
                <motion.div
                  className={`w-3 h-3 rounded-full border-2 transition-colors ${
                    activeSection === section
                      ? "border-blue-500 bg-blue-500"
                      : "border-gray-300 group-hover:border-blue-400"
                  }`}
                  whileHover={{ scale: 1.5 }}
                />
                <span className="absolute right-6 top-1/2 -translate-y-1/2 text-xs font-medium text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  {section.charAt(0).toUpperCase() + section.slice(1)}
                </span>
              </button>
            )
          )}
        </div>
      </div>

      {/* ==================== HERO SECTION ==================== */}
      <section
        id="hero"
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        style={{
          background: `linear-gradient(135deg, ${BRAND_DARK} 0%, ${BRAND} 50%, ${ACCENT} 100%)`
        }}
      >
        <FloatingParticles />

        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full border border-white/10"
              initial={{
                x: Math.random() * 100 + "%",
                y: Math.random() * 100 + "%",
                scale: 0
              }}
              animate={{
                scale: [0, 1, 0],
                opacity: [0, 0.3, 0]
              }}
              transition={{
                duration: Math.random() * 4 + 3,
                repeat: Infinity,
                delay: Math.random() * 2
              }}
              style={{
                width: Math.random() * 400 + 100,
                height: Math.random() * 400 + 100
              }}
            />
          ))}
        </div>

        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
              style={{
                y: reduceMotion ? 0 : heroY,
                opacity: reduceMotion ? 1 : heroOpacity
              }}
              className="text-white"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-6"
              >
                <Globe2 className="w-4 h-4" />
                <span className="text-sm font-medium">Brihaspathi Technologies</span>
              </motion.div>

              <motion.h1
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6"
              >
                Chairman &
                <br />
                <span className="bg-gradient-to-r from-cyan-300 to-white bg-clip-text text-transparent">
                  Managing Director
                </span>
              </motion.h1>

              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-xl text-white/90 mb-8 max-w-2xl"
              >
                Visionary leader driving innovation in AI, IoT, and smart governance
                with 15+ years of transformative technology experience.
              </motion.p>

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="flex flex-wrap gap-4"
              >
                <button className="px-8 py-3 rounded-full bg-white text-blue-600 font-semibold hover:bg-gray-100 transition-colors flex items-center gap-2">
                  <Download className="w-4 h-4" />
                  Download Profile
                </button>
                <button className="px-8 py-3 rounded-full border-2 border-white text-white font-semibold hover:bg-white/10 transition-colors">
                  View Journey
                </button>
              </motion.div>
            </motion.div>

            {/* Right Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, x: 50 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              style={{
                scale: reduceMotion ? 1 : imageScale,
                y: reduceMotion ? 0 : imageY
              }}
              className="relative"
            >
              <div className="relative w-full max-w-2xl mx-auto">
                {/* Glow effect */}
                <motion.div
                  className="absolute inset-0 rounded-3xl bg-gradient-to-r from-cyan-400/30 to-blue-400/30 blur-3xl"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 4, repeat: Infinity }}
                />

                {/* Main image container */}
                <div className="relative rounded-3xl overflow-hidden bg-gradient-to-b from-white/10 to-transparent border border-white/20 backdrop-blur-sm">
                  <div className="relative aspect-[4/5]">
                    {/* Replace with actual Image component if you have the image */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                    <div className="relative w-full h-full flex items-end justify-center">
                      <Sparkles className="w-24 h-24 text-white/20 absolute top-8" />
                      <div className="text-white text-center pb-8">
                        <p className="text-sm opacity-80">Leadership in</p>
                        <p className="text-xl font-bold">Technology Innovation</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Floating badges */}
                <motion.div
                  className="absolute -top-4 -left-4 bg-white rounded-2xl p-4 shadow-2xl"
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Award className="w-8 h-8 text-blue-600" />
                </motion.div>

                <motion.div
                  className="absolute -bottom-4 -right-4 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl p-4 shadow-2xl text-white"
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                >
                  <Target className="w-8 h-8" />
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ChevronRight className="w-6 h-6 text-white/60 rotate-90" />
        </motion.div>
      </section>

      {/* ==================== METRICS SECTION ==================== */}
      <section className="py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {METRICS.map((metric, index) => (
              <MetricCard key={index} metric={metric} index={index} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* ==================== LEADERSHIP SECTION ==================== */}
      <section id="leadership" className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 text-blue-600 font-medium mb-4">
              <Brain className="w-4 h-4" />
              Leadership Philosophy
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Visionary <span className="text-blue-600">Leadership</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Combining technical expertise with strategic vision to drive
              transformative change in technology and governance
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12">
            {Object.entries(LEADERSHIP_SECTIONS).map(([key, content], index) => (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="bg-gradient-to-br from-white to-gray-50 rounded-3xl p-8 shadow-xl border border-gray-100"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500">
                    {index === 0 ? (
                      <GraduationCap className="w-6 h-6 text-white" />
                    ) : (
                      <Zap className="w-6 h-6 text-white" />
                    )}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">
                    {index === 0 ? "Educational Excellence" : "Industry Impact"}
                  </h3>
                </div>
                {content.split("\n\n").map((paragraph, i) => (
                  <p
                    key={i}
                    className="text-gray-700 mb-4 leading-relaxed text-lg"
                  >
                    {paragraph}
                  </p>
                ))}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== TIMELINE SECTION ==================== */}
      <section id="timeline" className="py-20 bg-gradient-to-b from-white to-blue-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 text-blue-600 font-medium mb-4">
              <Calendar className="w-4 h-4" />
              Leadership Journey
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Milestone <span className="text-blue-600">Timeline</span>
            </h2>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            {TIMELINE.map((item, index) => (
              <TimelineItemComponent key={index} item={item} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* ==================== AWARDS SECTION ==================== */}
      <section id="awards" className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 text-blue-600 font-medium mb-4">
              <Medal className="w-4 h-4" />
              Recognition
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Awards & <span className="text-blue-600">Accolades</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Celebrating excellence and innovation recognized by industry leaders
              and prestigious organizations worldwide
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {AWARDS.map((award, index) => (
              <AwardCard key={index} award={award} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* ==================== FORUMS SECTION ==================== */}
      <section id="forums" className="py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 text-blue-600 font-medium mb-4">
              <Users className="w-4 h-4" />
              Professional Network
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Forum <span className="text-blue-600">Memberships</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Active participation in prestigious industry networks fostering
              innovation, collaboration, and leadership
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {FORUMS.map((forum, index) => (
              <ForumCard key={index} forum={forum} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* ==================== QUOTES SECTION ==================== */}
      <section className="py-20 bg-gradient-to-br from-blue-600 to-cyan-600">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {QUOTES.map((quote, index) => (
              <QuoteCard key={index} quote={quote} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* ==================== FOOTER ==================== */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center gap-4 mb-6">
              <button className="p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors">
                <Linkedin className="w-6 h-6" />
              </button>
              <button className="p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors">
                <Twitter className="w-6 h-6" />
              </button>
              <button className="p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors">
                <Mail className="w-6 h-6" />
              </button>
            </div>
            <p className="text-gray-400">
              © {new Date().getFullYear()} Brihaspathi Technologies. All rights reserved.
            </p>
            <p className="text-gray-500 text-sm mt-2">
              Leadership · Innovation · Excellence
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ManagingDirectorPage;