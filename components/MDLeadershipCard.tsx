"use client";

import React from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  HTMLMotionProps,
} from "framer-motion";

const BRAND = "#07518a";

/* ===========================
   Content
=========================== */
const LEFT_COLUMN = `Our Chairman and Managing Director is a visionary technology entrepreneur and strategic leader with over 15 years of profound expertise in Information Technology, Artificial Intelligence-driven security solutions, smart governance, and digital transformation. Holding a Bachelor of Technology in Computer Science Engineering from Jawaharlal Nehru Technological University, Hyderabad, and an MBA from Osmania University, he combines deep technical acumen with robust business management skills that drive sustainable growth and pioneering innovation.

Since the inception of Brihaspathi Technologies, he has remained at the helm, providing steadfast leadership that has shaped the company's trajectory as a leading system integrator in India. His forward-thinking vision has spearheaded transformative programs utilizing AI and IoT technologies, delivering scalable solutions that revolutionize governance, amplify security frameworks, and optimize operational efficiencies across government, banking, and enterprise sectors.

His tenure is marked by landmark initiatives, including the conceptualization and deployment of India's most advanced AI-powered surveillance infrastructure and the execution of cutting-edge digital governance projects. These initiatives have not only elevated institutional capabilities but also significantly enhanced public safety and service delivery, driving Brihaspathi's reputation as a trusted partner for complex, technology-intensive projects.

His commitment to innovation is reflected in the establishment of world-class manufacturing and development facilities, leveraging diverse technologies that underpin the company's robust portfolio. Under his leadership, Brihaspathi Technologies achieved exponential growth in operational capacity and sectoral footprint, setting industry benchmarks in quality, scalability, and execution excellence.`;

const RIGHT_COLUMN = `A recognized leader beyond the corporate sphere, he has been honored with numerous awards reflecting his entrepreneurial leadership and industry contributions, including the Youngest Entrepreneur Award by APTA Katalyst (2025), the ET Excellence Awards (AP & Telangana, 2022), the Business Titans Chapter 3 Award in Abu Dhabi (2024), and the Hyderabad Radio City Business Icon Award (2022).

Additionally, his pioneering work in wireless radio technology earned the prestigious Skotch Award for CCTV Surveillance projects, underscoring his commitment to technological advancement and operational impact.

He actively contributes to the broader entrepreneurial ecosystem as a member of eminent organizations including Hyderabad Angels, The Indus Entrepreneurs (TiE) Group, and the Hyderabad Management Association (HMA). Through these platforms, he advocates for innovation, mentorship, and sustainable business practices, fostering collaboration and growth within the startup and corporate communities.

His strategic vision is anchored in creating sustainable value—balancing technological disruption with operational pragmatism and fiscal discipline. This has enabled Brihaspathi Technologies to consistently deliver end-to-end integrated solutions that empower clients to adapt to emerging challenges and capture new opportunities in a digital-first economy.

With an emphasis on ethical governance, transparency, and stakeholder engagement, he cultivates an inclusive culture that inspires innovation and performance excellence across all organizational levels. His leadership style encourages continuous learning, agility, and resilience, positioning the company to lead confidently in a rapidly evolving technological landscape.

Looking ahead, his focus remains on harnessing emerging technologies such as AI, IoT, and cloud computing to develop next-generation systems that contribute to national priorities in public safety, energy efficiency, and smart urban development.`;

/* ===========================
   Component
=========================== */
export default function MDLeadershipCard() {
  const cardRef = React.useRef<HTMLDivElement | null>(null);
  const prefersReduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start 85%", "end 15%"],
  });

  const xLeft = useTransform(
    scrollYProgress,
    [0, 1],
    prefersReduced ? ["0%", "0%"] : ["-4%", "4%"]
  );
  const xRight = useTransform(
    scrollYProgress,
    [0, 1],
    prefersReduced ? ["0%", "0%"] : ["4%", "-4%"]
  );

  /** ✔ FIXED clean fade config (no ease array) */
  const fade: HTMLMotionProps<"article"> = {
    initial: { opacity: 0, y: 12, filter: "blur(3px)" as any },
    whileInView: { opacity: 1, y: 0, filter: "blur(0px)" as any },
    viewport: { once: true, amount: 0.25 },
    transition: { duration: 0.6, ease: "easeOut" }, // ✔ FIXED
  };

  return (
    <section className="px-4 py-10 sm:px-6 lg:px-8 sm:py-14">
      <motion.article
        ref={cardRef}
        {...fade}
        className="
          relative mx-auto w-full max-w-6xl overflow-hidden
          rounded-2xl border bg-white
          shadow-lg shadow-slate-200/60 ring-1 ring-black/5
        "
        style={{
          borderColor: "rgba(7,81,138,0.2)",
          background:
            "linear-gradient(165deg, rgba(255,255,255,1) 0%, rgba(7,81,138,0.02) 50%, rgba(255,255,255,1) 100%)",
        }}
        aria-label="Chairman & Managing Director"
      >
        {/* Accent bar */}
        <div
          aria-hidden
          className="absolute left-0 top-0 h-full w-1 rounded-l-2xl"
          style={{
            background: `linear-gradient(180deg, ${BRAND}, rgba(7,81,138,0.6))`,
          }}
        />

        {/* Header */}
        <header className="border-b border-slate-100 bg-slate-50/80">
          <div className="flex flex-col gap-1 px-6 py-5 sm:px-8 sm:py-6">
            <span
              className="text-xs font-semibold uppercase tracking-widest"
              style={{ color: BRAND, letterSpacing: "0.12em" }}
            >
              Leadership
            </span>
            <h2
              className="font-extrabold tracking-tight text-slate-900"
              style={{ fontSize: "clamp(20px, 2.8vw, 28px)" }}
            >
              Chairman & Managing Director
            </h2>
            <p className="mt-0.5 text-sm text-slate-600">
              Vision, innovation &amp; execution excellence
            </p>
          </div>
        </header>

        {/* Body */}
        <div className="grid grid-cols-1 gap-8 px-6 py-8 sm:px-8 sm:py-10 lg:grid-cols-[1fr_1px_1fr] lg:gap-0 lg:px-10">
          {/* Left column */}
          <motion.div
            style={{ x: xLeft }}
            className="space-y-5 leading-relaxed text-slate-700 lg:pr-12"
          >
            {LEFT_COLUMN.trim()
              .split("\n\n")
              .map((p, i) => (
                <p
                  key={i}
                  className="text-[15px] sm:text-[16px] leading-[1.75]"
                >
                  {p}
                </p>
              ))}
          </motion.div>

          {/* Vertical divider (desktop) */}
          <div
            aria-hidden
            className="hidden lg:block w-px bg-gradient-to-b from-transparent via-slate-200 to-transparent shrink-0"
          />

          {/* Right column */}
          <motion.div
            style={{ x: xRight }}
            className="space-y-5 leading-relaxed text-slate-700 lg:pl-12"
          >
            {RIGHT_COLUMN.trim()
              .split("\n\n")
              .map((p, i) => (
                <p
                  key={i}
                  className="text-[15px] sm:text-[16px] leading-[1.75]"
                >
                  {p}
                </p>
              ))}
          </motion.div>
        </div>

        {/* Bottom gradient bar */}
        <div
          aria-hidden
          className="pointer-events-none h-1.5 w-full rounded-b-2xl"
          style={{
            background:
              "linear-gradient(90deg, rgba(7,81,138,0.2), rgba(7,81,138,0.06) 30%, rgba(7,81,138,0.06) 70%, rgba(7,81,138,0.2))",
          }}
        />
      </motion.article>
    </section>
  );
}
