"use client";

import Image, { StaticImageData } from "next/image";
import { motion, Variants } from "framer-motion";

/* ================= BRAND ================= */
const BRAND = "#07518a";
const ACCENT = "#f59e0b";

/* ================= IMAGE IMPORTS ================= */
import PeopleMap from "@/app/about/components/business-team-top-globe-european-african-side.png";
import LearningImage from "@/app/about/components/female-hands-holds-cube-with-letters-wooden-cubes-with-words-rent-sale-buy-loan-project-designer-black-words-home-learn-health.png";
import InnovationImage from "@/app/about/components/light-bulb-with-icons-lines-symbolizing-global-ideas-innovation.png";

/* ================= TYPES ================= */
type CultureItem = {
  title: string;
  description: string;
  image: StaticImageData;
};

/* ================= DATA ================= */
const CULTURE_DATA: CultureItem[] = [
  {
    title: "300+ Global Associates",
    description:
      "Our strength lies in our people. Brihaspathi’s workforce spans 300+ highly skilled professionals operating across India and global locations. This globally distributed yet deeply localized team blends international best practices with regional intelligence to deliver mission-critical security, automation, and digital transformation solutions at national scale.",
    image: PeopleMap,
  },
  {
    title: "Continuous Learning",
    description:
      "We believe learning never stops. Through our in-house R&D ecosystem, structured training programs, and exposure to real-world deployments, our teams continuously build high-demand competencies in AI, video intelligence, IoT, and advanced infrastructure. This culture of continuous learning ensures we stay ahead of evolving technologies and industry demands.",
    image: LearningImage,
  },
  {
    title: "Inclusive Innovation",
    description:
      "Innovation at Brihaspathi is inclusive by design. Every engineer is empowered to ideate, experiment, and lead—regardless of role or tenure. We foster a culture where ownership, accountability, and creative problem-solving converge, enabling our teams to architect future-ready solutions for governments, enterprises, and communities.",
    image: InnovationImage,
  },
];

/* ================= ANIMATION VARIANTS ================= */
const leftTextVariants: Variants = {
  hidden: { opacity: 0, x: -60 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const rightTextVariants: Variants = {
  hidden: { opacity: 0, x: 60 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const imageVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
  },
};

/* ================= COMPONENT ================= */
export default function PeopleCultureSection() {
  return (
    <section className="relative w-full bg-white py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* HEADER */}
        <div className="max-w-3xl mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-black">
            Our People &{" "}
            <span style={{ color: BRAND }}>Culture</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-gray-600">
            Engineering change through diversity — nurturing the best minds to
            solve complex security, automation, and infrastructure challenges.
          </p>
        </div>

        {/* ZIG-ZAG SECTIONS */}
        <div className="space-y-20 sm:space-y-24">
          {CULTURE_DATA.map((item, index) => {
            const isEven = index % 2 === 0;

            return (
              <div
                key={item.title}
                className="grid gap-10 lg:grid-cols-12 items-center"
              >
                {/* TEXT */}
                <motion.div
                  variants={isEven ? leftTextVariants : rightTextVariants}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.3 }}
                  className={`lg:col-span-6 ${
                    isEven ? "order-1" : "order-2"
                  }`}
                >
                  <div className="max-w-xl">
                    <div className="flex items-center gap-3 mb-4">
                      <span
                        className="h-1 w-10 rounded-full"
                        style={{ backgroundColor: ACCENT }}
                      />
                      <span
                        className="text-xs uppercase tracking-widest"
                        style={{ color: ACCENT }}
                      >
                        Culture Pillar
                      </span>
                    </div>

                    <h3
                      className="text-2xl sm:text-3xl font-bold"
                      style={{ color: BRAND }}
                    >
                      {item.title}
                    </h3>

                    <p className="mt-4 text-base sm:text-lg text-gray-700 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </motion.div>

                {/* IMAGE */}
                <motion.div
                  variants={imageVariants}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.3 }}
                  className={`lg:col-span-6 flex justify-center ${
                    isEven ? "order-2" : "order-1"
                  }`}
                >
                  <div className="relative w-[240px] sm:w-[320px] md:w-[360px] rounded-xl overflow-hidden shadow-lg">
                    <Image
                      src={item.image}
                      alt={item.title}
                      className="object-cover"
                    />
                  </div>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
