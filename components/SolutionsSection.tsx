"use client";

import { motion, Variants, useScroll, useTransform } from "framer-motion";
import {
  ArrowRight,
  Star,
  Shield,
  Users,
  Home,
  Zap,
  Network,
  Volume2,
} from "lucide-react";
import { useRef } from "react";

const BRAND = "#07518a";

const withAlpha = (hex: string, alpha: number) => {
  const h = hex.replace("#", "");
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

const clamp = (v: number) => Math.max(0, Math.min(255, v));
const toHex = (n: number) => n.toString(16).padStart(2, "0");

function adjust(hexColor: string, amt: number) {
  const h = hexColor.replace("#", "");
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  const R = clamp(r + (255 - r) * (amt > 0 ? amt : 0) + r * (amt < 0 ? amt : 0));
  const G = clamp(g + (255 - g) * (amt > 0 ? amt : 0) + g * (amt < 0 ? amt : 0));
  const B = clamp(b + (255 - b) * (amt > 0 ? amt : 0) + b * (amt < 0 ? amt : 0));
  return `#${toHex(Math.round(R))}${toHex(Math.round(G))}${toHex(Math.round(B))}`;
}

const lighten = (c: string, p = 0.15) => adjust(c, +p);
const darken = (c: string, p = 0.1) => adjust(c, -p);

const BRAND_LIGHT = lighten(BRAND, 0.18);
const BRAND_DARK = darken(BRAND, 0.08);

const monoGradient = (base = BRAND) =>
  `linear-gradient(90deg, ${base} 0%, ${lighten(base, 0.18)} 100%)`;

const softMonoGradient = (base = BRAND, opacity = 0.12) =>
  `linear-gradient(90deg, ${withAlpha(lighten(base, 0.18), opacity)} 0%, ${withAlpha(base, opacity)} 100%)`;

const THEME = {
  bg: "#FFFFFF",
  text: "#0A0A0A",
  subText: "rgba(10,10,10,0.72)",
  ring: withAlpha(BRAND, 0.22),
  surfaceTint: withAlpha(BRAND, 0.08),
};

// Fixed: Proper cubic-bezier typing
const MOTION_TIMING = {
  duration: 0.75,
  ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
} as const;

const drift = {
  translateX: [0, 8, -6, 10, 0],
  translateY: [0, -6, 8, -10, 0],
  rotate: [0, 2, -2, 1.5, 0],
};

function seeded(index: number) {
  let t = (index + 1) * 0x6d2b79f5;
  return () => {
    t += 0x6d2b79f5;
    let r = Math.imul(t ^ (t >>> 15), 1 | t);
    r ^= r + Math.imul(r ^ (r >>> 7), 61 | r);
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };
}

function randomDirection(index: number) {
  const rnd = seeded(index);
  const dirs = [
    { x: -120, y: 0 },
    { x: 120, y: 0 },
    { x: 0, y: -120 },
    { x: 0, y: 120 },
  ];
  return dirs[Math.floor(rnd() * dirs.length)];
}

function randomDelay(index: number, base = 0.05, spread = 0.2) {
  const rnd = seeded(index)();
  return base + rnd * spread;
}

const solutions = [
  {
    icon: Shield,
    title: "AI Surveillance & Smart CCTV",
    subtitle: "CCTV Surveillance",
    description:
      "AI-powered surveillance systems with 4K resolution, night vision, and intelligent analytics for comprehensive security coverage.",
    features: ["4K Ultra HD", "AI Analytics", "24/7 Monitoring", "Mobile Access"],
    image: "https://images.unsplash.com/photo-1557597774-9d273605dfa9?w=800&q=80",
    popular: true,
  },
  {
    icon: Users,
    title: "Extra Low Voltage ELV Systems",
    subtitle: "Biometric Access Control",
    description:
      "Multi-modal biometric systems combining fingerprint, facial recognition, and card-based access for maximum security.",
    features: ["Face Recognition", "Fingerprint", "Card Access", "Time Tracking"],
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80",
  },
  // {
  //   icon: Home,
  //   title: "Smart Home Automation",
  //   subtitle: "Intelligent Living Solutions",
  //   description:
  //     "Complete home automation with voice control, mobile apps, and energy-efficient smart devices for modern living.",
  //   features: ["Voice Control", "Smart Lighting", "Climate Control", "Energy Saving"],
  //   image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
  // },
  {
    icon: Zap,
    title: "Solar & Renewable Energy",
    subtitle: "Sustainable Energy Solutions",
    description:
      "High-efficiency solar installations with smart grid integration and battery storage for sustainable energy independence.",
    features: ["Grid Integration", "Battery Storage", "Smart Monitoring", "ROI Tracking"],
    image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&q=80",
  },
  // {
  //   icon: Network,
  //   title: "Data Center Setup",
  //   subtitle: "Robust Networking & IT Infrastructure",
  //   description:
  //     "Secure, scalable communication and networking solutions to support enterprise operations.",
  //   features: ["Fiber Optic", "WiFi 6", "Cloud Integration", "24/7 Support"],
  //   image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80",
  // },
  {
    icon: Volume2,
    title: "Software Development",
    subtitle: "Custom Solutions",
    description:
      "Tailored technology solutions crafted to meet unique business and government requirements",
    features: ["ERP Solution", "HRMS", "Software Development"],
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80",
  },
];

const featureItem: Variants = {
  hidden: { opacity: 0, x: 12 },
  show: (i = 0) => ({
    opacity: 1,
    x: 0,
    transition: { ...MOTION_TIMING, delay: 0.05 * i },
  }),
};

export default function SolutionsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const backgroundOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.6, 1, 0.6]);

  return (
    <section
      ref={containerRef}
      id="solutions"
      className="relative min-h-screen scroll-mt-28 overflow-hidden"
      style={{ backgroundColor: THEME.bg }}
    >
      {/* Fixed Parallax Background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        {/* Animated Orbs - FIXED: No duplicate style props */}
        <motion.div
          style={{
            y: backgroundY,
            opacity: backgroundOpacity,
            background: withAlpha(BRAND, 0.15),
          }}
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-20 left-10 w-96 h-96 rounded-full blur-3xl"
        />
        <motion.div
          style={{
            y: backgroundY,
            opacity: backgroundOpacity,
            background: withAlpha(BRAND_LIGHT, 0.2),
          }}
          animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute top-60 right-20 w-80 h-80 rounded-full blur-3xl"
        />
        <motion.div
          style={{
            y: backgroundY,
            opacity: backgroundOpacity,
            background: withAlpha(BRAND_DARK, 0.12),
          }}
          animate={{ scale: [1, 1.15, 1], opacity: [0.25, 0.45, 0.25] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 4 }}
          className="absolute bottom-40 left-1/3 w-72 h-72 rounded-full blur-3xl"
        />

        {/* Subtle Grid */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(${BRAND} 1px, transparent 1px), linear-gradient(90deg, ${BRAND} 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          {/* Header */}
          <div className="text-center space-y-6 mb-16 md:mb-20">
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={MOTION_TIMING}
              viewport={{ once: true }}
            >
              <div
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-medium"
                style={{
                  color: BRAND,
                  borderColor: THEME.ring,
                  background: softMonoGradient(BRAND, 0.08),
                  backdropFilter: "blur(6px)",
                }}
              >
                <Star className="w-4 h-4" style={{ color: BRAND }} />
                Our Expertise
              </div>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ ...MOTION_TIMING, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-bold"
              style={{ color: THEME.text }}
            >
              Comprehensive Technology Solutions Tailored for You
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ ...MOTION_TIMING, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-lg md:text-xl max-w-3xl mx-auto"
              style={{ color: THEME.subText }}
            >
              Discover our comprehensive range designed to secure, automate, and optimize your operations.
            </motion.p>
          </div>

          {/* Solutions List */}
          <div className="space-y-32 md:space-y-40">
            {solutions.map((solution, index) => {
              const isOdd = index % 2 === 1;
              const contentFrom = randomDirection(index);
              const imageFrom = { x: -contentFrom.x, y: -contentFrom.y };

              return (
                <div key={index}>
                  <div className={`grid lg:grid-cols-2 gap-16 items-center ${isOdd ? "lg:grid-flow-col-dense" : ""}`}>
                    {/* Text Content */}
                    <motion.div
                      initial={{ opacity: 0, x: contentFrom.x, y: contentFrom.y }}
                      whileInView={{ opacity: 1, x: 0, y: 0 }}
                      transition={{ ...MOTION_TIMING, delay: randomDelay(index, 0.1, 0.2) }}
                      viewport={{ once: false, amount: 0.3 }}
                      className={isOdd ? "lg:col-start-2" : ""}
                    >
                      <div className="space-y-8">
                        {solution.popular && (
                          <div
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium text-white"
                            style={{ background: monoGradient(BRAND) }}
                          >
                            <Star className="w-4 h-4" />
                            Most Popular
                          </div>
                        )}

                        <motion.div
                          animate={drift}
                          transition={{
                            duration: 8,
                            repeat: Infinity,
                            repeatType: "mirror",
                            ease: "easeInOut",
                          }}
                          className="inline-flex p-5 rounded-3xl"
                          style={{ background: softMonoGradient(BRAND, 0.12) }}
                        >
                          <div
                            className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg"
                            style={{ background: monoGradient(BRAND_DARK) }}
                          >
                            <solution.icon className="h-9 w-9 text-white" />
                          </div>
                        </motion.div>

                        <div className="space-y-4">
                          <p className="text-sm font-medium bg-clip-text text-transparent" style={{ backgroundImage: monoGradient(BRAND) }}>
                            {solution.subtitle}
                          </p>
                          <h3 className="text-3xl md:text-4xl font-bold" style={{ color: THEME.text }}>
                            {solution.title}
                          </h3>
                          <p className="text-lg leading-relaxed" style={{ color: THEME.subText }}>
                            {solution.description}
                          </p>
                        </div>

                        <motion.div
                          initial="hidden"
                          whileInView="show"
                          viewport={{ once: false }}
                          variants={featureItem}
                          className="grid grid-cols-2 gap-4 py-4"
                        >
                          {solution.features.map((feature, i) => (
                            <motion.div key={i} custom={i} variants={featureItem} className="flex items-center gap-3">
                              <div className="w-2 h-2 rounded-full" style={{ background: BRAND }} />
                              <span className="font-medium" style={{ color: THEME.text }}>{feature}</span>
                            </motion.div>
                          ))}
                        </motion.div>

                        <div className="flex flex-col sm:flex-row gap-4 pt-6">
                          <button
                            className="px-8 py-4 rounded-full font-semibold text-white hover:shadow-xl hover:scale-105 transition-all"
                            style={{ background: monoGradient(BRAND) }}
                          >
                            Learn More <ArrowRight className="inline ml-2 h-5 w-5" />
                          </button>
                          <button
                            className="px-8 py-4 rounded-full font-semibold border hover:shadow-lg transition-all"
                            style={{
                              borderColor: THEME.ring,
                              background: softMonoGradient(BRAND, 0.08),
                              color: THEME.text,
                            }}
                          >
                            View Details
                          </button>
                        </div>
                      </div>
                    </motion.div>

                    {/* Image */}
                    <motion.div
                      initial={{ opacity: 0, x: imageFrom.x, y: imageFrom.y }}
                      whileInView={{ opacity: 1, x: 0, y: 0 }}
                      transition={{ ...MOTION_TIMING, delay: randomDelay(index + 1, 0.15, 0.25) }}
                      viewport={{ once: false, amount: 0.3 }}
                      className={isOdd ? "lg:col-start-1" : ""}
                    >
                      <div className="relative group">
                        <div className="absolute inset-0 rounded-[3rem] rotate-6 group-hover:rotate-3 transition-transform duration-500" style={{ background: softMonoGradient(BRAND, 0.16) }} />
                        <div className="absolute inset-0 rounded-[3rem] -rotate-6 group-hover:-rotate-3 transition-transform duration-500" style={{ background: softMonoGradient(BRAND, 0.08) }} />

                        <div className="relative rounded-[3rem] overflow-hidden shadow-2xl bg-white/90 backdrop-blur-sm group-hover:shadow-3xl transition-all duration-500 hover:-translate-y-4">
                          <div className="aspect-[4/3] overflow-hidden">
                            <img
                              src={solution.image}
                              alt={solution.title}
                              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </div>

                  {index < solutions.length - 1 && (
                    <motion.div
                      initial={{ opacity: 0, scaleX: 0.8 }}
                      whileInView={{ opacity: 1, scaleX: 1 }}
                      transition={{ ...MOTION_TIMING, delay: 0.2 }}
                      viewport={{ once: true }}
                      className="h-px w-full mt-32 md:mt-40"
                      style={{ backgroundColor: THEME.ring }}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}