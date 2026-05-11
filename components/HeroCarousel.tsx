"use client";
import { useEffect, useState, useCallback, ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SplineSceneBasic } from "@/components/Aidemo";
import {
  ChevronLeft,
  ChevronRight,
  Cctv,
  Shield,
  Cpu,
  Building,
  Sun,
  Sparkles,
  Users,
  Globe,
  Award,
  Clock,
  CheckCircle,
  Battery,
  Target,
  Zap,
} from "lucide-react";
import IndustriesWeServeSection from "./homeabout/IndustriesSection";
import Weserve from "./Weserve";
import { Skiper38 } from "@/app/who-we-are/components/Skiper38";

/* -------------------------------- TYPES -------------------------------- */
type Slide =
  | { type: "component"; component: ReactNode }
  | {
      type: "content";
      title: string;
      subtitle: string;
      image: string;
      highlights?: string[];
      stats?: { value: string; label: string; icon: ReactNode }[];
      icon: ReactNode;
    };

/* ------------------------------- SLIDES -------------------------------- */
const slides: Slide[] = [
  {
    type: "component",
    component: <SplineSceneBasic />,
  },
  //  {
  //   type: "component",
  //   component: <Skiper38/>,
  // },
   {
    type: "component",
    component: <Weserve />,
  },
  {
    type: "content",
    title: "Brihaspathi Technologies Limited",
    subtitle: "AI Surveillance, Smart Energy & Enterprise Systems",
    image:
      "https://images.unsplash.com/photo-1581092334651-ddf26d9b9f09?auto=format&fit=crop&w=1200&q=80",
    highlights: [
      "Advanced E-Security Solutions",
      "AI-Powered Video Analytics",
      "Government Surveillance Projects",
      "Renewable Energy Systems",
      "Smart Infrastructure Development",
      "Enterprise System Integration",
    ],
    stats: [
      { value: "300+", label: "Workforce", icon: <Users className="w-4 h-4" /> },
      { value: "15K+", label: "Global Clients", icon: <Globe className="w-4 h-4" /> },
      { value: "99%", label: "Success Rate", icon: <Award className="w-4 h-4" /> },
      { value: "20+", label: "Years Experience", icon: <Clock className="w-4 h-4" /> },
    ],
    icon: <Sparkles className="w-8 h-8" />,
  },
  {
    type: "content",
    title: "Advanced E-Security Solutions",
    subtitle: "Secure & Smart World",
    image:
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80",
    highlights: [
      "CCTV Surveillance Systems",
      "AI Video Analytics",
      "Biometric Access Control",
      "Central Command Centers",
      "Public Eye Surveillance",
      "National Safety Projects",
    ],
    stats: [
      { value: "2M+", label: "Cameras Installed", icon: <Cctv className="w-4 h-4" /> },
      { value: "100K+", label: "Election 2024", icon: <Shield className="w-4 h-4" /> },
      { value: "65K+", label: "Exam Cameras", icon: <Target className="w-4 h-4" /> },
      { value: "99.9%", label: "Success Rate", icon: <CheckCircle className="w-4 h-4" /> },
    ],
    icon: <Shield className="w-8 h-8" />,
  },
  {
    type: "content",
    title: "AI Video Analytics Platform",
    subtitle: "Intelligent Surveillance",
    image:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1200&q=80",
    highlights: [
      "Real-time Object Detection",
      "Face Recognition",
      "ANPR Technology",
      "Intrusion Detection",
      "Fall Detection",
      "Crowd Analytics",
    ],
    stats: [
      { value: "Real-time", label: "Detection", icon: <Zap className="w-4 h-4" /> },
      { value: "100%", label: "Accuracy", icon: <CheckCircle className="w-4 h-4" /> },
      { value: "Instant", label: "Alerts", icon: <Target className="w-4 h-4" /> },
      { value: "24/7", label: "Monitoring", icon: <Clock className="w-4 h-4" /> },
    ],
    icon: <Cpu className="w-8 h-8" />,
  },
  {
    type: "content",
    title: "Government Surveillance Projects",
    subtitle: "Trusted by Authorities",
    image:
      "https://images.unsplash.com/photo-1542744094-3a31f272c490?auto=format&fit=crop&w=1200&q=80",
    highlights: [
      "General Elections 2024 & 2019",
      "Border Security Projects",
      "National Park Surveillance",
      "Infrastructure Security",
      "Defense Establishments",
      "Public Sector Units",
    ],
    stats: [
      { value: "40K+", label: "GPS Trackers", icon: <Target className="w-4 h-4" /> },
      { value: "400+", label: "PTZ Cameras", icon: <Cctv className="w-4 h-4" /> },
      { value: "2K+", label: "Coal Mines", icon: <Building className="w-4 h-4" /> },
      { value: "300+", label: "IOCL Cameras", icon: <Shield className="w-4 h-4" /> },
    ],
    icon: <Building className="w-8 h-8" />,
  },
  {
    type: "content",
    title: "Renewable Energy Solutions",
    subtitle: "Powering Green Future",
    image:
      "https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&w=1200&q=80",
    highlights: [
      "5MW Solar Projects (REIL)",
      "272 School Installations",
      "990kW Transport Project",
      "Solar Smart Poles",
      "Smart Grid Solutions",
      "Energy Management",
    ],
    stats: [
      { value: "5MW", label: "Capacity", icon: <Sun className="w-4 h-4" /> },
      { value: "272", label: "Schools", icon: <Building className="w-4 h-4" /> },
      { value: "990kW", label: "Transport", icon: <Battery className="w-4 h-4" /> },
      { value: "100%", label: "Green Energy", icon: <CheckCircle className="w-4 h-4" /> },
    ],
    icon: <Sun className="w-8 h-8" />,
  },
];

