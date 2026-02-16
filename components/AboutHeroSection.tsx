"use client";

import { motion } from "motion/react";
import {
  ScrollXCarousel,
  ScrollXCarouselContainer,
  ScrollXCarouselWrap,
  ScrollXCarouselProgress,
} from "@/components/homeabout/scroll-x-carosel";

import {
  CardHoverReveal,
  CardHoverRevealMain,
  CardHoverRevealContent,
} from "@/components/homeabout/reveal-on-hover";

import { Badge } from "@/components/ui/badge";

/* ================= BRAND ================= */
const BRAND = "#07518a";

/* ================= DATA ================= */
const SLIDES = [
  {
    id: "1",
    title: "UI & Experience Design",
    description:
      "Scalable design systems built for accessibility, performance, and long-term product consistency.",
    services: ["Design Systems", "UX Research"],
    type: "Design",
    imageUrl:
      "https://images.unsplash.com/photo-1688733720228-4f7a18681c4f?q=80&w=2000&auto=format&fit=crop",
  },
  {
    id: "2",
    title: "Blockchain Platforms",
    description:
      "Enterprise-grade blockchain solutions with strong security and compliance foundations.",
    services: ["Security", "Architecture"],
    type: "Blockchain",
    imageUrl:
      "https://images.unsplash.com/photo-1624996752380-8ec242e0f85d?q=80&w=2000&auto=format&fit=crop",
  },
  {
    id: "3",
    title: "E-Commerce Engineering",
    description:
      "High-performance commerce platforms optimized for scale, payments, and reliability.",
    services: ["Payments", "Cloud"],
    type: "E-Commerce",
    imageUrl:
      "https://images.unsplash.com/photo-1574717025058-2f8737d2e2b7?q=80&w=2000&auto=format&fit=crop",
  },
  {
    id: "4",
    title: "SaaS Platforms",
    description:
      "Secure SaaS applications with observability, scalability, and modern DevOps pipelines.",
    services: ["DevOps", "Security"],
    type: "SaaS",
    imageUrl:
      "https://images.unsplash.com/photo-1654618977232-a6c6dea9d1e8?q=80&w=2000&auto=format&fit=crop",
  },
  {
    id: "5",
    title: "Digital Growth & SEO",
    description:
      "Data-driven growth strategies focused on sustainable digital performance.",
    services: ["SEO", "Analytics"],
    type: "Growth",
    imageUrl:
      "https://images.unsplash.com/photo-1726066012698-bb7a3abce786?q=80&w=2000&auto=format&fit=crop",
  },
];

export default function AboutEnterpriseScroll() {
  return (
    <section className="bg-white">
      {/* IMPORTANT: height controls how long X-scroll lasts */}
      <ScrollXCarousel className="h-[260vh]">

        <ScrollXCarouselContainer className="top-0">
          <div className="mx-auto max-w-7xl px-6 py-32">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">

              {/* ================= LEFT (STICKY ABOUT) ================= */}
              <motion.div
                className="lg:col-span-4 self-start"
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45 }}
              >
                <h1
                  className="text-5xl font-semibold tracking-tight"
                  style={{ color: BRAND }}
                >
                  About
                </h1>

                <h2 className="mt-4 text-lg font-medium text-slate-900">
                  Brihaspathi Technologies Limited
                </h2>

                <p className="mt-8 text-base leading-relaxed text-slate-600">
                  Founded in 2006, Brihaspathi Technologies Limited is a trusted
                  technology partner delivering secure, scalable, and future-ready
                  digital solutions across industries.
                </p>

                <p className="mt-5 text-base leading-relaxed text-slate-600">
                  With a team of{" "}
                  <span className="font-medium text-slate-900">
                    300+ professionals
                  </span>
                  , over{" "}
                  <span className="font-medium text-slate-900">
                    15,000 enterprise & government clients
                  </span>
                  , and more than{" "}
                  <span className="font-medium text-slate-900">
                    2 million successful installations
                  </span>
                  , we enable organizations to operate with confidence,
                  efficiency, and precision.
                </p>
              </motion.div>

              {/* ================= RIGHT (X SCROLL) ================= */}
              <div className="lg:col-span-8 overflow-hidden">

                <ScrollXCarouselWrap
                  className="flex gap-6"
                  xRagnge={["0%", "-72%"]}
                >
                  {SLIDES.map((slide) => (
                    <CardHoverReveal
                      key={slide.id}
                      className="
                        min-w-[85vw]
                        sm:min-w-[55vw]
                        md:min-w-[38vw]
                        lg:min-w-[28vw]
                        xl:min-w-[24vw]
                        rounded-xl
                        border border-slate-200
                        bg-white
                        overflow-hidden
                      "
                    >
                      <CardHoverRevealMain>
                        <img
                          src={slide.imageUrl}
                          alt={slide.title}
                          className="h-full w-full object-cover"
                        />
                      </CardHoverRevealMain>

                      <CardHoverRevealContent className="space-y-3 bg-white/95 backdrop-blur-md p-4">
                        <Badge
                          className="rounded-full text-xs text-white"
                          style={{ backgroundColor: BRAND }}
                        >
                          {slide.type}
                        </Badge>

                        <div className="flex flex-wrap gap-2">
                          {slide.services.map((service) => (
                            <Badge
                              key={service}
                              variant="secondary"
                              className="rounded-full text-xs"
                            >
                              {service}
                            </Badge>
                          ))}
                        </div>

                        <div>
                          <h3
                            className="text-sm font-semibold"
                            style={{ color: BRAND }}
                          >
                            {slide.title}
                          </h3>
                          <p className="mt-1 text-xs text-slate-600">
                            {slide.description}
                          </p>
                        </div>
                      </CardHoverRevealContent>
                    </CardHoverReveal>  
                  ))}
                </ScrollXCarouselWrap>

                <ScrollXCarouselProgress
                  className="mt-10 h-[2px] bg-slate-200 rounded-full overflow-hidden"
                  progressStyle="h-full bg-slate-900/80 rounded-full"
                />
              </div>

            </div>
          </div>
        </ScrollXCarouselContainer>
      </ScrollXCarousel>
    </section>
  );
}
