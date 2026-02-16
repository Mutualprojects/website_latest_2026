"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

import {
  ScrollXCarousel,
  ScrollXCarouselContainer,
  ScrollXCarouselProgress,
  ScrollXCarouselWrap,
} from "@/components/homeabout/scroll-x-carosel";

import {
  CardHoverReveal,
  CardHoverRevealContent,
  CardHoverRevealMain,
} from "@/components/homeabout/reveal-on-hover";

import { Badge } from "@/components/ui/badge";

/* ================= BRAND ================= */
const BRAND = "#07518a";

/* ================= DATA ================= */
const SLIDES = [
  {
    id: "1",
    title: "About Brihaspathi Technologies",
    description:
      "Founded in 2006, Brihaspathi Technologies Limited delivers cutting-edge technology solutions across E-Security, Home Automation, AI-driven Software Development, IoT, IT Products, and ELV—built to transform industries with innovation and excellence.",
    services: ["E-Security Solutions", "AI & Software", "IoT & ELV"],
    type: "About",
    imageUrl:
      "https://images.unsplash.com/photo-1688733720228-4f7a18681c4f?q=80&w=2000&auto=format&fit=crop",
  },
  {
    id: "2",
    title: "Scale, Expertise & Impact",
    description:
      "Backed by 300+ professionals, we deliver future-ready solutions tailored to diverse client needs—serving 15,000+ satisfied clients across industries and enabling nationwide security through large-scale surveillance deployments.",
    services: ["Engineering Delivery", "Large-Scale Deployment"],
    type: "Company",
    imageUrl:
      "https://images.unsplash.com/photo-1624996752380-8ec242e0f85d?q=80&w=2000&auto=format&fit=crop",
  },
  {
    id: "3",
    title: "Our Mission",
    description:
      "To design and deliver state-of-the-art security and surveillance solutions that address today’s challenges, strengthen national safety, and contribute to a peaceful and secure future through advanced public-eye surveillance.",
    services: ["Security & Surveillance", "Public Safety"],
    type: "Mission",
    imageUrl:
      "https://images.unsplash.com/photo-1574717025058-2f8737d2e2b7?q=80&w=2000&auto=format&fit=crop",
  },
  {
    id: "4",
    title: "Our Vision",
    description:
      "To lead the surveillance industry with innovative, integrated, tailor-made security solutions at competitive prices—upholding integrity and fostering long-term partnerships with clients, employees, and stakeholders.",
    services: ["Integrated Solutions", "Trusted Partnerships"],
    type: "Vision",
    imageUrl:
      "https://images.unsplash.com/photo-1654618977232-a6c6dea9d1e8?q=80&w=2000&auto=format&fit=crop",
  },
  {
    id: "5",
    title: "Why Brihaspathi",
    description:
      "20+ years of excellence with a proven track record, experienced teams, a client-centric approach, competitive pricing, and a comprehensive service portfolio—built on quality and designed to scale with future technology advancements.",
    services: ["Experienced Team", "Quality & Support", "Future-Proof Solutions"],
    type: "Why Us",
    imageUrl:
      "https://images.unsplash.com/photo-1726066012698-bb7a3abce786?q=80&w=2000&auto=format&fit=crop",
  },
];


const LOOP_SLIDES = [...SLIDES, ...SLIDES];

export default function AboutEnterpriseSplit() {
  const scrollRef = useRef<HTMLDivElement>(null);

  /* ================= AUTO SCROLL + LOOP ================= */
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    let rafId: number;
    const speed = 0.35;

    const animate = () => {
      el.scrollLeft += speed;

      // reset at midpoint for seamless loop
      if (el.scrollLeft >= el.scrollWidth / 2) {
        el.scrollLeft = 0;
      }

      rafId = requestAnimationFrame(animate);
    };

    rafId = requestAnimationFrame(animate);

    // pause on hover (professional UX)
    const onEnter = () => cancelAnimationFrame(rafId);
    const onLeave = () => {
      rafId = requestAnimationFrame(animate);
    };

    el.addEventListener("mouseenter", onEnter);
    el.addEventListener("mouseleave", onLeave);

    return () => {
      cancelAnimationFrame(rafId);
      el.removeEventListener("mouseenter", onEnter);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <section className="bg-white">
      <div className="mx-auto max-w-7xl px-6 py-24">
        <div className="grid grid-cols-1  lg:grid-cols-12 items-start">
          {/* ================= LEFT ABOUT CONTENT ================= */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="lg:col-span-4"
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
              <span className="font-medium text-slate-900">300+ professionals</span>
              , over{" "}
              <span className="font-medium text-slate-900">
                15,000 enterprise & government clients
              </span>
              , and more than{" "}
              <span className="font-medium text-slate-900">
                2 million successful installations
              </span>
              , we enable organizations to operate with confidence, efficiency,
              and precision.
            </p>
          </motion.div>

          {/* ================= RIGHT CAROUSEL ================= */}
          <div className="lg:col-span-8">
            <ScrollXCarousel className="h-[420px]">
              <ScrollXCarouselContainer className="relative flex flex-col justify-center gap-8">
                {/* Edge fades */}
                <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-[6vw] bg-gradient-to-r from-white to-transparent" />
                <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-[6vw] bg-gradient-to-l from-white to-transparent" />

                <ScrollXCarouselWrap>
                  <div
                    ref={scrollRef}
                    className="
                      flex gap-6 px-8
                      overflow-x-hidden
                      scroll-smooth
                      snap-x snap-mandatory
                    "
                  >
                    {LOOP_SLIDES.map((slide, index) => (
                      <CardHoverReveal
                        key={`${slide.id}-${index}`}
                        className="
                          snap-start
                          min-w-[82vw]
                          sm:min-w-[56vw]
                          md:min-w-[38vw]
                          lg:min-w-[28vw]
                          xl:min-w-[24vw]
                          rounded-xl
                          border border-slate-200
                          bg-white
                          overflow-hidden
                          transition-transform duration-300
                          hover:-translate-y-1
                        "
                      >
                        <CardHoverRevealMain>
                          <img
                            src={slide.imageUrl}
                            alt={slide.title}
                            className="h-96 w-full object-cover"
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
                                className="rounded-full bg-slate-100 text-xs text-slate-700"
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
                            <p className="mt-1 text-xs leading-relaxed text-slate-600">
                              {slide.description}
                            </p>
                          </div>
                        </CardHoverRevealContent>
                      </CardHoverReveal>
                    ))}
                  </div>
                </ScrollXCarouselWrap>

                <ScrollXCarouselProgress
                  className="mx-8 h-[2px] rounded-full bg-slate-200 overflow-hidden"
                  progressStyle="h-full rounded-full"
                  style={{ backgroundColor: BRAND }}
                />
              </ScrollXCarouselContainer>
            </ScrollXCarousel>
          </div>
        </div>
      </div>
    </section>
  );
}