/* ---------------------------- COMPONENT -------------------------------- */
export default function HeroCarousel() {
  const [index, setIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [direction, setDirection] = useState(0);
  const total = slides.length;
  const brandColor = "#07518a";

  const goToSlide = useCallback(
    (newIndex: number, dir: number) => {
      if (isTransitioning) return;
      setIsTransitioning(true);
      setDirection(dir);
      setIndex(newIndex);
      setTimeout(() => setIsTransitioning(false), 600);
    },
    [isTransitioning]
  );

  const next = useCallback(() => {
    goToSlide((index + 1) % total, 1);
  }, [index, total, goToSlide]);

  const prev = useCallback(() => {
    goToSlide((index - 1 + total) % total, -1);
  }, [index, total, goToSlide]);

  /* --------------------------- AUTOPLAY --------------------------- */
  useEffect(() => {
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [next]);

  /* ------------------------ KEYBOARD NAVIGATION ---------------------- */
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [next, prev]);

  const slideVariants = {
    enter: (d: number) => ({ x: d > 0 ? "100%" : "-100%", opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (d: number) => ({ x: d > 0 ? "-100%" : "100%", opacity: 0 }),
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  return (
    <section className="relative w-full min-h-screen bg-[#e4f3ff] overflow-hidden">
      {/* SLIDES CONTAINER */}
      <div className="relative w-full min-h-screen">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          {slides.map((slide, i) => {
            if (i !== index) return null;

            return (
              <motion.div
                key={i}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.4 },
                }}
                className="absolute inset-0 w-full min-h-screen flex items-center"
              >
                {slide.type === "component" ? (
                  <div className="w-full h-screen">{slide.component}</div>
                ) : (
                 <div className="w-full max-w-7xl mx-auto px-4">
  {/* PARENT FLEX */}
  <div className="flex flex-col lg:flex-row items-center gap-10 min-h-screen">

    {/* ================= LEFT CONTENT ================= */}
    <div className="flex-1 w-full">
      {/* TITLE */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
        transition={{ duration: 0.6 }}
        className="mb-6"
      >
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          {slide.title}
        </h1>

        <div className="flex items-center gap-3">
          {slide.icon}
          <h2
            className="text-xl sm:text-2xl md:text-3xl font-semibold"
            style={{ color: brandColor }}
          >
            {slide.subtitle}
          </h2>
        </div>
      </motion.div>

      {/* STATS */}
      {/* <motion.div
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
        className="mb-8"
      >
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {slide.stats?.map((stat, idx) => (
            <motion.div
              key={idx}
              variants={fadeInUp}
              className="text-center"
            >
              <div
                className="text-3xl sm:text-4xl font-bold mb-2"
                style={{ color: brandColor }}
              >
                {stat.value}
              </div>
              <div className="flex items-center justify-center gap-2 text-gray-600">
                {stat.icon}
                <span className="text-sm font-medium uppercase">
                  {stat.label}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div> */}

      {/* HIGHLIGHTS */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
        className="mb-8"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {slide.highlights?.map((highlight, idx) => (
            <motion.div
              key={idx}
              variants={fadeInUp}
              className="flex items-center gap-2 p-3 rounded-lg bg-gray-50/50"
            >
              <span
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: brandColor }}
              />
              <span className="text-gray-700">{highlight}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* FOOTER */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="pt-6 border-t border-gray-200"
      >
      
      </motion.div>
    </div>

    {/* ================= RIGHT IMAGE ================= */}
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
      className="flex-1 w-full"
    >
      <img
        src={slide.image}
        alt={slide.title}
        className="w-full h-[300px] sm:h-[400px] lg:h-[500px] object-cover rounded-2xl shadow-2xl"
      />
    </motion.div>

  </div>
</div>

                )}
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* NAVIGATION BUTTONS */}
      <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 z-20">
        <div className="container mx-auto px-4 flex justify-between">
          <motion.button
            onClick={prev}
            disabled={isTransitioning}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center rounded-full shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ backgroundColor: brandColor }}
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
          </motion.button>

          <motion.button
            onClick={next}
            disabled={isTransitioning}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center rounded-full shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ backgroundColor: brandColor }}
            aria-label="Next slide"
          >
            <ChevronRight className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
          </motion.button>
        </div>
      </div>

      {/* SLIDE INDICATORS */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20">
        <div className="flex items-center gap-2">
          {slides.map((_, i) => (
            <motion.button
              key={i}
              onClick={() => goToSlide(i, i > index ? 1 : -1)}
              disabled={isTransitioning}
              whileHover={{ scale: 1.3 }}
              whileTap={{ scale: 0.9 }}
              className="relative"
              aria-label={`Go to slide ${i + 1}`}
            >
              <motion.div
                className="rounded-full transition-all duration-300"
                style={{
                  width: index === i ? "32px" : "8px",
                  height: "8px",
                  backgroundColor: index === i ? brandColor : "#cbd5e1",
                }}
                layout
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
              {index === i && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="absolute inset-0 flex items-center justify-center text-xs font-bold text-white"
                >
                  {i + 1}
                </motion.span>
              )}
            </motion.button>
          ))}
        </div>
      </div>

      {/* SLIDE COUNTER */}
      {/* <div className="absolute top-4 right-4 sm:top-6 sm:right-6 z-20">
        <div className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg">
          <p className="text-sm font-medium">
            <span
              className="text-lg font-bold mr-1"
              style={{ color: brandColor }}
            >
              {String(index + 1).padStart(2, "0")}
            </span>
            <span className="text-gray-400">/</span>
            <span className="text-gray-600 ml-1">
              {String(total).padStart(2, "0")}
            </span>
          </p>
        </div>
      </div> */}
    </section>
  );
}