"use client";

import { motion, Variants } from "framer-motion";
import { ShieldCheck, Eye, Factory } from "lucide-react";

/* BRAND */
const BRAND = "#07518a";

/* DATA */
const ITEMS = [
  {
    title: "Our Mission",
    icon: ShieldCheck,
    content:
      "To engineer state-of-the-art surveillance and security frameworks that fortify national safety and build a secure, peaceful future through advanced public-eye intelligence.",
  },
  {
    title: "Our Vision",
    icon: Eye,
    content:
      "To redefine the global surveillance landscape by delivering integrated, innovative, and cost-competitive solutions while maintaining the highest standards of integrity.",
  },
  {
    title: "Make in India Commitment",
    icon: Factory,
    content:
      "We are a fully integrated enterprise with in-house manufacturing capabilities, directly contributing to India’s technological self-reliance and national digital infrastructure.",
  },
];

/* ANIMATION VARIANTS (TYPED) */
const cardVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 32,
  },
  show: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.2 + index * 0.15,
      duration: 0.6,
      ease: "easeOut",
    },
  }),
};

/* COMPONENT */
export default function MissionVisionPhilosophy() {
  return (
    <section className="w-full py-20 md:py-28 bg-white ">
      <div className="max-w-7xl mx-auto px-6">
        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center max-w-3xl mx-auto"
        >
          <h2
            className="text-3xl md:text-4xl font-extrabold tracking-tight"
            style={{ color: BRAND }}
          >
            Mission, Vision & Core Philosophy
          </h2>

          <p className="mt-4 text-slate-600 text-base md:text-lg">
            Guided by purpose, driven by integrity, and committed to national
            progress.
          </p>
        </motion.div>

        {/* CARDS */}
        <div className="mt-14 grid gap-8 md:grid-cols-3">
          {ITEMS.map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={item.title}
                custom={index}
                variants={cardVariants}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-100px" }}
                className="
                  rounded-2xl
                  border border-slate-200
                  p-8
                  text-center
                  shadow-sm
                  hover:shadow-md
                  transition
                  bg-white
                "
              >
                {/* ICON */}
                <div
                  className="
                    mx-auto
                    w-16 h-16
                    rounded-full
                    flex items-center justify-center
                    border
                  "
                  style={{
                    borderColor: `${BRAND}40`,
                    backgroundColor: `${BRAND}0D`,
                  }}
                >
                  <Icon size={28} color={BRAND} />
                </div>

                {/* TITLE */}
                <h3
                  className="mt-6 text-xl font-bold"
                  style={{ color: BRAND }}
                >
                  {item.title}
                </h3>

                {/* CONTENT */}
                <p className="mt-4 text-slate-600 text-sm leading-relaxed">
                  {item.content}
                </p>

                {/* ACCENT LINE */}
                <div
                  className="mt-6 h-[2px] w-12 mx-auto rounded-full"
                  style={{ backgroundColor: BRAND }}
                />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
